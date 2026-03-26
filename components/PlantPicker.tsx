"use client";

import { useState } from "react";
import { Plant } from "@/lib/plants";
import PlantSVG from "./PlantSVG";
import { GardenBackground } from "./GrassBg";

interface Props {
  plants: Plant[];
  onSelect: (plantId: string) => void;
}

export default function PlantPicker({ plants, onSelect }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  function handleConfirm() {
    if (selected) onSelect(selected);
  }

  const preview = selected ?? hovered;
  const previewPlant = preview ? plants.find((p) => p.id === preview) : null;

  return (
    <div className="min-h-screen relative flex flex-col font-quicksand">
      <GardenBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Sticky header + preview */}
        <div className="sticky top-0 z-20 bg-gradient-to-b from-[#eef7e4] via-[#eef7e4]/95 to-transparent pb-2">
          {/* Header */}
          <div className="px-5 pt-8 pb-2">
            <h1 className="text-2xl font-extrabold text-stone-700 tracking-tight drop-shadow-sm">vandaag</h1>
            <p className="text-stone-600 mt-0.5 text-sm font-medium drop-shadow-sm">kies je plantje voor vandaag</p>
          </div>

          {/* Preview */}
          <div className="flex flex-col items-center py-2 min-h-[220px]">
            {previewPlant ? (
              <div className="animate-fade-in flex flex-col items-center">
                <PlantSVG plant={previewPlant} stage={3} size={130} animate={false} />
                <p className="font-bold text-stone-700 text-lg mt-1 drop-shadow-sm">{previewPlant.name}</p>
                <p className="text-stone-500 text-sm">{previewPlant.description}</p>
                <p className="text-stone-400 text-xs mt-2 text-center max-w-[220px] italic leading-snug">💡 {previewPlant.fact}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 opacity-40">
                <span className="text-5xl">🌱</span>
                <p className="text-stone-500 text-sm mt-2">tik op een plantje</p>
              </div>
            )}
          </div>
        </div>

        {/* Plant grid */}
        <div className="flex-1 overflow-y-auto px-4 pb-36">
          <div className="grid grid-cols-4 gap-2">
            {plants.map((plant) => {
              const isSelected = selected === plant.id;
              return (
                <button
                  key={plant.id}
                  onClick={() => setSelected(plant.id)}
                  onMouseEnter={() => setHovered(plant.id)}
                  onMouseLeave={() => setHovered(null)}
                  className={`
                    flex flex-col items-center pt-1 pb-1.5 px-1 rounded-2xl border-2 transition-all duration-150 active:scale-95
                    ${isSelected
                      ? "border-green-400 bg-white/90 shadow-md shadow-green-200"
                      : "border-white/40 bg-white/60 hover:border-green-200 hover:bg-white/80"
                    }
                  `}
                >
                  <div className="pointer-events-none">
                    <PlantSVG plant={plant} stage={3} size={46} animate={false} />
                  </div>
                  <span className={`text-[10px] font-semibold leading-tight text-center ${isSelected ? "text-green-700" : "text-stone-500"}`}>
                    {plant.name}
                  </span>
                  {isSelected && <span className="text-green-500 text-[9px] mt-0.5">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Confirm */}
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto px-5 pb-8 pt-4 bg-gradient-to-t from-green-100/80 to-transparent">
          <button
            onClick={handleConfirm}
            disabled={!selected}
            className={`
              w-full py-4 rounded-2xl font-bold text-lg transition-all duration-150 active:scale-95 shadow-lg
              ${selected
                ? "bg-green-500 hover:bg-green-600 text-white shadow-green-300"
                : "bg-white/50 text-stone-300 cursor-not-allowed shadow-none"
              }
            `}
          >
            {selected
              ? `🌱 ${plants.find((p) => p.id === selected)?.name} is het`
              : "kies iets"}
          </button>
        </div>
      </div>
    </div>
  );
}
