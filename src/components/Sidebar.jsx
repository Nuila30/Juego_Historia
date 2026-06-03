import { Link } from "react-router";

function Sidebar({ onSave, onLoad, onReset }) {
  return (
    <aside className="left-menu">
      <div className="menu-box">
        <Link className="menu-btn menu-link" to="/historias">
          Historias
        </Link>

        <Link className="menu-btn menu-link" to="/perfil">
          Perfil
        </Link>

        <button className="menu-btn" onClick={onSave}>
          Guardar
        </button>

        <button className="menu-btn" onClick={onLoad}>
          Cargar
        </button>

        <button className="menu-btn" onClick={onReset}>
          Reiniciar
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;