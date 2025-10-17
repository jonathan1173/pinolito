"use client"

import { useState } from "react"
import { BookOpen, CheckCircle, XCircle, Trophy } from "lucide-react"

const preguntas = [
  {
    pregunta: "¿En qué año Nicaragua obtuvo su independencia de España?",
    opciones: ["1821", "1810", "1838", "1856"],
    respuestaCorrecta: 0,
  },
  {
    pregunta: "¿Quién fue el héroe nacional que luchó contra los filibusteros?",
    opciones: ["Augusto César Sandino", "José Dolores Estrada", "Andrés Castro", "Todos los anteriores"],
    respuestaCorrecta: 3,
  },
  {
    pregunta: "¿En qué ciudad se firmó el acta de independencia de Centroamérica?",
    opciones: ["Managua", "Granada", "Guatemala", "León"],
    respuestaCorrecta: 2,
  },
  {
    pregunta: "¿Qué poeta nicaragüense es considerado el padre del modernismo?",
    opciones: ["Rubén Darío", "Alfonso Cortés", "Ernesto Cardenal", "Pablo Antonio Cuadra"],
    respuestaCorrecta: 0,
  },
  {
    pregunta: "¿En qué año fue la Revolución Sandinista?",
    opciones: ["1979", "1972", "1980", "1978"],
    respuestaCorrecta: 0,
  },
]

export default function TriviaHistorica() {
  const [preguntaActual, setPreguntaActual] = useState(0)
  const [puntuacion, setPuntuacion] = useState(0)
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null)
  const [mostrarResultado, setMostrarResultado] = useState(false)
  const [juegoTerminado, setJuegoTerminado] = useState(false)

  const handleRespuesta = (indice) => {
    if (respuestaSeleccionada !== null) return

    setRespuestaSeleccionada(indice)
    setMostrarResultado(true)

    if (indice === preguntas[preguntaActual].respuestaCorrecta) {
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
  }

  if (juegoTerminado) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">¡Juego Completado!</h2>
        <p className="text-xl mb-6">
          Tu puntuación: <span className="font-bold text-blue-600">{puntuacion}</span> de {preguntas.length}
        </p>
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-600 h-4 rounded-full transition-all"
              style={{ width: `${(puntuacion / preguntas.length) * 100}%` }}
            />
          </div>
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
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Trivia Histórica Nicaragua</h1>
              <p className="text-gray-600">
                Pregunta {preguntaActual + 1} de {preguntas.length}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Puntuación</p>
            <p className="text-2xl font-bold text-blue-600">{puntuacion}</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
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
                claseBoton += "border-gray-200 hover:border-blue-400 hover:bg-blue-50"
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
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
          >
            {preguntaActual < preguntas.length - 1 ? "Siguiente pregunta" : "Ver resultados"}
          </button>
        )}
      </div>
    </div>
  )
}
