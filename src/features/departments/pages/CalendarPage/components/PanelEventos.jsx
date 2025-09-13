import React from "react";
import { Calendar } from "lucide-react";
import EventoCard from "./EventCard";

export default function PanelEventos({ eventos }) {
  if (eventos.length === 0) {
    return (
      <div className="text-center text-gray-500 py-6">
        <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p>No hay eventos programados</p>
      </div>
    );
  }

  return (
    <div className="max-h-[350px] lg:max-h-[600px] overflow-y-auto space-y-4">
      {eventos.map((evento) => (
        <EventoCard key={evento.id} evento={evento.extendedProps} />
      ))}
    </div>
  );
}
