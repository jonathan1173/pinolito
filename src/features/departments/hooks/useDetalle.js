// src/features/departments/hooks/useDetalle.js
import { useState, useEffect } from "react";
import { supabase } from "../../../services/supabaseClient";

export function useDetalle({ tabla, slug }) {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // console.log(tabla);
    // console.log({ slug });
    useEffect(() => {
        if (!slug) return;

        const fetchItem = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from(tabla)
                    .select("*")
                    .eq("slug", slug)
                    .limit(1);

                if (error) throw error;
                setItem(data?.[0] || null);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [tabla, slug]);

    return { item, loading, error };
}
