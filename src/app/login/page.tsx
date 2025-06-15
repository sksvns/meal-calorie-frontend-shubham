'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { LoginForm } from '@/components/login-form';
import { useAuthStore } from '@/store';
import { NoSSR } from '@/components/no-ssr';

export default function LoginPage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <NoSSR fallback={
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="animate-pulse text-muted-foreground">Loading...</div>
            </div>
          </div>
        </main>
      }>
        {!isAuthenticated ? (
          <main className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
                <p className="text-muted-foreground">
                  Sign in to your account to continue tracking calories
                </p>
              </div>
              <LoginForm />
            </div>
          </main>
        ) : null}
      </NoSSR>
    </div>
  );
}
