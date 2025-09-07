// Arboles.jsx
import React from "react";

export default function Trees() {
  return (
    <>
      {/* Árbol 1 - izquierda */}
      <div className="absolute bottom-0 left-16 flex flex-col items-center">
        <div className="relative w-20 h-24">
          <div className="w-full h-full bg-green-600 rounded-full absolute top-0"></div>
          <div className="w-full h-full bg-green-500 rounded-full absolute left-3 bottom-8"></div>
          <div className="w-full h-full bg-green-700 rounded-full absolute right-2 bottom-10"></div>
          <div className="w-full h-full bg-green-600 rounded-full absolute bottom-14"></div>
        </div>
        <div className="w-6 h-14 bg-amber-500 mt-[-1rem]"></div>
      </div>

      {/* Árbol 2 - izquierda */}
      <div className="absolute bottom-0 left-0 flex flex-col items-center">
        <div className="relative w-18 h-20">
          <div className="w-full h-full bg-green-500 rounded-full absolute top-0"></div>
          <div className="w-full h-full bg-green-600 rounded-full absolute left-2 bottom-6"></div>
          <div className="w-full h-full bg-green-400 rounded-full absolute right-1 bottom-6"></div>
          <div className="w-full h-full bg-green-500 rounded-full absolute bottom-10"></div>
        </div>
        <div className="w-5 h-12 bg-amber-600 mt-[-1rem]"></div>
      </div>

      {/* Árbol 3 - centro izquierdo */}
      <div className="absolute bottom-0 left-48 flex flex-col items-center">
        <div className="relative w-16 h-18">
          <div className="w-full h-full bg-green-700 rounded-full absolute top-0"></div>
          <div className="w-full h-full bg-green-600 rounded-full absolute left-2 bottom-6"></div>
          <div className="w-full h-full bg-green-500 rounded-full absolute right-1 bottom-6"></div>
          <div className="w-full h-full bg-green-700 rounded-full absolute bottom-10"></div>
        </div>
        <div className="w-5 h-10 bg-amber-500 mt-[-1rem]"></div>
      </div>

      {/* Árbol 4 - centro derecho */}
      <div className="absolute bottom-0 right-48 flex flex-col items-center">
        <div className="relative w-18 h-20">
          <div className="w-full h-full bg-green-400 rounded-full absolute top-0"></div>
          <div className="w-full h-full bg-green-500 rounded-full absolute left-3 bottom-8"></div>
          <div className="w-full h-full bg-green-600 rounded-full absolute right-2 bottom-8"></div>
          <div className="w-full h-full bg-green-400 rounded-full absolute bottom-12"></div>
        </div>
        <div className="w-5 h-12 bg-amber-600 mt-[-1rem]"></div>
      </div>

      {/* Árbol 5 - derecha */}
      <div className="absolute bottom-0 right-16 flex flex-col items-center">
        <div className="relative w-22 h-24">
          <div className="w-full h-full bg-green-700 rounded-full absolute top-0"></div>
          <div className="w-full h-full bg-green-600 rounded-full absolute left-4 bottom-10"></div>
          <div className="w-full h-full bg-green-500 rounded-full absolute right-3 bottom-10"></div>
          <div className="w-full h-full bg-green-700 rounded-full absolute bottom-16"></div>
        </div>
        <div className="w-7 h-14 bg-amber-500 mt-[-1rem]"></div>
      </div>

      {/* Árbol 6 - derecha fondo */}
      <div className="absolute bottom-0 right-80 flex flex-col items-center">
        <div className="relative w-14 h-16">
          <div className="w-full h-full bg-green-500 rounded-full absolute top-0"></div>
          <div className="w-full h-full bg-green-400 rounded-full absolute left-1 bottom-4"></div>
          <div className="w-full h-full bg-green-600 rounded-full absolute right-1 bottom-4"></div>
          <div className="w-full h-full bg-green-500 rounded-full absolute bottom-6"></div>
        </div>
        <div className="w-4 h-10 bg-amber-500 mt-[-1rem]"></div>
      </div>

      {/* Árbol 7 - centro */}
      <div className="absolute bottom-0 left-72 flex flex-col items-center">
        <div className="relative w-20 h-22">
          <div className="w-full h-full bg-green-600 rounded-full absolute top-0"></div>
          <div className="w-full h-full bg-green-700 rounded-full absolute left-2 bottom-8"></div>
          <div className="w-full h-full bg-green-500 rounded-full absolute right-2 bottom-8"></div>
          <div className="w-full h-full bg-green-600 rounded-full absolute bottom-12"></div>
        </div>
        <div className="w-6 h-12 bg-amber-600 mt-[-1rem]"></div>
      </div>

      {/* Árbol 8 */}
      <div className="absolute bottom-0 right-120 flex flex-col items-center">
        <div className="relative w-18 h-18">
          <div className="w-full h-full bg-green-500 rounded-full absolute top-0"></div>
          <div className="w-full h-full bg-green-600 rounded-full absolute left-2 bottom-6"></div>
          <div className="w-full h-full bg-green-400 rounded-full absolute right-1 bottom-6"></div>
          <div className="w-full h-full bg-green-500 rounded-full absolute bottom-10"></div>
        </div>
        <div className="w-5 h-12 bg-amber-500 mt-[-1rem]"></div>
      </div>

      {/* Árbol 9 */}
      <div className="absolute bottom-0 right-140 flex flex-col items-center">
        <div className="relative w-20 h-22">
          <div className="w-full h-full bg-green-700 rounded-full absolute top-0"></div>
          <div className="w-full h-full bg-green-600 rounded-full absolute left-3 bottom-8"></div>
          <div className="w-full h-full bg-green-500 rounded-full absolute right-2 bottom-8"></div>
          <div className="w-full h-full bg-green-700 rounded-full absolute bottom-12"></div>
        </div>
        <div className="w-6 h-14 bg-amber-500 mt-[-1rem]"></div>
      </div>

      {/* Árbol 10 */}
      <div className="absolute bottom-0 right-150 flex flex-col items-center">
        <div className="relative w-16 h-18">
          <div className="w-full h-full bg-green-400 rounded-full absolute top-0"></div>
          <div className="w-full h-full bg-green-500 rounded-full absolute left-2 bottom-6"></div>
          <div className="w-full h-full bg-green-600 rounded-full absolute right-1 bottom-6"></div>
          <div className="w-full h-full bg-green-400 rounded-full absolute bottom-10"></div>
        </div>
        <div className="w-5 h-12 bg-amber-600 mt-[-1rem]"></div>
      </div>

      {/* Árbol 11 */}
      <div className="absolute bottom-0 left-100 flex flex-col items-center">
        <div className="relative w-18 h-18">
          <div className="w-full h-full bg-green-500 rounded-full absolute top-0"></div>
          <div className="w-full h-full bg-green-600 rounded-full absolute left-2 bottom-6"></div>
          <div className="w-full h-full bg-green-400 rounded-full absolute right-1 bottom-6"></div>
          <div className="w-full h-full bg-green-500 rounded-full absolute bottom-10"></div>
        </div>
        <div className="w-5 h-12 bg-amber-500 mt-[-1rem]"></div>
      </div>

      {/* Árbol 12 */}
      <div className="absolute bottom-0 left-120 flex flex-col items-center">
        <div className="relative w-20 h-22">
          <div className="w-full h-full bg-green-700 rounded-full absolute top-0"></div>
          <div className="w-full h-full bg-green-600 rounded-full absolute left-3 bottom-8"></div>
          <div className="w-full h-full bg-green-500 rounded-full absolute right-2 bottom-8"></div>
          <div className="w-full h-full bg-green-700 rounded-full absolute bottom-12"></div>
        </div>
        <div className="w-6 h-14 bg-amber-500 mt-[-1rem]"></div>
      </div>

      {/* Árbol 13 */}
      <div className="absolute bottom-0 left-130 flex flex-col items-center">
        <div className="relative w-16 h-18">
          <div className="w-full h-full bg-green-400 rounded-full absolute top-0"></div>
          <div className="w-full h-full bg-green-500 rounded-full absolute left-2 bottom-6"></div>
          <div className="w-full h-full bg-green-600 rounded-full absolute right-1 bottom-6"></div>
          <div className="w-full h-full bg-green-400 rounded-full absolute bottom-10"></div>
        </div>
        <div className="w-5 h-12 bg-amber-600 mt-[-1rem]"></div>
      </div>
    </>
  );
}
