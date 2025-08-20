import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Privacy from '@/pages/Privacy';
import Referrals from '@/pages/Referrals';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col scroll-smooth">
        <Helmet>
          <title>FishingAI - Analiza y mide tus capturas con inteligencia artificial</title>
          <meta name="description" content="FishingAI utiliza inteligencia artificial para analizar y medir tus capturas de pesca. Obtén captions automáticos y accede a funciones PRO exclusivas." />
          <meta property="og:title" content="FishingAI - Analiza y mide tus capturas con inteligencia artificial" />
          <meta property="og:description" content="FishingAI utiliza inteligencia artificial para analizar y medir tus capturas de pesca. Obtén captions automáticos y accede a funciones PRO exclusivas." />
          <meta property="og:type" content="website" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Helmet>
        
        <Header />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/referrals" element={<Referrals />} />
          </Routes>
        </main>
        
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;