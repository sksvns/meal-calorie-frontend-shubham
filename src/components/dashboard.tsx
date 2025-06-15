'use client';

import { CalorieLookupForm } from '@/components/calorie-lookup-form';
import { CalorieResults } from '@/components/calorie-results';
import { Button } from '@/components/ui/button';
import { useCalorieStore } from '@/store';
import { Trash2 } from 'lucide-react';

export function Dashboard() {
  const { results, clearResults } = useCalorieStore();

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
              {results.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearResults}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear History
                </Button>
              )}
            </div>
            <CalorieResults />
          </div>
        </div>
      </div>
    </div>
  );
}
