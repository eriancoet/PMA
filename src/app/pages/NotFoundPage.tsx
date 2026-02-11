import React from 'react';
import { Link } from 'react-router';
import { Home } from 'lucide-react';
import { Button } from '../components/ui/button';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/projects">
          <Button>
            <Home className="h-4 w-4" />
            Go to Projects
          </Button>
        </Link>
      </div>
    </div>
  );
}
