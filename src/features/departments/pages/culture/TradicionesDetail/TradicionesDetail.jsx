"use client";

import { useDetalle } from "../../../hooks/useDetalle";
import { useParams } from "react-router-dom";
import CultureHero from "../CultureHero";
import {
  BookOpen,
  Calendar,
  Users,
  Award,
  MapPin,
  Sparkles,
  Landmark,
  HeartHandshake,
  ScrollText,
} from "lucide-react";
import YouTubePlayer from "../Video";

export default function TradicionesDetail() {
  const { slug } = useParams();
  const { item, loading, error } = useDetalle({
    tabla: "artes_y_tradiciones",
    slug,
  });

  const colors = {
    primary: "#39C2FF",
    purple: "#8C52FF",
    yellow: "#FECF3D",
    pink: "#FF3069",
    background: "#F5F7FA",
  };

  // Pantalla de carga
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#39C2FF]/10 to-[#8C52FF]/10">
        <div className="animate-spin rounded-full p-4 bg-white shadow-md border-4 border-t-transparent border-[#8C52FF]">
          <ScrollText className="w-12 h-12 text-[#39C2FF]" />
        </div>
        <p className="mt-6 text-gray-600 text-lg font-medium">
          Cargando tradición cultural...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA]">
        <div className="text-center border p-8 rounded-xl shadow-md bg-white">
          <ScrollText className="w-12 h-12 text-[#FF3069] mx-auto mb-4" />
          <p className="text-lg text-[#FF3069]">Error al cargar la tradición</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA]">
        <div className="text-center border p-8 rounded-xl shadow-md bg-white">
          <ScrollText className="w-12 h-12 text-[#8C52FF] mx-auto mb-4" />
          <p className="text-lg text-gray-600">Tradición no encontrada</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#39C2FF]/10 via-[#F5F7FA] to-[#8C52FF]/10">
      <CultureHero item={item} />

      {/* Contenido principal con grid */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-8">
        {/* Secciones principales */}
        <div className="lg:col-span-2 grid gap-8">
          {[
            {
              title: "Descripción",
              icon: <BookOpen className="w-6 h-6" />,
              color: colors.primary,
              content:
                item.descripcion ||
                item.contenido ||
                "Sin descripción disponible.",
            },
            {
              title: "Significado Cultural",
              icon: <Award className="w-6 h-6" />,
              color: colors.purple,
              content:
                item.significado_cultural ||
                "No se ha registrado el significado cultural.",
            },
            {
              title: "Contexto Histórico",
              icon: <Calendar className="w-6 h-6" />,
              color: colors.yellow,
              content:
                item.contexto || "No se ha registrado el contexto histórico.",
            },
          ].map((section, i) => (
            <div
              key={i}
              className="p-8 bg-white rounded-xl shadow-md border-l-4 hover:shadow-lg transition-all duration-300"
              style={{ borderColor: section.color }}
            >
              <h2
                className="flex items-center gap-2 text-2xl font-semibold mb-4"
                style={{ color: section.color }}
              >
                {section.icon}
                {section.title}
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Sidebar con información permanente */}
        <aside className="space-y-6">
          <div className="p-6 bg-white rounded-xl shadow-md border-l-4 border-[#FECF3D]">
            <h3 className="text-xl font-bold mb-3 text-[#FECF3D] flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Ubicación y Región
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {item.ubicacion || "Información de ubicación no disponible."}
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md border-l-4 border-[#FF3069]">
            <h3 className="text-xl font-bold mb-3 text-[#FF3069] flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              Relevancia en la Actualidad
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {item.relevancia}
            </p>
          </div>
        </aside>
      </div>

      <div className="px-4 sm:px-8 md:px-16 py-6">
        <YouTubePlayer url={item.video} />
      </div>
    </div>
  );
}
