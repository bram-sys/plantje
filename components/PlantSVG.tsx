import { Plant } from "@/lib/plants";

interface Props {
  plant: Plant;
  stage: 0 | 1 | 2 | 3;
  size?: number;
  animate?: boolean;
  ukulele?: boolean;
}

// ─── Shared structural elements ──────────────────────────────────────────────

function Soil() {
  return (
    <>
      <ellipse cx="100" cy="276" rx="84" ry="26" fill="#8a6438" />
      <ellipse cx="100" cy="268" rx="66" ry="17" fill="#c4a882" opacity="0.65" />
      <ellipse cx="100" cy="264" rx="44" ry="10" fill="#d8bc96" opacity="0.4" />
    </>
  );
}

function StemSprout({ color }: { color: string }) {
  return (
    <path
      d="M100,266 C99,256 99,246 100,226"
      stroke={color} strokeWidth="3.2" fill="none" strokeLinecap="round"
    />
  );
}

function CotyledonLeaves({ leaf }: { leaf: string }) {
  return (
    <>
      <ellipse cx="89" cy="233" rx="11" ry="7" fill={leaf} transform="rotate(-28 89 233)" />
      <ellipse cx="111" cy="233" rx="11" ry="7" fill={leaf} transform="rotate(28 111 233)" />
    </>
  );
}

function StemMedium({ color }: { color: string }) {
  return (
    <path
      d="M100,266 C96,242 96,214 100,164"
      stroke={color} strokeWidth="4.5" fill="none" strokeLinecap="round"
    />
  );
}

function StemFull({ color }: { color: string }) {
  return (
    <path
      d="M100,266 C96,238 96,206 100,148"
      stroke={color} strokeWidth="5" fill="none" strokeLinecap="round"
    />
  );
}

function LeavesStage2({ leaf, leaf2 }: { leaf: string; leaf2: string }) {
  return (
    <>
      <path d="M97,214 C80,203 68,212 68,224 C79,233 97,225 97,216 Z" fill={leaf} />
      <path d="M100,192 C118,179 132,185 132,197 C122,205 100,198 100,192 Z" fill={leaf2} />
    </>
  );
}

function LeavesStage3({ leaf, leaf2 }: { leaf: string; leaf2: string }) {
  return (
    <>
      <path d="M97,218 C79,206 67,215 67,227 C78,236 97,228 97,219 Z" fill={leaf} />
      <path d="M100,195 C119,181 133,188 133,200 C122,208 100,201 100,195 Z" fill={leaf2} />
      <path d="M98,172 C84,163 75,170 76,180 C83,186 98,179 98,173 Z" fill={leaf} opacity="0.75" />
    </>
  );
}

// ─── Round Flower ─────────────────────────────────────────────────────────────

function RoundFlowerStage0() {
  return (
    <>
      <Soil />
      <ellipse cx="100" cy="253" rx="7" ry="4.5" fill="#7a5228" />
    </>
  );
}

function RoundFlowerStage1({ c }: { c: Plant["colors"] }) {
  return (
    <>
      <Soil />
      <StemSprout color={c.stem} />
      <CotyledonLeaves leaf={c.leaf} />
    </>
  );
}

function RoundFlowerStage2({ c }: { c: Plant["colors"] }) {
  return (
    <>
      <Soil />
      <StemMedium color={c.stem} />
      <LeavesStage2 leaf={c.leaf} leaf2={c.leaf2} />
      {/* Bud */}
      <ellipse cx="100" cy="152" rx="10" ry="14" fill={c.petal} />
      <ellipse cx="100" cy="155" rx="6.5" ry="9" fill={c.petal2} opacity="0.75" />
      <path d="M96,152 Q100,144 104,152" fill={c.stem} opacity="0.5" />
    </>
  );
}

function RoundFlowerStage3({ c }: { c: Plant["colors"] }) {
  const fx = 100, fy = 134;
  const orbit = 21, petalRx = 10, petalRy = 18;

  return (
    <>
      <Soil />
      <StemFull color={c.stem} />
      <LeavesStage3 leaf={c.leaf} leaf2={c.leaf2} />
      {/* Back row petals (rotated 22.5° offset) */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2 + Math.PI / 8;
        const cx = fx + Math.sin(angle) * orbit;
        const cy = fy - Math.cos(angle) * orbit;
        const deg = (i / 8) * 360 + 22.5;
        return <ellipse key={`bp${i}`} cx={cx} cy={cy} rx={petalRx} ry={petalRy} fill={c.petal2} opacity="0.7" transform={`rotate(${deg} ${cx} ${cy})`} />;
      })}
      {/* Front petals */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const cx = fx + Math.sin(angle) * orbit;
        const cy = fy - Math.cos(angle) * orbit;
        const deg = (i / 8) * 360;
        return <ellipse key={`fp${i}`} cx={cx} cy={cy} rx={petalRx} ry={petalRy} fill={c.petal} transform={`rotate(${deg} ${cx} ${cy})`} />;
      })}
      {/* Center */}
      <circle cx={fx} cy={fy} r="17" fill={c.center} />
      <circle cx={fx} cy={fy} r="10" fill={c.center2} opacity="0.85" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return <circle key={`cd${i}`} cx={fx + Math.sin(a) * 6} cy={fy - Math.cos(a) * 6} r="1.4" fill={c.center2} opacity="0.6" />;
      })}
    </>
  );
}

// ─── Sunflower ────────────────────────────────────────────────────────────────

function SunflowerStage2({ c }: { c: Plant["colors"] }) {
  return (
    <>
      <Soil />
      <StemMedium color={c.stem} />
      <LeavesStage2 leaf={c.leaf} leaf2={c.leaf2} />
      <ellipse cx="100" cy="152" rx="11" ry="13" fill={c.petal} />
    </>
  );
}

function SunflowerStage3({ c }: { c: Plant["colors"] }) {
  const fx = 100, fy = 130;
  const orbit = 30;

  return (
    <>
      <Soil />
      <StemFull color={c.stem} />
      <LeavesStage3 leaf={c.leaf} leaf2={c.leaf2} />
      {/* 16 elongated petals */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const cx = fx + Math.sin(angle) * orbit;
        const cy = fy - Math.cos(angle) * orbit;
        const deg = (i / 16) * 360;
        return <ellipse key={i} cx={cx} cy={cy} rx="7" ry="24" fill={i % 2 === 0 ? c.petal : c.petal2} transform={`rotate(${deg} ${cx} ${cy})`} />;
      })}
      {/* Big dark center */}
      <circle cx={fx} cy={fy} r="28" fill={c.center} />
      <circle cx={fx} cy={fy} r="22" fill={c.center2} />
      {/* Seed spiral dots */}
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i / 24) * Math.PI * 2;
        const r = 6 + (i % 3) * 6;
        return <circle key={i} cx={fx + Math.sin(a) * r} cy={fy - Math.cos(a) * r} r="1.6" fill="#f0a010" opacity="0.5" />;
      })}
    </>
  );
}

// ─── Cup Flower (Tulip/Orchid/Lily) ──────────────────────────────────────────

function CupFlowerStage2({ c }: { c: Plant["colors"] }) {
  return (
    <>
      <Soil />
      <StemMedium color={c.stem} />
      <LeavesStage2 leaf={c.leaf} leaf2={c.leaf2} />
      {/* Closed cup bud */}
      <path d="M88,165 C84,150 86,138 100,133 C114,138 116,150 112,165 C108,172 92,172 88,165 Z" fill={c.petal} />
      <path d="M94,165 C92,152 94,140 100,136 C106,140 108,152 106,165 Z" fill={c.petal2} opacity="0.7" />
    </>
  );
}

function CupFlowerStage3({ c }: { c: Plant["colors"] }) {
  const fx = 100, fy = 148;
  return (
    <>
      <Soil />
      <StemFull color={c.stem} />
      <LeavesStage3 leaf={c.leaf} leaf2={c.leaf2} />
      {/* Back 3 tepals peeking behind front layer */}
      <path d={`M${fx},${fy + 8} C${fx - 40},${fy + 2} ${fx - 44},${fy - 26} ${fx - 20},${fy - 56} L${fx},${fy + 8}`} fill={c.petal2} opacity="0.58" />
      <path d={`M${fx},${fy + 8} C${fx + 40},${fy + 2} ${fx + 44},${fy - 26} ${fx + 20},${fy - 56} L${fx},${fy + 8}`} fill={c.petal2} opacity="0.58" />
      <path d={`M${fx - 12},${fy + 7} C${fx - 12},${fy - 22} ${fx},${fy - 66} ${fx + 12},${fy + 7}`} fill={c.petal2} opacity="0.52" />
      {/* Front 3 tepals */}
      <path d={`M${fx},${fy + 10} C${fx - 32},${fy - 2} ${fx - 34},${fy - 28} ${fx - 14},${fy - 48} C${fx - 8},${fy - 56} ${fx},${fy - 60} ${fx},${fy - 60} L${fx},${fy + 10}`} fill={c.petal} />
      <path d={`M${fx},${fy + 10} C${fx + 32},${fy - 2} ${fx + 34},${fy - 28} ${fx + 14},${fy - 48} C${fx + 8},${fy - 56} ${fx},${fy - 60} ${fx},${fy - 60} L${fx},${fy + 10}`} fill={c.petal} />
      <path d={`M${fx - 10},${fy + 6} C${fx - 8},${fy - 18} ${fx},${fy - 62} ${fx + 10},${fy + 6}`} fill={c.petal2} opacity="0.85" />
      {/* Inner cup shading */}
      <path d={`M${fx - 22},${fy + 6} C${fx - 16},${fy - 14} ${fx},${fy - 42} ${fx + 22},${fy + 6}`} fill={c.center2} opacity="0.18" />
      {/* Stamens */}
      {[-6, 0, 6].map((xo, i) => (
        <g key={i}>
          <line x1={fx + xo} y1={fy + 4} x2={fx + xo} y2={fy - 30} stroke={c.center} strokeWidth="1.5" opacity="0.8" />
          <circle cx={fx + xo} cy={fy - 30} r="2.5" fill={c.center} />
        </g>
      ))}
    </>
  );
}

// ─── Spike / Herb ─────────────────────────────────────────────────────────────

function SpikeStage2({ c }: { c: Plant["colors"] }) {
  return (
    <>
      <Soil />
      <StemMedium color={c.stem} />
      <LeavesStage2 leaf={c.leaf} leaf2={c.leaf2} />
      {/* Small closed spike tip */}
      <rect x="96" y="148" width="8" height="18" rx="4" fill={c.petal} opacity="0.6" />
      {Array.from({ length: 4 }).map((_, i) => (
        <circle key={i} cx={100 + (i % 2 === 0 ? -3.5 : 3.5)} cy={164 - i * 4} r="2.5" fill={c.petal} />
      ))}
    </>
  );
}

function SpikeStage3({ c }: { c: Plant["colors"] }) {
  const spikeCx = 100;
  const spikeBottom = 162;

  return (
    <>
      <Soil />
      <StemFull color={c.stem} />
      <LeavesStage3 leaf={c.leaf} leaf2={c.leaf2} />
      {/* Spike body */}
      <path d={`M${spikeCx - 5},${spikeBottom} Q${spikeCx - 4},${spikeBottom - 30} ${spikeCx},${spikeBottom - 64} Q${spikeCx + 4},${spikeBottom - 30} ${spikeCx + 5},${spikeBottom}`} fill={c.petal} opacity="0.4" />
      {/* Individual florets */}
      {Array.from({ length: 22 }).map((_, i) => {
        const y = spikeBottom - i * 2.9;
        const x = spikeCx + (i % 2 === 0 ? -4 : 4) + Math.sin(i * 0.8) * 1.5;
        const r = i > 18 ? 1.8 : 3.2;
        return <circle key={i} cx={x} cy={y} r={r} fill={c.petal} opacity={i > 18 ? 0.5 : 1} />;
      })}
      {/* Leaf pairs along stem */}
      {[190, 210].map((y, i) => (
        <g key={i}>
          <ellipse cx={spikeCx - 10} cy={y} rx="7" ry="3.5" fill={c.leaf} transform={`rotate(-40 ${spikeCx - 10} ${y})`} />
          <ellipse cx={spikeCx + 10} cy={y} rx="7" ry="3.5" fill={c.leaf2} transform={`rotate(40 ${spikeCx + 10} ${y})`} />
        </g>
      ))}
    </>
  );
}

// ─── Cactus ───────────────────────────────────────────────────────────────────

function CactusStage0() {
  return (
    <>
      <Soil />
      <ellipse cx="100" cy="254" rx="6" ry="8" fill="#5a9a30" />
    </>
  );
}

function CactusStage1({ c }: { c: Plant["colors"] }) {
  return (
    <>
      <Soil />
      {/* Short column */}
      <rect x="92" y="220" width="16" height="46" rx="8" fill={c.stem} />
      {/* Spines */}
      {[226, 236, 246].map((y) => (
        <g key={y}>
          <line x1="92" y1={y} x2="83" y2={y - 3} stroke="#e8e0c8" strokeWidth="1.5" />
          <line x1="108" y1={y} x2="117" y2={y - 3} stroke="#e8e0c8" strokeWidth="1.5" />
        </g>
      ))}
    </>
  );
}

function CactusStage2({ c }: { c: Plant["colors"] }) {
  return (
    <>
      <Soil />
      {/* Main column */}
      <rect x="92" y="170" width="16" height="96" rx="8" fill={c.stem} />
      {/* Left arm */}
      <path d="M92,210 C80,210 76,202 76,194 L84,194" stroke={c.stem} strokeWidth="14" fill="none" strokeLinecap="round" />
      {/* Right arm */}
      <path d="M108,222 C120,222 124,214 124,206 L116,206" stroke={c.stem} strokeWidth="14" fill="none" strokeLinecap="round" />
      {/* Spines */}
      {[180, 194, 208, 222, 236].map((y) => (
        <g key={y}>
          <line x1="92" y1={y} x2="83" y2={y - 4} stroke="#e8e0c8" strokeWidth="1.5" />
          <line x1="108" y1={y} x2="117" y2={y - 4} stroke="#e8e0c8" strokeWidth="1.5" />
        </g>
      ))}
      {/* Bud on top */}
      <ellipse cx="100" cy="168" rx="7" ry="9" fill={c.petal} opacity="0.8" />
    </>
  );
}

function CactusStage3({ c }: { c: Plant["colors"] }) {
  return (
    <>
      <Soil />
      {/* Main column */}
      <rect x="92" y="164" width="16" height="102" rx="8" fill={c.stem} />
      {/* Arms */}
      <path d="M92,204 C80,204 76,196 76,188 L84,188" stroke={c.stem} strokeWidth="14" fill="none" strokeLinecap="round" />
      <path d="M108,220 C120,220 124,212 124,204 L116,204" stroke={c.stem} strokeWidth="14" fill="none" strokeLinecap="round" />
      {/* Spines */}
      {[174, 188, 202, 216, 230, 244].map((y) => (
        <g key={y}>
          <line x1="92" y1={y} x2="82" y2={y - 4} stroke="#e8e0c8" strokeWidth="1.5" />
          <line x1="108" y1={y} x2="118" y2={y - 4} stroke="#e8e0c8" strokeWidth="1.5" />
        </g>
      ))}
      {/* Top flower */}
      {Array.from({ length: 7 }).map((_, i) => {
        const a = (i / 7) * Math.PI * 2;
        const cx = 100 + Math.sin(a) * 14;
        const cy = 152 - Math.cos(a) * 14;
        return <ellipse key={i} cx={cx} cy={cy} rx="6" ry="10" fill={c.petal} transform={`rotate(${(i / 7) * 360} ${cx} ${cy})`} />;
      })}
      <circle cx="100" cy="152" r="9" fill={c.center} />
      <circle cx="100" cy="152" r="5" fill={c.center2} />
    </>
  );
}

// ─── Succulent ────────────────────────────────────────────────────────────────

function SucculentLeaf({ cx, cy, rx, ry, fill, angle }: { cx: number; cy: number; rx: number; ry: number; fill: string; angle: number }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={fill} transform={`rotate(${angle} ${cx} ${cy})`} />;
}

function SucculentStage1({ c }: { c: Plant["colors"] }) {
  return (
    <>
      <Soil />
      {/* 4-leaf rosette */}
      {[0, 90, 180, 270].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        const cx = 100 + Math.sin(rad) * 10;
        const cy = 248 - Math.cos(rad) * 10;
        return <SucculentLeaf key={i} cx={cx} cy={cy} rx={8} ry={13} fill={c.leaf} angle={a} />;
      })}
      <circle cx="100" cy="248" r="5" fill={c.center} />
    </>
  );
}

function SucculentStage2({ c }: { c: Plant["colors"] }) {
  return (
    <>
      <Soil />
      {/* 6-leaf rosette, bigger */}
      {[0, 60, 120, 180, 240, 300].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        const cx = 100 + Math.sin(rad) * 16;
        const cy = 248 - Math.cos(rad) * 16;
        return <SucculentLeaf key={i} cx={cx} cy={cy} rx={10} ry={17} fill={i % 2 === 0 ? c.leaf : c.leaf2} angle={a} />;
      })}
      <circle cx="100" cy="248" r="7" fill={c.petal} />
    </>
  );
}

function SucculentStage3({ c }: { c: Plant["colors"] }) {
  return (
    <>
      <Soil />
      {/* Outer ring leaves */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        const cx = 100 + Math.sin(rad) * 26;
        const cy = 248 - Math.cos(rad) * 26;
        return <SucculentLeaf key={`o${i}`} cx={cx} cy={cy} rx={10} ry={18} fill={c.leaf} angle={a} />;
      })}
      {/* Inner ring */}
      {[0, 60, 120, 180, 240, 300].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        const cx = 100 + Math.sin(rad) * 14;
        const cy = 248 - Math.cos(rad) * 14;
        return <SucculentLeaf key={`i${i}`} cx={cx} cy={cy} rx={8} ry={14} fill={c.leaf2} angle={a} />;
      })}
      {/* Center bud + tiny flower stalk */}
      <line x1="100" y1="248" x2="100" y2="210" stroke={c.stem} strokeWidth="2.5" />
      {Array.from({ length: 5 }).map((_, i) => {
        const a = (i / 5) * Math.PI * 2;
        const cx = 100 + Math.sin(a) * 8;
        const cy = 208 - Math.cos(a) * 8;
        return <ellipse key={i} cx={cx} cy={cy} rx="5" ry="8" fill={c.petal} transform={`rotate(${(i / 5) * 360} ${cx} ${cy})`} />;
      })}
      <circle cx="100" cy="208" r="6" fill={c.center} />
    </>
  );
}

// ─── Bamboo ───────────────────────────────────────────────────────────────────

function BambooStage1({ c }: { c: Plant["colors"] }) {
  return (
    <>
      <Soil />
      {/* Two small stalks */}
      <rect x="94" y="218" width="7" height="48" rx="3.5" fill={c.stem} />
      <rect x="104" y="228" width="6" height="38" rx="3" fill={c.leaf} opacity="0.85" />
      {/* Node lines */}
      <line x1="94" y1="240" x2="101" y2="240" stroke={c.leaf2} strokeWidth="1.5" />
      <line x1="104" y1="248" x2="110" y2="248" stroke={c.leaf2} strokeWidth="1.5" />
    </>
  );
}

function BambooStage2({ c }: { c: Plant["colors"] }) {
  return (
    <>
      <Soil />
      {/* Three stalks */}
      {[[92, 162, 10], [100, 152, 9], [110, 170, 8]] .map(([x, y, w], i) => (
        <rect key={i} x={x} y={y} width={w} height={266 - y} rx={w / 2} fill={i === 1 ? c.stem : c.leaf} opacity={i === 2 ? 0.8 : 1} />
      ))}
      {/* Nodes */}
      {[[92, 196], [92, 226], [100, 186], [100, 216], [110, 206]].map(([x, y], i) => (
        <line key={i} x1={x} y1={y} x2={x + (x === 92 ? 10 : x === 100 ? 9 : 8)} y2={y} stroke={c.leaf2} strokeWidth="2" />
      ))}
      {/* Small leaves */}
      <ellipse cx="90" cy="170" rx="12" ry="5" fill={c.petal2} transform="rotate(-35 90 170)" />
      <ellipse cx="115" cy="178" rx="11" ry="4.5" fill={c.petal2} transform="rotate(30 115 178)" />
    </>
  );
}

function BambooStage3({ c }: { c: Plant["colors"] }) {
  return (
    <>
      <Soil />
      {/* 4 stalks */}
      {[[88, 148, 11], [97, 138, 10], [108, 155, 9], [118, 163, 8]].map(([x, y, w], i) => (
        <rect key={i} x={x} y={y} width={w} height={266 - y} rx={w / 2} fill={i === 1 ? c.stem : c.leaf} opacity={[1, 1, 0.9, 0.8][i]} />
      ))}
      {/* Nodes */}
      {[[88, 186], [88, 216], [88, 246], [97, 174], [97, 204], [97, 234], [108, 192], [108, 222], [118, 200], [118, 230]].map(([x, y], i) => {
        const ws = [11, 11, 11, 10, 10, 10, 9, 9, 8, 8][i];
        return <line key={i} x1={x} y1={y} x2={x + ws} y2={y} stroke={c.leaf2} strokeWidth="2" />;
      })}
      {/* Leaves */}
      {[
        [86, 158, -40], [114, 165, 35], [95, 148, -30], [120, 173, 45],
        [84, 172, -50], [116, 155, 30], [92, 162, -25], [112, 148, 40],
      ].map(([cx, cy, a], i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={14} ry={4.5} fill={c.petal2} opacity="0.9" transform={`rotate(${a} ${cx} ${cy})`} />
      ))}
    </>
  );
}

// ─── Fern ─────────────────────────────────────────────────────────────────────

function FernFrond({ x, y, angle, length, leaf }: { x: number; y: number; angle: number; length: number; leaf: string }) {
  const rad = (angle * Math.PI) / 180;
  const ex = x + Math.sin(rad) * length;
  const ey = y - Math.cos(rad) * length;

  const leaflets = Math.floor(length / 12);
  return (
    <g>
      <line x1={x} y1={y} x2={ex} y2={ey} stroke={leaf} strokeWidth="2.5" strokeLinecap="round" />
      {Array.from({ length: leaflets }).map((_, i) => {
        const t = (i + 1) / (leaflets + 1);
        const lx = x + Math.sin(rad) * length * t;
        const ly = y - Math.cos(rad) * length * t;
        const lsize = 9 * (1 - t * 0.5);
        return (
          <g key={i}>
            <ellipse cx={lx - Math.cos(rad) * lsize * 0.8} cy={ly - Math.sin(rad) * lsize * 0.8} rx={lsize} ry={lsize * 0.4} fill={leaf} opacity="0.85" transform={`rotate(${angle - 80} ${lx - Math.cos(rad) * lsize * 0.8} ${ly - Math.sin(rad) * lsize * 0.8})`} />
            <ellipse cx={lx + Math.cos(rad) * lsize * 0.8} cy={ly + Math.sin(rad) * lsize * 0.8} rx={lsize} ry={lsize * 0.4} fill={leaf} opacity="0.85" transform={`rotate(${angle + 80} ${lx + Math.cos(rad) * lsize * 0.8} ${ly + Math.sin(rad) * lsize * 0.8})`} />
          </g>
        );
      })}
    </g>
  );
}

function FernStage1({ c }: { c: Plant["colors"] }) {
  return (
    <>
      <Soil />
      <FernFrond x={100} y={262} angle={-15} length={44} leaf={c.leaf} />
      <FernFrond x={100} y={262} angle={20} length={36} leaf={c.leaf2} />
    </>
  );
}

function FernStage2({ c }: { c: Plant["colors"] }) {
  return (
    <>
      <Soil />
      <FernFrond x={100} y={262} angle={-25} length={68} leaf={c.leaf} />
      <FernFrond x={100} y={262} angle={10} length={72} leaf={c.leaf2} />
      <FernFrond x={100} y={262} angle={-5} length={56} leaf={c.petal2} />
    </>
  );
}

function FernStage3({ c }: { c: Plant["colors"] }) {
  return (
    <>
      <Soil />
      <FernFrond x={100} y={262} angle={-35} length={90} leaf={c.leaf} />
      <FernFrond x={100} y={262} angle={-12} length={100} leaf={c.petal} />
      <FernFrond x={100} y={262} angle={12} length={96} leaf={c.leaf2} />
      <FernFrond x={100} y={262} angle={35} length={82} leaf={c.petal2} />
      <FernFrond x={100} y={262} angle={-55} length={64} leaf={c.leaf} />
    </>
  );
}

// ─── Trees ────────────────────────────────────────────────────────────────────

function TreeTrunk({ topY, color }: { topY: number; color: string }) {
  const h = 264 - topY;
  return (
    <path
      d={`M${96},264 Q${94},${264 - h * 0.5} ${96},${topY} L${104},${topY} Q${106},${264 - h * 0.5} ${104},264 Z`}
      fill={color}
    />
  );
}

// tree_round — Eik / Oak
function TreeRoundStage0() {
  return (
    <>
      <Soil />
      <ellipse cx="100" cy="255" rx="6" ry="8" fill="#c89838" />
      <ellipse cx="100" cy="249" rx="5.5" ry="3" fill="#7a5028" />
    </>
  );
}

function TreeRoundStage1({ c }: { c: Plant["colors"] }) {
  return (
    <>
      <Soil />
      <rect x="97.5" y="244" width="5" height="20" rx="2.5" fill={c.stem} />
      <circle cx="100" cy="232" r="14" fill={c.leaf} />
      <circle cx="94" cy="226" r="8" fill={c.leaf2} opacity="0.75" />
    </>
  );
}

function TreeRoundStage2({ c }: { c: Plant["colors"] }) {
  return (
    <>
      <Soil />
      <rect x="96" y="210" width="8" height="54" rx="4" fill={c.stem} />
      <circle cx="100" cy="192" r="26" fill={c.leaf} />
      <circle cx="88" cy="182" r="15" fill={c.leaf2} opacity="0.8" />
      <circle cx="114" cy="184" r="13" fill={c.leaf2} opacity="0.7" />
      <circle cx="100" cy="178" r="12" fill={c.leaf2} opacity="0.65" />
    </>
  );
}

function TreeRoundStage3({ c }: { c: Plant["colors"] }) {
  return (
    <>
      <Soil />
      <TreeTrunk topY={184} color={c.stem} />
      <circle cx="100" cy="158" r="44" fill={c.leaf} opacity="0.7" />
      <circle cx="76" cy="146" r="26" fill={c.leaf} />
      <circle cx="124" cy="150" r="24" fill={c.leaf} />
      <circle cx="100" cy="134" r="22" fill={c.leaf2} />
      <circle cx="100" cy="162" r="30" fill={c.leaf} />
      <circle cx="82" cy="156" r="20" fill={c.leaf2} opacity="0.85" />
      <circle cx="118" cy="158" r="18" fill={c.leaf2} opacity="0.8" />
      <circle cx="90" cy="138" r="13" fill={c.leaf2} opacity="0.5" />
    </>
  );
}

// tree_pine — Den / Pine
function TreePineStage0() {
  return (
    <>
      <Soil />
      <ellipse cx="100" cy="255" rx="4" ry="7" fill="#3a8028" />
    </>
  );
}

function TreePineStage1({ c }: { c: Plant["colors"] }) {
  return (
    <>
      <Soil />
      <rect x="98" y="246" width="4" height="18" rx="2" fill={c.stem} />
      <polygon points="100,226 88,246 112,246" fill={c.leaf} />
    </>
  );
}

function TreePineStage2({ c }: { c: Plant["colors"] }) {
  return (
    <>
      <Soil />
      <rect x="97" y="220" width="6" height="44" rx="3" fill={c.stem} />
      <polygon points="100,198 80,228 120,228" fill={c.leaf} />
      <polygon points="100,172 82,206 118,206" fill={c.leaf2} />
      <polygon points="100,152 86,180 114,180" fill={c.leaf} />
    </>
  );
}

function TreePineStage3({ c }: { c: Plant["colors"] }) {
  return (
    <>
      <Soil />
      <rect x="97" y="218" width="6" height="46" rx="3" fill={c.stem} />
      <polygon points="100,186 66,220 134,220" fill={c.leaf} />
      <polygon points="100,186 68,220 84,220" fill={c.leaf2} opacity="0.3" />
      <polygon points="100,160 72,198 128,198" fill={c.leaf2} />
      <polygon points="100,160 74,198 86,198" fill={c.leaf} opacity="0.35" />
      <polygon points="100,136 78,170 122,170" fill={c.leaf} />
      <polygon points="100,116 82,148 118,148" fill={c.leaf2} />
      <polygon points="100,100 86,124 114,124" fill={c.leaf} />
      <line x1="100" y1="90" x2="100" y2="102" stroke={c.leaf2} strokeWidth="4" strokeLinecap="round" />
    </>
  );
}

// tree_willow — Wilg / Weeping Willow
function TreeWillowStage0() {
  return (
    <>
      <Soil />
      <path d="M100,258 Q97,250 100,242" stroke="#6aaa48" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </>
  );
}

function TreeWillowStage1({ c }: { c: Plant["colors"] }) {
  return (
    <>
      <Soil />
      <path d="M100,264 C100,248 100,236 100,224" stroke={c.stem} strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M100,226 Q88,236 82,250" stroke={c.leaf} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M100,224 Q100,238 100,252" stroke={c.leaf2} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M100,226 Q112,236 118,250" stroke={c.leaf} strokeWidth="2" fill="none" strokeLinecap="round" />
    </>
  );
}

function TreeWillowStage2({ c }: { c: Plant["colors"] }) {
  const ty = 196;
  return (
    <>
      <Soil />
      <path d={`M100,264 C99,242 99,218 100,${ty}`} stroke={c.stem} strokeWidth="5" fill="none" strokeLinecap="round" />
      {[[-38, 6, -56, 254], [-22, 4, -32, 258], [-8, 2, -10, 260], [8, 2, 14, 260], [24, 4, 36, 258], [40, 6, 58, 252]].map(([dx1, dy1, dx2, ey], i) => (
        <path key={i} d={`M100,${ty + dy1} Q${100 + dx1 * 0.6},${ty + 28} ${100 + dx2},${ey}`}
          stroke={i % 2 === 0 ? c.leaf : c.leaf2} strokeWidth="2" fill="none" strokeLinecap="round" />
      ))}
    </>
  );
}

function TreeWillowStage3({ c }: { c: Plant["colors"] }) {
  const ty = 166;
  const branches = [
    [-48, 4, -72, 250, 1.8],
    [-34, 2, -54, 256, 2.0],
    [-20, 0, -34, 260, 2.2],
    [-8, -2, -14, 262, 2.5],
    [4, -2, 10, 262, 2.5],
    [16, 0, 30, 260, 2.2],
    [30, 2, 50, 256, 2.0],
    [44, 4, 68, 250, 1.8],
    [-26, 1, -40, 258, 1.6],
    [22, 1, 38, 258, 1.6],
    [0, -4, 0, 260, 2.0],
  ];
  return (
    <>
      <Soil />
      <path d={`M98,264 Q97,228 98,${ty} L102,${ty} Q103,228 102,264 Z`} fill={c.stem} />
      {branches.map(([dx1, dy1, dx2, ey, w], i) => {
        const sx = 100, sy = ty + (dy1 as number);
        const cx = sx + (dx1 as number) * 0.45;
        const cy = sy + ((ey as number) - sy) * 0.38;
        return (
          <path key={i}
            d={`M${sx},${sy} Q${cx + (dx1 as number) * 0.2},${cy} ${100 + (dx2 as number)},${ey}`}
            stroke={i % 2 === 0 ? c.leaf : c.leaf2}
            strokeWidth={w as number}
            fill="none"
            strokeLinecap="round"
            opacity="0.92"
          />
        );
      })}
    </>
  );
}

// ─── Rose ─────────────────────────────────────────────────────────────────────

function RoseStage2({ c }: { c: Plant["colors"] }) {
  const fx = 100, fy = 152;
  return (
    <>
      <Soil />
      <StemMedium color={c.stem} />
      <LeavesStage2 leaf={c.leaf} leaf2={c.leaf2} />
      <ellipse cx={fx} cy={fy} rx="10" ry="16" fill={c.petal} />
      <path d={`M${fx - 6},${fy + 4} Q${fx - 10},${fy - 6} ${fx - 2},${fy - 14}`} fill={c.petal2} opacity="0.8" />
      <path d={`M${fx + 6},${fy + 4} Q${fx + 10},${fy - 6} ${fx + 2},${fy - 14}`} fill={c.petal2} opacity="0.6" />
      <ellipse cx={fx} cy={fy - 8} rx="5" ry="8" fill={c.petal} opacity="0.75" />
    </>
  );
}

function RoseStage3({ c }: { c: Plant["colors"] }) {
  const fx = 100, fy = 136;
  return (
    <>
      <Soil />
      <StemFull color={c.stem} />
      <LeavesStage3 leaf={c.leaf} leaf2={c.leaf2} />
      {/* Outer petals */}
      {Array.from({ length: 5 }).map((_, i) => {
        const a = (i / 5) * Math.PI * 2;
        const cx = fx + Math.sin(a) * 20;
        const cy = fy - Math.cos(a) * 16;
        const deg = (i / 5) * 360;
        return <ellipse key={`o${i}`} cx={cx} cy={cy} rx="13" ry="19" fill={c.petal2} opacity="0.8" transform={`rotate(${deg} ${cx} ${cy})`} />;
      })}
      {/* Mid petals */}
      {Array.from({ length: 5 }).map((_, i) => {
        const a = (i / 5) * Math.PI * 2 + Math.PI / 5;
        const cx = fx + Math.sin(a) * 12;
        const cy = fy - Math.cos(a) * 10;
        const deg = (i / 5) * 360 + 36;
        return <ellipse key={`m${i}`} cx={cx} cy={cy} rx="10" ry="15" fill={c.petal} transform={`rotate(${deg} ${cx} ${cy})`} />;
      })}
      {/* Inner petals */}
      {Array.from({ length: 4 }).map((_, i) => {
        const a = (i / 4) * Math.PI * 2;
        const cx = fx + Math.sin(a) * 5;
        const cy = fy - Math.cos(a) * 4;
        const deg = (i / 4) * 360;
        return <ellipse key={`n${i}`} cx={cx} cy={cy} rx="6" ry="9" fill={c.petal2} opacity="0.95" transform={`rotate(${deg} ${cx} ${cy})`} />;
      })}
      <circle cx={fx} cy={fy} r="5" fill={c.center} />
    </>
  );
}

// ─── Daisy ────────────────────────────────────────────────────────────────────

function DaisyStage2({ c }: { c: Plant["colors"] }) {
  return (
    <>
      <Soil />
      <StemMedium color={c.stem} />
      <LeavesStage2 leaf={c.leaf} leaf2={c.leaf2} />
      {Array.from({ length: 10 }).map((_, i) => {
        const a = (i / 10) * Math.PI * 2;
        const cx = 100 + Math.sin(a) * 16;
        const cy = 152 - Math.cos(a) * 16;
        const deg = (i / 10) * 360;
        return <ellipse key={i} cx={cx} cy={cy} rx="3.5" ry="10" fill={c.petal} opacity="0.75" transform={`rotate(${deg} ${cx} ${cy})`} />;
      })}
      <circle cx="100" cy="152" r="9" fill={c.center} />
      <circle cx="100" cy="152" r="5" fill={c.center2} opacity="0.8" />
    </>
  );
}

function DaisyStage3({ c }: { c: Plant["colors"] }) {
  const fx = 100, fy = 134;
  return (
    <>
      <Soil />
      <StemFull color={c.stem} />
      <LeavesStage3 leaf={c.leaf} leaf2={c.leaf2} />
      {/* Back row petals */}
      {Array.from({ length: 18 }).map((_, i) => {
        const a = (i / 18) * Math.PI * 2 + Math.PI / 18;
        const cx = fx + Math.sin(a) * 23;
        const cy = fy - Math.cos(a) * 23;
        const deg = (i / 18) * 360 + 10;
        return <ellipse key={`b${i}`} cx={cx} cy={cy} rx="3" ry="12" fill={c.petal2} opacity="0.55" transform={`rotate(${deg} ${cx} ${cy})`} />;
      })}
      {/* Front petals */}
      {Array.from({ length: 18 }).map((_, i) => {
        const a = (i / 18) * Math.PI * 2;
        const cx = fx + Math.sin(a) * 23;
        const cy = fy - Math.cos(a) * 23;
        const deg = (i / 18) * 360;
        return <ellipse key={`f${i}`} cx={cx} cy={cy} rx="3" ry="12" fill={c.petal} transform={`rotate(${deg} ${cx} ${cy})`} />;
      })}
      <circle cx={fx} cy={fy} r="13" fill={c.center} />
      <circle cx={fx} cy={fy} r="9" fill={c.center2} />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return <circle key={i} cx={fx + Math.sin(a) * 5} cy={fy - Math.cos(a) * 5} r="1.2" fill={c.center} opacity="0.5" />;
      })}
    </>
  );
}

// ─── Poppy ────────────────────────────────────────────────────────────────────

function PoppyStage2({ c }: { c: Plant["colors"] }) {
  return (
    <>
      <Soil />
      <StemMedium color={c.stem} />
      <LeavesStage2 leaf={c.leaf} leaf2={c.leaf2} />
      <ellipse cx="100" cy="150" rx="12" ry="14" fill={c.petal} />
      <ellipse cx="100" cy="145" rx="8" ry="9" fill={c.petal2} opacity="0.65" />
      <circle cx="100" cy="160" r="4" fill={c.center} opacity="0.7" />
    </>
  );
}

function PoppyStage3({ c }: { c: Plant["colors"] }) {
  const fx = 100, fy = 136;
  return (
    <>
      <Soil />
      <StemFull color={c.stem} />
      <LeavesStage3 leaf={c.leaf} leaf2={c.leaf2} />
      {/* 4 large rounded petals */}
      {[0, 90, 180, 270].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const cx = fx + Math.sin(rad) * 18;
        const cy = fy - Math.cos(rad) * 18;
        return (
          <ellipse key={i} cx={cx} cy={cy} rx="19" ry="23"
            fill={i % 2 === 0 ? c.petal : c.petal2} opacity="0.92"
            transform={`rotate(${deg} ${cx} ${cy})`} />
        );
      })}
      {/* Dark center */}
      <circle cx={fx} cy={fy} r="14" fill={c.center} />
      <circle cx={fx} cy={fy} r="9" fill={c.center2} />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const r = 3 + (i % 3) * 2.5;
        return <circle key={i} cx={fx + Math.sin(a) * r} cy={fy - Math.cos(a) * r} r="1" fill="white" opacity="0.6" />;
      })}
    </>
  );
}

// ─── Pansy ────────────────────────────────────────────────────────────────────

function PansyStage2({ c }: { c: Plant["colors"] }) {
  const fx = 100, fy = 150;
  return (
    <>
      <Soil />
      <StemMedium color={c.stem} />
      <LeavesStage2 leaf={c.leaf} leaf2={c.leaf2} />
      <ellipse cx={fx} cy={fy + 8} rx="14" ry="12" fill={c.petal} />
      <ellipse cx={fx - 14} cy={fy} rx="10" ry="12" fill={c.petal2} opacity="0.85" transform={`rotate(-20 ${fx - 14} ${fy})`} />
      <ellipse cx={fx + 14} cy={fy} rx="10" ry="12" fill={c.petal2} opacity="0.85" transform={`rotate(20 ${fx + 14} ${fy})`} />
      <circle cx={fx} cy={fy + 8} r="4" fill={c.center} opacity="0.6" />
    </>
  );
}

function PansyStage3({ c }: { c: Plant["colors"] }) {
  const fx = 100, fy = 140;
  return (
    <>
      <Soil />
      <StemFull color={c.stem} />
      <LeavesStage3 leaf={c.leaf} leaf2={c.leaf2} />
      {/* Lower large petal */}
      <ellipse cx={fx} cy={fy + 18} rx="19" ry="17" fill={c.petal} />
      {/* Veins on lower petal */}
      {[-7, 0, 7].map((xo, i) => (
        <path key={i} d={`M${fx + xo},${fy + 6} L${fx + xo * 0.4},${fy + 28}`}
          stroke={c.center} strokeWidth="1.2" opacity="0.45" strokeLinecap="round" />
      ))}
      {/* Side petals */}
      <ellipse cx={fx - 22} cy={fy + 4} rx="16" ry="14" fill={c.petal2} opacity="0.9" transform={`rotate(-18 ${fx - 22} ${fy + 4})`} />
      <ellipse cx={fx + 22} cy={fy + 4} rx="16" ry="14" fill={c.petal2} opacity="0.9" transform={`rotate(18 ${fx + 22} ${fy + 4})`} />
      {/* Upper petals */}
      <ellipse cx={fx - 11} cy={fy - 20} rx="13" ry="15" fill={c.petal2} opacity="0.92" transform={`rotate(-32 ${fx - 11} ${fy - 20})`} />
      <ellipse cx={fx + 11} cy={fy - 20} rx="13" ry="15" fill={c.petal2} opacity="0.92" transform={`rotate(32 ${fx + 11} ${fy - 20})`} />
      {/* Face marking */}
      <circle cx={fx} cy={fy + 6} r="7" fill={c.center} opacity="0.45" />
      <circle cx={fx} cy={fy + 4} r="4" fill="white" opacity="0.6" />
      <circle cx={fx} cy={fy + 4} r="2.5" fill={c.center2} />
    </>
  );
}

// ─── Peony ────────────────────────────────────────────────────────────────────

function PeonyStage2({ c }: { c: Plant["colors"] }) {
  const fx = 100, fy = 150;
  return (
    <>
      <Soil />
      <StemMedium color={c.stem} />
      <LeavesStage2 leaf={c.leaf} leaf2={c.leaf2} />
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i / 6) * Math.PI * 2;
        const cx = fx + Math.sin(a) * 10;
        const cy = fy - Math.cos(a) * 8;
        const deg = (i / 6) * 360;
        return <ellipse key={i} cx={cx} cy={cy} rx="9" ry="14" fill={c.petal} opacity="0.8" transform={`rotate(${deg} ${cx} ${cy})`} />;
      })}
      <circle cx={fx} cy={fy} r="7" fill={c.petal2} />
    </>
  );
}

function PeonyStage3({ c }: { c: Plant["colors"] }) {
  const fx = 100, fy = 134;
  return (
    <>
      <Soil />
      <StemFull color={c.stem} />
      <LeavesStage3 leaf={c.leaf} leaf2={c.leaf2} />
      {/* Outer ring */}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const cx = fx + Math.sin(a) * 23;
        const cy = fy - Math.cos(a) * 19;
        const deg = (i / 8) * 360;
        return <ellipse key={`o${i}`} cx={cx} cy={cy} rx="12" ry="19" fill={c.petal2} opacity="0.72" transform={`rotate(${deg} ${cx} ${cy})`} />;
      })}
      {/* Middle ring */}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
        const cx = fx + Math.sin(a) * 14;
        const cy = fy - Math.cos(a) * 12;
        const deg = (i / 8) * 360 + 22.5;
        return <ellipse key={`m${i}`} cx={cx} cy={cy} rx="10" ry="16" fill={c.petal} transform={`rotate(${deg} ${cx} ${cy})`} />;
      })}
      {/* Inner ring */}
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i / 6) * Math.PI * 2;
        const cx = fx + Math.sin(a) * 7;
        const cy = fy - Math.cos(a) * 6;
        const deg = (i / 6) * 360;
        return <ellipse key={`n${i}`} cx={cx} cy={cy} rx="7" ry="11" fill={c.petal2} opacity="0.95" transform={`rotate(${deg} ${cx} ${cy})`} />;
      })}
      <circle cx={fx} cy={fy} r="5" fill={c.center} />
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i / 6) * Math.PI * 2;
        return <circle key={i} cx={fx + Math.sin(a) * 3} cy={fy - Math.cos(a) * 3} r="1.5" fill={c.center2} />;
      })}
    </>
  );
}

// ─── Dahlia Flower ────────────────────────────────────────────────────────────

function DahliaFlowerStage2({ c }: { c: Plant["colors"] }) {
  return (
    <>
      <Soil />
      <StemMedium color={c.stem} />
      <LeavesStage2 leaf={c.leaf} leaf2={c.leaf2} />
      {Array.from({ length: 10 }).map((_, i) => {
        const a = (i / 10) * Math.PI * 2;
        const cx = 100 + Math.sin(a) * 16;
        const cy = 152 - Math.cos(a) * 16;
        const deg = (i / 10) * 360;
        return <ellipse key={i} cx={cx} cy={cy} rx="5" ry="14" fill={c.petal} opacity="0.82" transform={`rotate(${deg} ${cx} ${cy})`} />;
      })}
      <circle cx="100" cy="152" r="7" fill={c.center} />
    </>
  );
}

function DahliaFlowerStage3({ c }: { c: Plant["colors"] }) {
  const fx = 100, fy = 134;
  return (
    <>
      <Soil />
      <StemFull color={c.stem} />
      <LeavesStage3 leaf={c.leaf} leaf2={c.leaf2} />
      {/* Outer ring */}
      {Array.from({ length: 14 }).map((_, i) => {
        const a = (i / 14) * Math.PI * 2;
        const cx = fx + Math.sin(a) * 26;
        const cy = fy - Math.cos(a) * 26;
        const deg = (i / 14) * 360;
        return <ellipse key={`o${i}`} cx={cx} cy={cy} rx="5" ry="16" fill={c.petal2} opacity="0.8" transform={`rotate(${deg} ${cx} ${cy})`} />;
      })}
      {/* Middle ring */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2 + Math.PI / 12;
        const cx = fx + Math.sin(a) * 17;
        const cy = fy - Math.cos(a) * 17;
        const deg = (i / 12) * 360 + 15;
        return <ellipse key={`m${i}`} cx={cx} cy={cy} rx="5" ry="13" fill={c.petal} transform={`rotate(${deg} ${cx} ${cy})`} />;
      })}
      {/* Inner ring */}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const cx = fx + Math.sin(a) * 9;
        const cy = fy - Math.cos(a) * 9;
        const deg = (i / 8) * 360;
        return <ellipse key={`n${i}`} cx={cx} cy={cy} rx="4" ry="10" fill={c.petal2} transform={`rotate(${deg} ${cx} ${cy})`} />;
      })}
      <circle cx={fx} cy={fy} r="5" fill={c.center} />
      <circle cx={fx} cy={fy} r="3" fill={c.center2} />
    </>
  );
}

// ─── Hydrangea ────────────────────────────────────────────────────────────────

function HydrangeaFloret({ cx, cy, size, c, flip }: { cx: number; cy: number; size: number; c: Plant["colors"]; flip: boolean }) {
  return (
    <g>
      {[0, 90, 180, 270].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        const px = cx + Math.sin(rad) * size;
        const py = cy - Math.cos(rad) * size;
        return <ellipse key={i} cx={px} cy={py} rx={size * 0.72} ry={size * 0.95}
          fill={flip ? c.petal2 : c.petal} opacity="0.88"
          transform={`rotate(${a} ${px} ${py})`} />;
      })}
      <circle cx={cx} cy={cy} r={size * 0.42} fill={c.center} />
    </g>
  );
}

function HydrangeaStage2({ c }: { c: Plant["colors"] }) {
  const florets: [number, number, boolean][] = [
    [100, 148, false], [86, 156, true], [114, 156, false], [93, 165, true], [107, 165, false],
  ];
  return (
    <>
      <Soil />
      <StemMedium color={c.stem} />
      <LeavesStage2 leaf={c.leaf} leaf2={c.leaf2} />
      {florets.map(([cx, cy, flip], i) => <HydrangeaFloret key={i} cx={cx} cy={cy} size={5} c={c} flip={flip} />)}
    </>
  );
}

function HydrangeaStage3({ c }: { c: Plant["colors"] }) {
  const florets: [number, number, boolean][] = [
    [100, 120, false], [82, 128, true], [118, 128, false],
    [70, 140, true], [100, 136, false], [130, 140, true],
    [76, 153, false], [100, 149, true], [124, 153, false],
    [88, 163, true], [112, 163, false], [100, 168, true],
  ];
  return (
    <>
      <Soil />
      <StemFull color={c.stem} />
      <LeavesStage3 leaf={c.leaf} leaf2={c.leaf2} />
      {florets.map(([cx, cy, flip], i) => <HydrangeaFloret key={i} cx={cx} cy={cy} size={7} c={c} flip={flip} />)}
    </>
  );
}

// ─── Blossom (Kersenbloesem) ──────────────────────────────────────────────────

function BlossomCluster({ cx, cy, r, c }: { cx: number; cy: number; r: number; c: Plant["colors"] }) {
  return (
    <g>
      {[0, 72, 144, 216, 288].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        const px = cx + Math.sin(rad) * r;
        const py = cy - Math.cos(rad) * r;
        return <ellipse key={i} cx={px} cy={py} rx={r * 0.65} ry={r * 0.85}
          fill={c.petal} opacity="0.9" transform={`rotate(${a} ${px} ${py})`} />;
      })}
      <circle cx={cx} cy={cy} r={r * 0.36} fill={c.center} />
      {[0, 60, 120, 180, 240, 300].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return <line key={i} x1={cx} y1={cy}
          x2={cx + Math.sin(rad) * r * 0.72} y2={cy - Math.cos(rad) * r * 0.72}
          stroke={c.center2} strokeWidth="0.7" opacity="0.65" />;
      })}
    </g>
  );
}

function BlossomStage2({ c }: { c: Plant["colors"] }) {
  return (
    <>
      <Soil />
      <StemMedium color={c.stem} />
      <LeavesStage2 leaf={c.leaf} leaf2={c.leaf2} />
      <path d="M100,164 Q88,155 80,147" stroke={c.stem} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M100,164 Q108,153 116,147" stroke={c.stem} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <BlossomCluster cx={80} cy={144} r={8} c={c} />
      <BlossomCluster cx={100} cy={150} r={8} c={c} />
      <BlossomCluster cx={118} cy={144} r={8} c={c} />
    </>
  );
}

function BlossomStage3({ c }: { c: Plant["colors"] }) {
  const fx = 100, fy = 148;
  return (
    <>
      <Soil />
      <StemFull color={c.stem} />
      <LeavesStage3 leaf={c.leaf} leaf2={c.leaf2} />
      <path d={`M${fx},${fy + 14} Q${fx - 16},${fy + 2} ${fx - 26},${fy - 12}`} stroke={c.stem} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d={`M${fx},${fy + 14} Q${fx + 5},${fy - 2} ${fx + 4},${fy - 20}`} stroke={c.stem} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d={`M${fx},${fy + 14} Q${fx + 16},${fy + 2} ${fx + 26},${fy - 12}`} stroke={c.stem} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d={`M${fx - 16},${fy - 4} Q${fx - 22},${fy - 12} ${fx - 20},${fy - 22}`} stroke={c.stem} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d={`M${fx + 16},${fy - 4} Q${fx + 22},${fy - 12} ${fx + 20},${fy - 22}`} stroke={c.stem} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <BlossomCluster cx={fx - 26} cy={fy - 16} r={9} c={c} />
      <BlossomCluster cx={fx - 20} cy={fy - 26} r={8} c={c} />
      <BlossomCluster cx={fx + 4} cy={fy - 22} r={9} c={c} />
      <BlossomCluster cx={fx + 26} cy={fy - 16} r={9} c={c} />
      <BlossomCluster cx={fx + 20} cy={fy - 26} r={8} c={c} />
    </>
  );
}

// ─── Bell (foxglove / hyacinth / bluebell / gladiolus) ───────────────────────

function BellStage2({ c }: { c: Plant["colors"] }) {
  const bells = [{ y: 248, h: 16, w: 11, xo: -5 }, { y: 226, h: 14, w: 9, xo: 4 }, { y: 207, h: 12, w: 8, xo: -3 }];
  return (
    <>
      <Soil />
      <StemMedium color={c.stem} />
      {[224, 205].map((ly, i) => (
        <ellipse key={i} cx={90 - i * 3} cy={ly} rx="9" ry="4" fill={c.leaf} transform={`rotate(-32 ${90 - i * 3} ${ly})`} />
      ))}
      {bells.map(({ y, h, w, xo }, i) => {
        const cx = 100 + xo;
        return (
          <g key={i}>
            <line x1="100" y1={y - h} x2={cx} y2={y - h + 3} stroke={c.stem} strokeWidth="1" opacity="0.65" />
            <path d={`M${cx},${y - h} C${cx - 2},${y - h + 4} ${cx - w},${y - h / 2} ${cx - w},${y} Q${cx},${y + 5} ${cx + w},${y} C${cx + w},${y - h / 2} ${cx + 2},${y - h + 4} ${cx},${y - h} Z`} fill={c.petal} opacity={0.9 - i * 0.05} />
            <path d={`M${cx - w * 0.5},${y - h + 4} C${cx - w * 0.45},${y - 2} ${cx},${y + 3} ${cx + w * 0.5},${y - h + 4}`} fill={c.petal2} opacity="0.5" />
          </g>
        );
      })}
    </>
  );
}

function BellStage3({ c }: { c: Plant["colors"] }) {
  const bells = [
    { y: 254, h: 20, w: 13, xo: -6 }, { y: 230, h: 18, w: 11, xo: 5 },
    { y: 208, h: 16, w: 10, xo: -4 }, { y: 188, h: 14, w: 9, xo: 4 },
    { y: 170, h: 12, w: 8, xo: -3 }, { y: 154, h: 10, w: 6, xo: 2 },
  ];
  return (
    <>
      <Soil />
      <StemFull color={c.stem} />
      {[228, 208, 190].map((ly, i) => (
        <ellipse key={i} cx={90 - i * 2} cy={ly} rx="10" ry="4.5" fill={c.leaf} transform={`rotate(-34 ${90 - i * 2} ${ly})`} />
      ))}
      {bells.map(({ y, h, w, xo }, i) => {
        const cx = 100 + xo;
        return (
          <g key={i}>
            <line x1="100" y1={y - h} x2={cx} y2={y - h + 3} stroke={c.stem} strokeWidth="1" opacity="0.65" />
            <path d={`M${cx},${y - h} C${cx - 2},${y - h + 4} ${cx - w},${y - h / 2} ${cx - w},${y} Q${cx},${y + 5} ${cx + w},${y} C${cx + w},${y - h / 2} ${cx + 2},${y - h + 4} ${cx},${y - h} Z`} fill={c.petal} />
            <path d={`M${cx - w * 0.5},${y - h + 4} C${cx - w * 0.45},${y - 2} ${cx},${y + 3} ${cx + w * 0.5},${y - h + 4}`} fill={c.petal2} opacity="0.55" />
            {i < 3 && <circle cx={cx} cy={y + 4} r="1.5" fill={c.petal2} opacity="0.7" />}
          </g>
        );
      })}
    </>
  );
}

// ─── Trumpet (morning glory / petunia) ───────────────────────────────────────

function TrumpetStage2({ c }: { c: Plant["colors"] }) {
  const fx = 100, fy = 152;
  return (
    <>
      <Soil />
      <StemMedium color={c.stem} />
      <LeavesStage2 leaf={c.leaf} leaf2={c.leaf2} />
      {Array.from({ length: 5 }).map((_, i) => {
        const a1 = (i / 5) * Math.PI * 2 - Math.PI / 2;
        const a2 = ((i + 0.5) / 5) * Math.PI * 2 - Math.PI / 2;
        const a3 = ((i + 1) / 5) * Math.PI * 2 - Math.PI / 2;
        const lx = fx + Math.cos(a1) * 14, ly = fy + Math.sin(a1) * 11;
        const tx = fx + Math.cos(a2) * 20, ty = fy + Math.sin(a2) * 16;
        const rx = fx + Math.cos(a3) * 14, ry2 = fy + Math.sin(a3) * 11;
        return <path key={i} d={`M${fx},${fy} L${lx},${ly} Q${tx},${ty} ${rx},${ry2} Z`} fill={i % 2 === 0 ? c.petal : c.petal2} opacity="0.85" />;
      })}
      <circle cx={fx} cy={fy} r="8" fill={c.center} opacity="0.8" />
    </>
  );
}

function TrumpetStage3({ c }: { c: Plant["colors"] }) {
  const fx = 100, fy = 148;
  const r = 34;
  return (
    <>
      <Soil />
      <StemFull color={c.stem} />
      <LeavesStage3 leaf={c.leaf} leaf2={c.leaf2} />
      {Array.from({ length: 5 }).map((_, i) => {
        const a1 = (i / 5) * Math.PI * 2 - Math.PI / 2;
        const a2 = ((i + 0.5) / 5) * Math.PI * 2 - Math.PI / 2;
        const a3 = ((i + 1) / 5) * Math.PI * 2 - Math.PI / 2;
        const lx = fx + Math.cos(a1) * (r * 0.65), ly = fy + Math.sin(a1) * (r * 0.6);
        const tx = fx + Math.cos(a2) * r, ty = fy + Math.sin(a2) * (r * 0.88);
        const rx = fx + Math.cos(a3) * (r * 0.65), ry2 = fy + Math.sin(a3) * (r * 0.6);
        return <path key={i} d={`M${fx},${fy} L${lx},${ly} Q${tx},${ty} ${rx},${ry2} Z`} fill={i % 2 === 0 ? c.petal : c.petal2} />;
      })}
      {Array.from({ length: 5 }).map((_, i) => {
        const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
        return <line key={i} x1={fx} y1={fy} x2={fx + Math.cos(a) * 28} y2={fy + Math.sin(a) * 25} stroke={c.petal2} strokeWidth="1.5" opacity="0.45" />;
      })}
      <circle cx={fx} cy={fy} r="13" fill={c.center} opacity="0.65" />
      <circle cx={fx} cy={fy} r="8" fill="white" opacity="0.45" />
      <circle cx={fx} cy={fy} r="4.5" fill={c.center2} />
    </>
  );
}

// ─── Iris ─────────────────────────────────────────────────────────────────────

function IrisStage2({ c }: { c: Plant["colors"] }) {
  const fx = 100, fy = 150;
  return (
    <>
      <Soil />
      <StemMedium color={c.stem} />
      <LeavesStage2 leaf={c.leaf} leaf2={c.leaf2} />
      {[0, 120, 240].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const cx = fx + Math.sin(rad) * 9, cy = fy - Math.cos(rad) * 7;
        return <ellipse key={i} cx={cx} cy={cy + 8} rx="9" ry="14" fill={c.petal} opacity="0.85" transform={`rotate(${deg + 90} ${cx} ${cy + 8})`} />;
      })}
      {[60, 180, 300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const cx = fx + Math.sin(rad) * 7, cy = fy - Math.cos(rad) * 5 - 10;
        return <ellipse key={i} cx={cx} cy={cy - 8} rx="7" ry="13" fill={c.petal2} opacity="0.8" transform={`rotate(${deg} ${cx} ${cy - 8})`} />;
      })}
    </>
  );
}

function IrisStage3({ c }: { c: Plant["colors"] }) {
  const fx = 100, fy = 148;
  return (
    <>
      <Soil />
      <StemFull color={c.stem} />
      <LeavesStage3 leaf={c.leaf} leaf2={c.leaf2} />
      {/* Falls — 3 wide drooping petals */}
      {[0, 120, 240].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const cx = fx + Math.sin(rad) * 18, cy = fy - Math.cos(rad) * 10 + 10;
        return (
          <g key={`f${i}`}>
            <ellipse cx={cx} cy={cy + 10} rx="17" ry="22" fill={c.petal} opacity="0.9" transform={`rotate(${deg + 90} ${cx} ${cy + 10})`} />
            <ellipse cx={cx} cy={cy + 10} rx="5" ry="9" fill={c.center} opacity="0.7" transform={`rotate(${deg + 90} ${cx} ${cy + 10})`} />
          </g>
        );
      })}
      {/* Standards — 3 upright petals */}
      {[60, 180, 300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const cx = fx + Math.sin(rad) * 10, cy = fy - Math.cos(rad) * 8 - 10;
        return <ellipse key={`s${i}`} cx={cx} cy={cy - 12} rx="12" ry="22" fill={c.petal2} opacity="0.92" transform={`rotate(${deg} ${cx} ${cy - 12})`} />;
      })}
      <circle cx={fx} cy={fy} r="8" fill={c.center2} opacity="0.75" />
    </>
  );
}

// ─── Allium (globe of stars) ──────────────────────────────────────────────────

function AlliumStage2({ c }: { c: Plant["colors"] }) {
  const fx = 100, fy = 160;
  const positions: [number, number][] = [
    [100, 160], [118, 166], [82, 166], [100, 178], [118, 154], [82, 154],
    [110, 172], [90, 172], [110, 149], [90, 149], [100, 145],
  ];
  return (
    <>
      <Soil />
      <path d="M100,266 C100,248 100,220 100,178" stroke={c.stem} strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx={fx} cy={fy} r="22" fill={c.petal2} opacity="0.12" />
      {positions.map(([x, y], i) => (
        <g key={i}>
          {[0, 72, 144, 216, 288].map((a, j) => {
            const ar = (a * Math.PI) / 180;
            return <line key={j} x1={x} y1={y} x2={x + Math.cos(ar) * 4} y2={y + Math.sin(ar) * 4} stroke={i % 2 === 0 ? c.petal : c.petal2} strokeWidth="1" />;
          })}
          <circle cx={x} cy={y} r="1.1" fill={c.center} />
        </g>
      ))}
    </>
  );
}

function AlliumStage3({ c }: { c: Plant["colors"] }) {
  const fx = 100, fy = 118;
  const positions: [number, number][] = [
    [100, 118], [132, 118], [68, 118], [100, 86], [100, 150],
    [128, 102], [72, 102], [128, 134], [72, 134],
    [140, 118], [60, 118], [100, 80], [100, 156],
    [122, 94], [78, 94], [122, 142], [78, 142],
    [134, 108], [66, 108], [134, 128], [66, 128],
    [116, 88], [84, 88], [116, 148], [84, 148],
    [126, 112], [74, 112], [126, 124], [74, 124],
    [138, 116], [62, 116], [138, 120], [62, 120],
    [110, 84], [90, 84], [110, 152], [90, 152],
  ];
  return (
    <>
      <Soil />
      <path d="M100,266 C100,242 100,198 100,158" stroke={c.stem} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <circle cx={fx} cy={fy} r="40" fill={c.petal2} opacity="0.1" />
      {positions.map(([x, y], i) => {
        const sz = i < 20 ? 4.5 : 3.5;
        return (
          <g key={i}>
            {[0, 72, 144, 216, 288].map((a, j) => {
              const ar = (a * Math.PI) / 180;
              return <line key={j} x1={x} y1={y} x2={x + Math.cos(ar) * sz} y2={y + Math.sin(ar) * sz} stroke={i % 2 === 0 ? c.petal : c.petal2} strokeWidth="1.1" />;
            })}
            <circle cx={x} cy={y} r="1.2" fill={c.center} />
          </g>
        );
      })}
    </>
  );
}

// ─── Cone (echinacea) ─────────────────────────────────────────────────────────

function ConeStage2({ c }: { c: Plant["colors"] }) {
  const fx = 100, fy = 152;
  return (
    <>
      <Soil />
      <StemMedium color={c.stem} />
      <LeavesStage2 leaf={c.leaf} leaf2={c.leaf2} />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const cx = fx + Math.sin(a) * 18, cy = fy - Math.cos(a) * 16 + 4;
        const deg = (i / 8) * 360 + 15;
        return <ellipse key={i} cx={cx} cy={cy} rx="4.5" ry="13" fill={c.petal} opacity="0.8" transform={`rotate(${deg} ${cx} ${cy})`} />;
      })}
      <ellipse cx={fx} cy={fy - 2} rx="11" ry="9" fill={c.center} />
      <ellipse cx={fx} cy={fy - 4} rx="7" ry="5.5" fill={c.center2} />
    </>
  );
}

function ConeStage3({ c }: { c: Plant["colors"] }) {
  const fx = 100, fy = 148;
  return (
    <>
      <Soil />
      <StemFull color={c.stem} />
      <LeavesStage3 leaf={c.leaf} leaf2={c.leaf2} />
      {Array.from({ length: 14 }).map((_, i) => {
        const a = (i / 14) * Math.PI * 2;
        const cx = fx + Math.sin(a) * 26, cy = fy - Math.cos(a) * 22 + 8;
        const deg = (i / 14) * 360 + 18;
        return <ellipse key={i} cx={cx} cy={cy} rx="5" ry="19" fill={c.petal} opacity="0.85" transform={`rotate(${deg} ${cx} ${cy})`} />;
      })}
      <ellipse cx={fx} cy={fy - 5} rx="18" ry="14" fill={c.center} />
      <ellipse cx={fx} cy={fy - 8} rx="13" ry="10" fill={c.center2} />
      {Array.from({ length: 18 }).map((_, i) => {
        const a = (i / 18) * Math.PI * 2;
        const r = 7 + (i % 2) * 4;
        return <circle key={i} cx={fx + Math.sin(a) * r * 0.85} cy={fy - 8 - Math.cos(a) * r * 0.65} r="1.4" fill={c.center} opacity="0.55" />;
      })}
    </>
  );
}

// ─── Umbrella (dill / fennel / wild carrot) ───────────────────────────────────

function UmbrellaStage2({ c }: { c: Plant["colors"] }) {
  const fx = 100, fy = 160;
  const spokes: [number, number][] = [[-22, 26], [-10, 32], [0, 34], [12, 32], [24, 26]];
  return (
    <>
      <Soil />
      <StemMedium color={c.stem} />
      <LeavesStage2 leaf={c.leaf} leaf2={c.leaf2} />
      {spokes.map(([dx, dy], i) => (
        <g key={i}>
          <line x1={fx} y1={fy} x2={fx + dx} y2={fy - dy} stroke={c.stem} strokeWidth="1.1" opacity="0.75" />
          <circle cx={fx + dx} cy={fy - dy} r="2.5" fill={c.petal} opacity="0.9" />
        </g>
      ))}
    </>
  );
}

function UmbrellaStage3({ c }: { c: Plant["colors"] }) {
  const fx = 100, fy = 155;
  const mainSpokes: [number, number][] = [[-36, 36], [-22, 46], [-8, 50], [8, 50], [22, 46], [36, 36], [0, 52]];
  return (
    <>
      <Soil />
      <StemFull color={c.stem} />
      <LeavesStage3 leaf={c.leaf} leaf2={c.leaf2} />
      {mainSpokes.map(([dx, dy], i) => {
        const ex = fx + dx, ey = fy - dy;
        return (
          <g key={i}>
            <line x1={fx} y1={fy} x2={ex} y2={ey} stroke={c.stem} strokeWidth="1.2" opacity="0.7" />
            {[-7, 0, 7].map((j) => {
              const sx = ex + j, sy = ey - 7;
              return (
                <g key={j}>
                  <line x1={ex} y1={ey} x2={sx} y2={sy} stroke={c.stem} strokeWidth="0.8" opacity="0.55" />
                  <circle cx={sx} cy={sy} r="2.4" fill={c.petal} opacity="0.92" />
                </g>
              );
            })}
            <circle cx={ex} cy={ey} r="1.5" fill={c.petal2} />
          </g>
        );
      })}
    </>
  );
}

// ─── Ukulele effect ───────────────────────────────────────────────────────────

function UkuleleEffect() {
  const notes = [
    { x: 30,  y: 155, delay: 0.0, col: "#ff6b6b" },
    { x: 165, y: 145, delay: 0.7, col: "#4d96ff" },
    { x: 48,  y: 105, delay: 1.4, col: "#6bcb77" },
    { x: 150, y: 115, delay: 0.35, col: "#ffd93d" },
    { x: 22,  y: 128, delay: 1.0, col: "#c77dff" },
    { x: 172, y: 90,  delay: 1.7, col: "#ff9f43" },
  ];
  const stars = [
    { x: 26,  y: 92,  col: "#ff6b6b", delay: 0.2 },
    { x: 174, y: 98,  col: "#ffd93d", delay: 0.8 },
    { x: 42,  y: 148, col: "#6bcb77", delay: 0.5 },
    { x: 158, y: 152, col: "#4d96ff", delay: 1.1 },
    { x: 34,  y: 72,  col: "#c77dff", delay: 1.4 },
    { x: 166, y: 78,  col: "#ff9f43", delay: 0.1 },
    { x: 100, y: 68,  col: "#ffd93d", delay: 0.9 },
  ];
  return (
    <>
      {notes.map((n, i) => (
        <g key={`un${i}`} style={{ animation: `noteFloat 2.4s ease-in-out infinite`, animationDelay: `${n.delay}s` }}>
          <circle cx={n.x} cy={n.y + 11} r="4.5" fill={n.col} opacity="0.92" />
          <line x1={n.x + 4.5} y1={n.y + 11} x2={n.x + 4.5} y2={n.y - 1} stroke={n.col} strokeWidth="1.8" opacity="0.92" />
          <line x1={n.x + 4.5} y1={n.y - 1} x2={n.x + 12} y2={n.y - 5} stroke={n.col} strokeWidth="1.5" opacity="0.92" />
        </g>
      ))}
      {stars.map((s, i) => (
        <g key={`us${i}`} style={{ animation: `sparkle ${1.3 + i * 0.18}s ease-in-out infinite`, animationDelay: `${s.delay}s` }}>
          <path d={`M${s.x},${s.y - 6} L${s.x + 1.8},${s.y - 1.8} L${s.x + 6},${s.y} L${s.x + 1.8},${s.y + 1.8} L${s.x},${s.y + 6} L${s.x - 1.8},${s.y + 1.8} L${s.x - 6},${s.y} L${s.x - 1.8},${s.y - 1.8} Z`}
            fill={s.col} opacity="0.88" />
        </g>
      ))}
    </>
  );
}

// ─── Sparkles for stage 3 ─────────────────────────────────────────────────────

function Sparkles({ color }: { color: string }) {
  const stars = [
    [28, 118], [172, 108], [152, 168], [48, 158], [160, 90], [40, 96],
  ];
  return (
    <>
      {stars.map(([x, y], i) => (
        <g key={i} style={{ animation: `sparkle ${1 + i * 0.3}s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}>
          <path d={`M${x},${y - 5} L${x + 1.5},${y - 1.5} L${x + 5},${y} L${x + 1.5},${y + 1.5} L${x},${y + 5} L${x - 1.5},${y + 1.5} L${x - 5},${y} L${x - 1.5},${y - 1.5} Z`} fill={color} opacity="0.7" />
        </g>
      ))}
    </>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function PlantSVG({ plant, stage, size = 240, animate = true, ukulele = false }: Props) {
  const c = plant.colors;

  function renderPlant() {
    const s = plant.shape;

    if (stage === 0) {
      if (s === "cactus") return <CactusStage0 />;
      if (s === "tree_round") return <TreeRoundStage0 />;
      if (s === "tree_pine") return <TreePineStage0 />;
      if (s === "tree_willow") return <TreeWillowStage0 />;
      return <RoundFlowerStage0 />;
    }
    if (stage === 1) {
      if (s === "cactus") return <CactusStage1 c={c} />;
      if (s === "succulent") return <SucculentStage1 c={c} />;
      if (s === "bamboo") return <BambooStage1 c={c} />;
      if (s === "fern") return <FernStage1 c={c} />;
      if (s === "tree_round") return <TreeRoundStage1 c={c} />;
      if (s === "tree_pine") return <TreePineStage1 c={c} />;
      if (s === "tree_willow") return <TreeWillowStage1 c={c} />;
      return (
        <>
          <Soil />
          <StemSprout color={c.stem} />
          <CotyledonLeaves leaf={c.leaf} />
        </>
      );
    }
    if (stage === 2) {
      if (s === "cactus") return <CactusStage2 c={c} />;
      if (s === "succulent") return <SucculentStage2 c={c} />;
      if (s === "bamboo") return <BambooStage2 c={c} />;
      if (s === "fern") return <FernStage2 c={c} />;
      if (s === "tree_round") return <TreeRoundStage2 c={c} />;
      if (s === "tree_pine") return <TreePineStage2 c={c} />;
      if (s === "tree_willow") return <TreeWillowStage2 c={c} />;
      if (s === "sunflower") return <SunflowerStage2 c={c} />;
      if (s === "cup") return <CupFlowerStage2 c={c} />;
      if (s === "spike") return <SpikeStage2 c={c} />;
      if (s === "rose") return <RoseStage2 c={c} />;
      if (s === "daisy") return <DaisyStage2 c={c} />;
      if (s === "poppy") return <PoppyStage2 c={c} />;
      if (s === "pansy") return <PansyStage2 c={c} />;
      if (s === "peony") return <PeonyStage2 c={c} />;
      if (s === "dahlia_flower") return <DahliaFlowerStage2 c={c} />;
      if (s === "hydrangea") return <HydrangeaStage2 c={c} />;
      if (s === "blossom") return <BlossomStage2 c={c} />;
      if (s === "bell") return <BellStage2 c={c} />;
      if (s === "trumpet") return <TrumpetStage2 c={c} />;
      if (s === "iris") return <IrisStage2 c={c} />;
      if (s === "allium") return <AlliumStage2 c={c} />;
      if (s === "cone") return <ConeStage2 c={c} />;
      if (s === "umbrella") return <UmbrellaStage2 c={c} />;
      return <RoundFlowerStage2 c={c} />;
    }
    // stage 3
    if (s === "cactus") return <CactusStage3 c={c} />;
    if (s === "succulent") return <SucculentStage3 c={c} />;
    if (s === "bamboo") return <BambooStage3 c={c} />;
    if (s === "fern") return <FernStage3 c={c} />;
    if (s === "tree_round") return <TreeRoundStage3 c={c} />;
    if (s === "tree_pine") return <TreePineStage3 c={c} />;
    if (s === "tree_willow") return <TreeWillowStage3 c={c} />;
    if (s === "sunflower") return <SunflowerStage3 c={c} />;
    if (s === "cup") return <CupFlowerStage3 c={c} />;
    if (s === "spike") return <SpikeStage3 c={c} />;
    if (s === "rose") return <RoseStage3 c={c} />;
    if (s === "daisy") return <DaisyStage3 c={c} />;
    if (s === "poppy") return <PoppyStage3 c={c} />;
    if (s === "pansy") return <PansyStage3 c={c} />;
    if (s === "peony") return <PeonyStage3 c={c} />;
    if (s === "dahlia_flower") return <DahliaFlowerStage3 c={c} />;
    if (s === "hydrangea") return <HydrangeaStage3 c={c} />;
    if (s === "blossom") return <BlossomStage3 c={c} />;
    if (s === "bell") return <BellStage3 c={c} />;
    if (s === "trumpet") return <TrumpetStage3 c={c} />;
    if (s === "iris") return <IrisStage3 c={c} />;
    if (s === "allium") return <AlliumStage3 c={c} />;
    if (s === "cone") return <ConeStage3 c={c} />;
    if (s === "umbrella") return <UmbrellaStage3 c={c} />;
    return <RoundFlowerStage3 c={c} />;
  }

  const svgStyle: React.CSSProperties = ukulele
    ? { animation: "ukuleleDance 0.6s ease-in-out infinite" }
    : animate && stage === 3
    ? { animation: "float 3.5s ease-in-out infinite" }
    : undefined as unknown as React.CSSProperties;

  return (
    <svg
      viewBox="0 0 200 300"
      width={size}
      height={(size * 300) / 200}
      style={svgStyle}
    >
      <defs>
        <style>{`
          @keyframes sparkle {
            0%, 100% { opacity: 0.25; transform: scale(0.7); }
            50% { opacity: 1; transform: scale(1.3); }
          }
          @keyframes ukuleleDance {
            0%   { transform: rotate(-3deg) translateX(-2px); }
            25%  { transform: rotate(3deg) translateX(2px) scaleY(1.02); }
            50%  { transform: rotate(-2deg) translateX(-1px); }
            75%  { transform: rotate(2deg) translateX(1px) scaleY(1.02); }
            100% { transform: rotate(-3deg) translateX(-2px); }
          }
          @keyframes noteFloat {
            0%   { opacity: 0; transform: translateY(0px) scale(0.8); }
            15%  { opacity: 1; }
            100% { opacity: 0; transform: translateY(-55px) scale(1.1); }
          }
        `}</style>
      </defs>
      {renderPlant()}
      {stage === 3 && !ukulele && <Sparkles color={c.petal} />}
      {ukulele && <UkuleleEffect />}
    </svg>
  );
}
