import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Set up global error handler for Supabase auth errors
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args);
        
        // Check if this is a Supabase auth request that failed
        if (!response.ok && args[0]?.toString().includes('supabase.co/auth/')) {
          const responseText = await response.clone().text();
          
          try {
            const errorData = JSON.parse(responseText);
            
            // Handle session_not_found error
            if (errorData.code === 'session_not_found' || 
                errorData.message?.includes('Session from session_id claim in JWT does not exist')) {
              console.warn('Session not found, clearing user state');
              
              // Clear the user state immediately
              setUser(null);
              
              // Clear any stored session data
              try {
                await supabase.auth.signOut({ scope: 'local' });
              } catch (signOutError) {
                // Ignore sign out errors since session is already invalid
                console.warn('Sign out failed (expected for invalid session):', signOutError);
              }
              
              // Clear local storage
              localStorage.removeItem('supabase.auth.token');
              
              return response;
            }
          } catch (parseError) {
            // If we can't parse the response, just return the original response
            return response;
          }
        }
        
        return response;
      } catch (error) {
        throw error;
      }
    };

    return () => {
      subscription.unsubscribe();
      // Restore original fetch
      window.fetch = originalFetch;
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  };

  const signOut = async () => {
    try {
      // First check if there's an active session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // If there's a valid session, sign out normally
        const { error } = await supabase.auth.signOut();
        return { error };
      } else {
        // If no session, just clear the local state
        setUser(null);
        localStorage.removeItem('supabase.auth.token');
        return { error: null };
      }
    } catch (error) {
      // If sign out fails, still clear local state
      console.warn('Sign out error, clearing local state:', error);
      setUser(null);
      localStorage.removeItem('supabase.auth.token');
      return { error: null };
    }
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };
}