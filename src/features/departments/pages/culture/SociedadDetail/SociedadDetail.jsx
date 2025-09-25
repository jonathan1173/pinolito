// src/features/departments/pages/culture/SociedadDetail.jsx
import { useDetalle } from "../../../hooks/useDetalle";
import { useParams } from "react-router-dom";
import CultureHero from "../CultureHero"; 

export default function SociedadDetail() {
  const { slug } = useParams();
  const { item, loading, error } = useDetalle({ tabla: "gente_y_sociedad", slug });

  if (loading) return <p>Cargando sociedad...</p>;
  if (error) return <p>Error al cargar el elemento.</p>;
  if (!item) return <p>No se encontró el elemento.</p>;

  return (
    <div >
      <CultureHero item={item}/>

    </div>
  );
}
