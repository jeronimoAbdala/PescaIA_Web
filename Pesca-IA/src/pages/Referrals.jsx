import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Users, Gift, Link2, Copy, Check, Crown, Star, Trophy, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Referrals = () => {
  const [email, setEmail] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [referralStats, setReferralStats] = useState({
    totalReferrals: 0,
    proDaysEarned: 0,
    pendingRewards: 0
  });

  useEffect(() => {
    // Load referral stats from localStorage
    const savedStats = localStorage.getItem('PescaIA_referral_stats');
    if (savedStats) {
      setReferralStats(JSON.parse(savedStats));
    }
  }, []);

  const generateReferralLink = () => {
    if (!email) {
      toast({
        title: "Email requerido",
        description: "Por favor ingresa tu email para generar el link de referido.",
        variant: "destructive"
      });
      return;
    }

    if (!email.includes('@')) {
      toast({
        title: "Email inválido",
        description: "Por favor ingresa un email válido.",
        variant: "destructive"
      });
      return;
    }

    // Generate unique referral code based on email
    const referralCode = btoa(email).replace(/[^a-zA-Z0-9]/g, '').substring(0, 8).toUpperCase();
    const link = `https://PescaIA.com/download?ref=${referralCode}`;
    
    setReferralLink(link);
    
    // Save to localStorage
    const referralData = {
      email,
      referralCode,
      link,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('PescaIA_referral_data', JSON.stringify(referralData));

    toast({
      title: "¡Link generado exitosamente!",
      description: "Tu link de referido está listo. Compártelo con tus amigos para ganar días PRO gratis.",
    });
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "¡Copiado!",
        description: "El link de referido se copió al portapapeles.",
      });
    } catch (err) {
      toast({
        title: "Error al copiar",
        description: "No se pudo copiar el link. Inténtalo de nuevo.",
        variant: "destructive"
      });
    }
  };

  const benefits = [
    {
      icon: Crown,
      title: "7 Días PRO Gratis",
      description: "Por cada amigo que se registre usando tu link"
    },
    {
      icon: Star,
      title: "Bonificaciones Especiales",
      description: "Recompensas extra por alcanzar metas de referidos"
    },
    {
      icon: Trophy,
      title: "Acceso Anticipado",
      description: "Sé el primero en probar nuevas funciones"
    },
    {
      icon: Zap,
      title: "Análisis Ilimitados",
      description: "Sin límites en el análisis de fotos durante tu período PRO"
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Genera tu Link",
      description: "Ingresa tu email y genera tu link de referido único"
    },
    {
      step: "2",
      title: "Comparte con Amigos",
      description: "Envía tu link a amigos pescadores por WhatsApp, redes sociales o email"
    },
    {
      step: "3",
      title: "Gana Recompensas",
      description: "Recibe 7 días PRO gratis por cada amigo que se registre"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Sistema de Referidos - PescaIA</title>
        <meta name="description" content="Invita a tus amigos a PescaIA y gana días de suscripción PRO gratis. Sistema de referidos con recompensas exclusivas para pescadores." />
        <meta property="og:title" content="Sistema de Referidos - PescaIA" />
        <meta property="og:description" content="Invita a tus amigos a PescaIA y gana días de suscripción PRO gratis. Sistema de referidos con recompensas exclusivas para pescadores." />
      </Helmet>

      <div className="pt-20 min-h-screen">
        {/* Header */}
        <section className="section-padding ocean-gradient wave-pattern">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-6"
            >
              <div className="flex justify-center">
                <div className="p-4 rounded-2xl tech-gradient pulse-glow">
                  <Users className="w-12 h-12 text-white" />
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white text-shadow">
                Sistema de <span className="gradient-text">Referidos</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                Invita a tus amigos pescadores y obtén días de suscripción PRO gratis. 
                ¡Mientras más compartas, más beneficios obtienes!
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Dashboard */}
        <section className="py-16 bg-gradient-to-r from-slate-900 to-slate-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="glass-effect rounded-2xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  {referralStats.totalReferrals}
                </div>
                <div className="text-gray-300">Amigos Referidos</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="glass-effect rounded-2xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {referralStats.proDaysEarned}
                </div>
                <div className="text-gray-300">Días PRO Ganados</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass-effect rounded-2xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  {referralStats.pendingRewards}
                </div>
                <div className="text-gray-300">Recompensas Pendientes</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Referral Generator */}
        <section className="section-padding bg-gradient-to-b from-slate-800 to-slate-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mx-auto"
            >
              <div className="glass-effect rounded-2xl p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                    Genera tu Link de Referido
                  </h2>
                  <p className="text-gray-300 text-base sm:text-lg">
                    Ingresa tu email para crear tu link único y comenzar a ganar recompensas
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm sm:text-base">
                      Tu Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      className="w-full px-3 sm:px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                    />
                  </div>

                  <Button
                    onClick={generateReferralLink}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3 rounded-xl hover-scale"
                  >
                    <Link2 className="w-5 h-5 mr-2" />
                    Generar Link de Referido
                  </Button>

                  {referralLink && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-white font-medium mb-2 text-sm sm:text-base">
                          Tu Link de Referido
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={referralLink}
                            readOnly
                            className="flex-1 px-3 sm:px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none text-sm sm:text-base"
                          />
                          <Button
                            onClick={copyToClipboard}
                            variant="outline"
                            className="px-3 sm:px-4 py-3 border-white/20 text-white hover:bg-white/10"
                          >
                            {copied ? (
                              <Check className="w-5 h-5" />
                            ) : (
                              <Copy className="w-5 h-5" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
        <section className="section-padding bg-gradient-to-b from-slate-900 to-slate-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 text-shadow">
                Beneficios <span className="gradient-text">Exclusivos</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto">
                Descubre todas las recompensas que puedes obtener al invitar a tus amigos
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-effect rounded-2xl p-6 text-center hover-scale group hover:bg-white/15 transition-all duration-300"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-xl tech-gradient group-hover:scale-110 transition-transform duration-300">
                      <benefit.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="section-padding ocean-gradient wave-pattern">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 text-shadow">
                ¿Cómo <span className="gradient-text">Funciona?</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-200 max-w-3xl mx-auto">
                Tres simples pasos para comenzar a ganar recompensas
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {howItWorks.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center space-y-4"
                >
                  <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-full tech-gradient flex items-center justify-center text-2xl font-bold text-white pulse-glow">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-200 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-gradient-to-r from-slate-900 to-slate-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-8"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-shadow">
                ¡Comienza a Ganar Hoy!
              </h2>
              <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
                No esperes más. Genera tu link de referido y comienza a disfrutar 
                de los beneficios PRO de PescaIA.
              </p>
              <Button
                onClick={() => document.querySelector('input[type="email"]')?.focus()}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-xl hover-scale"
              >
                <Gift className="w-5 h-5 mr-2" />
                Generar Mi Link Ahora
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Referrals;