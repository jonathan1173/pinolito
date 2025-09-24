import React, { useEffect, useState } from "react";
import { supabase } from "../../../services/supabaseClient"; 
import { Trophy } from "lucide-react";

export default function DepartmentAchievements({ departamentoId, municipioId }) {
  const [reconocimientos, setReconocimientos] = useState([]);

  useEffect(() => {
    async function fetchReconocimientos() {
      try {
        if (!departamentoId && !municipioId) return;

        const filter = departamentoId
          ? { departamento_id: departamentoId }
          : { municipio_id: municipioId };

        const { data, error } = await supabase
          .from("reconocimientos")
          .select("nombre, anio, institucion_otorgante")
          .match(filter);

        if (error) throw error;
        setReconocimientos(data || []);
      } catch (error) {
        console.error("Error al cargar reconocimientos:", error);
        setReconocimientos([]);
      }
    }

    fetchReconocimientos();
  }, [departamentoId, municipioId]);

  return (
    <article className="bg-blue-50 rounded-2xl shadow-md p-6 border border-blue-200">
      <h2 className="flex items-center mb-6 text-xl font-bold text-blue-800">
        <Trophy className="w-6 h-6 mr-2 text-blue-700" />
        Reconocimientos
      </h2>

      {reconocimientos.length === 0 ? (
        <p className="text-gray-600 italic">
          No hay reconocimientos registrados.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {reconocimientos.map((rec, index) => (
            <div
              key={index}
              className="bg-white border-l-4 border-blue-500 p-4 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <p className="font-semibold text-gray-900">{rec.nombre}</p>
              <p className="text-sm text-gray-700">{rec.anio}</p>
              <p className="text-sm text-gray-600">
                {rec.institucion_otorgante}
              </p>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
