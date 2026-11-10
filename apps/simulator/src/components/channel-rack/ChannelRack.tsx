const channels = ['Kick concept', 'Clap concept', 'Hat concept', 'Bass concept'];

export function ChannelRack() {
  return (
    <section className="panel channel-rack" aria-label="Channel rack placeholder">
      <p className="eyebrow">Channel Rack</p>
      <h2>Pattern Builder Placeholder</h2>
      <div className="channel-list">
        {channels.map((channel) => (
          <div className="channel-row" key={channel}>
            <span>{channel}</span>
            <div className="step-grid" aria-hidden="true">
              {Array.from({ length: 8 }, (_, index) => (
                <span key={index} className={index % 3 === 0 ? 'step active' : 'step'} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
