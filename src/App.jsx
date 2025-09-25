import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./features/home";
import { GamePage } from "./features/games";
import {
  DepartmentsPage,
  DepartmentsDetails,
  CalendarPage,
} from "./features/departments";
import { MunicipalityPage } from "./features/departments/municipalities";

import { Navbar } from "./shared/components/NavBar";
import Footer from "./shared/components/Footer";

// cultura
import HistoriaDetail from "./features/departments/pages/culture/HistoriaDetail/HistoriaDetail";
import SociedadDetail from "./features/departments/pages/culture/SociedadDetail/SociedadDetail";
import TurismoDetail from "./features/departments/pages/culture/TurismoDetail/TurismoDetail";
import TradicionesDetail from "./features/departments/pages/culture/TradicionesDetail/TradicionesDetail";
import GastronomiaDetail from "./features/departments/pages/culture/GastronomiaDetail/GastronomiaDetail";

// hooks
import ScrollToTop from "./shared/hooks/ScrollToTop";

export default function App() {
  return (
    <Router>
      <>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/games" element={<GamePage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/department" element={<DepartmentsPage />} />
          {/* detalles de los departamentos  */}
          <Route path="/department/:ciudad" element={<DepartmentsDetails />} />

          {/* mostrar los municipios */}
          <Route
            path="/department/:departmentSlug/municipios/:municipioSlug"
            element={<MunicipalityPage />}
          />

          {/* detalles de la cultura  */}
          <Route
            path="/department/:departmentSlug/lugares/:slug"
            element={<TurismoDetail tabla="lugares" />}
          />

          <Route
            path="/department/:departmentSlug/historia/:slug"
            element={<HistoriaDetail tabla="historia" />}
          />
          <Route
            path="/department/:departmentSlug/comida/:slug"
            element={<GastronomiaDetail tabla="comida" />}
          />
          <Route
            path="/department/:departmentSlug/artes_y_tradiciones/:slug"
            element={<TradicionesDetail tabla="artes_y_tradiciones" />}
          />
          <Route
            path="/department/:departmentSlug/gente_y_sociedad/:slug"
            element={<SociedadDetail />}
          />
        </Routes>
        <Footer />
      </>
    </Router>
  );
}
