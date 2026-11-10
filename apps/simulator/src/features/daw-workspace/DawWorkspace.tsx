import { useState } from 'react';
import { ArrangementView } from './ArrangementView';
import { AssistantPanel } from './AssistantPanel';
import { BottomTransport } from './BottomTransport';
import { ChannelRackView } from './ChannelRackView';
import { DawBrowser } from './DawBrowser';
import { DawTopBar } from './DawTopBar';
import { MixerView } from './MixerView';
import { PianoRollView } from './PianoRollView';
import { useDawPattern } from './useDawPattern';

export function DawWorkspace() {
  const {
    activeStepCount,
    canSubmit,
    lessonObjectives,
    progress,
    resetPattern,
    toggleStep,
    tracks,
  } = useDawPattern();
  const [submissionMessage, setSubmissionMessage] = useState('');

  const submitAssignment = () => {
    if (!canSubmit) {
      setSubmissionMessage('Finish every lesson objective before submitting.');
      return;
    }

    setSubmissionMessage(
      'Assignment submitted locally. Great work — your groove is ready for review.',
    );
  };

  return (
    <div className="daw-workspace-shell">
      <DawTopBar progress={progress} />
      <div className="daw-main-grid">
        <DawBrowser />
        <main className="daw-center-stack" aria-label="Lukulu DAW simulator workspace">
          <ArrangementView />
          <div className="daw-middle-grid">
            <ChannelRackView
              activeStepCount={activeStepCount}
              onResetPattern={resetPattern}
              onToggleStep={toggleStep}
              tracks={tracks}
            />
            <MixerView />
          </div>
          <PianoRollView />
        </main>
        <AssistantPanel
          canSubmit={canSubmit}
          lessonObjectives={lessonObjectives}
          onSubmitAssignment={submitAssignment}
          progress={progress}
          submissionMessage={submissionMessage}
        />
      </div>
      <BottomTransport />
      <button className="floating-create" type="button" aria-label="Create new item">
        +
      </button>
    </div>
  );
}
