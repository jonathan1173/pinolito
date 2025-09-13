import React from "react";
import { Clock, MapPin, Users } from "lucide-react";

export default function EventCard({ evento }) {
  return (
    <div
      className="border rounded-lg flex flex-col justify-end p-4 h-40 bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${evento.imagen_url})`,
      }}
    >
      {/* Overlay oscuro para legibilidad */}
      <div className="absolute inset-0 bg-black/50 bg-opacity-40 rounded-lg"></div>

      <div className="relative flex-1 flex flex-col justify-end text-white">
        <h4 className="font-semibold text-sm">{evento.nombre}</h4>
        <p className="text-xs flex items-center">{evento.descripcion}</p>
        <p className="text-xs flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          {evento.hora}
        </p>
        <p className="text-xs flex items-center">
          <MapPin className="w-3 h-3 mr-1" />
          {evento.ubicacion}
        </p>
        <p className="text-xs flex items-center">
          <Users className="w-3 h-3 mr-1" />
          {evento.participantes || 0} personas
        </p>
      </div>
    </div>
  );
}
