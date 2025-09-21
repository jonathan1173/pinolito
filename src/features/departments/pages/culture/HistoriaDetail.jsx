// src/features/departments/pages/culture/HistoriaDetail.jsx
import { useDetalle } from "../../hooks/useDetalle";
import { useParams } from "react-router-dom";

export default function HistoriaDetail() {
  const { slug } = useParams();
  const { item, loading, error } = useDetalle({ tabla: "historia", slug });

  if (loading) return <p>Cargando historia...</p>;
  if (error) return <p>Error al cargar la historia.</p>;
  if (!item) return <p>No se encontró la historia.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="bg-red-500">historia</h2>
      {item.imagen_url && (
        <div className="w-full h-64 mb-4 overflow-hidden rounded-md">
          <img
            src={item.imagen_url}
            alt={item.nombre}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <h1 className="text-2xl font-bold mb-2">{item.nombre}</h1>
      <p className="text-gray-700">{item.descripcion}</p>
    </div>
  );
}
