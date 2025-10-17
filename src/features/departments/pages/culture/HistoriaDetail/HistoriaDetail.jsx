"use client";

import { useDetalle } from "../../../hooks/useDetalle";
import { useParams } from "react-router-dom";
import { Calendar, User, BookOpen, Clock, Scroll } from "lucide-react";
import CultureHero from "../CultureHero";
import YouTubePlayer from "../Video";

export default function HistoriaDetail() {
  const { slug } = useParams();
  const { item, loading, error } = useDetalle({ tabla: "historia", slug });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-t-transparent border-[#39C2FF] rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-500">Cargando historia...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA] px-4">
        <div className="max-w-md rounded-xl p-6 text-center shadow-md border border-gray-200 bg-white">
          <div className="w-16 h-16 bg-[#FF3069] rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Error al cargar
          </h3>
          <p className="text-gray-500">
            No se pudo cargar la información de la historia.
          </p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA] px-4">
        <div className="max-w-md rounded-xl p-6 text-center shadow-md border border-gray-200 bg-white">
          <div className="w-16 h-16 bg-[#8C52FF] rounded-full flex items-center justify-center mx-auto mb-4">
            <Scroll className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Historia no encontrada
          </h3>
          <p className="text-gray-500">La historia que buscas no existe.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      {/* Hero */}
      <CultureHero item={item} />

      {/* Contenido */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Columna principal */}
        <div className="lg:col-span-2 space-y-8">
          {/* Relato histórico */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm transition-transform hover:scale-[1.01]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <h2 className="flex items-center font-semibold text-xl text-[#39C2FF]">
                <Scroll className="w-6 h-6 mr-3 text-[#39C2FF]" />
                Relato Histórico
              </h2>
              {item.fecha_referencia && (
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="w-5 h-5 mr-2 text-[#39C2FF]" />
                  <span className="italic">{item.fecha_referencia}</span>
                </div>
              )}
            </div>
            <p className="leading-relaxed text-gray-800">{item.contenido}</p>
          </div>

          {/* Contexto temporal */}
          <div className="bg-white border-l-4 border-[#8C52FF] rounded-xl p-6 shadow-sm">
            <h2 className="flex items-center font-semibold mb-4 text-xl text-[#8C52FF]">
              <Clock className="w-6 h-6 mr-3 text-[#8C52FF]" />
              Contexto Temporal
            </h2>
            <p className="leading-relaxed text-gray-800 pl-3 border-l-2 border-[#8C52FF]">
              {item.contexto}
            </p>
          </div>
        </div>

        {/* Columna lateral */}
        <aside className="space-y-8">
          <div className="bg-white border-l-4 border-[#FECF3D] rounded-xl p-6 shadow-sm">
            <h3 className="flex items-center font-semibold mb-4 text-lg text-[#FECF3D]">
              <User className="w-5 h-5 mr-2 text-[#FECF3D]" />
              Información de Fuente
            </h3>
            <p className="text-gray-800">{item.informacion_fuente}</p>
          </div>
        </aside>
      </div>

      <div className="px-4 sm:px-8 md:px-16 py-6">
        <YouTubePlayer url={item.video} />
      </div>
    </div>
  );
}
