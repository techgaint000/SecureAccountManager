import { useState } from 'react';
import { LandingPage } from '@/components/LandingPage';
import { AuthForm } from '@/components/AuthForm';
import { Dashboard } from '@/components/Dashboard';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/ThemeProvider';
import { useAuth } from '@/hooks/useAuth';
import { useInactivityLogout } from '@/hooks/useInactivityLogout';

function App() {
  const { user, loading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  
  // Enable auto-logout only for authenticated users
  useInactivityLogout(!!user);

  if (loading) {
    return (
      <ThemeProvider defaultTheme="system" storageKey="securevault-theme">
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300 font-medium">Loading SecureVault...</p>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider defaultTheme="system" storageKey="securevault-theme">
      {user ? (
        <>
          <Dashboard />
          <Toaster />
        </>
      ) : showAuth ? (
        <>
          <AuthForm onBack={() => setShowAuth(false)} />
          <Toaster />
        </>
      ) : (
        <>
          <LandingPage onGetStarted={() => setShowAuth(true)} />
          <Toaster />
        </>
      )}
    </ThemeProvider>
  );
}

export default App;