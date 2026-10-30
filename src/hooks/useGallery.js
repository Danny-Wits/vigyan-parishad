import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';
import { initialAlbums } from '../data/seedData.js';

/**
 * Normalizes an album to ensure `photos` array is consistently formatted
 */
function normalizeAlbum(album) {
  if (!album) return null;
  if (Array.isArray(album.photos) && album.photos.length > 0) {
    return album;
  }
  const rawPhotos = album.gallery_photos || [];
  const photos = rawPhotos
    .map((p) => ({
      id: p.id,
      url: p.photo_url || p.url,
      caption: p.caption || '',
      display_order: p.display_order || 0,
    }))
    .sort((a, b) => (a.display_order || 0) - (b.display_order || 0));

  return {
    ...album,
    photos,
  };
}

/**
 * Hook to fetch gallery albums with filtering and sorting support
 * Resiliently falls back to seedData if Supabase is offline or unmigrated
 */
export function useGallery(filters = {}) {
  const {
    search = '',
    category = 'All',
    year = 'All',
    sortBy = 'newest',
  } = filters;

  return useQuery({
    queryKey: ['gallery', filters],
    queryFn: async () => {
      let albums = initialAlbums;

      if (isSupabaseConfigured) {
        try {
          const { data, error } = await supabase
            .from('gallery_albums')
            .select('*, gallery_photos(*)');

          if (!error && Array.isArray(data) && data.length > 0) {
            albums = data.map(normalizeAlbum);
          } else if (error) {
            console.warn('Supabase gallery fetch notice (using seed fallback):', error.message);
          }
        } catch (err) {
          console.warn('Network error fetching gallery albums (using seed fallback):', err.message);
        }
      }

      // Client-side filtering
      let filtered = albums.filter((alb) => {
        const query = search.trim().toLowerCase();
        const matchesSearch =
          !query ||
          alb.title?.toLowerCase().includes(query) ||
          alb.description?.toLowerCase().includes(query) ||
          alb.venue?.toLowerCase().includes(query) ||
          alb.category?.toLowerCase().includes(query);

        const matchesCategory =
          category === 'All' ||
          !category ||
          alb.category?.toLowerCase() === category.toLowerCase();

        const matchesYear =
          year === 'All' ||
          !year ||
          (alb.event_date && alb.event_date.startsWith(year.toString())) ||
          (alb.date_display && alb.date_display.includes(year.toString()));

        return matchesSearch && matchesCategory && matchesYear;
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
 * Hook to fetch a single gallery album with its photos by slug or UUID
 */
export function useGalleryDetail(slugOrId) {
  return useQuery({
    queryKey: ['gallery_album', slugOrId],
    queryFn: async () => {
      if (!slugOrId) return initialAlbums[0] || null;

      if (isSupabaseConfigured) {
        try {
          const { data, error } = await supabase
            .from('gallery_albums')
            .select('*, gallery_photos(*)')
            .or(`slug.eq.${slugOrId},id.eq.${slugOrId}`)
            .maybeSingle();

          if (!error && data) {
            return normalizeAlbum(data);
          }
          if (error) {
            console.warn('Supabase gallery detail notice (using seed fallback):', error.message);
          }
        } catch (err) {
          console.warn('Network error fetching gallery album (using seed fallback):', err.message);
        }
      }

      const found = initialAlbums.find(
        (a) => a.slug === slugOrId || a.id === slugOrId
      );

      return found || initialAlbums[0] || null;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export { useGalleryDetail as useAlbumDetail };
export default useGallery;
