"use client";
import { Link } from "react-router-dom";
import { Home, Calendar, Gamepad2 } from "lucide-react";

export function Navbar() {
  return (
    <nav className="h-[10vh] bg-black text-white px-6 py-4 flex justify-between items-center  z-30 w-full">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold">
        Pinolito
      </Link>

      {/* Links */}
      <div className="space-x-6 hidden md:flex">
        <Link
          to="/"
          className="flex items-center gap-1 hover:text-yellow-500 transition"
        >
          <Home size={18} /> Inicio
        </Link>

        <Link
          to="/activity"
          className="flex items-center gap-1 hover:text-yellow-500 transition"
        >
          <Calendar size={18} /> Actividades
        </Link>

        <Link
          to="/games"
          className="flex items-center gap-1 hover:text-yellow-500 transition"
        >
          <Gamepad2 size={18} /> Juegos
        </Link>
      </div>
    </nav>
  );
}
