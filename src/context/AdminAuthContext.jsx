import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    if (!isSupabaseConfigured || !supabase) {
      // Local fallback session check if stored
      const localAuth = localStorage.getItem('vp_admin_session');
      if (localAuth) {
        try {
          const parsed = JSON.parse(localAuth);
          setSession(parsed);
          setUser(parsed.user);
        } catch {
          localStorage.removeItem('vp_admin_session');
        }
      }
      setIsLoading(false);
      return;
    }

    // 1. Get initial session from Supabase
    supabase.auth.getSession().then(({ data: { session: initialSession }, error }) => {
      if (mounted) {
        if (!error && initialSession) {
          setSession(initialSession);
          setUser(initialSession.user);
        }
        setIsLoading(false);
      }
    });

    // 2. Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (mounted) {
        setSession(currentSession);
        setUser(currentSession?.user || null);
        setIsLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    if (!isSupabaseConfigured || !supabase) {
      // Fallback auth check
      if (email === 'admin@vigyanparishad.org' && password === 'VigyanAdmin@2026') {
        const fallbackSession = {
          user: { id: 'fallback-admin', email: 'admin@vigyanparishad.org', role: 'admin' },
          access_token: 'fallback-token',
        };
        localStorage.setItem('vp_admin_session', JSON.stringify(fallbackSession));
        setSession(fallbackSession);
        setUser(fallbackSession.user);
        return { data: { user: fallbackSession.user, session: fallbackSession }, error: null };
      }
      return { data: null, error: new Error('Invalid email or password.') };
    }

    const res = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (!res.error && res.data?.session) {
      setSession(res.data.session);
      setUser(res.data.user);
    }

    return res;
  };

  const logout = async () => {
    localStorage.removeItem('vp_admin_session');
    if (supabase) {
      await supabase.auth.signOut();
    }
    setSession(null);
    setUser(null);
  };

  const value = {
    session,
    user,
    isLoading,
    isAuthenticated: Boolean(session && user),
    login,
    logout,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
