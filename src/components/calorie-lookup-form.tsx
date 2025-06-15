'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Search, Clock, Star } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { calorieSchema, type CalorieFormData } from '@/lib/validations';
import { calorieApi, ApiError } from '@/lib/api';
import { useAuthStore, useCalorieStore, type SearchHistoryEntry } from '@/store';

export function CalorieLookupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<SearchHistoryEntry[]>([]);
  const user = useAuthStore((state) => state.user);
  const { addResult, setLoading, _hasHydrated } = useCalorieStore();

  const form = useForm<CalorieFormData>({
    resolver: zodResolver(calorieSchema),
    defaultValues: {
      dish_name: '',
      servings: 1,
    },
  });

  // Load recent searches after hydration
  useEffect(() => {
    if (_hasHydrated) {
      const searches = calorieApi.getRecentSearches(5);
      setRecentSearches(searches);
    }
  }, [_hasHydrated]);

  const onSubmit = async (data: CalorieFormData) => {
    if (!user?.token) {
      toast.error('Please login to use this feature');
      return;
    }

    setIsLoading(true);
    setLoading(true);

    try {
      // Check if result is cached
      const cachedResult = calorieApi.getCachedCalories(data.dish_name, data.servings);
      if (cachedResult) {
        addResult(cachedResult);
        toast.success('Calorie information retrieved from cache! ⚡');
        form.reset({ dish_name: '', servings: 1 });
        // Update recent searches
        const searches = calorieApi.getRecentSearches(5);
        setRecentSearches(searches);
        return;
      }

      const response = await calorieApi.getCalories(data, user.token);
      addResult(response);
      toast.success('Calorie information retrieved successfully!');
      form.reset({ dish_name: '', servings: 1 });
      
      // Update recent searches
      const searches = calorieApi.getRecentSearches(5);
      setRecentSearches(searches);
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 404) {
          toast.error('Dish not found. Please try a different dish name.');
        } else if (error.status === 401) {
          toast.error('Session expired. Please login again.');
        } else {
          toast.error(error.message || 'Failed to get calorie information');
        }
      } else {
        toast.error('Failed to get calorie information. Please try again.');
      }
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  const handleRecentSearchClick = (search: SearchHistoryEntry) => {
    form.setValue('dish_name', search.dish_name);
    form.setValue('servings', search.servings);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Calorie Lookup
          </CardTitle>
          <CardDescription>Enter dish details to get calorie information</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="dish_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dish Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., paneer tikka, chicken curry" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="servings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Servings</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="1"
                        type="number"
                        step="0.1"
                        min="0.1"
                        max="20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full cursor-pointer hover:bg-primary/90 transition-colors focus:ring-2 focus:ring-ring focus:outline-none" 
                disabled={isLoading}
                aria-label={isLoading ? 'Getting calorie information...' : 'Get calorie information for this dish'}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
                Get Calorie Info
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              Recent Searches
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {recentSearches.map((search) => (
                <button
                  key={`${search.dish_name}-${search.servings}-${search.timestamp}`}
                  onClick={() => handleRecentSearchClick(search)}
                  className="w-full text-left p-2 rounded-md bg-muted/50 hover:bg-muted transition-colors cursor-pointer focus:ring-2 focus:ring-ring focus:outline-none"
                  aria-label={`Use recent search: ${search.dish_name}, ${search.servings} servings`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm font-medium">{search.dish_name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {search.servings} serving{search.servings !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {search.result.total_calories} cal total
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
