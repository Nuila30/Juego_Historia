import { checkRequirements } from "../utils/gameRules.js";

function Choices({
  scene,
  stats,
  gameState,
  onChoice,
  onRestart,
  onSaveEnding,
}) {
  if (scene.ending) {
    return (
      <section className="end-actions">
        <button className="choice-btn choice-btn-final" onClick={onRestart}>
          Volver a jugar
        </button>

        <button className="choice-btn choice-btn-final" onClick={onSaveEnding}>
          Guardar este final
        </button>
      </section>
    );
  }

  return (
    <section className="choices-row choices-row-premium">
      {scene.choices?.map((choice, index) => {
        const validation = checkRequirements(choice, gameState, stats);

        return (
          <button
            key={index}
            className={`choice-btn choice-btn-premium ${
              !validation.allowed ? "choice-disabled" : ""
            }`}
            disabled={!validation.allowed}
            onClick={() => onChoice(choice)}
          >
            <span className="choice-number">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="choice-label">{choice.label}</span>

            {!validation.allowed && (
              <small className="choice-lock">
                {validation.reason}
              </small>
            )}
          </button>
        );
      })}
    </section>
  );
}

export default Choices;