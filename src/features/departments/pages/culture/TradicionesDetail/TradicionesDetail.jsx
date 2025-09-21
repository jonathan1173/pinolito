"use client";

import { useDetalle } from "../../../hooks/useDetalle";
import { useParams } from "react-router-dom";
import CultureHero from "../CultureHero";
import { BookOpen } from "lucide-react";
import CultureMain from "./CultureMain";
import CultureSidebar from "./CultureSidebar";

export default function TradicionesDetail() {
  const { slug } = useParams();
  const { item, loading, error } = useDetalle({
    tabla: "artes_y_tradiciones",
    slug,
  });
  // console.log(slug);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">
            Cargando tradición cultural...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md mx-auto border rounded-lg p-6 text-center">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-destructive" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Error al cargar</h3>
          <p className="text-muted-foreground">
            No se pudo cargar la información de la tradición.
          </p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md mx-auto border rounded-lg p-6 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">
            Tradición no encontrada
          </h3>
          <p className="text-muted-foreground">
            La tradición cultural que buscas no existe.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <CultureHero item={item} />

      {/* Contenido */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Principal */}
          <CultureMain item={item} />

          {/* Sidebar */}
          <CultureSidebar item={item} />
        </div>
      </div>
    </div>
  );
}
