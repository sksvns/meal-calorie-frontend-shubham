import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface User {
  username: string;
  token: string;
}

export interface CalorieResult {
  dish_name: string;
  servings: number;
  calories_per_serving: number;
  total_calories: number;
  source: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

interface CalorieState {
  results: CalorieResult[];
  isLoading: boolean;
  addResult: (result: CalorieResult) => void;
  setLoading: (loading: boolean) => void;
  clearResults: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user: User) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useCalorieStore = create<CalorieState>()((set) => ({
  results: [],
  isLoading: false,
  addResult: (result: CalorieResult) =>
    set((state) => ({ results: [result, ...state.results] })),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  clearResults: () => set({ results: [] }),
}));
