import React from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, MapPin, Users, Calendar, TrendingUp, Award } from "lucide-react"

export default function CiudadDetallePage() {
  const { ciudad } = useParams()

  // Toda la info unificada
  const ciudades = {
    Masaya: {
      nombre: "Masaya",
      descripcion: "Capital del Folclore Nicaragüense",
      imagen: "/masaya-panoramica-artesania-nicaragua.png",
      mapa: "/mapa-nicaragua-masaya-ubicacion.png",
      datosculturales: {
        arte: 85,
        artesania: 92,
        literatura: 67,
        danza: 78,
        musica: 88,
      },
      actividades: [
        { titulo: "Festival de Marimba", fecha: "15 Mar 2024", participantes: 120, categoria: "Música" },
        { titulo: "Taller de Cerámica", fecha: "22 Mar 2024", participantes: 35, categoria: "Artesanías" },
        { titulo: "Exposición Fotográfica", fecha: "5 Abr 2024", participantes: 67, categoria: "Arte Visual" },
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
      imagen: "/granada-colonial-nicaragua-lago.png",
      mapa: "/mapa-nicaragua-granada-ubicacion.png",
      datosculturales: {
        arte: 70,
        artesania: 60,
        literatura: 80,
        danza: 75,
        musica: 85,
      },
      actividades: [
        { titulo: "Feria Gastronómica", fecha: "10 Ene 2024", participantes: 300, categoria: "Gastronomía" },
        { titulo: "Concierto Sinfónico", fecha: "20 Feb 2024", participantes: 150, categoria: "Música" },
      ],
      reconocimientos: ["🏆 Centro Cultural Nacional", "🎭 Capital del Arte Contemporáneo"],
      stats: {
        municipios: 10,
        participantes: "3.1K",
      },
    },
  }

  const ciudadSeleccionada = ciudades[ciudad]

  // si la ciudad no existe mostramos error
  if (!ciudadSeleccionada) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Ciudad no encontrada</h1>
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
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="relative">
        <img
          src={ciudadSeleccionada.imagen || "/placeholder.svg"}
          alt={ciudadSeleccionada.nombre}
          className="w-full h-64 md:h-80 object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <Link
              to="/department"
              className="flex items-center mb-6 px-4 py-2 bg-white/90 rounded-md shadow hover:bg-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Volver a Ciudades
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {ciudadSeleccionada.nombre}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">{ciudadSeleccionada.descripcion}</p>
          </div>
        </div>
      </section>

      {/* Cultural Analytics */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Radar Chart Mockup */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4 text-lg font-bold">
              <TrendingUp className="w-5 h-5 mr-2" /> Perfil Cultural
            </div>
            <div className="relative w-full h-80 flex items-center justify-center">
              <svg viewBox="0 0 300 300" className="w-full h-full">
                <polygon points="150,50 250,120 220,220 80,220 50,120" fill="none" stroke="#e5e7eb" strokeWidth="2" />
                <polygon points="150,80 220,130 200,200 100,200 80,130" fill="none" stroke="#e5e7eb" strokeWidth="1" />
                <polygon points="150,110 190,140 180,180 120,180 110,140" fill="none" stroke="#e5e7eb" strokeWidth="1" />
                <polygon
                  points="150,65 235,125 210,195 90,195 65,125"
                  fill="#3b82f6"
                  fillOpacity="0.3"
                  stroke="#3b82f6"
                  strokeWidth="3"
                />
                <circle cx="150" cy="65" r="4" fill="#3b82f6" />
                <circle cx="235" cy="125" r="4" fill="#3b82f6" />
                <circle cx="210" cy="195" r="4" fill="#3b82f6" />
                <circle cx="90" cy="195" r="4" fill="#3b82f6" />
                <circle cx="65" cy="125" r="4" fill="#3b82f6" />
                <text x="150" y="40" textAnchor="middle" className="text-sm font-medium fill-gray-700">
                  Arte
                </text>
                <text x="260" y="125" textAnchor="start" className="text-sm font-medium fill-gray-700">
                  Artesanía
                </text>
                <text x="220" y="240" textAnchor="middle" className="text-sm font-medium fill-gray-700">
                  Literatura
                </text>
                <text x="80" y="240" textAnchor="middle" className="text-sm font-medium fill-gray-700">
                  Danza
                </text>
                <text x="40" y="125" textAnchor="end" className="text-sm font-medium fill-gray-700">
                  Música
                </text>
              </svg>
            </div>
            <div className="grid grid-cols-5 gap-2 mt-6 text-center">
              {Object.entries(ciudadSeleccionada.datosculturales).map(([cat, val]) => (
                <div key={cat}>
                  <div className="text-2xl font-bold text-blue-600">{val}%</div>
                  <div className="text-xs text-gray-600 capitalize">{cat}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Map and Stats */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4 text-lg font-bold">
                <MapPin className="w-5 h-5 mr-2" /> Ubicación y Alcance
              </div>
              <img
                src={ciudadSeleccionada.mapa || "/placeholder.svg"}
                alt={`Mapa de ${ciudadSeleccionada.nombre}`}
                className="w-full h-48 object-cover rounded-lg mb-4 bg-blue-500"
              />
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <div className="text-sm text-gray-600">Municipios Conectados</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">2.4K</div>
                  <div className="text-sm text-gray-600">Participantes Activos</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4 text-lg font-bold">
                <Award className="w-5 h-5 mr-2" /> Reconocimientos
              </div>
              <div className="space-y-3 text-center">
                <span className="block py-2 bg-yellow-100 rounded-md">🏆 Ciudad Creativa UNESCO</span>
                <span className="block py-2 bg-blue-100 rounded-md">🎨 Capital del Folclore Nacional</span>
                <span className="block py-2 bg-gray-100 rounded-md">🌟 Patrimonio Cultural Vivo</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Recent Activities */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Actividades Recientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ciudadSeleccionada.actividades.map((act, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-4">
                <h3 className="text-lg font-bold mb-2">{act.titulo}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" /> {act.fecha}
                  </span>
                  <span className="flex items-center">
                    <Users className="w-4 h-4 mr-1" /> {act.participantes}
                  </span>
                </div>
                <span className="inline-block px-2 py-1 border rounded text-xs">{act.categoria}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
