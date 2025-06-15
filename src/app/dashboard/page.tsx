'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Dashboard } from '@/components/dashboard';
import { useAuthStore } from '@/store';

export default function DashboardPage() {
  const { isAuthenticated, _hasHydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (_hasHydrated && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, _hasHydrated, router]);

  // Show loading state until hydration is complete
  if (!_hasHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="h-14 bg-background border-b"></div>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  // Show redirecting state if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="h-14 bg-background border-b"></div>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-pulse text-muted-foreground">Redirecting...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Dashboard />
    </div>
  );
}
