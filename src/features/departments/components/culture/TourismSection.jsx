import CultureCard from "./CultureCard";

export default function TourismSection() {
  const lugares = [
    { id: 1, titulo: "Laguna Encantada", descripcion: "Un cuerpo de agua rodeado de vegetación, ideal para ecoturismo.", imagen_url: "https://via.placeholder.com/150" },
    { id: 2, titulo: "Cerro Sagrado", descripcion: "Montaña con senderos para caminatas y miradores panorámicos.", imagen_url: "https://via.placeholder.com/150" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {lugares.map((l) => (
        <CultureCard key={l.id} titulo={l.titulo} descripcion={l.descripcion} imagen_url={l.imagen_url} />
      ))}
    </div>
  );
}
