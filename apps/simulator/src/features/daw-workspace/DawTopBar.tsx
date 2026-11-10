import { DawLogo } from './DawLogo';

interface DawTopBarProps {
  progress: number;
}

export function DawTopBar({ progress }: DawTopBarProps) {
  return (
    <header className="daw-topbar">
      <DawLogo />
      <label className="project-select">
        <span>Project</span>
        <select defaultValue="Afro House Groove" aria-label="Project selection">
          <option>Afro House Groove</option>
          <option>Three Step Lesson</option>
          <option>Beginner Beat Sketch</option>
        </select>
      </label>
      <div className="daw-action-group" aria-label="Undo and save status">
        <button type="button">↶</button>
        <button type="button">↷</button>
        <span className="saved-dot">Saved</span>
      </div>
      <div className="transport-capsule" aria-label="Transport controls">
        <button type="button">⏮</button>
        <button className="play-button" type="button">
          ▶
        </button>
        <button type="button">■</button>
        <button className="record-button" type="button">
          ●
        </button>
      </div>
      <div className="tempo-box">
        <strong>120.00</strong>
        <span>BPM</span>
      </div>
      <div className="tempo-box">
        <strong>4/4</strong>
        <span>Time</span>
      </div>
      <button className="lesson-toggle" type="button">
        Lesson Mode
      </button>
      <div className="progress-widget">
        <span>Progress</span>
        <div>
          <i style={{ width: `${progress}%` }} />
        </div>
        <strong>{progress}%</strong>
      </div>
      <div className="student-chip">
        <span>DN</span>
        <div>
          <strong>Nastor</strong>
          <small>Student</small>
        </div>
      </div>
    </header>
  );
}
