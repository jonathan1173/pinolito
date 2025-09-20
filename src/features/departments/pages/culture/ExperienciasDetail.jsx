// src/features/departments/pages/culture/ExperienciasDetail.jsx
import { useParams } from "react-router-dom";
import { useExperiencias } from "../../hooks/useExperiencias";

export default function ExperienciasDetail() {
  const { departmentSlug, slug } = useParams();
  const { experiencia, loading, error } = useExperiencias({ departmentSlug, slug });

  if (loading) return <p>Cargando experiencia...</p>;
  if (error) return <p>Error al cargar experiencia.</p>;
  if (!experiencia) return <p>No se encontró la experiencia.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      {experiencia.imagen_url && (
        <div className="w-full h-64 mb-4 overflow-hidden rounded-md">
          <img
            src={experiencia.imagen_url}
            alt={experiencia.nombre}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <h1 className="text-2xl font-bold mb-2">{experiencia.nombre}</h1>
      <p className="text-gray-700">{experiencia.descripcion}</p>
    </div>
  );
}
