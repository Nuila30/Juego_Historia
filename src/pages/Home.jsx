import { Link } from "react-router";
import StoryCard from "../components/StoryCard.jsx";
import { stories } from "../data/stories.js";
import { useAuth } from "../context/AuthContext.jsx";

function Home() {
  const { user, logout } = useAuth();

  const username =
    user?.user_metadata?.username && user.user_metadata.username !== "null"
      ? user.user_metadata.username
      : user?.email;

  const availableStories = stories.filter(
    (story) => story.status === "available"
  );

  const comingSoonStories = stories.filter(
    (story) => story.status !== "available"
  );

  return (
    <main className="home-page home-page-premium">
      <nav className="top-nav home-nav">
        <Link to="/historias" className="brand-logo">
          <span className="brand-mark">JH</span>

          <div>
            <strong>Juego_Historias</strong>
            <small>Historias interactivas</small>
          </div>
        </Link>

        <div className="nav-actions">
          <div className="user-pill">
            <span className="user-avatar">
              {username?.charAt(0)?.toUpperCase() || "U"}
            </span>

            <div>
              <small>Jugador</small>
              <span>{username}</span>
            </div>
          </div>

          <Link to="/perfil" className="nav-btn">
            Mi perfil
          </Link>

          <button className="nav-btn nav-btn-danger" onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      </nav>

      <section className="home-hero home-hero-premium">
        <div className="hero-bg-glow"></div>

        <div className="hero-content">
          <div className="hero-copy">
            <span className="home-kicker">Bienvenido</span>

            <h1>Elige tu historia</h1>

            <p>
              Investiga asesinatos, encuentra pistas, toma decisiones difíciles
              y desbloquea finales según tu inteligencia, confianza, honestidad
              y estado de vida.
            </p>

            <div className="hero-actions">
              <a href="#historias" className="hero-btn">
                Ver historias
              </a>

              <Link to="/perfil" className="hero-btn hero-btn-secondary">
                Ver progreso
              </Link>
            </div>
          </div>

          <aside className="hero-status-card">
            <span>Tu progreso</span>

            <div className="status-grid">
              <div>
                <strong>{availableStories.length}</strong>
                <small>Jugables</small>
              </div>

              <div>
                <strong>{comingSoonStories.length}</strong>
                <small>Próximas</small>
              </div>

              <div>
                <strong>4</strong>
                <small>Atributos</small>
              </div>
            </div>

            <p>
              Tus partidas se guardan con tu usuario y puedes continuar tu
              avance desde tu perfil.
            </p>
          </aside>
        </div>
      </section>

      <section className="stories-section" id="historias">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">Biblioteca</span>
            <h2>Historias disponibles</h2>
          </div>

          <p>
            Cada historia tiene rutas, pistas, objetos y decisiones que pueden
            cambiar completamente el final.
          </p>
        </div>

        <section className="stories-grid">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </section>
      </section>
    </main>
  );
}

export default Home;