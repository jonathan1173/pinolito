import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Calendar, Gamepad2, Menu, X, User, Users } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Inicio", icon: <Home size={18} /> },
    {
      href: "/department",
      label: "Departamentos",
      icon: <Calendar size={18} />,
    },
    { href: "/games", label: "Juegos", icon: <Gamepad2 size={18} /> },
    { href: "/comunidad", label: "Comunidad", icon: <Users size={18} /> },
  ];

  const NavbarLink = ({ href, icon, label, onClick }) => (
    <Link
      to={href}
      className="z-50 flex items-center gap-2 px-4 py-2 text-sm font-medium text-stone-600 rounded-lg transition-all hover:text-blue-700 hover:bg-blue-50 active:bg-blue-100"
      onClick={onClick}
    >
      <span className="text-stone-500">{icon}</span>
      {label}
    </Link>
  );

  const MobileMenu = () => (
    <div className="lg:hidden border-t border-stone-200 bg-white">
      <div className="container mx-auto px-4 py-4 space-y-2">
        {links.map((link) => (
          <NavbarLink
            key={link.href}
            href={link.href}
            icon={link.icon}
            label={link.label}
            onClick={() => setOpen(false)}
          />
        ))}
        <div className="pt-2 mt-2 border-t border-stone-200">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-base font-medium text-stone-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg">
            <User size={18} />
            Usuario
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-1 group h-full px-1 py-1"
          >
            <div className="flex h-6 items-center justify-center transition-transform">
              <img
                src="/Logo.png"
                alt="Logo"
                className="h-full w-auto object-cover"
              />
              <span className="ml-2 select-none">
                <b className="text-2xl ">PINOLITO</b>
              </span>
            </div>
          </Link>
{/* Links en desktop */}
          <div className="hidden lg:flex items-center space-x-1">
            {links.map((link) => (
              <NavbarLink
                key={link.href}
                href={link.href}
                icon={link.icon}
                label={link.label}
              />
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <button className="hidden sm:flex items-center gap-2 px-3 py-1 text-stone-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg">
              <User size={18} />
              <span className="text-sm">Usuario</span>
            </button>

            <button
              className="lg:hidden p-2 text-stone-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {open && <MobileMenu />}
    </nav>
  );
}
