"use client"

import { useState, useEffect } from "react"
import { Brain, Trophy, RotateCcw } from "lucide-react"

const elementos = [
  { id: 1, nombre: "🎭", tipo: "Máscaras" },
  { id: 2, nombre: "🎸", tipo: "Guitarra" },
  { id: 3, nombre: "🌽", tipo: "Maíz" },
  { id: 4, nombre: "🎨", tipo: "Artesanía" },
  { id: 5, nombre: "🥘", tipo: "Gallo Pinto" },
  { id: 6, nombre: "🪘", tipo: "Tambor" },
  { id: 7, nombre: "🏺", tipo: "Cerámica" },
  { id: 8, nombre: "🌮", tipo: "Nacatamal" },
]

export default function MemoriaCultural() {
  const [cartas, setCartas] = useState([])
  const [cartasSeleccionadas, setCartasSeleccionadas] = useState([])
  const [movimientos, setMovimientos] = useState(0)
  const [parejasEncontradas, setParejasEncontradas] = useState(0)
  const [juegoTerminado, setJuegoTerminado] = useState(false)

  useEffect(() => {
    inicializarJuego()
  }, [])

  const inicializarJuego = () => {
    const cartasDuplicadas = [...elementos, ...elementos]
      .sort(() => Math.random() - 0.5)
      .map((elemento, index) => ({
        id: index,
        contenido: elemento.nombre,
        tipo: elemento.tipo,
        volteada: false,
        emparejada: false,
      }))
    setCartas(cartasDuplicadas)
    setCartasSeleccionadas([])
    setMovimientos(0)
    setParejasEncontradas(0)
    setJuegoTerminado(false)
  }

  const handleClickCarta = (id) => {
    if (cartasSeleccionadas.length === 2) return
    if (cartas[id].volteada || cartas[id].emparejada) return

    const nuevasCartas = [...cartas]
    nuevasCartas[id].volteada = true
    setCartas(nuevasCartas)

    const nuevasSeleccionadas = [...cartasSeleccionadas, id]
    setCartasSeleccionadas(nuevasSeleccionadas)

    if (nuevasSeleccionadas.length === 2) {
      setMovimientos(movimientos + 1)
      verificarPareja(nuevasSeleccionadas)
    }
  }

  const verificarPareja = (seleccionadas) => {
    const [primera, segunda] = seleccionadas
    const carta1 = cartas[primera]
    const carta2 = cartas[segunda]

    if (carta1.tipo === carta2.tipo) {
      setTimeout(() => {
        const nuevasCartas = [...cartas]
        nuevasCartas[primera].emparejada = true
        nuevasCartas[segunda].emparejada = true
        setCartas(nuevasCartas)
        setCartasSeleccionadas([])

        const nuevasParejasEncontradas = parejasEncontradas + 1
        setParejasEncontradas(nuevasParejasEncontradas)

        if (nuevasParejasEncontradas === elementos.length) {
          setJuegoTerminado(true)
        }
      }, 500)
    } else {
      setTimeout(() => {
        const nuevasCartas = [...cartas]
        nuevasCartas[primera].volteada = false
        nuevasCartas[segunda].volteada = false
        setCartas(nuevasCartas)
        setCartasSeleccionadas([])
      }, 1000)
    }
  }

  if (juegoTerminado) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">¡Felicidades!</h2>
        <p className="text-xl mb-6">
          Completaste el juego en <span className="font-bold text-blue-600">{movimientos}</span> movimientos
        </p>
        <button
          onClick={inicializarJuego}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2 mx-auto"
        >
          <RotateCcw className="w-5 h-5" />
          Jugar de nuevo
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Memoria Cultural</h1>
              <p className="text-gray-600">Encuentra las parejas</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">Movimientos</p>
              <p className="text-2xl font-bold text-blue-600">{movimientos}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Parejas</p>
              <p className="text-2xl font-bold text-green-600">
                {parejasEncontradas}/{elementos.length}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {cartas.map((carta) => (
            <button
              key={carta.id}
              onClick={() => handleClickCarta(carta.id)}
              disabled={carta.volteada || carta.emparejada}
              className={`aspect-square rounded-lg text-4xl font-bold transition-all transform hover:scale-105 ${
                carta.volteada || carta.emparejada
                  ? "bg-blue-100 border-2 border-blue-400"
                  : "bg-gray-200 border-2 border-gray-300 hover:bg-gray-300"
              } ${carta.emparejada ? "opacity-50" : ""}`}
            >
              {carta.volteada || carta.emparejada ? carta.contenido : "?"}
            </button>
          ))}
        </div>

        <button
          onClick={inicializarJuego}
          className="mt-6 w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Reiniciar juego
        </button>
      </div>
    </div>
  )
}
