import React, { useEffect, useState } from "react";
import { Calendar, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Hero from "../../../shared/components/Hero";
import axios from "axios";

export default function DepartmentsPage() {
  const [ciudadesCreativas, setCiudadesCreativas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Color uniforme para todas las ciudades
  const colorUniforme = "from-green-500 to-green-700";

  useEffect(() => {
    async function fetchDepartamentos() {
      try {
        const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/departamentos?select=id,nombre,descripcion,imagen`;
        const { data } = await axios.get(url, {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
          },
        });
        setCiudadesCreativas(data);
      } catch (error) {
        console.error("Error al cargar departamentos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDepartamentos();
  }, []);

  if (loading) return <p className="h-screen flex items-center justify-center text-6xl">Cargando departamentos...</p>;

  return (
    <div>
      <Hero
        title="¡Sumérgete en la Cultura!"
        paragraph="Descubre la riqueza de Nicaragua con juegos que te harán aprender de forma divertida."
        ctaLink="calendar"
        ctaText="Ver Calendarios de Eventos"
        Icon={Calendar}
      />

      {/* Grid de Ciudades */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ciudadesCreativas.map((ciudad) => (
            <Link
              key={ciudad.id}
              to={`/department/${ciudad.id}`}
              className="group bg-white rounded-lg shadow hover:shadow-xl overflow-hidden transition-all hover:-translate-y-2"
            >
              <div className="relative">
                <img
                  src={ciudad.imagen}
                  alt={`${ciudad.nombre} - ${ciudad.descripcion}`}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${colorUniforme} opacity-20 group-hover:opacity-30`}
                />
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold group-hover:text-blue-600">
                      {ciudad.nombre}
                    </h2>
                    <p className="text-gray-600">{ciudad.descripcion}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Sparkles className="w-4 h-4 mr-1" />{" "}
                      {ciudad.actividades || 0} actividades
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
