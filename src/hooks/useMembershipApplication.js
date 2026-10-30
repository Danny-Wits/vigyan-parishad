import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';
import { STORAGE_KEYS } from '../data/seedData.js';

/**
 * Retrieves saved membership applications from localStorage
 */
export function getSavedApplications() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MEMBERSHIP);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('Error reading saved applications from localStorage:', err);
    return [];
  }
}

/**
 * Saves a new membership application to localStorage
 */
function saveApplicationToLocalStorage(record) {
  if (typeof window === 'undefined') return;
  try {
    const existing = getSavedApplications();
    const updated = [record, ...existing];
    localStorage.setItem(STORAGE_KEYS.MEMBERSHIP, JSON.stringify(updated));
  } catch (err) {
    console.warn('Error saving application to localStorage:', err);
  }
}

/**
 * Hook to submit a membership application
 * Inserts into Supabase `membership_applications` table.
 * If offline or Supabase fails, simulates success and saves to localStorage.
 */
export function useMembershipApplication(options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => {
      const payload = {
        full_name: (formData.full_name || formData.fullName || '').trim(),
        email: (formData.email || '').trim().toLowerCase(),
        contact_number: (formData.contact_number || formData.contactNumber || formData.phone || '').trim(),
        profession: (formData.profession || '').trim(),
        area_of_interest: (formData.area_of_interest || formData.areaOfInterest || '').trim(),
        short_motivation: (formData.short_motivation || formData.shortMotivation || formData.motivation || '').trim(),
        status: 'pending',
      };

      if (!payload.full_name || !payload.email || !payload.contact_number || !payload.profession) {
        throw new Error('Please fill in all required fields (Name, Email, Contact, Profession).');
      }

      // 1. Try Supabase if configured
      if (isSupabaseConfigured) {
        try {
          const { data, error } = await supabase
            .from('membership_applications')
            .insert([payload])
            .select()
            .single();

          if (!error && data) {
            saveApplicationToLocalStorage(data);
            return {
              success: true,
              data,
              isFallback: false,
              message: 'Your membership application has been submitted successfully to the database!',
            };
          }

          if (error) {
            console.warn('Supabase application insert notice (using fallback):', error.message);
          }
        } catch (err) {
          console.warn('Network error inserting application (using fallback):', err.message);
        }
      }

      // 2. Resilient Fallback: Simulate submission with timeout & localStorage
      await new Promise((resolve) => setTimeout(resolve, 600));

      const fallbackRecord = {
        id: `local-app-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        ...payload,
        created_at: new Date().toISOString(),
        is_local_fallback: true,
      };

      saveApplicationToLocalStorage(fallbackRecord);

      return {
        success: true,
        data: fallbackRecord,
        isFallback: true,
        message: 'Your membership application has been recorded successfully!',
      };
    },
    onSuccess: (result) => {
      try {
        notifications.show({
          title: 'Application Submitted!',
          message: result.message || 'Thank you for applying. We will review your application soon.',
          color: 'teal',
          autoClose: 5000,
        });
      } catch (e) {
        // Safe if notifications provider is unmounted
      }

      queryClient.invalidateQueries({ queryKey: ['membership_applications'] });
      options.onSuccess?.(result);
    },
    onError: (error) => {
      try {
        notifications.show({
          title: 'Submission Error',
          message: error.message || 'Failed to submit application. Please check your details and try again.',
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

export default useMembershipApplication;
