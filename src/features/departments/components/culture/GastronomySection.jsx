import CultureCard from "./CultureCard";

export default function GastronomySection() {
  const comidas = [
    { id: 1, titulo: "Nacatamal", descripcion: "Plato típico con maíz, carne y verduras envuelto en hojas de plátano.", imagen_url: "https://via.placeholder.com/150" },
    { id: 2, titulo: "Indio Viejo", descripcion: "Guiso espeso preparado con carne desmenuzada, maíz y especias locales.", imagen_url: "https://via.placeholder.com/150" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {comidas.map((c) => (
        <CultureCard key={c.id} titulo={c.titulo} descripcion={c.descripcion} imagen_url={c.imagen_url} />
      ))}
    </div>
  );
}
