import React, { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import Hero from "../../../shared/components/Hero";
import axios from "axios";
import Map from "../../../shared/components/Map";
import DepartmentCard from "../components/DepartmentCard"

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
        paragraph="Descubre la riqueza de Nicaragua conociendo cada un de sus departamentos"
        ctaLink="/calendar"
        ctaText="Ver Calendarios de Eventos"
        Icon={Calendar}
      />

      <div className="mx-4 md:mx-20">
        <Map mode="departamentos" />
      </div>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <p className="h-48 flex items-center justify-center text-2xl text-gray-500">
              Cargando departamentos...
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ciudadesCreativas.map((ciudad) => (
                  <DepartmentCard key={ciudad.id} ciudad={ciudad} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
