import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { supabase } from "../services/supabaseClient.js";
import { useAuth } from "../context/AuthContext.jsx";

function Login() {
  const navigate = useNavigate();
  const { user, authLoading } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!authLoading && user) {
      navigate("/historias");
    }
  }, [user, authLoading, navigate]);

  function cleanUsername(value) {
    return value.trim().toLowerCase();
  }

  async function handleLogin(event) {
    event.preventDefault();

    const finalUsername = cleanUsername(username);

    setLoading(true);
    setMessage("");

    const { data: email, error: emailError } = await supabase.rpc(
      "get_email_by_username",
      {
        p_username: finalUsername,
      }
    );

    if (emailError) {
      setLoading(false);
      setMessage(emailError.message);
      return;
    }

    if (!email) {
      setLoading(false);
      setMessage("Usuario no encontrado.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage("Usuario o contraseña incorrectos.");
      return;
    }

    navigate("/historias");
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <span className="home-kicker">Juego de historias</span>

        <h1>Iniciar sesión</h1>

        <p>
          Entra con tu usuario para guardar partidas, cargar tu progreso y
          desbloquear finales.
        </p>

        <form className="auth-form" onSubmit={handleLogin}>
          <label>
            Usuario
            <input
              type="text"
              placeholder="tu_usuario"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </label>

          <label>
            Contraseña
            <input
              type="password"
              placeholder="Tu contraseña"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        {message && <div className="auth-message">{message}</div>}

        <p className="auth-link">
          ¿No tienes cuenta? <Link to="/registro">Crear cuenta</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;