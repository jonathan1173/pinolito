"use client"

import { useDetalle } from "../../../hooks/useDetalle"
import { useParams } from "react-router-dom"
import { Calendar, User, BookOpen, Clock, MapPin, Scroll } from "lucide-react"
import CultureHero from "../CultureHero"


export default function HistoriaDetail() {
  const { slug } = useParams()
  const { item, loading, error } = useDetalle({ tabla: "historia", slug })

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Cargando historia...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md bg-background border rounded-lg p-6 text-center">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-destructive" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Error al cargar</h3>
          <p className="text-muted-foreground">No se pudo cargar la información de la historia.</p>
        </div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md bg-background border rounded-lg p-6 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Scroll className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Historia no encontrada</h3>
          <p className="text-muted-foreground">La historia que buscas no existe.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <CultureHero item={item} />


      <div className="relative bg-gradient-to-b from-muted to-background">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200')] opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-3 py-1 rounded-full text-sm mb-4">
            <BookOpen className="w-4 h-4" />
            Historia
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">{item.nombre}</h1>
          {item.fecha_referencia && (
            <div className="flex items-center justify-center text-muted-foreground mb-6">
              <Calendar className="w-5 h-5 mr-2" />
              <span className="text-lg italic">{item.fecha_referencia}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna principal */}
        <div className="lg:col-span-2 space-y-8">
          {item.imagen_url && (
            <div className="overflow-hidden border rounded-lg">
              <div className="aspect-video relative">
                <img
                  src={item.imagen_url || "/placeholder.svg"}
                  alt={item.nombre}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          )}

          <div className="border rounded-lg p-6">
            <h2 className="flex items-center text-primary font-semibold mb-4">
              <Scroll className="w-6 h-6 mr-3" />
              Relato Histórico
            </h2>
            <p className="text-foreground leading-relaxed text-lg">{item.contenido}</p>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="flex items-center text-primary font-semibold mb-4">
              <Clock className="w-6 h-6 mr-3" />
              Contexto Temporal
            </h2>
            <div className="relative pl-6">
              <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-border"></div>
              <div className="space-y-6">
                <div className="relative flex items-start">
                  <div className="absolute left-0 w-4 h-4 bg-secondary rounded-full border-4 border-background"></div>
                  <div className="ml-6">
                    <div className="text-sm text-muted-foreground">Período Histórico</div>
                    <div className="font-semibold text-primary">
                      {item.fecha_referencia || "Fecha no especificada"}
                    </div>
                  </div>
                </div>
                <div className="relative flex items-start">
                  <div className="absolute left-0 w-4 h-4 bg-accent rounded-full border-4 border-background"></div>
                  <div className="ml-6">
                    <div className="text-sm text-muted-foreground">Relevancia</div>
                    <div className="font-semibold text-primary">Patrimonio Cultural</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="border rounded-lg p-6">
            <h3 className="flex items-center text-primary font-semibold mb-4">
              <User className="w-5 h-5 mr-2" />
              Información de Fuente
            </h3>
            {item.autor_fuente && (
              <div className="mb-4">
                <div className="text-sm text-muted-foreground">Autor/Fuente</div>
                <div className="font-medium">{item.autor_fuente}</div>
              </div>
            )}
            <div className="h-px bg-border my-4"></div>
            <div className="text-sm">
              <p className="mb-1 text-muted-foreground">Tipo de Documento</p>
              <span className="px-2 py-1 border rounded text-xs">Registro Histórico</span>
            </div>
            <div className="text-sm mt-4">
              <p className="mb-1 text-muted-foreground">Estado</p>
              <span className="px-2 py-1 bg-secondary/20 rounded text-xs">Verificado</span>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="flex items-center text-primary font-semibold mb-4">
              <MapPin className="w-5 h-5 mr-2" />
              Temas Relacionados
            </h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium">Historia Regional</p>
                <p className="text-xs text-muted-foreground">Contexto local</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium">Patrimonio Cultural</p>
                <p className="text-xs text-muted-foreground">Preservación histórica</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium">Documentos Históricos</p>
                <p className="text-xs text-muted-foreground">Archivo documental</p>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="text-primary font-semibold mb-2 text-sm">Cita Académica</h3>
            <div className="text-xs text-muted-foreground bg-muted p-3 rounded-lg font-mono">
              {item.autor_fuente && `${item.autor_fuente}. `}"{item.nombre}".
              {item.fecha_referencia && ` ${item.fecha_referencia}.`} {" Archivo Histórico Regional."}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
