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

  // Colores brillantes y legibles sobre fondo claro
const COLORS = ["#3335AA", "#FF6B6B", "#FFA500", "#A855F7", "#ff1144"];
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
    return <p className="text-center py-3">Cargando habilidades...</p>;

  const groupedData = habilidades.reduce((acc, h) => {
    const existing = acc.find((item) => item.name === h.nombre);
    if (existing) {
      existing.value += h.trabajadores;
    } else {
      acc.push({ name: h.nombre, value: h.trabajadores });
    }
    return acc;
  }, []);

  const totalTrabajadores = groupedData.reduce((sum, h) => sum + h.value, 0);
  const chartData = groupedData.map((h) => ({
    ...h,
    percentage: ((h.value / totalTrabajadores) * 100).toFixed(1),
  }));

  return (
    <section className="rounded-lg shadow flex flex-col h-full border border-black">
      <h2 className="text-base text-black font-bold my-2 text-center">
        Sectores Económicos
      </h2>
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius="65%"
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
                `${value.toLocaleString()} empleados`,
                `${props.payload.name}`,
              ]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
