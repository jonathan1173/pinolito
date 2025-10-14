import { useState, useEffect, useRef } from "react";
import { supabase } from "../../../services/supabaseClient";

export function useComentarios(referencia_id, limit = 5) {
  const referencia_tipo = "publicacion";
  const [comentarios, setComentarios] = useState([]);
  const [from, setFrom] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef();

  const fetchComentarios = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    const { data, error } = await supabase
    
      .from("comentarios")
      .select("id, usuario_id, contenido, fecha")
      .eq("referencia_tipo", referencia_tipo)
      .eq("referencia_id", referencia_id)
      .order("fecha", { ascending: false })
      .range(from, from + limit - 1);

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    if (data.length < limit) setHasMore(false);
    setComentarios((prev) => [...prev, ...data]);
    setFrom((prev) => prev + limit);
    setLoading(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) fetchComentarios();
    });

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [comentarios]);

  return { comentarios, observerRef, loading, hasMore, setComentarios };
}
