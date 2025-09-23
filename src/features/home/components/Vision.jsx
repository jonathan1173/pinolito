import { Eye } from "lucide-react";

export default function Vision() {
  return (
    <section className="w-full min-h-[100vh] bg-gradient-to-t from-indigo-600 to-white flex flex-col items-center justify-center py-16 px-4">
      <article className="bg-white/90 border border-gray-200 rounded-2xl flex flex-col items-center justify-center max-w-3xl p-8 shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">
          Titulo de Seccion
        </h2>
        <p className="text-gray-800 text-lg">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti rem
          quod et, quibusdam deleniti minima excepturi sapiente error ipsum
          veritatis reprehenderit consequuntur repudiandae minus quos repellat,
          harum voluptas doloremque a?
        </p>
      </article>
    </section>
  );
}
