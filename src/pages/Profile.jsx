import { useEffect, useState } from "react";
import { Link } from "react-router";

import { useAuth } from "../context/AuthContext.jsx";
import { stories } from "../data/stories.js";
import { getUnlockedEndings, getUserSaves } from "../services/saveService.js";
import { supabase } from "../services/supabaseClient.js";

function Profile() {
  const { user, logout } = useAuth();

  const [saves, setSaves] = useState([]);
  const [endings, setEndings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [avatarUrl, setAvatarUrl] = useState(
    user?.user_metadata?.avatar_url || ""
  );

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatarMessage, setAvatarMessage] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");

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
      setAvatarUrl(user?.user_metadata?.avatar_url || "");
    }
  }, [user.id, user?.user_metadata?.avatar_url]);

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

  function handleAvatarSelect(event) {
    const file = event.target.files?.[0];

    setAvatarMessage("");
    setAvatarFile(null);
    setAvatarPreview("");

    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!validTypes.includes(file.type)) {
      setAvatarMessage("Solo puedes subir imágenes JPG, PNG o WEBP.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setAvatarMessage("La imagen no debe pesar más de 2 MB.");
      return;
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  }

  async function handleUploadAvatar(event) {
    event.preventDefault();

    if (!avatarFile) {
      setAvatarMessage("Selecciona una imagen primero.");
      return;
    }

    try {
      setAvatarLoading(true);
      setAvatarMessage("");

      const fileExt = avatarFile.name.split(".").pop();
      const fileName = `avatar-${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, avatarFile, {
          cacheControl: "3600",
          upsert: true,
          contentType: avatarFile.type,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: publicUrlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      const { error: authError } = await supabase.auth.updateUser({
        data: {
          ...user.user_metadata,
          avatar_url: publicUrl,
        },
      });

      if (authError) {
        throw authError;
      }

      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          avatar_url: publicUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (profileError) {
        console.warn("No se pudo actualizar profiles:", profileError.message);
      }

      setAvatarUrl(publicUrl);
      setAvatarFile(null);
      setAvatarPreview("");
      setAvatarMessage("Foto de perfil actualizada correctamente.");
    } catch (error) {
      setAvatarMessage(`Error actualizando foto: ${error.message}`);
    } finally {
      setAvatarLoading(false);
    }
  }

  async function handleChangePassword(event) {
    event.preventDefault();

    setPasswordMessage("");

    if (newPassword.length < 6) {
      setPasswordMessage("La contraseña debe tener mínimo 6 caracteres.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage("Las contraseñas no coinciden.");
      return;
    }

    try {
      setPasswordLoading(true);

      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        throw error;
      }

      setNewPassword("");
      setConfirmPassword("");
      setPasswordMessage("Contraseña actualizada correctamente.");
    } catch (error) {
      setPasswordMessage(`Error actualizando contraseña: ${error.message}`);
    } finally {
      setPasswordLoading(false);
    }
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
            {avatarUrl ? (
              <img className="user-avatar-img" src={avatarUrl} alt={username} />
            ) : (
              <span className="user-avatar">{avatarLetter}</span>
            )}

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
              Revisa tus partidas guardadas, continúa historias pendientes,
              cambia tu foto de perfil y administra tu contraseña.
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

      <section className="profile-settings-grid">
        <article className="profile-box profile-box-premium profile-settings-card">
          <div className="profile-box-header">
            <div>
              <span className="section-eyebrow">Cuenta</span>
              <h2>Foto de perfil</h2>
            </div>
          </div>

          <div className="avatar-settings">
            <div className="profile-avatar-large">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Vista previa" />
              ) : avatarUrl ? (
                <img src={avatarUrl} alt={username} />
              ) : (
                <span>{avatarLetter}</span>
              )}
            </div>

            <form className="profile-form" onSubmit={handleUploadAvatar}>
              <label>
                Seleccionar imagen
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleAvatarSelect}
                />
              </label>

              <button
                className="profile-action-btn"
                type="submit"
                disabled={avatarLoading}
              >
                {avatarLoading ? "Subiendo..." : "Actualizar foto"}
              </button>

              {avatarMessage && (
                <p className="profile-form-message">{avatarMessage}</p>
              )}
            </form>
          </div>
        </article>

        <article className="profile-box profile-box-premium profile-settings-card">
          <div className="profile-box-header">
            <div>
              <span className="section-eyebrow">Seguridad</span>
              <h2>Cambiar contraseña</h2>
            </div>
          </div>

          <form className="profile-form" onSubmit={handleChangePassword}>
            <label>
              Nueva contraseña
              <input
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                minLength="6"
                required
              />
            </label>

            <label>
              Confirmar contraseña
              <input
                type="password"
                placeholder="Repite la contraseña"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                minLength="6"
                required
              />
            </label>

            <button
              className="profile-action-btn"
              type="submit"
              disabled={passwordLoading}
            >
              {passwordLoading ? "Actualizando..." : "Cambiar contraseña"}
            </button>

            {passwordMessage && (
              <p className="profile-form-message">{passwordMessage}</p>
            )}
          </form>
        </article>
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
                    <div
                      className="profile-item profile-item-premium"
                      key={save.id}
                    >
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
                      <div className="ending-medal">★</div>

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