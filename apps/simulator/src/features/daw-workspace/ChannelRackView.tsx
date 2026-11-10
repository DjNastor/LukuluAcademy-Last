import type { ChannelTrack } from './workspaceData';

interface ChannelRackViewProps {
  activeStepCount: number;
  onResetPattern: () => void;
  onToggleStep: (trackId: string, stepIndex: number) => void;
  tracks: ChannelTrack[];
}

export function ChannelRackView({
  activeStepCount,
  onResetPattern,
  onToggleStep,
  tracks,
}: ChannelRackViewProps) {
  return (
    <section
      className="daw-panel channel-rack-view"
      aria-label="Channel rack step sequencer"
    >
      <div className="panel-titlebar">
        <div>
          <h2>Channel Rack</h2>
          <span>{activeStepCount} active steps</span>
        </div>
        <div className="mini-controls">
          <button className="ghost-button" type="button" onClick={onResetPattern}>
            Reset
          </button>
          <span>Swing</span>
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="32"
            aria-label="Swing amount"
          />
          <span>Velocity</span>
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="58"
            aria-label="Velocity amount"
          />
        </div>
      </div>
      <div className="channel-rack-table">
        {tracks.map((track) => (
          <div className="daw-channel-row" key={track.id}>
            <div className="channel-name">
              <span>{track.icon}</span>
              <strong>{track.name}</strong>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              defaultValue={track.volume}
              aria-label={`${track.name} volume`}
            />
            <div className="daw-steps" aria-label={`${track.name} pattern`}>
              {track.pattern.map((active, index) => (
                <button
                  type="button"
                  className={active ? 'active' : undefined}
                  style={active ? { backgroundColor: track.color } : undefined}
                  key={`${track.id}-${index}`}
                  aria-label={`${track.name} step ${index + 1} ${active ? 'on' : 'off'}`}
                  aria-pressed={active}
                  onClick={() => onToggleStep(track.id, index)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
