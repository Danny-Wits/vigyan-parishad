import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';
import { initialAnnouncements } from '../data/seedData.js';

/**
 * Hook to fetch active announcements for hero marquee / banner
 * Resiliently falls back to seedData if Supabase is offline or unmigrated
 */
export function useAnnouncements() {
  return useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      if (!isSupabaseConfigured) {
        return initialAnnouncements;
      }

      try {
        const { data, error } = await supabase
          .from('announcements')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (!error && Array.isArray(data) && data.length > 0) {
          return data;
        }
        if (error) {
          console.warn('Supabase announcements fetch notice (using seed fallback):', error.message);
        }
        return initialAnnouncements;
      } catch (err) {
        console.warn('Network error fetching announcements (using seed fallback):', err.message);
        return initialAnnouncements;
      }
    },
    staleTime: 1000 * 60 * 5,
  });
}

export default useAnnouncements;
