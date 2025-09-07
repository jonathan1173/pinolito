import React from "react";
import {
  MapPin,
  Users,
  Heart,
  Calendar,
  ArrowRight,
  Palette,
  Music,
  Utensils,
  Camera,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";
import Hero from "../../../shared/components/Hero";

export default function ActividadesPage() {
  const ciudadesCreativas = [
    {
      id: "masaya",
      nombre: "Masaya",
      departamento: "Masaya",
      descripcion: "Artesanía y Folclore",
      imagen: "/masaya-artesania-folclore-nicaragua.png",
      actividades: 23,
      participantes: 456,
      especialidades: ["Artesanías", "Música Folclórica", "Danza"],
      icono: Palette,
      color: "from-orange-500 to-red-500",
    },
    {
      id: "leon",
      nombre: "León",
      departamento: "León",
      descripcion: "Muralismo y Arte Urbano",
      imagen: "/leon-muralismo-arte-urbano-nicaragua.png",
      actividades: 18,
      participantes: 342,
      especialidades: ["Arte Urbano", "Literatura", "Teatro"],
      icono: Palette,
      color: "from-blue-500 to-teal-500",
    },
    {
      id: "granada",
      nombre: "Granada",
      departamento: "Granada",
      descripcion: "Música y Patrimonio",
      imagen: "/granada-musica-patrimonio-nicaragua-colonial.png",
      actividades: 31,
      participantes: 678,
      especialidades: ["Música", "Patrimonio", "Turismo Cultural"],
      icono: Music,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "san-juan-oriente",
      nombre: "San Juan de Oriente",
      departamento: "Masaya",
      descripcion: "Cerámica y Artesanía",
      imagen: "/san-juan-oriente-ceramica-artesania-nicaragua.png",
      actividades: 12,
      participantes: 189,
      especialidades: ["Cerámica", "Artesanía", "Tradiciones"],
      icono: Sparkles,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "managua",
      nombre: "Managua",
      departamento: "Managua",
      descripcion: "Arte Contemporáneo y Cultura",
      imagen: "/managua-arte-contemporaneo-cultura-nicaragua.png",
      actividades: 45,
      participantes: 892,
      especialidades: ["Arte Contemporáneo", "Gastronomía", "Eventos"],
      icono: Camera,
      color: "from-indigo-500 to-blue-500",
    },
    {
      id: "esteli",
      nombre: "Estelí",
      departamento: "Estelí",
      descripcion: "Cultura Cafetera y Tradiciones",
      imagen: "/esteli-cultura-cafetera-tradiciones-nicaragua.png",
      actividades: 16,
      participantes: 234,
      especialidades: ["Cultura Cafetera", "Artesanías", "Música"],
      icono: Utensils,
      color: "from-amber-500 to-orange-500",
    },
  ];

  const stats = [
    { numero: "18", label: "Departamentos", icono: MapPin },
    { numero: "145", label: "Ciudades Activas", icono: Sparkles },
    { numero: "2,847", label: "Participantes", icono: Users },
    { numero: "156", label: "Actividades Mensuales", icono: Heart },
  ];

  return (
    <div >
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
            const IconComponent = ciudad.icono;
            return (
              <a
                key={ciudad.id}
                href={`/actividades/${ciudad.id}`}
                className="group bg-white rounded-lg shadow hover:shadow-xl overflow-hidden transition-all hover:-translate-y-2"
              >
                <div className="relative">
                  <img
                    src={ciudad.imagen}
                    alt={`${ciudad.nombre} - ${ciudad.descripcion}`}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${ciudad.color} opacity-20 group-hover:opacity-30`}
                  />
                  <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
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
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />{" "}
                        {ciudad.participantes}
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
              </a>
            );
          })}
        </div>
      </section>


    </div>
  );
}
