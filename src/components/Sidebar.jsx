import { Link } from "react-router";

function Sidebar({ onSave, onLoad, onReset }) {
  function closeMobileMenu(event) {
    const details = event.currentTarget.closest("details");
    if (details) {
      details.removeAttribute("open");
    }
  }

  return (
    <aside className="left-menu">
      {/* Menú móvil */}
      <details className="mobile-game-dropdown">
        <summary>
          <span>Menú</span>
          <strong>Opciones del juego</strong>
        </summary>

        <div className="mobile-dropdown-list">
          <Link className="menu-btn menu-link" to="/historias">
            Historias
          </Link>

          <Link className="menu-btn menu-link" to="/perfil">
            Perfil
          </Link>

          <button
            className="menu-btn"
            type="button"
            onClick={(event) => {
              onSave();
              closeMobileMenu(event);
            }}
          >
            Guardar
          </button>

          <button
            className="menu-btn"
            type="button"
            onClick={(event) => {
              onLoad();
              closeMobileMenu(event);
            }}
          >
            Cargar
          </button>

          <button
            className="menu-btn"
            type="button"
            onClick={(event) => {
              onReset();
              closeMobileMenu(event);
            }}
          >
            Reiniciar
          </button>
        </div>
      </details>

      {/* Menú escritorio */}
      <div className="menu-box desktop-menu-box">
        <Link className="menu-btn menu-link" to="/historias">
          Historias
        </Link>

        <Link className="menu-btn menu-link" to="/perfil">
          Perfil
        </Link>

        <button className="menu-btn" type="button" onClick={onSave}>
          Guardar
        </button>

        <button className="menu-btn" type="button" onClick={onLoad}>
          Cargar
        </button>

        <button className="menu-btn" type="button" onClick={onReset}>
          Reiniciar
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;