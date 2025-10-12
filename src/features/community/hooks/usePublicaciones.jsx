import { useEffect, useState, useRef } from "react";
import { fetchPublicaciones } from "../services/publicacionesService";
import { supabase } from "../../../services/supabaseClient";

export function usePublicaciones() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [from, setFrom] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef();
  const limit = 5;

  // Set para controlar duplicados
  const idsSetRef = useRef(new Set());

  // Cargar publicaciones iniciales
  useEffect(() => {
    loadMore();
  }, []);

  // Scroll infinito
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [observerRef.current, loading, hasMore]);

  // Realtime: escuchar nuevas publicaciones
  useEffect(() => {
    const channel = supabase
      .channel("publicaciones-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "publicaciones" },
        (payload) => {
          setPublicaciones((prev) => {
            if (idsSetRef.current.has(payload.new.id)) return prev;
            idsSetRef.current.add(payload.new.id);
            return [payload.new, ...prev];
          });
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  // Función para cargar más publicaciones
  async function loadMore() {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const data = await fetchPublicaciones({ limit, from });

      // Filtrar publicaciones ya existentes
      const newData = data.filter((pub) => !idsSetRef.current.has(pub.id));
      newData.forEach((pub) => idsSetRef.current.add(pub.id));

      setPublicaciones((prev) => [...prev, ...newData]);
      setFrom((prev) => prev + data.length);

      if (data.length < limit) setHasMore(false);
    } catch (err) {
      console.error("Error cargando publicaciones:", err);
    } finally {
      setLoading(false);
    }
  }

  return { publicaciones, setPublicaciones, observerRef, loading, hasMore };
}
