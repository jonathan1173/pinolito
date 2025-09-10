import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import municipiosData from "../data/municipios.json";
import { Link } from "react-router-dom";
import { Trophy, MapPin } from "lucide-react";
// Icono
const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Componente para ajustar bounds automáticamente
function FitBounds({ markers }) {
  const map = useMap();

  useEffect(() => {
    if (markers.length > 0) {
      const bounds = L.latLngBounds(markers.map(m => m.coords));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, markers]);

  return null;
}

export default function DepartmentsLogos({ ciudad }) {
  const municipios = municipiosData[ciudad.nombre] || [];

  return (
    <div className="space-y-6">
      {/* Mapa interactivo */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="flex items-center mb-4 text-lg font-bold">
          <span className="mr-2"><MapPin color="blue"/></span> Sus Municipios
        </h2>
        <MapContainer
          center={[12.0, -85.5]} // valor temporal, se ajustará automáticamente
          zoom={10}
          scrollWheelZoom={false}
          className="h-64 w-full rounded-lg"
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
                    to={`/department/${encodeURIComponent(mun.nombre)}`}
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
      </div>

      {/* Reconocimientos */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="flex items-center mb-4 text-lg font-bold">
          <span className="mr-2"><Trophy color="gold" /></span> Reconocimientos
        </h2>
        <div className="space-y-3 text-center">
          {ciudad.reconocimientos?.map((rec, index) => (
            <span key={index} className="block py-2 bg-gray-100 rounded-md">
              {rec}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
