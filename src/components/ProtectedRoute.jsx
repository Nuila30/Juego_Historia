import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";

function ProtectedRoute({ children }) {
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

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;