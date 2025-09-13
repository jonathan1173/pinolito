import React, { useEffect, useState } from "react";
import { Calendar, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Hero from "../../../shared/components/Hero";
import axios from "axios";

export default function DepartmentsPage() {
  const [ciudadesCreativas, setCiudadesCreativas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDepartamentos() {
      try {
        // pedir solo lo necesario
        const url = `${
          import.meta.env.VITE_SUPABASE_URL
        }/rest/v1/departamentos?select=id,nombre,slug,imagen_url`;
        const { data } = await axios.get(url, {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
            Accept: "application/json", // respuesta más ligera
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

  return (
    <div>
      {/* Hero siempre visible */}
      <Hero
        title="¡Sumérgete en la Cultura!"
        paragraph="Descubre la riqueza de Nicaragua con juegos que te harán aprender de forma divertida."
        ctaLink="calendar"
        ctaText="Ver Calendarios de Eventos"
        Icon={Calendar}
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <p className="h-48 flex items-center justify-center text-2xl text-gray-500">
              Cargando departamentos...
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ciudadesCreativas.map((ciudad) => (
                <Link
                  key={ciudad.id}
                  to={`/department/${ciudad.slug}`}
                  className="group bg-white rounded-lg shadow hover:shadow-xl overflow-hidden transition-all hover:-translate-y-2"
                >
                  <div className="relative">
                    {/* importante usar imagen_url (de la DB) */}
                    <img
                      src={ciudad.imagen_url}
                      alt={ciudad.nombre}
                      loading="lazy" // 👈 mejora carga
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-500 to-gray-700 opacity-20 group-hover:opacity-30" />
                  </div>

                  <div className="p-4">
                    <h2 className="text-xl font-bold group-hover:text-blue-600">
                      {ciudad.nombre}
                    </h2>
                    <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
                      <Sparkles className="w-4 h-4 mr-1" /> 0 actividades
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
