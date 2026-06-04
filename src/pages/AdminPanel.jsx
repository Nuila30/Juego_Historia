import { useEffect, useState } from "react";
import { Link } from "react-router";

import { useAuth } from "../context/AuthContext.jsx";
import UserBadge from "../components/UserBadge.jsx";
import StoryBuilderForm from "../components/StoryBuilderForm.jsx";

import {
  getAllPlayers,
  getAllChapterProgress,
  getAllGameSaves,
  getAdminStories,
  createAdminStory,
  updateAdminStory,
  deleteAdminStory,
  updateAdminGameSave,
  resetAdminPlayerProgress,
} from "../services/adminService.js";

const emptyStory = {
  id: "",
  title: "",
  subtitle: "",
  genre: "Asesinato / Romance",
  status: "draft",
  cover: "",
  startScene: "inicio",
  chapters: [
    {
      id: "capitulo-1",
      chapterNumber: 1,
      label: "Capítulo 1",
      title: "Nuevo capítulo",
      startScene: "inicio",
      status: "available",
      image: "",
    },
  ],
  scenes: {
    inicio: {
      chapterNumber: 1,
      headerTitle: "Historia / enunciado",
      headerSubtitle: "Nueva historia",
      tag: "Capítulo 1",
      place: "Lugar inicial",
      title: "Inicio",
      image: "",
      text: "Escribe aquí el inicio de la historia.",
      choices: [],
    },
  },
};

function listToText(list) {
  if (!Array.isArray(list)) return "";
  return list.join(", ");
}

function textToList(text) {
  if (!text) return [];

  return text
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function PlayerProgressEditor({
  save,
  playerName,
  chapterUnlocked,
  onSave,
  onReset,
  formatDateTime,
}) {
  const [vida, setVida] = useState(save.stats?.vida ?? 100);
  const [inteligencia, setInteligencia] = useState(
    save.stats?.inteligencia ?? 1
  );
  const [confianza, setConfianza] = useState(save.stats?.confianza ?? 0);
  const [honestidad, setHonestidad] = useState(save.stats?.honestidad ?? 0);
  const [inventoryText, setInventoryText] = useState(
    listToText(save.inventory)
  );
  const [cluesText, setCluesText] = useState(listToText(save.clues));
  const [saving, setSaving] = useState(false);
  const [localMessage, setLocalMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSaving(true);
      setLocalMessage("");

      await onSave({
        saveId: save.id,
        stats: {
          vida: Number(vida) || 0,
          inteligencia: Number(inteligencia) || 0,
          confianza: Number(confianza) || 0,
          honestidad: Number(honestidad) || 0,
        },
        inventory: textToList(inventoryText),
        clues: textToList(cluesText),
        flags: save.flags || {},
      });

      setLocalMessage("Progreso actualizado correctamente.");
    } catch (error) {
      setLocalMessage(`Error: ${error.message}`);
    } finally {
      setSaving(false);
    }
  }
  async function handleResetProgress() {
    const confirmReset = confirm(
      "¿Seguro que deseas reiniciar el progreso de este jugador en esta historia? Volverá al Capítulo 1 y perderá su partida guardada."
    );
  
    if (!confirmReset) return;
  
    try {
      setSaving(true);
      setLocalMessage("");
  
      await onReset({
        userId: save.user_id,
        storyId: save.story_id,
      });
  
      setLocalMessage("Progreso reiniciado correctamente.");
    } catch (error) {
      setLocalMessage(`Error reiniciando progreso: ${error.message}`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <article className="admin-progress-card">
      <div className="admin-progress-header">
        <div>
          <span>{playerName}</span>
          <h3>{save.story_id}</h3>
          <p>Escena actual: {save.current_scene_key}</p>
        </div>

        <strong>Cap. {chapterUnlocked}</strong>
      </div>

      <form className="admin-progress-form" onSubmit={handleSubmit}>
        <div className="admin-edit-stats-grid">
          <label>
            Vida
            <input
              type="number"
              value={vida}
              onChange={(event) => setVida(event.target.value)}
            />
          </label>

          <label>
            Inteligencia
            <input
              type="number"
              value={inteligencia}
              onChange={(event) => setInteligencia(event.target.value)}
            />
          </label>

          <label>
            Confianza
            <input
              type="number"
              value={confianza}
              onChange={(event) => setConfianza(event.target.value)}
            />
          </label>

          <label>
            Honestidad
            <input
              type="number"
              value={honestidad}
              onChange={(event) => setHonestidad(event.target.value)}
            />
          </label>
        </div>

        <div className="admin-edit-details-grid">
          <label>
            Objetos
            <textarea
              value={inventoryText}
              onChange={(event) => setInventoryText(event.target.value)}
              rows="3"
              placeholder="llave, carta, anillo"
            />
          </label>

          <label>
            Pistas
            <textarea
              value={cluesText}
              onChange={(event) => setCluesText(event.target.value)}
              rows="3"
              placeholder="copa_envenenada, encaje_rojo"
            />
          </label>
        </div>

        <div className="admin-progress-footer">
  <small>Último guardado: {formatDateTime(save.updated_at)}</small>

  <div className="admin-progress-actions">
    <button className="profile-action-btn" type="submit" disabled={saving}>
      {saving ? "Guardando..." : "Guardar atributos"}
    </button>

    <button
      className="profile-action-btn admin-reset-btn"
      type="button"
      disabled={saving}
      onClick={handleResetProgress}
    >
      Reiniciar progreso
    </button>
  </div>
</div>

        {localMessage && <p className="admin-inline-message">{localMessage}</p>}
      </form>
    </article>
  );
}

function AdminPanel() {
  const { user, logout } = useAuth();

  const [players, setPlayers] = useState([]);
  const [progress, setProgress] = useState([]);
  const [gameSaves, setGameSaves] = useState([]);
  const [adminStories, setAdminStories] = useState([]);

  const [activeTab, setActiveTab] = useState("players");
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [editingStoryId, setEditingStoryId] = useState(null);
  const [editingStory, setEditingStory] = useState(emptyStory);

  async function loadAdminData() {
    try {
      setLoading(true);
      setMessage("");

      const playersData = await getAllPlayers();
      const progressData = await getAllChapterProgress();
      const savesData = await getAllGameSaves();
      const storiesData = await getAdminStories();

      setPlayers(playersData || []);
      setProgress(progressData || []);
      setGameSaves(savesData || []);
      setAdminStories(storiesData || []);
    } catch (error) {
      console.error("Error cargando panel:", error);
      setMessage(`Error cargando panel: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAdminData();
  }, []);

  function handleOpenPlayerProgress(player) {
    setSelectedPlayer(player);
    setActiveTab("playerProgress");
    setMessage("");
  }

  function handleBackToPlayers() {
    setSelectedPlayer(null);
    setActiveTab("players");
    setMessage("");
  }

  function handleNewStory() {
    setEditingStoryId(null);
    setEditingStory(emptyStory);
    setActiveTab("stories");
    setMessage("");
  }

  function handleEditStory(storyRow) {
    setEditingStoryId(storyRow.id);
    setEditingStory(storyRow.story_data || emptyStory);
    setActiveTab("stories");
    setMessage("");
  }

  async function handleSaveStory(parsedStory) {
    try {
      setMessage("");

      if (!parsedStory.id || !parsedStory.title) {
        setMessage("La historia necesita ID y título.");
        return;
      }

      if (!parsedStory.scenes || !parsedStory.startScene) {
        setMessage("La historia necesita escenas y una escena inicial.");
        return;
      }

      if (editingStoryId) {
        await updateAdminStory({
          storyId: editingStoryId,
          story: parsedStory,
        });

        setMessage("Historia actualizada correctamente.");
      } else {
        await createAdminStory({
          userId: user.id,
          story: parsedStory,
        });

        setEditingStoryId(parsedStory.id);
        setMessage("Historia creada correctamente.");
      }

      setEditingStory(parsedStory);
      await loadAdminData();
    } catch (error) {
      setMessage(`Error guardando historia: ${error.message}`);
    }
  }

  async function handleDeleteStory(storyId) {
    const confirmDelete = confirm("¿Seguro que deseas eliminar esta historia?");

    if (!confirmDelete) return;

    try {
      await deleteAdminStory({ storyId });

      if (editingStoryId === storyId) {
        setEditingStoryId(null);
        setEditingStory(emptyStory);
      }

      setMessage("Historia eliminada correctamente.");
      await loadAdminData();
    } catch (error) {
      setMessage(`Error eliminando historia: ${error.message}`);
    }
  }

  async function handleUpdatePlayerSave(payload) {
    await updateAdminGameSave(payload);
    await loadAdminData();
  }
  async function handleResetPlayerProgress(payload) {
    await resetAdminPlayerProgress(payload);
    await loadAdminData();
  
    if (selectedPlayer) {
      setSelectedPlayer({ ...selectedPlayer });
    }
  
    setMessage("Progreso reiniciado correctamente. El jugador iniciará desde el Capítulo 1.");
  }
  function getPlayerName(playerId) {
    const player = players.find((item) => item.id === playerId);
    return player?.username || player?.id || "Jugador";
  }

  function getPlayerSaves(playerId) {
    return gameSaves.filter((save) => save.user_id === playerId);
  }

  function getChapterUnlocked(userId, storyId) {
    const item = progress.find(
      (progressItem) =>
        progressItem.user_id === userId && progressItem.story_id === storyId
    );

    return item?.highest_chapter_unlocked || 1;
  }

  function formatDate(dateValue) {
    if (!dateValue) return "Sin fecha";

    return new Date(dateValue).toLocaleDateString("es-SV", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function formatDateTime(dateValue) {
    if (!dateValue) return "Sin fecha";

    return new Date(dateValue).toLocaleString("es-SV", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  return (
    <main className="admin-page">
      <nav className="top-nav admin-nav">
        <Link to="/historias" className="brand-logo">
          <span className="brand-mark">AD</span>

          <div>
            <strong>Panel Admin</strong>
            <small>Juego_Historias</small>
          </div>
        </Link>

        <div className="nav-actions">
          <UserBadge user={user} />

          <Link to="/historias" className="nav-btn">
            Historias
          </Link>

          <button className="nav-btn nav-btn-danger" onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      </nav>

      <section className="admin-hero">
        <span className="home-kicker">Administración</span>
        <h1>Panel de control</h1>
        <p>
          Revisa jugadores, progreso y administra historias desde un solo lugar.
        </p>
      </section>

      <section className="admin-tabs">
        <button
          type="button"
          className={activeTab === "players" ? "active" : ""}
          onClick={() => {
            setActiveTab("players");
            setSelectedPlayer(null);
          }}
        >
          Jugadores
        </button>

        <button
          type="button"
          className={activeTab === "stories" ? "active" : ""}
          onClick={() => {
            setActiveTab("stories");
            setSelectedPlayer(null);
          }}
        >
          Historias
        </button>
      </section>

      {message && <div className="admin-message">{message}</div>}

      {loading ? (
        <section className="profile-loading-card">
          <span className="loading-dot"></span>

          <div>
            <h2>Cargando panel...</h2>
            <p>Estamos buscando información de jugadores e historias.</p>
          </div>
        </section>
      ) : (
        <>
          {activeTab === "players" && (
            <section className="admin-card">
              <div className="admin-card-header">
                <div>
                  <span className="section-eyebrow">Usuarios</span>
                  <h2>Todos los jugadores</h2>
                </div>

                <strong>{players.length}</strong>
              </div>

              <div className="admin-player-list">
                {players.length === 0 ? (
                  <p className="builder-empty">No hay jugadores registrados.</p>
                ) : (
                  players.map((player) => {
                    const savesCount = getPlayerSaves(player.id).length;

                    return (
                      <article className="admin-player-card" key={player.id}>
                        <div>
                          <span>{player.role || "player"}</span>
                          <h3>{player.username || player.id}</h3>
                          <p>Registro: {formatDate(player.created_at)}</p>
                          <small>Partidas guardadas: {savesCount}</small>
                        </div>

                        <button
                          type="button"
                          className="profile-action-btn"
                          onClick={() => handleOpenPlayerProgress(player)}
                        >
                          Ver progreso
                        </button>
                      </article>
                    );
                  })
                )}
              </div>
            </section>
          )}

          {activeTab === "playerProgress" && selectedPlayer && (
            <section className="admin-card">
              <div className="admin-card-header">
                <div>
                  <span className="section-eyebrow">Progreso</span>
                  <h2>{selectedPlayer.username || selectedPlayer.id}</h2>
                </div>

                <button
                  type="button"
                  className="admin-small-btn"
                  onClick={handleBackToPlayers}
                >
                  Volver
                </button>
              </div>

              {getPlayerSaves(selectedPlayer.id).length === 0 ? (
                <p className="builder-empty">
                  Este jugador todavía no tiene partidas guardadas.
                </p>
              ) : (
                <div className="admin-progress-list">
                  {getPlayerSaves(selectedPlayer.id).map((save) => (
                  <PlayerProgressEditor
                  key={save.id}
                  save={save}
                  playerName={getPlayerName(save.user_id)}
                  chapterUnlocked={getChapterUnlocked(
                    save.user_id,
                    save.story_id
                  )}
                  onSave={handleUpdatePlayerSave}
                  onReset={handleResetPlayerProgress}
                  formatDateTime={formatDateTime}
                />
                  ))}
                </div>
              )}
            </section>
          )}

          {activeTab === "stories" && (
            <section className="admin-grid">
              <article className="admin-card">
                <div className="admin-card-header">
                  <div>
                    <span className="section-eyebrow">Editor</span>

                    <h2>
                      {editingStoryId ? "Editar historia" : "Agregar historia"}
                    </h2>
                  </div>

                  <button
                    className="admin-small-btn"
                    type="button"
                    onClick={handleNewStory}
                  >
                    Nueva
                  </button>
                </div>

                <StoryBuilderForm
                  key={editingStoryId || "new-story"}
                  initialStory={editingStory}
                  editingStoryId={editingStoryId}
                  onSave={handleSaveStory}
                />
              </article>

              <article className="admin-card">
                <div className="admin-card-header">
                  <div>
                    <span className="section-eyebrow">Biblioteca</span>
                    <h2>Historias creadas</h2>
                  </div>

                  <strong>{adminStories.length}</strong>
                </div>

                <div className="admin-story-list">
                  {adminStories.length === 0 ? (
                    <p className="builder-empty">
                      Todavía no has creado historias desde el panel.
                    </p>
                  ) : (
                    adminStories.map((story) => (
                      <div className="admin-story-item" key={story.id}>
                        <div>
                          <span>{story.genre || "Historia"}</span>
                          <h3>{story.title}</h3>
                          <p>{story.status}</p>
                        </div>

                        <div className="admin-story-actions">
                          <button
                            type="button"
                            onClick={() => handleEditStory(story)}
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteStory(story.id)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </article>
            </section>
          )}
        </>
      )}
    </main>
  );
}

export default AdminPanel;