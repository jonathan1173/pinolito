import { useState } from "react";
import { supabase } from "../../../services/supabaseClient";
import { useComentarios } from "../hooks/useComentarios";
import PublicacionCard from "./PublicacionCard";

export default function ComentariosModal({ publicacion, usuarioId, onClose }) {
  const { comentarios, observerRef, loading, setComentarios } =
    useComentarios(publicacion.id);
  const [nuevoComentario, setNuevoComentario] = useState("");

  async function handleComentar(e) {
    e.preventDefault();
    if (!nuevoComentario.trim()) return;

    try {
      console.log("🗨️ Creando comentario con:", {
        usuario_id: usuarioId,
        referencia_tipo: "publicacion",
        referencia_id: publicacion.id,
        contenido: nuevoComentario,
      });

      const { data, error } = await supabase
        .from("comentarios")
        .insert([
          {
            usuario_id: usuarioId,
            referencia_tipo: "publicacion",
            referencia_id: publicacion.id,
            contenido: nuevoComentario.trim(),
          },
        ])
        .select()
        .single();

      if (error) throw error;

      setComentarios((prev) => [data, ...prev]);
      setNuevoComentario("");
    } catch (err) {
      console.error("❌ Error al insertar comentario:", err);
      alert("No se pudo crear el comentario.");
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-4 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-700 float-right mb-2"
        >
          ✕
        </button>

        <PublicacionCard
          publicacion={publicacion}
          usuarioId={usuarioId}
          onComentar={() => {}}
        />

        <form onSubmit={handleComentar} className="flex gap-2 mt-3">
          <input
            type="text"
            value={nuevoComentario}
            onChange={(e) => setNuevoComentario(e.target.value)}
            placeholder="Escribe un comentario..."
            className="flex-1 border rounded-md px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 rounded-md hover:bg-blue-700 text-sm"
          >
            Comentar
          </button>
        </form>

        <div className="mt-4">
          {comentarios.map((c) => (
            <div
              key={c.id}
              className="border-t py-2 text-sm text-gray-700 flex justify-between"
            >
              <span>{c.contenido}</span>
              <span className="text-gray-400 text-xs">
                {new Date(c.fecha).toLocaleDateString()}
              </span>
            </div>
          ))}

          <div ref={observerRef} className="h-1"></div>

          {loading && (
            <p className="text-center text-gray-400 mt-2">
              Cargando más comentarios...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
