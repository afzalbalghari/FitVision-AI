import { Bot, ChartColumn, CalendarRange, Camera, Gauge, ScanLine } from "lucide-react";

const FEATURES = [
  {
    icon: Camera,
    title: "Live rep tracking",
    text: "Your webcam detects your movement and counts a rep only when the full motion is completed.",
  },
  {
    icon: ScanLine,
    title: "Real-time form feedback",
    text: "Short cues appear while you train, based on your measured joint angles and body position.",
  },
  {
    icon: Gauge,
    title: "Per-rep form scores",
    text: "Every rep gets a 0 to 100 score with a breakdown, calculated differently for each exercise.",
  },
  {
    icon: CalendarRange,
    title: "Personalized plans",
    text: "Weekly plans follow your goal, experience, available time and equipment, with rest days built in.",
  },
  {
    icon: ChartColumn,
    title: "Progress analytics",
    text: "See workouts, reps, form trends and personal records drawn from your saved sessions.",
  },
  {
    icon: Bot,
    title: "AI coach chat",
    text: "Ask about technique, plans or your results. Answers use your actual workout history.",
  },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-16">
      <h2 className="max-w-xl text-3xl font-bold tracking-tight">Everything you need to train with feedback</h2>
      <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
        {FEATURES.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex gap-4 border-t border-line pt-6">
            <Icon size={22} className="mt-0.5 shrink-0 text-accent" aria-hidden />
            <div>
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-1.5 text-muted">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
