const browserSections = [
  'Starter Lessons',
  'Rhythm Patterns',
  'Sound Design Notes',
  'Mixing Tasks',
];

export function ProjectBrowser() {
  return (
    <div>
      <p className="eyebrow">Browser</p>
      <h2>Learning Assets</h2>
      <ul className="browser-list">
        {browserSections.map((section) => (
          <li key={section}>
            <span className="folder-dot" aria-hidden="true" />
            {section}
          </li>
        ))}
      </ul>
    </div>
  );
}
