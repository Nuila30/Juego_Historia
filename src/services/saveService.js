import { supabase } from "./supabaseClient.js";

export async function saveProgress({
  userId,
  storyId,
  currentSceneKey,
  stats,
  inventory,
  clues,
  flags,
}) {
  const { data, error } = await supabase
    .from("game_saves")
    .upsert(
      {
        user_id: userId,
        story_id: storyId,
        current_scene_key: currentSceneKey,
        stats,
        inventory,
        clues,
        flags,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id,story_id",
      }
    )
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function loadProgress({ userId, storyId }) {
  const { data, error } = await supabase
    .from("game_saves")
    .select("*")
    .eq("user_id", userId)
    .eq("story_id", storyId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteProgress({ userId, storyId }) {
  const { error } = await supabase
    .from("game_saves")
    .delete()
    .eq("user_id", userId)
    .eq("story_id", storyId);

  if (error) {
    throw error;
  }
}

export async function saveUnlockedEnding({
  userId,
  storyId,
  endingKey,
  endingName,
}) {
  const { data, error } = await supabase
    .from("unlocked_endings")
    .upsert(
      {
        user_id: userId,
        story_id: storyId,
        ending_key: endingKey,
        ending_name: endingName,
        unlocked_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id,story_id,ending_key",
      }
    )
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getUnlockedEndings({ userId, storyId }) {
  let query = supabase
    .from("unlocked_endings")
    .select("*")
    .eq("user_id", userId)
    .order("unlocked_at", { ascending: false });

  if (storyId) {
    query = query.eq("story_id", storyId);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data;
}

export async function getUserSaves({ userId }) {
  const { data, error } = await supabase
    .from("game_saves")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}