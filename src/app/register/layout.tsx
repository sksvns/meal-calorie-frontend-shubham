import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Register - Meal Calorie Tracker',
  description: 'Create your account to start tracking calories in your favorite dishes',
  keywords: ['register', 'sign up', 'create account', 'calorie tracker', 'meal tracking'],
};

export default function RegisterLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
