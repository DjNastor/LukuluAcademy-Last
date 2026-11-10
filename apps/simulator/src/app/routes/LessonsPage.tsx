import { LessonCard } from '../../components/ui/LessonCard';
import { PageHeader } from '../../components/ui/PageHeader';

const lessonTracks = [
  {
    title: 'Rhythm Foundations',
    meta: 'Beginner · 15 min',
    description:
      'Learn how kick, clap, hat, and bass patterns create a simple groove skeleton.',
  },
  {
    title: 'Arrangement Basics',
    meta: 'Beginner · Planned',
    description: 'Practice turning loops into intro, groove, break, and outro sections.',
  },
  {
    title: 'Mix Balance',
    meta: 'Beginner · Planned',
    description:
      'Understand level balance, mute/solo decisions, and master channel awareness.',
  },
];

export function LessonsPage() {
  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Lessons"
        title="Guided DAW learning paths"
        description="Small, practical modules designed for beginners who need one action at a time."
      />
      <section className="lesson-grid" aria-label="Lesson tracks">
        {lessonTracks.map((lesson) => (
          <LessonCard key={lesson.title} {...lesson} />
        ))}
      </section>
    </div>
  );
}
