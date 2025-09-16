import { useEffect, useState } from "react";
import axios from "axios";
import CultureCard from "./CultureCard";
import { motion, AnimatePresence } from "framer-motion";

export default function TourismSection({ departamentoId }) {
  const [lugares, setLugares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // console.log("nombre departamento" + departamentoId)

  useEffect(() => {
    const fetchLugares = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://vifqhfbtudcqbnsqwsqg.supabase.co/rest/v1/experiencias",
          {
            headers: {
              apikey: import.meta.env.VITE_SUPABASE_KEY,
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
            },
            params: {
              select: "id,nombre,imagen_url", // Solo trae título e imagen
              departamento_id: `eq.${departamentoId}`, 
            },
          }
        );

        // console.log("Datos recibidos:", response.data);
        setLugares(response.data);
      } catch (err) {
        console.error("Error al obtener los lugares:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLugares();
  }, [departamentoId]);

  if (loading) return <p>Cargando lugares turísticos...</p>;
  if (error) return <p>Error al cargar lugares.</p>;

  return (
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <AnimatePresence>
        {lugares.map((l) => (
          <motion.div
            key={l.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <CultureCard titulo={l.nombre} imagen_url={l.imagen_url} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
