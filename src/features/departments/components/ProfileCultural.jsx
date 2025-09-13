import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

function DepartmentSkills({ departamentoId }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCulturalData() {
      try {
        const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/datos_culturales?select=arte,artesania,literatura,danza,musica&departamento_id=eq.${departamentoId}`;
        const { data: res } = await axios.get(url, {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
          },
        });
        setData(res[0] || {});
      } catch (error) {
        console.error("Error al cargar datos culturales:", error);
        setData({});
      } finally {
        setLoading(false);
      }
    }

    if (departamentoId) {
      fetchCulturalData();
    }
  }, [departamentoId]);

  if (loading)
    return <p className="text-center py-6">Cargando perfil cultural...</p>;

  // Convertimos los datos en arreglo para Recharts
  const chartData = Object.entries(data).map(([cat, val]) => ({
    category: cat,
    value: val,
  }));

  return (
    <div className="bg-white rounded-lg shadow p-6 flex justify-center items-center flex-col">
      <h2 className="text-lg font-bold mb-4 flex items-center">
        Perfil Cultural
      </h2>
      <ResponsiveContainer width="100%" height={350}>
        <RadarChart data={chartData}>
          <PolarGrid />
          <PolarAngleAxis
            dataKey="category"
            tick={{ fontWeight: "bold", dy: -5 }}
          />
          <PolarRadiusAxis tick={{ fill: "#888", fontSize: 12 }} angle={90} />
          <Radar
            name="Perfil"
            dataKey="value"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DepartmentSkills;
