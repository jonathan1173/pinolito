"use client";

import { useDetalle } from "../../../hooks/useDetalle";
import { useParams } from "react-router-dom";
import {
  Clock,
  ChefHat,
  Leaf,
  Calendar,
  CookingPot,
  Flame,
} from "lucide-react";
import CultureHero from "../CultureHero";

export default function GastronomiaDetail() {
  const { slug } = useParams();
  const { item, loading, error } = useDetalle({ tabla: "comida", slug });

  const colors = {
    primary: "#39C2FF",
    white: "#FFFFFF",
    yellow: "#FECF3D",
    pink: "#FF3069",
    purple: "#8C52FF",
    background: "#F5F7FA",
  };

  // Estados base
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#39C2FF]/10 to-[#8C52FF]/10">
        <div className="text-center">
          <ChefHat className="w-12 h-12 text-[#39C2FF] mx-auto mb-4 animate-spin" />
          <p className="text-gray-600 text-lg">Preparando el plato...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FF3069]/10 to-[#FECF3D]/10">
        <div className="text-center">
          <ChefHat className="w-12 h-12 text-[#FF3069] mx-auto mb-4" />
          <p className="text-lg text-[#FF3069] font-medium">
            Error al cargar el plato
          </p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA]">
        <div className="text-center">
          <ChefHat className="w-12 h-12 text-[#8C52FF] mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Plato no encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#39C2FF]/10 via-[#F5F7FA] to-[#8C52FF]/10">
      {/* Hero */}
      <CultureHero item={item} />

      {/* Contenido */}
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16 space-y-10">
        {/* Sección de cabecera */}
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl border border-gray-100 p-8 transition-transform hover:scale-[1.01]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="px-3 py-1 bg-[#FECF3D]/20 text-[#FECF3D] rounded-full font-medium flex items-center gap-2">
                  <CookingPot className="w-4 h-4" />
                  {item.tipo || "Plato Tradicional"}
                </span>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-[#39C2FF]" />
                  <span>{item.tiempo_preparacion || "45 min"}</span>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                {item.nombre}
              </h1>
              <p className="text-gray-600 leading-relaxed">
                {item.descripcion || "Un plato lleno de sabor y tradición."}
              </p>
            </div>
          </div>
        </div>

        {/* Cuerpo principal */}
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Ingredientes */}
            <div className="p-8 bg-white rounded-xl shadow-md border-l-4 border-[#39C2FF]">
              <h2 className="text-2xl font-semibold text-[#39C2FF] mb-4 flex items-center gap-2">
                <Leaf className="w-6 h-6" /> Ingredientes Principales
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {item.ingredientes || "Sin información de ingredientes disponible."}
              </p>
            </div>

            {/* Preparación */}
            <div className="p-8 bg-white rounded-xl shadow-md border-l-4 border-[#8C52FF]">
              <h2 className="text-2xl font-semibold text-[#8C52FF] mb-4 flex items-center gap-2">
                <Flame className="w-6 h-6" /> Preparación
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {item.preparacion || "No se ha agregado la preparación aún."}
              </p>
            </div>

            {/* Historia */}
            <div className="p-8 bg-white rounded-xl shadow-md border-l-4 border-[#39C2FF]">
              <h2 className="text-2xl font-semibold text-[#39C2FF] mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6" /> Historia y Tradición
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {item.historia || "Historia no disponible."}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Información */}
            <div className="p-6 bg-white rounded-xl shadow-md border-l-4 border-[#FECF3D]">
              <h3 className="text-xl font-bold mb-4 text-[#FECF3D]">
                Información
              </h3>
              <div className="space-y-2 text-gray-700">
                {item.informacion ? (
                  <p>{item.informacion}</p>
                ) : (
                  <>
                    <div className="flex justify-between border-b pb-2">
                      <span>Dificultad</span>
                      <span>Intermedia</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>Temporada</span>
                      <span>Todo el año</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Calorías</span>
                      <span>320 kcal</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Consejo del Chef */}
            <div className="p-6 bg-white rounded-xl shadow-md border-l-4 border-[#FF3069]">
              <h3 className="text-xl font-bold mb-4 text-[#FF3069] flex items-center gap-2">
                <ChefHat className="w-5 h-5" /> Consejo del Chef
              </h3>
              <blockquote className="italic border-l-4 border-[#FF3069]/60 pl-4 text-gray-700 leading-relaxed">
                {item.consejos_chef ||
                  "Usa ingredientes frescos y cocina con paciencia para realzar el sabor auténtico."}
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
