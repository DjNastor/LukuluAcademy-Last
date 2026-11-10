const mixerTracks = ['Drums', 'Music', 'Voice', 'Master'];

export function MixerPanel() {
  return (
    <div>
      <p className="eyebrow">Mixer</p>
      <h2>Balance Practice</h2>
      <div className="mixer-strips">
        {mixerTracks.map((track, index) => (
          <div className="mixer-strip" key={track}>
            <span>{track}</span>
            <div className="meter" aria-hidden="true">
              <span style={{ height: `${42 + index * 12}%` }} />
            </div>
            <div className="fader" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}
