import { useEffect, useMemo, useState } from "react";

const MAX_CHAPTERS = 10;

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

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 9999)}`;
}

function parseList(value) {
  if (!value) return [];

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function storyToForm(story) {
  const source = story || emptyStory;

  const scenesArray = Object.entries(source.scenes || {}).map(
    ([sceneKey, scene]) => ({
      key: sceneKey,
      chapterNumber: scene.chapterNumber || 1,
      headerTitle: scene.headerTitle || "Historia / enunciado",
      headerSubtitle: scene.headerSubtitle || "",
      tag: scene.tag || `Capítulo ${scene.chapterNumber || 1}`,
      place: scene.place || "",
      title: scene.title || "",
      image: scene.image || "",
      text: scene.text || "",
      choices: (scene.choices || []).map((choice) => ({
        label: choice.label || "",
        next: choice.next || "",
        vida: choice.effect?.vida || 0,
        inteligencia: choice.effect?.inteligencia || 0,
        confianza: choice.effect?.confianza || 0,
        honestidad: choice.effect?.honestidad || 0,
        addItemsText: (choice.addItems || []).join(", "),
        addCluesText: (choice.addClues || []).join(", "),
      })),
    })
  );

  return {
    id: source.id || "",
    title: source.title || "",
    subtitle: source.subtitle || "",
    genre: source.genre || "Asesinato / Romance",
    status: source.status || "draft",
    cover: source.cover || "",
    startScene: source.startScene || source.start_scene || "inicio",
    chapters: source.chapters || emptyStory.chapters,
    scenes:
      scenesArray.length > 0
        ? scenesArray
        : Object.entries(emptyStory.scenes).map(([sceneKey, scene]) => ({
            key: sceneKey,
            chapterNumber: scene.chapterNumber || 1,
            headerTitle: scene.headerTitle || "Historia / enunciado",
            headerSubtitle: scene.headerSubtitle || "",
            tag: scene.tag || "Capítulo 1",
            place: scene.place || "",
            title: scene.title || "",
            image: scene.image || "",
            text: scene.text || "",
            choices: [],
          })),
  };
}

function formToStory(form) {
  const scenesObject = {};

  form.scenes.forEach((scene) => {
    scenesObject[scene.key] = {
      chapterNumber: Number(scene.chapterNumber) || 1,
      headerTitle: scene.headerTitle,
      headerSubtitle: scene.headerSubtitle,
      tag: scene.tag,
      place: scene.place,
      title: scene.title,
      image: scene.image,
      text: scene.text,
      choices: scene.choices
        .filter((choice) => choice.label.trim() && choice.next.trim())
        .map((choice) => {
          const effect = {};

          const vida = Number(choice.vida) || 0;
          const inteligencia = Number(choice.inteligencia) || 0;
          const confianza = Number(choice.confianza) || 0;
          const honestidad = Number(choice.honestidad) || 0;

          if (vida !== 0) effect.vida = vida;
          if (inteligencia !== 0) effect.inteligencia = inteligencia;
          if (confianza !== 0) effect.confianza = confianza;
          if (honestidad !== 0) effect.honestidad = honestidad;

          const finalChoice = {
            label: choice.label,
            next: choice.next,
          };

          if (Object.keys(effect).length > 0) {
            finalChoice.effect = effect;
          }

          const items = parseList(choice.addItemsText);
          const clues = parseList(choice.addCluesText);

          if (items.length > 0) finalChoice.addItems = items;
          if (clues.length > 0) finalChoice.addClues = clues;

          return finalChoice;
        }),
    };
  });

  return {
    id: form.id.trim(),
    title: form.title.trim(),
    subtitle: form.subtitle.trim(),
    genre: form.genre.trim(),
    status: form.status,
    cover: form.cover.trim(),
    startScene: form.startScene,
    chapters: form.chapters.map((chapter) => ({
      ...chapter,
      chapterNumber: Number(chapter.chapterNumber) || 1,
    })),
    scenes: scenesObject,
  };
}

function validateStory(story) {
  const errors = [];
  if (story.chapters.length > MAX_CHAPTERS) {
    errors.push(`La historia no puede tener más de ${MAX_CHAPTERS} capítulos.`);
  }
  if (!story.id) errors.push("La historia necesita un ID.");
  if (!story.title) errors.push("La historia necesita un título.");
  if (!story.startScene) errors.push("La historia necesita una escena inicial.");

  const sceneKeys = Object.keys(story.scenes || {});

  if (sceneKeys.length === 0) {
    errors.push("La historia necesita al menos una escena.");
  }

  if (!sceneKeys.includes(story.startScene)) {
    errors.push("La escena inicial no existe en la lista de escenas.");
  }

  story.chapters.forEach((chapter) => {
    if (!sceneKeys.includes(chapter.startScene)) {
      errors.push(`${chapter.label} apunta a una escena que no existe.`);
    }
  });

  sceneKeys.forEach((sceneKey) => {
    const scene = story.scenes[sceneKey];

    scene.choices.forEach((choice) => {
      if (!sceneKeys.includes(choice.next)) {
        errors.push(
          `En la escena "${sceneKey}", una opción apunta a "${choice.next}", pero esa escena no existe.`
        );
      }
    });
  });

  return errors;
}

function StoryBuilderForm({ initialStory, editingStoryId, onSave }) {
  const [form, setForm] = useState(() => storyToForm(initialStory));
  const [errors, setErrors] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    setForm(storyToForm(initialStory));
    setErrors([]);
  }, [initialStory]);

  const previewJson = useMemo(() => {
    return JSON.stringify(formToStory(form), null, 2);
  }, [form]);

  const sceneOptions = form.scenes.map((scene) => scene.key);

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function updateChapter(index, field, value) {
    setForm((current) => {
      const chapters = [...current.chapters];

      chapters[index] = {
        ...chapters[index],
        [field]: value,
      };

      return {
        ...current,
        chapters,
      };
    });
  }

  function addChapter() {
    setForm((current) => {
      if (current.chapters.length >= MAX_CHAPTERS) {
        return current;
      }
  
      const nextNumber = current.chapters.length + 1;
      const sceneKey = `capitulo-${nextNumber}-inicio`;
  
      return {
        ...current,
        chapters: [
          ...current.chapters,
          {
            id: `capitulo-${nextNumber}`,
            chapterNumber: nextNumber,
            label: `Capítulo ${nextNumber}`,
            title: `Capítulo ${nextNumber}`,
            startScene: sceneKey,
            status: "available",
            image: "",
          },
        ],
        scenes: [
          ...current.scenes,
          {
            key: sceneKey,
            chapterNumber: nextNumber,
            headerTitle: "Historia / enunciado",
            headerSubtitle: `Capítulo ${nextNumber}`,
            tag: `Capítulo ${nextNumber}`,
            place: "Nuevo lugar",
            title: `Inicio del capítulo ${nextNumber}`,
            image: "",
            text: "Escribe aquí la escena.",
            choices: [],
          },
        ],
      };
    });
  }

  function removeChapter(index) {
    setForm((current) => {
      if (current.chapters.length === 1) return current;

      return {
        ...current,
        chapters: current.chapters.filter((_, i) => i !== index),
      };
    });
  }

  function updateScene(index, field, value) {
    setForm((current) => {
      const scenes = [...current.scenes];

      scenes[index] = {
        ...scenes[index],
        [field]: value,
      };

      return {
        ...current,
        scenes,
      };
    });
  }

  function addScene() {
    setForm((current) => {
      const sceneKey = createId("escena");

      return {
        ...current,
        scenes: [
          ...current.scenes,
          {
            key: sceneKey,
            chapterNumber: 1,
            headerTitle: "Historia / enunciado",
            headerSubtitle: "",
            tag: "Capítulo 1",
            place: "",
            title: "Nueva escena",
            image: "",
            text: "",
            choices: [],
          },
        ],
      };
    });
  }

  function removeScene(index) {
    setForm((current) => {
      if (current.scenes.length === 1) return current;

      return {
        ...current,
        scenes: current.scenes.filter((_, i) => i !== index),
      };
    });
  }

  function addChoice(sceneIndex) {
    setForm((current) => {
      const scenes = [...current.scenes];

      scenes[sceneIndex] = {
        ...scenes[sceneIndex],
        choices: [
          ...scenes[sceneIndex].choices,
          {
            label: "",
            next: "",
            vida: 0,
            inteligencia: 0,
            confianza: 0,
            honestidad: 0,
            addItemsText: "",
            addCluesText: "",
          },
        ],
      };

      return {
        ...current,
        scenes,
      };
    });
  }

  function updateChoice(sceneIndex, choiceIndex, field, value) {
    setForm((current) => {
      const scenes = [...current.scenes];
      const choices = [...scenes[sceneIndex].choices];

      choices[choiceIndex] = {
        ...choices[choiceIndex],
        [field]: value,
      };

      scenes[sceneIndex] = {
        ...scenes[sceneIndex],
        choices,
      };

      return {
        ...current,
        scenes,
      };
    });
  }

  function removeChoice(sceneIndex, choiceIndex) {
    setForm((current) => {
      const scenes = [...current.scenes];

      scenes[sceneIndex] = {
        ...scenes[sceneIndex],
        choices: scenes[sceneIndex].choices.filter(
          (_, index) => index !== choiceIndex
        ),
      };

      return {
        ...current,
        scenes,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const story = formToStory(form);
    const validationErrors = validateStory(story);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);
    await onSave(story);
  }

  return (
    <form className="story-builder-form" onSubmit={handleSubmit}>
      <div className="builder-section">
        <div className="builder-section-header">
          <div>
            <span className="section-eyebrow">Formulario</span>
            <h3>Datos generales</h3>
          </div>

          <button
            className="admin-small-btn"
            type="button"
            onClick={() => setShowPreview((current) => !current)}
          >
            {showPreview ? "Ocultar JSON" : "Ver JSON"}
          </button>
        </div>

        <div className="builder-grid">
          <label>
            ID de la historia
            <input
              value={form.id}
              onChange={(event) => updateField("id", event.target.value)}
              placeholder="la-herencia-carmesi"
              disabled={Boolean(editingStoryId)}
            />
          </label>

          <label>
            Título
            <input
              value={form.title}
              onChange={(event) => updateField("title", event.target.value)}
              placeholder="La Herencia Carmesí"
            />
          </label>

          <label>
            Género
            <input
              value={form.genre}
              onChange={(event) => updateField("genre", event.target.value)}
              placeholder="Asesinato / Romance"
            />
          </label>

          <label>
            Estado
            <select
              value={form.status}
              onChange={(event) => updateField("status", event.target.value)}
            >
              <option value="draft">Borrador</option>
              <option value="available">Disponible</option>
              <option value="coming-soon">Próximamente</option>
            </select>
          </label>

          <label className="builder-full">
            Subtítulo
            <input
              value={form.subtitle}
              onChange={(event) => updateField("subtitle", event.target.value)}
              placeholder="Una fortuna, una familia rota y un romance peligroso."
            />
          </label>

          <label className="builder-full">
            Imagen de portada
            <input
              value={form.cover}
              onChange={(event) => updateField("cover", event.target.value)}
              placeholder="https://..."
            />
          </label>

          <label>
            Escena inicial
            <select
              value={form.startScene}
              onChange={(event) => updateField("startScene", event.target.value)}
            >
              {sceneOptions.map((sceneKey) => (
                <option key={sceneKey} value={sceneKey}>
                  {sceneKey}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="builder-section">
        <div className="builder-section-header">
          <div>
            <span className="section-eyebrow">Orden</span>
            <h3>Capítulos</h3>
            <p className="builder-help-text">
  Puedes crear hasta {MAX_CHAPTERS} capítulos por historia.
</p>
          </div>

          <button
  className="admin-small-btn"
  type="button"
  onClick={addChapter}
  disabled={form.chapters.length >= MAX_CHAPTERS}
>
  {form.chapters.length >= MAX_CHAPTERS
    ? "Máximo 10 capítulos"
    : "Agregar capítulo"}
</button>
        </div>

        <div className="builder-list">
          {form.chapters.map((chapter, index) => (
            <div className="builder-card" key={chapter.id}>
              <div className="builder-card-header">
                <strong>{chapter.label}</strong>

                <button
                  type="button"
                  onClick={() => removeChapter(index)}
                  disabled={form.chapters.length === 1}
                >
                  Eliminar
                </button>
              </div>

              <div className="builder-grid">
                <label>
                  Número
                  <input
                    type="number"
                    value={chapter.chapterNumber}
                    onChange={(event) =>
                      updateChapter(index, "chapterNumber", event.target.value)
                    }
                  />
                </label>

                <label>
                  Etiqueta
                  <input
                    value={chapter.label}
                    onChange={(event) =>
                      updateChapter(index, "label", event.target.value)
                    }
                  />
                </label>

                <label>
                  Título
                  <input
                    value={chapter.title}
                    onChange={(event) =>
                      updateChapter(index, "title", event.target.value)
                    }
                  />
                </label>

                <label>
                  Estado
                  <select
                    value={chapter.status}
                    onChange={(event) =>
                      updateChapter(index, "status", event.target.value)
                    }
                  >
                    <option value="available">Disponible</option>
                    <option value="locked">Bloqueado</option>
                  </select>
                </label>

                <label>
                  Escena inicial del capítulo
                  <select
                    value={chapter.startScene}
                    onChange={(event) =>
                      updateChapter(index, "startScene", event.target.value)
                    }
                  >
                    {sceneOptions.map((sceneKey) => (
                      <option key={sceneKey} value={sceneKey}>
                        {sceneKey}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Imagen
                  <input
                    value={chapter.image}
                    onChange={(event) =>
                      updateChapter(index, "image", event.target.value)
                    }
                    placeholder="https://..."
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="builder-section">
        <div className="builder-section-header">
          <div>
            <span className="section-eyebrow">Narrativa</span>
            <h3>Escenas y decisiones</h3>
          </div>

          <button className="admin-small-btn" type="button" onClick={addScene}>
            Agregar escena
          </button>
        </div>

        <div className="builder-list">
          {form.scenes.map((scene, sceneIndex) => (
            <div className="builder-card builder-scene-card" key={sceneIndex}>
              <div className="builder-card-header">
                <strong>{scene.key}</strong>

                <button
                  type="button"
                  onClick={() => removeScene(sceneIndex)}
                  disabled={form.scenes.length === 1}
                >
                  Eliminar escena
                </button>
              </div>

              <div className="builder-grid">
                <label>
                  Clave de escena
                  <input
                    value={scene.key}
                    onChange={(event) =>
                      updateScene(sceneIndex, "key", event.target.value)
                    }
                    placeholder="inicio"
                  />
                </label>

                <label>
                  Capítulo
                  <input
                    type="number"
                    value={scene.chapterNumber}
                    onChange={(event) =>
                      updateScene(sceneIndex, "chapterNumber", event.target.value)
                    }
                  />
                </label>

                <label>
                  Tag
                  <input
                    value={scene.tag}
                    onChange={(event) =>
                      updateScene(sceneIndex, "tag", event.target.value)
                    }
                    placeholder="Capítulo 1"
                  />
                </label>

                <label>
                  Lugar
                  <input
                    value={scene.place}
                    onChange={(event) =>
                      updateScene(sceneIndex, "place", event.target.value)
                    }
                  />
                </label>

                <label>
                  Título de escena
                  <input
                    value={scene.title}
                    onChange={(event) =>
                      updateScene(sceneIndex, "title", event.target.value)
                    }
                  />
                </label>

                <label>
                  Subtítulo
                  <input
                    value={scene.headerSubtitle}
                    onChange={(event) =>
                      updateScene(sceneIndex, "headerSubtitle", event.target.value)
                    }
                  />
                </label>

                <label className="builder-full">
                  Imagen
                  <input
                    value={scene.image}
                    onChange={(event) =>
                      updateScene(sceneIndex, "image", event.target.value)
                    }
                    placeholder="https://..."
                  />
                </label>

                <label className="builder-full">
                  Texto de la escena
                  <textarea
                    value={scene.text}
                    onChange={(event) =>
                      updateScene(sceneIndex, "text", event.target.value)
                    }
                    rows="6"
                  />
                </label>
              </div>

              <div className="builder-choice-area">
                <div className="builder-card-header">
                  <strong>Opciones</strong>

                  <button type="button" onClick={() => addChoice(sceneIndex)}>
                    Agregar opción
                  </button>
                </div>

                {scene.choices.length === 0 && (
                  <p className="builder-empty">
                    Esta escena aún no tiene opciones.
                  </p>
                )}

                {scene.choices.map((choice, choiceIndex) => (
                  <div className="builder-choice-card" key={choiceIndex}>
                    <div className="builder-card-header">
                      <strong>Opción {choiceIndex + 1}</strong>

                      <button
                        type="button"
                        onClick={() => removeChoice(sceneIndex, choiceIndex)}
                      >
                        Eliminar
                      </button>
                    </div>

                    <div className="builder-grid">
                      <label className="builder-full">
                        Texto de opción
                        <input
                          value={choice.label}
                          onChange={(event) =>
                            updateChoice(
                              sceneIndex,
                              choiceIndex,
                              "label",
                              event.target.value
                            )
                          }
                        />
                      </label>

                      <label>
                        Ir a escena
                        <select
                          value={choice.next}
                          onChange={(event) =>
                            updateChoice(
                              sceneIndex,
                              choiceIndex,
                              "next",
                              event.target.value
                            )
                          }
                        >
                          <option value="">Seleccionar</option>

                          {sceneOptions.map((sceneKey) => (
                            <option key={sceneKey} value={sceneKey}>
                              {sceneKey}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label>
                        Vida
                        <input
                          type="number"
                          value={choice.vida}
                          onChange={(event) =>
                            updateChoice(
                              sceneIndex,
                              choiceIndex,
                              "vida",
                              event.target.value
                            )
                          }
                        />
                      </label>

                      <label>
                        Inteligencia
                        <input
                          type="number"
                          value={choice.inteligencia}
                          onChange={(event) =>
                            updateChoice(
                              sceneIndex,
                              choiceIndex,
                              "inteligencia",
                              event.target.value
                            )
                          }
                        />
                      </label>

                      <label>
                        Confianza
                        <input
                          type="number"
                          value={choice.confianza}
                          onChange={(event) =>
                            updateChoice(
                              sceneIndex,
                              choiceIndex,
                              "confianza",
                              event.target.value
                            )
                          }
                        />
                      </label>

                      <label>
                        Honestidad
                        <input
                          type="number"
                          value={choice.honestidad}
                          onChange={(event) =>
                            updateChoice(
                              sceneIndex,
                              choiceIndex,
                              "honestidad",
                              event.target.value
                            )
                          }
                        />
                      </label>

                      <label>
                        Objetos que agrega
                        <input
                          value={choice.addItemsText}
                          onChange={(event) =>
                            updateChoice(
                              sceneIndex,
                              choiceIndex,
                              "addItemsText",
                              event.target.value
                            )
                          }
                          placeholder="llave, carta"
                        />
                      </label>

                      <label>
                        Pistas que agrega
                        <input
                          value={choice.addCluesText}
                          onChange={(event) =>
                            updateChoice(
                              sceneIndex,
                              choiceIndex,
                              "addCluesText",
                              event.target.value
                            )
                          }
                          placeholder="copa_envenenada, encaje_rojo"
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {errors.length > 0 && (
        <div className="builder-errors">
          <strong>Corrige estos errores:</strong>

          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {showPreview && (
        <div className="builder-section">
          <div className="builder-section-header">
            <div>
              <span className="section-eyebrow">Vista previa</span>
              <h3>JSON generado</h3>
            </div>
          </div>

          <textarea
            className="builder-json-preview"
            value={previewJson}
            readOnly
            rows="18"
          />
        </div>
      )}

      <button className="profile-action-btn builder-save-btn" type="submit">
        {editingStoryId ? "Guardar cambios" : "Crear historia"}
      </button>
    </form>
  );
}

export default StoryBuilderForm;