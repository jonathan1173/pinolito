import PublicacionCard from "./PublicacionCard";

export default function ListaPublicaciones({ publicaciones, observerRef }) {
  return (
    <div>
      {publicaciones.map((pub) => (
        <PublicacionCard key={pub.id} publicacion={pub} />
      ))}
      {/* Observador de scroll */}
      <div ref={observerRef} className="h-8" />
    </div>
  );
}
