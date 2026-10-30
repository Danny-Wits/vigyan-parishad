import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';
import { initialPublications } from '../data/seedData.js';

/**
 * Hook to fetch publications with filtering and sorting support
 * Resiliently falls back to seedData if Supabase is offline or unmigrated
 */
export function usePublications(filters = {}) {
  const {
    search = '',
    category = 'All',
    year = 'All',
    sortBy = 'newest',
  } = filters;

  return useQuery({
    queryKey: ['publications', filters],
    queryFn: async () => {
      let publications = initialPublications;

      if (isSupabaseConfigured) {
        try {
          const { data, error } = await supabase
            .from('publications')
            .select('*')
            .order('publication_date', { ascending: sortBy === 'oldest' });

          if (!error && Array.isArray(data) && data.length > 0) {
            publications = data;
          } else if (error) {
            console.warn('Supabase publications fetch notice (using seed fallback):', error.message);
          }
        } catch (err) {
          console.warn('Network error fetching publications (using seed fallback):', err.message);
        }
      }

      // Client-side filtering
      let filtered = publications.filter((pub) => {
        const query = search.trim().toLowerCase();
        const matchesSearch =
          !query ||
          pub.title?.toLowerCase().includes(query) ||
          pub.author?.toLowerCase().includes(query) ||
          pub.abstract?.toLowerCase().includes(query) ||
          (Array.isArray(pub.keywords) &&
            pub.keywords.some((kw) =>
              typeof kw === 'string' && kw.toLowerCase().includes(query)
            ));

        const matchesCategory =
          category === 'All' ||
          !category ||
          pub.category?.toLowerCase().replace(/\s+/g, '') ===
            category.toLowerCase().replace(/\s+/g, '');

        const matchesYear =
          year === 'All' ||
          !year ||
          (pub.publication_date && pub.publication_date.startsWith(year.toString())) ||
          (pub.date_display && pub.date_display.includes(year.toString()));

        return matchesSearch && matchesCategory && matchesYear;
      });

      // Sorting
      return filtered.sort((a, b) => {
        if (sortBy === 'oldest') {
          return new Date(a.publication_date || 0) - new Date(b.publication_date || 0);
        }
        if (sortBy === 'views') {
          return (b.views || 0) - (a.views || 0);
        }
        if (sortBy === 'title') {
          return (a.title || '').localeCompare(b.title || '');
        }
        // Default: newest
        return new Date(b.publication_date || 0) - new Date(a.publication_date || 0);
      });
    },
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Hook to fetch a single publication by slug or UUID
 */
export function usePublicationDetail(slugOrId) {
  return useQuery({
    queryKey: ['publication', slugOrId],
    queryFn: async () => {
      if (!slugOrId) return initialPublications[0] || null;

      if (isSupabaseConfigured) {
        try {
          const { data, error } = await supabase
            .from('publications')
            .select('*')
            .or(`slug.eq.${slugOrId},id.eq.${slugOrId}`)
            .maybeSingle();

          if (!error && data) {
            return data;
          }
          if (error) {
            console.warn('Supabase publication detail notice (using seed fallback):', error.message);
          }
        } catch (err) {
          console.warn('Network error fetching publication detail (using seed fallback):', err.message);
        }
      }

      const found = initialPublications.find(
        (p) => p.slug === slugOrId || p.id === slugOrId
      );

      return found || initialPublications[0] || null;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export default usePublications;
