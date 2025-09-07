import { motion } from "framer-motion";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Trees from "./Trees";

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

  const frasePanel1 = "";
  const frasePanel2 = "Si pequeña es la Patria,";
  const frasePanel3 = "uno grande la sueña";
  const frasePanel4 = "";

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
            < Trees/>
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
