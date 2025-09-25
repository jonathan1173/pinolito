import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function DepartementHero({ department }) {
  return (
    <section className="relative border-b-4 border-white">
      <img
        src={department.imagen_url}
        alt={department.nombre}
        className="w-full h-64 md:h-80 object-center object-cover bg-black/40"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <Link
            to="/department"
            className="flex items-center mb-6 px-4 py-2 bg-white rounded-md shadow "
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Volver a Ciudades
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {department.nombre}
          </h1>
          
        </div>
      </div>
    </section>
  );
}
