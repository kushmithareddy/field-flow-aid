import { createClient } from '@supabase/supabase-js';

// --- Securely loading keys from environment variables ---
// Vite automatically exposes environment variables prefixed with VITE_ 
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Good practice: Check if the keys are available
if (!supabaseUrl || !supabaseAnonKey) {
  // Use a helpful error message if you forget to set your keys
  throw new Error(
    'Missing Supabase URL or Anon Key. Please check your .env file and ensure they are prefixed with VITE_.'
  );
}

// Initialize and Export the Client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);