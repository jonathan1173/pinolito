import { motion } from "framer-motion";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Animación letra por letra
const Letter = ({ char, i }) => (
  <motion.span
    initial={{ y: 50, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ delay: i * 0.02, duration: 0.2, ease: "easeOut" }}
    viewport={{ once: true }}
    className="inline-block"
  >
    {char}
  </motion.span>
);

export default function HorizontalScrollSection() {
  const component = useRef();
  const slider = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
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

  const frasePanel1 = "La riqueza de Nicaragua";
  const frasePanel2 = "se refleja en sus cultura,";
  const frasePanel3 = "su gastronomía";
  const frasePanel4 = "y la calidez de su gente.";

  const renderFrase = (frase) => {
    return frase.split(" ").map((word, wi) => (
      <span key={wi} className="inline-block">
        {word.split("").map((char, i) => (
          <Letter key={i} char={char} i={i + wi * 10} />
        ))}
        {/* Espacio después de cada palabra */}
        <span>&nbsp;</span>
      </span>
    ));
  };

  return (
    <div ref={component} className="overflow-x-hidden">
      {/* Sección horizontal */}
      <section
        ref={slider}
        className="relative w-screen overflow-hidden hidden sm:hidden md:block"
      >
        <div className="flex h-screen ">
          {/* Panel 1 */}
          <div className="panel flex-shrink-0 w-screen h-screen flex items-center justify-center bg-blue-100 relative">
            <div className="text-center p-8 z-10">
              <h2 className="text-8xl font-bold mb-4">
                {renderFrase(frasePanel1)}
              </h2>
            </div>

            {/* Triángulos estilo montañas */}
            <div className="absolute bottom-0 left-10 w-0 h-0 border-l-[60px] border-r-[60px] border-b-[100px] border-l-transparent border-r-transparent border-b-gray-700"></div>
            <div className="absolute bottom-0 left-60 w-0 h-0 border-l-[80px] border-r-[80px] border-b-[150px] border-l-transparent border-r-transparent border-b-gray-600"></div>
            <div className="absolute bottom-0 left-160 w-0 h-0 border-l-[50px] border-r-[50px] border-b-[90px] border-l-transparent border-r-transparent border-b-gray-800"></div>
          </div>

          {/* Panel 2 */}
          <div className="panel flex-shrink-0 w-screen h-screen flex items-center justify-center bg-green-100 relative">
            <div className="text-center p-8 z-10">
              <h2 className="text-8xl font-bold mb-4">
                {renderFrase(frasePanel2)}
              </h2>
            </div>

            {/* Árbol 1 - izquierda */}
            <div className="absolute bottom-0 left-16 flex flex-col items-center">
              {/* Árbol 1 */}
              <div className="relative w-20 h-24">
                <div className="w-full h-full bg-green-600 rounded-full absolute top-0"></div>
                <div className="w-full h-full bg-green-500 rounded-full absolute left-3 bottom-8"></div>
                <div className="w-full h-full bg-green-700 rounded-full absolute right-2 bottom-10"></div>
                <div className="w-full h-full bg-green-600 rounded-full absolute bottom-14"></div>
              </div>
              <div className="w-6 h-14 bg-amber-500 mt-[-1rem]"></div>
            </div>

            {/* Árbol 2 - izquierda */}
            <div className="absolute bottom-0 left-0 flex flex-col items-center">
              {/* Árbol 2 */}
              <div className="relative w-18 h-20">
                <div className="w-full h-full bg-green-500 rounded-full absolute top-0"></div>
                <div className="w-full h-full bg-green-600 rounded-full absolute left-2 bottom-6"></div>
                <div className="w-full h-full bg-green-400 rounded-full absolute right-1 bottom-6"></div>
                <div className="w-full h-full bg-green-500 rounded-full absolute bottom-10"></div>
              </div>
              <div className="w-5 h-12 bg-amber-600 mt-[-1rem]"></div>
            </div>

            {/* Árbol 3 - centro izquierdo */}
            <div className="absolute bottom-0 left-48 flex flex-col items-center">
              {/* Árbol 3 */}
              <div className="relative w-16 h-18">
                <div className="w-full h-full bg-green-700 rounded-full absolute top-0"></div>
                <div className="w-full h-full bg-green-600 rounded-full absolute left-2 bottom-6"></div>
                <div className="w-full h-full bg-green-500 rounded-full absolute right-1 bottom-6"></div>
                <div className="w-full h-full bg-green-700 rounded-full absolute bottom-10"></div>
              </div>
              <div className="w-5 h-10 bg-amber-500 mt-[-1rem]"></div>
            </div>

            {/* Árbol 4 - centro derecho */}
            <div className="absolute bottom-0 right-48 flex flex-col items-center">
              {/* Árbol 4 */}
              <div className="relative w-18 h-20">
                <div className="w-full h-full bg-green-400 rounded-full absolute top-0"></div>
                <div className="w-full h-full bg-green-500 rounded-full absolute left-3 bottom-8"></div>
                <div className="w-full h-full bg-green-600 rounded-full absolute right-2 bottom-8"></div>
                <div className="w-full h-full bg-green-400 rounded-full absolute bottom-12"></div>
              </div>
              <div className="w-5 h-12 bg-amber-600 mt-[-1rem]"></div>
            </div>

            {/* Árbol 5 - derecha */}
            <div className="absolute bottom-0 right-16 flex flex-col items-center">
              {/* Árbol 5 */}
              <div className="relative w-22 h-24">
                <div className="w-full h-full bg-green-700 rounded-full absolute top-0"></div>
                <div className="w-full h-full bg-green-600 rounded-full absolute left-4 bottom-10"></div>
                <div className="w-full h-full bg-green-500 rounded-full absolute right-3 bottom-10"></div>
                <div className="w-full h-full bg-green-700 rounded-full absolute bottom-16"></div>
              </div>
              <div className="w-7 h-14 bg-amber-500 mt-[-1rem]"></div>
            </div>

            {/* Árbol 6 - derecha fondo */}
            <div className="absolute bottom-0 right-80 flex flex-col items-center">
              {/* Árbol 6 */}
              <div className="relative w-14 h-16">
                <div className="w-full h-full bg-green-500 rounded-full absolute top-0"></div>
                <div className="w-full h-full bg-green-400 rounded-full absolute left-1 bottom-4"></div>
                <div className="w-full h-full bg-green-600 rounded-full absolute right-1 bottom-4"></div>
                <div className="w-full h-full bg-green-500 rounded-full absolute bottom-6"></div>
              </div>
              <div className="w-4 h-10 bg-amber-500 mt-[-1rem]"></div>
            </div>

            {/* Árbol 7 - centro */}
            <div className="absolute bottom-0 left-72 flex flex-col items-center">
              {/* Árbol 7 */}
              <div className="relative w-20 h-22">
                <div className="w-full h-full bg-green-600 rounded-full absolute top-0"></div>
                <div className="w-full h-full bg-green-700 rounded-full absolute left-2 bottom-8"></div>
                <div className="w-full h-full bg-green-500 rounded-full absolute right-2 bottom-8"></div>
                <div className="w-full h-full bg-green-600 rounded-full absolute bottom-12"></div>
              </div>
              <div className="w-6 h-12 bg-amber-600 mt-[-1rem]"></div>
            </div>

            {/* Árbol 8 - derecha */}
            <div className="absolute bottom-0 right-120 flex flex-col items-center">
              <div className="relative w-18 h-18">
                <div className="w-full h-full bg-green-500 rounded-full absolute top-0"></div>
                <div className="w-full h-full bg-green-600 rounded-full absolute left-2 bottom-6"></div>
                <div className="w-full h-full bg-green-400 rounded-full absolute right-1 bottom-6"></div>
                <div className="w-full h-full bg-green-500 rounded-full absolute bottom-10"></div>
              </div>
              <div className="w-5 h-12 bg-amber-500 mt-[-1rem]"></div>
            </div>

            {/* Árbol 9 */}
            <div className="absolute bottom-0 right-140 flex flex-col items-center">
              <div className="relative w-20 h-22">
                <div className="w-full h-full bg-green-700 rounded-full absolute top-0"></div>
                <div className="w-full h-full bg-green-600 rounded-full absolute left-3 bottom-8"></div>
                <div className="w-full h-full bg-green-500 rounded-full absolute right-2 bottom-8"></div>
                <div className="w-full h-full bg-green-700 rounded-full absolute bottom-12"></div>
              </div>
              <div className="w-6 h-14 bg-amber-500 mt-[-1rem]"></div>
            </div>

            {/* Árbol 10 */}
            <div className="absolute bottom-0 right-150 flex flex-col items-center">
              <div className="relative w-16 h-18">
                <div className="w-full h-full bg-green-400 rounded-full absolute top-0"></div>
                <div className="w-full h-full bg-green-500 rounded-full absolute left-2 bottom-6"></div>
                <div className="w-full h-full bg-green-600 rounded-full absolute right-1 bottom-6"></div>
                <div className="w-full h-full bg-green-400 rounded-full absolute bottom-10"></div>
              </div>
              <div className="w-5 h-12 bg-amber-600 mt-[-1rem]"></div>
            </div>

            {/* Árbol 11 - derecha */}
            <div className="absolute bottom-0 left-100 flex flex-col items-center">
              <div className="relative w-18 h-18">
                <div className="w-full h-full bg-green-500 rounded-full absolute top-0"></div>
                <div className="w-full h-full bg-green-600 rounded-full absolute left-2 bottom-6"></div>
                <div className="w-full h-full bg-green-400 rounded-full absolute right-1 bottom-6"></div>
                <div className="w-full h-full bg-green-500 rounded-full absolute bottom-10"></div>
              </div>
              <div className="w-5 h-12 bg-amber-500 mt-[-1rem]"></div>
            </div>

            {/* Árbol 12 */}
            <div className="absolute bottom-0 left-120 flex flex-col items-center">
              <div className="relative w-20 h-22">
                <div className="w-full h-full bg-green-700 rounded-full absolute top-0"></div>
                <div className="w-full h-full bg-green-600 rounded-full absolute left-3 bottom-8"></div>
                <div className="w-full h-full bg-green-500 rounded-full absolute right-2 bottom-8"></div>
                <div className="w-full h-full bg-green-700 rounded-full absolute bottom-12"></div>
              </div>
              <div className="w-6 h-14 bg-amber-500 mt-[-1rem]"></div>
            </div>

            {/* Árbol 13 */}
            <div className="absolute bottom-0 left-130 flex flex-col items-center">
              <div className="relative w-16 h-18">
                <div className="w-full h-full bg-green-400 rounded-full absolute top-0"></div>
                <div className="w-full h-full bg-green-500 rounded-full absolute left-2 bottom-6"></div>
                <div className="w-full h-full bg-green-600 rounded-full absolute right-1 bottom-6"></div>
                <div className="w-full h-full bg-green-400 rounded-full absolute bottom-10"></div>
              </div>
              <div className="w-5 h-12 bg-amber-600 mt-[-1rem]"></div>
            </div>
          </div>

          {/* Panel 3 */}
          <div className="panel flex-shrink-0 w-screen h-screen flex items-center justify-center bg-yellow-100">
            <div className="text-center p-8">
              <h2 className="text-8xl font-bold mb-4">
                {renderFrase(frasePanel3)}
              </h2>
            </div>
          </div>

          {/* Panel 4 */}
          <div className="panel flex-shrink-0 w-screen h-screen flex items-center justify-center bg-red-100">
            <div className="text-center p-8">
              <h2 className="text-8xl font-bold mb-4">
                {renderFrase(frasePanel4)}
              </h2>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
