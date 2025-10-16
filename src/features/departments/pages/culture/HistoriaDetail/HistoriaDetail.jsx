"use client";

import { useDetalle } from "../../../hooks/useDetalle";
import { useParams } from "react-router-dom";
import { Calendar, User, BookOpen, Clock, MapPin, Scroll } from "lucide-react";
import CultureHero from "../CultureHero";

export default function HistoriaDetail() {
  const { slug } = useParams();
  const { item, loading, error } = useDetalle({ tabla: "historia", slug });

  // 🎨 Nueva paleta con contraste
  const colors = {
    primary: "#39C2FF",
    background: "#F5F7FA", // Fondo más suave, no blanco puro
    card: "#FFFFFF", // Tarjetas blancas para destacar
    secondaryYellow: "#FECF3D",
    secondaryPink: "#FF3069",
    secondaryPurple: "#8C52FF",
    text: "#1E1E1E",
    textMuted: "#555555",
    border: "#E0E0E0",
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: colors.background }}
      >
        <div className="text-center space-y-4">
          <div
            className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto"
            style={{ borderColor: colors.primary }}
          ></div>
          <p style={{ color: colors.textMuted }}>Cargando historia...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: colors.background }}
      >
        <div
          className="max-w-md rounded-xl p-6 text-center shadow-md border"
          style={{ backgroundColor: colors.card, borderColor: colors.border }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: colors.secondaryPink }}
          >
            <BookOpen className="w-8 h-8" color={colors.card} />
          </div>
          <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>
            Error al cargar
          </h3>
          <p style={{ color: colors.textMuted }}>
            No se pudo cargar la información de la historia.
          </p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: colors.background }}
      >
        <div
          className="max-w-md rounded-xl p-6 text-center shadow-md border"
          style={{ backgroundColor: colors.card, borderColor: colors.border }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: colors.secondaryPurple }}
          >
            <Scroll className="w-8 h-8" color={colors.card} />
          </div>
          <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>
            Historia no encontrada
          </h3>
          <p style={{ color: colors.textMuted }}>
            La historia que buscas no existe.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: colors.background, minHeight: "100vh" }}>
      {/* Hero */}
      <CultureHero item={item} />

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Columna principal */}
        <div className="lg:col-span-2 space-y-8">
          <div
            className="rounded-xl p-6 border shadow-sm"
            style={{
              backgroundColor: colors.card,
              borderColor: colors.border,
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2
                className="flex items-center font-semibold text-xl"
                style={{ color: colors.primary }}
              >
                <Scroll className="w-6 h-6 mr-3" color={colors.primary} />
                Relato Histórico
              </h2>
              {item.fecha_referencia && (
                <div className="flex items-center" style={{ color: colors.textMuted }}>
                  <Calendar className="w-5 h-5 mr-2" color={colors.primary} />
                  <span className="italic">{item.fecha_referencia}</span>
                </div>
              )}
            </div>

            <p className="leading-relaxed text-base" style={{ color: colors.text }}>
              {item.contenido}
            </p>
          </div>

          <div
            className="rounded-xl p-6 border shadow-sm"
            style={{
              backgroundColor: colors.card,
              borderColor: colors.secondaryPurple,
            }}
          >
            <h2
              className="flex items-center font-semibold mb-4 text-xl"
              style={{ color: colors.secondaryPurple }}
            >
              <Clock className="w-6 h-6 mr-3" color={colors.secondaryPurple} />
              Contexto Temporal
            </h2>
            <p
              className="leading-relaxed text-base pl-3 border-l-2"
              style={{
                color: colors.text,
                borderColor: colors.secondaryPurple,
              }}
            >
              {item.contenido}
            </p>
          </div>
        </div>

        {/* Información lateral */}
        <aside className="space-y-8">
          <div
            className="rounded-xl p-6 border shadow-sm"
            style={{
              backgroundColor: colors.card,
              borderColor: colors.secondaryYellow,
            }}
          >
            <h3
              className="flex items-center font-semibold mb-4 text-lg"
              style={{ color: colors.secondaryYellow }}
            >
              <User className="w-5 h-5 mr-2" color={colors.secondaryYellow} />
              Información de Fuente
            </h3>

            {item.autor_fuente && (
              <div className="mb-4">
                <p className="text-sm" style={{ color: colors.textMuted }}>
                  Autor/Fuente
                </p>
                <p className="font-medium" style={{ color: colors.text }}>
                  {item.autor_fuente}
                </p>
              </div>
            )}
            <div className="h-px my-4" style={{ backgroundColor: colors.border }}></div>

            <div className="text-sm space-y-3">
              <div>
                <p style={{ color: colors.textMuted }}>Tipo de Documento</p>
                <span
                  className="px-2 py-1 rounded text-xs"
                  style={{
                    backgroundColor: colors.secondaryYellow,
                    color: "#000",
                  }}
                >
                  Registro Histórico
                </span>
              </div>
              <div>
                <p style={{ color: colors.textMuted }}>Estado</p>
                <span
                  className="px-2 py-1 rounded text-xs"
                  style={{
                    backgroundColor: colors.secondaryPink,
                    color: "#fff",
                  }}
                >
                  Verificado
                </span>
              </div>
            </div>
          </div>

          {/* Temas relacionados */}
          <div
            className="rounded-xl p-6 border shadow-sm"
            style={{
              backgroundColor: colors.card,
              borderColor: colors.secondaryPurple,
            }}
          >
            <h3
              className="flex items-center font-semibold mb-4 text-lg"
              style={{ color: colors.secondaryPurple }}
            >
              <MapPin className="w-5 h-5 mr-2" color={colors.secondaryPurple} />
              Temas Relacionados
            </h3>

            <div className="space-y-3 text-sm">
              {[
                { titulo: "Historia Regional", desc: "Contexto local" },
                { titulo: "Patrimonio Cultural", desc: "Preservación histórica" },
                { titulo: "Documentos Históricos", desc: "Archivo documental" },
              ].map((tema, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg"
                  style={{
                    backgroundColor: colors.background,
                    border: `1px solid ${colors.primary}`,
                  }}
                >
                  <p className="font-medium" style={{ color: colors.primary }}>
                    {tema.titulo}
                  </p>
                  <p style={{ color: colors.textMuted }}>{tema.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
