const lanes = ['Intro', 'Groove', 'Variation', 'Review Marker'];

export function PlaylistTimeline() {
  return (
    <section
      className="panel playlist-panel"
      aria-label="Playlist and timeline placeholder"
    >
      <p className="eyebrow">Playlist</p>
      <h2>Arrangement Timeline Placeholder</h2>
      <div className="timeline-ruler" aria-hidden="true">
        {Array.from({ length: 8 }, (_, index) => (
          <span key={index}>{index + 1}</span>
        ))}
      </div>
      <div className="playlist-lanes">
        {lanes.map((lane, index) => (
          <div className="playlist-lane" key={lane}>
            <span>{lane}</span>
            <div className={`clip clip-${index + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
}
