import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { supabase } from "../../../services/supabaseClient";
import { motion } from "framer-motion";
import { Info, EqualApproximately } from "lucide-react";
import { div } from "framer-motion/client";

export default function DepartmentSkills({ departamentoId }) {
  const [habilidades, setHabilidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Colores sólidos y fáciles de distinguir
  const COLORS = [
    "#1D4ED8", // Azul
    "#059669", // Verde
    "#D97706", // Naranja
    "#B91C1C", // Rojo
    "#7C3AED", // Violeta
    "#0EA5E9", // Celeste
    "#BE18FF", // Rosa
  ];

  useEffect(() => {
    async function fetchHabilidades() {
      try {
        const { data, error } = await supabase
          .from("habilidades")
          .select("id, nombre, descripcion, tipo, trabajadores")
          .eq("departamento_id", departamentoId);

        if (error) throw error;
        setHabilidades(data || []);
      } catch (err) {
        console.error("Error al cargar habilidades:", err);
        setHabilidades([]);
      } finally {
        setLoading(false);
      }
    }

    if (departamentoId) fetchHabilidades();
  }, [departamentoId]);

  if (loading)
    return (
      <p className="text-center py-3 text-[#39C2FF]">Cargando habilidades...</p>
    );

  // Agrupado por nombre
  const groupedData = habilidades.reduce((acc, h) => {
    const existing = acc.find((item) => item.name === h.nombre);
    if (existing) {
      existing.value += h.trabajadores;
    } else {
      acc.push({
        name: h.nombre,
        value: h.trabajadores,
        descripcion: h.descripcion,
        tipo: h.tipo,
      });
    }
    return acc;
  }, []);

  const totalTrabajadores = groupedData.reduce((sum, h) => sum + h.value, 0);
  const chartData = groupedData.map((h) => ({
    ...h,
    percentage: ((h.value / totalTrabajadores) * 100).toFixed(1),
  }));

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Gráfico */}
      <motion.div
        className="flex flex-col h-80 bg-white rounded-xl shadow-md border border-gray-200"
        whileHover={{ scale: 1.01 }}
      >
        <h2 className="text-lg text-[#2c2c2c] font-semibold my-3 text-center">
          Sectores Económicos
        </h2>
        <div className="flex-1 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius="70%"
                onClick={(data) => setSelectedSkill(data)}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="#ffffff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name, props) => [
                  `${value.toLocaleString()} empleados`,
                  `${props.payload.name}`,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Imagen o descripción */}
      <motion.div
        className="flex flex-col h-80 bg-white rounded-xl shadow-md p-4 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {selectedSkill ? (
          <>
            <div className="flex items-center gap-2 mb-3">
              <Info className="text-[#2c2c2c] w-5 h-5" />
              <h3 className="text-lg font-bold text-[#2c2c2c]">
                {selectedSkill.name}
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {selectedSkill.descripcion || "Sin descripción disponible."}
            </p>
            <p className="mt-3 text-sm text-gray-600 italic">
              Tipo: {selectedSkill.tipo || "No especificado"}
            </p>
            <p className="mt-1 text-sm text-[#39c2ff] font-medium inline-flex items-center gap-1">
              Trabajadores <EqualApproximately />{" "}
              {selectedSkill.value?.toLocaleString()}
            </p>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center h-full text-center gap-2 p-4">
            <Info className="w-5 h-5 text-[#2c2c2c]" />
            <span className="text-lg font-medium text-[#2c2c2c]">
              Toca la gráfica para obtener más información
            </span>
          </div>
        )}
      </motion.div>
    </section>
  );
}
