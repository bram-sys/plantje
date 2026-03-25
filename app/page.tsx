"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { loadState, persist, doCheckIn, doSelectPlant, AppState, getTotalCompleted, getStreak } from "@/lib/storage";
import { plants } from "@/lib/plants";
import PlantSVG from "@/components/PlantSVG";
import PlantPicker from "@/components/PlantPicker";

interface Confetti {
  id: number;
  x: number;
  color: string;
  size: number;
  delay: number;
}

function ConfettiCloud({ colors }: { colors: string[] }) {
  const particles: Confetti[] = Array.from({ length: 18 }).map((_, i) => ({
    id: i,
    x: 20 + Math.random() * 60,
    color: colors[i % colors.length],
    size: 6 + Math.random() * 8,
    delay: Math.random() * 0.4,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="confetti-particle rounded-sm"
          style={{
            left: `${p.x}%`,
            top: "10%",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

const STAGE_MESSAGES = [
  "Begin je dag! Eerste check-in 💪",
  "Goed bezig! Nog 2 te gaan 🌿",
  "Halfway! Nog 1 check-in 🌸",
  "Gelukt voor vandaag! 🌺",
];

const STAGE_LABELS = ["Zaadje", "Kiempje", "Knopje", "In bloei!"];

export default function Home() {
  const [state, setState] = useState<AppState | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [justCheckedIn, setJustCheckedIn] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const prevCheckIns = useRef(0);

  useEffect(() => {
    const s = loadState();
    setState(s);
    if (!s.todayPlantId) setShowPicker(true);
    prevCheckIns.current = s.todayCheckIns;
  }, []);

  if (!state) return null;

  const selectedPlant = state.todayPlantId ? plants.find((p) => p.id === state.todayPlantId) : null;
  const checkIns = state.todayCheckIns;
  const isComplete = checkIns >= 3;
  const stage = Math.min(checkIns, 3) as 0 | 1 | 2 | 3;
  const totalDays = getTotalCompleted(state);
  const streak = getStreak(state);

  function handleCheckIn() {
    if (!state || checkIns >= 3) return;
    const next = doCheckIn(state);
    persist(next);
    setState(next);
    setJustCheckedIn(true);
    setTimeout(() => setJustCheckedIn(false), 500);

    if (next.todayCheckIns >= 3) {
      setCelebrating(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  }

  function handleSelectPlant(plantId: string) {
    if (!state) return;
    const next = doSelectPlant(state, plantId);
    persist(next);
    setState(next);
    setShowPicker(false);
    setCelebrating(false);
  }

  if (showPicker) {
    return <PlantPicker plants={plants} onSelect={handleSelectPlant} />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#e8f5fe] via-[#f4fde8] to-[#fef9f0] flex flex-col font-nunito">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-7 pb-2">
        <div>
          <h1 className="text-2xl font-extrabold text-stone-700 tracking-tight">Plantje 🌱</h1>
          <p className="text-xs text-stone-400 font-medium mt-0.5">
            {streak > 0 ? `${streak} dagen op rij 🔥` : "Begin je streak!"}
          </p>
        </div>
        <Link href="/garden">
          <button className="flex items-center gap-1.5 bg-white text-green-600 font-bold text-sm px-3.5 py-2 rounded-full shadow-sm border border-green-100 hover:bg-green-50 active:scale-95 transition-all">
            <span>🌸</span>
            <span>Tuin</span>
            {totalDays > 0 && (
              <span className="bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {totalDays}
              </span>
            )}
          </button>
        </Link>
      </div>

      {/* Plant display card */}
      <div className="mx-4 mt-3 relative">
        <div className={`
          bg-white rounded-3xl shadow-md p-5 flex flex-col items-center
          transition-all duration-500
          ${justCheckedIn ? "scale-[1.02] shadow-green-200 shadow-lg" : ""}
          ${celebrating ? "ring-2 ring-yellow-300" : ""}
        `}>
          {showConfetti && selectedPlant && (
            <ConfettiCloud colors={[selectedPlant.colors.petal, selectedPlant.colors.center, "#a8d878", "#f5c842"]} />
          )}

          {selectedPlant ? (
            <>
              <div
                className={`plant-container ${
                  justCheckedIn ? "animate-bloom-in" : ""
                } ${isComplete && !justCheckedIn ? "animate-float" : ""}`}
              >
                <PlantSVG plant={selectedPlant} stage={stage} size={210} />
              </div>

              <div className="flex flex-col items-center mt-1">
                <p className="font-bold text-stone-600 text-base">{selectedPlant.name}</p>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full mt-1 ${
                  isComplete
                    ? "bg-yellow-100 text-yellow-700"
                    : stage === 0
                    ? "bg-stone-100 text-stone-400"
                    : "bg-green-100 text-green-700"
                }`}>
                  {STAGE_LABELS[stage]}
                </span>
              </div>
            </>
          ) : (
            <div className="py-10 opacity-30">
              <span className="text-6xl">🌱</span>
            </div>
          )}
        </div>
      </div>

      {/* Progress + check-in */}
      <div className="mx-4 mt-3">
        <div className="bg-white rounded-3xl shadow-sm p-5">
          {/* Three dots progress */}
          <div className="flex items-center justify-center gap-4 mb-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className={`
                  w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-400
                  ${i < checkIns
                    ? "bg-green-400 border-green-400 scale-110 shadow-md shadow-green-200"
                    : "bg-white border-stone-200"
                  }
                `}>
                  {i < checkIns && (
                    <svg viewBox="0 0 16 16" className="w-4 h-4 text-white fill-none stroke-white stroke-2">
                      <path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className={`text-[9px] font-bold ${i < checkIns ? "text-green-500" : "text-stone-300"}`}>
                  {["1e", "2e", "3e"][i]}
                </span>
              </div>
            ))}
          </div>

          <p className="text-center text-stone-500 text-sm font-medium mb-4">
            {STAGE_MESSAGES[checkIns]}
          </p>

          {!isComplete ? (
            <button
              onClick={handleCheckIn}
              className="w-full bg-green-500 hover:bg-green-600 active:scale-95 text-white font-extrabold py-4 rounded-2xl transition-all duration-150 text-lg shadow-md shadow-green-200"
            >
              ✓ Ik heb het gedaan!
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="text-center py-2">
                <p className="text-green-600 font-extrabold text-xl">🌸 Wauw, je deed het!</p>
                <p className="text-stone-400 text-sm mt-0.5">Morgen een nieuw plantje</p>
              </div>
              <Link href="/garden" className="block">
                <button className="w-full bg-amber-400 hover:bg-amber-500 active:scale-95 text-white font-extrabold py-4 rounded-2xl transition-all duration-150 text-base shadow-md shadow-amber-200">
                  🌸 Bekijk je tuin ({totalDays} {totalDays === 1 ? "bloem" : "bloemen"})
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Change plant (only if 0 check-ins) */}
      {!isComplete && checkIns === 0 && (
        <button
          onClick={() => setShowPicker(true)}
          className="mt-4 text-stone-400 text-xs font-semibold underline underline-offset-2 self-center"
        >
          Ander plantje kiezen
        </button>
      )}

      {/* Stats row */}
      <div className="mx-4 mt-3 grid grid-cols-2 gap-3 pb-8">
        {[
          { label: "Totaal voltooid", value: `${totalDays} dag${totalDays !== 1 ? "en" : ""}`, icon: "🌸" },
          { label: "Huidige streak", value: `${streak} dag${streak !== 1 ? "en" : ""}`, icon: "🔥" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl shadow-sm p-3.5 flex flex-col gap-0.5">
            <span className="text-2xl">{s.icon}</span>
            <span className="text-lg font-extrabold text-stone-700">{s.value}</span>
            <span className="text-xs text-stone-400 font-medium">{s.label}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
