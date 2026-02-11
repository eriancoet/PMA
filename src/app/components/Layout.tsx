import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { CheckSquare, LayoutGrid, Settings, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';

export function Layout() {
  const { user } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/projects" className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <CheckSquare className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">TaskFlow</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              <Link
                to="/projects"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive('/projects')
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
                Projects
              </Link>
              <Link
                to="/settings"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive('/settings')
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </div>

            {/* User Info - Desktop */}
            {user && (
              <div className="hidden md:flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-medium">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-gray-200 mt-2 pt-4">
              <div className="space-y-2">
                <Link
                  to="/projects"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive('/projects')
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutGrid className="h-4 w-4" />
                  Projects
                </Link>
                <Link
                  to="/settings"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive('/settings')
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </div>
              {user && (
                <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}