import { useMemo } from "react";

interface Props {
  count?: number;
  className?: string;
}

export default function EmberParticles({ count = 28, className = "" }: Props) {
  const embers = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const left = Math.random() * 100;
      const size = 2 + Math.random() * 4;
      const duration = 9 + Math.random() * 12;
      const delay = -Math.random() * duration;
      const drift = (Math.random() - 0.5) * 80;
      const hue = 18 + Math.random() * 20;
      const opacity = 0.35 + Math.random() * 0.5;
      return { i, left, size, duration, delay, drift, hue, opacity };
    });
  }, [count]);

  return (
    <div className={`ember-layer ${className}`} aria-hidden="true">
      {embers.map((e) => (
        <span
          key={e.i}
          className="ember"
          style={{
            left: `${e.left}%`,
            width: `${e.size}px`,
            height: `${e.size}px`,
            animationDuration: `${e.duration}s`,
            animationDelay: `${e.delay}s`,
            ["--ember-drift" as string]: `${e.drift}px`,
            ["--ember-hue" as string]: `${e.hue}`,
            ["--ember-opacity" as string]: `${e.opacity}`,
          }}
        />
      ))}
    </div>
  );
}
