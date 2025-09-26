"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

export default function Hero() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 1200,
    height: 800,
  });

  useEffect(() => {
    const updateDimensions = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <section className="relative py-6 min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#39C2FF] via-[#8C52FF] to-[#FECF3D]">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
      >
        <motion.div
          className="absolute inset-0 bg-cover bg-center" 
          style={{
            backgroundImage: `url('https://www.infobae.com/resizer/v2/QX4DUNSYBZC7DBG6B76AQYLMP4.jpg?auth=cb0f602901bba70bc6ae2abeb1eac7650205c9ab79824ea1c8f6958fad9935af&smart=true&width=992&height=558&quality=85')`,
          }}
          animate={{
            scale: [1, 1.05, 1],
            x: [0, -10, 0],
            y: [0, -5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      {/* Decorative Elements */}

      <motion.div
        className="absolute top-20 left-20 w-32 h-32 border-2 border-green-500/50 rounded-full"
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ duration: 3, ease: "easeOut", delay: 1 }}
      />

      <motion.div
        className="absolute bottom-32 right-16 w-24 h-24 border-2 border-amber-500/50 rounded-full"
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: -360 }}
        transition={{ duration: 2.5, ease: "easeOut", delay: 1.5 }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center md:text-center max-w-5xl px-6 mx-auto">
        {/* Enhanced Title */}
        <motion.header
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            <motion.span
              className="block text-white drop-shadow-2xl"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Descubre la riqueza de la
            </motion.span>

            <motion.span
              className="block text-white drop-shadow-2xl"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              cultura nicaragüense
            </motion.span>
          </h1>
        </motion.header>

        <motion.p
          className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto md:mx-auto mb-10 leading-relaxed text-left md:text-center"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          Sumérgete en tradiciones milenarias, paisajes extraordinarios y la
          calidez de nuestro pueblo
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          {/* Primary Button */}
          <Link
            to="/games"
            className="group relative overflow-hidden bg-gradient-to-r from-[#39C2FF] to-[#39C2FF] text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 ease-out border border-[#39C2FF]/30 text-sm sm:text-base"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#39C2FF] to-[#39C2FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Play className="w-4 h-4 sm:w-5 sm:h-5" />
              Explora Juegos
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Link>

          {/* Secondary Button */}
          <Link
            to="/department"
            className="group relative overflow-hidden bg-gradient-to-r from-[#FECF3D] to-[#FECF3D] text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-2xl hover:shadow-green-500/25 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 ease-out border border-[#FECF3D]/30 text-sm sm:text-base"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#FECF3D] to-[#FECF3D] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              Ver Departamentos
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
