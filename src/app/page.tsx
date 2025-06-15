'use client';

import { Header } from '@/components/header';
import { AuthPage } from '@/components/auth-page';
import { Dashboard } from '@/components/dashboard';
import { useAuthStore } from '@/store';

export default function Home() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {isAuthenticated ? <Dashboard /> : <AuthPage />}
    </div>
  );
}
