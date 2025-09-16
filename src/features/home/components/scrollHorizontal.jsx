import { motion } from "framer-motion";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Trees from "./Trees";
import FireworksComponent from "./Fireworks";

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
    <div ref={component} className="overflow-x-hidden bg-black">
      {/* Sección horizontal */}

      <section
        ref={slider}
        className="relative w-screen overflow-hidden hidden sm:hidden md:block"
      >
        <div className="flex h-screen ">
          {/* Panel 1 */}
          <div
            className="panel flex-shrink-0 w-screen h-screen flex items-center justify-center relative "
            style={{
              background:
                "linear-gradient(to right, #38bdfa 50%, #000000 100%)",
            }}
          >
            <div className="text-center p-8 z-10">
              <h2 className="text-8xl font-bold mb-4">
                {renderFrase(frasePanel1)}
              </h2>
            </div>
            <Trees />
            <img
              src="./ometepe.jpg"
              alt=""
              className="absolute h-40 top-10 left-20 rounded-2xl rotate-6 -z-10"
            />
            <img
              src="./iglesia.jpg"
              alt=""
              className="absolute h-80 top-20 left-90 rounded-2xl rotate-0 -z-10"
            />
            <img
              src="./paisaje nica.jpg"
              alt=""
              className="absolute h-40 top-50 left-30 rounded-2xl -rotate-2 -z-5"
            />

            <svg
              className="absolute -z-10 bottom-0 -right-10 w-[800px] h-84"
              viewBox="0 0 300 150"
              preserveAspectRatio="none"
            >
              <polygon points="10,150 70,50 130,150" fill="#374151" />
              <polygon points="60,150 140,0 220,150" fill="#4B5563" />
              <polygon points="160,150 210,60 260,150" fill="#1F2937" />
            </svg>
          </div>

          {/* Panel 2 */}
          <div className="panel flex-shrink-0 w-screen h-screen flex items-center justify-center bg-black relative">
            <div className="text-center p-8 z-10">
              <h2 className="text-8xl font-bold mb-4 text-blue-500">
                {renderFrase(frasePanel2)}
              </h2>
            </div>
            <FireworksComponent flickerEffect={true} className="my-fireworks" />

            <Trees />
          </div>

          {/* Panel 3 */}
          <div className="panel flex-shrink-0 w-screen h-screen flex items-center justify-center bg-black">
            <div className="text-center p-8">
              <h2 className="text-8xl font-bold mb-4 text-white">
                {renderFrase(frasePanel3)}
              </h2>
            </div>
            <FireworksComponent flickerEffect={true} className="my-fireworks" />

            <Trees />
          </div>

          {/* Panel 4 */}
          <div
            className="panel flex-shrink-0 w-screen h-screen flex items-center justify-center bg-red-100"
            style={{
              background: "linear-gradient(to left, #38bdfa 50%, #000000 100%)",
            }}
          >
            <div className="text-center p-8">
              <h2 className="text-8xl font-bold mb-4">
                {renderFrase(frasePanel4)}
              </h2>
            </div>
            <Trees />
            <svg
              className="absolute -z-10 bottom-0 left-150 h-84"
              viewBox="0 0 500 150"
              preserveAspectRatio="none"
            >
              {/* Montaña 1 - curva suave */}
              <path d="M0,150 Q50,80 120,150 T250,150" fill="#374151" />
              {/* Montaña 2 - curva más alta */}
              <path d="M100,150 Q200,40 300,150 T500,150" fill="#4B5563" />
              {/* Montaña 3 - curva pequeña */}
              <path d="M200,150 Q250,90 320,150 T500,150" fill="#1F2937" />
            </svg>

            <img
              src="./ometepe.jpg"
              alt=""
              className="absolute h-40 top-10 right-20 rounded-2xl rotate-6 -z-10"
            />
            <img
              src="./iglesia.jpg"
              alt=""
              className="absolute h-80 top-20 right-90 rounded-2xl rotate-0 -z-10"
            />
            <img
              src="./paisaje nica.jpg"
              alt=""
              className="absolute h-40 top-50 right-30 rounded-2xl -rotate-2 -z-10"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
