import { Calendar, Users } from "lucide-react";

export default function RecentActivities() {
  const actividades = [
    {
      titulo: "Feria de Artesanía",
      fecha: "05/09/2025",
      participantes: "120 personas",
      categoria: "Cultural",
    },
    {
      titulo: "Concierto en el Parque Central",
      fecha: "03/09/2025",
      participantes: "300 personas",
      categoria: "Música",
    },
    {
      titulo: "Carrera 5K",
      fecha: "01/09/2025",
      participantes: "80 personas",
      categoria: "Deporte",
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Actividades Recientes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {actividades.map((act, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow p-4">
              <h3 className="text-lg font-bold mb-2">{act.titulo}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" /> {act.fecha}
                </span>
                <span className="flex items-center">
                  <Users className="w-4 h-4 mr-1" /> {act.participantes}
                </span>
              </div>
              <span className="inline-block px-2 py-1 border rounded text-xs">
                {act.categoria}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
