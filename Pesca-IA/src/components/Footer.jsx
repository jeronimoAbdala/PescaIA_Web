import React from 'react';
import { motion } from 'framer-motion';
import { Fish, Mail, Facebook, MessageCircle } from 'lucide-react'; // solo los que existen en lucide
import { FaTiktok, FaReddit, FaWhatsapp } from 'react-icons/fa'; // resto de íconos

const Footer = () => {
  const socialLinks = [
    { icon: FaWhatsapp, href: 'https://wa.me/543516640106', label: 'Whatsapp' },
    { icon: FaTiktok, href: 'https://www.tiktok.com/@pesca_ia_app', label: 'TikTok' },
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61579625351464', label: 'Facebook' },
    { icon: FaReddit, href: 'https://www.reddit.com/r/Pesca_IA/', label: 'Reddit' },
  ];

  return (
    <footer className="ocean-gradient wave-pattern border-t border-white/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo y descripción */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-white/10">
                <Fish className="w-6 h-6 text-cyan-300" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-white">Pesca IA</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              La aplicación de pesca más avanzada que utiliza inteligencia artificial 
              para analizar y medir tus capturas con precisión.
            </p>
          </motion.div>

          {/* Enlaces rápidos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <span className="text-base sm:text-lg font-semibold text-white">Enlaces Rápidos</span>
            <div className="flex flex-col space-y-2">
              <a href="/" className="text-gray-300 hover:text-cyan-300 transition-colors text-sm">
                Inicio
              </a>
              <a href="/privacy" className="text-gray-300 hover:text-cyan-300 transition-colors text-sm">
                Política de Privacidad
              </a>
              <a href="/referrals" className="text-gray-300 hover:text-cyan-300 transition-colors text-sm">
                Sistema de Referidos
              </a>
            </div>
          </motion.div>

          {/* Contacto y redes sociales */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <span className="text-lg font-semibold text-white">Contacto</span>
            <div className="flex items-center space-x-2 text-gray-300">
              <Mail className="w-4 h-4" />
              <span className="text-sm">contacto@PescaIA.com</span>
            </div>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5 text-cyan-300" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 pt-8 border-t border-white/20 text-center"
        >
          <p className="text-gray-400 text-sm">
            © 2024 PescaIA. Todos los derechos reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
