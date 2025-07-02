import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Account } from '@/lib/supabase';

export function useAccounts(platformId?: string) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAccounts = async () => {
    try {
      let query = supabase.from('accounts').select('*').order('name');
      
      if (platformId) {
        query = query.eq('platform_id', platformId);
      }

      const { data, error } = await query;
      if (error) throw error;
      setAccounts(data || []);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const createAccount = async (account: Omit<Account, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('accounts')
        .insert(account)
        .select()
        .single();

      if (error) throw error;
      setAccounts(prev => [...prev, data]);
      return { data, error: null };
    } catch (error) {
      console.error('Error creating account:', error);
      return { data: null, error };
    }
  };

  const updateAccount = async (id: string, updates: Partial<Account>) => {
    try {
      const { data, error } = await supabase
        .from('accounts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setAccounts(prev => prev.map(a => a.id === id ? data : a));
      return { data, error: null };
    } catch (error) {
      console.error('Error updating account:', error);
      return { data: null, error };
    }
  };

  const deleteAccount = async (id: string) => {
    try {
      const { error } = await supabase
        .from('accounts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setAccounts(prev => prev.filter(a => a.id !== id));
      return { error: null };
    } catch (error) {
      console.error('Error deleting account:', error);
      return { error };
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, [platformId]);

  return {
    accounts,
    loading,
    createAccount,
    updateAccount,
    deleteAccount,
    refetch: fetchAccounts,
  };
}