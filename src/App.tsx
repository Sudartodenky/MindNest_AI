import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// --- Firebase ---
import { auth } from "./firebaseConfig";

// --- Pages ---
import { AuthPage } from "./pages/AuthPage";
import { LandingPage } from "./pages/LandingPage";
import { Dashboard } from "./pages/Dashboard";
import { SikatPikiran } from "./pages/SikatPikiran";
import { DigitalDetox } from "./pages/DigitalDetox";
import { Profile } from "./pages/Profile";
import { Report } from "./pages/Report";
import { History } from "./pages/History";
import { Navbar } from "./pages/Navbar";

// --- LoadingScreen ---
import { LoadingScreen } from "./components/LoadingScreen";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function ProtectedRoute({
  children,
  isAuthenticated,
}: {
  children: React.ReactNode;
  isAuthenticated: boolean;
}) {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 w-full mx-auto overflow-x-hidden"
      >
        {children}
      </motion.main>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isAuthLoading) return <LoadingScreen />;

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#F8FAFF] text-slate-900 font-sans overflow-x-hidden ">
        <AnimatePresence mode="wait">
          <Routes>
            <Route
              path="/"
              element={
                user ? <Navigate to="/dashboard" replace /> : <LandingPage />
              }
            />
            <Route
              path="/login"
              element={
                user ? <Navigate to="/dashboard" replace /> : <AuthPage />
              }
            />
            <Route
              path="/signup"
              element={
                user ? <Navigate to="/dashboard" replace /> : <AuthPage />
              }
            />

            <Route path="/history" element={<History />} />
            {[
              { path: "/dashboard", component: <Dashboard /> },
              { path: "/sikat-pikiran", component: <SikatPikiran /> },
              { path: "/digital-detox", component: <DigitalDetox /> },
              { path: "/profile", component: <Profile /> },
              { path: "/report", component: <Report /> },
            ].map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <ProtectedRoute isAuthenticated={!!user}>
                    {route.component}
                  </ProtectedRoute>
                }
              />
            ))}

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}
