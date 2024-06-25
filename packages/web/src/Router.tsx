// src/Router.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DayView from "./pages/DayView";
import NotFound from "./pages/404";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DayView />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
