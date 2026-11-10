interface LessonCardProps {
  title: string;
  meta: string;
  description: string;
}

export function LessonCard({ title, meta, description }: LessonCardProps) {
  return (
    <article className="lesson-card">
      <span>{meta}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}
