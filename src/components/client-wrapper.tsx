'use client';

import { useEffect, useState } from 'react';

interface ClientWrapperProps {
  children: React.ReactNode;
}

export function ClientWrapper({ children }: ClientWrapperProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    // Return a minimal skeleton during SSR to prevent hydration mismatch
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse">
          <div className="h-14 bg-muted border-b"></div>
          <div className="container mx-auto px-4 py-8">
            <div className="h-8 bg-muted rounded mb-4"></div>
            <div className="h-4 bg-muted rounded mb-2"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
