import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { checkIsAdmin } from "../services/adminService.js";

function AdminRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function verifyAdmin() {
      try {
        const result = await checkIsAdmin();
        setIsAdmin(result);
      } catch (error) {
        console.error("Error verificando admin:", error.message);
        setIsAdmin(false);
      } finally {
        setChecking(false);
      }
    }

    verifyAdmin();
  }, []);

  if (checking) {
    return (
      <main className="auth-page">
        <section className="auth-card">
          <span className="home-kicker">Panel admin</span>
          <h1>Cargando...</h1>
          <p>Estamos verificando tus permisos.</p>
        </section>
      </main>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/historias" replace />;
  }

  return children;
}

export default AdminRoute;