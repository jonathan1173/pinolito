import { useState, useEffect } from "react";
import { supabase } from "../../../services/supabaseClient";

export function useLikes(referencia_id, usuario_id) {
  const referencia_tipo = "publicacion";
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!referencia_id) return;

    async function fetchLikes() {
      try {
        // 1️⃣ Contar likes totales
        const { count, error: countError } = await supabase
          .from("me_gusta")
          .select("id", { count: "exact", head: true })
          .eq("referencia_tipo", referencia_tipo)
          .eq("referencia_id", referencia_id);

        if (countError) throw countError;
        setLikes(count || 0);

        // 2️⃣ Verificar si el usuario ya dio like
        if (usuario_id) {
          const { data, error } = await supabase
            .from("me_gusta")
            .select("id")
            .eq("usuario_id", usuario_id)
            .eq("referencia_tipo", referencia_tipo)
            .eq("referencia_id", referencia_id);

          if (error) throw error;
          setLiked(data && data.length > 0);
        }
      } catch (err) {
        console.error("Error fetching likes:", err);
      }
    }

    fetchLikes();
  }, [referencia_id, usuario_id]);

  const toggleLike = async () => {
    if (!usuario_id) return;

    try {
      if (liked) {
        // 🔽 Quitar like
        await supabase
          .from("me_gusta")
          .delete()
          .eq("usuario_id", usuario_id)
          .eq("referencia_tipo", referencia_tipo)
          .eq("referencia_id", referencia_id);
        setLikes((prev) => prev - 1);
      } else {
        // 🔼 Agregar like
        await supabase.from("me_gusta").insert([
          {
            usuario_id,
            referencia_tipo,
            referencia_id,
          },
        ]);
        setLikes((prev) => prev + 1);
      }
      setLiked(!liked);
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  return { likes, liked, toggleLike };
}
