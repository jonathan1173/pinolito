import { useState } from "react";
import { motion } from "framer-motion";
import CultureSection from "./CultureSection";

export default function DepartmentCultureTabs({
  departamentoId,
  departmentSlug,
}) {
  const [activeTab, setActiveTab] = useState("history");

  const tabs = [
    { id: "history", label: "Historia" },
    { id: "gastronomy", label: "Gastronomía" },
    { id: "traditions", label: "Tradiciones" },
    { id: "tourism", label: "Turismo" },
    { id: "society", label: "Sociedad" },
  ];

  const tabMapping = {
    history: "historia",
    gastronomy: "comida",
    traditions: "artes_y_tradiciones",
    tourism: "lugares",
    society: "gente_y_sociedad",
  };

  const categoriaActual = tabMapping[activeTab];

  return (
    <div className="w-full">
      <div className="relative flex md:justify-center overflow-x-auto border-b-2 border-white mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-t-2xl flex-shrink-0 px-4 py-2 whitespace-nowrap relative z-10 font-medium transition-colors duration-300 ${
              activeTab === tab.id ? "bg-[#2C2C2C] text-white" : "text-black"
            }`}
          >
            {tab.label}

            {activeTab === tab.id && (
              <motion.span
                layoutId="underline"
                className="absolute left-0 bottom-0 w-full h-1 bg-white rounded-t"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
      
      <div className="px-5 md:px-10 mb-4">
        <CultureSection
          departamentoId={departamentoId}
          departmentSlug={departmentSlug}
          tabla={categoriaActual} // aquí va la tabla/categoría
          categoria={categoriaActual} // pasamos la categoría a las tarjetas
        />
      </div>
    </div>
  );
}
