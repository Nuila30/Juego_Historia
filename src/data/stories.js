import { demoStory } from "./demoStory.js";

export const stories = [
  {
    ...demoStory,
    id: "sangre-y-rosas",
    title: "Sangre y Rosas",
    subtitle:
      "Un crimen en una mansión, amantes ocultos y una verdad peligrosa.",
    genre: "Asesinato / Romance",
    status: "available",
    cover:
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=1200&q=80",
    startScene: "inicio",
    chapters: [
      {
        id: "capitulo-1",
        chapterNumber: 1,
        label: "Capítulo 1",
        title: "La noche del crimen",
        startScene: "inicio",
        status: "available",
        image:
          "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "capitulo-2",
        chapterNumber: 2,
        label: "Capítulo 2",
        title: "La escena del crimen",
        startScene: "biblioteca",
        status: "available",
        image:
          "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "capitulo-3",
        chapterNumber: 3,
        label: "Capítulo 3",
        title: "El amante que oculta algo",
        startScene: "pacto",
        status: "available",
        image:
          "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "capitulo-4",
        chapterNumber: 4,
        label: "Capítulo 4",
        title: "La verdad final",
        startScene: "verdadFinal",
        status: "available",
        image:
          "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },

  {
    id: "la-herencia-carmesi",
    title: "La Herencia Carmesí",
    subtitle: "Una fortuna, una familia rota y un romance peligroso.",
    genre: "Asesinato / Romance",
    status: "coming-soon",
    cover:
      "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?auto=format&fit=crop&w=1200&q=80",
    startScene: "inicio",
    scenes: {},
    chapters: [
      {
        id: "capitulo-1",
        chapterNumber: 1,
        label: "Capítulo 1",
        title: "El testamento",
        startScene: "inicio",
        status: "locked",
        image:
          "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "capitulo-2",
        chapterNumber: 2,
        label: "Capítulo 2",
        title: "La habitación prohibida",
        startScene: "habitacion",
        status: "locked",
        image:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "capitulo-3",
        chapterNumber: 3,
        label: "Capítulo 3",
        title: "La amante escondida",
        startScene: "amante",
        status: "locked",
        image:
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "capitulo-4",
        chapterNumber: 4,
        label: "Capítulo 4",
        title: "Sangre en la herencia",
        startScene: "final",
        status: "locked",
        image:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
];