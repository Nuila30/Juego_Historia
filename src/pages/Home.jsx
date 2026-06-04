import { Link } from "react-router";
import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext.jsx";
import UserBadge from "../components/UserBadge.jsx";
import { getPlayableStories } from "../services/storyLibraryService.js";
import { getChapterProgress } from "../services/chapterProgressService.js";

const CHAPTERS_PER_PAGE = 5;

function ChapterCard({ story, chapter, highestUnlocked }) {
  const isAvailable =
    story.status === "available" &&
    chapter.status === "available" &&
    chapter.chapterNumber <= highestUnlocked;

  if (!isAvailable) {
    return (
      <article className="chapter-card chapter-card-locked">
        <div className="chapter-card-image">
          <img src={chapter.image || story.cover} alt={chapter.title} />

          <div className="chapter-lock">
            {story.status !== "available" ? "Próximamente" : "Bloqueado"}
          </div>

          <div className="chapter-number">{chapter.label}</div>
        </div>

        <div className="chapter-card-body">
          <h3>{chapter.title}</h3>

          {story.status === "available" && (
            <p className="chapter-requirement">
              Completa el capítulo anterior para desbloquearlo.
            </p>
          )}
        </div>
      </article>
    );
  }

  return (
    <Link
      className="chapter-card"
      to={`/juego/${story.id}?scene=${chapter.startScene}`}
    >
      <div className="chapter-card-image">
        <img src={chapter.image || story.cover} alt={chapter.title} />

        <div className="chapter-number">{chapter.label}</div>
      </div>

      <div className="chapter-card-body">
        <h3>{chapter.title}</h3>
      </div>
    </Link>
  );
}

function StoryCarousel({ story, highestUnlocked }) {
  const [page, setPage] = useState(0);

  const chapters = story.chapters || [];
  const totalPages = Math.ceil(chapters.length / CHAPTERS_PER_PAGE);

  const startIndex = page * CHAPTERS_PER_PAGE;
  const endIndex = startIndex + CHAPTERS_PER_PAGE;
  const visibleChapters = chapters.slice(startIndex, endIndex);

  function goPrev() {
    setPage((current) => Math.max(current - 1, 0));
  }

  function goNext() {
    setPage((current) => Math.min(current + 1, totalPages - 1));
  }

  return (
    <section className="chapter-story-block">
      <div className="chapter-story-heading">
        <div>
          <span>{story.genre || "Historia"}</span>
          <h2>{story.title}</h2>
        </div>

        {story.subtitle && <p>{story.subtitle}</p>}
      </div>

      <div className="chapter-progress-row">
        <div className="chapter-progress-note">
          Capítulo desbloqueado: <strong>{highestUnlocked}</strong>
        </div>

        <div className="chapter-page-indicator">
          Mostrando capítulos{" "}
          <strong>
            {startIndex + 1} - {Math.min(endIndex, chapters.length)}
          </strong>{" "}
          de <strong>{chapters.length}</strong>
        </div>
      </div>

      <div className="chapter-carousel-shell">
        {totalPages > 1 && (
          <button
            className="carousel-arrow carousel-arrow-left"
            type="button"
            onClick={goPrev}
            disabled={page === 0}
            aria-label="Capítulos anteriores"
          >
            ‹
          </button>
        )}

        <div className="chapter-carousel-track chapter-page-track">
          {visibleChapters.map((chapter) => (
            <ChapterCard
              key={chapter.id}
              story={story}
              chapter={chapter}
              highestUnlocked={highestUnlocked}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <button
            className="carousel-arrow carousel-arrow-right"
            type="button"
            onClick={goNext}
            disabled={page === totalPages - 1}
            aria-label="Siguientes capítulos"
          >
            ›
          </button>
        )}
      </div>

      {totalPages > 1 && (
        <div className="chapter-page-buttons">
          {Array.from({ length: totalPages }).map((_, index) => {
            const pageStart = index * CHAPTERS_PER_PAGE + 1;
            const pageEnd = Math.min(
              pageStart + CHAPTERS_PER_PAGE - 1,
              chapters.length
            );

            return (
              <button
                key={index}
                type="button"
                className={page === index ? "active" : ""}
                onClick={() => setPage(index)}
              >
                Cap. {pageStart} - {pageEnd}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}

function Home() {
  const { user, logout } = useAuth();

  const [stories, setStories] = useState([]);
  const [progressMap, setProgressMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadHomeData() {
      try {
        setLoading(true);
        setMessage("");

        const [loadedStories, progress] = await Promise.all([
          getPlayableStories(),
          getChapterProgress({ userId: user.id }),
        ]);

        const mappedProgress = {};

        progress.forEach((item) => {
          mappedProgress[item.story_id] =
            item.highest_chapter_unlocked || 1;
        });

        setStories(loadedStories);
        setProgressMap(mappedProgress);
      } catch (error) {
        setMessage(`Error cargando historias: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }

    if (user?.id) {
      loadHomeData();
    }
  }, [user?.id]);

  return (
    <main className="home-page home-page-premium">
      <nav className="top-nav home-nav">
        <Link to="/historias" className="brand-logo">
          <span className="brand-mark">JH</span>

          <div>
            <strong>Juego_Historias</strong>
            <small>Historias por capítulos</small>
          </div>
        </Link>

        <div className="nav-actions">
          <UserBadge user={user} />

          <Link to="/perfil" className="nav-btn">
            Mi perfil
          </Link>

          <Link to="/admin" className="nav-btn">
            Admin
          </Link>

          <button className="nav-btn nav-btn-danger" onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      </nav>

      <section className="chapters-page-header">
        <span className="home-kicker">Biblioteca narrativa</span>

        <h1>Elige tu historia</h1>

        <p>
          Los capítulos se desbloquean en orden. Primero juega el Capítulo 1
          para poder avanzar al Capítulo 2.
        </p>
      </section>

      {loading && (
        <section className="profile-loading-card">
          <span className="loading-dot"></span>

          <div>
            <h2>Cargando historias...</h2>
            <p>Estamos buscando historias y progreso del jugador.</p>
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
        <section className="chapter-library">
          {stories.map((story) => (
            <StoryCarousel
              key={story.id}
              story={story}
              highestUnlocked={progressMap[story.id] || 1}
            />
          ))}
        </section>
      )}
    </main>
  );
}

export default Home;