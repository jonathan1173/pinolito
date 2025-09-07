import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background Images con overlay suave */}
      <div className="absolute inset-0 flex ">
        {/* Izquierda */}
        <motion.div
          className="w-1/2 relative overflow-hidden"
          initial={{ scale: 1.2, x: -150, opacity: 0 }}
          animate={{ scale: 1, x: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <motion.div
            className="absolute inset-0 bg-cover bg-left"
            style={{
              backgroundImage: `url('./paisaje nica.jpg')`,
              backgroundSize: "200% 100%",
              backgroundPosition: "left",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
        </motion.div>

        {/* Derecha */}
        <motion.div
          className="w-1/2 relative overflow-hidden"
          initial={{ scale: 1.2, x: 150, opacity: 0 }}
          animate={{ scale: 1, x: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-cover bg-right"
            style={{
              backgroundImage: `url('./paisaje nica.jpg')`,
              backgroundSize: "200% 100%",
              backgroundPosition: "right",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/30 to-transparent" />
        </motion.div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 text-center max-w-4xl px-6 mx-auto">
        {/* Títulos */}
        <motion.header
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="block text-blue-900">
              Descubre la riqueza de la
            </span>
            <span className="block text-white drop-shadow-lg">
              cultura nicaragüense
            </span>
          </h1>
        </motion.header>

        {/* Botones */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {/* Botón principal */}
          <Link
            to="/games"
            className="group relative overflow-hidden bg-blue-500 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-[#FAB036]/60 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 ease-out"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Play className="w-5 h-5" />
              Explora Juegos
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Link>

          {/* Botón secundario */}
          <Link
            to="/activity"
            className="group relative overflow-hidden bg-[#5A7A0A] text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-[#83D350] hover:text-[#513C2F] transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 ease-out"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Ver Actividades
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
