import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';
import { initialEvents } from '../data/seedData.js';

/**
 * Hook to fetch events with filtering and sorting support
 * Resiliently falls back to seedData if Supabase is offline or unmigrated
 */
export function useEvents(filters = {}) {
  const {
    search = '',
    category = 'All',
    year = 'All',
    dateRange = 'All',
    sortBy = 'newest',
  } = filters;

  return useQuery({
    queryKey: ['events', filters],
    queryFn: async () => {
      let events = initialEvents;

      if (isSupabaseConfigured) {
        try {
          const { data, error } = await supabase
            .from('events')
            .select('*')
            .order('event_date', { ascending: sortBy === 'oldest' });

          if (!error && Array.isArray(data) && data.length > 0) {
            events = data;
          } else if (error) {
            console.warn('Supabase events fetch notice (using seed fallback):', error.message);
          }
        } catch (err) {
          console.warn('Network error fetching events (using seed fallback):', err.message);
        }
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Client-side filtering & sorting for instant interactive responsiveness
      let filtered = events.filter((ev) => {
        // Search filter (title, subtitle, description, venue, category)
        const query = search.trim().toLowerCase();
        const matchesSearch =
          !query ||
          ev.title?.toLowerCase().includes(query) ||
          ev.subtitle?.toLowerCase().includes(query) ||
          ev.description?.toLowerCase().includes(query) ||
          ev.venue?.toLowerCase().includes(query) ||
          ev.category?.toLowerCase().includes(query);

        // Category filter
        const matchesCategory =
          category === 'All' ||
          !category ||
          ev.category?.toLowerCase() === category.toLowerCase();

        // Year filter
        const matchesYear =
          year === 'All' ||
          !year ||
          (ev.year && ev.year.toString() === year.toString()) ||
          (ev.event_date && ev.event_date.startsWith(year.toString()));

        // Date range filter (Upcoming vs Past)
        let matchesDateRange = true;
        if (dateRange === 'upcoming' && ev.event_date) {
          matchesDateRange = new Date(ev.event_date) >= today;
        } else if (dateRange === 'past' && ev.event_date) {
          matchesDateRange = new Date(ev.event_date) < today;
        }

        return matchesSearch && matchesCategory && matchesYear && matchesDateRange;
      });

      // Sorting
      return filtered.sort((a, b) => {
        if (sortBy === 'oldest') {
          return new Date(a.event_date || 0) - new Date(b.event_date || 0);
        }
        if (sortBy === 'title') {
          return (a.title || '').localeCompare(b.title || '');
        }
        // Default: newest
        return new Date(b.event_date || 0) - new Date(a.event_date || 0);
      });
    },
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Hook to fetch a single event by slug or UUID
 */
export function useEventDetail(slugOrId) {
  return useQuery({
    queryKey: ['event', slugOrId],
    queryFn: async () => {
      if (!slugOrId) return initialEvents[0] || null;

      if (isSupabaseConfigured) {
        try {
          const { data, error } = await supabase
            .from('events')
            .select('*')
            .or(`slug.eq.${slugOrId},id.eq.${slugOrId}`)
            .maybeSingle();

          if (!error && data) {
            return data;
          }
          if (error) {
            console.warn('Supabase event detail notice (using seed fallback):', error.message);
          }
        } catch (err) {
          console.warn('Network error fetching event detail (using seed fallback):', err.message);
        }
      }

      const found = initialEvents.find(
        (e) =>
          e.slug === slugOrId ||
          e.id === slugOrId ||
          (slugOrId && slugOrId.includes('young-scientist') && e.slug.includes('young-scientist')) ||
          (slugOrId && slugOrId.includes('science-seminar') && e.slug.includes('science-seminar'))
      );

      return found || initialEvents[0] || null;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export default useEvents;
