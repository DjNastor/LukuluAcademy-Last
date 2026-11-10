import { mixerStrips } from './workspaceData';

export function MixerView() {
  return (
    <section className="daw-panel mixer-view" aria-label="Mixer">
      <div className="panel-titlebar">
        <div>
          <h2>Mixer</h2>
        </div>
      </div>
      <div className="mixer-board">
        {mixerStrips.map((strip) => (
          <div className="mixer-channel" key={strip.id}>
            <strong style={{ color: strip.color }}>{strip.name}</strong>
            <div className="pan-knob" aria-label={`${strip.name} pan ${strip.pan}`}>
              <span style={{ transform: `rotate(${strip.pan * 2}deg)` }} />
            </div>
            <div className="level-slot" aria-label={`${strip.name} level ${strip.level}`}>
              <i style={{ height: `${strip.level}%`, backgroundColor: strip.color }} />
            </div>
            <div className="fader-track">
              <span />
            </div>
            <div className="solo-mute">
              <button type="button">S</button>
              <button type="button">M</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
