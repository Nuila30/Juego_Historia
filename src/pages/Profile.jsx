import { useEffect, useState } from "react";
import { Link } from "react-router";

import { useAuth } from "../context/AuthContext.jsx";
import { stories } from "../data/stories.js";
import { getUnlockedEndings, getUserSaves } from "../services/saveService.js";

function Profile() {
  const { user, logout } = useAuth();

  const [saves, setSaves] = useState([]);
  const [endings, setEndings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const username =
    user?.user_metadata?.username && user.user_metadata.username !== "null"
      ? user.user_metadata.username
      : user?.email;

  const avatarLetter = username?.charAt(0)?.toUpperCase() || "U";

  useEffect(() => {
    async function loadProfileData() {
      try {
        setLoading(true);
        setMessage("");

        const [savedGames, unlockedEndings] = await Promise.all([
          getUserSaves({ userId: user.id }),
          getUnlockedEndings({ userId: user.id }),
        ]);

        setSaves(savedGames || []);
        setEndings(unlockedEndings || []);
      } catch (error) {
        setMessage(`Error cargando perfil: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }

    if (user?.id) {
      loadProfileData();
    }
  }, [user.id]);

  function getStory(storyId) {
    return stories.find((story) => story.id === storyId);
  }

  function formatDate(dateValue) {
    if (!dateValue) return "Sin fecha";

    return new Date(dateValue).toLocaleString("es-SV", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  return (
    <main className="profile-page profile-page-premium">
      <nav className="top-nav profile-nav">
        <Link to="/historias" className="brand-logo">
          <span className="brand-mark">JH</span>

          <div>
            <strong>Juego_Historias</strong>
            <small>Perfil del jugador</small>
          </div>
        </Link>

        <div className="nav-actions">
          <div className="user-pill">
            <span className="user-avatar">{avatarLetter}</span>

            <div>
              <small>Jugador</small>
              <span>{username}</span>
            </div>
          </div>

          <Link to="/historias" className="nav-btn">
            Historias
          </Link>

          <button className="nav-btn nav-btn-danger" onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      </nav>

      <section className="profile-hero profile-hero-premium">
        <div className="profile-hero-overlay"></div>

        <div className="profile-hero-content">
          <div>
            <span className="home-kicker">Jugador</span>
            <h1>Tu progreso</h1>
            <p>
              Revisa tus partidas guardadas, continúa historias pendientes y
              descubre los finales que has desbloqueado con tus decisiones.
            </p>
          </div>

          <aside className="profile-summary-card">
            <span>Resumen</span>

            <div className="profile-summary-grid">
              <div>
                <strong>{saves.length}</strong>
                <small>Partidas</small>
              </div>

              <div>
                <strong>{endings.length}</strong>
                <small>Finales</small>
              </div>

              <div>
                <strong>{stories.length}</strong>
                <small>Historias</small>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {loading && (
        <section className="profile-loading-card">
          <span className="loading-dot"></span>
          <div>
            <h2>Cargando perfil...</h2>
            <p>Estamos buscando tus partidas y finales desbloqueados.</p>
          </div>
        </section>
      )}

      {message && (
        <section className="profile-message-card">
          <h2>Ocurrió un problema</h2>
          <p>{message}</p>
        </section>
      )}

      {!loading && !message && (
        <section className="profile-grid profile-grid-premium">
          <article className="profile-box profile-box-premium">
            <div className="profile-box-header">
              <div>
                <span className="section-eyebrow">Continuar</span>
                <h2>Partidas guardadas</h2>
              </div>

              <strong>{saves.length}</strong>
            </div>

            {saves.length === 0 ? (
              <div className="profile-empty-card">
                <h3>No tienes partidas guardadas</h3>
                <p>
                  Entra a una historia, avanza un poco y presiona “Guardar” para
                  ver tu progreso aquí.
                </p>

                <Link to="/historias">Elegir historia</Link>
              </div>
            ) : (
              <div className="profile-list">
                {saves.map((save) => {
                  const story = getStory(save.story_id);

                  return (
                    <div className="profile-item profile-item-premium" key={save.id}>
                      <div className="profile-item-cover">
                        <img
                          src={story?.cover}
                          alt={story?.title || save.story_id}
                        />
                      </div>

                      <div className="profile-item-content">
                        <span>{story?.genre || "Historia"}</span>
                        <h3>{story?.title || save.story_id}</h3>

                        <p>
                          Escena actual:{" "}
                          <strong>{save.current_scene_key}</strong>
                        </p>

                        <small>Guardado: {formatDate(save.updated_at)}</small>
                      </div>

                      <Link
                        className="profile-action-btn"
                        to={`/juego/${save.story_id}`}
                      >
                        Continuar
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </article>

          <article className="profile-box profile-box-premium">
            <div className="profile-box-header">
              <div>
                <span className="section-eyebrow">Logros</span>
                <h2>Finales desbloqueados</h2>
              </div>

              <strong>{endings.length}</strong>
            </div>

            {endings.length === 0 ? (
              <div className="profile-empty-card">
                <h3>Aún no has desbloqueado finales</h3>
                <p>
                  Completa una historia para registrar tus finales y revisar tus
                  rutas desbloqueadas.
                </p>

                <Link to="/historias">Jugar ahora</Link>
              </div>
            ) : (
              <div className="profile-list">
                {endings.map((ending) => {
                  const story = getStory(ending.story_id);

                  return (
                    <div
                      className="profile-item profile-item-premium ending-item"
                      key={ending.id}
                    >
                      <div className="ending-medal">
                        ★
                      </div>

                      <div className="profile-item-content">
                        <span>{story?.title || ending.story_id}</span>
                        <h3>{ending.ending_name}</h3>

                        <p>
                          Ruta final: <strong>{ending.ending_key}</strong>
                        </p>

                        <small>
                          Desbloqueado: {formatDate(ending.unlocked_at)}
                        </small>
                      </div>

                      <Link
                        className="profile-action-btn"
                        to={`/juego/${ending.story_id}`}
                      >
                        Rejugar
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </article>
        </section>
      )}
    </main>
  );
}

export default Profile;