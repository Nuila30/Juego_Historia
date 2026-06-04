import { supabase } from "./supabaseClient.js";

export async function checkIsAdmin() {
  const { data, error } = await supabase.rpc("is_admin");

  if (error) {
    console.error("Error checkIsAdmin:", error.message);
    return false;
  }

  return Boolean(data);
}

export async function getAllPlayers() {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, avatar_url, role, created_at, updated_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error getAllPlayers:", error.message);
    return [];
  }

  return data || [];
}

export async function getAllChapterProgress() {
  const { data, error } = await supabase
    .from("chapter_progress")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Error getAllChapterProgress:", error.message);
    return [];
  }

  return data || [];
}

export async function getAllGameSaves() {
  const { data, error } = await supabase
    .from("game_saves")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Error getAllGameSaves:", error.message);
    return [];
  }

  return data || [];
}

export async function getAdminStories() {
  const { data, error } = await supabase
    .from("story_library")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Error getAdminStories:", error.message);
    return [];
  }

  return data || [];
}

export async function createAdminStory({ userId, story }) {
  const { data, error } = await supabase
    .from("story_library")
    .insert({
      id: story.id,
      title: story.title,
      subtitle: story.subtitle,
      genre: story.genre,
      status: story.status || "draft",
      cover: story.cover,
      start_scene: story.startScene || "inicio",
      story_data: story,
      created_by: userId,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateAdminStory({ storyId, story }) {
  const { data, error } = await supabase
    .from("story_library")
    .update({
      title: story.title,
      subtitle: story.subtitle,
      genre: story.genre,
      status: story.status || "draft",
      cover: story.cover,
      start_scene: story.startScene || "inicio",
      story_data: story,
      updated_at: new Date().toISOString(),
    })
    .eq("id", storyId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteAdminStory({ storyId }) {
  const { error } = await supabase
    .from("story_library")
    .delete()
    .eq("id", storyId);

  if (error) {
    throw error;
  }
}
export async function updateAdminGameSave({
  saveId,
  stats,
  inventory,
  clues,
  flags,
}) {
  const { data, error } = await supabase
    .from("game_saves")
    .update({
      stats,
      inventory,
      clues,
      flags: flags || {},
      updated_at: new Date().toISOString(),
    })
    .eq("id", saveId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
export async function resetAdminPlayerProgress({ userId, storyId }) {
  const { error: saveError } = await supabase
    .from("game_saves")
    .delete()
    .eq("user_id", userId)
    .eq("story_id", storyId);

  if (saveError) {
    throw saveError;
  }

  const { error: chapterError } = await supabase
    .from("chapter_progress")
    .delete()
    .eq("user_id", userId)
    .eq("story_id", storyId);

  if (chapterError) {
    throw chapterError;
  }

  const { error: endingError } = await supabase
    .from("unlocked_endings")
    .delete()
    .eq("user_id", userId)
    .eq("story_id", storyId);

  if (endingError) {
    console.warn("No se pudieron borrar finales:", endingError.message);
  }

  return true;
}