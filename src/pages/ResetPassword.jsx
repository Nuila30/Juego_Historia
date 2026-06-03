import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { supabase } from "../services/supabaseClient.js";

function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        setHasSession(true);
      }

      setCheckingSession(false);
    }

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "PASSWORD_RECOVERY" || session) {
          setHasSession(true);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function handleUpdatePassword(event) {
    event.preventDefault();

    if (password.length < 6) {
      setMessage("La contraseña debe tener mínimo 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Contraseña actualizada correctamente.");

    await supabase.auth.signOut();

    setTimeout(() => {
      navigate("/login");
    }, 1200);
  }

  if (checkingSession) {
    return (
      <main className="auth-page">
        <section className="auth-card">
          <span className="home-kicker">Verificando</span>
          <h1>Cargando...</h1>
          <p>Estamos validando tu enlace de recuperación.</p>
        </section>
      </main>
    );
  }

  if (!hasSession) {
    return (
      <main className="auth-page">
        <section className="auth-card">
          <span className="home-kicker">Enlace inválido</span>
          <h1>No se pudo recuperar</h1>
          <p>
            El enlace puede haber expirado o no es válido. Solicita uno nuevo
            para cambiar tu contraseña.
          </p>

          <p className="auth-link">
            <Link to="/olvide-contrasena">Solicitar nuevo enlace</Link>
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <span className="home-kicker">Nueva contraseña</span>

        <h1>Cambiar contraseña</h1>

        <p>
          Escribe tu nueva contraseña. Luego podrás iniciar sesión nuevamente
          con tu usuario y contraseña.
        </p>

        <form className="auth-form" onSubmit={handleUpdatePassword}>
          <label>
            Nueva contraseña
            <input
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength="6"
            />
          </label>

          <label>
            Confirmar contraseña
            <input
              type="password"
              placeholder="Repite tu contraseña"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              minLength="6"
            />
          </label>

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? "Actualizando..." : "Actualizar contraseña"}
          </button>
        </form>

        {message && <div className="auth-message">{message}</div>}

        <p className="auth-link">
          Volver a <Link to="/login">Iniciar sesión</Link>
        </p>
      </section>
    </main>
  );
}

export default ResetPassword;