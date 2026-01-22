import React, { useState, useEffect } from 'react';
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { AnimatedCounter } from './AnimatedCounter';
import { RegistrationCounter } from './RegistrationCounter';
import { ConferenceRegistrationModal } from './ConferenceRegistrationModal';

import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  ArrowRight,
  Award,
  Zap,
  Building
} from "lucide-react";
import { mockConferences, Conference, getConferenceById } from "../data/mockConferences";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface GeneralConferencePageProps {
  conferenceId: string;
  registrations: number;
  onRegister: () => void;
}

export function GeneralConferencePage({ conferenceId, registrations, onRegister }: GeneralConferencePageProps) {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [currentRegistrations, setCurrentRegistrations] = useState<Record<string, number>>({});
  
  // Kiválasztott konferencia lekérése
  const conference = getConferenceById(conferenceId);
  
  // Ha nem találjuk a konferenciát
  if (!conference) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl mb-4">Konferencia nem található</h1>
          <p className="text-gray-400">A keresett konferencia nem létezik.</p>
        </div>
      </div>
    );
  }
  
  // Regisztrációk lekérdezése
  const fetchRegistrations = async () => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-4ed24ea8/conference/${conference.id}/registrations`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      
      const data = await response.json();
      if (data.success) {
        setCurrentRegistrations(prev => ({ ...prev, [conference.id]: data.count }));
      }
    } catch (error) {
      console.error(`Hiba a ${conference.id} konferencia regisztrációinak lekérdezésekor:`, error);
      setCurrentRegistrations(prev => ({ ...prev, [conference.id]: 0 }));
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, [registrations]);

  const handleRegister = () => {
    const currentCount = currentRegistrations[conference.id] || 0;
    if (currentCount >= conference.capacity) {
      alert(`A konferencia elérte a maximális résztvevői létszámot (${conference.capacity} fő).`);
      return;
    }
    
    setShowRegistrationModal(true);
  };

  const handleRegistrationSuccess = () => {
    onRegister();
    fetchRegistrations();
  };

  const currentCount = currentRegistrations[conference.id] || 0;
  const isFullyBooked = currentCount >= conference.capacity;

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        {/* Background Image */}
        <div className="relative">
          <div className="absolute inset-0 bg-black"></div>
          <ImageWithFallback 
            src={conference.imageUrl} 
            alt={conference.title}
            className="w-full h-[500px] lg:h-[600px] 2xl:h-[800px] 3xl:h-[1000px] object-contain opacity-90"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        </div>
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 lg:px-6 xl:px-8 2xl:px-12 3xl:px-16">
            <div className="max-w-6xl 2xl:max-w-7xl mx-auto text-center space-y-8 2xl:space-y-12">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 2xl:px-6 2xl:py-3 text-sm 2xl:text-base border border-white/20">
                <Award className="w-4 h-4 2xl:w-5 2xl:h-5" />
                {conference.category}
              </div>
              <h1 className="text-4xl lg:text-6xl 2xl:text-7xl 3xl:text-8xl leading-tight text-white drop-shadow-2xl">
                {conference.title}
              </h1>
              <p className="text-xl lg:text-2xl 2xl:text-3xl 3xl:text-4xl text-gray-200 max-w-2xl 2xl:max-w-4xl mx-auto drop-shadow-lg">
                {conference.subtitle}
              </p>
              <Button 
                size="lg" 
                className="mt-8 bg-white text-black hover:bg-gray-100 px-8 py-3 2xl:px-12 2xl:py-5 text-base 2xl:text-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                onClick={() => document.getElementById('conference-details')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Részletek
                <ArrowRight className="ml-2 w-4 h-4 2xl:w-5 2xl:h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Conference Details */}
      <section id="conference-details" className="py-16 2xl:py-24 bg-black">
        <div className="container mx-auto px-4 lg:px-6 xl:px-8 2xl:px-12 3xl:px-16">
          <div className="max-w-6xl 2xl:max-w-7xl mx-auto">
            <Card className="overflow-hidden bg-gray-900 border-gray-800">
              <div className="p-6 lg:p-8 2xl:p-12 space-y-8 2xl:space-y-12">
                {/* Basic Info */}
                <div>
                  <h2 className="text-2xl lg:text-3xl 2xl:text-4xl mb-6 2xl:mb-8 text-white">{conference.title}</h2>
                  <p className="text-gray-300 text-base 2xl:text-lg mb-6 2xl:mb-8">{conference.description}</p>
                  
                  {isFullyBooked && (
                    <div className="mb-4 inline-flex items-center gap-2 bg-red-900/30 text-red-300 px-3 py-1 2xl:px-4 2xl:py-2 rounded-full text-sm 2xl:text-base">
                      <Users className="w-4 h-4 2xl:w-5 2xl:h-5" />
                      Betelt - Regisztráció lezárva
                    </div>
                  )}
                </div>

                {/* Event Details */}
                <div className="grid md:grid-cols-2 2xl:grid-cols-2 gap-4 2xl:gap-6">
                  <div className="flex items-center gap-3 2xl:gap-4">
                    <Calendar className="w-5 h-5 2xl:w-6 2xl:h-6 text-gray-400" />
                    <div>
                      <p className="text-xs 2xl:text-sm text-gray-500">Dátum</p>
                      <p className="text-white text-sm 2xl:text-base">{conference.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 2xl:gap-4">
                    <Clock className="w-5 h-5 2xl:w-6 2xl:h-6 text-gray-400" />
                    <div>
                      <p className="text-xs 2xl:text-sm text-gray-500">Időpont</p>
                      <p className="text-white text-sm 2xl:text-base">{conference.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 2xl:gap-4">
                    <MapPin className="w-5 h-5 2xl:w-6 2xl:h-6 text-gray-400" />
                    <div>
                      <p className="text-xs 2xl:text-sm text-gray-500">Helyszín</p>
                      <p className="text-white text-sm 2xl:text-base">{conference.venue}, {conference.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 2xl:gap-4">
                    <Users className="w-5 h-5 2xl:w-6 2xl:h-6 text-gray-400" />
                    <div>
                      <p className="text-xs 2xl:text-sm text-gray-500">Kapacitás</p>
                      <p className="text-white text-sm 2xl:text-base">{currentCount} / {conference.capacity} fő</p>
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="pt-6 2xl:pt-8 border-t border-gray-800">
                  <div className="grid grid-cols-3 gap-4 2xl:gap-8 text-center">
                    <div className="space-y-1 2xl:space-y-2">
                      <AnimatedCounter 
                        end={conference.speakers.length} 
                        className="text-2xl 2xl:text-4xl text-white font-bold" 
                        duration={1500}
                      />
                      <p className="text-xs 2xl:text-sm text-gray-400">Előadók</p>
                    </div>
                    <div className="space-y-1 2xl:space-y-2">
                      <AnimatedCounter 
                        end={conference.agenda.length} 
                        className="text-2xl 2xl:text-4xl text-white font-bold" 
                        duration={1500}
                      />
                      <p className="text-xs 2xl:text-sm text-gray-400">Program pontok</p>
                    </div>
                    <div className="space-y-1 2xl:space-y-2">
                      <AnimatedCounter 
                        end={conference.capacity} 
                        className="text-2xl 2xl:text-4xl text-white font-bold" 
                        duration={1500}
                      />
                      <p className="text-xs 2xl:text-sm text-gray-400">Max résztvevő</p>
                    </div>
                  </div>
                </div>

                {/* Speakers */}
                {conference.speakers.length > 0 && (
                  <div className="space-y-4 2xl:space-y-6">
                    <h3 className="text-xl 2xl:text-2xl font-medium flex items-center gap-2 text-white">
                      <Building className="w-5 h-5 2xl:w-6 2xl:h-6 text-gray-400" />
                      Előadók és cégek
                    </h3>
                    <div className="flex flex-wrap gap-3 2xl:gap-4">
                      {conference.speakers.map((speaker) => (
                        <div 
                          key={speaker.id} 
                          className="flex items-center gap-2 2xl:gap-3 bg-gray-800 rounded-lg px-3 py-2 2xl:px-4 2xl:py-3 shadow-sm border border-gray-700"
                        >
                          <Avatar className="w-8 h-8 2xl:w-10 2xl:h-10">
                            <AvatarImage src={speaker.imageUrl} alt={speaker.company} />
                            <AvatarFallback className="bg-gray-700 text-white">{speaker.company.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm 2xl:text-base font-medium text-white">{speaker.name}</p>
                            <p className="text-xs 2xl:text-sm text-gray-400">{speaker.company}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Agenda */}
                <div className="space-y-4 2xl:space-y-6">
                  <h3 className="text-xl 2xl:text-2xl font-medium flex items-center gap-2 text-white">
                    <Clock className="w-5 h-5 2xl:w-6 2xl:h-6 text-gray-400" />
                    Részletes program
                  </h3>
                  <div className="space-y-3 2xl:space-y-4">
                    {conference.agenda.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 2xl:gap-4 p-3 2xl:p-4 bg-gray-800 rounded-lg border border-gray-700">
                        <div className="flex items-center justify-center w-6 h-6 2xl:w-8 2xl:h-8 bg-white text-black rounded-full text-xs 2xl:text-sm font-medium">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm 2xl:text-base text-white">{item}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-4 2xl:space-y-6">
                  <h3 className="text-xl 2xl:text-2xl font-medium flex items-center gap-2 text-white">
                    <Zap className="w-5 h-5 2xl:w-6 2xl:h-6 text-gray-400" />
                    Kiemelt pontok
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3 2xl:gap-4">
                    {conference.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2 2xl:gap-3 text-gray-300">
                        <div className="w-2 h-2 2xl:w-3 2xl:h-3 bg-white rounded-full"></div>
                        <span className="text-sm 2xl:text-base">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex justify-center pt-6 2xl:pt-8">
                  <Button 
                    size="lg" 
                    className={`${
                      isFullyBooked 
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                        : 'bg-white text-black hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300'
                    } px-12 py-4 2xl:px-16 2xl:py-6 text-lg 2xl:text-xl font-medium`}
                    onClick={handleRegister}
                    disabled={isFullyBooked}
                  >
                    {isFullyBooked ? 'Regisztráció lezárva - Betelt' : `Regisztrálok most - ${conference.price}`}
                    {!isFullyBooked && <ArrowRight className="ml-2 w-5 h-5 2xl:w-6 2xl:h-6" />}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      <ConferenceRegistrationModal
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        conferenceId={conference.id}
        conferenceName={conference.title}
        onSuccess={handleRegistrationSuccess}
      />
    </div>
  );
}