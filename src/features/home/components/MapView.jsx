import React from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import data from "../data/departamentos.json"
import { Link } from "react-router-dom"

// Fix para iconos de Leaflet en Vite
const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

export default function MapView() {
  const center = [12.8, -85.0]

  return (
    <section
      className="py-12 mx-auto md:mx-20 px-4 "
      aria-labelledby="mapa-titulo"
    >
      {/* Encabezado */}
      <header className="mb-8 text-center">
        <h2
          id="mapa-titulo"
          className="text-3xl font-extrabold tracking-tight text-gray-900 mb-3"
        >
          Mapa Interactivo
        </h2>
      </header>

      {/* Contenedor del mapa */}
      <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
        <MapContainer
          center={center}
          zoom={7}
          scrollWheelZoom={false}
          className="h-[50vh] sm:h-[60vh] md:h-[70vh]  z-0"
          aria-label="Mapa de Nicaragua con departamentos interactivos"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {Object.entries(data).map(([dep, info]) => (
            <Marker key={dep} position={info.coords} icon={icon}>
              <Popup>
                <article className="min-w-[220px] space-y-2">
                  <h3 className="font-semibold text-lg">{dep}</h3>
                  <p className="text-sm text-gray-700 leading-snug">
                    {info.descripcion}
                  </p>
                  <Link
                    to={`/department/${encodeURIComponent(dep)}`}
                    className="inline-block text-sm font-medium text-blue-600 hover:text-blue-800 transition"
                  >
                    ➝ Ver ficha completa
                  </Link>
                </article>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  )
}
