import {
  BookOpen,
  Calendar,
  Users,
  Clock,
  Award,
} from "lucide-react";

export default function CultureMain({item}) {
  return (
    <div className="lg:col-span-2 space-y-8">
      {/* Descripción */}
      <div className="border rounded-lg p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
          <BookOpen className="w-5 h-5 text-primary" />
          Descripción
        </h2>
        <p className="leading-relaxed text-lg">
          {item.descripcion || item.contenido}
        </p>
      </div>

      {/* Significado */}
      <div className="border rounded-lg p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
          <Award className="w-5 h-5 text-primary" />
          Significado Cultural
        </h2>
        <p className="text-muted-foreground mb-4">
          Esta tradición representa una parte fundamental del patrimonio
          cultural, transmitida de generación en generación.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Users className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium">Comunidad</p>
              <p className="text-sm text-muted-foreground">
                Tradición comunitaria
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Clock className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium">Antigüedad</p>
              <p className="text-sm text-muted-foreground">
                Siglos de historia
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contexto */}
      <div className="border rounded-lg p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
          <Calendar className="w-5 h-5 text-primary" />
          Contexto Histórico
        </h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Esta manifestación cultural tiene sus raíces en tradiciones
            ancestrales y ha evolucionado a lo largo del tiempo.
          </p>
          <hr className="border-border" />
          <div className="grid gap-4">
            <div className="flex gap-4">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Orígenes</p>
                <p className="text-sm text-muted-foreground">
                  Tradición que se remonta a las culturas originarias de la
                  región
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Evolución</p>
                <p className="text-sm text-muted-foreground">
                  Ha incorporado elementos contemporáneos sin perder su
                  identidad
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Actualidad</p>
                <p className="text-sm text-muted-foreground">
                  Continúa siendo practicada y valorada por las nuevas
                  generaciones
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
