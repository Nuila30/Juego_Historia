import { useEffect, useState } from "react";
import { Navigate, useParams, useSearchParams } from "react-router";

import Sidebar from "../components/Sidebar.jsx";
import StoryHeader from "../components/StoryHeader.jsx";
import ScenePanel from "../components/ScenePanel.jsx";
import StatsBox from "../components/StatsBox.jsx";
import Choices from "../components/Choices.jsx";

import { initialStats, initialGameState } from "../data/demoStory.js";
import { useAuth } from "../context/AuthContext.jsx";
import { getPlayableStoryById } from "../services/storyLibraryService.js";

import {
  unlockChapter,
  getStoryChapterProgress,
} from "../services/chapterProgressService.js";

import {
  saveProgress,
  loadProgress,
  deleteProgress,
  saveUnlockedEnding,
} from "../services/saveService.js";

import {
  applyChoiceEffects,
  applyGameStateChanges,
} from "../utils/gameRules.js";

function getChapterNumberFromScene(story, sceneKey, scene) {
  if (!story || !sceneKey) return 1;

  if (scene?.chapterNumber) {
    return scene.chapterNumber;
  }

  const chapterFromList = story.chapters?.find(
    (chapter) => chapter.startScene === sceneKey
  );

  if (chapterFromList?.chapterNumber) {
    return chapterFromList.chapterNumber;
  }

  const tag = scene?.tag || "";
  const title = scene?.title || "";
  const textToCheck = `${tag} ${title}`.toLowerCase();

  if (textToCheck.includes("final")) return 4;
  if (textToCheck.includes("4")) return 4;
  if (textToCheck.includes("3")) return 3;
  if (textToCheck.includes("2")) return 2;

  return 1;
}

function Game() {
  const { storyId } = useParams();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  const requestedScene = searchParams.get("scene");

  const [story, setStory] = useState(null);
  const [currentSceneKey, setCurrentSceneKey] = useState("");
  const [stats, setStats] = useState(initialStats);
  const [gameState, setGameState] = useState(initialGameState);
  const [statusText, setStatusText] = useState("");

  const [allowedChapter, setAllowedChapter] = useState(1);
  const [checkingChapterAccess, setCheckingChapterAccess] = useState(true);
  const [loadingGame, setLoadingGame] = useState(true);

  function getInitialScene(loadedStory) {
    if (loadedStory?.scenes?.[requestedScene]) {
      return requestedScene;
    }

    return loadedStory?.startScene || "";
  }

  useEffect(() => {
    async function prepareGame() {
      if (!user?.id || !storyId) {
        setLoadingGame(false);
        return;
      }

      try {
        setLoadingGame(true);

        const loadedStory = await getPlayableStoryById(storyId);

        if (!loadedStory || loadedStory.status !== "available") {
          setStory(null);
          return;
        }

        setStory(loadedStory);

        const saved = await loadProgress({
          userId: user.id,
          storyId: loadedStory.id,
        });

        const initialScene = getInitialScene(loadedStory);

        setCurrentSceneKey(initialScene);

        if (saved) {
          setStats(saved.stats || initialStats);

          setGameState({
            inventory: saved.inventory || [],
            clues: saved.clues || [],
            flags: saved.flags || {},
          });
        } else {
          setStats(initialStats);
          setGameState(initialGameState);
        }

        setStatusText("");
      } catch (error) {
        console.error("Error preparando partida:", error.message);
        setStory(null);
      } finally {
        setLoadingGame(false);
      }
    }

    prepareGame();
  }, [storyId, requestedScene, user?.id]);

  useEffect(() => {
    async function checkChapterAccess() {
      if (!user?.id || !story?.id) {
        setCheckingChapterAccess(false);
        return;
      }

      try {
        setCheckingChapterAccess(true);

        const progress = await getStoryChapterProgress({
          userId: user.id,
          storyId: story.id,
        });

        setAllowedChapter(progress?.highest_chapter_unlocked || 1);
      } catch (error) {
        console.error("Error verificando acceso:", error.message);
        setAllowedChapter(1);
      } finally {
        setCheckingChapterAccess(false);
      }
    }

    checkChapterAccess();
  }, [user?.id, story?.id]);

  if (loadingGame || checkingChapterAccess) {
    return (
      <main className="auth-page">
        <section className="auth-card">
          <span className="home-kicker">Verificando acceso</span>
          <h1>Cargando...</h1>
          <p>Estamos revisando tu progreso y capítulos desbloqueados.</p>
        </section>
      </main>
    );
  }

  if (!story || story.status !== "available") {
    return <Navigate to="/historias" replace />;
  }

  const requestedSceneData = requestedScene
    ? story.scenes?.[requestedScene]
    : null;

  const requestedChapterNumber = getChapterNumberFromScene(
    story,
    requestedScene,
    requestedSceneData
  );

  if (requestedScene && requestedChapterNumber > allowedChapter) {
    return <Navigate to="/historias" replace />;
  }

  const scene = story.scenes[currentSceneKey];

  if (!scene) {
    return (
      <main className="auth-page">
        <section className="auth-card">
          <span className="home-kicker">Error de historia</span>
          <h1>Escena no encontrada</h1>
          <p>
            La escena <strong>{currentSceneKey}</strong> no existe en esta
            historia.
          </p>
        </section>
      </main>
    );
  }

  async function autoSaveGame(nextSceneKey, nextStats, nextGameState) {
    await saveProgress({
      userId: user.id,
      storyId: story.id,
      currentSceneKey: nextSceneKey,
      stats: nextStats,
      inventory: nextGameState.inventory,
      clues: nextGameState.clues,
      flags: nextGameState.flags,
    });
  }

  async function unlockOnlyNextChapter(currentChapter, nextChapter) {
    if (nextChapter !== currentChapter + 1) {
      return;
    }

    try {
      const progress = await unlockChapter({
        userId: user.id,
        storyId: story.id,
        chapterNumber: nextChapter,
      });

      setAllowedChapter(progress?.highest_chapter_unlocked || nextChapter);
    } catch (error) {
      console.error("Error desbloqueando capítulo:", error.message);
    }
  }

  async function handleChoice(choice) {
    const nextScene = story.scenes[choice.next];

    if (!nextScene) {
      setStatusText("La siguiente escena no existe.");
      return;
    }

    const currentChapter = getChapterNumberFromScene(
      story,
      currentSceneKey,
      scene
    );

    const nextChapter = getChapterNumberFromScene(
      story,
      choice.next,
      nextScene
    );

    if (nextChapter > currentChapter + 1) {
      setStatusText(
        `Esta decisión pertenece a un capítulo avanzado. Primero debes completar el Capítulo ${currentChapter}.`
      );
      return;
    }

    const updatedStats = applyChoiceEffects(stats, choice.effect || {});
    const updatedGameState = applyGameStateChanges(gameState, choice);

    let finalSceneKey = choice.next;
    let finalScene = nextScene;

    if (updatedStats.vida <= 0 && story.scenes.finalSinVida) {
      finalSceneKey = "finalSinVida";
      finalScene = story.scenes.finalSinVida;
    }

    setStats(updatedStats);
    setGameState(updatedGameState);
    setCurrentSceneKey(finalSceneKey);
    setStatusText("");

    try {
      await autoSaveGame(finalSceneKey, updatedStats, updatedGameState);
    } catch (error) {
      console.error("Error guardando automáticamente:", error.message);
    }

    const finalChapter = getChapterNumberFromScene(
      story,
      finalSceneKey,
      finalScene
    );

    await unlockOnlyNextChapter(currentChapter, finalChapter);

    if (finalScene?.ending) {
      try {
        await saveUnlockedEnding({
          userId: user.id,
          storyId: story.id,
          endingKey: finalSceneKey,
          endingName: finalScene.ending,
        });
      } catch (error) {
        console.error("Error guardando final:", error.message);
      }
    }
  }

  async function handleSave() {
    try {
      await saveProgress({
        userId: user.id,
        storyId: story.id,
        currentSceneKey,
        stats,
        inventory: gameState.inventory,
        clues: gameState.clues,
        flags: gameState.flags,
      });

      setStatusText("Partida guardada correctamente en la base de datos.");
    } catch (error) {
      setStatusText(`Error al guardar: ${error.message}`);
    }
  }

  async function handleLoad() {
    try {
      const saved = await loadProgress({
        userId: user.id,
        storyId: story.id,
      });

      if (!saved) {
        setStatusText("No hay una partida guardada para esta historia.");
        return;
      }

      setCurrentSceneKey(saved.current_scene_key);
      setStats(saved.stats || initialStats);

      setGameState({
        inventory: saved.inventory || [],
        clues: saved.clues || [],
        flags: saved.flags || {},
      });

      setStatusText("Partida cargada correctamente desde la base de datos.");
    } catch (error) {
      setStatusText(`Error al cargar: ${error.message}`);
    }
  }

  async function handleReset() {
    const confirmReset = confirm("¿Seguro que deseas reiniciar esta historia?");

    if (!confirmReset) return;

    try {
      await deleteProgress({
        userId: user.id,
        storyId: story.id,
      });

      setCurrentSceneKey(story.startScene);
      setStats(initialStats);
      setGameState(initialGameState);
      setStatusText("La historia fue reiniciada.");
    } catch (error) {
      setStatusText(`Error al reiniciar: ${error.message}`);
    }
  }

  function handleRestartFromEnding() {
    setCurrentSceneKey(story.startScene);
    setStats(initialStats);
    setGameState(initialGameState);
    setStatusText("");
  }

  return (
    <div className="frame">
      <main className="game-layout">
        <Sidebar
          onSave={handleSave}
          onLoad={handleLoad}
          onReset={handleReset}
        />

        <section className="main-area">
          <StoryHeader
            chapter={scene.tag}
            title={scene.title}
            description={scene.headerSubtitle}
          />

          <section className="play-area">
            <ScenePanel scene={scene} statusText={statusText} />

            <StatsBox stats={stats} gameState={gameState} />
          </section>

          <Choices
            scene={scene}
            stats={stats}
            gameState={gameState}
            onChoice={handleChoice}
            onRestart={handleRestartFromEnding}
            onSaveEnding={handleSave}
          />
        </section>
      </main>
    </div>
  );
}

export default Game;