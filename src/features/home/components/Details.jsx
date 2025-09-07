import { useState, useEffect } from "react";
import { Star, Mountain, Leaf, Utensils, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const cultureSections = [
  {
    title: "Montañas y Paisajes",
    description:
      "Nicaragua es un país montañoso con volcanes, lagos y reservas naturales que forman paisajes únicos.",
    image:
      "./volcan-concepcion-2022.jpg",
    icon: Mountain,
    color: "from-amber-700 via-amber-500 to-amber-400",
    solid: "bg-amber-600",
    titleColor: "text-amber-900",
    textColor: "text-amber-800",
    stats: "12 volcanes activos",
  },
  {
    title: "Flora y Fauna",
    description:
      "Su biodiversidad incluye bosques tropicales, ríos y especies endémicas que muestran la riqueza natural del país.",
    image:
      "./flora-fauna.jpg",
    icon: Leaf,
    color: "from-lime-700 via-lime-500 to-lime-400",
    solid: "bg-lime-600",
    titleColor: "text-lime-900",
    textColor: "text-lime-800",
    stats: "7,000+ especies",
  },
  {
    title: "Gastronomía",
    description:
      "Platos tradicionales como el gallo pinto, vigorón y quesillo reflejan la cultura y los sabores locales.",
    icon: Utensils,
    color: "from-yellow-700 via-orange-500 to-amber-400",
    solid: "bg-amber-500",
    titleColor: "text-yellow-900",
    textColor: "text-yellow-800",
    stats: "100+ platos típicos",
    image:
      "gastronomia-nicaraguense.jpg",
  },
  {
    title: "Música y Artesanía",
    description:
      "La música folclórica, danzas tradicionales y artesanías reflejan la creatividad y la historia del pueblo nicaragüense.",
    icon: Music,
    color: "from-blue-700 via-blue-500 to-blue-400",
    solid: "bg-blue-600",
    titleColor: "text-blue-900",
    textColor: "text-blue-800",
    stats: "50+ danzas folclóricas",
    image:
      "./musica-y-artesania.jpg",
  },
];

export default function CultureSlider() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const total = cultureSections.length;

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [total, isAutoPlaying]);

  const goToSlide = (index) => {
    setIsAutoPlaying(false);
    setCurrent(index);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentSection = cultureSections[current];
  const IconComponent = currentSection.icon;

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Fondo animado */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-4 h-4 rounded-full bg-gradient-to-r ${currentSection.color} opacity-20`}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: [0.5, 1.5, 0.5],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h2
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 sm:mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span
              className={`block drop-shadow-2xl mb-2 sm:mb-4 ${currentSection.titleColor}`}
              style={{ WebkitTextStroke: "1px white" }}
            >
              Tesoros de nuestra
            </span>
            <span
              className={`block drop-shadow-lg bg-clip-text ${currentSection.textColor}`}
              style={{ WebkitTextStroke: "1px white" }}
            >
              identidad cultural
            </span>
          </motion.h2>

          <motion.p
            className={`${currentSection.textColor} text-base sm:text-xl md:text-2xl max-w-3xl sm:max-w-4xl mx-auto leading-relaxed`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Cada rincón de Nicaragua guarda historias, sabores y tradiciones que
            han pasado de generación en generación, formando el rico tapiz de
            nuestra cultura.
          </motion.p>
        </motion.div>

        {/* Contenedor del slider, indicadores y barra de progreso */}
        <div className="relative">
          {/* Indicadores arriba */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-3 sm:gap-4 z-20">
            {cultureSections.map((section, index) => {
              const SectionIcon = section.icon;
              return (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative group ${
                    index === current
                      ? `${currentSection.solid}`
                      : "bg-black/40 hover:bg-black/60"
                  } p-2 sm:p-3 rounded-full transition-all duration-300 border-2 border-white/20`}
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  animate={
                    index === current
                      ? {
                          boxShadow: [
                            "0 0 15px rgba(251, 191, 36, 0.5)",
                            "0 0 30px rgba(251, 191, 36, 0.8)",
                            "0 0 15px rgba(251, 191, 36, 0.5)",
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <SectionIcon className="w-4 sm:w-5 h-4 sm:h-5 text-white transition-colors"/>
                </motion.button>
              );
            })}
          </div>

          {/* Slider principal */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] rounded-3xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: -90 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                {/* Imagen de fondo */}
                <motion.div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${currentSection.image})` }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

             

                {/* Contenido */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-center px-4 sm:px-8 md:px-16">
                  <motion.h3
                    className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 leading-tight text-white`}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    {currentSection.title}
                  </motion.h3>

                  <motion.p
                    className={`text-white text-sm sm:text-base md:text-lg mb-4 sm:mb-6 max-w-full sm:max-w-3xl leading-relaxed`}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    {currentSection.description}
                  </motion.p>

                  <motion.div
                    className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 sm:px-6 py-2 sm:py-3 text-white font-medium"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                  >
                    <Star className="w-4 h-4" />
                    {currentSection.stats}
                  </motion.div>
                </div>

                {/* Esquinas decorativas */}
                <div
                  className={`absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-bl ${currentSection.color} opacity-20 rounded-bl-full`}
                />
                <div
                  className={`absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-tr ${currentSection.color} opacity-15 rounded-tr-full`}
                />
              </motion.div>
            </AnimatePresence>

            {/* Barra de progreso arriba de la tarjeta */}
            <div className="absolute botton-0 left-0 right-0 h-1 bg-white/20">
              <motion.div
                className={`h-full bg-gradient-to-r ${currentSection.color}`}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 6, ease: "linear" }}
                key={current}
              />
            </div>
          </div>
        </div>

        {/* Mini cards */}
        <motion.div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {cultureSections.map((section, index) => {
            const SectionIcon = section.icon;
            return (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative p-4 rounded-2xl transition-all duration-300 ${
                  index === current
                    ? "bg-white/20 border-2 border-white shadow-2xl"
                    : "bg-white/5 border border-white/10 hover:bg-white/10"
                }`}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className={`w-12 h-12 ${section.solid} rounded-full flex items-center justify-center mb-3 mx-auto`}
                >
                  <SectionIcon className="w-6 h-6 text-white" />
                </div>
                <h4
                  className={`${section.titleColor} font-semibold text-sm mb-1`}
                >
                  {section.title}
                </h4>
                <p className={`${section.textColor} text-xs`}>
                  {section.stats}
                </p>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
