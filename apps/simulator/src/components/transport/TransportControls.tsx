export function TransportControls() {
  return (
    <section
      className="panel transport-panel"
      aria-label="Transport controls placeholder"
    >
      <div>
        <p className="eyebrow">Transport</p>
        <h2>Playback Practice Controls</h2>
      </div>
      <div className="transport-buttons" aria-label="Playback buttons">
        <button type="button" aria-label="Go to start">
          ⏮
        </button>
        <button type="button" aria-label="Play placeholder">
          ▶
        </button>
        <button type="button" aria-label="Stop placeholder">
          ■
        </button>
        <button type="button" aria-label="Record placeholder">
          ●
        </button>
      </div>
    </section>
  );
}
