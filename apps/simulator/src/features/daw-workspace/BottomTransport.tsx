export function BottomTransport() {
  return (
    <footer className="bottom-transport" aria-label="Bottom transport status">
      <div className="time-readout">
        <strong>0:17</strong>
        <span>.36</span>
        <small>Bar 17</small>
      </div>
      <div className="transport-capsule bottom">
        <button type="button">⏮</button>
        <button className="play-button" type="button">
          ▶
        </button>
        <button type="button">■</button>
        <button className="record-button" type="button">
          ●
        </button>
      </div>
      <div className="system-readout">
        <span>Cloud saved</span>
        <span>CPU 18%</span>
        <span>RAM 25%</span>
      </div>
    </footer>
  );
}
