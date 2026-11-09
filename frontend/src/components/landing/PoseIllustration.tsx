/**
 * Static illustration of a squat with pose landmarks and the knee angle.
 * It is decorative: it shows what FitVision measures, not real data.
 */
export function PoseIllustration() {
  const joints: [number, number][] = [
    [190, 150], // head
    [170, 185], // shoulder
    [260, 195], // wrist
    [125, 285], // hip
    [215, 300], // knee
    [150, 380], // ankle
    [205, 388], // toe
  ];

  return (
    <svg
      viewBox="0 0 360 430"
      role="img"
      aria-label="Illustration of a squat with body landmarks and the knee angle highlighted"
      className="h-auto w-full"
    >
      <line x1="30" y1="396" x2="330" y2="396" className="stroke-line" strokeWidth="2" />

      <g className="stroke-ink" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.85">
        <line x1="170" y1="185" x2="125" y2="285" />
        <line x1="170" y1="185" x2="260" y2="195" />
        <line x1="125" y1="285" x2="215" y2="300" />
        <line x1="215" y1="300" x2="150" y2="380" />
        <line x1="150" y1="380" x2="205" y2="388" />
      </g>
      <circle cx="190" cy="150" r="22" className="stroke-ink" strokeWidth="4" fill="none" opacity="0.85" />

      <path d="M 175.5 293.4 A 40 40 0 0 0 189.8 331" className="stroke-accent" strokeWidth="3" fill="none" strokeLinecap="round" />
      <text x="62" y="330" className="fill-accent" fontSize="14" fontWeight="600">
        Knee angle
      </text>

      {joints.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="6" className="fill-accent" />
      ))}
    </svg>
  );
}
