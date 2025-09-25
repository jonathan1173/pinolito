"use client";

import { useDetalle } from "../../../hooks/useDetalle";
import { useParams } from "react-router-dom";
import {
  Clock,
  Users,
  ChefHat,
  Leaf,
  Star,
  MapPin,
  Calendar,
} from "lucide-react";
import CultureHero from "../CultureHero";

export default function GastronomiaDetail() {
  const params = useParams();
  const slug = params?.slug;
  const { item, loading, error } = useDetalle({ tabla: "comida", slug });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-lime-50">
        <div className="text-center">
          <ChefHat className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-lg text-muted-foreground">
            Preparando el plato...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-lime-50">
        <div className="text-center">
          <ChefHat className="w-12 h-12 text-destructive mx-auto mb-4" />
          <p className="text-lg text-destructive">Error al cargar el plato</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-lime-50">
        <div className="text-center">
          <ChefHat className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Plato no encontrado</p>
        </div>
      </div>
    );
  }

  // Datos de ejemplo
  const mockData = {
    tiempo_preparacion: "45 minutos",
    porciones: "4-6 personas",
    dificultad: "Intermedio",
    origen: "Región Andina",
    temporada: "Todo el año",
    calorias: "320 por porción",
    ingredientes_principales: [
      "Maíz",
      "Queso fresco",
      "Cilantro",
      "Ají amarillo",
    ],
    maridaje: ["Chicha morada", "Cerveza artesanal", "Vino blanco seco"],
    historia:
      "Este plato tradicional tiene sus raíces en la época precolombina...",
    chef_recomendacion:
      "Usa ingredientes frescos y locales. El secreto está en el punto exacto de cocción.",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50">
      {/* Hero */}
      <CultureHero item={item} />

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Info flotante */}
        <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full flex items-center gap-2">
                  <Leaf className="w-4 h-4" />{" "}
                  {item.tipo || "Plato Tradicional"}
                </span>
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                {item.nombre}
              </h1>
              <p className="text-lg text-muted-foreground">
                {item.descripcion}
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:min-w-[200px]">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-primary" />
                <span>{mockData.tiempo_preparacion}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4 text-primary" />
                <span>{mockData.porciones}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{mockData.origen}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Ingredientes */}
          <div className="lg:col-span-2 space-y-8">
            <div className="p-8 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Leaf className="w-6 h-6 text-primary" /> Ingredientes
                Principales
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {item.ingredientes ? (
                  <p className="text-muted-foreground">{item.ingredientes}</p>
                ) : (
                  mockData.ingredientes_principales.map((ingrediente, i) => (
                    <div
                      key={i}
                      className="p-4 bg-green-50 rounded-lg flex items-center gap-2"
                    >
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      <span>{ingrediente}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Historia */}
            <div className="p-8 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-amber-600" /> Historia y
                Tradición
              </h2>
              <p className="text-muted-foreground">{mockData.historia}</p>
            </div>

            {/* Consejo del chef */}
            <div className="bg-white p-8 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <ChefHat className="w-6 h-6 text-primary" /> Consejo del Chef
              </h2>
              <blockquote className="italic border-l-4 border-primary pl-4">
                "{mockData.chef_recomendacion}"
              </blockquote>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Información</h3>
              <div className="space-y-2">
                <div className="flex justify-between border-b pb-2">
                  <span>Dificultad</span> <span>{mockData.dificultad}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Temporada</span> <span>{mockData.temporada}</span>
                </div>
                <div className="flex justify-between">
                  <span>Calorías</span> <span>{mockData.calorias}</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Maridaje Recomendado</h3>
              <div className="space-y-2">
                {mockData.maridaje.map((bebida, i) => (
                  <div
                    key={i}
                    className="p-3 bg-green-50 rounded-lg flex items-center gap-2"
                  >
                    <span className="w-2 h-2 bg-secondary rounded-full" />
                    <span>{bebida}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 bg-gradient-to-br from-primary to-secondary  rounded-lg shadow-lg text-center">
              <ChefHat className="w-10 h-10 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">¿Te gustó este plato?</h3>
              <p className="mb-4 text-sm">Descubre más recetas tradicionales</p>
              <button className="px-4 py-2  text-primary font-bold rounded">
                Ver Más Recetas
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
