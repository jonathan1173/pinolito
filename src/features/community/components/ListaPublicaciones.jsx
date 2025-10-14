import { useState } from "react";
import PublicacionCard from "./PublicacionCard";
import ComentariosModal from "./ComentariosModal";

export default function ListaPublicaciones({ publicaciones, usuarioId }) {
  const [selectedPub, setSelectedPub] = useState(null);

  return (
    <>
      {publicaciones.map((pub) => (
        <PublicacionCard
          key={pub.id}
          publicacion={pub}
          usuarioId={usuarioId}
          onComentar={setSelectedPub}
        />
      ))}

      {selectedPub && (
        <ComentariosModal
          publicacion={selectedPub}
          usuarioId={usuarioId} // ✅ ID numérico del usuario
          onClose={() => setSelectedPub(null)}
        />
      )}
    </>
  );
}
