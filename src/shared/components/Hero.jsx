export default function Hero({ title, paragraph, ctaText, ctaLink, Icon }) {
  return (
    <section className="flex flex-col justify-center items-center bg-gradient-to-br from-blue-200 via-white to-yellow-200 relative w-full overflow-hidden min-h-[30vh]  pt-12 sm:pt-16 pb-8">
      {/* Patrón de fondo */}
      <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-10"></div>

      <div className="relative max-w-3xl sm:max-w-4xl lg:max-w-5xl w-full text-center px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 drop-shadow-lg leading-tight sm:leading-tight lg:leading-snug">
          {title}
        </h1>

        {/* Párrafo */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mt-4 sm:mt-6">
          {paragraph}
        </p>

        {/* Botón */}
        {ctaText && ctaLink && (
          <a
            href={ctaLink}
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition mt-6 sm:mt-8"
          >
            {Icon && <Icon className="w-4 sm:w-5 h-4 sm:h-5" />}
            {ctaText}
          </a>
        )}
      </div>
    </section>
  );
}
