import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import DepartmentHero from "../components/DepartamentHero";
import DepartmentSkills from "../components/DepartmentSkills";

export default function DepartmentDetails() {
  const { ciudad } = useParams();
  const [departamento, setDepartamento] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDepartamento() {
      try {
        const url = `${
          import.meta.env.VITE_SUPABASE_URL
        }/rest/v1/departamentos?select=id,nombre,descripcion,imagen_url,poblacion,area_km2&slug=eq.${ciudad}`;
        const { data } = await axios.get(url, {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
          },
        });

        setDepartamento(data[0] || null);
      } catch (error) {
        console.error("Error al cargar el departamento:", error);
        setDepartamento(null);
      } finally {
        setLoading(false);
      }
    }

    fetchDepartamento();
  }, [ciudad]);

  if (loading)
    return (
      <p className="text-center py-16 text-3xl">Cargando departamento...</p>
    );

  if (!departamento)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Departamento no encontrado
        </h1>
        <p className="text-gray-600 mb-6">
          El departamento que buscas no está disponible en nuestra base de
          datos.
        </p>
        <Link
          to="/department"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver a Departamentos
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero separado */}
      <DepartmentHero department={departamento} />

      {/* Datos adicionales debajo del Hero */}
      <section className="max-w-4xl mx-auto px-6 py-12 space-y-6">
        {/* Datos clave del departamento */}
        <dl className="flex flex-col sm:flex-row justify-center items-center gap-8 bg-white border border-gray-300 rounded-3xl p-6 shadow-md">
          <div className="text-center">
            <dt className="text-sm font-medium text-gray-500">Población</dt>
            <dd className="mt-1 text-lg font-semibold text-gray-900">
              {departamento.poblacion}
            </dd>
          </div>
          <div className="text-center">
            <dt className="text-sm font-medium text-gray-500">Área</dt>
            <dd className="mt-1 text-lg font-semibold text-gray-900">
              {departamento.area_km2} km²
            </dd>
          </div>
        </dl>

        {/* Descripción del departamento */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">Descripción</h2>
          <p className="text-gray-800 leading-relaxed">
            {departamento.descripcion}
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12 space-y-6">
        <DepartmentSkills departamentoId={departamento.id} />
      </section>
    </div>
  );
}
