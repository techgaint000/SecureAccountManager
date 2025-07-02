import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Platform } from '@/lib/supabase';

export function usePlatforms() {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPlatforms = async () => {
    try {
      const { data, error } = await supabase
        .from('platforms')
        .select('*')
        .order('name');

      if (error) throw error;
      setPlatforms(data || []);
    } catch (error) {
      console.error('Error fetching platforms:', error);
    } finally {
      setLoading(false);
    }
  };

  const createPlatform = async (platform: Omit<Platform, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const { data, error } = await supabase
        .from('platforms')
        .insert({ ...platform, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      setPlatforms(prev => [...prev, data]);
      return { data, error: null };
    } catch (error) {
      console.error('Error creating platform:', error);
      return { data: null, error };
    }
  };

  const updatePlatform = async (id: string, updates: Partial<Platform>) => {
    try {
      const { data, error } = await supabase
        .from('platforms')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setPlatforms(prev => prev.map(p => p.id === id ? data : p));
      return { data, error: null };
    } catch (error) {
      console.error('Error updating platform:', error);
      return { data: null, error };
    }
  };

  const deletePlatform = async (id: string) => {
    try {
      const { error } = await supabase
        .from('platforms')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setPlatforms(prev => prev.filter(p => p.id !== id));
      return { error: null };
    } catch (error) {
      console.error('Error deleting platform:', error);
      return { error };
    }
  };

  useEffect(() => {
    fetchPlatforms();
  }, []);

  return {
    platforms,
    loading,
    createPlatform,
    updatePlatform,
    deletePlatform,
    refetch: fetchPlatforms,
  };
}