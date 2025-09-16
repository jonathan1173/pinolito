import React, { useState } from "react";
import Hero from "../../../../shared/components/Hero";
import Calendario from "./components/Calendario";
import PanelEventos from "./components/PanelEventos";
import useEventos from "./hooks/useEventos";

export default function CalendarPage() {
  const { eventos, loading, error } = useEventos();
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (eventsOfTheDay, date) => {
    setSelectedEvents(eventsOfTheDay);
    setSelectedDate(date);
  };

  return (
    <div className="min-h-screen bg-red-600">
      <Hero
        title={
          <>
            Calendario <span className="text-blue-600">Cultural</span>
          </>
        }
        paragraph="Mantente informado sobre festivales, celebraciones y eventos culturales en todo Nicaragua."
      />

      <section className="py-16">
        <div className=" mx-auto px-2 md:px-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className=" lg:col-span-2 bg-white p-2 rounded-lg shadow">
            {loading ? (
              <p className="text-center py-16">Cargando eventos...</p>
            ) : error ? (
              <p className="text-center py-16 text-red-500">
                Error cargando eventos
              </p>
            ) : (
              <Calendario
                eventos={eventos}
                onDateClick={(events, date) => handleDateClick(events, date)}
              />
            )}
          </div>
          <div className="lg:max-h-[500px] bg-white p-6 rounded-lg shadow flex flex-col">
            <div className="flex-1 overflow-y-auto">
              <PanelEventos
                eventos={selectedEvents}
                selectedDate={selectedDate}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
