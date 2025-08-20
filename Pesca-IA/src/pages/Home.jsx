import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Fish, Camera, Zap, Crown, Smartphone, Download, Star, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Home = () => {
  const features = [
    {
      icon: Camera,
      title: 'Análisis de Fotos',
      description: 'Sube una foto de tu captura y obtén información detallada sobre la especie y medidas.'
    },
    {
      icon: Zap,
      title: 'Captions Automáticos',
      description: 'Genera descripciones automáticas perfectas para tus redes sociales.'
    },
    {
      icon: Crown,
      title: 'Versión PRO',
      description: 'Accede a funciones avanzadas, análisis detallados y estadísticas completas.'
    }
  ];

  const stats = [
    { icon: Users, value: '50K+', label: 'Pescadores Activos' },
    { icon: Camera, value: '1M+', label: 'Fotos Analizadas' },
    { icon: TrendingUp, value: '95%', label: 'Precisión IA' },
    { icon: Star, value: '4.8', label: 'Calificación App' }
  ];

  const handleDownload = (platform) => {
    toast({
      title: "🚧 Descarga no disponible",
      description: "¡La app estará disponible pronto! Mientras tanto, puedes unirte a nuestro sistema de referidos para obtener acceso anticipado.",
    });
  };

  return (
    <>
      <Helmet>
        <title>FishingAI - Analiza y mide tus capturas con inteligencia artificial</title>
        <meta name="description" content="Descubre FishingAI, la app que utiliza IA para analizar fotos de peces, generar captions automáticos y ofrecer funciones PRO para pescadores." />
        <meta property="og:title" content="FishingAI - Analiza y mide tus capturas con inteligencia artificial" />
        <meta property="og:description" content="Descubre FishingAI, la app que utiliza IA para analizar fotos de peces, generar captions automáticos y ofrecer funciones PRO para pescadores." />
      </Helmet>

      <div className="pt-20">
        {/* Hero Section */}
        <section className="section-padding ocean-gradient wave-pattern relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-cyan-900/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl md:text-6xl font-bold text-white text-shadow leading-tight"
                  >
                    Analiza y mide tus capturas con{' '}
                    <span className="gradient-text">inteligencia artificial</span>
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl text-gray-200 leading-relaxed"
                  >
                    FishingAI revoluciona tu experiencia de pesca con tecnología de vanguardia. 
                    Identifica especies, mide tus capturas y comparte momentos únicos.
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Button
                    onClick={() => handleDownload('android')}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-6 text-lg rounded-xl hover-scale pulse-glow"
                  >
                    <Smartphone className="w-5 h-5 mr-2" />
                    Descargar para Android
                  </Button>
                  <Button
                    onClick={() => handleDownload('ios')}
                    variant="outline"
                    className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl hover-scale"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Descargar para iOS
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <div className="floating-animation">
                  <img  
                    className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl glass-effect p-4" 
                    alt="FishingAI app interface showing fish analysis"
                   src="https://images.unsplash.com/photo-1691238969077-c0b0d392faf8" />
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-cyan-400/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-400/20 rounded-full blur-xl"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-slate-900 to-slate-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center space-y-2"
                >
                  <div className="flex justify-center">
                    <div className="p-3 rounded-xl tech-gradient">
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-padding bg-gradient-to-b from-slate-800 to-slate-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-shadow">
                Funciones <span className="gradient-text">Principales</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Descubre todas las herramientas que FishingAI pone a tu disposición 
                para mejorar tu experiencia de pesca.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="glass-effect rounded-2xl p-8 hover-scale group hover:bg-white/15 transition-all duration-300"
                >
                  <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-2xl tech-gradient group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-center leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding ocean-gradient relative overflow-hidden">
          <div className="absolute inset-0 wave-pattern opacity-30"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white text-shadow">
                ¿Listo para revolucionar tu pesca?
              </h2>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                Únete a miles de pescadores que ya utilizan FishingAI para mejorar 
                sus capturas y compartir sus mejores momentos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => handleDownload('android')}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-6 text-lg rounded-xl hover-scale pulse-glow"
                >
                  <Fish className="w-5 h-5 mr-2" />
                  Comenzar Ahora
                </Button>
                <Button
                  onClick={() => window.location.href = '/referrals'}
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl hover-scale"
                >
                  <Crown className="w-5 h-5 mr-2" />
                  Sistema de Referidos
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;