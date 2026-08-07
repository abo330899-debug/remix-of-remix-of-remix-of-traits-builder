interface Props {
  intensity?: "soft" | "heavy";
  className?: string;
}

export default function SmokeVeil({ intensity = "soft", className = "" }: Props) {
  return (
    <div
      className={`smoke-veil smoke-${intensity} ${className}`}
      aria-hidden="true"
    >
      <span className="smoke-layer smoke-1" />
      <span className="smoke-layer smoke-2" />
      <span className="smoke-layer smoke-3" />
      <span className="smoke-vignette" />
    </div>
  );
}
