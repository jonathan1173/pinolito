import { useEffect, useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import axios from "axios";

export default function RecentExperiences({ departamentoId }) {
  const [experiencias, setExperiencias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiencias = async () => {
      try {
        const { data } = await axios.get(
          `https://vifqhfbtudcqbnsqwsqg.supabase.co/rest/v1/experiencias`,
          {
            headers: {
              apikey: import.meta.env.VITE_SUPABASE_KEY,
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
            },
            params: {
              select:
                "id,nombre,descripcion,categoria,fecha,hora,direccion,imagen_url",
              departamento_id: `eq.${departamentoId}`,
            },
          }
        );
        // console.log("👉 Datos recibidos:", data);
        setExperiencias(data);
      } catch (error) {
        console.error("Error al cargar experiencias:", error);
      } finally {
        setLoading(false);
      }
    };

    if (departamentoId) fetchExperiencias();
  }, [departamentoId]);

  if (loading) return <p className="text-center">Cargando experiencias...</p>;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Experiencias Recientes
        </h2>

        {experiencias.length === 0 ? (
          <p className="text-center text-gray-500">
            No hay experiencias registradas para este departamento.
          </p>
        ) : (
          <div className="flex space-x-6 overflow-x-auto scrollbar-hide">
            {experiencias.map((exp) => (
              <div
                key={exp.id}
                className="bg-white rounded-lg shadow border-2 border-[#2c2c2c] p-4 flex-shrink-0 w-72 flex flex-col"
              >
                {exp.imagen_url && (
                  <img
                    src={exp.imagen_url}
                    alt={exp.nombre}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                )}
                <h3 className="text-lg font-bold mb-2">{exp.nombre}</h3>
                <p className="text-sm text-gray-600 mb-2">{exp.descripcion}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                  {exp.fecha && (
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" /> {exp.fecha}
                    </span>
                  )}
                  {exp.direccion && (
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" /> {exp.direccion}
                    </span>
                  )}
                </div>
                <span className="inline-block px-2 py-1 border rounded text-xs mt-auto">
                  {exp.categoria}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
