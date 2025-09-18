import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function MunicipalityPage() {
  const { departmentSlug, municipioSlug } = useParams();
  const [municipio, setMunicipio] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(municipioSlug);// el municipio apare undefined 

  useEffect(() => {
    async function fetchMunicipio() {
      try {
        // 1. Buscar departamento por slug para obtener su id
        const deptUrl = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/departamentos?slug=eq.${departmentSlug}&select=id,nombre`;
        const { data: dept } = await axios.get(deptUrl, {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
          },
        });

        if (!dept || dept.length === 0) {
          console.error("Departamento no encontrado");
          setLoading(false);
          return;
        }

        const departamentoId = dept[0].id;

        // 2. Buscar municipio por slug y departamento_id
        const munUrl = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/municipios?slug=eq.${municipioSlug}&departamento_id=eq.${departamentoId}&select=*`;
        const { data: mun } = await axios.get(munUrl, {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
          },
        });

        if (mun && mun.length > 0) {
          setMunicipio(mun[0]);
        }
      } catch (err) {
        console.error("Error al cargar municipio:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMunicipio();
  }, [departmentSlug, municipioSlug]);

  if (loading) {
    return (
      <div className="h-48 flex items-center justify-center text-lg text-gray-600">
        Cargando municipio...
      </div>
    );
  }

  if (!municipio) {
    return (
      <div className="h-48 flex items-center justify-center text-lg text-red-600">
        Municipio no encontrado
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">{municipio.nombre}</h1>
      <p className="text-gray-700 mb-6">{municipio.descripcion}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold mb-2">Datos generales</h2>
          <p><strong>Población:</strong> {municipio.poblacion?.toLocaleString() || "N/D"}</p>
          <p><strong>Área:</strong> {municipio.area_km2 ? `${municipio.area_km2} km²` : "N/D"}</p>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold mb-2">Ubicación</h2>
          <p><strong>Coordenadas:</strong> {municipio.coordenadas || "N/D"}</p>
        </div>
      </div>
    </div>
  );
}
