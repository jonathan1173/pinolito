import { Eye } from "lucide-react";

export default function Vision() {
  return (
    <section className="w-full min-h-[100vh] bg-gradient-to-r from-indigo-600 to-purple-600 flex flex-col items-center justify-center py-16 px-4">
      <article className="bg-white/90 border border-gray-200 rounded-2xl flex flex-col items-center justify-center max-w-3xl p-8 shadow-lg text-center">
        <div className="p-4 bg-indigo-600 rounded-full mb-6 text-white">
          <Eye size={32} />
        </div>
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Nuestra Visión</h2>
        <p className="text-gray-800 text-lg">
          Ser un referente en la promoción y preservación de la cultura nicaragüense, 
          impulsando la música, la danza, la gastronomía y las tradiciones locales 
          mediante experiencias auténticas y sostenibles.
        </p>
      </article>
    </section>
  );
}
