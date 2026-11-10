export function TopHeader() {
  return (
    <header className="top-header">
      <div>
        <p className="eyebrow">Lukulu Academy</p>
        <h1>DAW Learning Lab</h1>
      </div>
      <div className="header-actions" aria-label="Project actions">
        <span className="project-badge">Foundation Phase</span>
        <button type="button">Save Lesson</button>
      </div>
    </header>
  );
}
