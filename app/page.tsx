"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  loadState, persist, doCheckIn, doSelectPlant, doSetPosition, doSaveNote, doUkulele,
  AppState, getTotalCompleted, getStreak, getGardenPlants,
  devClearAll, devNextDay,
} from "@/lib/storage";
import { plants } from "@/lib/plants";
import PlantSVG from "@/components/PlantSVG";
import PlantPicker from "@/components/PlantPicker";
import GardenPlacer from "@/components/GardenPlacer";
import { GardenBackground } from "@/components/GrassBg";

interface Confetti { id: number; x: number; color: string; size: number; delay: number }

function ConfettiCloud({ colors }: { colors: string[] }) {
  const particles: Confetti[] = Array.from({ length: 18 }).map((_, i) => ({
    id: i, x: 20 + Math.random() * 60,
    color: colors[i % colors.length],
    size: 6 + Math.random() * 8,
    delay: Math.random() * 0.4,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div key={p.id} className="confetti-particle rounded-sm"
          style={{ left: `${p.x}%`, top: "10%", width: p.size, height: p.size, backgroundColor: p.color, animationDelay: `${p.delay}s` }} />
      ))}
    </div>
  );
}

const STAGE_MESSAGES = [
  "eerste keer 💧",
  "nog twee te gaan 🌿",
  "nog één 🌸",
  "klaar voor vandaag",
];
const STAGE_LABELS = ["Zaadje", "Kiempje", "Knopje", "In bloei!"];
type PickerStep = "plant" | "position" | null;

export default function Home() {
  const [state, setState] = useState<AppState | null>(null);
  const [pickerStep, setPickerStep] = useState<PickerStep>(null);
  const [celebrating, setCelebrating] = useState(false);
  const [justCheckedIn, setJustCheckedIn] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const s = loadState();
    setState(s);
    if (!s.todayPlantId) setPickerStep("plant");
    else if (s.todayGardenX === null) setPickerStep("position");
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
    setPickerStep("position");
  }

  function handlePlace(x: number, y: number) {
    if (!state) return;
    const next = doSetPosition(state, x, y);
    persist(next);
    setState(next);
    setPickerStep(null);
  }

  function handleNoteChange(note: string) {
    if (!state) return;
    const next = doSaveNote(state, note);
    persist(next);
    setState(next);
  }

  function handleUkulele() {
    if (!state) return;
    const next = doUkulele(state);
    persist(next);
    setState(next);
  }

  function handleDevClear() {
    devClearAll();
    window.location.reload();
  }

  function handleDevNextDay() {
    if (!state) return;
    const next = devNextDay(state);
    persist(next);
    setState(next);
    setPickerStep("plant");
  }

  // Multi-step picker flow
  if (pickerStep === "plant") {
    return <PlantPicker plants={plants} onSelect={handleSelectPlant} />;
  }
  if (pickerStep === "position" && selectedPlant) {
    return (
      <GardenPlacer
        plant={selectedPlant}
        existingPlants={getGardenPlants(state)}
        allPlants={plants}
        onPlace={handlePlace}
      />
    );
  }

  return (
    <main className="min-h-screen relative flex flex-col font-quicksand overflow-x-hidden">
      <GardenBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-7 pb-2">
          <div>
            <h1 className="text-2xl font-extrabold text-stone-700 tracking-tight drop-shadow-sm">plantje 🌱</h1>
            <p className="text-xs text-stone-600 font-semibold mt-0.5 drop-shadow-sm">
              {streak > 0 ? `${streak} dagen op rij 🔥` : "start je streak"}
            </p>
          </div>
          <Link href="/garden">
            <button className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm text-green-700 font-bold text-sm px-3.5 py-2 rounded-full shadow-sm border border-white/60 hover:bg-white/90 active:scale-95 transition-all">
              <span>🌸</span>
              <span>tuin</span>
              {totalDays > 0 && (
                <span className="bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {totalDays}
                </span>
              )}
            </button>
          </Link>
        </div>

        {/* Plant card */}
        <div className="mx-4 mt-3 relative">
          <div className={`
            bg-white/85 backdrop-blur-md rounded-3xl shadow-md p-5 flex flex-col items-center
            transition-all duration-500 border border-white/60
            ${justCheckedIn ? "scale-[1.02] shadow-green-200 shadow-lg" : ""}
            ${celebrating ? "ring-2 ring-yellow-300" : ""}
          `}>
            {showConfetti && selectedPlant && (
              <ConfettiCloud colors={[selectedPlant.colors.petal, selectedPlant.colors.center, "#a8d878", "#f5c842"]} />
            )}
            {selectedPlant ? (
              <>
                <div className={`plant-container ${justCheckedIn ? "animate-bloom-in" : ""} ${isComplete && !justCheckedIn && !state.todayUkulele ? "animate-float" : ""}`}>
                  <PlantSVG plant={selectedPlant} stage={stage} size={210} ukulele={state.todayUkulele} />
                </div>
                <div className="flex flex-col items-center mt-1">
                  <p className="font-bold text-stone-600 text-base">{selectedPlant.name}</p>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full mt-1 ${
                    isComplete ? "bg-yellow-100 text-yellow-700" : stage === 0 ? "bg-stone-100 text-stone-400" : "bg-green-100 text-green-700"
                  }`}>
                    {STAGE_LABELS[stage]}
                  </span>
                </div>
              </>
            ) : (
              <div className="py-10 opacity-30"><span className="text-6xl">🌱</span></div>
            )}
          </div>
        </div>

        {/* Check-in card */}
        <div className="mx-4 mt-3">
          <div className="bg-white/85 backdrop-blur-md rounded-3xl shadow-sm p-5 border border-white/60">
            <div className="flex items-center justify-center gap-4 mb-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-400 ${
                    i < checkIns ? "bg-green-400 border-green-400 scale-110 shadow-md shadow-green-200" : "bg-white/70 border-stone-200"
                  }`}>
                    {i < checkIns && (
                      <svg viewBox="0 0 16 16" className="w-4 h-4 fill-none stroke-white stroke-2">
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
                gedaan ✓
              </button>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="text-center">
                  <p className="text-green-700 font-extrabold text-xl">🌸 gelukt!</p>
                  <p className="text-stone-400 text-sm mt-0.5">morgen een nieuw plantje</p>
                </div>

                {/* Note input */}
                <textarea
                  value={state.todayNote}
                  onChange={(e) => handleNoteChange(e.target.value)}
                  placeholder="schrijf iets voor jezelf... (optioneel)"
                  rows={3}
                  className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-4 py-3 text-sm text-stone-600 placeholder-stone-300 resize-none focus:outline-none focus:ring-2 focus:ring-green-200"
                />

                <Link href="/garden" className="block">
                  <button className="w-full bg-amber-400 hover:bg-amber-500 active:scale-95 text-white font-extrabold py-4 rounded-2xl transition-all text-base shadow-md shadow-amber-200">
                    de tuin →
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {selectedPlant && (
          <div className="mx-4 mt-3">
            <button
              onClick={handleUkulele}
              className={`w-full py-3.5 rounded-2xl font-bold text-base transition-all active:scale-95 border-2 ${
                state.todayUkulele
                  ? "bg-gradient-to-r from-pink-400 via-yellow-300 to-blue-400 text-white border-transparent shadow-lg shadow-yellow-200"
                  : "bg-white/80 backdrop-blur-sm text-stone-500 border-white/60 shadow-sm"
              }`}
            >
              {state.todayUkulele ? "🎸 ukelele gespeeld! ✨" : "🎸 ukelele gespeeld vandaag?"}
            </button>
          </div>
        )}

        {!isComplete && checkIns === 0 && (
          <button
            onClick={() => setPickerStep("plant")}
            className="mt-4 text-stone-500 text-xs font-semibold underline underline-offset-2 self-center drop-shadow-sm"
          >
            toch iets anders
          </button>
        )}

        {/* Stats */}
        <div className="mx-4 mt-3 grid grid-cols-2 gap-3">
          {[
            { label: "gedaan", value: `${totalDays} dag${totalDays !== 1 ? "en" : ""}`, icon: "🌸" },
            { label: "streak", value: `${streak} dag${streak !== 1 ? "en" : ""}`, icon: "🔥" },
          ].map((s) => (
            <div key={s.label} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-3.5 flex flex-col gap-0.5 border border-white/60">
              <span className="text-2xl">{s.icon}</span>
              <span className="text-lg font-extrabold text-stone-700">{s.value}</span>
              <span className="text-xs text-stone-500 font-medium">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Dev buttons */}
        <div className="mx-4 mt-4 mb-8 flex items-center gap-2 opacity-50">
          <span className="text-[10px] text-stone-400 font-bold">dev</span>
          <button
            onClick={handleDevClear}
            className="text-[11px] text-red-500 border border-red-200 bg-white/70 px-2.5 py-1 rounded-lg font-semibold"
          >
            wis alles
          </button>
          <button
            onClick={handleDevNextDay}
            className="text-[11px] text-blue-500 border border-blue-200 bg-white/70 px-2.5 py-1 rounded-lg font-semibold"
          >
            volgende dag
          </button>
        </div>
      </div>
    </main>
  );
}
