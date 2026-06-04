import { supabase } from "./supabaseClient.js";
import { stories as localStories } from "../data/stories.js";

function normalizeStoryRow(row) {
  const storyData = row.story_data || {};

  return {
    ...storyData,
    id: row.id,
    title: row.title || storyData.title,
    subtitle: row.subtitle || storyData.subtitle,
    genre: row.genre || storyData.genre,
    status: row.status || storyData.status || "draft",
    cover: row.cover || storyData.cover,
    startScene: row.start_scene || storyData.startScene || "cap1_inicio",
    scenes: storyData.scenes || {},
    chapters: storyData.chapters || [],
  };
}

function isValidDatabaseStory(story) {
  return (
    story &&
    Array.isArray(story.chapters) &&
    story.chapters.length > 0 &&
    story.scenes &&
    Object.keys(story.scenes).length > 0
  );
}

export async function getDatabaseStories() {
  const { data, error } = await supabase
    .from("story_library")
    .select("*")
    .in("status", ["available", "draft"])
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Error cargando historias de Supabase:", error.message);
    return [];
  }

  return (data || []).map(normalizeStoryRow);
}

export async function getPlayableStories() {
  const databaseStories = await getDatabaseStories();

  const storyMap = new Map();

  localStories.forEach((story) => {
    storyMap.set(story.id, story);
  });

  databaseStories.forEach((story) => {
    /*
      Solo sobrescribe la historia local si la historia de Supabase
      tiene capítulos y escenas válidas.
      Así una historia vacía del panel no rompe el Home.
    */
    if (isValidDatabaseStory(story)) {
      storyMap.set(story.id, story);
    }
  });

  return Array.from(storyMap.values());
}

export async function getPlayableStoryById(storyId) {
  const localStory = localStories.find((story) => story.id === storyId);

  const { data, error } = await supabase
    .from("story_library")
    .select("*")
    .eq("id", storyId)
    .maybeSingle();

  if (error) {
    console.error("Error buscando historia:", error.message);
    return localStory || null;
  }

  if (!data) {
    return localStory || null;
  }

  const databaseStory = normalizeStoryRow(data);

  if (isValidDatabaseStory(databaseStory)) {
    return databaseStory;
  }

  return localStory || null;
}