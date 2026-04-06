import { createClient } from '@supabase/supabase-js';

const getEnvVar = (key: string, fallback = ''): string => {
  try {
    if (typeof import.meta !== 'undefined' && (import.meta as any).env?.[key]) {
      return (import.meta as any).env[key] as string;
    }
    if (typeof process !== 'undefined' && process.env?.[key]) {
      return process.env[key] as string;
    }
  } catch {
    // noop
  }
  return fallback;
};

export const SUPABASE_URL = getEnvVar('VITE_SUPABASE_URL', 'https://mbkjwtbubkfqlhllhddh.supabase.co');
export const SUPABASE_ANON_KEY = getEnvVar(
  'VITE_SUPABASE_ANON_KEY',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ia2p3dGJ1YmtmcWxobGxoZGRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MDE3MzEsImV4cCI6MjA5MTA3NzczMX0.reh3L-4U6a9dyJKIzBHJ7pqGAPktNOcr4av_MDfFE94'
);

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
