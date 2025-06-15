'use client';

import { Utensils, Target, Database } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCalorieStore, type CalorieResult } from '@/store';

function CalorieResultCard({ result }: { result: CalorieResult }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 capitalize">
          <Utensils className="h-5 w-5" />
          {result.dish_name}
        </CardTitle>
        <CardDescription className="flex items-center gap-1">
          <Database className="h-4 w-4" />
          {result.source}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary">{result.servings}</div>
            <div className="text-sm text-muted-foreground">Servings</div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-center gap-1">
              <Target className="h-4 w-4" />
              <div className="text-2xl font-bold text-primary">{result.calories_per_serving}</div>
            </div>
            <div className="text-sm text-muted-foreground">Calories per serving</div>
          </div>
          <div className="text-center p-4 bg-primary text-primary-foreground rounded-lg">
            <div className="text-2xl font-bold">{result.total_calories}</div>
            <div className="text-sm opacity-90">Total Calories</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function CalorieResults() {
  const { results, isLoading } = useCalorieStore();
  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <span>Getting calorie information...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-6 text-center">
            <Utensils className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No Results Yet</h3>
            <p className="text-muted-foreground">
              Search for a dish above to see its calorie information here.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Recent Searches</h2>
      {results.map((result, index) => (
        <CalorieResultCard key={index} result={result} />
      ))}
    </div>
  );
}
