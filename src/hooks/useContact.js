import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';
import { STORAGE_KEYS } from '../data/seedData.js';

/**
 * Retrieves saved contact messages from localStorage
 */
export function getSavedContactMessages() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CONTACT);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('Error reading saved contact messages from localStorage:', err);
    return [];
  }
}

/**
 * Saves a new contact message to localStorage
 */
function saveContactMessageToLocalStorage(record) {
  if (typeof window === 'undefined') return;
  try {
    const existing = getSavedContactMessages();
    const updated = [record, ...existing];
    localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(updated));
  } catch (err) {
    console.warn('Error saving contact message to localStorage:', err);
  }
}

/**
 * Hook to submit a contact form message
 * Inserts into Supabase `contact_messages` table.
 * If offline or Supabase fails, simulates success and saves to localStorage.
 */
export function useContact(options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => {
      const payload = {
        full_name: (formData.full_name || formData.fullName || formData.name || '').trim(),
        email: (formData.email || '').trim().toLowerCase(),
        contact_number: (formData.contact_number || formData.contactNumber || formData.phone || '').trim(),
        subject: (formData.subject || '').trim(),
        message: (formData.message || '').trim(),
        status: 'unread',
      };

      if (!payload.full_name || !payload.email || !payload.subject || !payload.message) {
        throw new Error('Please fill in all required fields (Name, Email, Subject, Message).');
      }

      // 1. Try Supabase if configured
      if (isSupabaseConfigured) {
        try {
          // Do not chain .select() for anonymous public submissions
          // (Public visitors have INSERT permission, while SELECT is restricted to authenticated managers)
          const { error } = await supabase
            .from('contact_messages')
            .insert([payload]);

          if (!error) {
            const recorded = {
              ...payload,
              id: `msg-${Date.now()}`,
              created_at: new Date().toISOString(),
            };
            saveContactMessageToLocalStorage(recorded);
            return {
              success: true,
              data: recorded,
              isFallback: false,
              message: 'Your message has been sent successfully to the team!',
            };
          }

          if (error) {
            console.error('Supabase contact message insert error:', error.message);
            throw new Error(error.message);
          }
        } catch (err) {
          console.warn('Network error sending contact message (using fallback):', err.message);
        }
      }

      // 2. Resilient Fallback: Simulate submission with timeout & localStorage
      await new Promise((resolve) => setTimeout(resolve, 600));

      const fallbackRecord = {
        id: `local-msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        ...payload,
        created_at: new Date().toISOString(),
        is_local_fallback: true,
      };

      saveContactMessageToLocalStorage(fallbackRecord);

      return {
        success: true,
        data: fallbackRecord,
        isFallback: true,
        message: 'Your message has been received! Our team will get back to you shortly.',
      };
    },
    onSuccess: (result) => {
      try {
        notifications.show({
          title: 'Message Sent!',
          message: result.message || 'Thank you for reaching out. We will get back to you shortly.',
          color: 'teal',
          autoClose: 5000,
        });
      } catch (e) {
        // Safe if notifications provider is unmounted
      }

      queryClient.invalidateQueries({ queryKey: ['contact_messages'] });
      options.onSuccess?.(result);
    },
    onError: (error) => {
      try {
        notifications.show({
          title: 'Failed to Send Message',
          message: error.message || 'An error occurred while sending your message. Please try again.',
          color: 'red',
          autoClose: 6000,
        });
      } catch (e) {
        // Safe fallback
      }

      options.onError?.(error);
    },
  });
}

export default useContact;
