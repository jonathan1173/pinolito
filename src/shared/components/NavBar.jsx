import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Calendar, Gamepad2, Menu, X, Users } from "lucide-react";
import { supabase } from "../../services/supabaseClient";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const links = [
    { href: "/", label: "Inicio", icon: <Home size={18} /> },
    { href: "/department", label: "Departamentos", icon: <Calendar size={18} /> },
    { href: "/games", label: "Juegos", icon: <Gamepad2 size={18} /> },
    { href: "/community", label: "comunidad", icon: <Users size={18} /> },
  ];

  // ===============================
  // Obtener usuario logueado
  // ===============================
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    fetchUser();

    // Suscribirse a cambios de sesión
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // ===============================
  // Logout
  // ===============================
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/"); // redirige al inicio
  };

  const NavbarLink = ({ href, icon, label, onClick }) => (
    <Link
      to={href}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-stone-600 rounded-lg transition-all hover:text-blue-700 hover:bg-blue-50 active:bg-blue-100"
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

        <div className="pt-2 mt-2 border-t border-stone-200 space-y-2">
          {!user ? (
            <>
              <Link
                to="/login"
                className="block px-4 py-2 text-stone-600 rounded-lg hover:text-blue-700 hover:bg-blue-50"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 text-stone-600 rounded-lg hover:text-blue-700 hover:bg-blue-50"
                onClick={() => setOpen(false)}
              >
                Registro
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="block px-4 py-2 text-stone-600 rounded-lg hover:text-blue-700 hover:bg-blue-50"
                onClick={() => setOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-stone-600 rounded-lg hover:text-blue-700 hover:bg-blue-50"
              >
                Logout
              </button>
            </>
          )}
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
              <NavbarLink key={link.href} href={link.href} icon={link.icon} label={link.label} />
            ))}
          </div>

          <div className="flex items-center space-x-3">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="hidden sm:flex items-center gap-2 px-3 py-1 text-stone-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="hidden sm:flex items-center gap-2 px-3 py-1 text-stone-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
                >
                  Registro
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="hidden sm:flex items-center gap-2 px-3 py-1 text-stone-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="hidden sm:flex items-center gap-2 px-3 py-1 text-stone-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
                >
                  Logout
                </button>
              </>
            )}

            {/* Botón hamburguesa para móvil */}
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
