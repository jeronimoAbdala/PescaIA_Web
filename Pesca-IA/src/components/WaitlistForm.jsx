import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/use-toast';

const WaitlistForm = ({ onSuccess, spotsAvailable, onSpotTaken }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { signUp, error: authError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "❌ Campo requerido",
        description: "Por favor ingresa tu email para continuar.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Guardar email en la lista de espera
      await signUp(email);
      
      // Marcar como enviado
      setIsSubmitted(true);
      
      // Notificar al componente padre
      if (onSuccess) onSuccess();
      if (onSpotTaken) onSpotTaken();
      
      // Mostrar toast de éxito
      toast({
        title: "🎉 ¡Te has unido a la lista de espera!",
        description: "Pronto recibirás un email con tu acceso exclusivo a PescaIA.",
      });
      
    } catch (error) {
      console.error('Error al unirse a la lista de espera:', error);
      
      let errorMessage = "Error al procesar tu solicitud. Inténtalo de nuevo.";
      
      // Manejar errores específicos
      if (error.message?.includes('ya está registrado')) {
        errorMessage = "Este email ya está registrado. ¡Gracias por tu interés!";
      } else if (error.message?.includes('Email inválido')) {
        errorMessage = "Por favor ingresa un email válido.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "❌ Error",
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-4"
      >
        <div className="flex justify-center">
          <CheckCircle className="w-16 h-16 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white">
          ¡Bienvenido a Pesca IA!
        </h3>
        <p className="text-gray-300">
          Te has unido exitosamente a nuestra lista de espera. 
          Pronto recibirás un email con tu acceso exclusivo.
        </p>
        <div className="bg-white/10 rounded-xl p-4 border border-white/20">
          <p className="text-sm text-gray-400 mb-2">Email registrado:</p>
          <p className="text-white font-mono text-sm">
            <span className="text-cyan-300">{email}</span>
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
            disabled={isSubmitting}
          />
        </div>
        
        {authError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-3"
          >
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">{authError}</span>
          </motion.div>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || spotsAvailable === 0}
        className={`w-full py-4 text-base sm:text-lg font-bold rounded-xl transition-all duration-300 ${
          isSubmitting || spotsAvailable === 0
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-white text-black border border-gray-300 hover:bg-gray-100'
        }`}
      >
        {isSubmitting ? (
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Procesando...</span>
          </div>
        ) : (
          <>
            <CheckCircle className="w-5 h-5 mr-2" />
            {spotsAvailable > 0 ? '¡Quiero mi acceso gratis!' : 'Lista de espera completa'}
          </>
        )}
      </Button>

      <p className="text-gray-400 text-sm text-center">
        Sin compromisos • Acceso inmediato a la lista de espera
      </p>
    </motion.form>
  );
};

export default WaitlistForm;
