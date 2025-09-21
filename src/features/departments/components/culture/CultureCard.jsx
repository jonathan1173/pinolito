import { Link } from "react-router-dom";

export default function CultureCard({ titulo, imagen_url, departmentSlug, slug, categoria }) {
  return (
    <div className="border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition p-4 bg-gray-50 flex flex-col">
      {imagen_url && (
        <div className="w-full h-50 mb-4 overflow-hidden rounded-md bg-gray-200">
          <img src={imagen_url} alt={titulo} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{titulo}</h3>
        {slug && departmentSlug && categoria && (
          <Link
            to={`/department/${departmentSlug}/${categoria}/${slug}`}
            className="self-start px-3 py-1 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition text-sm"
          >
            Ver más
          </Link>
        )}
      </div>
    </div>
  );
}
