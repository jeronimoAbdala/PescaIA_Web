import { useState, useEffect } from 'react';
import { saveEmailToWaitlist, getWaitlistStats } from '../services/authService';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Guardar email en la lista de espera
  const signUp = async (email) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await saveEmailToWaitlist(email);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Obtener estadísticas de la lista de espera
  const getStats = async () => {
    try {
      return await getWaitlistStats();
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      return { total: 0, available: 100 };
    }
  };

  return {
    loading,
    error,
    signUp,
    getStats
  };
};
