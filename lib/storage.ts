export interface DayRecord {
  date: string;
  plantId: string;
  checkIns: number;
  completed: boolean;
  note: string;
  gardenX: number | null; // 0-100, % from left
  gardenY: number | null; // 0-100, % from top of canvas
  ukulele?: boolean;
}

export interface AppState {
  version: number;
  todayDate: string;
  todayPlantId: string | null;
  todayCheckIns: number;
  todayNote: string;
  todayGardenX: number | null;
  todayGardenY: number | null;
  todayUkulele: boolean;
  history: DayRecord[];
}

const KEY = "plantje_v1";

function today(): string {
  return new Date().toISOString().split("T")[0];
}

function emptyState(): AppState {
  return {
    version: 1,
    todayDate: today(),
    todayPlantId: null,
    todayCheckIns: 0,
    todayNote: "",
    todayGardenX: null,
    todayGardenY: null,
    todayUkulele: false,
    history: [],
  };
}

export function loadState(): AppState {
  if (typeof window === "undefined") return emptyState();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return emptyState();
    const state: AppState = JSON.parse(raw);
    const t = today();

    if (state.todayDate !== t) {
      const history = [...(state.history ?? [])];
      if (state.todayPlantId && state.todayCheckIns > 0) {
        history.push({
          date: state.todayDate,
          plantId: state.todayPlantId,
          checkIns: state.todayCheckIns,
          completed: state.todayCheckIns >= 3,
          note: state.todayNote ?? "",
          gardenX: state.todayGardenX ?? null,
          gardenY: state.todayGardenY ?? null,
          ukulele: state.todayUkulele ?? false,
        });
      }
      const fresh: AppState = { ...emptyState(), history };
      persist(fresh);
      return fresh;
    }

    return { ...emptyState(), ...state };
  } catch {
    return emptyState();
  }
}

export function persist(state: AppState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function doCheckIn(state: AppState): AppState {
  if (state.todayCheckIns >= 3) return state;
  return { ...state, todayCheckIns: state.todayCheckIns + 1 };
}

export function doSelectPlant(state: AppState, plantId: string): AppState {
  return { ...state, todayPlantId: plantId, todayCheckIns: 0, todayNote: "", todayGardenX: null, todayGardenY: null, todayUkulele: false };
}

export function doSetPosition(state: AppState, x: number, y: number): AppState {
  return { ...state, todayGardenX: x, todayGardenY: y };
}

export function doSaveNote(state: AppState, note: string): AppState {
  return { ...state, todayNote: note };
}

export function doUkulele(state: AppState): AppState {
  return { ...state, todayUkulele: !state.todayUkulele };
}

export function getStreak(state: AppState): number {
  const allDays = [
    ...state.history,
    ...(state.todayCheckIns >= 3
      ? [{ date: state.todayDate, plantId: state.todayPlantId ?? "", checkIns: 3, completed: true, note: "", gardenX: null, gardenY: null }]
      : []),
  ]
    .filter((d) => d.completed)
    .map((d) => d.date)
    .sort((a, b) => (a > b ? -1 : 1));

  if (allDays.length === 0) return 0;
  let streak = 0;
  let cursor = new Date();
  if (state.todayCheckIns < 3) cursor.setDate(cursor.getDate() - 1);
  for (const day of allDays) {
    if (day === cursor.toISOString().split("T")[0]) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else break;
  }
  return streak;
}

export function getTotalCompleted(state: AppState): number {
  return state.history.filter((d) => d.completed).length + (state.todayCheckIns >= 3 ? 1 : 0);
}

// All plants that have been placed (including today's if placed)
export function getGardenPlants(state: AppState): DayRecord[] {
  const all = state.history.filter((d) => d.checkIns > 0);
  if (state.todayPlantId && state.todayGardenX !== null) {
    all.push({
      date: state.todayDate,
      plantId: state.todayPlantId,
      checkIns: state.todayCheckIns,
      completed: state.todayCheckIns >= 3,
      note: state.todayNote,
      gardenX: state.todayGardenX,
      gardenY: state.todayGardenY,
      ukulele: state.todayUkulele,
    });
  }
  return all;
}

// Dev helpers
export function devClearAll(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}

export function devNextDay(state: AppState): AppState {
  const history = [...state.history];
  if (state.todayPlantId) {
    history.push({
      date: state.todayDate,
      plantId: state.todayPlantId,
      checkIns: state.todayCheckIns,
      completed: state.todayCheckIns >= 3,
      note: state.todayNote,
      gardenX: state.todayGardenX,
      gardenY: state.todayGardenY,
      ukulele: state.todayUkulele,
    });
  }
  const tomorrow = new Date(state.todayDate);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return {
    version: 1,
    todayDate: tomorrow.toISOString().split("T")[0],
    todayPlantId: null,
    todayCheckIns: 0,
    todayNote: "",
    todayGardenX: null,
    todayGardenY: null,
    todayUkulele: false,
    history,
  };
}
