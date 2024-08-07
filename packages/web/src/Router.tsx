// src/Router.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DayView from "./pages/DayView";
import NotFound from "./pages/404";
import User from "./pages/User";
import Login from "./pages/Login";
import ThreeDayView from "./pages/ThreeDayView";
//import ProtectedRoute from "./components/ProtectedRoute";
import WeekView from "./pages/WeekView";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/*
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DayView />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/user-info"
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/3-day-view"
          element={
            <ProtectedRoute>
              <ThreeDayView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/week-view"
          element={
            <ProtectedRoute>
              <WeekView />
            </ProtectedRoute>
          }
        />
     */}

        <Route path="/" element={<DayView />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/user-info" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/3-day-view" element={<ThreeDayView />} />
        <Route path="/week-view" element={<WeekView />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
