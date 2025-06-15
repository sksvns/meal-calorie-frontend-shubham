import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Dashboard - Meal Calorie Tracker',
  description: 'Track and analyze calories in your meals with detailed nutritional information',
  keywords: ['calorie tracker', 'meal tracking', 'nutrition', 'diet', 'dashboard'],
};

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
