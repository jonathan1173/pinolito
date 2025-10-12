import { useState, useEffect } from "react";
import { supabase } from "../../../services/supabaseClient";
import { usePublicaciones } from "../hooks/usePublicaciones";
import CrearPublicacionModal from "../components/CrearPublicacionModal";
import ListaPublicaciones from "../components/ListaPublicaciones";

export default function ComunidadFeed() {
  const { publicaciones, setPublicaciones, observerRef, loading, hasMore } =
    usePublicaciones();

  const [showModal, setShowModal] = useState(false);
  const [session, setSession] = useState(null);

  // Obtener la sesión y escuchar cambios de autenticación
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // Función al crear una nueva publicación
  function handlePublicada(nueva) {
    setPublicaciones((prev) => {
      if (prev.some((p) => p.id === nueva.id)) return prev;
      return [nueva, ...prev];
    });
    setShowModal(false);
  }

  return (
    <div className="max-w-xl mx-auto py-6 px-4">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Comunidad</h1>

      {/* Panel de publicación solo si hay sesión */}
      {session && (
        <div
          onClick={() => setShowModal(true)}
          className="
    border border-gray-300 rounded-xl p-5 mb-6 shadow-lg cursor-pointer
    bg-gradient-to-tr from-[#39c2ff] via-[#39c2ff] to-white
    hover:from-[#00aaff] hover:to-[#39c2ff]
    transition-all duration-400 ease-in-out
    transform hover:scale-105
  "
        >
          <p className="text-gray-800 font-semibold text-lg">
            ¿Qué estás pensando?
          </p>
        </div>
      )}

      {/* Modal para crear publicación */}
      {showModal && session && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Crear publicación
            </h2>
            <CrearPublicacionModal
              usuarioId={session.user.id} // usar id real del usuario
              onPublicada={handlePublicada}
            />
            <button
              className="mt-4 w-full text-center text-sm text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Feed */}
      <ListaPublicaciones publicaciones={publicaciones} />

      {/* Elemento invisible para scroll infinito */}
      <div ref={observerRef} className="h-1"></div>

      {/* Cargando más publicaciones */}
      {loading && (
        <p className="text-center text-gray-400 mt-4">
          Cargando más publicaciones...
        </p>
      )}

      {/* Mensaje si no hay más publicaciones */}
      {!hasMore && publicaciones.length > 0 && (
        <p className="text-center text-gray-400 mt-4">
          No hay más publicaciones
        </p>
      )}
    </div>
  );
}
