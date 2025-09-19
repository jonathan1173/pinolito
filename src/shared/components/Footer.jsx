import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-10 mt-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Redes Sociales */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Síguenos</h2>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="hover:text-blue-300">
              <Facebook size={24} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-400">
              <Instagram size={24} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-400">
              <Twitter size={24} />
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-red-600">
              <Youtube size={24} />
            </a>
          </div>
        </div>

        {/* Contacto */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Contacto</h2>
          <p className="text-sm">Managua, Nicaragua</p>
          <p className="text-sm">Tel: +505 1234 5678</p>
          <p className="text-sm">Email: ejemplo@correo.com</p>
        </div>
      </div>

      <div className="text-center text-xs text-gray-300 mt-8 border-t border-blue-700 pt-4">
        © {new Date().getFullYear()} Todos los derechos reservados.
      </div>
    </footer>
  );
}
  