import React from 'react';
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Calendar, Clock, MapPin, Users, Plus, ArrowRight, Award } from "lucide-react";
import { mockConferences } from "../data/mockConferences";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import heroConferenceImage from 'figma:asset/15405f25001c1bf97736f79b172332af19ac2fb9.png';
import newConferenceImage from 'figma:asset/f95527d788a22008fdb14ab8df8cd7d679436ef2.png';
import tozsdeforumLogo from 'figma:asset/a057787a3831ed1d53ac8b38ddc0957e507cd404.png';
import { useEffect, useRef, useState } from 'react';

interface ConferencesListPageProps {
  onSelectConference: (conferenceId: string) => void;
}

export function ConferencesListPage({ onSelectConference }: ConferencesListPageProps) {
  // Csak az első konferenciát jelenítjük meg egyelőre (Jövőbe tekintő)
  const displayedConference = mockConferences[0];
  
  // Refs a kártyákhoz
  const newCardRef = useRef<HTMLDivElement>(null);
  const oldCardRef = useRef<HTMLDivElement>(null);
  
  // State a kártyák scale értékeihez
  const [newCardScale, setNewCardScale] = useState(0.85);
  const [oldCardScale, setOldCardScale] = useState(0.85);
  
  // Hover state-ek
  const [isNewCardHovered, setIsNewCardHovered] = useState(false);
  const [isOldCardHovered, setIsOldCardHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Új kártya animáció
      if (newCardRef.current) {
        const rect = newCardRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const cardCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        
        // Távolság a viewport közepétől
        const distanceFromCenter = Math.abs(cardCenter - viewportCenter);
        const maxDistance = windowHeight / 2;
        
        // Minél közelebb van a középponthoz, annál nagyobb (1.0 = középen, 0.85 = távol)
        const progress = Math.max(0, 1 - (distanceFromCenter / maxDistance));
        const scale = 0.85 + (progress * 0.15); // 0.85-től 1.0-ig
        setNewCardScale(Math.min(1, Math.max(0.85, scale)));
      }
      
      // Régi kártya animáció
      if (oldCardRef.current) {
        const rect = oldCardRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const cardCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        
        // Távolság a viewport közepétől
        const distanceFromCenter = Math.abs(cardCenter - viewportCenter);
        const maxDistance = windowHeight / 2;
        
        // Minél közelebb van a középponthoz, annál nagyobb
        const progress = Math.max(0, 1 - (distanceFromCenter / maxDistance));
        const scale = 0.85 + (progress * 0.15);
        setOldCardScale(Math.min(1, Math.max(0.85, scale)));
      }
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Professional Hero Section - Main Conference Image */}
      <section className="relative text-white overflow-hidden bg-black">
        {/* Background Image - Full width, professional display */}
        <div 
          className="relative h-[280px] sm:h-[400px] lg:h-[700px] 2xl:h-[850px] 3xl:h-[1000px]"
          style={{
            backgroundImage: `url(${heroConferenceImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Professional gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70"></div>
        
          {/* Hero Content Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container mx-auto px-4 lg:px-6 xl:px-8 2xl:px-12 3xl:px-16">
              <div className="max-w-6xl 2xl:max-w-7xl mx-auto text-center space-y-4 sm:space-y-6 2xl:space-y-10">
                {/* Logo + KONFERENCIÁK */}
                <div className="relative w-full flex items-center justify-center" style={{textShadow: '2px 2px 12px rgba(0,0,0,0.9), 0px 0px 30px rgba(0,0,0,0.7)'}}>
                  {/* Függőleges vonal - abszolút középen */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-12 sm:h-16 lg:h-20 2xl:h-24 3xl:h-28 w-[1px] sm:w-[2px] bg-white/40 z-10"></div>
                  
                  {/* Tartalom a vonal körül - fix szélességgel */}
                  <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 2xl:gap-8">
                    {/* Tőzsdeforum logó - bal oldal, középre igazítva */}
                    <div className="flex items-center justify-center w-[130px] sm:w-[200px] lg:w-[280px] 2xl:w-[350px] 3xl:w-[420px]">
                      <img 
                        src={tozsdeforumLogo} 
                        alt="Tőzsdeforum" 
                        className="h-[52px] sm:h-[72px] lg:h-24 2xl:h-[120px] 3xl:h-36 w-auto object-contain drop-shadow-2xl"
                        style={{ filter: 'brightness(0) invert(1)' }}
                      />
                    </div>
                    
                    {/* Spacer a vonal számára */}
                    <div className="w-[1px] sm:w-[2px]"></div>
                    
                    {/* KONFERENCIÁK - jobb oldal, balra igazítva (padding-gel) */}
                    <div className="flex items-center justify-start w-[130px] sm:w-[200px] lg:w-[280px] 2xl:w-[350px] 3xl:w-[420px] pl-1 sm:pl-2 lg:pl-3 2xl:pl-4">
                      <div className="text-[15px] sm:text-2xl lg:text-4xl 2xl:text-5xl 3xl:text-6xl text-white tracking-wider whitespace-nowrap" style={{fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: '300', letterSpacing: '0.1em'}}>
                        KONFERENCIÁK
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conference Cards Section */}
      <section className="relative bg-black text-white py-16 lg:py-20 2xl:py-24">
        <div className="container mx-auto px-4 lg:px-6 xl:px-8 2xl:px-12 3xl:px-16">
          <div className="max-w-[1920px] mx-auto">

            {/* Új konferencia - Semleges fehér/kék színekkel */}
            <div 
              className="max-w-5xl 2xl:max-w-6xl mx-auto mb-12 2xl:mb-16 transition-transform duration-500 ease-out" 
              ref={newCardRef}
              style={{ transform: `scale(${isNewCardHovered ? 1.0 : newCardScale})` }}
            >
              {/* Lekerekített kép fehér glow effekttel */}
              <div 
                className="relative cursor-pointer group"
                onClick={() => onSelectConference('7')}
                onMouseEnter={() => setIsNewCardHovered(true)}
                onMouseLeave={() => setIsNewCardHovered(false)}
              >
                {/* Glow effect háttér - fehér/kék */}
                <div className="absolute -inset-1 bg-gradient-to-r from-white via-blue-100 to-white rounded-3xl blur-2xl opacity-20 group-hover:opacity-35 transition-opacity duration-500" style={{opacity: isNewCardHovered ? 0.35 : 0.20}}></div>
                
                {/* Kép konténer */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900">
                  {/* Státusz badge a képen belül - bal felső sarok */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="inline-flex items-center gap-2 bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs 2xl:text-sm border border-white/30 shadow-lg">
                      <Calendar className="w-3 h-3 2xl:w-4 2xl:h-4" />
                      2026. január 29.
                    </div>
                  </div>
                  
                  {/* Fekete háttér a transzparens képnek - a kép most élénkebb */}
                  <div className="relative bg-black">
                    <ImageWithFallback 
                      src={newConferenceImage} 
                      alt="Új konferencia"
                      className="w-full h-[280px] lg:h-[350px] 2xl:h-[450px] 3xl:h-[550px] object-contain opacity-90"
                    />
                  </div>
                  
                  {/* Finomabb gradient overlay - csak középen/alul sötét, hogy a szöveg olvasható legyen */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent"></div>
                  
                  {/* Középen lévő tartalom a képen */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                    <h2 className="text-3xl lg:text-4xl 2xl:text-5xl 3xl:text-6xl mb-3 text-white drop-shadow-2xl">
                      XI. Jövőbe Tekintő Konferencia
                    </h2>
                    <p className="text-base lg:text-lg 2xl:text-xl text-gray-200 mb-6 max-w-2xl 2xl:max-w-3xl drop-shadow-lg">
                      Vertikál Group és Blockchainbloom Hungary
                    </p>
                    
                    {/* CTA gombok */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button 
                        size="lg"
                        className="bg-white text-black hover:bg-gray-100 px-6 py-3 2xl:px-8 2xl:py-4 text-base 2xl:text-lg shadow-xl"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectConference('7');
                        }}
                      >
                        Regisztráció
                        <ArrowRight className="ml-2 w-4 h-4 2xl:w-5 2xl:h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Megtörtént konferencia - Modern kártya lekerekített képpel és glow effekttel */}
            <div 
              className="max-w-5xl 2xl:max-w-6xl mx-auto mb-12 2xl:mb-16 opacity-60 hover:opacity-75 transition-all duration-500 ease-out" 
              ref={oldCardRef}
              style={{ transform: `scale(${isOldCardHovered ? 1.0 : oldCardScale})` }}
            >
              {/* Lekerekített kép glow effekttel */}
              <div 
                className="relative cursor-pointer group"
                onClick={() => onSelectConference(displayedConference.id)}
                onMouseEnter={() => setIsOldCardHovered(true)}
                onMouseLeave={() => setIsOldCardHovered(false)}
              >
                {/* Glow effect háttér - halványabb */}
                <div className="absolute -inset-1 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" style={{opacity: isOldCardHovered ? 0.30 : 0.20}}></div>
                
                {/* Kép konténer */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  {/* Státusz badge a képen belül - bal felső sarok */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="inline-flex items-center gap-2 bg-gray-900/80 backdrop-blur-sm text-gray-300 px-3 py-1.5 rounded-full text-xs 2xl:text-sm border border-gray-600/30">
                      Megtörtént esemény - 2025. október 16.
                    </div>
                  </div>
                  
                  <ImageWithFallback 
                    src={displayedConference.imageUrl} 
                    alt={displayedConference.title}
                    className="w-full h-[280px] lg:h-[350px] 2xl:h-[450px] 3xl:h-[550px] object-cover grayscale-[50%]"
                  />
                  
                  {/* Gradient overlay a szöveghez */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  
                  {/* Középen lévő tartalom a képen */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                    <h2 className="text-3xl lg:text-4xl 2xl:text-5xl 3xl:text-6xl mb-3 text-gray-300 drop-shadow-2xl">
                      Jövőbetekintő konferencia
                    </h2>
                    <p className="text-base lg:text-lg 2xl:text-xl text-gray-400 mb-6 max-w-2xl 2xl:max-w-3xl drop-shadow-lg">
                      GeoAkku - Innováció és fenntarthatóság
                    </p>
                    
                    {/* CTA gombok */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button 
                        size="lg"
                        className="bg-gray-700 text-gray-300 hover:bg-gray-600 px-6 py-3 2xl:px-8 2xl:py-4 text-base 2xl:text-lg shadow-xl"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectConference(displayedConference.id);
                        }}
                      >
                        Esemény részletei
                        <ArrowRight className="ml-2 w-4 h-4 2xl:w-5 2xl:h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}