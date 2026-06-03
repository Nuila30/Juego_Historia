import { useAuth } from "../context/AuthContext.jsx";

function ProgressCircle({ label, value, max = 100, type }) {
  const safeValue = Number(value) || 0;
  const percentage = Math.max(0, Math.min(100, (safeValue / max) * 100));

  return (
    <div className={`progress-stat-card ${type}`}>
      <div
        className="progress-circle"
        style={{
          "--progress": `${percentage}%`,
        }}
      >
        <div className="progress-circle-inner">
          <strong>{safeValue}</strong>
        </div>
      </div>

      <span>{label}</span>
    </div>
  );
}

function PlayerStatusHeader({ user }) {
  const username =
    user?.user_metadata?.username && user.user_metadata.username !== "null"
      ? user.user_metadata.username
      : user?.email;

  const avatarUrl = user?.user_metadata?.avatar_url;
  const avatarLetter = username?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="stats-player-card">
      {avatarUrl ? (
        <img className="stats-player-avatar" src={avatarUrl} alt={username} />
      ) : (
        <span className="stats-player-avatar stats-player-letter">
          {avatarLetter}
        </span>
      )}

      <div>
        <span>Estado</span>
        <h3>{username}</h3>
      </div>
    </div>
  );
}

function StatsContent({ stats, gameState, user }) {
  const inventory = gameState?.inventory || [];
  const clues = gameState?.clues || [];

  return (
    <>
      <PlayerStatusHeader user={user} />

      <div className="progress-stats-grid">
        <ProgressCircle label="Vida" value={stats.vida} max={100} type="vida" />

        <ProgressCircle
          label="Inteligencia"
          value={stats.inteligencia}
          max={10}
          type="inteligencia"
        />

        <ProgressCircle
          label="Confianza"
          value={stats.confianza}
          max={10}
          type="confianza"
        />

        <ProgressCircle
          label="Honestidad"
          value={stats.honestidad}
          max={10}
          type="honestidad"
        />
      </div>

      <div className="inventory-panel">
        <div className="inventory-block">
          <div className="inventory-head">
            <span>Objetos</span>
            <strong>{inventory.length}</strong>
          </div>

          {inventory.length === 0 ? (
            <p>No has encontrado objetos.</p>
          ) : (
            <ul>
              {inventory.map((item) => (
                <li key={item}>{item.replaceAll("_", " ")}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="inventory-block">
          <div className="inventory-head">
            <span>Pistas</span>
            <strong>{clues.length}</strong>
          </div>

          {clues.length === 0 ? (
            <p>No has encontrado pistas.</p>
          ) : (
            <ul>
              {clues.map((clue) => (
                <li key={clue}>{clue.replaceAll("_", " ")}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

function StatsBox({ stats, gameState }) {
  const { user } = useAuth();

  const username =
    user?.user_metadata?.username && user.user_metadata.username !== "null"
      ? user.user_metadata.username
      : user?.email;

  return (
    <aside className="stats-box stats-box-premium">
      <details className="mobile-stats-dropdown">
        <summary>
          <span>Estado</span>
          <strong>{username}</strong>
        </summary>

        <div className="mobile-stats-content">
          <StatsContent stats={stats} gameState={gameState} user={user} />
        </div>
      </details>

      <div className="desktop-stats-content">
        <StatsContent stats={stats} gameState={gameState} user={user} />
      </div>
    </aside>
  );
}

export default StatsBox;