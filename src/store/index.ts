import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

export interface CacheEntry {
  dish_name: string;
  servings: number;
  result: CalorieResult;
  accessCount: number;
  lastAccessed: number;
}

export interface SearchHistoryEntry {
  dish_name: string;
  servings: number;
  timestamp: number;
  result: CalorieResult;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  _hasHydrated: boolean;
  login: (user: User) => void;
  logout: () => void;
  setHasHydrated: (state: boolean) => void;
}

interface CalorieState {
  results: CalorieResult[];
  isLoading: boolean;
  cache: CacheEntry[];
  searchHistory: SearchHistoryEntry[];
  _hasHydrated: boolean;
  addResult: (result: CalorieResult) => void;
  setLoading: (loading: boolean) => void;
  clearResults: () => void;
  getCachedResult: (dish_name: string, servings: number) => CalorieResult | null;
  addToCache: (dish_name: string, servings: number, result: CalorieResult) => void;
  addToSearchHistory: (dish_name: string, servings: number, result: CalorieResult) => void;
  clearSearchHistory: () => void;
  getRecentSearches: (limit?: number) => SearchHistoryEntry[];
  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      _hasHydrated: false,
      login: (user: User) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      setHasHydrated: (state: boolean) => set({ _hasHydrated: state }),
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

export const useCalorieStore = create<CalorieState>()(
  persist(
    (set, get) => ({
      results: [],
      isLoading: false,
      cache: [],
      searchHistory: [],
      _hasHydrated: false,
      
      addResult: (result: CalorieResult) =>
        set((state) => ({ results: [result, ...state.results] })),
      
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      
      clearResults: () => set({ results: [] }),
      
      getCachedResult: (dish_name: string, servings: number) => {
        const state = get();
        const cacheKey = `${dish_name.toLowerCase()}_${servings}`;
        const cacheEntry = state.cache.find(
          (entry) => `${entry.dish_name.toLowerCase()}_${entry.servings}` === cacheKey
        );
        
        if (cacheEntry) {
          // Update access count and last accessed time
          set((state) => ({
            cache: state.cache.map((entry) =>
              `${entry.dish_name.toLowerCase()}_${entry.servings}` === cacheKey
                ? { ...entry, accessCount: entry.accessCount + 1, lastAccessed: Date.now() }
                : entry
            ),
          }));
          return cacheEntry.result;
        }
        
        return null;
      },
      
      addToCache: (dish_name: string, servings: number, result: CalorieResult) => {
        const cacheKey = `${dish_name.toLowerCase()}_${servings}`;
        
        set((state) => {
          // Check if entry already exists
          const existingIndex = state.cache.findIndex(
            (entry) => `${entry.dish_name.toLowerCase()}_${entry.servings}` === cacheKey
          );
          
          if (existingIndex !== -1) {
            // Update existing entry
            const updatedCache = [...state.cache];
            updatedCache[existingIndex] = {
              ...updatedCache[existingIndex],
              result,
              accessCount: updatedCache[existingIndex].accessCount + 1,
              lastAccessed: Date.now(),
            };
            return { cache: updatedCache };
          } else {
            // Add new entry
            const newEntry: CacheEntry = {
              dish_name,
              servings,
              result,
              accessCount: 1,
              lastAccessed: Date.now(),
            };
            
            // Keep only top 10 most frequently accessed entries
            const updatedCache = [...state.cache, newEntry]
              .sort((a, b) => b.accessCount - a.accessCount)
              .slice(0, 10);
            
            return { cache: updatedCache };
          }
        });
      },
      
      addToSearchHistory: (dish_name: string, servings: number, result: CalorieResult) => {
        const newEntry: SearchHistoryEntry = {
          dish_name,
          servings,
          timestamp: Date.now(),
          result,
        };
        
        set((state) => ({
          searchHistory: [newEntry, ...state.searchHistory.slice(0, 49)] // Keep last 50 searches
        }));
      },
      
      clearSearchHistory: () => set({ searchHistory: [] }),
      
      getRecentSearches: (limit = 5) => {
        const state = get();
        return state.searchHistory.slice(0, limit);
      },
      
      setHasHydrated: (state: boolean) => set({ _hasHydrated: state }),
    }),
    {
      name: 'calorie-storage',
      partialize: (state) => ({
        cache: state.cache,
        searchHistory: state.searchHistory,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
