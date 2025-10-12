import { Link } from "react-router-dom";

export default function Hero({ title, paragraph, ctaText, ctaLink, Icon }) {
  return (
    <section className="relative flex flex-col justify-center items-center w-full overflow-hidden min-h-[30vh] pt-12 sm:pt-16 pb-8">
      {/* Gradiente azul en la esquina superior izquierda */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-300 via-transparent to-transparent"></div>
      {/* Gradiente amarillo en la esquina superior derecha */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-yellow-200 via-transparent to-transparent"></div>
      {/* Patrón de fondo */}
      <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-10"></div>

      <div className="relative max-w-3xl sm:max-w-4xl lg:max-w-5xl w-full text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 drop-shadow-lg leading-tight sm:leading-tight lg:leading-snug">
          {title}
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mt-4 sm:mt-6">
          {paragraph}
        </p>
        {ctaText && ctaLink && (
          <Link
            to={ctaLink}
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition mt-6 sm:mt-8"
          >
            {Icon && <Icon className="w-4 sm:w-5 h-4 sm:h-5" />}
            {ctaText}
          </Link>
        )}
      </div>
    </section>
  );
}
