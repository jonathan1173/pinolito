import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

function PerfilCultural({ data }) {
  // Convertimos datos en arreglo para Recharts
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

export default PerfilCultural;
