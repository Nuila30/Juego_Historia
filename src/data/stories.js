import { demoStory } from "./demoStory.js";
import { herenciaCarmesi } from "./herenciaCarmesi.js";

export const stories = [
  {
    ...demoStory,
    genre: "Asesinato / Romance",
    status: "available",
    cover:
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=1200&q=80",
  },
  herenciaCarmesi,
  {
    id: "cartas-del-amante",
    title: "Cartas del Amante",
    subtitle: "Un romance secreto escrito antes del asesinato",
    genre: "Romance / Misterio",
    status: "coming-soon",
    cover:
      "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?auto=format&fit=crop&w=1200&q=80",
  },
];