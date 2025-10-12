import { useState } from "react";
import { supabase } from "../../../services/supabaseClient";
import { createPublicacion } from "../services/publicacionesService";

export default function CrearPublicacionModal({ usuarioId, onPublicada }) {
  const [contenido, setContenido] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Función para subir imagen al bucket y obtener URL pública
async function handleUpload(file) {
  const fileName = `${Date.now()}_${file.name.replace(/\s/g, "_")}`;
  
  // Subir al bucket
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("posts")
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  // Obtener URL pública
  const { data: urlData, error: urlError } = supabase.storage
    .from("posts")
    .getPublicUrl(fileName);

  if (urlError) throw urlError;

  return urlData.publicUrl; // <--- aquí está la URL correcta
}


  // Submit del formulario
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      let imagen_url = null;
      if (file) {
        imagen_url = await handleUpload(file); // Subir imagen
      }

      const nuevaPublicacion = await createPublicacion({
        usuario_id: usuarioId,
        contenido,
        imagen_url, // Guardar URL pública
      });

      onPublicada(nuevaPublicacion); // Agregar al feed
      setContenido("");
      setFile(null);
    } catch (error) {
      console.error("Error creando publicación:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="w-full border p-2 rounded mb-2"
        placeholder="Escribe algo..."
        value={contenido}
        onChange={(e) => setContenido(e.target.value)}
      />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button
        type="submit"
        className="mt-2 w-full bg-blue-500 text-white p-2 rounded"
        disabled={loading}
      >
        {loading ? "Publicando..." : "Publicar"}
      </button>
    </form>
  );
}
