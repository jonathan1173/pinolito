import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./features/home";
import { GamePage } from "./features/games";
import { ActivitiesPage , DetailsPage , CalendarPage } from "./features/activities";

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
          <Route path="/activity" element={<ActivitiesPage />} />
          <Route path="/actividades/:ciudad" element={<DetailsPage />} />
        </Routes>
      </>
    </Router>
  );
}
