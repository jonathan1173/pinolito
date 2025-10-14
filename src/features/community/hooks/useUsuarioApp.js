import { useState, useEffect } from "react";
import { supabase } from "../../../services/supabaseClient";

/**
 * Hook para obtener el ID real del usuario en tu tabla "usuarios"
 * a partir del UUID del usuario en Supabase Auth.
 *
 * @param {string|null} authUuid - UUID del usuario en Supabase (session.user.id)
 * @returns {{ usuarioId: number|null, loading: boolean, error: string|null }}
 */
export function useUsuarioApp(authUuid) {
  const [usuarioId, setUsuarioId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authUuid) {
      console.warn("⚠️ useUsuarioApp: No se recibió authUuid.");
      setUsuarioId(null);
      setLoading(false);
      return;
    }

    const fetchUsuario = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log(`🔍 Buscando usuario en la tabla 'usuarios' con auth_uuid = ${authUuid}`);

        const { data, error } = await supabase
          .from("usuarios")
          .select("id")
          .eq("auth_uuid", authUuid)
          .single();

        if (error) throw error;

        if (data?.id) {
          console.log(`✅ Usuario encontrado: ID = ${data.id}`);
        } else {
          console.warn("⚠️ No se encontró ningún usuario con ese auth_uuid.");
        }

        setUsuarioId(data?.id ?? null);
      } catch (err) {
        console.error("❌ Error obteniendo usuario de la tabla 'usuarios':", err);
        setError(err.message);
        setUsuarioId(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [authUuid]);

  return { usuarioId, loading, error };
}
