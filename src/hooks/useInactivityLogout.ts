import { useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';

const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds

export function useInactivityLogout(isAuthenticated: boolean = false) {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Only set timer if user is authenticated
    if (!isAuthenticated) {
      return;
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        // Check if there's an active session before attempting to sign out
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // Try to sign out, but handle session_not_found errors gracefully
          try {
            const { error } = await supabase.auth.signOut();
            if (error) {
              console.warn('Inactivity logout error:', error);
            }
          } catch (signOutError: any) {
            // Check if it's a session_not_found error
            if (signOutError?.message?.includes('session_not_found') || 
                signOutError?.message?.includes('Session from session_id claim in JWT does not exist')) {
              console.warn('Session already expired during inactivity logout');
              // The global error handler in useAuth will handle clearing the user state
            } else {
              console.error('Unexpected error during inactivity logout:', signOutError);
            }
          }
        }
      } catch (error) {
        console.error('Error checking session during inactivity logout:', error);
      }
    }, INACTIVITY_TIMEOUT);
  };

  useEffect(() => {
    // Only set up inactivity logout if user is authenticated
    if (!isAuthenticated) {
      // Clear any existing timer if user is no longer authenticated
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      return;
    }

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    const handleActivity = () => {
      resetTimer();
    };

    // Set initial timer
    resetTimer();

    // Add event listeners
    events.forEach((event) => {
      document.addEventListener(event, handleActivity);
    });

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity);
      });
    };
  }, [isAuthenticated]);
}