import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { supabase } from "../services/supabaseClient.js";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function cleanUsername(value) {
    return value.trim().toLowerCase();
  }

  async function handleRegister(event) {
    event.preventDefault();

    const finalUsername = cleanUsername(username);

    if (finalUsername.length < 3) {
      setMessage("El usuario debe tener mínimo 3 caracteres.");
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(finalUsername)) {
      setMessage("El usuario solo puede tener letras, números y guion bajo.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        data: {
          username: finalUsername,
        },
      },
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Cuenta creada correctamente. Ahora puedes iniciar sesión.");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <span className="home-kicker">Juego de historias</span>

        <h1>Crear cuenta</h1>

        <p>
          Crea tu usuario para guardar partidas, cargar tu progreso y registrar
          tus finales desbloqueados.
        </p>

        <form className="auth-form" onSubmit={handleRegister}>
          <label>
            Usuario
            <input
              type="text"
              placeholder="ejemplo: lucia_01"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              minLength="3"
            />
          </label>

          <label>
            Correo
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label>
            Contraseña
            <input
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength="6"
            />
          </label>

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? "Creando..." : "Crear cuenta"}
          </button>
        </form>

        {message && <div className="auth-message">{message}</div>}

        <p className="auth-link">
          ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
        </p>
      </section>
    </main>
  );
}

export default Register;