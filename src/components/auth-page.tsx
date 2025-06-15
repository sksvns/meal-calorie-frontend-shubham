'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LoginForm } from '@/components/login-form';
import { RegisterForm } from '@/components/register-form';

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md space-y-6">
        {isLogin ? <LoginForm /> : <RegisterForm />}
          <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <Button
            variant="link"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm cursor-pointer hover:underline focus:ring-2 focus:ring-ring focus:outline-none p-0 h-auto"
            aria-label={isLogin ? 'Switch to register form' : 'Switch to login form'}
          >
            {isLogin ? 'Create one here' : 'Sign in here'}
          </Button>
        </div>
      </div>
    </div>
  );
}
