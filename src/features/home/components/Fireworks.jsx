import { Fireworks } from "@fireworks-js/react";
import { useRef, useState } from "react";

export default function FireworksComponent({ style = {}, className = "" }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  const defaultStyle = {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    position: "fixed",
    background: "#0000", // fondo negro fijo
    ...style
  };

  return (
    <div className={className} style={{ display: isVisible ? "block" : "none" }}>
      <Fireworks
        ref={ref}
        style={defaultStyle}
        options={{
          acceleration: 1, // menos aceleración, fuego más lento
          friction: 0.99,    // menos fricción, partículas tardan más en detenerse
          gravity: 0.8,      // gravedad más baja
          particles: 50,     // un poco menos de partículas
          explosion: 1,      // explosión más pequeña para que tarde en desvanecerse
          trace: 3,          // efecto de rastro más largo
          opacity: 0.9,      // opacidad constante
          brightness: { min: 50, max: 70 },
          mouse: { click: true, move: false, max: 2 }
        }}
      />
      <button
        onClick={() => setIsVisible(!isVisible)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
          padding: "10px 15px",
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        {isVisible ? "Ocultar" : "Mostrar"} Fuegos
      </button>
    </div>
  );
}
