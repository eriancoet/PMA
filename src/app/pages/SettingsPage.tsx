import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft, User, Moon, Sun, LogOut, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

export function SettingsPage() {
  const { user, logout, isGuest } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [clearDataDialogOpen, setClearDataDialogOpen] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user profile
    toast.success('Profile updated successfully');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    toast.success(`Theme changed to ${newTheme} mode`);
  };

  const handleClearData = () => {
    localStorage.removeItem('pm_projects');
    localStorage.removeItem('pm_tasks');
    localStorage.setItem('pm_data_cleared', 'true');
    toast.success('All data cleared successfully');
    setClearDataDialogOpen(false);
    // Reload the page to reset state
    window.location.reload();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account and preferences</p>
      </div>

      <div className="space-y-6">
        {/* Profile Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-2 rounded-lg">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Profile Information</h2>
              <p className="text-sm text-gray-600">
                Update your personal details
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="mt-1"
                disabled={isGuest}
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="mt-1"
                disabled={isGuest}
              />
            </div>

            {isGuest && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  You're logged in as a guest. Profile changes are disabled.
                </p>
              </div>
            )}

            <div className="flex justify-end">
              <Button type="submit" disabled={isGuest}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>

        {/* Appearance Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-100 p-2 rounded-lg">
              {theme === 'light' ? (
                <Sun className="h-5 w-5 text-purple-600" />
              ) : (
                <Moon className="h-5 w-5 text-purple-600" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold">Appearance</h2>
              <p className="text-sm text-gray-600">
                Customize how the app looks
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Theme</div>
              <div className="text-sm text-gray-600">
                Current theme: {theme === 'light' ? 'Light' : 'Dark'}
              </div>
            </div>
            <Button variant="outline" onClick={toggleTheme}>
              {theme === 'light' ? (
                <>
                  <Moon className="h-4 w-4" />
                  Dark Mode
                </>
              ) : (
                <>
                  <Sun className="h-4 w-4" />
                  Light Mode
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Account Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-red-100 p-2 rounded-lg">
              <LogOut className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Account</h2>
              <p className="text-sm text-gray-600">
                Manage your account settings
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-t border-gray-200">
              <div>
                <div className="font-medium">Account Type</div>
                <div className="text-sm text-gray-600">
                  {isGuest ? 'Guest Account' : 'Registered Account'}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-gray-200">
              <div>
                <div className="font-medium">Clear All Data</div>
                <div className="text-sm text-gray-600">
                  Delete all projects and tasks
                </div>
              </div>
              <Button
                variant="destructive"
                onClick={() => setClearDataDialogOpen(true)}
              >
                <Trash2 className="h-4 w-4" />
                Clear Data
              </Button>
            </div>

            <div className="pt-3 border-t border-gray-200">
              <Link to="/">
                <Button variant="destructive" onClick={logout}>
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* App Info */}
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <p className="text-sm text-gray-600">
            PMA v1.0.0 - A simple project management app
          </p>
          <p className="text-xs text-gray-500 mt-1">
            © 2026 PMA. All data is stored locally in your browser.
          </p>
        </div>
      </div>

      <ConfirmDialog
        open={clearDataDialogOpen}
        onOpenChange={setClearDataDialogOpen}
        onConfirm={handleClearData}
        title="Clear All Data"
        description="Are you sure you want to delete all projects and tasks? This action cannot be undone."
        confirmText="Clear Data"
      />
    </div>
  );
}