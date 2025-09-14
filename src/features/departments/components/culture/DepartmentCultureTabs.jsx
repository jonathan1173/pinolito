import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HistorySection from "./HistorySection";
import GastronomySection from "./GastronomySection";
import TraditionsSection from "./TraditionsSection";
import TourismSection from "./TourismSection";
import SocietySection from "./SocietySection";

export default function DepartmentCultureTabs({ departamentoId }) {
  const [activeTab, setActiveTab] = useState("history");

  const tabs = [
    { id: "history", label: "Historia" },
    { id: "gastronomy", label: "Gastronomía" },
    { id: "traditions", label: "Tradiciones" },
    { id: "tourism", label: "Turismo" },
    { id: "society", label: "Sociedad" },
  ];

  const renderTab = () => {
    switch (activeTab) {
      case "history":
        return <HistorySection departamentoId={departamentoId} />;
      case "gastronomy":
        return <GastronomySection departamentoId={departamentoId} />;
      case "traditions":
        return <TraditionsSection departamentoId={departamentoId} />;
      case "tourism":
        return <TourismSection departamentoId={departamentoId} />;
      case "society":
        return <SocietySection departamentoId={departamentoId} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {/* Tabs adaptables a mobile */}
      <div className="relative flex md:justify-center overflow-x-auto border-b mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 px-4 py-2 whitespace-nowrap relative z-10 font-medium ${
              activeTab === tab.id ? "text-blue-600" : "text-gray-600"
            }`}
          >
            {tab.label}
            {/* Indicador animado */}
            {activeTab === tab.id && (
              <motion.span
                layoutId="underline"
                className="absolute left-0 bottom-0 w-full h-1 bg-blue-600 rounded-t"
              />
            )}
          </button>
        ))}
      </div>

      {/* Contenido animado */}
      <div className="px-4 md:px-10 mb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderTab()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
    