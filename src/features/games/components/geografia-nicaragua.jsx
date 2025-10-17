"use client"

import { useState } from "react"
import { Map, CheckCircle, XCircle, Trophy } from "lucide-react"

const preguntas = [
  {
    pregunta: "¿Cuál es la capital de Nicaragua?",
    opciones: ["Granada", "León", "Managua", "Masaya"],
    respuestaCorrecta: 2,
  },
  {
    pregunta: "¿Cuál es el lago más grande de Nicaragua?",
    opciones: ["Lago de Managua", "Lago de Nicaragua", "Laguna de Apoyo", "Laguna de Tiscapa"],
    respuestaCorrecta: 1,
  },
  {
    pregunta: "¿Cuántos departamentos tiene Nicaragua?",
    opciones: ["15", "17", "19", "21"],
    respuestaCorrecta: 0,
  },
  {
    pregunta: "¿Qué volcán está ubicado en la isla de Ometepe?",
    opciones: ["Momotombo", "Masaya", "Concepción", "San Cristóbal"],
    respuestaCorrecta: 2,
  },
  {
    pregunta: "¿Cuál es el río más largo de Nicaragua?",
    opciones: ["Río San Juan", "Río Coco", "Río Grande de Matagalpa", "Río Escondido"],
    respuestaCorrecta: 1,
  },
  {
    pregunta: "¿En qué departamento se encuentra la ciudad de Granada?",
    opciones: ["Managua", "Granada", "Masaya", "Rivas"],
    respuestaCorrecta: 1,
  },
  {
    pregunta: "¿Qué océano baña las costas del Pacífico de Nicaragua?",
    opciones: ["Océano Atlántico", "Océano Pacífico", "Mar Caribe", "Golfo de México"],
    respuestaCorrecta: 1,
  },
  {
    pregunta: "¿Cuál es la ciudad colonial más antigua de Nicaragua?",
    opciones: ["Managua", "Granada", "León", "Masaya"],
    respuestaCorrecta: 1,
  },
]

export default function GeografiaNicaragua() {
  const [preguntaActual, setPreguntaActual] = useState(0)
  const [puntuacion, setPuntuacion] = useState(0)
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null)
  const [mostrarResultado, setMostrarResultado] = useState(false)
  const [juegoTerminado, setJuegoTerminado] = useState(false)
  const [respuestasCorrectas, setRespuestasCorrectas] = useState([])

  const handleRespuesta = (indice) => {
    if (respuestaSeleccionada !== null) return

    setRespuestaSeleccionada(indice)
    setMostrarResultado(true)

    const esCorrecta = indice === preguntas[preguntaActual].respuestaCorrecta
    setRespuestasCorrectas([...respuestasCorrectas, esCorrecta])

    if (esCorrecta) {
      setPuntuacion(puntuacion + 1)
    }
  }

  const siguientePregunta = () => {
    if (preguntaActual < preguntas.length - 1) {
      setPreguntaActual(preguntaActual + 1)
      setRespuestaSeleccionada(null)
      setMostrarResultado(false)
    } else {
      setJuegoTerminado(true)
    }
  }

  const reiniciarJuego = () => {
    setPreguntaActual(0)
    setPuntuacion(0)
    setRespuestaSeleccionada(null)
    setMostrarResultado(false)
    setJuegoTerminado(false)
    setRespuestasCorrectas([])
  }

  if (juegoTerminado) {
    const porcentaje = (puntuacion / preguntas.length) * 100
    let mensaje = ""
    if (porcentaje === 100) mensaje = "¡Perfecto! Eres un experto en geografía nicaragüense"
    else if (porcentaje >= 75) mensaje = "¡Excelente! Conoces muy bien Nicaragua"
    else if (porcentaje >= 50) mensaje = "¡Bien! Pero puedes mejorar"
    else mensaje = "Sigue aprendiendo sobre Nicaragua"

    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-2">¡Juego Completado!</h2>
        <p className="text-lg text-gray-600 mb-6">{mensaje}</p>
        <p className="text-xl mb-6">
          Tu puntuación: <span className="font-bold text-blue-600">{puntuacion}</span> de {preguntas.length}
        </p>
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-blue-600 h-4 rounded-full transition-all" style={{ width: `${porcentaje}%` }} />
          </div>
          <p className="text-sm text-gray-600 mt-2">{porcentaje.toFixed(0)}% correcto</p>
        </div>
        <button
          onClick={reiniciarJuego}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700"
        >
          Jugar de nuevo
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Map className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Geografía Nicaragüense</h1>
              <p className="text-gray-600">
                Pregunta {preguntaActual + 1} de {preguntas.length}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Puntuación</p>
            <p className="text-2xl font-bold text-green-600">{puntuacion}</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-green-600 h-2 rounded-full transition-all"
              style={{ width: `${((preguntaActual + 1) / preguntas.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6">{preguntas[preguntaActual].pregunta}</h2>
          <div className="space-y-3">
            {preguntas[preguntaActual].opciones.map((opcion, indice) => {
              const esCorrecta = indice === preguntas[preguntaActual].respuestaCorrecta
              const esSeleccionada = indice === respuestaSeleccionada

              let claseBoton = "w-full text-left p-4 rounded-lg border-2 transition-all "

              if (!mostrarResultado) {
                claseBoton += "border-gray-200 hover:border-green-400 hover:bg-green-50"
              } else {
                if (esSeleccionada && esCorrecta) {
                  claseBoton += "border-green-500 bg-green-50"
                } else if (esSeleccionada && !esCorrecta) {
                  claseBoton += "border-red-500 bg-red-50"
                } else if (esCorrecta) {
                  claseBoton += "border-green-500 bg-green-50"
                } else {
                  claseBoton += "border-gray-200 opacity-50"
                }
              }

              return (
                <button
                  key={indice}
                  onClick={() => handleRespuesta(indice)}
                  disabled={respuestaSeleccionada !== null}
                  className={claseBoton}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{opcion}</span>
                    {mostrarResultado && esSeleccionada && esCorrecta && (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    )}
                    {mostrarResultado && esSeleccionada && !esCorrecta && <XCircle className="w-6 h-6 text-red-600" />}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {mostrarResultado && (
          <button
            onClick={siguientePregunta}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700"
          >
            {preguntaActual < preguntas.length - 1 ? "Siguiente pregunta" : "Ver resultados"}
          </button>
        )}
      </div>
    </div>
  )
}
