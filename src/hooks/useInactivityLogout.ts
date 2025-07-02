import { useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';

const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds

export function useInactivityLogout() {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      const { error } = await supabase.auth.signOut();
      
      // Suppress the error if the session was already gone, as this is expected
      // for inactivity logout scenarios where the session may have expired
      if (error && !error.message.includes('Session from session_id claim in JWT does not exist')) {
        console.error('Error during inactivity logout:', error);
      }
    }, INACTIVITY_TIMEOUT);
  };

  useEffect(() => {
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
  }, []);
}