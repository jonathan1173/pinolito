import { motion } from "framer-motion";
import { MapPin, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function MunicipalityHero({
  name,
  description,
  imagen_url,
  departmentSlug,
  departmentName,
}) {
  return (
    <div className="flex flex-col md:flex-row w-full h-auto md:h-80 bg-blue-500 overflow-hidden shadow-lg">
      {/* Imagen inclinada */}
      <motion.div
        className="w-full md:w-1/2 h-64 md:h-full relative"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 20, duration: 1 }}
      >
        <img
          src={imagen_url}
          alt={name}
          className="w-full h-full object-cover"
          style={{
            clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)",
          }}
        />
        <div
          className="absolute inset-0 bg-black/30"
          style={{ clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)" }}
        />

        {/* Botón regresar */}
        {departmentSlug && departmentName && (
          <Link
            to={`/department/${departmentSlug}`}
            className="absolute top-4 left-4 flex items-center gap-1 bg-white/90 px-3 py-1 rounded shadow hover:bg-white"
          >
            <ArrowLeft className="w-4 h-4" /> Volver a {departmentName}
          </Link>
        )}
      </motion.div>

      {/* Contenido derecho */}
      <motion.div
        className="w-full md:w-1/2 p-6 flex flex-col justify-center relative z-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white drop-shadow-lg">
          {name}
        </h2>
        <p className="text-white/90 mb-4">{description}</p>
        <div className="flex items-center gap-2 text-white/80">
          <MapPin className="w-5 h-5" />
          <span>Ubicación destacada</span>
        </div>
      </motion.div>
    </div>
  );
}
