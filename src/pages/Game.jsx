import { useEffect, useState } from "react";
import { Navigate, useParams, useSearchParams } from "react-router";

import Sidebar from "../components/Sidebar.jsx";
import StoryHeader from "../components/StoryHeader.jsx";
import ScenePanel from "../components/ScenePanel.jsx";
import StatsBox from "../components/StatsBox.jsx";
import Choices from "../components/Choices.jsx";

import { initialStats, initialGameState } from "../data/demoStory.js";
import { stories } from "../data/stories.js";
import { useAuth } from "../context/AuthContext.jsx";

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

import {
  unlockChapter,
  getStoryChapterProgress,
} from "../services/chapterProgressService.js";

function getChapterNumberFromScene(story, sceneKey, scene) {
  if (!story || !sceneKey) return 1;

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

  const story = stories.find((item) => item.id === storyId);
  const requestedScene = searchParams.get("scene");

  const [currentSceneKey, setCurrentSceneKey] = useState("");
  const [stats, setStats] = useState(initialStats);
  const [gameState, setGameState] = useState(initialGameState);
  const [statusText, setStatusText] = useState("");

  const [allowedChapter, setAllowedChapter] = useState(1);
  const [checkingChapterAccess, setCheckingChapterAccess] = useState(true);

  function getInitialScene() {
    if (story?.scenes?.[requestedScene]) {
      return requestedScene;
    }

    return story?.startScene || "";
  }

  useEffect(() => {
    if (!story) return;

    setCurrentSceneKey(getInitialScene());
    setStats(initialStats);
    setGameState(initialGameState);
    setStatusText("");
  }, [storyId, requestedScene]);

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

  if (!story || story.status !== "available") {
    return <Navigate to="/historias" replace />;
  }

  if (checkingChapterAccess) {
    return (
      <main className="auth-page">
        <section className="auth-card">
          <span className="home-kicker">Verificando acceso</span>
          <h1>Cargando...</h1>
          <p>Estamos revisando los capítulos desbloqueados.</p>
        </section>
      </main>
    );
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

  async function unlockSceneChapter(nextSceneKey) {
    const nextScene = story.scenes[nextSceneKey];

    const nextChapterNumber = getChapterNumberFromScene(
      story,
      nextSceneKey,
      nextScene
    );

    try {
      await unlockChapter({
        userId: user.id,
        storyId: story.id,
        chapterNumber: nextChapterNumber,
      });

      setAllowedChapter((current) => Math.max(current, nextChapterNumber));
    } catch (error) {
      console.error("Error desbloqueando capítulo:", error.message);
    }
  }

  async function handleChoice(choice) {
    const updatedStats = applyChoiceEffects(stats, choice.effect || {});
    const updatedGameState = applyGameStateChanges(gameState, choice);

    setStats(updatedStats);
    setGameState(updatedGameState);
    setStatusText("");

    if (updatedStats.vida <= 0 && story.scenes.finalSinVida) {
      setCurrentSceneKey("finalSinVida");

      await unlockSceneChapter("finalSinVida");

      try {
        await saveUnlockedEnding({
          userId: user.id,
          storyId: story.id,
          endingKey: "finalSinVida",
          endingName: story.scenes.finalSinVida.ending,
        });
      } catch (error) {
        console.error("Error guardando final:", error.message);
      }

      return;
    }

    setCurrentSceneKey(choice.next);

    await unlockSceneChapter(choice.next);

    const nextScene = story.scenes[choice.next];

    if (nextScene?.ending) {
      try {
        await saveUnlockedEnding({
          userId: user.id,
          storyId: story.id,
          endingKey: choice.next,
          endingName: nextScene.ending,
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

      await unlockSceneChapter(saved.current_scene_key);

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