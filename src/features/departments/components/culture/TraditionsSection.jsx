import CultureCard from "./CultureCard";

export default function TraditionsSection() {
  const tradiciones = [
    { id: 1, titulo: "Fiesta Patronal", descripcion: "Celebración anual con procesiones, bailes y ferias gastronómicas.", imagen_url: "https://via.placeholder.com/15"},
    { id: 2, titulo: "Festival del Maíz", descripcion: "Evento cultural donde se presentan danzas, música y comidas hechas a base de maíz.",  imagen_url: "https://via.placeholder.com/15"},
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tradiciones.map((t) => (
        <CultureCard key={t.id} titulo={t.titulo} descripcion={t.descripcion} imagen_url={t.imagen_url}/>
      ))}
    </div>
  );
}
