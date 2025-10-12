export default function PublicacionCard({ publicacion }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-200">
      {/* Usuario */}
      <div className="text-sm text-gray-600 mb-2">
        👤 Usuario #{publicacion.usuario_id}
      </div>

      {/* Contenido */}
      {publicacion.contenido && (
        <p className="text-gray-800 mb-3">{publicacion.contenido}</p>
      )}

      {/* Imagen */}
      {publicacion.imagen_url && (
        <img
          src={publicacion.imagen_url}
          alt="Publicación"
          className="w-full rounded-md mb-3"
        />
      )}

      {/* Fecha */}
      <p className="text-xs text-gray-400 mb-2">
        {new Date(publicacion.fecha_creacion).toLocaleString()}
      </p>

      {/* Botones */}
      <div className="flex gap-6 text-sm text-gray-600 font-medium">
        <button className="hover:text-blue-500 transition">👍 Me gusta</button>
        <button className="hover:text-blue-500 transition">💬 Comentar</button>
      </div>
    </div>
  );
}
