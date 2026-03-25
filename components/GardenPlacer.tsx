"use client";

import { useRef, useState } from "react";
import { Plant } from "@/lib/plants";
import { DayRecord } from "@/lib/storage";
import PlantSVG from "./PlantSVG";
import { GrassField } from "./GrassBg";

interface Props {
  plant: Plant;
  existingPlants: DayRecord[];
  allPlants: Plant[];
  onPlace: (x: number, y: number) => void;
}

function seededRand(seed: string, extra = ""): number {
  const str = seed + extra;
  let h = 0xdeadbeef;
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 2654435761);
  h ^= h >>> 16;
  return Math.abs(h) / 0xffffffff;
}

export default function GardenPlacer({ plant, existingPlants, allPlants, onPlace }: Props) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  function handleCanvasInteraction(clientX: number, clientY: number) {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(4, Math.min(92, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.max(44, Math.min(88, ((clientY - rect.top) / rect.height) * 100));
    setPos({ x, y });
  }

  return (
    <div className="min-h-screen relative flex flex-col font-quicksand">
      {/* Fixed garden BG */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#c8e8f8] via-[#d8f4b0] to-[#88c050]" />
        <svg className="absolute left-0 right-0 w-full" style={{ bottom: "7rem" }} viewBox="0 0 400 80" preserveAspectRatio="none">
          <ellipse cx="60"  cy="80" rx="130" ry="65" fill="#a0cc60" opacity="0.45" />
          <ellipse cx="270" cy="80" rx="160" ry="72" fill="#90c050" opacity="0.38" />
        </svg>
        <GrassField count={55} />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <div className="px-5 pt-7 pb-3">
          <h1 className="text-2xl font-extrabold text-stone-700 drop-shadow-sm">
            waar zet je de {plant.name}?
          </h1>
          <p className="text-stone-600 text-sm font-medium mt-1 drop-shadow-sm">
            tik op het gras om een plek te kiezen
          </p>
        </div>

        {/* Interactive canvas */}
        <div
          ref={canvasRef}
          className="flex-1 relative cursor-crosshair select-none"
          style={{ minHeight: "360px" }}
          onClick={(e) => handleCanvasInteraction(e.clientX, e.clientY)}
          onTouchEnd={(e) => {
            const t = e.changedTouches[0];
            if (t) handleCanvasInteraction(t.clientX, t.clientY);
          }}
        >
          {/* Existing plants (background, small, non-interactive) */}
          {existingPlants.map((record) => {
            const p = allPlants.find((pl) => pl.id === record.plantId);
            if (!p) return null;
            const px = record.gardenX ?? (5 + seededRand(record.date, "x") * 82);
            const py = record.gardenY ?? (55 + seededRand(record.date, "y") * 25);
            const scale = 0.4 + ((py - 40) / 60) * 0.4;
            const sz = Math.round(50 * scale);
            const stage = Math.min(record.checkIns, 3) as 0 | 1 | 2 | 3;
            return (
              <div
                key={record.date}
                className="absolute pointer-events-none opacity-70"
                style={{
                  left: `${px}%`,
                  top: `${py}%`,
                  transform: "translate(-50%, -100%)",
                  zIndex: Math.round(py),
                }}
              >
                <PlantSVG plant={p} stage={stage} size={sz} animate={false} />
              </div>
            );
          })}

          {/* Preview of plant being placed */}
          {pos ? (
            <div
              className="absolute pointer-events-none"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: "translate(-50%, -100%)",
                zIndex: 99,
                filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))",
              }}
            >
              <PlantSVG plant={plant} stage={0} size={68} animate={false} />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white/65 backdrop-blur-sm rounded-2xl px-5 py-3 text-center shadow-sm mt-8">
                <p className="text-stone-600 font-bold text-sm">tik op het gras ↓</p>
              </div>
            </div>
          )}
        </div>

        {/* Confirm */}
        <div className="px-4 pb-8 pt-3">
          <button
            disabled={!pos}
            onClick={() => pos && onPlace(pos.x, pos.y)}
            className={`
              w-full py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 shadow-lg
              ${pos ? "bg-green-500 hover:bg-green-600 text-white shadow-green-300" : "bg-white/50 text-stone-300 cursor-not-allowed"}
            `}
          >
            {pos ? "hier planten 🌱" : "kies een plek"}
          </button>
        </div>
      </div>
    </div>
  );
}
