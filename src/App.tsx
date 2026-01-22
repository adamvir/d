import React, { useState, useEffect } from 'react';
import { GeometricHeader } from './components/GeometricHeader';
import { ConferencePage } from './components/ConferencePage';
import { GeneralConferencePage } from './components/GeneralConferencePage';
import { ConferencesListPage } from './components/ConferencesListPage';
import { NewsletterPage } from './components/NewsletterPage';
import { JovobeTekintoPage } from './components/JovobeTekintoPage';
import { VerticalPage } from './components/VerticalPage';
import { NewsHomePage } from './components/NewsHomePage';
import { AdminRegistrations } from './components/AdminRegistrations';
import { SubscribeModal } from './components/SubscribeModal';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';
import { projectId, publicAnonKey } from './utils/supabase/info';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedConferenceId, setSelectedConferenceId] = useState<string | null>(null);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [registrations, setRegistrations] = useState(0);
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage or system preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) {
        return saved === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Check if we're on admin page
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash === '#admin' || hash === '#/admin') {
        setCurrentPage('admin');
      }
    }
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSelectedConferenceId(null); // Reset conference selection when navigating
  };

  const handleSelectConference = (conferenceId: string) => {
    setSelectedConferenceId(conferenceId);
    setCurrentPage('conference-detail');
  };

  const handleThemeToggle = () => {
    setIsDark(!isDark);
  };

  const handleSubscribeOpen = () => {
    setIsSubscribeModalOpen(true);
  };

  const handleSubscribeClose = () => {
    setIsSubscribeModalOpen(false);
  };

  const fetchRegistrations = async () => {
    try {
      // "1" konferencia ID alapján lekérdezzük a regisztrációkat (Jövőbe tekintő konferencia)
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-4ed24ea8/conference/1/registrations`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      
      const data = await response.json();
      if (data.success) {
        setRegistrations(data.count);
      }
    } catch (error) {
      console.error('Hiba a regisztrációk lekérdezésekor:', error);
      // Ha hiba van, megtartjuk a jelenlegi értéket
    }
  };

  const handleRegistration = () => {
    // Regisztráció után frissítjük a számot
    fetchRegistrations();
  };

  // Apply theme to document and save to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
  }, [isDark]);

  // Regisztrációk betöltése az alkalmazás indulásakor
  useEffect(() => {
    fetchRegistrations();
  }, []);

  // Google Analytics betöltése és konfiguráció
  useEffect(() => {
    // Google Analytics script dinamikus betöltése
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-F38BC5D2W8';
    document.head.appendChild(script);

    // Google Analytics inicializálása a script betöltése után
    script.onload = () => {
      // DataLayer inicializálása
      (window as any).dataLayer = (window as any).dataLayer || [];
      
      // gtag funkció definiálása
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(arguments);
      }
      
      // Google Analytics konfiguráció
      gtag('js', new Date());
      gtag('config', 'G-F38BC5D2W8');
      
      // Global gtag funkció beállítása további használathoz
      (window as any).gtag = gtag;
      
      console.log('✅ Google Analytics inicializálva: G-F38BC5D2W8');
    };

    // Cleanup funkció komponens unmount esetén
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const renderContent = () => {
    if (currentPage === "admin") {
      return <AdminRegistrations />;
    }
    
    if (currentPage === "konferenciak") {
      return <ConferencesListPage onSelectConference={handleSelectConference} />;
    }
    
    if (currentPage === "conference-detail" && selectedConferenceId) {
      // "Jövőbe tekintő" konferenciához (id: "1") használjuk az új JovobeTekintoPage-t
      if (selectedConferenceId === "1") {
        return <JovobeTekintoPage />;
      }
      // "Vertical Group" konferenciához (id: "7") használjuk az új VerticalPage-t
      if (selectedConferenceId === "7") {
        return <VerticalPage />;
      }
      // Minden más konferenciához használjuk az általános GeneralConferencePage-t
      return <GeneralConferencePage conferenceId={selectedConferenceId} registrations={registrations} onRegister={handleRegistration} />;
    }
    
    if (currentPage === "hirlevel") {
      return <NewsletterPage />;
    }
    
    if (currentPage === "jovobe-tekinto") {
      return <JovobeTekintoPage />;
    }
    
    if (currentPage === "vertical-page" || currentPage === "vertical") {
      return <VerticalPage />;
    }
    
    if (currentPage === "home") {
      return <NewsHomePage />;
    }
    
    // Default to conferences list
    return <ConferencesListPage onSelectConference={handleSelectConference} />;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {currentPage !== "admin" && currentPage !== "home" && (
        <GeometricHeader 
          currentPage={currentPage} 
          onNavigate={handleNavigate}
          isDark={isDark}
          onThemeToggle={handleThemeToggle}
          onSubscribeOpen={handleSubscribeOpen}
        />
      )}
      
      <main className="flex-1">
        {renderContent()}
      </main>
      
      {currentPage !== "admin" && currentPage !== "home" && <Footer />}
      
      <SubscribeModal 
        isOpen={isSubscribeModalOpen}
        onClose={handleSubscribeClose}
      />
      
      <Toaster position="top-right" />
    </div>
  );
}