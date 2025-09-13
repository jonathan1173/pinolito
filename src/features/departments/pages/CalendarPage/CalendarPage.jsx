import React, { useState } from "react";
import Hero from "../../../../shared/components/Hero";
import Calendario from "./components/Calendario";
import PanelEventos from "./components/PanelEventos";
import useEventos from "./hooks/useEventos";

export default function CalendarPage() {
  const { eventos, loading, error } = useEventos();
  const [selectedEvents, setSelectedEvents] = useState([]);

  if (loading) return <p className="text-center py-16">Cargando eventos...</p>;
  if (error) return <p className="text-center py-16">Error cargando eventos</p>;

  return (
    <div className="min-h-screen bg-red-500">
      <Hero
        title={
          <>
            Calendario <span className="text-blue-600">Cultural</span>
          </>
        }
        paragraph="Mantente informado sobre festivales, celebraciones y eventos culturales en todo Nicaragua."
      />

<section className="py-8 lg:py-16">
  <div className="max-w-7xl mx-auto px-2 sm:px-4 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
    {/* Calendario */}
    <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-lg shadow">
      <Calendario
        eventos={eventos}
        onDateClick={setSelectedEvents}
      />
    </div>

    {/* Panel lateral */}
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
      <PanelEventos eventos={selectedEvents} />
    </div>
  </div>
</section>

    </div>
  );
}
