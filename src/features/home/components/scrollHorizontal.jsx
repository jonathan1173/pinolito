"use client";

import { motion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Trees from "./Trees";
import FireworksComponent from "./Fireworks";

gsap.registerPlugin(ScrollTrigger);

// Animación letra por letra mejorada
const Letter = ({ char, i, gradient = false }) => (
  <motion.span
    initial={{ y: 100, opacity: 0, rotateX: -90 }}
    whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
    transition={{
      delay: i * 0.03,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      type: "spring",
      stiffness: 100,
    }}
    viewport={{ once: true }}
    className={`inline-block ${gradient ? "text-gradient-primary" : ""}`}
    style={{ transformOrigin: "center bottom" }}
  >
    {char}
  </motion.span>
);

// Componente de formas geométricas decorativas
const GeometricShape = ({ type, className, delay = 0 }) => {
  const shapes = {
    circle: (
      <motion.div
        initial={{ scale: 0, rotate: 0 }}
        whileInView={{ scale: 1, rotate: 360 }}
        transition={{ delay, duration: 1.5, ease: "easeOut" }}
        className={`rounded-full ${className}`}
      />
    ),
    square: (
      <motion.div
        initial={{ scale: 0, rotate: 45 }}
        whileInView={{ scale: 1, rotate: 0 }}
        transition={{ delay, duration: 1.2, ease: "easeOut" }}
        className={`${className}`}
      />
    ),
    triangle: (
      <motion.div
        initial={{ scale: 0, rotate: 0 }}
        whileInView={{ scale: 1, rotate: 180 }}
        transition={{ delay, duration: 1.8, ease: "easeOut" }}
        className={`${className}`}
        style={{
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
        }}
      />
    ),
  };

  return shapes[type] || shapes.circle;
};

export default function HorizontalScrollSection() {
  const component = useRef();
  const slider = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".panel");

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: slider.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => "+=" + slider.current.offsetWidth,
          markers: false,
        },
      });
    }, component);

    return () => ctx.revert();
  }, []);

  const frasePanel1 = "";
  const frasePanel2 = "Si pequeña es la Patria,";
  const frasePanel3 = "uno grande la sueña";
  const frasePanel4 = "Nicaragua";
  const frasePanel5 = "Donde los sueños tracienden fronteras";

  const renderFrase = (frase, gradient = false) => {
    return frase.split(" ").map((word, wi) => (
      <span key={wi} className="inline-block">
        {word.split("").map((char, i) => (
          <Letter key={i} char={char} i={i + wi * 10} gradient={gradient} />
        ))}
        <span>&nbsp;</span>
      </span>
    ));
  };

  return (
    <div ref={component} className="overflow-x-hidden bg-black">
      <section
        ref={slider}
        className="relative w-screen overflow-hidden hidden sm:hidden md:block"
      >
        <div className="flex h-screen">
          {/* Panel 1 - Mantener diseño actual con efectos modernos */}
          <div className="panel flex-shrink-0 w-screen h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-r from-[#39C2FF] to-black">
            <FireworksComponent flickerEffect={true} className="my-fireworks" />

            <GeometricShape
              type="circle"
              className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-[#fecf3d] to-[#ff3069] opacity-20 animate-float"
              delay={0.2}
            />
            <GeometricShape
              type="square"
              className="absolute bottom-32 right-32 w-24 h-24 bg-gradient-to-r from-[#8c52ff] to-[#39c2ff] opacity-30"
              delay={0.5}
            />

            <motion.div
              initial={{ opacity: 0, y: 50, rotate: -6 }}
              whileInView={{ opacity: 1, y: 0, rotate: 6 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute top-10 left-4 md:left-20 w-32 h-24 md:w-60 md:h-40 rounded-2xl overflow-hidden shadow-2xl animate-pulse-glow"
            >
              <img
                src="https://www.mapanicaragua.com/wp-content/uploads/2022/02/Isletas-de-Granada-2.jpg"
                alt="Ometepe Landscape"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="absolute top-20 left-32 md:left-96 w-32 h-48 md:w-90 md:h-80 rounded-2xl overflow-hidden shadow-2xl animate-pulse-glow"
            >
              <img
                src="https://www.mapanicaragua.com/wp-content/uploads/2022/02/Laguna-de-Apoyo-1.jpg"
                alt="Colonial Church"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50, rotate: 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: -2 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="absolute bottom-50 left-8 md:left-32 w-32 h-24 md:w-90 md:h-60 rounded-2xl overflow-hidden shadow-2xl animate-pulse-glow"
            >
              <img
                src="https://www.mapanicaragua.com/wp-content/uploads/2022/02/Los-Guatuzos-1.jpg"
                alt="Nicaragua Landscape"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <div className="text-center p-8 z-10 relative">
              <h2 className="text-4xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-[#39c2ff] to-[#8c52ff] bg-clip-text text-transparent">
                {renderFrase(frasePanel1, true)}
              </h2>
            </div>

            <svg
              className="absolute -z-10 bottom-0 -right-10 w-[400px] md:w-[800px] h-42 md:h-84"
              viewBox="0 0 300 150"
              preserveAspectRatio="none"
            >
              <polygon points="10,150 70,50 130,150" fill="#1a1a1a" />
              <polygon points="60,150 140,0 220,150" fill="#2c2c2c" />
              <polygon points="160,150 210,60 260,150" fill="#1a1a1a" />
            </svg>

            <Trees />
          </div>

          {/* Panel 2 - Segunda parte del verso */}
          <div className="panel flex-shrink-0 w-screen h-screen flex items-center justify-center relative overflow-hidden">

            {/* Formas geométricas grandes */}
            <motion.div
              initial={{ rotate: 0, scale: 0 }}
              whileInView={{ rotate: 45, scale: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute top-20 left-20 w-40 h-40 border-4 border-[#39C2FF] "
            />
            <motion.div
              initial={{ rotate: 0, scale: 0 }}
              whileInView={{ rotate: 45, scale: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute top-10 left-20 w-40 h-40 border-4 border-[#ff3069] "
            />
            <motion.div
              initial={{ rotate: 0, scale: 0 }}
              whileInView={{ rotate: 45, scale: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute bottom-40 right-20 w-40 h-40 border-4 border-[#39C2FF] "
            />
            <motion.div
              initial={{ rotate: 0, scale: 0 }}
              whileInView={{ rotate: -30, scale: 1 }}
              transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
              className="absolute bottom-32 right-32 w-32 h-32 rounded-full"
            />

            {/* Líneas dinámicas */}
            <svg
              className="absolute inset-0 w-full h-full "
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 3, ease: "easeInOut" }}
                d="M0,20 Q50,80 100,40"
                stroke="url(#gradient1)"
                strokeWidth="0.5"
                fill="none"
              />
              <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
                d="M0,60 Q50,20 100,70"
                stroke="url(#gradient2)"
                strokeWidth="0.3"
                fill="none"
              />
              <defs>
                <linearGradient
                  id="gradient1"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#39c2ff" />
                  <stop offset="100%" stopColor="#8c52ff" />
                </linearGradient>
                <linearGradient
                  id="gradient2"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#ff3069" />
                  <stop offset="100%" stopColor="#fecf3d" />
                </linearGradient>
              </defs>
            </svg>

            <div className="text-center p-8 z-10 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="mb-8"
              >
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-8 h-px bg-gradient-primary"></div>
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <div className="w-8 h-px bg-gradient-secondary"></div>
                </div>
              </motion.div>

              <h2 className="text-white text-6xl md:text-7xl font-bold mb-8 text-gradient-secondary leading-tight">
                {renderFrase(frasePanel2)}
              </h2>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="flex items-center justify-center gap-6"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-primary rounded-full animate-pulse"></div>
                </div>
                <div className="w-16 h-px bg-gradient-primary"></div>
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-secondary rounded-full animate-pulse"></div>
                </div>
              </motion.div>
            </div>
            <Trees />
          </div>

          {/* Panel 3 - Segunda parte del verso */}
          <div className="panel flex-shrink-0 w-screen h-screen flex items-center justify-center relative overflow-hidden">
            {/* Fondo dinámico */}

            {/* Formas geométricas grandes */}
            <motion.div
              initial={{ rotate: 0, scale: 0 }}
              whileInView={{ rotate: 45, scale: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute top-20 left-20 w-40 h-40 border-4 border-[#39c2ff] "
            />
            <motion.div
              initial={{ rotate: 0, scale: 0 }}
              whileInView={{ rotate: 45, scale: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute bottom-40 right-20 w-40 h-40 border-4 border-[#fecf3d] "
            />
            <motion.div
              initial={{ rotate: 0, scale: 0 }}
              whileInView={{ rotate: -30, scale: 1 }}
              transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
              className="absolute bottom-32 right-32 w-32 h-32 bg-gradient-secondary opacity-30 rounded-full"
            />

            {/* Líneas dinámicas */}
            <svg
              className="absolute inset-0 w-full h-full "
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 3, ease: "easeInOut" }}
                d="M0,20 Q50,80 100,40"
                stroke="url(#gradient1)"
                strokeWidth="0.5"
                fill="none"
              />
              <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
                d="M0,60 Q50,20 100,70"
                stroke="url(#gradient2)"
                strokeWidth="0.3"
                fill="none"
              />
              <defs>
                <linearGradient
                  id="gradient1"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#39c2ff" />
                  <stop offset="100%" stopColor="#8c52ff" />
                </linearGradient>
                <linearGradient
                  id="gradient2"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#ff3069" />
                  <stop offset="100%" stopColor="#fecf3d" />
                </linearGradient>
              </defs>
            </svg>

            <div className="text-center p-8 z-10 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="mb-8"
              >
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-8 h-px bg-gradient-primary"></div>
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <div className="w-8 h-px bg-gradient-secondary"></div>
                </div>
              </motion.div>

              <h2 className="text-white text-6xl md:text-7xl font-bold mb-8 text-gradient-secondary leading-tight">
                {renderFrase(frasePanel3)}
              </h2>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="flex items-center justify-center gap-6"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-primary rounded-full animate-pulse"></div>
                </div>
                <div className="w-16 h-px bg-gradient-primary"></div>
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-secondary rounded-full animate-pulse"></div>
                </div>
              </motion.div>
            </div>
            <Trees />
          </div>

          {/* Panel 4 - Mantener diseño actual con efectos modernos */}
          <div className="panel flex-shrink-0 w-screen h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-r from-black to-[#fecf3d]">
            <FireworksComponent flickerEffect={true} className="my-fireworks" />

            <motion.div
              initial={{ scale: 0, rotate: 0 }}
              whileInView={{ scale: 1, rotate: 360 }}
              transition={{ duration: 3, ease: "easeOut" }}
              className="absolute top-1/4 left-1/4 w-64 h-64 border border-[#8c52ff]/30 rounded-full"
            />

            <motion.div
              initial={{ opacity: 0, y: 50, rotate: 6 }}
              whileInView={{ opacity: 1, y: 0, rotate: 6 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute top-10 right-4 md:right-20 w-32 h-24 md:w-60 md:h-40 rounded-2xl overflow-hidden shadow-2xl animate-pulse-glow"
            >
              <img
                src="https://www.mapanicaragua.com/wp-content/uploads/2022/02/Refugio-de-Vida-Silvestre-Playa-La-Flor-1.jpg"
                alt="Ometepe Landscape"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="absolute top-10 left-28 md:right-96 w-32 h-48 md:w-80 md:h-60 rounded-2xl overflow-hidden shadow-2xl animate-pulse-glow"
            >
              <img
                src="https://www.mapanicaragua.com/wp-content/uploads/2022/02/Mirador-de-Catarina-1.jpg"
                alt="Colonial Church"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: -2 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="absolute bottom-30 right-8 md:right-32 w-32 h-24 md:w-70 md:h-60 rounded-2xl overflow-hidden shadow-2xl animate-pulse-glow"
            >
              <img
                src="https://www.mapanicaragua.com/wp-content/uploads/2022/02/Reserva-Cerro-Wawashang-1.jpg"
                alt="Nicaragua Landscape"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <div className=" text-center p-8 z-10 relative">
              {/* Frase 4 */}
              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-4xl  md:text-8xl font-bold mb-4 p-4 bg-[#ff3069]    to-80% bg-clip-text text-transparent"
              >
                {renderFrase(frasePanel4, true)}
              </motion.h2>

              {/* Frase 5 (entra después) */}
              <motion.p
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="text-4xl text-white"
              >
                {renderFrase(frasePanel5, true)}
              </motion.p>
            </div>

            <svg
              className="absolute -z-10 bottom-0 left-150 h-42 md:h-84"
              viewBox="0 0 500 150"
              preserveAspectRatio="none"
            >
              <path d="M0,150 Q50,80 120,150 T250,150" fill="#1a1a1a" />
              <path d="M100,150 Q200,40 300,150 T500,150" fill="#2c2c2c" />
              <path d="M200,150 Q250,90 320,150 T500,150" fill="#1a1a1a" />
            </svg>
            <Trees />
          </div>
        </div>
      </section>
    </div>
  );
}
