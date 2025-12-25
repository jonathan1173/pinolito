import React from "react";
import {
  Brain,
  Map,
  Users,
  Utensils,
  Music,
  BookOpen,
  Trophy,
  Clock,
  Play,
  Puzzle,
  MapPin,
  RectangleGoggles,
} from "lucide-react";
import Hero from "../../../shared/components/Hero";

export default function GamePage() {
  const juegos = [
    {
      id: 1,
      titulo: "Trivia Histórica Nicaragua",
      descripcion:
        "Pon a prueba tus conocimientos sobre la historia de Nicaragua, desde la época precolombina hasta la actualidad.",
      icono: BookOpen,
      dificultad: "Intermedio",
      tiempo: "10-15 min",
      jugadores: "1 jugador",
      categoria: "Historia",
      progreso: 75,
      completado: false,
    },
    {
      id: 2,
      titulo: "Memoria Cultural",
      descripcion:
        "Juego de memoria con elementos tradicionales: artesanías, instrumentos musicales, comidas típicas y más.",
      icono: Brain,
      dificultad: "Fácil",
      tiempo: "5-10 min",
      jugadores: "1-2 jugadores",
      categoria: "Tradiciones",
      progreso: 100,
      completado: true,
    },
    {
      id: 3,
      titulo: "Geografía Nicaragüense",
      descripcion:
        "Identifica departamentos, capitales, ríos, lagos y lugares emblemáticos de nuestro hermoso país.",
      icono: Map,
      dificultad: "Intermedio",
      tiempo: "8-12 min",
      jugadores: "1 jugador",
      categoria: "Geografía",
      progreso: 30,
      completado: false,
    },
  ];

  const getDifficultyColor = (dificultad) => {
    switch (dificultad) {
      case "Fácil":
        return "bg-green-100 text-green-800";
      case "Intermedio":
        return "bg-yellow-100 text-yellow-800";
      case "Avanzado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero
        title="¡Aprende Jugando!"
        paragraph="Descubre la cultura de Nicaragua con desafíos y juegos interactivos."
      />

      {/* Juegos */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {juegos.map((juego, index) => {
            const IconComponent = juego.icono;
            return (
              <div
                key={juego.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  {juego.completado && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs flex items-center">
                      <Trophy className="w-3 h-3 mr-1" /> Completado
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold mb-2">{juego.titulo}</h2>
                <p className="text-gray-600 mb-4">{juego.descripcion}</p>

                {/* Stats */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span
                    className={`px-2 py-1 rounded text-xs ${getDifficultyColor(
                      juego.dificultad
                    )}`}
                  >
                    {juego.dificultad}
                  </span>
                  <span className="px-2 py-1 rounded border text-xs flex items-center">
                    <Clock className="w-3 h-3 mr-1" /> {juego.tiempo}
                  </span>
                  <span className="px-2 py-1 rounded border text-xs flex items-center">
                    <Users className="w-3 h-3 mr-1" /> {juego.jugadores}
                  </span>
                </div>

                {/* Botón */}
                <a
                  href={`/juegos/${juego.id}`}
                  className={`block text-center px-4 py-2 rounded font-medium ${
                    juego.completado
                      ? "border border-blue-600 text-blue-600"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  <Play className="w-4 h-4 inline mr-2" />
                  {juego.progreso > 0 ? "Continuar" : "Jugar"}
                </a>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
