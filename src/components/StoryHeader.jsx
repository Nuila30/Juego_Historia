function StoryHeader({ chapter, title, description }) {
  return (
    <header className="story-header sketch-header">
      <p className="sketch-chapter">{chapter}</p>
      <h1 className="sketch-title">{title}</h1>
      <p className="sketch-description">{description}</p>
    </header>
  );
}

export default StoryHeader;