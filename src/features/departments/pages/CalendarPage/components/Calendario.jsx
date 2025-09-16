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
      moreLinkContent={(arg) => `+${arg.num} más`}
      dateClick={(info) => {
        const eventsOfTheDay = fcEvents.filter(e => e.start === info.dateStr);
        onDateClick(eventsOfTheDay, info.date);
      }}
      eventClick={(info) => {
        const eventsOfTheDay = fcEvents.filter(e => e.start === info.event.startStr);
        onDateClick(eventsOfTheDay, info.event.start);
      }}
      height="auto"
      fixedWeekCount={false}
      contentHeight="auto"
      dayCellClassNames="text-xs sm:text-sm"
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: ''
      }}
      // Aplicar estilos a título y botones después de renderizar
      datesSet={() => {
        // Título en negrita y tamaño reducido
        const titleEl = document.querySelector('.fc-toolbar-title');
        if (titleEl) {
          titleEl.style.fontSize = '1rem'; // tamaño
          titleEl.style.fontWeight = '700'; // negrita
        }
        // Botones más pequeños y con padding reducido
        const buttons = document.querySelectorAll('.fc-button');
        buttons.forEach(btn => {
          btn.style.fontSize = '0.75rem'; // 12px
          btn.style.padding = '0.25rem 0.5rem';
        });
      }}
    />
  );
}
