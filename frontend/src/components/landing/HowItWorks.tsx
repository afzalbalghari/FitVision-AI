const STEPS = [
  { title: "Set your goal", text: "Tell us your goal, experience and how much time you have. Health details are never required." },
  { title: "Get your plan", text: "FitVision builds a weekly schedule that fits your answers. You can edit or regenerate it." },
  {
    title: "Train on camera",
    text: "Allow camera access and move. Video is not recorded or uploaded, and the camera stops when you finish.",
  },
  { title: "Review your progress", text: "Each session is saved as numbers, so you can follow your reps and form over time." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 border-y border-line bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <li key={step.title}>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-bold text-bg">
                {index + 1}
              </span>
              <h3 className="mt-4 font-semibold">{step.title}</h3>
              <p className="mt-1.5 text-sm text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
