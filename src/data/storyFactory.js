// src/data/storyFactory.js

export function createChapters({ cover, titles, chaptersData }) {
  const data =
    chaptersData ||
    (titles || []).map((title) => ({
      title,
      image: cover,
    }));

  return data.map((chapter, index) => {
    const chapterNumber = index + 1;

    return {
      id: `capitulo-${chapterNumber}`,
      chapterNumber,
      label: `Capítulo ${chapterNumber}`,
      title: chapter.title,
      startScene: `cap${chapterNumber}_inicio`,
      status: chapter.status || "available",
      image: chapter.image || cover,
    };
  });
}

export function createScenes({ storyTitle, genre, cover, chapters, chaptersData }) {
  const source =
    chaptersData ||
    (chapters || []).map((chapter) => ({
      title: chapter.title,
      image: chapter.image || cover,
      place: chapter.place,
      text: chapter.text,
      choices: chapter.choices,
      status: chapter.status,
    }));

  const scenes = {};

  source.forEach((chapter, index) => {
    const chapterNumber = index + 1;
    const isLastChapter = chapterNumber === source.length;
    const currentScene = `cap${chapterNumber}_inicio`;
    const nextScene = `cap${chapterNumber + 1}_inicio`;

    scenes[currentScene] = {
      chapterNumber,
      headerTitle: "Historia / enunciado",
      headerSubtitle: genre,
      tag: `Capítulo ${chapterNumber}`,
      place: chapter.place || `${storyTitle} — Capítulo ${chapterNumber}`,
      title: chapter.title,
      image: chapter.image || cover,
      text:
        chapter.text ||
        getDefaultSceneText({
          storyTitle,
          chapterTitle: chapter.title,
          chapterNumber,
          isLastChapter,
        }),
      choices:
        chapter.choices ||
        createDefaultChoices({
          storyTitle,
          chapterNumber,
          isLastChapter,
          nextScene,
        }),
    };
  });

  scenes.final_verdadero = {
    chapterNumber: source.length,
    headerTitle: "Final desbloqueado",
    headerSubtitle: "Final verdadero",
    tag: "Final",
    place: "La verdad revelada",
    title: "Final: La verdad sale a la luz",
    image: cover,
    text: `Después de reunir cada pista, decides contar la verdad completa.

Nadie queda igual después de esa confesión.

${storyTitle} termina con heridas abiertas, secretos revelados y una verdad imposible de enterrar.`,
    ending: "Final verdadero",
    choices: [],
  };

  scenes.final_secreto = {
    chapterNumber: source.length,
    headerTitle: "Final desbloqueado",
    headerSubtitle: "Final secreto",
    tag: "Final",
    place: "Un pacto silencioso",
    title: "Final: El secreto permanece",
    image: cover,
    text: `Decides proteger a alguien.

La verdad no desaparece, solo cambia de dueño.

En ${storyTitle}, el silencio también tiene consecuencias.`,
    ending: "Final secreto",
    choices: [],
  };

  scenes.final_oscuro = {
    chapterNumber: source.length,
    headerTitle: "Final desbloqueado",
    headerSubtitle: "Final oscuro",
    tag: "Final",
    place: "La última decisión",
    title: "Final: Dueña de la mentira",
    image: cover,
    text: `Usas las pruebas para controlar el destino de todos.

La historia no termina con justicia.

Termina contigo sosteniendo la verdad como un arma.`,
    ending: "Final oscuro",
    choices: [],
  };

  scenes.finalSinVida = {
    chapterNumber: source.length,
    headerTitle: "Final desbloqueado",
    headerSubtitle: "Final por vida agotada",
    tag: "Final",
    place: "La investigación termina",
    title: "Final: Sin fuerzas",
    image: cover,
    text: `Tu cuerpo no resiste más.

Las heridas, el miedo y las malas decisiones te dejan fuera de la historia antes de llegar a la verdad.`,
    ending: "Final por vida agotada",
    choices: [],
  };

  return scenes;
}

export function createStory({
  id,
  title,
  subtitle,
  genre,
  cover,
  chapterTitles,
  chaptersData,
  status = "available",
}) {
  const normalizedChaptersData =
    chaptersData ||
    (chapterTitles || []).map((chapterTitle) => ({
      title: chapterTitle,
      image: cover,
    }));

  const chapters = createChapters({
    cover,
    chaptersData: normalizedChaptersData,
  });

  return {
    id,
    title,
    subtitle,
    genre,
    status,
    cover,
    startScene: "cap1_inicio",
    chapters,
    scenes: createScenes({
      storyTitle: title,
      genre,
      cover,
      chaptersData: normalizedChaptersData,
    }),
  };
}

function createDefaultChoices({ storyTitle, chapterNumber, isLastChapter, nextScene }) {
  if (isLastChapter) {
    return [
      {
        label: "Resolver la historia con honestidad.",
        next: "final_verdadero",
        effect: {
          honestidad: 3,
          inteligencia: 2,
        },
        addClues: [`verdad_final_${slugify(storyTitle)}`],
      },
      {
        label: "Ocultar la verdad para proteger a alguien.",
        next: "final_secreto",
        effect: {
          confianza: 2,
          honestidad: -2,
        },
        addClues: [`secreto_final_${slugify(storyTitle)}`],
      },
      {
        label: "Usar las pruebas para tu propio beneficio.",
        next: "final_oscuro",
        effect: {
          inteligencia: 1,
          honestidad: -4,
        },
        addItems: [`archivo_privado_${slugify(storyTitle)}`],
      },
    ];
  }

  return [
    {
      label: "Investigar con cuidado antes de avanzar.",
      next: nextScene,
      effect: {
        inteligencia: 1,
        vida: -2,
      },
      addClues: [`pista_capitulo_${chapterNumber}`],
    },
    {
      label: "Confiar en la persona más cercana.",
      next: nextScene,
      effect: {
        confianza: 1,
        honestidad: 1,
      },
    },
    {
      label: "Mentir para obtener información.",
      next: nextScene,
      effect: {
        inteligencia: 1,
        honestidad: -1,
      },
      addItems: [`objeto_capitulo_${chapterNumber}`],
    },
  ];
}

function getDefaultSceneText({
  storyTitle,
  chapterTitle,
  chapterNumber,
  isLastChapter,
}) {
  if (isLastChapter) {
    return `Has llegado al último capítulo de ${storyTitle}.

Todo lo que descubriste apunta hacia una verdad peligrosa.

Las pistas, los objetos y las decisiones tomadas durante la historia ahora pesan sobre ti.

En "${chapterTitle}", deberás decidir si expones la verdad, proteges a alguien o usas el secreto a tu favor.`;
  }

  return `Capítulo ${chapterNumber}: ${chapterTitle}.

La historia de ${storyTitle} se vuelve más peligrosa.

Encuentras nuevas señales, contradicciones y personas que parecen saber más de lo que dicen.

Cada decisión puede darte una pista, quitarte vida o cambiar la confianza de los personajes hacia ti.

Debes avanzar con cuidado: no todo lo que parece una verdad merece ser creído.`;
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}