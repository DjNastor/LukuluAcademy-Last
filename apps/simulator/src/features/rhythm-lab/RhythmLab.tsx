import { useMemo, useState } from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatPill } from '../../components/ui/StatPill';
import { starterPattern, type RhythmStep } from './rhythmPattern';

function clonePattern(pattern: RhythmStep[]) {
  return pattern.map((track) => ({ ...track, pattern: [...track.pattern] }));
}

export function RhythmLab() {
  const [tracks, setTracks] = useState(() => clonePattern(starterPattern));
  const [selectedStep, setSelectedStep] = useState(1);

  const activeSteps = useMemo(
    () =>
      tracks.reduce((total, track) => total + track.pattern.filter(Boolean).length, 0),
    [tracks],
  );

  const grooveScore = Math.min(100, Math.round((activeSteps / 16) * 100));

  const toggleStep = (trackId: string, stepIndex: number) => {
    setTracks((currentTracks) =>
      currentTracks.map((track) =>
        track.id === trackId
          ? {
              ...track,
              pattern: track.pattern.map((isActive, index) =>
                index === stepIndex ? !isActive : isActive,
              ),
            }
          : track,
      ),
    );
    setSelectedStep(stepIndex + 1);
  };

  const resetPattern = () => setTracks(clonePattern(starterPattern));

  return (
    <div className="page-stack rhythm-lab">
      <PageHeader
        eyebrow="Simulator MVP"
        title="Rhythm Lab: step pattern practice"
        description="Toggle neutral placeholder steps to learn how a simple groove is distributed across an 8-step grid. No proprietary DAW assets or audio are used."
      />

      <section className="rhythm-summary" aria-label="Rhythm lab summary">
        <StatPill label="Selected step" value={String(selectedStep)} />
        <StatPill label="Active steps" value={String(activeSteps)} />
        <StatPill label="Groove density" value={`${grooveScore}%`} />
      </section>

      <section className="panel rhythm-panel" aria-label="Interactive rhythm step grid">
        <div className="rhythm-panel-header">
          <div>
            <p className="eyebrow">Exercise 01</p>
            <h2>Create a balanced starter groove</h2>
          </div>
          <button type="button" onClick={resetPattern}>
            Reset pattern
          </button>
        </div>

        <div className="rhythm-grid" role="grid" aria-label="Eight step rhythm grid">
          <div className="rhythm-grid-header" aria-hidden="true">
            <span />
            {Array.from({ length: 8 }, (_, index) => (
              <span key={index}>{index + 1}</span>
            ))}
          </div>
          {tracks.map((track) => (
            <div className="rhythm-track" key={track.id} role="row">
              <strong>{track.label}</strong>
              {track.pattern.map((isActive, index) => (
                <button
                  type="button"
                  role="gridcell"
                  aria-pressed={isActive}
                  aria-label={`${track.label} step ${index + 1} ${isActive ? 'active' : 'inactive'}`}
                  className={isActive ? 'rhythm-step enabled' : 'rhythm-step'}
                  key={`${track.id}-${index}`}
                  onClick={() => toggleStep(track.id, index)}
                >
                  <span />
                </button>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
