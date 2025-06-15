'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { useAuthStore } from '@/store';

export default function Home() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Meal Calorie Tracker
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Get accurate calorie information for your favorite dishes with detailed nutritional breakdown
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/register')}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
            >
              Get Started
            </button>
            <button
              onClick={() => router.push('/login')}
              className="px-6 py-3 border border-border text-foreground rounded-lg hover:bg-accent transition-colors cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
