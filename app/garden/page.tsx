"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadState, getGardenPlants, getTotalCompleted, getStreak, DayRecord } from "@/lib/storage";
import { plants, Plant } from "@/lib/plants";
import PlantSVG from "@/components/PlantSVG";
import { GrassField } from "@/components/GrassBg";

function seededRand(seed: string, extra = ""): number {
  const str = seed + extra;
  let h = 0xdeadbeef;
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 2654435761);
  h ^= h >>> 16;
  return Math.abs(h) / 0xffffffff;
}

function getRenderPos(record: DayRecord): { x: number; y: number } {
  if (record.gardenX !== null && record.gardenY !== null) {
    return { x: record.gardenX, y: record.gardenY };
  }
  return {
    x: 5 + seededRand(record.date, "x") * 82,
    y: 55 + seededRand(record.date, "y") * 25,
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" });
}

interface Popup { record: DayRecord; plant: Plant }

export default function GardenPage() {
  const [gardenPlants, setGardenPlants] = useState<DayRecord[]>([]);
  const [totalDays, setTotalDays] = useState(0);
  const [streak, setStreak] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [popup, setPopup] = useState<Popup | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const state = loadState();
    setGardenPlants(getGardenPlants(state));
    setTotalDays(getTotalCompleted(state));
    setStreak(getStreak(state));
    setLoaded(true);
  }, []);

  function handleExport() {
    const data = localStorage.getItem("plantje_v1") ?? "{}";
    navigator.clipboard.writeText(data).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="min-h-screen flex flex-col font-quicksand overflow-hidden">
      {/* Full garden background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#c8e8f8] via-[#d8f4b0] to-[#88c050]" />
        <svg className="absolute left-0 right-0 w-full" style={{ bottom: "7rem" }} viewBox="0 0 400 80" preserveAspectRatio="none">
          <ellipse cx="60"  cy="80" rx="130" ry="65" fill="#a0cc60" opacity="0.45" />
          <ellipse cx="270" cy="80" rx="160" ry="72" fill="#90c050" opacity="0.38" />
          <ellipse cx="390" cy="80" rx="100" ry="55" fill="#b0d870" opacity="0.3" />
        </svg>
        <GrassField count={55} />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-7 pb-3">
          <Link href="/">
            <button className="flex items-center gap-1.5 bg-white/75 backdrop-blur-sm text-stone-600 font-bold text-sm px-3.5 py-2 rounded-full shadow-sm active:scale-95 transition-all border border-white/50">
              ← terug
            </button>
          </Link>
          <h1 className="text-xl font-extrabold text-stone-700 drop-shadow-sm">de tuin</h1>
          <div className="w-16" />
        </div>

        {/* Stats bar */}
        <div className="mx-4 mb-3">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm px-5 py-3 flex items-center justify-center gap-8 border border-white/60">
            <div className="text-center">
              <p className="text-2xl font-extrabold text-stone-700">{totalDays}</p>
              <p className="text-[10px] text-stone-400 font-semibold">gedaan</p>
            </div>
            <div className="w-px h-8 bg-stone-100" />
            <div className="text-center">
              <p className="text-2xl font-extrabold text-orange-500">{streak}</p>
              <p className="text-[10px] text-stone-400 font-semibold">streak 🔥</p>
            </div>
          </div>
        </div>

        {/* Garden canvas */}
        <div className="flex-1 relative mx-4 mb-4 rounded-3xl overflow-hidden shadow-lg" style={{ minHeight: "400px" }}>
          <div className="absolute inset-0 bg-gradient-to-b from-[#c0e4f8] via-[#d8f0a8] to-[#a8d868]" />
          <svg className="absolute bottom-20 left-0 right-0 w-full" viewBox="0 0 400 80" preserveAspectRatio="none">
            <ellipse cx="80"  cy="80" rx="120" ry="60" fill="#a0cc60" opacity="0.6" />
            <ellipse cx="280" cy="80" rx="150" ry="70" fill="#90c050" opacity="0.5" />
            <ellipse cx="380" cy="80" rx="90"  ry="50" fill="#b0d870" opacity="0.4" />
          </svg>
          <GrassField count={50} />

          {/* Empty state */}
          {loaded && gardenPlants.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pb-20 gap-3">
              <span className="text-5xl opacity-40">🌱</span>
              <div className="text-center">
                <p className="text-stone-600 font-bold">nog leeg hier</p>
                <p className="text-stone-500 text-xs mt-1">doe 3 check-ins op één dag<br />om je eerste plantje te zien</p>
              </div>
              <Link href="/">
                <button className="bg-green-500 text-white font-bold px-5 py-2.5 rounded-2xl shadow-md shadow-green-200 active:scale-95 transition-all text-sm">
                  water geven 💧
                </button>
              </Link>
            </div>
          )}

          {/* Plants — clickable */}
          {loaded && gardenPlants.map((record) => {
            const plant = plants.find((p) => p.id === record.plantId);
            if (!plant) return null;
            const { x, y } = getRenderPos(record);
            const scale = 0.4 + ((y - 40) / 55) * 0.55;
            const plantStage = Math.min(record.checkIns, 3) as 0 | 1 | 2 | 3;
            const sz = Math.round(68 * scale);
            return (
              <button
                key={record.date}
                className="absolute flex flex-col items-center active:scale-95 transition-transform"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: "translate(-50%, -100%)",
                  zIndex: Math.round(y),
                  opacity: record.completed ? 1 : 0.65,
                }}
                onClick={() => setPopup({ record, plant })}
              >
                <PlantSVG plant={plant} stage={plantStage} size={sz} animate={false} ukulele={record.ukulele} />
              </button>
            );
          })}
        </div>

        <div className="mx-4 pb-8 flex flex-col gap-2">
          <Link href="/">
            <button className="w-full bg-white/80 backdrop-blur-sm text-green-700 font-bold py-3.5 rounded-2xl shadow-sm border border-white/60 active:scale-95 transition-all">
              ← terug
            </button>
          </Link>
          <button
            onClick={handleExport}
            className="w-full bg-white/60 backdrop-blur-sm text-stone-500 font-semibold py-2.5 rounded-2xl border border-white/50 active:scale-95 transition-all text-sm"
          >
            {copied ? "✓ gekopieerd!" : "💾 data kopiëren als backup"}
          </button>
        </div>
      </div>

      {/* Plant popup */}
      {popup && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/25 backdrop-blur-sm"
          onClick={() => setPopup(null)}
        >
          <div
            className="bg-white rounded-t-3xl w-full max-w-md px-6 pt-5 pb-10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle */}
            <div className="w-10 h-1 bg-stone-200 rounded-full mx-auto mb-5" />

            <div className="flex gap-4 items-start">
              <PlantSVG
                plant={popup.plant}
                stage={Math.min(popup.record.checkIns, 3) as 0 | 1 | 2 | 3}
                size={90}
                animate={false}
                ukulele={popup.record.ukulele}
              />
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-2">
                  <p className="font-extrabold text-stone-700 text-lg leading-tight">{popup.plant.name}</p>
                  {popup.record.ukulele && <span className="text-base">🎸</span>}
                </div>
                <p className="text-stone-400 text-sm mt-0.5 capitalize">{formatDate(popup.record.date)}</p>
                <div className="flex items-center gap-1.5 mt-2">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      i < popup.record.checkIns ? "bg-green-400 border-green-400" : "border-stone-200"
                    }`}>
                      {i < popup.record.checkIns && (
                        <svg viewBox="0 0 16 16" className="w-3 h-3 fill-none stroke-white stroke-2">
                          <path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  ))}
                  <span className="text-xs text-stone-400 ml-1">{popup.record.checkIns}/3</span>
                </div>
              </div>
            </div>

            {popup.record.note ? (
              <div className="mt-4 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3">
                <p className="text-stone-600 text-sm italic leading-relaxed">"{popup.record.note}"</p>
              </div>
            ) : (
              <p className="mt-4 text-stone-300 text-sm text-center italic">geen notitie</p>
            )}

            <button
              onClick={() => setPopup(null)}
              className="mt-5 w-full bg-stone-100 text-stone-500 font-bold py-3 rounded-2xl active:scale-95 transition-all"
            >
              sluiten
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
