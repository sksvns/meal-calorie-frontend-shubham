'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { RegisterForm } from '@/components/register-form';
import { useAuthStore } from '@/store';
import { NoSSR } from '@/components/no-ssr';

export default function RegisterPage() {
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
                <h1 className="text-3xl font-bold text-foreground mb-2">Create Account</h1>
                <p className="text-muted-foreground">
                  Join us to start tracking your meal calories
                </p>
              </div>
              <RegisterForm />
            </div>
          </main>
        ) : null}
      </NoSSR>
    </div>
  );
}
