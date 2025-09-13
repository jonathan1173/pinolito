import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function Calendario({ eventos, onDateClick }) {
  const fcEvents = eventos.map(ev => ({
    id: ev.id,
    title: ev.nombre,
    start: ev.fecha,
    allDay: true,
    extendedProps: ev,
  }));

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={fcEvents}
      dayMaxEvents={2}
      moreLinkContent={(arg) => `+${arg.num} más`} // Corregido
      dateClick={(info) => {
        const eventsOfTheDay = fcEvents.filter(
          e => e.start === info.dateStr
        );
        onDateClick(eventsOfTheDay);
      }}
      eventClick={(info) => {
        const eventsOfTheDay = fcEvents.filter(
          e => e.start === info.event.startStr
        );
        onDateClick(eventsOfTheDay);
      }}
      height={600}
      fixedWeekCount={false}
    />
  );
}
