import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function DepartmentSkills({ departamentoId }) {
  const [habilidades, setHabilidades] = useState([]);
  const [loading, setLoading] = useState(true);

  const COLORS = ["#3b82f6", "#f97316", "#10b981", "#eab308", "#8b5cf6"];

  useEffect(() => {
    async function fetchHabilidades() {
      try {
        const url = `${
          import.meta.env.VITE_SUPABASE_URL
        }/rest/v1/habilidades?select=nombre,trabajadores&departamento_id=eq.${departamentoId}`;
        const { data: res } = await axios.get(url, {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
          },
        });
        setHabilidades(res || []);
      } catch (error) {
        console.error("Error al cargar habilidades:", error);
        setHabilidades([]);
      } finally {
        setLoading(false);
      }
    }

    if (departamentoId) fetchHabilidades();
  }, [departamentoId]);

  if (loading)
    return <p className="text-center py-6">Cargando habilidades...</p>;

  // 🔹 Agrupar por sector y sumar trabajadores
  const groupedData = habilidades.reduce((acc, h) => {
    const existing = acc.find((item) => item.name === h.nombre);
    if (existing) {
      existing.value += h.trabajadores;
    } else {
      acc.push({ name: h.nombre, value: h.trabajadores });
    }
    return acc;
  }, []);

  // 🔹 Calcular porcentaje
  const totalTrabajadores = groupedData.reduce((sum, h) => sum + h.value, 0);
  const chartData = groupedData.map((h) => ({
    ...h,
    percentage: ((h.value / totalTrabajadores) * 100).toFixed(1),
  }));

// console.log("habilidades", habilidades);
// console.log("groupedData", groupedData);
// console.log("chartData", chartData);

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
      <h2 className="text-lg font-bold mb-4">Sectores Económicos</h2>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
            
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name, props) => [
              `${value.toLocaleString()} Empleados`, 
              `${props.payload.name}`,
            ]}
          />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
