'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Dashboard } from '@/components/dashboard';
import { useAuthStore } from '@/store';
import { NoSSR } from '@/components/no-ssr';

export default function DashboardPage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <NoSSR fallback={
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      }>
        {isAuthenticated ? (
          <Dashboard />
        ) : (
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-pulse text-muted-foreground">Redirecting...</div>
          </div>
        )}
      </NoSSR>
    </div>
  );
}
