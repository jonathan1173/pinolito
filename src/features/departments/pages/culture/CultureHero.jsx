import { Palette, Bookmark, Share2 } from "lucide-react";

export default function CultureHero({ item }) {
  return (
    <div className="relative h-96 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={item.imagen_url}
          alt={item.nombre}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      </div>

      <div className="relative h-full flex items-end">
        <div className="container mx-auto px-4 pb-8">
          <div className="max-w-4xl">
            <span className="inline-flex text-white items-center px-3 py-1 text-sm bg-primary/20 text-primary  rounded">
              <Palette className="w-3 h-3 mr-1 text-white" />
              Tradición Cultural
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {item.nombre}
            </h1>
            <div className="flex items-center gap-4 text-white/80">
              <button className="flex items-center px-3 py-1 text-sm bg-white/20 border border-white/30 rounded hover:bg-white/30">
                <Bookmark className="w-4 h-4 mr-2" />
                Guardar
              </button>
              <button className="flex items-center px-3 py-1 text-sm text-white rounded hover:bg-white/20">
                <Share2 className="w-4 h-4 mr-2" />
                Compartir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
