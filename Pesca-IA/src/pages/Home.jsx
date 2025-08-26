import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Fish, Camera, Zap, Crown, Smartphone, Download, Star, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import WaitlistForm from '@/components/WaitlistForm';
import { useAuth } from '@/hooks/useAuth';

import header from "../assets/1.png"

const Home = () => {
  const [spotsAvailable, setSpotsAvailable] = React.useState(87);
  const { getStats } = useAuth();
  const [showDownloadModal, setShowDownloadModal] = React.useState(false);
  
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
    { icon: Users, value: '10', label: 'Pescadores Activos' },
    { icon: Camera, value: '100', label: 'Fotos Analizadas' },
    { icon: TrendingUp, value: '95%', label: 'Precisión IA' },
    { icon: Star, value: '??', label: 'Calificación App' }
  ];

  // Cargar estadísticas de la lista de espera
  React.useEffect(() => {
    const loadStats = async () => {
      try {
        const stats = await getStats();
        setSpotsAvailable(stats.available);
      } catch (error) {
        console.error('Error al cargar estadísticas:', error);
      }
    };

    loadStats();
  }, [getStats]);

  const handleDownload = (platform) => {
    if (platform === 'android') {
      setShowDownloadModal(true);
      return;
    }
    if (platform === 'waitlist') {
      if (spotsAvailable > 0) {
        setSpotsAvailable(prev => prev - 1);
        toast({
          title: "🎉 ¡Te has unido a la lista de espera!",
          description: `¡Felicidades! Eres el spot #${100 - spotsAvailable + 1}. Pronto recibirás un email con tu acceso exclusivo a PescaIA.`,
        });
      } else {
        toast({
          title: "😔 Lista de espera completa",
          description: "Todos los spots gratuitos han sido ocupados. ¡Pero no te preocupes! Pronto estará disponible para todos.",
        });
      }
    } else {
      toast({
        title: "🚧 Descarga no disponible",
        description: "¡La app estará disponible pronto! Mientras tanto, puedes unirte a nuestro sistema de referidos para obtener acceso anticipado.",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Pesca IA - Analiza y mide tus capturas con inteligencia artificial</title>
        <meta name="description" content="Descubre Pesca IA, la app que utiliza IA para analizar fotos de peces, generar captions automáticos y ofrecer funciones PRO para pescadores." />
        <meta property="og:title" content="Pesca IA - Analiza y mide tus capturas con inteligencia artificial" />
        <meta property="og:description" content="Descubre Pesca IA, la app que utiliza IA para analizar fotos de peces, generar captions automáticos y ofrecer funciones PRO para pescadores." />
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
                    className="text-3xl sm:text-4xl md:text-6xl font-bold text-white text-shadow leading-tight"
                  >
                    Analiza y mide tus capturas con{' '}
                    <span className="gradient-text">inteligencia artificial</span>
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed"
                  >
                    Pesca IA revoluciona tu experiencia de pesca con tecnología de vanguardia. 
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
                    className="bg-white text-black px-6 py-4 sm:px-8 sm:py-5 text-base sm:text-lg rounded-xl hover:bg-gray-100 border border-gray-200 hover-scale"
                  >
                    <Smartphone className="w-5 h-5 mr-2" />
                    Descargar para Android
                  </Button>
                  {/* <Button
                    onClick={() => handleDownload('ios')}
                    variant="outline"
                    className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl hover-scale"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Descargar para iOS
                  </Button> */}
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
                    className="w-full max-w-md sm:max-w-lg mx-auto rounded-2xl shadow-2xl glass-effect p-3 sm:p-4" 
                    alt="Pesca IA app interface showing fish analysis"
                   src={header} />
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

        {/* Waitlist Section */}
        <section className="section-padding ocean-gradient relative overflow-hidden">
          <div className="absolute inset-0 wave-pattern opacity-30"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass-effect rounded-3xl p-12 max-w-4xl mx-auto border border-white/20 shadow-2xl"
              >
                <div className="space-y-6">
                  {/* Badge de exclusividad */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-sm"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    EXCLUSIVO
                  </motion.div>
                  
                  {/* Título principal */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-3xl sm:text-4xl md:text-6xl font-bold text-white text-shadow leading-tight"
                  >
                    ¡Sé de los primeros en probar{' '}
                    <span className="gradient-text">Pesca IA gratis</span>{' '}
                    por 2 meses!
                  </motion.h2>
                  
                  {/* Subtítulo */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-base sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed"
                  >
                    Exclusivo para las primeras{' '}
                    <span className="text-yellow-400 font-bold">100 personas</span>{' '}
                    que se sumen a nuestra lista de espera
                  </motion.p>
                  
                  {/* Contador de spots disponibles */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="bg-white/10 rounded-2xl p-6 border border-white/20"
                  >
                    <p className="text-gray-300 text-lg mb-2">Spots disponibles:</p>
                    <div className="text-4xl font-bold text-yellow-400">{spotsAvailable}/100</div>
                    <div className="w-full bg-gray-700 rounded-full h-3 mt-3">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full" style={{ width: `${spotsAvailable}%` }}></div>
                    </div>
                  </motion.div>
                  
                  {/* Formulario de Waitlist */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <WaitlistForm
                      spotsAvailable={spotsAvailable}
                      onSpotTaken={() => setSpotsAvailable(prev => Math.max(0, prev - 1))}
                      onSuccess={() => {
                        // Aquí puedes añadir lógica adicional después del éxito
                        console.log('Usuario se unió exitosamente a la lista de espera');
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
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
                Descubre todas las herramientas que Pesca IA pone a tu disposición 
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
      {/* Modal Descarga Android minimalista */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowDownloadModal(false)}></div>
          <div className="relative z-10 w-11/12 max-w-md mx-auto rounded-2xl bg-white text-black p-6 sm:p-8 shadow-2xl">
            <div className="space-y-4 text-center">
              <h3 className="text-xl sm:text-2xl font-semibold">La app oficialmente saldrá en Septiembre</h3>
              <p className="text-sm sm:text-base text-gray-700">Súmate a la lista de espera para recibir <strong>2 meses gratis</strong>.</p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a href="#waitlist" onClick={() => setShowDownloadModal(false)} className="w-full inline-flex items-center justify-center rounded-xl bg-black text-white px-4 py-3 text-sm sm:text-base hover:bg-gray-900">Quiero mi acceso gratis</a>
                <button onClick={() => setShowDownloadModal(false)} className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm sm:text-base hover:bg-gray-50">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default Home;