function StoryHeader({ title, subtitle }) {
    return (
      <header className="story-header">
        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </header>
    );
  }
  
  export default StoryHeader;