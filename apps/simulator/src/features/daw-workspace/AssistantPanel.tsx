interface LessonObjective {
  id: string;
  label: string;
  complete: boolean;
}

interface AssistantPanelProps {
  canSubmit: boolean;
  lessonObjectives: LessonObjective[];
  onSubmitAssignment: () => void;
  progress: number;
  submissionMessage: string;
}

export function AssistantPanel({
  canSubmit,
  lessonObjectives,
  onSubmitAssignment,
  progress,
  submissionMessage,
}: AssistantPanelProps) {
  const actions = [
    'Explain EQ',
    'Fix my Mix',
    'Suggest Chords',
    'Build Bassline',
    'Humanize MIDI',
    'Generate Melody',
  ];

  return (
    <aside className="assistant-rail" aria-label="AI assistant and lesson guidance">
      <section className="assistant-card ai-card">
        <div className="rail-title">
          <h2>AI Assistant</h2>
          <button type="button">×</button>
        </div>
        <h3>Ask Lukulu AI</h3>
        <p>Get help with your production while staying inside the lesson flow.</p>
        <div className="ai-actions">
          {actions.map((action) => (
            <button type="button" key={action}>
              {action}
            </button>
          ))}
        </div>
        <button className="wide-action" type="button">
          Open AI Chat
        </button>
      </section>

      <section className="assistant-card lesson-card-mini">
        <h2>Today's Lesson</h2>
        <strong>Build an Afro House Groove</strong>
        <ul>
          {lessonObjectives.map((objective) => (
            <li className={objective.complete ? 'done' : undefined} key={objective.id}>
              {objective.label}
            </li>
          ))}
        </ul>
        <span className="xp-pill">+{Math.max(25, progress)} XP potential</span>
      </section>

      <section className="assistant-card feedback-card">
        <h2>Instructor Feedback</h2>
        <div className="feedback-row">
          <span className="avatar">LA</span>
          <p>
            <strong>{progress >= 100 ? 'Ready to submit!' : 'Keep building.'}</strong>
            {progress >= 100
              ? 'Your groove meets all current lesson objectives.'
              : 'Complete the remaining groove objectives before submitting.'}
          </p>
          <div className="score-ring">{progress}%</div>
        </div>
      </section>

      <section className="assistant-card assignment-card">
        <h2>Assignment 4</h2>
        <strong>Recreate this beat</strong>
        <div className="reference-player">
          <button type="button">▶</button>
          <span />
        </div>
        <p>Deadline: 7 days</p>
        <button type="button" disabled={!canSubmit} onClick={onSubmitAssignment}>
          {canSubmit ? 'Submit' : 'Complete objectives'}
        </button>
        {submissionMessage && <p className="submission-message">{submissionMessage}</p>}
      </section>
    </aside>
  );
}
