import CultureCard from "./CultureCard";

export default function SocietySection() {
  const personajes = [
    { id: 1, titulo: "Doña María López", descripcion: "Artesana reconocida por su trabajo en cerámica tradicional.", imagen_url: "https://via.placeholder.com/15"},
    { id: 2, titulo: "Juan Pérez", descripcion: "Músico local que preserva los ritmos autóctonos del departamento." , imagen_url: "https://via.placeholder.com/15"},
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {personajes.map((p) => (
        <CultureCard key={p.id} titulo={p.titulo} descripcion={p.descripcion} imagen_url={p.imagen_url} />
      ))}
    </div>
  );
}
