export interface DayRecord {
  date: string;       // "YYYY-MM-DD"
  plantId: string;
  checkIns: number;   // 0-3
  completed: boolean; // checkIns === 3
}

export interface AppState {
  version: number;
  todayDate: string;
  todayPlantId: string | null;
  todayCheckIns: number;
  history: DayRecord[];
}

const KEY = "plantje_v1";

function today(): string {
  return new Date().toISOString().split("T")[0];
}

function emptyState(): AppState {
  return { version: 1, todayDate: today(), todayPlantId: null, todayCheckIns: 0, history: [] };
}

export function loadState(): AppState {
  if (typeof window === "undefined") return emptyState();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return emptyState();

    const state: AppState = JSON.parse(raw);
    const t = today();

    // New day — archive yesterday if it had any check-ins
    if (state.todayDate !== t) {
      const history = [...(state.history ?? [])];
      if (state.todayPlantId && state.todayCheckIns > 0) {
        history.push({
          date: state.todayDate,
          plantId: state.todayPlantId,
          checkIns: state.todayCheckIns,
          completed: state.todayCheckIns >= 3,
        });
      }
      const fresh: AppState = { version: 1, todayDate: t, todayPlantId: null, todayCheckIns: 0, history };
      persist(fresh);
      return fresh;
    }

    return state;
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
  return { ...state, todayPlantId: plantId, todayCheckIns: 0 };
}

export function getStreak(state: AppState): number {
  const allDays = [
    ...state.history,
    ...(state.todayCheckIns >= 3
      ? [{ date: state.todayDate, plantId: state.todayPlantId ?? "", checkIns: 3, completed: true }]
      : []),
  ]
    .filter((d) => d.completed)
    .map((d) => d.date)
    .sort((a, b) => (a > b ? -1 : 1)); // newest first

  if (allDays.length === 0) return 0;

  let streak = 0;
  let cursor = new Date();
  // if today not yet completed, start from yesterday
  if (state.todayCheckIns < 3) cursor.setDate(cursor.getDate() - 1);

  for (let i = 0; i < allDays.length; i++) {
    const expected = cursor.toISOString().split("T")[0];
    if (allDays[i] === expected) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

export function getTotalCompleted(state: AppState): number {
  const fromHistory = state.history.filter((d) => d.completed).length;
  return fromHistory + (state.todayCheckIns >= 3 ? 1 : 0);
}

export function getGardenPlants(state: AppState): DayRecord[] {
  const completed = state.history.filter((d) => d.completed);
  if (state.todayCheckIns >= 3 && state.todayPlantId) {
    completed.push({ date: state.todayDate, plantId: state.todayPlantId, checkIns: 3, completed: true });
  }
  return completed;
}
