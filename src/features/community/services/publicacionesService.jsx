import { supabase } from "../../../services/supabaseClient";

// Obtener publicaciones paginadas
export async function fetchPublicaciones({ limit = 5, from = 0 }) {
  const { data, error } = await supabase
    .from("publicaciones")
    .select("id, contenido, imagen_url, fecha_creacion, usuario_id")
    .order("fecha_creacion", { ascending: false })
    .range(from, from + limit - 1);

  if (error) throw error;
  return data;
}

// Crear nueva publicación
export async function createPublicacion({ usuario_id, contenido, imagen_url }) {
  const { data, error } = await supabase
    .from("publicaciones")
    .insert([{ usuario_id, contenido, imagen_url }])
    .select()
    .single();

  if (error) throw error;
  return data;
}
