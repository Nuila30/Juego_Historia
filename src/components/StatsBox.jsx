function StatBar({ label, value, max = 100, type }) {
  const percentage = Math.max(0, Math.min(100, (value / max) * 100));

  return (
    <div className={`game-stat-card ${type}`}>
      <div className="game-stat-head">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>

      <div className="game-stat-bar">
        <div style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}

function StatsBox({ stats, gameState }) {
  return (
    <aside className="stats-box stats-box-premium">
      <div className="stats-title">
        <span>Estado</span>
        <h3>Jugador</h3>
      </div>

      <div className="stats-list">
        <StatBar
          label="Vida"
          value={stats.vida}
          max={100}
          type="vida"
        />

        <StatBar
          label="Inteligencia"
          value={stats.inteligencia}
          max={10}
          type="inteligencia"
        />

        <StatBar
          label="Confianza"
          value={stats.confianza}
          max={10}
          type="confianza"
        />

        <StatBar
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
            <strong>{gameState.inventory.length}</strong>
          </div>

          {gameState.inventory.length === 0 ? (
            <p>No has encontrado objetos.</p>
          ) : (
            <ul>
              {gameState.inventory.map((item) => (
                <li key={item}>{item.replaceAll("_", " ")}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="inventory-block">
          <div className="inventory-head">
            <span>Pistas</span>
            <strong>{gameState.clues.length}</strong>
          </div>

          {gameState.clues.length === 0 ? (
            <p>No has encontrado pistas.</p>
          ) : (
            <ul>
              {gameState.clues.map((clue) => (
                <li key={clue}>{clue.replaceAll("_", " ")}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </aside>
  );
}

export default StatsBox;