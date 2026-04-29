interface ProgressRingProps {
  percentage: number;
  label: string;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

export function ProgressRing({
  percentage,
  label,
  size = 100,
  strokeWidth = 6,
  color = "#d4a853",
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(155,127,212,0.1)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center" style={{ width: size, height: size }}>
        <span className="text-lg font-display font-semibold gold-text">{percentage}%</span>
      </div>
      <span className="text-xs text-text-muted uppercase tracking-wider">{label}</span>
    </div>
  );
}
