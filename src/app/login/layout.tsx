import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Login - Meal Calorie Tracker',
  description: 'Sign in to your account to continue tracking calories in your meals',
  keywords: ['login', 'sign in', 'calorie tracker', 'meal tracking', 'account'],
};

export default function LoginLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
