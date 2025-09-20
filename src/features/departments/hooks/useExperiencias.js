// src/features/departments/hooks/useExperiencias.js
import { useState, useEffect } from "react";
import { supabase } from "../../../services/supabaseClient";

export function useExperiencias({ departmentSlug, slug }) {
  const [experiencia, setExperiencia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperiencia = async () => {
      setLoading(true);
      try {
        let query = supabase
          .from("lugares")
          .select(`
            id,
            nombre,
            descripcion,
            imagen_url,
            departamento_id,
            slug
          `)
          .eq("slug", slug)
          .limit(1);

        const { data, error } = await query;

        if (error) throw error;
        setExperiencia(data?.[0] || null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchExperiencia();
  }, [slug]);

  return { experiencia, loading, error };
}
