import { Plant } from "@/lib/plants";

interface Props {
  plant: Plant;
  stage: 0 | 1 | 2 | 3;
  size?: number;
  animate?: boolean;
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
      {/* 3 outer petals (open cup) */}
      <path d={`M${fx},${fy + 10} C${fx - 32},${fy - 2} ${fx - 34},${fy - 28} ${fx - 14},${fy - 48} C${fx - 8},${fy - 56} ${fx},${fy - 60} ${fx},${fy - 60} L${fx},${fy + 10}`} fill={c.petal} />
      <path d={`M${fx},${fy + 10} C${fx + 32},${fy - 2} ${fx + 34},${fy - 28} ${fx + 14},${fy - 48} C${fx + 8},${fy - 56} ${fx},${fy - 60} ${fx},${fy - 60} L${fx},${fy + 10}`} fill={c.petal} />
      {/* Center back petal */}
      <path d={`M${fx - 10},${fy + 6} C${fx - 8},${fy - 18} ${fx},${fy - 62} ${fx + 10},${fy + 6}`} fill={c.petal2} opacity="0.75" />
      {/* Inner shading */}
      <path d={`M${fx - 10},${fy + 8} C${fx - 8},${fy - 10} ${fx},${fy - 55} ${fx + 10},${fy + 8}`} fill={c.petal2} opacity="0.4" />
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
      <path d={`M${spikeCx - 5},${spikeBottom} Q${spikeCx - 4},${spikeBottom - 30} ${spikeCx},${spikeBottom - 64} Q${spikeCx + 4},${spikeBottom - 30} ${spikeCx + 5},${spikeBottom}`} fill={c.petal} opacity="0.2" />
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

export default function PlantSVG({ plant, stage, size = 240, animate = true }: Props) {
  const c = plant.colors;

  function renderPlant() {
    const s = plant.shape;

    if (stage === 0) {
      if (s === "cactus") return <CactusStage0 />;
      return <RoundFlowerStage0 />;
    }
    if (stage === 1) {
      if (s === "cactus") return <CactusStage1 c={c} />;
      if (s === "succulent") return <SucculentStage1 c={c} />;
      if (s === "bamboo") return <BambooStage1 c={c} />;
      if (s === "fern") return <FernStage1 c={c} />;
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
      if (s === "sunflower") return <SunflowerStage2 c={c} />;
      if (s === "cup") return <CupFlowerStage2 c={c} />;
      if (s === "spike") return <SpikeStage2 c={c} />;
      return <RoundFlowerStage2 c={c} />;
    }
    // stage 3
    if (s === "cactus") return <CactusStage3 c={c} />;
    if (s === "succulent") return <SucculentStage3 c={c} />;
    if (s === "bamboo") return <BambooStage3 c={c} />;
    if (s === "fern") return <FernStage3 c={c} />;
    if (s === "sunflower") return <SunflowerStage3 c={c} />;
    if (s === "cup") return <CupFlowerStage3 c={c} />;
    if (s === "spike") return <SpikeStage3 c={c} />;
    return <RoundFlowerStage3 c={c} />;
  }

  return (
    <svg
      viewBox="0 0 200 300"
      width={size}
      height={(size * 300) / 200}
      style={animate && stage === 3 ? { animation: "float 3.5s ease-in-out infinite" } : undefined}
    >
      <defs>
        <style>{`
          @keyframes sparkle {
            0%, 100% { opacity: 0.25; transform: scale(0.7); }
            50% { opacity: 1; transform: scale(1.3); }
          }
        `}</style>
      </defs>
      {renderPlant()}
      {stage === 3 && <Sparkles color={c.petal} />}
    </svg>
  );
}
