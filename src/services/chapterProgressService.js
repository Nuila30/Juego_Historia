import { supabase } from "./supabaseClient.js";

export async function getChapterProgress({ userId }) {
  const { data, error } = await supabase
    .from("chapter_progress")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw error;
  }

  return data || [];
}

export async function getStoryChapterProgress({ userId, storyId }) {
  const { data, error } = await supabase
    .from("chapter_progress")
    .select("*")
    .eq("user_id", userId)
    .eq("story_id", storyId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function unlockChapter({ userId, storyId, chapterNumber }) {
  const currentProgress = await getStoryChapterProgress({ userId, storyId });
  const currentHighest = currentProgress?.highest_chapter_unlocked || 1;

  if (chapterNumber <= currentHighest) {
    return currentProgress;
  }

  const { data, error } = await supabase
    .from("chapter_progress")
    .upsert(
      {
        user_id: userId,
        story_id: storyId,
        highest_chapter_unlocked: chapterNumber,
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