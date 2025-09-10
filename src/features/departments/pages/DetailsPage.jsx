import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
} from "lucide-react";
import RecentActivities from "../components/RecentActivities";
import HeaderDepartements from "../components/HeaderDepartaments";
import PerfilCultural from "../components/ProfileCultural";
import DepartmentsLogos from "../components/DepartmentsLogos";

export default function CiudadDetallePage() {
  const { ciudad } = useParams();

  const ciudades = {
    Masaya: {
      nombre: "Masaya",
      descripcion: "Capital del Folclore Nicaragüense",
      imagen: "/iglesia.jpg",
      mapa: "/mapa-nicaragua-masaya-ubicacion.png",
      datosculturales: {
        arte: 85,
        artesania: 92,
        literatura: 67,
        danza: 78,
        musica: 88,
      },
      actividades: [
        {
          titulo: "Festival de Marimba",
          fecha: "15 Mar 2024",
          participantes: 120,
          categoria: "Música",
        },
        {
          titulo: "Taller de Cerámica",
          fecha: "22 Mar 2024",
          participantes: 35,
          categoria: "Artesanías",
        },
        {
          titulo: "Exposición Fotográfica",
          fecha: "5 Abr 2024",
          participantes: 67,
          categoria: "Arte Visual",
        },
      ],
      reconocimientos: [
        "🏆 Ciudad Creativa UNESCO",
        "🎨 Capital del Folclore Nacional",
        "🌟 Patrimonio Cultural Vivo",
      ],
      stats: {
        municipios: 12,
        participantes: "2.4K",
      },
    },
    Managua: {
      nombre: "Managua",
      descripcion: "La Gran Sultana del Lago",
      imagen: "/volcan-concepcion-2022.jpg",
      mapa: "/mapa-nicaragua-granada-ubicacion.png",
      datosculturales: {
        arte: 70,
        artesania: 60,
        literatura: 80,
        danza: 75,
        musica: 85,
      },
      actividades: [
        {
          titulo: "Feria Gastronómica",
          fecha: "10 Ene 2024",
          participantes: 300,
          categoria: "Gastronomía",
        },
        {
          titulo: "Concierto Sinfónico",
          fecha: "20 Feb 2024",
          participantes: 150,
          categoria: "Música",
        },
      ],
      reconocimientos: [
        "🏆 Centro Cultural Nacional",
        "🎭 Capital del Arte Contemporáneo",
      ],
      stats: {
        municipios: 10,
        participantes: "3.1K",
      },
    },
  };

  const ciudadSeleccionada = ciudades[ciudad];

  // si la ciudad no existe mostramos error
  if (!ciudadSeleccionada) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Ciudad no encontrada
        </h1>
        <p className="text-gray-600 mb-6">
          El municipio que buscas no está disponible en nuestra base de datos.
        </p>
        <Link
          to="/department"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver a Ciudades
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderDepartements department={ciudadSeleccionada} />

      {/* Cultural Analytics */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Radar Chart Mockup */}

          <PerfilCultural data={ciudadSeleccionada.datosculturales} />

          <DepartmentsLogos ciudad={ciudadSeleccionada} />
        </div>
      </section>

      <RecentActivities />
    </div>
  );
}
