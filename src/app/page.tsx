'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/header';
import { AuthPage } from '@/components/auth-page';
import { Dashboard } from '@/components/dashboard';
import { useAuthStore } from '@/store';

export default function Home() {
  const { isAuthenticated } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="h-14 bg-background border-b"></div>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {isAuthenticated ? <Dashboard /> : <AuthPage />}
    </div>
  );
}
