import { Link } from "react-router-dom";

export default function DepartmentCard({ ciudad }) {
  return (
    <Link
      to={`/department/${ciudad.slug}`}
      className="group relative block rounded-2xl overflow-hidden bg-card shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
    >
      {/* Contenedor de imagen */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={ciudad.imagen_url || "/placeholder.svg"}
          alt={ciudad.nombre}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlay de gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

        {/* Borde de acento al pasar el mouse */}
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 group-hover:ring-accent/50 transition-all duration-500" />
      </div>

      {/* Contenido */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h2 className="text-2xl font-bold text-white text-balance group-hover:text-accent transition-colors duration-300">
          {ciudad.nombre}
        </h2>

        {/* Indicador de hover */}
        <div className="mt-3 flex items-center gap-2 text-white/80 group-hover:text-accent transition-colors duration-300">
          <span className="text-sm font-medium">Explorar</span>
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>

      {/* Elemento decorativo */}
      <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-accent/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </Link>
  );
}
