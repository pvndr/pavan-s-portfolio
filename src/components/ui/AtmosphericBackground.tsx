export function AtmosphericBackground() {
  return (
    <div className="atmospheric-bg-root" aria-hidden="true">
      {/* 1. Deep Midnight Gradient Base */}
      <div className="bg-depth-gradient" />

      {/* 2. Architectural Blueprint Dot Grid */}
      <div className="bg-blueprint-grid" />

      {/* 3. Ambient Luminescent Pools */}
      <div className="ambient-glow-pool glow-cyan" />
      <div className="ambient-glow-pool glow-violet" />

      {/* 4. Analog Film Noise / Grain Texture Overlay */}
      <div className="bg-grain-texture" />
    </div>
  );
}
