import { Link } from "react-router";

function StoryCard({ story }) {
  const isAvailable = story.status === "available";

  return (
    <article className="story-card">
      <div className="story-card-image">
        <img src={story.cover} alt={story.title} />

        {!isAvailable && (
          <div className="story-card-lock">
            Próximamente
          </div>
        )}
      </div>

      <div className="story-card-content">
        <span>{story.genre || "Historia interactiva"}</span>

        <h2>{story.title}</h2>

        <p>{story.subtitle}</p>

        {isAvailable ? (
          <Link
            className="story-card-btn story-card-link"
            to={`/juego/${story.id}`}
          >
            Jugar historia
          </Link>
        ) : (
          <button className="story-card-btn" disabled>
            No disponible
          </button>
        )}
      </div>
    </article>
  );
}

export default StoryCard;