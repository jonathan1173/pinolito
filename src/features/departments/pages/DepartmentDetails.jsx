import React, { useEffect, useState, lazy, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import DepartmentHero from "../components/DepartamentHero";
import DepartmentMap from "../components/DepartmentMap";
import DepartmentCultureTabs from "../components/culture/DepartmentCultureTabs";

const DepartmentSkills = lazy(() => import("../components/DepartmentSkills"));
const DepartmentsLogros = lazy(() => import("../components/DepartmentsLogos"));
const RecentExperiences = lazy(() => import("../components/RecentActivities"));

export default function DepartmentDetails() {
  const { ciudad } = useParams();
  const [departamento, setDepartamento] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDepartamento() {
      try {
        const cacheKey = `departamento_${ciudad}`;
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
          setDepartamento(JSON.parse(cached));
          setLoading(false);
          return;
        }

        const url = `${
          import.meta.env.VITE_SUPABASE_URL
        }/rest/v1/departamentos?select=id,nombre,descripcion,imagen_url,poblacion,area_km2,slug&slug=eq.${ciudad}`;
        const { data } = await axios.get(url, {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
          },
        });

        const dept = data[0] || null;
        setDepartamento(dept);
        if (dept) sessionStorage.setItem(cacheKey, JSON.stringify(dept));
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
      <p className="text-center py-16 text-2xl text-gray-600">
        Cargando departamento...
      </p>
    );

  if (!departamento)
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-4 text-center">
          Departamento no encontrado
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          El departamento que buscas no está disponible en nuestra base de
          datos.
        </p>
        <Link
          to="/department"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver a Departamentos
        </Link>
      </main>
    );

  return (
    <main className="">
      {/* Hero */}
      <DepartmentHero department={departamento} />

      {/* Datos básicos */}
      <section className="max-w-6xl mx-auto px-4  sm:px-6 lg:px-8 py-8 space-y-6">
        <dl className=" grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white border border-black rounded-2xl p-1 shadow-md">
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

        <article className="bg-white p-6 rounded-2xl shadow-md border border-black">
          <h2 className="text-2xl font-bold mb-4">Descripción</h2>
          <p className="text-gray-800 leading-relaxed text-justify">
            {departamento.descripcion}
          </p>
        </article>
      </section>

      {/* Secciones diferidas */}
      <Suspense
        fallback={
          <p className="text-center text-gray-500 py-6">
            Cargando secciones...
          </p>
        }
      >
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Habilidades + Mapa */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col h-72 ">
              <DepartmentSkills departamentoId={departamento.id} />
            </div>

            <div className="flex flex-col h-72">
              <img
                src="/ometepe.jpg"
                alt="Ometepe"
                className="w-full h-full object-cover rounded-lg border border-black"
              />
            </div>
          </section>

          <DepartmentMap ciudad={departamento} />

          {/* Logros */}
          <article className="bg-white rounded-lg shadow border border-black">
            <DepartmentsLogros
              ciudad={departamento}
              departamentoId={departamento.id}
            />
          </article>
        </section>

        <section className="py-8">
          <DepartmentCultureTabs departamentoId={departamento.id} />
        </section>

        <section className="">
          <RecentExperiences departamentoId={departamento.id} />
        </section>
      </Suspense>
    </main>
  );
}
