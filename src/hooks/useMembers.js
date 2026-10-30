import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';
import { initialMembers } from '../data/seedData.js';

/**
 * Hook to fetch members list
 * Resiliently falls back to seedData if Supabase is offline or unmigrated
 */
export function useMembers() {
  return useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      if (!isSupabaseConfigured) {
        return initialMembers;
      }

      try {
        const { data, error } = await supabase
          .from('members')
          .select('*')
          .order('display_order', { ascending: true });

        if (!error && Array.isArray(data) && data.length > 0) {
          return data;
        }
        if (error) {
          console.warn('Supabase members fetch notice (using seed fallback):', error.message);
        }
        return initialMembers;
      } catch (err) {
        console.warn('Network error fetching members (using seed fallback):', err.message);
        return initialMembers;
      }
    },
    staleTime: 1000 * 60 * 10,
  });
}

export default useMembers;
