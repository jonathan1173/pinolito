// src/components/HeroSection.jsx
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative w-full py-12 flex flex-col lg:flex-row items-center overflow-hidden">
      {/* Texto a la izquierda */}
      <div className="z-40 w-full lg:w-1/2 px-6 lg:px-12 py-12 space-y-6 text-center lg:text-left">
        <h1 className="text-4xl lg:text-6xl font-bold">Sobre Nosotros</h1>
        <p className="text-base lg:text-lg text-gray-600 max-w-md mx-auto lg:mx-0">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores,
          perspiciatis praesentium velit incidunt, nisi deleniti et esse
          accusantium ab eaque excepturi deserunt vitae illo vero nostrum id,
          consectetur quidem natus.
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
          Call to Action
        </button>
      </div>

      {/* Imagen de fondo en mobile */}
      <div
        className="block lg:hidden w-full h-64 bg-cover bg-center  shadow-xl mt-6"
        style={{ backgroundImage: "url('/ometepe.jpg')" }}
      ></div>

      {/* Imágenes flotantes solo en desktop */}
      <div className="hidden lg:block relative w-full lg:w-1/2 lg:h-[500px]"> 
        {/* Imagen superior izquierda */}
        <figure className="absolute top-16 right-60 w-80 z-10">
          <motion.img
            src="/ometepe.jpg"
            alt="Isla Ometepe"
            loading="lazy"
            initial={{ opacity: 0, x: 150 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 60, damping: 18 }}
            viewport={{ once: true, amount: 0.4 }}
            className="rounded-xl shadow-xl w-full"
          />
        </figure>

        {/* Imagen inferior izquierda */}
        <figure className="absolute bottom-16 right-60 w-96 z-20">
          <motion.img
            src="/ometepe.jpg"
            alt="Vista de Ometepe"
            loading="lazy"
            initial={{ opacity: 0, x: 150 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 18,
              delay: 0.2,
            }}
            viewport={{ once: true, amount: 0.4 }}
            className="rounded-xl shadow-xl w-full"
          />
        </figure>

        {/* Imagen inferior derecha */}
        <figure className="absolute bottom-24 right-0 w-80 z-20">
          <motion.img
            src="/ometepe.jpg"
            alt="Paisaje de Ometepe"
            loading="lazy"
            initial={{ opacity: 0, x: 150 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 18,
              delay: 0.4,
            }}
            viewport={{ once: true, amount: 0.4 }}
            className="rounded-xl shadow-xl w-full"
          />
        </figure>

        {/* Imagen superior derecha */}
        <figure className="absolute top-24 right-16 w-72 z-30">
          <motion.img
            src="/ometepe.jpg"
            alt="Paisaje de Ometepe"
            loading="lazy"
            initial={{ opacity: 0, x: 150 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 18,
              delay: 0.6,
            }}
            viewport={{ once: true, amount: 0.4 }}
            className="rounded-xl shadow-xl w-full"
          />
        </figure>
      </div>
    </section>
  );
}
