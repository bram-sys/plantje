function seededRand(seed: string, extra = ""): number {
  const str = seed + extra;
  let h = 0xdeadbeef;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 2654435761);
  }
  h ^= h >>> 16;
  return Math.abs(h) / 0xffffffff;
}

export function GrassField({ count = 50 }: { count?: number }) {
  const blades = Array.from({ length: count }).map((_, i) => ({
    x: (i / count) * 100 + seededRand(String(i), "gx") * (100 / count),
    height: 18 + seededRand(String(i), "gh") * 22,
    width: 3 + seededRand(String(i), "gw") * 3,
    lean: -20 + seededRand(String(i), "gl") * 40,
    shade: seededRand(String(i), "gc") > 0.5 ? "#7ac840" : "#5aaa28",
    delay: seededRand(String(i), "gd"),
  }));

  return (
    <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden pointer-events-none">
      <svg viewBox="0 0 400 128" className="w-full h-full" preserveAspectRatio="none">
        <rect x="0" y="56" width="400" height="72" fill="#88c050" />
        <rect x="0" y="68" width="400" height="60" fill="#78b040" />
        <path d="M0,60 Q50,52 100,62 Q150,70 200,58 Q250,48 300,60 Q350,70 400,56 L400,128 L0,128 Z" fill="#98d060" />
        {blades.map((b, i) => (
          <g key={i} className="grass-blade" style={{ animationDelay: `${b.delay * -3}s` }}>
            <path
              d={`M${b.x * 4},124 Q${b.x * 4 + b.lean * 0.4},${124 - b.height * 0.5} ${b.x * 4 + b.lean * 0.7},${124 - b.height}`}
              stroke={b.shade}
              strokeWidth={b.width}
              fill="none"
              strokeLinecap="round"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

export function GardenBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-[#c8e8f8] via-[#d8f4b0] to-[#88c050]" />
      <svg
        className="absolute left-0 right-0 w-full"
        style={{ bottom: "7rem" }}
        viewBox="0 0 400 80"
        preserveAspectRatio="none"
      >
        <ellipse cx="60"  cy="80" rx="130" ry="65" fill="#a0cc60" opacity="0.45" />
        <ellipse cx="270" cy="80" rx="160" ry="72" fill="#90c050" opacity="0.38" />
        <ellipse cx="390" cy="80" rx="100" ry="55" fill="#b0d870" opacity="0.3" />
      </svg>
      <GrassField count={55} />
    </div>
  );
}
