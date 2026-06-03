function ScenePanel({ scene, statusText }) {
  return (
    <section className="scene-panel sketch-scene-panel">
      <div className="scene-image-wrap sketch-image-wrap">
        <img src={scene.image} alt={scene.title} />
      </div>

      <div className="story-content sketch-story-content">
        <p>{scene.text}</p>

        {scene.ending && (
          <div className="ending-chip">
            {scene.ending}
          </div>
        )}

        {statusText && (
          <p className="save-status">{statusText}</p>
        )}
      </div>
    </section>
  );
}

export default ScenePanel;