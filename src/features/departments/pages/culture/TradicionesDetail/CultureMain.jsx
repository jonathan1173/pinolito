import {
  BookOpen,
  Calendar,
  Users,
  Clock,
  Award,
  MapPin,
  Sparkles,
  Landmark,
  HeartHandshake,
} from "lucide-react";

export default function CultureMain({ item }) {
  return (
    <div className="lg:col-span-2 space-y-8">
      {/* Descripción */}
      <div className="border rounded-xl p-8 bg-white shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-[#39C2FF]">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-[#39C2FF] mb-4">
          <BookOpen className="w-6 h-6" />
          Descripción
        </h2>
        <p className="leading-relaxed text-gray-700 text-lg whitespace-pre-line">
          {item.descripcion || item.contenido || "Sin descripción disponible."}
        </p>
      </div>

      {/* Significado Cultural */}
      <div className="border rounded-xl p-8 bg-white shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-[#8C52FF]">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-[#8C52FF] mb-4">
          <Award className="w-6 h-6" />
          Significado Cultural
        </h2>
        <p className="leading-relaxed text-gray-700 text-lg whitespace-pre-line">
          {item.significado_cultural || "No se ha registrado el significado cultural."}
        </p>
      </div>

      {/* Contexto Histórico */}
      <div className="border rounded-xl p-8 bg-white shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-[#FECF3D]">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-[#FECF3D] mb-4">
          <Calendar className="w-6 h-6" />
          Contexto Histórico
        </h2>
        <p className="leading-relaxed text-gray-700 text-lg whitespace-pre-line">
          {item.contexto || "No se ha registrado el contexto histórico."}
        </p>
      </div>

      {/* Ubicación o Región */}
      <div className="border rounded-xl p-8 bg-white shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-[#FF3069]">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-[#FF3069] mb-4">
          <MapPin className="w-6 h-6" />
          Ubicación o Región de Origen
        </h2>
        <p className="leading-relaxed text-gray-700 text-lg whitespace-pre-line">
          {item.ubicacion || "Información de ubicación no disponible."}
        </p>
      </div>

      {/* Valor Tradicional */}
      <div className="border rounded-xl p-8 bg-white shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-[#39C2FF]">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-[#39C2FF] mb-4">
          <Landmark className="w-6 h-6" />
          Valor Tradicional y Costumbres
        </h2>
        <p className="leading-relaxed text-gray-700 text-lg whitespace-pre-line">
          {item.valor_tradicional ||
            "Aún no se ha registrado el valor tradicional asociado."}
        </p>
      </div>

      {/* Relevancia Actual */}
      <div className="border rounded-xl p-8 bg-white shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-[#8C52FF]">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-[#8C52FF] mb-4">
          <Sparkles className="w-6 h-6" />
          Relevancia en la Actualidad
        </h2>
        <p className="leading-relaxed text-gray-700 text-lg whitespace-pre-line">
          {item.relevancia ||
            "No se ha documentado la relevancia actual de este elemento cultural."}
        </p>
      </div>

      {/* Comunidad o Participación Social */}
      <div className="border rounded-xl p-8 bg-white shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-[#FF3069]">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-[#FF3069] mb-4">
          <Users className="w-6 h-6" />
          Comunidad y Participación Social
        </h2>
        <p className="leading-relaxed text-gray-700 text-lg whitespace-pre-line">
          {item.comunidad ||
            "Aún no se ha registrado la información sobre la comunidad participante."}
        </p>
      </div>

      {/* Transmisión y Preservación */}
      <div className="border rounded-xl p-8 bg-white shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-[#FECF3D]">
        <h2 className="flex items-center gap-2 text-2xl font-semibold text-[#FECF3D] mb-4">
          <HeartHandshake className="w-6 h-6" />
          Transmisión y Preservación
        </h2>
        <p className="leading-relaxed text-gray-700 text-lg whitespace-pre-line">
          {item.transmision ||
            "No hay datos registrados sobre cómo se transmite o preserva esta tradición."}
        </p>
      </div>
    </div>
  );
}
