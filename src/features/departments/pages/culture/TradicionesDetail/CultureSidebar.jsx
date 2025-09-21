import { MapPin, Users, Palette } from "lucide-react";
import CultureMain from "./CultureMain";

export default function CultureSidebar({ item }) {
  return (
    <div className="space-y-6">
      {/* Información */}
      <div className="border border-blue-200 bg-blue-400 rounded-lg p-6 space-y-4">
        <h3 className="text-white text-lg font-semibold mb-4">Información</h3>
        <div className="flex items-center gap-3">
          <MapPin className="w-4 h-4 text-primary text-white" />
          <div>
            <p className="text-white font-medium">Región</p>
            <p className="text-white text-sm text-muted-foreground">
              {item.region || "Región cultural"}
            </p>
          </div>
        </div>
        <hr className="border border-white " />
        <div className="flex items-center gap-3">
          <Palette className="text-white w-4 h-4 text-primary" />
          <div>
            <p className="text-white font-medium">Tipo</p>
            <p className="text-white text-sm text-muted-foreground">
              {item.tipo || "Arte y tradición"}
            </p>
          </div>
        </div>
        <hr className="border border-white " />
        <div className="flex items-center gap-3">
          <Users className="text-white  w-4 h-4 text-primary" />
          <div>
            <p className="text-white font-medium">Participación</p>
            <p className="text-white text-sm text-muted-foreground">
              Comunitaria
            </p>
          </div>
        </div>
      </div>

      {/* Relacionadas */}
      <div className="border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Tradiciones Relacionadas</h3>
        <div className="space-y-3">
          {[
            "Danzas Folclóricas",
            "Artesanías Locales",
            "Música Tradicional",
            "Gastronomía Típica",
          ].map((tradition, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg cursor-pointer"
            >
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Palette className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium">{tradition}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
