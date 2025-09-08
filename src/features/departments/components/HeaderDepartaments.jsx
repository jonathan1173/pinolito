import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function HeaderDepartements({ department }) {
  return (
    <section className="relative">
      <img
        src={department.imagen}
        alt={department.nombre}
        className="w-full h-64 md:h-80 object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <Link
            to="/department"
            className="flex items-center mb-6 px-4 py-2 bg-white/90 rounded-md shadow hover:bg-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Volver a Ciudades
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {department.nombre}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">{department.descripcion}</p>
        </div>
      </div>
    </section>
  );
}
