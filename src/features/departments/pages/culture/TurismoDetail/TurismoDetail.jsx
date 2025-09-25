"use client";

import { useDetalle } from "../../../hooks/useDetalle";
import { useParams } from "react-router-dom";
import {
  MapPin,
  Clock,
  DollarSign,
  Star,
  Share2,
  Heart,
  Camera,
  Navigation,
  Phone,
  Globe,
} from "lucide-react";
import CultureHero from "../CultureHero";

export default function TurismoDetail() {
  const { slug } = useParams();
  const { item, loading, error } = useDetalle({ tabla: "lugares", slug });

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse">
          <div className="h-96 bg-muted rounded-lg mb-6"></div>
          <div className="max-w-4xl mx-auto px-4">
            <div className="h-8 bg-muted rounded mb-4"></div>
            <div className="h-4 bg-muted rounded mb-2"></div>
            <div className="h-4 bg-muted rounded mb-2"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="p-8 text-center border rounded-lg">
          <div className="text-destructive mb-4">
            <Camera className="h-16 w-16 mx-auto opacity-50" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Error al cargar</h2>
          <p className="text-muted-foreground">
            No pudimos cargar la información del lugar turístico.
          </p>
          <button
            className="mt-4 px-4 py-2 bg-primary text-white rounded"
            onClick={() => window.location.reload()}
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="p-8 text-center border rounded-lg">
          <div className="text-muted-foreground mb-4">
            <MapPin className="h-16 w-16 mx-auto opacity-50" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Lugar no encontrado</h2>
          <p className="text-muted-foreground">
            El lugar turístico que buscas no existe o ha sido removido.
          </p>
          <button
            className="mt-4 px-4 py-2 bg-primary text-white rounded"
            onClick={() => window.history.back()}
          >
            Volver atrás
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}

      <CultureHero item={item} />

      {/* Contenido */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Descripción */}
            <div className="border rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-primary">
                Acerca de este lugar
              </h2>
              <p>
                {item.descripcion ||
                  item.contenido ||
                  "Un hermoso lugar turístico que vale la pena visitar."}
              </p>
            </div>

            {/* Galería */}
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Galería de fotos</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-muted rounded-lg overflow-hidden group cursor-pointer"
                  >
                    <img
                      src={`/placeholder.svg?height=200&width=200&query=tourist destination ${i}`}
                      alt={`Vista ${i} de ${item.nombre}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Reseñas */}
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Reseñas</h3>
              <div className="space-y-4">
                {[
                  {
                    name: "María González",
                    rating: 5,
                    comment: "¡Increíble experiencia!",
                  },
                  {
                    name: "Carlos Rodríguez",
                    rating: 4,
                    comment: "Muy recomendable, vistas espectaculares.",
                  },
                  {
                    name: "Ana López",
                    rating: 5,
                    comment: "Un lugar mágico que volveré a visitar.",
                  },
                ].map((r, i) => (
                  <div key={i} className="border-b pb-4 last:border-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm">
                        {r.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{r.name}</p>
                        <div className="flex gap-1">
                          {[...Array(r.rating)].map((_, j) => (
                            <Star
                              key={j}
                              className="h-3 w-3 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{r.comment}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 border px-4 py-2 rounded">
                Ver todas las reseñas
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">
                Información práctica
              </h3>
              <div className="space-y-4">
                {item.horario && (
                  <div className="flex gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Horarios</p>
                      <p className="text-sm text-muted-foreground">
                        {item.horario}
                      </p>
                    </div>
                  </div>
                )}
                {item.precio_referencia && (
                  <div className="flex gap-3">
                    <DollarSign className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Precio</p>
                      <p className="text-sm text-muted-foreground">
                        {item.precio_referencia}
                      </p>
                    </div>
                  </div>
                )}
                {item.ubicacion && (
                  <div className="flex gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Ubicación</p>
                      <p className="text-sm text-muted-foreground">
                        {item.ubicacion}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Botones */}
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-primary text-white rounded flex items-center justify-center gap-2">
                <Navigation className="h-4 w-4" />
                Cómo llegar
              </button>
              <button className="w-full px-4 py-2 border rounded flex items-center justify-center gap-2">
                <Phone className="h-4 w-4" />
                Contactar
              </button>
              <button className="w-full px-4 py-2 border rounded flex items-center justify-center gap-2">
                <Globe className="h-4 w-4" />
                Sitio web
              </button>
            </div>

            {/* Lugares cercanos */}
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Lugares cercanos</h3>
              <div className="space-y-3">
                {[
                  { name: "Mirador del Valle", distance: "2.5 km" },
                  { name: "Museo Regional", distance: "1.8 km" },
                  { name: "Plaza Central", distance: "800 m" },
                ].map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 cursor-pointer"
                  >
                    <div>
                      <p className="font-medium text-sm">{p.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {p.distance}
                      </p>
                    </div>
                    <Navigation className="h-4 w-4 text-primary" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
