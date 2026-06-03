function getSaveKey(storyId) {
  return `juego_historias_save_${storyId}`;
}

export function saveGameState(storyId, data) {
  localStorage.setItem(getSaveKey(storyId), JSON.stringify(data));
}

export function loadGameState(storyId) {
  const saved = localStorage.getItem(getSaveKey(storyId));

  if (!saved) {
    return null;
  }

  return JSON.parse(saved);
}

export function clearGameState(storyId) {
  localStorage.removeItem(getSaveKey(storyId));
}