import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { supabase } from "../../../services/supabaseClient";
import { motion } from "framer-motion";
import { Info, EqualApproximately } from "lucide-react";

export default function DepartmentSkills({ departamentoId }) {
  const [habilidades, setHabilidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const COLORS = [
    "#ff6b6b",
    "#6bc1ff",
    "#ffd56b",
    "#6bff95",
    "#d96bff",
    "#ff6fc1",
    "#42e3ff",
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

  const chartData = groupedData.map((h) => ({ ...h }));

  const chartOption = {
    backgroundColor: "#ffffff",
    tooltip: {
      trigger: "item",
      formatter: (params) =>
        `${params.name}: ${params.value.toLocaleString()} empleados (${params.percent}%)`,
    },
    legend: {
      top: "top",
      type: "scroll",
      textStyle: { color: "#000", fontSize: 12 },
      data: chartData.map((d) => d.name),
    },
    series: [
      {
        name: "Habilidades",
        type: "pie",
        radius: ["40%", "70%"],
        label: { show: false }, // desactivado
        labelLine: { show: false },
        emphasis: {
          scale: true,
          scaleSize: 10,
          itemStyle: { shadowBlur: 20, shadowColor: "rgba(0,0,0,0.2)" },
        },
        data: chartData.map((item, index) => ({
          value: item.value,
          name: item.name,
          itemStyle: { color: COLORS[index % COLORS.length] },
        })),
        animationType: "scale",
        animationEasing: "elasticOut",
        animationDelay: (idx) => idx * 150,
      },
    ],
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Gráfico */}
      <motion.div
        className="flex flex-col h-80 rounded-xl shadow-xl border border-gray-200 cursor-pointer bg-white"
        whileHover={{ scale: 1.02 }}
      >
        <h2 className="text-lg text-black font-semibold my-3 text-center">
          Sectores Económicos
        </h2>
        <div className="flex-1 w-full">
          <ReactECharts
            option={chartOption}
            style={{ height: "100%", width: "100%" }}
            onEvents={{
              click: (params) => {
                setSelectedSkill(chartData.find(d => d.name === params.name));
              },
            }}
          />
        </div>
      </motion.div>

      {/* Detalles debajo */}
      <motion.div
        className="flex flex-col h-80 bg-white rounded-xl shadow-md p-4 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {selectedSkill ? (
          <>
            <div className="flex items-center gap-2 mb-3">
              <Info className="text-black w-5 h-5" />
              <h3 className="text-lg font-bold text-black">{selectedSkill.name}</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {selectedSkill.descripcion || "Sin descripción disponible."}
            </p>
            <p className="mt-3 text-sm text-gray-600 italic">
              Tipo: {selectedSkill.tipo || "No especificado"}
            </p>
            <p className="mt-1 text-sm text-[#39c2ff] font-medium inline-flex items-center gap-1">
              Trabajadores <EqualApproximately /> {selectedSkill.value?.toLocaleString()}
            </p>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center h-full text-center gap-2 p-4">
            <Info className="w-5 h-5 text-black" />
            <span className="text-lg font-medium text-black">
              Toca la gráfica para obtener más información
            </span>
          </div>
        )}
      </motion.div>
    </section>
  );
}
