function ScenePanel({ scene, statusText }) {
    return (
      <article className="scene-panel">
        <div className="scene-image-wrap">
          <img src={scene.image} alt={scene.title} />
  
          <div className="scene-overlay"></div>
  
          <div className="scene-badge">{scene.tag}</div>
  
          <div className="scene-caption">
            <small>{scene.place}</small>
            <h2>{scene.title}</h2>
          </div>
        </div>
  
        <div className="story-content">
          <p>{scene.text}</p>
  
          {scene.ending && (
            <div className="ending-chip">
              {scene.ending}
            </div>
          )}
  
          <div className="save-status">
            {statusText}
          </div>
        </div>
      </article>
    );
  }
  
  export default ScenePanel;