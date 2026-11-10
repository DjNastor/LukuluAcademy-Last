import { arrangementClips } from './workspaceData';

const lanes = ['Drums', 'Bass', 'Chords', 'Melody', 'Vocal', 'FX'];
const colorIcon: Record<string, string> = {
  Drums: '🥁',
  Bass: '🎸',
  Chords: '▤',
  Melody: '✦',
  Vocal: '♬',
  FX: '✣',
};

export function ArrangementView() {
  return (
    <section className="daw-panel arrangement-view" aria-label="Playlist arrangement">
      <div className="panel-titlebar">
        <div>
          <span className="panel-icon">▣</span>
          <h2>Playlist · Arrangement</h2>
        </div>
        <div className="tool-row" aria-label="Arrangement tools">
          {['⌖', '✎', '⌕', '⊞', '⌘'].map((tool) => (
            <button type="button" key={tool}>
              {tool}
            </button>
          ))}
        </div>
      </div>
      <div className="arrangement-ruler" aria-hidden="true">
        {Array.from({ length: 17 }, (_, index) => (
          <span key={index}>{index * 4 + 1}</span>
        ))}
      </div>
      <div className="arrangement-body">
        {lanes.map((lane) => (
          <div className="arrangement-lane" key={lane}>
            <div className="lane-label">
              <span>{colorIcon[lane]}</span>
              <strong>{lane}</strong>
              <button type="button">+</button>
              <button type="button">S</button>
              <button type="button">M</button>
            </div>
            <div className="lane-clips">
              {arrangementClips
                .filter((clip) => clip.lane === lane)
                .map((clip) => (
                  <div
                    className={`arrangement-clip clip-${clip.color}`}
                    key={clip.id}
                    style={{ gridColumn: `${clip.start} / span ${clip.length}` }}
                    title={clip.label}
                  >
                    <span>{clip.label}</span>
                  </div>
                ))}
            </div>
          </div>
        ))}
        <div className="playhead" aria-hidden="true" />
      </div>
    </section>
  );
}
