import React from "react";
import {
  MapPin,
  Users,
  Heart,
  Calendar,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";
import Hero from "../../../shared/components/Hero";

export default function DepartmentsPage() {
  const ciudadesCreativas = [
    {
      id: "Masaya",
      nombre: "Masaya",
      departamento: "Masaya",
      descripcion: "Artesanía y Folclore",
      imagen: "/masaya-artesania-folclore-nicaragua.png",
      actividades: 23,
      especialidades: ["Artesanías", "Música Folclórica", "Danza"],
    },
    {
      id: "Granada",
      nombre: "Granada",
      departamento: "Granada",
      descripcion: "Música y Patrimonio",
      imagen: "/granada-musica-patrimonio-nicaragua-colonial.png",
      actividades: 31,
      especialidades: ["Música", "Patrimonio", "Turismo Cultural"],
    },
    {
      id: "Managua",
      nombre: "Managua",
      departamento: "Managua",
      descripcion: "Arte Contemporáneo y Cultura",
      imagen: "/managua-arte-contemporaneo-cultura-nicaragua.png",
      actividades: 45,
      especialidades: ["Arte Contemporáneo", "Gastronomía", "Eventos"],
    },
  ];

  // Color uniforme para todas las ciudades
  const colorUniforme = "from-green-500 to-green-700";

  return (
    <div>
      <Hero
        title="¡Sumérgete en la Cultura!"
        paragraph="Descubre la riqueza de Nicaragua con juegos que te harán aprender de forma divertida."
        ctaLink="calendar"
        ctaText="Ver Calendarios de Eventos"
        Icon={Calendar}
      />

      {/* Grid de Ciudades */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ciudadesCreativas.map((ciudad) => {
            return (
              <Link
                key={ciudad.id}
                to={`/department/${ciudad.id}`}
                className="group bg-white rounded-lg shadow hover:shadow-xl overflow-hidden transition-all hover:-translate-y-2"
              >
                <div className="relative">
                  <img
                    src={ciudad.imagen}
                    alt={`${ciudad.nombre} - ${ciudad.descripcion}`}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${colorUniforme} opacity-20 group-hover:opacity-30`}
                  />
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold group-hover:text-blue-600">
                        {ciudad.nombre}
                      </h2>
                      <p className="text-gray-600">{ciudad.descripcion}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Sparkles className="w-4 h-4 mr-1" />{" "}
                        {ciudad.actividades} actividades
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {ciudad.especialidades.map((esp, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-gray-100 rounded text-xs"
                        >
                          {esp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
