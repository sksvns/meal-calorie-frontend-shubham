import { useCalorieStore } from '@/store';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

export interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  username: string;
}

export interface CalorieRequest {
  dish_name: string;
  servings: number;
}

export interface CalorieResponse {
  dish_name: string;
  servings: number;
  calories_per_serving: number;
  total_calories: number;
  source: string;
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new ApiError(response.status, errorData || 'An error occurred');
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(0, 'Network error occurred');
  }
}

export const authApi = {
  async register(data: RegisterData): Promise<AuthResponse> {
    return apiRequest<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async login(data: LoginData): Promise<AuthResponse> {
    return apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

export const calorieApi = {
  async getCalories(data: CalorieRequest, token: string): Promise<CalorieResponse> {
    // Check cache first (only on client-side)
    if (typeof window !== 'undefined') {
      const cachedResult = useCalorieStore.getState().getCachedResult(data.dish_name, data.servings);
      if (cachedResult) {
        console.log('Cache hit for:', data.dish_name, data.servings);
        return cachedResult;
      }
    }

    // Make API request if not in cache
    const result = await apiRequest<CalorieResponse>('/food/get-calories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    // Add to cache and search history (only on client-side)
    if (typeof window !== 'undefined') {
      const { addToCache, addToSearchHistory } = useCalorieStore.getState();
      addToCache(data.dish_name, data.servings, result);
      addToSearchHistory(data.dish_name, data.servings, result);
      console.log('Added to cache:', data.dish_name, data.servings);
    }

    return result;
  },

  // Helper method to get cached results without making API calls
  getCachedCalories(dish_name: string, servings: number): CalorieResponse | null {
    if (typeof window === 'undefined') return null;
    return useCalorieStore.getState().getCachedResult(dish_name, servings);
  },

  // Helper method to get recent searches
  getRecentSearches(limit = 5) {
    if (typeof window === 'undefined') return [];
    return useCalorieStore.getState().getRecentSearches(limit);
  },

  // Helper method to clear search history
  clearSearchHistory() {
    if (typeof window !== 'undefined') {
      useCalorieStore.getState().clearSearchHistory();
    }
  },
};

export { ApiError };
