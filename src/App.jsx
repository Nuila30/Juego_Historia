import { Navigate, Route, Routes } from "react-router";

import Home from "./pages/Home.jsx";
import Game from "./pages/Game.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import AdminRoute from "./components/AdminRoute.jsx";




function AuthRedirect() {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return (
      <main className="auth-page">
        <section className="auth-card">
          <span className="home-kicker">Juego de historias</span>
          <h1>Cargando...</h1>
          <p>Estamos verificando tu sesión.</p>
        </section>
      </main>
    );
  }

  if (user) {
    return <Navigate to="/historias" replace />;
  }

  return <Navigate to="/login" replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthRedirect />} />

      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />

      <Route path="/olvide-contrasena" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route
        path="/historias"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/perfil"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/juego/:storyId"
        element={
          <ProtectedRoute>
            <Game />
          </ProtectedRoute>
        }
      />
      <Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminRoute>
        <AdminPanel />
      </AdminRoute>
    </ProtectedRoute>
  }
/>










      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;