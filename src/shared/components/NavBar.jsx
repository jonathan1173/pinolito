"use client";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Calendar, Gamepad2, Menu, X } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Inicio", icon: <Home size={18} /> },
    { to: "/department", label: "Departamentos", icon: <Calendar size={18} /> },
    { to: "/games", label: "Juegos", icon: <Gamepad2 size={18} /> },
  ];

  return (
    <nav className="h-[10vh] bg-blue-500 text-white px-6 py-4 flex justify-between items-center` top-0 left-0 w-full z-50 shadow-md">
      {/* Logo */}
      <Link to="/" className="flex items-center text-2xl font-bold text-white">
        Pinolito
      </Link>

      {/* Links desktop */}
      <div className="hidden md:flex space-x-8">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="flex items-center gap-2 hover:text-yellow-500 transition"
          >
            {link.icon} {link.label}
          </Link>
        ))}
      </div>

      {/* Botón hamburguesa */}
      <button
        className="md:hidden text-white hover:text-yellow-500 transition"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Menú móvil */}
      {open && (
        <div className="z-30 absolute top-[10vh] left-0 w-full bg-blue-900 flex flex-col items-center space-y-6 py-6 md:hidden shadow-lg animate-slideDown">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center gap-2 text-lg hover:text-yellow-500 transition"
              onClick={() => setOpen(false)}
            >
              {link.icon} {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
