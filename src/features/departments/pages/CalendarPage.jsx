import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  Music,
  Palette,
  Utensils,
  BookOpen,
  Camera,
  Theater,
  Star,
} from "lucide-react";
import Hero from "../../../shared/components/Hero";

export default function CalendarioPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [tab, setTab] = useState("calendario");

  const eventos = [
    {
      id: 1,
      titulo: "Festival de Marimba",
      descripcion:
        "Celebración de música tradicional con grupos de todo el país",
      fecha: new Date(2024, 2, 15),
      hora: "18:00",
      ubicacion: "Parque Central, Masaya",
      organizador: "Casa de la Cultura Masaya",
      categoria: "Música",
      participantes: 200,
      precio: "Gratis",
      icono: Music,
      color: "bg-blue-500",
    },
    {
      id: 2,
      titulo: "Taller de Cerámica",
      descripcion: "Aprende técnicas tradicionales de cerámica nicaragüense",
      fecha: new Date(2024, 2, 22),
      hora: "14:00",
      ubicacion: "San Juan de Oriente, Masaya",
      organizador: "Cooperativa de Artesanos",
      categoria: "Artesanías",
      participantes: 25,
      precio: "C$ 150",
      icono: Palette,
      color: "bg-purple-500",
    },
    {
      id: 3,
      titulo: "Feria Gastronómica",
      descripcion: "Muestra de comida típica de León y sus alrededores",
      fecha: new Date(2024, 3, 5),
      hora: "10:00",
      ubicacion: "Plaza Central, León",
      organizador: "Alcaldía de León",
      categoria: "Gastronomía",
      participantes: 500,
      precio: "Gratis",
      icono: Utensils,
      color: "bg-orange-500",
    },
    {
      id: 4,
      titulo: "Recital Poético",
      descripcion: "Homenaje a Rubén Darío con poetas contemporáneos",
      fecha: new Date(2024, 3, 18),
      hora: "19:00",
      ubicacion: "Teatro Nacional, Managua",
      organizador: "Instituto Nicaragüense de Cultura",
      categoria: "Literatura",
      participantes: 150,
      precio: "C$ 100",
      icono: BookOpen,
      color: "bg-green-500",
    },
    {
      id: 5,
      titulo: "Exposición Fotográfica",
      descripcion: "Paisajes y cultura del Caribe nicaragüense",
      fecha: new Date(2024, 4, 10),
      hora: "16:00",
      ubicacion: "Centro Cultural, Bluefields",
      organizador: "Colectivo Fotográfico Caribe",
      categoria: "Arte Visual",
      participantes: 80,
      precio: "Gratis",
      icono: Camera,
      color: "bg-teal-500",
    },
    {
      id: 6,
      titulo: "Festival de Danza Folclórica",
      descripcion: "Presentación de grupos de danza tradicional",
      fecha: new Date(2024, 4, 25),
      hora: "17:00",
      ubicacion: "Plaza de la Revolución, Managua",
      organizador: "Ballet Folclórico Nacional",
      categoria: "Danza",
      participantes: 300,
      precio: "Gratis",
      icono: Theater,
      color: "bg-pink-500",
    },
  ];

  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({ date, isCurrentMonth: true });
    }
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day);
      days.push({ date: nextDate, isCurrentMonth: false });
    }
    return days;
  };

  const getEventsForDate = (date) => {
    return eventos.filter(
      (evento) => evento.fecha.toDateString() === date.toDateString()
    );
  };

  const nextMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  const prevMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );

  const proximosEventos = eventos
    .filter((evento) => evento.fecha >= new Date())
    .sort((a, b) => a.fecha.getTime() - b.fecha.getTime())
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero
        title={
          <>
            Calendario <span className="text-blue-600">Cultural</span>
          </>
        }
        paragraph=" Mantente informado sobre festivales, celebraciones y eventos
            culturales en todo Nicaragua."
      
      />


      {/* Tabs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 border-b mb-8">
            <button
              className={`py-3 text-lg ${
                tab === "calendario"
                  ? "border-b-2 border-blue-600 font-semibold"
                  : ""
              }`}
              onClick={() => setTab("calendario")}
            >
              Vista Calendario
            </button>
            <button
              className={`py-3 text-lg ${
                tab === "lista"
                  ? "border-b-2 border-blue-600 font-semibold"
                  : ""
              }`}
              onClick={() => setTab("lista")}
            >
              Lista de Eventos
            </button>
          </div>

          {tab === "calendario" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calendario */}
              <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">
                    {meses[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h2>
                  <div className="flex space-x-2">
                    <button onClick={prevMonth} className="p-2 border rounded">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button onClick={nextMonth} className="p-2 border rounded">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1 mb-2 text-sm text-gray-500">
                  {diasSemana.map((d) => (
                    <div key={d} className="p-2 text-center">
                      {d}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {getDaysInMonth(currentDate).map((day, i) => {
                    const eventosDia = getEventsForDate(day.date);
                    const isToday =
                      day.date.toDateString() === new Date().toDateString();
                    const isSelected =
                      selectedDate?.toDateString() === day.date.toDateString();
                    return (
                      <div
                        key={i}
                        onClick={() => setSelectedDate(day.date)}
                        className={`p-2 min-h-[60px] border cursor-pointer text-sm
                          ${
                            !day.isCurrentMonth
                              ? "text-gray-400 bg-gray-100"
                              : ""
                          }
                          ${isToday ? "bg-blue-100 border-blue-400" : ""}
                          ${
                            isSelected ? "bg-yellow-100 border-yellow-400" : ""
                          }`}
                      >
                        <div className="font-medium">{day.date.getDate()}</div>
                        <div className="space-y-1">
                          {eventosDia.slice(0, 2).map((ev) => (
                            <div
                              key={ev.id}
                              className={`text-xs p-1 rounded text-white ${ev.color} truncate`}
                            >
                              {ev.titulo}
                            </div>
                          ))}
                          {eventosDia.length > 2 && (
                            <div className="text-xs text-gray-500">
                              +{eventosDia.length - 2} más
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sidebar eventos */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">
                  {selectedDate
                    ? `Eventos - ${selectedDate.toLocaleDateString("es-NI", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}`
                    : "Próximos Eventos"}
                </h3>
                <div className="space-y-4">
                  {(selectedDate
                    ? getEventsForDate(selectedDate)
                    : proximosEventos.slice(0, 3)
                  ).map((ev) => {
                    const IconComp = ev.icono;
                    return (
                      <div key={ev.id} className="border p-4 rounded-lg">
                        <div className="flex space-x-3">
                          <div
                            className={`w-10 h-10 flex items-center justify-center rounded ${ev.color}`}
                          >
                            <IconComp className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm">
                              {ev.titulo}
                            </h4>
                            <p className="text-xs text-gray-500 flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {ev.hora}
                            </p>
                            <p className="text-xs text-gray-500 flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {ev.ubicacion}
                            </p>
                            <p className="text-xs text-gray-500 flex items-center">
                              <Users className="w-3 h-3 mr-1" />
                              {ev.participantes} personas
                            </p>
                            <span className="mt-2 inline-block text-xs border rounded px-2 py-0.5">
                              {ev.categoria}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {selectedDate &&
                    getEventsForDate(selectedDate).length === 0 && (
                      <div className="text-center text-gray-500 py-6">
                        <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p>No hay eventos programados</p>
                      </div>
                    )}
                </div>
              </div>
            </div>
          )}

          {tab === "lista" && (
            <div className="space-y-8">
              {/* Filtros */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filtros
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select className="p-2 border rounded">
                    <option>Todas las categorías</option>
                    <option>Música</option>
                    <option>Artesanías</option>
                    <option>Gastronomía</option>
                    <option>Literatura</option>
                    <option>Arte Visual</option>
                    <option>Danza</option>
                  </select>
                  <select className="p-2 border rounded">
                    <option>Todas las ubicaciones</option>
                    <option>Managua</option>
                    <option>León</option>
                    <option>Masaya</option>
                    <option>Granada</option>
                  </select>
                  <select className="p-2 border rounded">
                    <option>Todos los precios</option>
                    <option>Gratis</option>
                    <option>Con costo</option>
                  </select>
                </div>
              </div>

              {/* Lista de eventos */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {eventos.map((ev) => {
                  const IconComp = ev.icono;
                  return (
                    <div
                      key={ev.id}
                      className="bg-white rounded-lg shadow p-6 hover:shadow-lg"
                    >
                      <div className="flex justify-between mb-4">
                        <div className="flex space-x-3">
                          <div
                            className={`w-12 h-12 flex items-center justify-center rounded ${ev.color}`}
                          >
                            <IconComp className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-xl font-semibold">
                              {ev.titulo}
                            </h4>
                            <p className="text-sm text-gray-500 flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {ev.fecha.toLocaleDateString("es-NI", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`px-2 py-1 rounded text-sm ${
                            ev.precio === "Gratis"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {ev.precio}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{ev.descripcion}</p>
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>Hora:</strong> {ev.hora}
                        </p>
                        <p>
                          <strong>Ubicación:</strong> {ev.ubicacion}
                        </p>
                        <p>
                          <strong>Organizador:</strong> {ev.organizador}
                        </p>
                        <p>
                          <strong>Categoría:</strong>{" "}
                          <span className="border px-2 py-0.5 rounded">
                            {ev.categoria}
                          </span>
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-4 pt-4 border-t">
                        <span className="flex items-center text-sm text-gray-500">
                          <Users className="w-4 h-4 mr-1" />
                          {ev.participantes} asistirán
                        </span>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 border rounded text-sm flex items-center">
                            <Share2 className="w-4 h-4 mr-1" />
                            Compartir
                          </button>
                          <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm flex items-center">
                            <Heart className="w-4 h-4 mr-1" />
                            Me Interesa
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Eventos destacados */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Eventos Destacados</h2>
          <p className="text-lg text-gray-600 mb-12">
            No te pierdas estos eventos especiales
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {proximosEventos.slice(0, 3).map((ev) => {
              const IconComp = ev.icono;
              return (
                <div
                  key={ev.id}
                  className="bg-white rounded-lg shadow p-6 hover:shadow-lg"
                >
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${ev.color}`}
                  >
                    <IconComp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{ev.titulo}</h3>
                  <p className="text-gray-600 mb-4">{ev.descripcion}</p>
                  <div className="space-y-1 text-sm text-gray-500 mb-6">
                    <p className="flex justify-center items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {ev.fecha.toLocaleDateString("es-NI", {
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="flex justify-center items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {ev.ubicacion}
                    </p>
                    <p className="flex justify-center items-center">
                      <Star className="w-4 h-4 mr-1" />
                      {ev.precio}
                    </p>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 rounded flex items-center justify-center">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar al Calendario
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
