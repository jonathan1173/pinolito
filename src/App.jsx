import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./features/home";
import { GamePage } from "./features/games";
import { DepartmentsPage , DepartmentsDetails , CalendarPage } from "./features/departments";
import { MunicipalityPage } from "./features/departments/municipalities";



import { Navbar } from "./shared/components/NavBar";


export default function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/games" element={<GamePage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/department" element={<DepartmentsPage />} />
          <Route path="/department/:ciudad" element={<DepartmentsDetails />} />
          <Route path="/department/:departmentSlug/municipios/:municipioSlug" element={<MunicipalityPage />} />

        </Routes>
      </>
    </Router>
  );
}
