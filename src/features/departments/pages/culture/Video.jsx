import React from "react";

export default function YouTubePlayer({ url }) {
  // Convierte URL normal de YouTube a embed
  const getEmbedUrl = (url) => {
    const regex = /(?:youtu\.be\/|youtube\.com\/watch\?v=)([\w-]+)/;
    const match = url.match(regex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const embedUrl = getEmbedUrl(url);

  if (!embedUrl) {
    return <p className="text-red-500 text-center">URL de YouTube no válida</p>;
  }

  return (
    <div className="w-full">
      <div className="relative" style={{ paddingTop: "56.25%" }}> {/* 16:9 */}
        <iframe
          src={embedUrl}
          title="Video de YouTube"
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
