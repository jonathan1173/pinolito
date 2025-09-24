import { useEffect, useState } from "react";
import { supabase } from "../../../../services/supabaseClient";
import CultureCard from "./CultureCard";

export default function CultureSection({
  departamentoId,
  departmentSlug,
  tabla,
  categoria, // <- agregamos la categoría
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!departamentoId) return;

    const fetchItems = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from(tabla)
          .select("id, nombre, imagen_url, slug")
          .eq("departamento_id", departamentoId);

        if (error) throw error;

        const normalized = data.map((d) => ({
          id: d.id,
          nombre: d.nombre,
          imagen_url: d.imagen_url,
          slug: d.slug,
        }));

        setItems(normalized);
      } catch (err) {
        console.error("Error al obtener los elementos:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [departamentoId, tabla]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar la sección.</p>;
  if (!items.length) return <p>No hay elementos disponibles.</p>;
  // console.log(categoria);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <CultureCard
          key={item.id}
          titulo={item.nombre}
          imagen_url={item.imagen_url}
          departmentSlug={departmentSlug}
          slug={item.slug}
          categoria={categoria} // <- usamos la categoría para generar la ruta correcta
        />
      ))}
    </div>
  );
}
