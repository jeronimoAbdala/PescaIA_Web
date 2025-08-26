import { supabase, WAITLIST_TABLE } from './supabase';

// Validación de email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Guardar email en la lista de espera
export const saveEmailToWaitlist = async (email) => {
  try {
    // Validar email
    if (!isValidEmail(email)) {
      throw new Error('Email inválido');
    }

    // Verificar si el email ya existe
    const { data: existingEmail } = await supabase
      .from(WAITLIST_TABLE)
      .select('id')
      .eq('email', email)
      .single();

    if (existingEmail) {
      throw new Error('Este email ya está registrado');
    }

    // Guardar email en la tabla
    const { data, error } = await supabase
      .from(WAITLIST_TABLE)
      .insert([{
        email: email,
        created_at: new Date().toISOString(),
        status: 'pending'
      }])
      .select()
      .single();

    if (error) {
      throw error;
    }

    console.log('Email guardado exitosamente:', data);
    return data;
  } catch (error) {
    console.error('Error al guardar email:', error);
    throw error;
  }
};

// Obtener estadísticas de la lista de espera
export const getWaitlistStats = async () => {
  try {
    const { count, error } = await supabase
      .from(WAITLIST_TABLE)
      .select('*', { count: 'exact', head: true });

    if (error) {
      throw error;
    }

    return {
      total: count || 0,
      available: Math.max(0, 100 - (count || 0))
    };
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    return { total: 0, available: 100 };
  }
};
