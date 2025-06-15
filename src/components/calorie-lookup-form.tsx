'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Search } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { calorieSchema, type CalorieFormData } from '@/lib/validations';
import { calorieApi, ApiError } from '@/lib/api';
import { useAuthStore, useCalorieStore } from '@/store';

export function CalorieLookupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const user = useAuthStore((state) => state.user);
  const { addResult, setLoading } = useCalorieStore();

  const form = useForm<CalorieFormData>({
    resolver: zodResolver(calorieSchema),
    defaultValues: {
      dish_name: '',
      servings: 1,
    },
  });

  const onSubmit = async (data: CalorieFormData) => {
    if (!user?.token) {
      toast.error('Please login to use this feature');
      return;
    }

    setIsLoading(true);
    setLoading(true);

    try {
      const response = await calorieApi.getCalories(data, user.token);
      addResult(response);
      toast.success('Calorie information retrieved successfully!');
      form.reset({ dish_name: '', servings: 1 });
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

  return (
    <Card className="w-full max-w-md mx-auto">
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
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Get Calorie Info
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
