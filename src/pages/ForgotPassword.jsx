import { useState } from "react";
import { Link } from "react-router";
import { supabase } from "../services/supabaseClient.js";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleResetPassword(event) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    const redirectTo = `${window.location.origin}/reset-password`;

    const { error } = await supabase.auth.resetPasswordForEmail(
      email.trim().toLowerCase(),
      {
        redirectTo,
      }
    );

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage(
      "Si el correo está registrado, recibirás un enlace para cambiar tu contraseña."
    );
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <span className="home-kicker">Recuperar acceso</span>

        <h1>Olvidé mi contraseña</h1>

        <p>
          Ingresa el correo con el que creaste tu cuenta. Te enviaremos un
          enlace para crear una nueva contraseña.
        </p>

        <form className="auth-form" onSubmit={handleResetPassword}>
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

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar enlace"}
          </button>
        </form>

        {message && <div className="auth-message">{message}</div>}

        <p className="auth-link">
          ¿Ya recordaste tu contraseña? <Link to="/login">Iniciar sesión</Link>
        </p>
      </section>
    </main>
  );
}

export default ForgotPassword;