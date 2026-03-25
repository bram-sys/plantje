"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadState, getGardenPlants, getTotalCompleted, getStreak, DayRecord } from "@/lib/storage";
import { plants } from "@/lib/plants";
import PlantSVG from "@/components/PlantSVG";

// Seeded pseudo-random (deterministic per date)
function seededRand(seed: string, extra = ""): number {
  const str = seed + extra;
  let h = 0xdeadbeef;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 2654435761);
  }
  h ^= h >>> 16;
  return Math.abs(h) / 0xffffffff;
}

interface GardenPlant {
  record: DayRecord;
  x: number; // 0-100 (% of width)
  y: number; // 0-100 (% of height)
  scale: number;
}

function GrassField({ count = 40 }: { count?: number }) {
  const blades = Array.from({ length: count }).map((_, i) => ({
    x: (i / count) * 100 + seededRand(String(i), "gx") * (100 / count),
    height: 18 + seededRand(String(i), "gh") * 22,
    width: 3 + seededRand(String(i), "gw") * 3,
    lean: -20 + seededRand(String(i), "gl") * 40,
    shade: seededRand(String(i), "gc") > 0.5 ? "#7ac840" : "#5aaa28",
    delay: seededRand(String(i), "gd"),
  }));

  return (
    <div className="absolute bottom-0 left-0 right-0 h-28 overflow-hidden pointer-events-none">
      <svg viewBox="0 0 400 112" className="w-full h-full" preserveAspectRatio="none">
        {/* Ground fill */}
        <rect x="0" y="50" width="400" height="62" fill="#88c050" />
        <rect x="0" y="60" width="400" height="52" fill="#78b040" />
        {/* Undulating ground line */}
        <path d="M0,55 Q50,48 100,56 Q150,62 200,52 Q250,44 300,54 Q350,62 400,50 L400,112 L0,112 Z" fill="#98d060" />
        {blades.map((b, i) => (
          <g key={i} className="grass-blade" style={{ animationDelay: `${b.delay * -3}s` }}>
            <path
              d={`M${b.x * 4},108 Q${b.x * 4 + b.lean * 0.4},${108 - b.height * 0.5} ${b.x * 4 + b.lean * 0.7},${108 - b.height}`}
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

function EmptyGarden() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-4 pb-24">
      <span className="text-7xl opacity-40">🌱</span>
      <div className="text-center">
        <p className="text-stone-500 font-bold text-lg">Je tuin is nog leeg</p>
        <p className="text-stone-400 text-sm mt-1">Voltooi je eerste dag om hier<br />je eerste bloem te planten!</p>
      </div>
      <Link href="/">
        <button className="bg-green-500 text-white font-bold px-6 py-3 rounded-2xl shadow-md shadow-green-200 active:scale-95 transition-all">
          Ga water geven 💧
        </button>
      </Link>
    </div>
  );
}

export default function GardenPage() {
  const [gardenPlants, setGardenPlants] = useState<GardenPlant[]>([]);
  const [totalDays, setTotalDays] = useState(0);
  const [streak, setStreak] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const state = loadState();
    const records = getGardenPlants(state);
    setTotalDays(getTotalCompleted(state));
    setStreak(getStreak(state));

    // Assign stable positions
    const placed: GardenPlant[] = records.map((record, idx) => ({
      record,
      x: 5 + seededRand(record.date, "x") * 82,
      y: 30 + seededRand(record.date, "y") * 52,
      scale: 0.7 + seededRand(record.date, "s") * 0.45,
    }));
    setGardenPlants(placed);
    setLoaded(true);
  }, []);

  const GOAL_DAYS = 122; // ~4 months
  const progress = Math.min((totalDays / GOAL_DAYS) * 100, 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#c8e8f8] via-[#d8f0b0] to-[#88c050] flex flex-col font-nunito overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-7 pb-3">
        <Link href="/">
          <button className="flex items-center gap-1.5 bg-white/70 backdrop-blur-sm text-stone-600 font-bold text-sm px-3.5 py-2 rounded-full shadow-sm active:scale-95 transition-all">
            ← Terug
          </button>
        </Link>
        <h1 className="text-xl font-extrabold text-stone-700">Jouw Tuin 🌸</h1>
        <div className="w-16" />
      </div>

      {/* Stats bar */}
      <div className="mx-4 mb-3">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm px-4 py-3 flex items-center justify-between">
          <div className="text-center">
            <p className="text-2xl font-extrabold text-stone-700">{totalDays}</p>
            <p className="text-[10px] text-stone-400 font-semibold">bloemen</p>
          </div>
          <div className="flex-1 mx-4">
            <div className="flex justify-between text-[10px] text-stone-400 font-semibold mb-1">
              <span>{totalDays} / {GOAL_DAYS} dagen</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[9px] text-stone-400 mt-1 font-medium">doel: {GOAL_DAYS} dagen (4 maanden)</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-extrabold text-orange-500">{streak}</p>
            <p className="text-[10px] text-stone-400 font-semibold">streak 🔥</p>
          </div>
        </div>
      </div>

      {/* Garden canvas */}
      <div className="flex-1 relative mx-4 mb-4 rounded-3xl overflow-hidden shadow-lg" style={{ minHeight: "360px" }}>
        {/* Sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#c0e4f8] via-[#d8f0a8] to-[#a8d868]" />

        {/* Distant hills */}
        <svg className="absolute bottom-20 left-0 right-0 w-full" viewBox="0 0 400 80" preserveAspectRatio="none">
          <ellipse cx="80" cy="80" rx="120" ry="60" fill="#a0cc60" opacity="0.6" />
          <ellipse cx="280" cy="80" rx="150" ry="70" fill="#90c050" opacity="0.5" />
          <ellipse cx="380" cy="80" rx="90" ry="50" fill="#b0d870" opacity="0.4" />
        </svg>

        {/* Waving grass */}
        <GrassField count={50} />

        {/* Plants */}
        {!loaded ? null : gardenPlants.length === 0 ? (
          <EmptyGarden />
        ) : (
          gardenPlants.map((gp) => {
            const plant = plants.find((p) => p.id === gp.record.plantId);
            if (!plant) return null;
            const plantSize = Math.round(60 * gp.scale);
            return (
              <div
                key={gp.record.date}
                className="absolute flex flex-col items-center"
                style={{
                  left: `${gp.x}%`,
                  bottom: `${18 + gp.y * 0.2}%`,
                  transform: `translateX(-50%)`,
                  zIndex: Math.round(gp.y),
                }}
              >
                <div style={{ transform: `scale(${gp.scale})`, transformOrigin: "bottom center" }}>
                  <PlantSVG plant={plant} stage={3} size={plantSize} animate={false} />
                </div>
              </div>
            );
          })
        )}

        {/* Empty state overlay when no plants */}
        {loaded && gardenPlants.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pb-20">
            <span className="text-5xl opacity-50">🌱</span>
            <p className="text-stone-600 font-bold text-base mt-3">Nog geen bloemen</p>
            <p className="text-stone-500 text-xs mt-1 text-center px-8">Voltooi 3 check-ins op een dag<br/>om hier een bloem te planten!</p>
          </div>
        )}
      </div>

      {/* Completed days list */}
      {gardenPlants.length > 0 && (
        <div className="mx-4 mb-8">
          <h2 className="text-stone-600 font-bold text-sm px-1 mb-2">Jouw oogst 🌷</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[...gardenPlants].reverse().map((gp) => {
              const plant = plants.find((p) => p.id === gp.record.plantId);
              if (!plant) return null;
              const date = new Date(gp.record.date);
              const label = date.toLocaleDateString("nl-NL", { day: "numeric", month: "short" });
              return (
                <div
                  key={gp.record.date}
                  className="flex-shrink-0 bg-white/80 backdrop-blur-sm rounded-2xl p-2.5 flex flex-col items-center gap-1 shadow-sm"
                  style={{ minWidth: "70px" }}
                >
                  <PlantSVG plant={plant} stage={3} size={48} animate={false} />
                  <p className="text-[10px] font-bold text-stone-600">{plant.name}</p>
                  <p className="text-[9px] text-stone-400">{label}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CTA if not done today */}
      <div className="mx-4 pb-8">
        <Link href="/">
          <button className="w-full bg-white/80 backdrop-blur-sm text-green-700 font-bold py-3.5 rounded-2xl shadow-sm border border-green-100 active:scale-95 transition-all">
            💧 Terug naar vandaag
          </button>
        </Link>
      </div>
    </div>
  );
}
