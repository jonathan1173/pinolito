import CultureCard from "./CultureCard";

export default function HistorySection() {
  const historias = [
    { id: 1, titulo: "Fundación del Departamento", descripcion: "Este departamento fue fundado en el siglo XIX y jugó un papel clave en la independencia nacional." ,imagen_url: "https://via.placeholder.com/15"},
    { id: 2, titulo: "Batalla histórica", descripcion: "Aquí ocurrió una batalla importante donde se defendió la soberanía frente a fuerzas extranjeras." ,imagen_url: "https://via.placeholder.com/15"},
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {historias.map((h) => (
        <CultureCard key={h.id} titulo={h.titulo} descripcion={h.descripcion} imagen_url={h.imagen_url}/>
      ))}
    </div>
  );
}
