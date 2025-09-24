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
import { Info } from "lucide-react";

export default function DepartmentSkills({ departamentoId }) {
  const [habilidades, setHabilidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Colores sólidos y fáciles de distinguir
  const COLORS = ["#2563EB", "#16A34A", "#CA8A04", "#92400E", "#DC2626"];

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
    return <p className="text-center py-3 text-blue-700">Cargando habilidades...</p>;

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
        <h2 className="text-lg text-blue-800 font-semibold my-3 text-center">
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
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Imagen o descripción */}
      <motion.div
        className="flex flex-col h-80 bg-white rounded-xl shadow-md border border-gray-200 p-4 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {selectedSkill ? (
          <>
            <div className="flex items-center gap-2 mb-3">
              <Info className="text-green-700 w-5 h-5" />
              <h3 className="text-lg font-bold text-green-800">{selectedSkill.name}</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {selectedSkill.descripcion || "Sin descripción disponible."}
            </p>
            <p className="mt-3 text-sm text-gray-600 italic">
              Tipo: {selectedSkill.tipo || "No especificado"}
            </p>
            <p className="mt-1 text-sm text-blue-700 font-medium">
              Trabajadores: {selectedSkill.value?.toLocaleString()}
            </p>
          </>
        ) : (
          <img
            src="/ometepe.jpg"
            alt="Ometepe"
            className="w-full h-full object-cover rounded-lg"
          />
        )}
      </motion.div>
    </section>
  );
}
