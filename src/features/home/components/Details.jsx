import { useState, useEffect } from "react";
import { Star, Mountain, Leaf, Utensils, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const cultureSections = [
  {
    title: "Montañas y Paisajes",
    description:
      "Nicaragua es un país montañoso con volcanes, lagos y reservas naturales que forman paisajes únicos.",
    image: "https://www.infobae.com/resizer/v2/V57CRY6LQ5BTVLMR5AWZTUMUKI.jpg?auth=751b102cfe32733b2bbc2725e28bc560c6172b2605da4f2024ebc842a5c275a2&smart=true&width=992&height=589&quality=85",
    icon: Mountain,
    color: "from-[#39C2FF] via-[#39C2FF] to-[#39C2FF]",
    solid: "bg-[#39C2FF]",
    titleColor: "text-[#39C2FF]",
    textColor: "text-[#39C2FF]",
    stats: "12 volcanes activos",
  },
  {
    title: "Flora y Fauna",
    description:
      "Su biodiversidad incluye bosques tropicales, ríos y especies endémicas que muestran la riqueza natural del país.",
    image: "https://www.mapanicaragua.com/wp-content/uploads/2022/03/Iguana.jpg",
    icon: Leaf,
    color: "from-[#2C2C2C] via-[#2C2C2C] to-[#2C2C2C]",
    solid: "bg-[#2C2C2C]",
    titleColor: "text-[#2C2C2C]",
    textColor: "text-[#2C2C2C]",
    stats: "7,000+ especies",
  },
  {
    title: "Gastronomía",
    description:
      "Platos tradicionales como el gallo pinto, vigorón y quesillo reflejan la cultura y los sabores locales.",
    icon: Utensils,
    color: "from-[#FECF3D] via-[#FECF3D] to-[#FECF3D]",
    solid: "bg-[#FECF3D]",
    titleColor: "text-[#FECF3D]",
    textColor: "text-[#FECF3D]",
    stats: "100+ platos típicos",
    image: "https://www.intur.gob.ni/wp-content/uploads/2018/08/Surtido-de-comida-tipica-Nicaragua.jpg",
  },
  {
    title: "Música y Artesanía",
    description:
      "La música folclórica, danzas tradicionales y artesanías reflejan la creatividad y la historia del pueblo nicaragüense.",
    icon: Music,
    color: "from-[#FF3069] via-[#FF3069] to-[#FF3069]",
    solid: "bg-[#FF3069]",
    titleColor: "text-[#FF3069]",
    textColor: "text-[#FF3069]",
    stats: "50+ danzas folclóricas",
    image: "https://www.el19digital.com/files/notas/source/2023/Enero/20%20Enero/DIRIAMBA/DIRIAMBAPORTADA.jpg",
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
    <section className="relative py-12 flex justify-center items-center overflow-hidden">
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h2
            className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span
              className={`block drop-shadow-2xl ${currentSection.titleColor}`}
            >
              Tesoros de nuestra identidad cultural
            </span>
          </motion.h2>

          <motion.p
            className={`${currentSection.textColor} text-base sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Cada rincón de Nicaragua guarda historias, sabores y tradiciones que
            han pasado de generación en generación, formando el rico tapiz de
            nuestra cultura.
          </motion.p>
        </motion.div>

        {/* Slider */}
        <div className="relative">
          {/* Indicadores */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-3 sm:gap-4 z-20">
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
                  <SectionIcon className="w-4 sm:w-5 h-4 sm:h-5 text-white transition-colors" />
                </motion.button>
              );
            })}
          </div>

          {/* Slider principal */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                className="relative w-full h-80 rounded-3xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: -90 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                {/* Imagen de fondo con overlay */}
                <img
                  src={currentSection.image}
                  alt={currentSection.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/50" />

                {/* Contenido */}
                <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-8 md:px-16 text-white">
                  <motion.h3
                    className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 leading-tight"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    {currentSection.title}
                  </motion.h3>

                  <motion.p
                    className="text-sm sm:text-base md:text-lg mb-2 sm:mb-4 max-w-full sm:max-w-3xl leading-relaxed"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    {currentSection.description}
                  </motion.p>

                  <motion.div
                    className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 sm:px-6 py-1 sm:py-2 text-white font-medium"
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

            {/* Barra de progreso */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
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
      </div>
    </section>
  );
}
