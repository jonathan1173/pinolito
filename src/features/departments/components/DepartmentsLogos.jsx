import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trophy } from "lucide-react";

export default function DepartmentAchievements({ departamentoId, municipioId }) {
  const [reconocimientos, setReconocimientos] = useState([]);

  useEffect(() => {
    async function fetchReconocimientos() {
      try {
        if (!departamentoId && !municipioId) return;

        const filter = departamentoId
          ? `departamento_id=eq.${departamentoId}`
          : `municipio_id=eq.${municipioId}`;

        const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/reconocimientos?select=nombre,anio,institucion_otorgante&${filter}`;
        const { data } = await axios.get(url, {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
          },
        });

        setReconocimientos(data || []);
      } catch (error) {
        console.error("Error al cargar reconocimientos:", error);
        setReconocimientos([]);
      }
    }

    fetchReconocimientos();
  }, [departamentoId, municipioId]);

  return (
    <div className="bg-blue-400 rounded-lg shadow p-6">
      <h2 className="flex items-center mb-4 text-lg font-bold">
        <span className="mr-2"><Trophy color="black" /></span> Reconocimientos
      </h2>

      {reconocimientos.length === 0 ? (
        <p className="text-gray-500">No hay reconocimientos registrados.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {reconocimientos.map((rec, index) => (
            <div key={index} className="bg-gray-100 p-3 rounded-lg text-center">
              <p className="font-semibold">{rec.nombre}</p>
              <p className="text-sm text-gray-600">{rec.anio}</p>
              <p className="text-sm text-gray-600">{rec.institucion_otorgante}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
