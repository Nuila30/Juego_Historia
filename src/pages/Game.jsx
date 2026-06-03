import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";

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

function Game() {
  const { storyId } = useParams();
  const { user } = useAuth();

  const story = stories.find((item) => item.id === storyId);

  const [currentSceneKey, setCurrentSceneKey] = useState(
    story?.startScene || ""
  );

  const [stats, setStats] = useState(initialStats);
  const [gameState, setGameState] = useState(initialGameState);
  const [statusText, setStatusText] = useState("");

  useEffect(() => {
    if (!story) return;

    setCurrentSceneKey(story.startScene);
    setStats(initialStats);
    setGameState(initialGameState);
    setStatusText("");
  }, [storyId]);

  if (!story || story.status !== "available") {
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

  async function handleChoice(choice) {
    const updatedStats = applyChoiceEffects(stats, choice.effect || {});
    const updatedGameState = applyGameStateChanges(gameState, choice);

    setStats(updatedStats);
    setGameState(updatedGameState);
    setStatusText("");

    if (updatedStats.vida <= 0 && story.scenes.finalSinVida) {
      setCurrentSceneKey("finalSinVida");

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
            title={scene.headerTitle}
            subtitle={scene.headerSubtitle}
          />

          <section className="play-area">
            <ScenePanel scene={scene} statusText={statusText} />

            <StatsBox
              stats={stats}
              gameState={gameState}
            />
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