const EXERCISES = [
  { name: "Squat", tracks: ["Knee angle and depth", "Torso alignment", "Hip and ankle position"] },
  { name: "Push-up", tracks: ["Elbow and shoulder angle", "Body line from head to ankles", "Lowering depth"] },
  { name: "Lunge", tracks: ["Front and rear knee angle", "Hip movement", "Balance"] },
  { name: "Plank", tracks: ["Shoulder, hip and ankle alignment", "Hold time", "Stability"] },
];

export function Exercises() {
  return (
    <section id="exercises" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-16">
      <h2 className="text-3xl font-bold tracking-tight">Supported exercises</h2>
      <p className="mt-3 max-w-xl text-muted">
        Each exercise has its own movement logic and scoring. More exercises can be added later.
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {EXERCISES.map((exercise) => (
          <article key={exercise.name} className="rounded-2xl border border-line p-6">
            <h3 className="text-lg font-semibold">{exercise.name}</h3>
            <p className="mt-3 text-sm text-muted">What we measure</p>
            <ul className="mt-2 space-y-1.5 text-sm">
              {exercise.tracks.map((track) => (
                <li key={track}>{track}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
