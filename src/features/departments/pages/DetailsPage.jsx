import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import RecentActivities from "../components/RecentActivities";
import HeaderDepartements from "../components/HeaderDepartaments";
import PerfilCultural from "../components/ProfileCultural";
import DepartmentsLogos from "../components/DepartmentsLogos";
import axios from "axios";

export default function CiudadDetallePage() {
  const { ciudad } = useParams(); // aquí ciudad es el id
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCiudad() {
      try {
        // 1. Datos básicos del departamento
        const depRes = await axios.get(
          `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/departamentos?select=id,nombre,descripcion,imagen,mapa&id=eq.${ciudad}`,
          {
            headers: {
              apikey: import.meta.env.VITE_SUPABASE_KEY,
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
            },
          }
        );

        const dep = depRes.data[0];
        if (!dep) {
          setCiudadSeleccionada(null);
          setLoading(false);
          return;
        }

        const depId = dep.id;

        // 2. Datos culturales
        const datosCulturalesRes = await axios.get(
          `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/datos_culturales?select=arte,artesania,literatura,danza,musica&departamento_id=eq.${depId}`,
          {
            headers: {
              apikey: import.meta.env.VITE_SUPABASE_KEY,
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
            },
          }
        );
        const datosculturales = datosCulturalesRes.data[0] || {};

        // 3. Actividades
        const actividadesRes = await axios.get(
          `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/actividades?select=titulo,fecha,participantes,categoria&departamento_id=eq.${depId}`,
          {
            headers: {
              apikey: import.meta.env.VITE_SUPABASE_KEY,
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
            },
          }
        );
        const actividades = actividadesRes.data || [];

        // 4. Reconocimientos
        const reconocimientosRes = await axios.get(
          `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/reconocimientos?select=nombre&departamento_id=eq.${depId}`,
          {
            headers: {
              apikey: import.meta.env.VITE_SUPABASE_KEY,
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
            },
          }
        );
        const reconocimientos = reconocimientosRes.data.map((r) => r.nombre);

        setCiudadSeleccionada({
          ...dep,
          datosculturales,
          actividades,
          reconocimientos,
        });
      } catch (error) {
        console.error("Error al cargar la ciudad:", error);
        setCiudadSeleccionada(null);
      } finally {
        setLoading(false);
      }
    }

    fetchCiudad();
  }, [ciudad]);

  if (loading)
    return (
      <p className="text-center py-16 text-3xl">Cargando ciudad...</p>
    );

  if (!ciudadSeleccionada) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Ciudad no encontrada
        </h1>
        <p className="text-gray-600 mb-6">
          El municipio que buscas no está disponible en nuestra base de datos.
        </p>
        <Link
          to="/department"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver a Ciudades
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderDepartements department={ciudadSeleccionada} />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <PerfilCultural data={ciudadSeleccionada.datosculturales} />
          <DepartmentsLogos ciudad={ciudadSeleccionada} />
        </div>
      </section>

      <RecentActivities actividades={ciudadSeleccionada.actividades} />
    </div>
  );
}
