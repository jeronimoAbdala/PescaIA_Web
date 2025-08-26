import { createClient } from '@supabase/supabase-js';

// TODO: Reemplazar con tus credenciales reales de Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Faltan las variables de entorno de Supabase. Verifica tu archivo .env.local');
}

// Crear cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Nombre de la tabla donde guardar los emails
export const WAITLIST_TABLE = 'waitlist';

export default supabase;
