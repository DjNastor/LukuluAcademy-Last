import { pianoNotes } from './workspaceData';

const pitches = ['C5', 'A#4', 'G#4', 'G4', 'F4', 'D#4', 'C4', 'A#3'];

export function PianoRollView() {
  return (
    <section className="daw-panel piano-roll-view" aria-label="Piano roll">
      <div className="panel-tabs" role="tablist" aria-label="Lower editor tabs">
        {[
          'Piano Roll',
          'Mixer',
          'Automation',
          'Browser',
          'Notes',
          'AI',
          'Assignments',
          'Comments',
        ].map((tab, index) => (
          <button className={index === 0 ? 'active' : undefined} type="button" key={tab}>
            {tab}
          </button>
        ))}
      </div>
      <div className="piano-editor">
        <div className="piano-keys" aria-hidden="true">
          {pitches.map((pitch) => (
            <span key={pitch}>{pitch}</span>
          ))}
        </div>
        <div className="note-grid">
          {pianoNotes.map((note) => (
            <span
              className="piano-note"
              key={note.id}
              style={{
                gridColumn: `${note.start} / span ${note.length}`,
                gridRow: `${pitches.indexOf(note.pitch) + 1}`,
              }}
            />
          ))}
          <div className="velocity-lane" aria-hidden="true">
            {Array.from({ length: 36 }, (_, index) => (
              <i style={{ height: `${20 + ((index * 13) % 70)}%` }} key={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
