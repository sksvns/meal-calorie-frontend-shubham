'use client';

import { useRouter } from 'next/navigation';
import { LogOut, User, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/theme-toggle';
import { useAuthStore } from '@/store';

export function Header() {
  const { user, logout, isAuthenticated, _hasHydrated } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // During SSR/hydration, always show the same structure
  if (!_hasHydrated) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <ChefHat className="h-6 w-6" aria-hidden="true" />
            <span className="text-lg font-semibold">Meal Calorie Tracker</span>
          </div>
          
          <div className="flex items-center gap-3 ml-auto">
            <ThemeToggle />
            {/* Placeholder for consistent hydration */}
            <div className="w-8 h-8"></div>
          </div>
        </div>
      </header>
    );
  }
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">        <div className="flex items-center gap-2 cursor-pointer" role="banner" tabIndex={0} onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            router.push('/');
          }
        }} onClick={() => router.push('/')} aria-label="Meal Calorie Tracker - Go to home page">
          <ChefHat className="h-6 w-6" aria-hidden="true" />
          <span className="text-lg font-semibold">Meal Calorie Tracker</span>
        </div>
          <div className="flex items-center gap-3 ml-auto">
          <ThemeToggle />
          
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="relative h-8 w-8 rounded-full cursor-pointer hover:bg-accent transition-colors focus:ring-2 focus:ring-ring focus:outline-none"
                  aria-label={`User menu for ${user.username}`}
                >
                  <User className="h-4 w-4" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2" role="presentation">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium" aria-label={`Logged in as ${user.username}`}>{user.username}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="cursor-pointer focus:bg-accent focus:text-accent-foreground"
                  role="menuitem"
                >
                  <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>
      </div>
    </header>
  );
}
