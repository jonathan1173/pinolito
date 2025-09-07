export default function Hero({ title, paragraph, ctaText, ctaLink, Icon }) {
  return (
    <section className="flex flex-col justify-center items-center bg-gradient-to-br from-blue-200 via-white to-yellow-200 relative w-full overflow-hidden min-h-[60vh] pt-16 pb-8">
      <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-10"></div>

      <div className="relative max-w-4xl w-full text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 drop-shadow-lg">
          {title}
        </h1>
        <p className="text-lg md:text-2xl text-gray-700 mt-4">
          {paragraph}
        </p>

        {ctaText && ctaLink && (
          <a
            href={ctaLink}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition mt-6"
          >
            {Icon && <Icon className="w-5 h-5" />}
            {ctaText}
          </a>
        )}
      </div>
    </section>
  );
}
