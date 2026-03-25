"use client";

import { useState } from "react";
import { Plant } from "@/lib/plants";
import PlantSVG from "./PlantSVG";

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
    <div className="min-h-screen bg-gradient-to-b from-[#e8f5fe] to-[#f0f8e8] flex flex-col font-nunito">
      {/* Header */}
      <div className="px-5 pt-8 pb-4">
        <h1 className="text-3xl font-extrabold text-stone-700 tracking-tight">Kies vandaag</h1>
        <p className="text-stone-500 mt-1 text-base">Welk plantje ga jij vandaag water geven? 🌱</p>
      </div>

      {/* Preview */}
      <div className="flex flex-col items-center py-4 min-h-[180px]">
        {previewPlant ? (
          <div className="animate-fade-in flex flex-col items-center">
            <PlantSVG plant={previewPlant} stage={0} size={130} animate={false} />
            <p className="font-bold text-stone-700 text-lg mt-1">{previewPlant.name}</p>
            <p className="text-stone-400 text-sm">{previewPlant.description}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 opacity-40">
            <span className="text-5xl">🌱</span>
            <p className="text-stone-400 text-sm mt-2">Tik op een plantje</p>
          </div>
        )}
      </div>

      {/* Plant grid */}
      <div className="flex-1 overflow-y-auto px-4 pb-36">
        <div className="grid grid-cols-4 gap-3">
          {plants.map((plant) => {
            const isSelected = selected === plant.id;
            return (
              <button
                key={plant.id}
                onClick={() => setSelected(plant.id)}
                onMouseEnter={() => setHovered(plant.id)}
                onMouseLeave={() => setHovered(null)}
                className={`
                  flex flex-col items-center p-2.5 rounded-2xl border-2 transition-all duration-150 active:scale-95
                  ${isSelected
                    ? "border-green-400 bg-green-50 shadow-md shadow-green-200"
                    : "border-stone-100 bg-white hover:border-green-200 hover:bg-green-50"
                  }
                `}
              >
                <span className="text-2xl leading-none">{plant.emoji}</span>
                <span className={`text-[10px] font-semibold mt-1 leading-tight text-center ${isSelected ? "text-green-700" : "text-stone-500"}`}>
                  {plant.name}
                </span>
                {isSelected && (
                  <span className="text-green-500 text-xs mt-0.5">✓</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Confirm button */}
      <div className="fixed bottom-0 left-0 right-0 px-5 pb-8 pt-4 bg-gradient-to-t from-[#f0f8e8] to-transparent">
        <button
          onClick={handleConfirm}
          disabled={!selected}
          className={`
            w-full py-4 rounded-2xl font-bold text-lg transition-all duration-150 active:scale-95 shadow-lg
            ${selected
              ? "bg-green-500 hover:bg-green-600 text-white shadow-green-300"
              : "bg-stone-100 text-stone-300 cursor-not-allowed shadow-none"
            }
          `}
        >
          {selected
            ? `🌱 Plant ${plants.find((p) => p.id === selected)?.name}!`
            : "Kies een plantje"}
        </button>
      </div>
    </div>
  );
}
