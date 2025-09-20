import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import municipiosData from "../data/municipios.json";

// Icono del marcador
const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Ajusta bounds automáticamente según los marcadores
function FitBounds({ markers }) {
  const map = useMap();
  useEffect(() => {
    if (markers.length > 0) {
      const bounds = L.latLngBounds(markers.map((m) => m.coords));
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [map, markers]);
  return null;
}

export default function DepartmentMap({ ciudad }) {
  const municipios = ciudad ? municipiosData[ciudad.slug] || [] : [];

  return (
    <section className="bg-green-400 rounded-xl shadow-md p-6  border border-black">
      <header className="flex items-center mb-4">
        <MapPin className="w-5 h-5  text-black mr-2" />
        <h2 className="text-lg font-bold text-black">Sus Municipios</h2>
      </header>

      <article className="h-100 w-full rounded-lg overflow-hidden">
        <MapContainer
          center={[12.0, -85.5]}
          zoom={10}
          scrollWheelZoom={false}
          className="h-full w-full z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {municipios.map((mun, index) => (
            <Marker key={index} position={mun.coords} icon={icon}>
              <Popup>
                <div>
                  <h3 className="font-semibold">{mun.nombre}</h3>
                  <Link
                    to={`/department/${ciudad.slug}/municipios/${mun.slug}`}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    ➝ Ver ficha completa
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}

          <FitBounds markers={municipios} />
        </MapContainer>
      </article>
    </section>
  );
}
