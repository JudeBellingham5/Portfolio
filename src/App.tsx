import { useState, useEffect } from 'react';
import { doc, getDocFromServer } from 'firebase/firestore';
import { db } from './firebase';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Profile from './components/Profile';
import Competencies from './components/Competencies';
import Projects from './components/Projects';
import Trust from './components/Trust';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

import { PortfolioProvider } from './context/PortfolioContext';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    async function testConnection() {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if(error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration. ");
        }
      }
    }
    testConnection();
  }, []);

  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-slate-50">
        <Navbar onAdminClick={() => setIsAdminOpen(true)} />
        
        <main>
          <Hero />
          <Profile />
          <Competencies />
          <Projects />
          <Trust />
          <Contact />
        </main>

        <Footer />

        <AdminPanel 
          isOpen={isAdminOpen} 
          onClose={() => setIsAdminOpen(false)} 
        />
      </div>
    </PortfolioProvider>
  );
}


