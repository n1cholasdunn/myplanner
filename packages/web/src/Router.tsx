// src/Router.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DayView from "./pages/DayView";
import NotFound from "./pages/404";
import User from "./pages/User";
import Login from "./pages/Login";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DayView />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/user-info" element={<User />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
