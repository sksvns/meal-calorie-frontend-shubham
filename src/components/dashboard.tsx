'use client';

import { useEffect, useState } from 'react';
import { CalorieLookupForm } from '@/components/calorie-lookup-form';
import { CalorieResults } from '@/components/calorie-results';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCalorieStore } from '@/store';
import { calorieApi } from '@/lib/api';
import { Trash2, Database, History, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

export function Dashboard() {
  const { results, clearResults, cache, searchHistory, _hasHydrated } = useCalorieStore();
  const [cacheStats, setCacheStats] = useState({ size: 0, totalAccess: 0 });

  // Calculate cache statistics
  useEffect(() => {
    if (_hasHydrated) {
      const totalAccess = cache.reduce((sum, entry) => sum + entry.accessCount, 0);
      setCacheStats({ size: cache.length, totalAccess });
    }
  }, [cache, _hasHydrated]);

  const handleClearSearchHistory = () => {
    calorieApi.clearSearchHistory();
    toast.success('Search history cleared!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto p-4 space-y-8">
        <div className="text-center space-y-4 pt-8">
          <h1 className="text-4xl font-bold tracking-tight">
            Discover Your Meal&apos;s Calories
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get accurate calorie information for your favorite dishes with detailed nutritional breakdown
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:w-1/3">
            <CalorieLookupForm />
          </div>
          
          <div className="w-full lg:w-2/3">
            <div className="flex items-center justify-between mb-4">
              <div></div>
              <div className="flex gap-2">
                {_hasHydrated && searchHistory.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearSearchHistory}
                    className="flex items-center gap-2 cursor-pointer hover:bg-accent transition-colors focus:ring-2 focus:ring-ring focus:outline-none"
                    aria-label={`Clear search history (${searchHistory.length} items)`}
                  >
                    <History className="h-4 w-4" aria-hidden="true" />
                    Clear History
                  </Button>
                )}
                {results.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearResults}
                    className="flex items-center gap-2 cursor-pointer hover:bg-accent transition-colors focus:ring-2 focus:ring-ring focus:outline-none"
                    aria-label={`Clear current results (${results.length} items)`}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                    Clear Results
                  </Button>
                )}
              </div>
            </div>
            <CalorieResults />
          </div>
        </div>
      </div>
    </div>
  );
}
