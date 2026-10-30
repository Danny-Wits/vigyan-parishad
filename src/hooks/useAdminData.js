import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';
import {
  initialEvents,
  initialPublications,
  initialAnnouncements,
  initialAlbums,
  initialMembers,
} from '../data/seedData.js';

// --- EVENTS ---
export function useAllEvents() {
  return useQuery({
    queryKey: ['admin-events'],
    queryFn: async () => {
      if (!isSupabaseConfigured || !supabase) return initialEvents;
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });
}

export function useSaveEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (eventData) => {
      if (!isSupabaseConfigured || !supabase) {
        throw new Error('Database is not configured.');
      }
      const { id, ...payload } = eventData;
      if (id) {
        const { data, error } = await supabase
          .from('events')
          .update(payload)
          .eq('id', id)
          .select()
          .single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from('events')
          .insert(payload)
          .select()
          .single();
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-events'] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!isSupabaseConfigured || !supabase) {
        throw new Error('Database is not configured.');
      }
      const { error } = await supabase.from('events').delete().eq('id', id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-events'] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
}

// --- PUBLICATIONS ---
export function useAllPublications() {
  return useQuery({
    queryKey: ['admin-publications'],
    queryFn: async () => {
      if (!isSupabaseConfigured || !supabase) return initialPublications;
      const { data, error } = await supabase
        .from('publications')
        .select('*')
        .order('publication_date', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });
}

export function useSavePublication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (pubData) => {
      if (!isSupabaseConfigured || !supabase) {
        throw new Error('Database is not configured.');
      }
      const { id, ...payload } = pubData;
      if (id) {
        const { data, error } = await supabase
          .from('publications')
          .update(payload)
          .eq('id', id)
          .select()
          .single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from('publications')
          .insert(payload)
          .select()
          .single();
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-publications'] });
      queryClient.invalidateQueries({ queryKey: ['publications'] });
    },
  });
}

export function useDeletePublication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!isSupabaseConfigured || !supabase) {
        throw new Error('Database is not configured.');
      }
      const { error } = await supabase.from('publications').delete().eq('id', id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-publications'] });
      queryClient.invalidateQueries({ queryKey: ['publications'] });
    },
  });
}

// --- ANNOUNCEMENTS ---
export function useAllAnnouncements() {
  return useQuery({
    queryKey: ['admin-announcements'],
    queryFn: async () => {
      if (!isSupabaseConfigured || !supabase) return initialAnnouncements;
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });
}

export function useSaveAnnouncement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (annData) => {
      if (!isSupabaseConfigured || !supabase) {
        throw new Error('Database is not configured.');
      }
      const { id, ...payload } = annData;
      if (id) {
        const { data, error } = await supabase
          .from('announcements')
          .update(payload)
          .eq('id', id)
          .select()
          .single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from('announcements')
          .insert(payload)
          .select()
          .single();
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-announcements'] });
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    },
  });
}

export function useDeleteAnnouncement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!isSupabaseConfigured || !supabase) {
        throw new Error('Database is not configured.');
      }
      const { error } = await supabase.from('announcements').delete().eq('id', id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-announcements'] });
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    },
  });
}

// --- GALLERY ALBUMS & PHOTOS ---
export function useAllAlbums() {
  return useQuery({
    queryKey: ['admin-albums'],
    queryFn: async () => {
      if (!isSupabaseConfigured || !supabase) return initialAlbums;
      const { data, error } = await supabase
        .from('gallery_albums')
        .select('*')
        .order('event_date', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });
}

export function useSaveAlbum() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (albumData) => {
      if (!isSupabaseConfigured || !supabase) {
        throw new Error('Database is not configured.');
      }
      const { id, ...payload } = albumData;
      if (id) {
        const { data, error } = await supabase
          .from('gallery_albums')
          .update(payload)
          .eq('id', id)
          .select()
          .single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from('gallery_albums')
          .insert(payload)
          .select()
          .single();
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-albums'] });
      queryClient.invalidateQueries({ queryKey: ['gallery-albums'] });
    },
  });
}

export function useDeleteAlbum() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!isSupabaseConfigured || !supabase) {
        throw new Error('Database is not configured.');
      }
      const { error } = await supabase.from('gallery_albums').delete().eq('id', id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-albums'] });
      queryClient.invalidateQueries({ queryKey: ['gallery-albums'] });
    },
  });
}

export function useAlbumPhotos(albumId) {
  return useQuery({
    queryKey: ['admin-album-photos', albumId],
    enabled: Boolean(albumId),
    queryFn: async () => {
      if (!isSupabaseConfigured || !supabase) return [];
      const { data, error } = await supabase
        .from('gallery_photos')
        .select('*')
        .eq('album_id', albumId)
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });
}

export function useAddPhoto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (photoData) => {
      if (!isSupabaseConfigured || !supabase) {
        throw new Error('Database is not configured.');
      }
      const { data, error } = await supabase
        .from('gallery_photos')
        .insert(photoData)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin-album-photos', variables.album_id] });
      queryClient.invalidateQueries({ queryKey: ['gallery-photos', variables.album_id] });
    },
  });
}

export function useDeletePhoto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ photoId, albumId }) => {
      if (!isSupabaseConfigured || !supabase) {
        throw new Error('Database is not configured.');
      }
      const { error } = await supabase.from('gallery_photos').delete().eq('id', photoId);
      if (error) throw error;
      return { photoId, albumId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-album-photos', data.albumId] });
      queryClient.invalidateQueries({ queryKey: ['gallery-photos', data.albumId] });
    },
  });
}

// --- MEMBERS ---
export function useAllMembers() {
  return useQuery({
    queryKey: ['admin-members'],
    queryFn: async () => {
      if (!isSupabaseConfigured || !supabase) return initialMembers;
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });
}

export function useSaveMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (memberData) => {
      if (!isSupabaseConfigured || !supabase) {
        throw new Error('Database is not configured.');
      }
      const { id, ...payload } = memberData;
      if (id) {
        const { data, error } = await supabase
          .from('members')
          .update(payload)
          .eq('id', id)
          .select()
          .single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from('members')
          .insert(payload)
          .select()
          .single();
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-members'] });
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
  });
}

export function useDeleteMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!isSupabaseConfigured || !supabase) {
        throw new Error('Database is not configured.');
      }
      const { error } = await supabase.from('members').delete().eq('id', id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-members'] });
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
  });
}

// --- MEMBERSHIP APPLICATIONS ---
export function useAllApplications() {
  return useQuery({
    queryKey: ['admin-applications'],
    queryFn: async () => {
      if (!isSupabaseConfigured || !supabase) return [];
      const { data, error } = await supabase
        .from('membership_applications')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });
}

export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }) => {
      if (!isSupabaseConfigured || !supabase) {
        throw new Error('Database is not configured.');
      }
      const { data, error } = await supabase
        .from('membership_applications')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-applications'] });
    },
  });
}

// --- CONTACT INQUIRIES ---
export function useAllInquiries() {
  return useQuery({
    queryKey: ['admin-inquiries'],
    queryFn: async () => {
      if (!isSupabaseConfigured || !supabase) return [];
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });
}

export function useUpdateInquiryStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }) => {
      if (!isSupabaseConfigured || !supabase) {
        throw new Error('Database is not configured.');
      }
      const { data, error } = await supabase
        .from('contact_messages')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-inquiries'] });
    },
  });
}
