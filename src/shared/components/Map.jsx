import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { Link } from "react-router-dom";
import municipiosData from "../../features/departments/data/municipios.json";
import departamentosData from "../../features/home/data/departamentos.json";

// Icono de Leaflet
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

// Ajusta bounds automáticamente
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

export default function Map({ mode = "municipios", ciudad }) {
  let markers = [];

  if (mode === "municipios" && ciudad) {
    markers = municipiosData[ciudad.slug] || [];
  } else if (mode === "departamentos") {
    markers = Object.entries(departamentosData).map(([nombre, info]) => ({
      nombre,
      coords: info.coords,
      descripcion: info.descripcion,
      slug: info.slug || nombre.toLowerCase(), // fallback si no hay slug
    }));
  }

  //   // Log de URLs generadas
  //   useEffect(() => {
  //     if (markers.length > 0) {
  //       const urls = markers.map((m) =>
  //         mode === "municipios"
  //           ? `/department/${ciudad.slug}/municipios/${m.slug}`
  //           : `/department/${m.slug}`
  //       );
  //       console.log("URLs generadas:", urls);
  //     }
  //   }, [markers, mode, ciudad]);

  const center = markers.length ? markers[0].coords : [12.8, -85.0];

  return (
    <section className="p-4 bg-white rounded-2xl">
      <header className="flex items-center justify-center md:justify-start md:px-4 py-2">
        <h2 className="text-2xl font-bold text-[#2c2c2c]">
          {mode === "municipios" ? "Sus Municipios" : "Mapa de Departamentos"}
        </h2>
      </header>

      <article className="h-100 w-full rounded-lg overflow-hidden">
        <MapContainer
          center={center}
          zoom={mode === "municipios" ? 10 : 7}
          scrollWheelZoom={false}
          className="h-full w-full z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {markers.map((m, index) => (
            <Marker key={index} position={m.coords} icon={icon}>
              <Tooltip direction="top" offset={[0, -30]} opacity={1}>
                {m.nombre}
              </Tooltip>

              <Popup>
                <article className="min-w-[220px] space-y-2">
                  <h3 className="font-semibold text-lg">{m.nombre}</h3>
                  {m.descripcion && (
                    <p className="text-sm text-gray-700 leading-snug">
                      {m.descripcion}
                    </p>
                  )}

                  <Link
                    to={
                      mode === "municipios"
                        ? `/department/${ciudad.slug}/municipios/${m.slug}`
                        : `/department/${m.slug}`
                    }
                    className="inline-block text-sm font-medium text-blue-600 hover:text-blue-800 transition"
                  >
                    ➝ Ver ficha completa
                  </Link>
                </article>
              </Popup>
            </Marker>
          ))}

          <FitBounds markers={markers} />
        </MapContainer>
      </article>
    </section>
  );
}
