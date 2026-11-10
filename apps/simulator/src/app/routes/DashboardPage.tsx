import { LessonCard } from '../../components/ui/LessonCard';
import { PageHeader } from '../../components/ui/PageHeader';
import { plannedLearningModules } from '../../features/plannedModules';

export function DashboardPage() {
  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Dashboard"
        title="Production learning starts here"
        description="A focused overview for Lukulu Academy students before entering the simulator workspace."
      />
      <section className="dashboard-grid" aria-label="Learning overview">
        <LessonCard
          title="Foundation shell"
          meta="Ready"
          description="The project now has a scalable interface foundation, CI checks, and original Lukulu Academy identity."
        />
        <LessonCard
          title="First practice module"
          meta="Prototype"
          description="Use the Rhythm Lab MVP to understand step timing before moving into full DAW assignments."
        />
        <LessonCard
          title="Next build target"
          meta="Planned"
          description="Connect lesson progress, saved attempts, and structured feedback in a later phase."
        />
      </section>
      <section className="panel roadmap-panel">
        <p className="eyebrow">Planned modules</p>
        <div className="roadmap-list">
          {plannedLearningModules.map((module) => (
            <article key={module.id}>
              <strong>{module.title}</strong>
              <span>{module.status}</span>
              <p>{module.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
