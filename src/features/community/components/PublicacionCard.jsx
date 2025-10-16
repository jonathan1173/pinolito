import { useLikes } from "../hooks/useLikes";
import { MessageCircle, ThumbsUp } from "lucide-react";

export default function PublicacionCard({ publicacion, usuarioId, onComentar }) {
  const { likes, liked, toggleLike } = useLikes(publicacion.id, usuarioId);

  return (
    <div className="bg-white  border-1 border-gray-500 rounded-lg p-4 mb-4 shadow-2xl">
      <p className="text-gray-800 mb-2">{publicacion.contenido}</p>

      {publicacion.imagen_url && (
        <img
          src={publicacion.imagen_url}
          alt="imagen de publicación"
          className="rounded-md mb-3 max-h-96 object-cover"
        />
      )}

      <div className="flex items-center justify-between text-sm text-gray-500 mt-2 border-t pt-2">
        <button
          onClick={toggleLike}
          className={`flex items-center gap-1 hover:text-blue-500 transition ${
            liked ? "text-blue-600 font-semibold" : ""
          }`}
        >
          <ThumbsUp size={16} />
          {likes > 0 && <span>{likes}</span>} Me gusta
        </button>

        <button
          onClick={() => onComentar(publicacion)}
          className="flex items-center gap-1 hover:text-blue-500 transition"
        >
          <MessageCircle size={16} /> Comentar
        </button>
      </div>
    </div>
  );
}
