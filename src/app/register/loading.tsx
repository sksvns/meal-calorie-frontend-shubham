export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="h-14 bg-background border-b"></div>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded mb-2"></div>
            <div className="h-4 bg-muted rounded mb-8 w-2/3"></div>
            <div className="bg-card border rounded-lg p-6">
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded w-1/4"></div>
                <div className="h-10 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-1/4"></div>
                <div className="h-10 bg-muted rounded"></div>
                <div className="h-10 bg-primary/20 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
