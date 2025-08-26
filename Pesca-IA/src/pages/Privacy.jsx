import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Shield, Lock, Eye, Database, UserCheck, FileText } from 'lucide-react';

const Privacy = () => {
  const sections = [
    {
      icon: FileText,
      title: "Información que Recopilamos",
      content: [
        "Información de cuenta: nombre de usuario, dirección de correo electrónico y contraseña encriptada.",
        "Datos de uso: información sobre cómo utilizas la aplicación, incluyendo fotos subidas para análisis.",
        "Información del dispositivo: tipo de dispositivo, sistema operativo, identificadores únicos del dispositivo.",
        "Datos de ubicación: ubicación aproximada cuando compartes capturas (solo si otorgas permisos)."
      ]
    },
    {
      icon: Database,
      title: "Cómo Utilizamos tu Información",
      content: [
        "Proporcionar y mejorar nuestros servicios de análisis de peces mediante inteligencia artificial.",
        "Personalizar tu experiencia y mostrar contenido relevante.",
        "Comunicarnos contigo sobre actualizaciones, nuevas funciones y promociones.",
        "Mantener la seguridad y prevenir el uso fraudulento de la aplicación.",
        "Cumplir con obligaciones legales y resolver disputas."
      ]
    },
    {
      icon: Lock,
      title: "Protección de Datos",
      content: [
        "Utilizamos encriptación de extremo a extremo para proteger tus datos personales.",
        "Las fotos subidas se procesan de forma segura y se eliminan automáticamente después del análisis.",
        "Implementamos medidas de seguridad técnicas y organizativas apropiadas.",
        "El acceso a tus datos está limitado al personal autorizado que necesita esta información para proporcionar nuestros servicios."
      ]
    },
    {
      icon: Eye,
      title: "Compartir Información",
      content: [
        "No vendemos, alquilamos ni compartimos tu información personal con terceros para fines comerciales.",
        "Podemos compartir información agregada y anonimizada para fines de investigación y mejora del servicio.",
        "Compartimos datos solo cuando sea necesario para proporcionar nuestros servicios o cuando la ley lo requiera.",
        "Los proveedores de servicios terceros que utilizamos están sujetos a estrictos acuerdos de confidencialidad."
      ]
    },
    {
      icon: UserCheck,
      title: "Tus Derechos",
      content: [
        "Derecho de acceso: puedes solicitar una copia de los datos personales que tenemos sobre ti.",
        "Derecho de rectificación: puedes solicitar que corrijamos datos inexactos o incompletos.",
        "Derecho de eliminación: puedes solicitar que eliminemos tus datos personales.",
        "Derecho de portabilidad: puedes solicitar que transfiramos tus datos a otro servicio.",
        "Derecho de oposición: puedes oponerte al procesamiento de tus datos en ciertas circunstancias."
      ]
    },
    {
      icon: Shield,
      title: "Retención de Datos",
      content: [
        "Conservamos tu información personal solo durante el tiempo necesario para los fines descritos en esta política.",
        "Los datos de cuenta se conservan mientras mantengas una cuenta activa con nosotros.",
        "Las fotos subidas para análisis se eliminan automáticamente después de 24 horas.",
        "Los datos de uso se conservan durante un máximo de 2 años para fines de mejora del servicio.",
        "Puedes solicitar la eliminación de tus datos en cualquier momento contactándonos."
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Política de Privacidad - Pesca IA</title>
        <meta name="description" content="Conoce cómo Pesca IA protege tu privacidad y maneja tus datos personales. Política de privacidad completa y transparente." />
        <meta property="og:title" content="Política de Privacidad - Pesca IA" />
        <meta property="og:description" content="Conoce cómo Pesca IA protege tu privacidad y maneja tus datos personales. Política de privacidad completa y transparente." />
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
                  <Shield className="w-12 h-12 text-white" />
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white text-shadow">
                Política de <span className="gradient-text">Privacidad</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                En Pesca IA, tu privacidad es nuestra prioridad. Conoce cómo protegemos 
                y manejamos tu información personal de manera transparente y segura.
              </p>
              <div className="text-sm text-gray-300">
                Última actualización: Enero 2024
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding bg-gradient-to-b from-slate-900 to-slate-800">
          <div className="container mx-auto px-4">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-effect rounded-2xl p-8 mb-12"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Introducción</h2>
              <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
                Esta Política de Privacidad describe cómo Pesca IA ("nosotros", "nuestro" o "la aplicación") 
                recopila, utiliza y protege tu información cuando utilizas nuestra aplicación móvil. 
                Al utilizar Pesca IA, aceptas las prácticas descritas en esta política.
              </p>
            </motion.div>

            {/* Privacy Sections */}
            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-effect rounded-2xl p-8 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 rounded-xl tech-gradient">
                      <section.icon className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">{section.title}</h2>
                  </div>
                  <ul className="space-y-3 text-base sm:text-lg">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-gray-300 leading-relaxed flex items-start">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-effect rounded-2xl p-8 mt-12"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Contacto</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Si tienes preguntas sobre esta Política de Privacidad o sobre cómo manejamos tu información, 
                no dudes en contactarnos:
              </p>
              <div className="space-y-2 text-gray-300">
                <p><strong>Email:</strong> privacidad@Pesca IA.com</p>
                <p><strong>Dirección:</strong> Disponible bajo solicitud</p>
              </div>
            </motion.div>

            {/* Changes to Policy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-effect rounded-2xl p-8 mt-8"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Cambios a esta Política</h2>
              <p className="text-gray-300 leading-relaxed">
                Podemos actualizar esta Política de Privacidad ocasionalmente. Te notificaremos sobre 
                cambios significativos publicando la nueva política en esta página y actualizando la 
                fecha de "última actualización". Te recomendamos revisar esta política periódicamente 
                para mantenerte informado sobre cómo protegemos tu información.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Privacy;