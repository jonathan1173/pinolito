import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import municipiosData from "../data/municipios.json";
import { Link } from "react-router-dom";
import { Trophy, MapPin } from "lucide-react";
import axios from "axios";

// Icono del marcador
const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
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
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, markers]);

  return null;
}

export default function DepartmentsLogos({ ciudad, departamentoId, municipioId }) {
  const [reconocimientos, setReconocimientos] = useState([]);
  const municipios = ciudad ? municipiosData[ciudad.nombre] || [] : [];

  useEffect(() => {
    async function fetchReconocimientos() {
      try {
        if (!departamentoId && !municipioId) return;

        // Filtra por departamento o municipio según corresponda
        const filter = departamentoId
          ? `departamento_id=eq.${departamentoId}`
          : `municipio_id=eq.${municipioId}`;

        const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/reconocimientos?select=nombre,anio,institucion_otorgante&${filter}`;
        const { data } = await axios.get(url, {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
          },
        });

        setReconocimientos(data || []);
      } catch (error) {
        console.error("Error al cargar reconocimientos:", error);
        setReconocimientos([]);
      }
    }

    fetchReconocimientos();
  }, [departamentoId, municipioId]);

  return (
    <div className="space-y-6">
      {/* Mapa interactivo */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="flex items-center mb-4 text-lg font-bold">
          <span className="mr-2"><MapPin color="blue" /></span> Sus Municipios
        </h2>
        <MapContainer
          center={[12.0, -85.5]}
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

        {reconocimientos.length === 0 ? (
          <p className="text-gray-500">No hay reconocimientos registrados.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {reconocimientos.map((rec, index) => (
              <div key={index} className="bg-gray-100 p-3 rounded-lg text-center">
                <p className="font-semibold">{rec.nombre}</p>
                <p className="text-sm text-gray-600">{rec.anio}</p>
                <p className="text-sm text-gray-600">{rec.institucion_otorgante}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
