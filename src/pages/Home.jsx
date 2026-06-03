import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";

import { stories } from "../data/stories.js";
import { useAuth } from "../context/AuthContext.jsx";
import UserBadge from "../components/UserBadge.jsx";
import { getChapterProgress } from "../services/chapterProgressService.js";

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
        </div>

        <div className="chapter-card-body">
          <span>{chapter.label}</span>
          <h3>{chapter.title}</h3>
          <p className="chapter-requirement">
            Completa el capítulo anterior para desbloquearlo.
          </p>
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
        <span>{chapter.label}</span>
        <h3>{chapter.title}</h3>
      </div>
    </Link>
  );
}

function StoryCarousel({ story, highestUnlocked }) {
  const carouselRef = useRef(null);
  const chapters = story.chapters || [];

  function moveCarousel(direction) {
    if (!carouselRef.current) return;

    const scrollAmount = carouselRef.current.clientWidth * 0.85;

    carouselRef.current.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  }

  return (
    <section className="chapter-story-block">
      <div className="chapter-story-heading">
        <div>
          <span>{story.genre}</span>
          <h2>{story.title}</h2>
        </div>

        {story.subtitle && <p>{story.subtitle}</p>}
      </div>

      <div className="chapter-progress-note">
        Capítulo desbloqueado: <strong>{highestUnlocked}</strong>
      </div>

      <div className="chapter-carousel-shell">
        <button
          className="carousel-arrow carousel-arrow-left"
          type="button"
          onClick={() => moveCarousel("left")}
          aria-label="Capítulos anteriores"
        >
          ‹
        </button>

        <div className="chapter-carousel-track" ref={carouselRef}>
          {chapters.map((chapter) => (
            <ChapterCard
              key={chapter.id}
              story={story}
              chapter={chapter}
              highestUnlocked={highestUnlocked}
            />
          ))}
        </div>

        <button
          className="carousel-arrow carousel-arrow-right"
          type="button"
          onClick={() => moveCarousel("right")}
          aria-label="Siguientes capítulos"
        >
          ›
        </button>
      </div>
    </section>
  );
}

function Home() {
  const { user, logout } = useAuth();

  const [progressMap, setProgressMap] = useState({});
  const [loadingProgress, setLoadingProgress] = useState(true);

  useEffect(() => {
    async function loadProgress() {
      try {
        setLoadingProgress(true);

        const progress = await getChapterProgress({
          userId: user.id,
        });

        const mappedProgress = {};

        progress.forEach((item) => {
          mappedProgress[item.story_id] = item.highest_chapter_unlocked || 1;
        });

        setProgressMap(mappedProgress);
      } catch (error) {
        console.error("Error cargando progreso de capítulos:", error.message);
      } finally {
        setLoadingProgress(false);
      }
    }

    if (user?.id) {
      loadProgress();
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

      {loadingProgress ? (
        <section className="profile-loading-card">
          <span className="loading-dot"></span>
          <div>
            <h2>Cargando capítulos...</h2>
            <p>Estamos revisando tu progreso.</p>
          </div>
        </section>
      ) : (
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