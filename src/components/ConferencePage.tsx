import React, { useState, useEffect } from 'react';
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { AnimatedCounter } from './AnimatedCounter';
import { RegistrationCounter } from './RegistrationCounter';
import { ConferenceRegistrationModal } from './ConferenceRegistrationModal';

import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Star,
  CheckCircle,
  ArrowRight,
  Award,
  Zap,
  Building,
  Gift
} from "lucide-react";
import { mockConferences, Conference } from "../data/mockConferences";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { EmailDebugComponent } from "./EmailDebugComponent";
import { projectId, publicAnonKey } from '../utils/supabase/info';
import heroImage from 'figma:asset/15405f25001c1bf97736f79b172332af19ac2fb9.png';

interface ConferencePageProps {
  conferenceId: string;
  registrations: number;
  onRegister: () => void;
}

export function ConferencePage({ conferenceId, registrations, onRegister }: ConferencePageProps) {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [currentConferenceId, setCurrentConferenceId] = useState<string>('');
  const [currentRegistrations, setCurrentRegistrations] = useState<Record<string, number>>({});
  
  // Kiválasztott konferencia lekérése
  const selectedConference = mockConferences.find(conf => conf.id === conferenceId);
  
  // Ha nem találjuk a konferenciát, visszairányítjuk a listázó oldalra
  if (!selectedConference) {
    return <div>Konferencia nem található</div>;
  }
  
  // Segédfüggvény a cég URL-jének meghatározásához
  const getCompanyUrl = (companyName: string) => {
    if (companyName.includes('Épduferr')) {
      return 'https://www.epduferr.hu/';
    } else if (companyName.includes('Tozsdeforum')) {
      return 'https://www.tozsdeforum.hu/';
    } else if (companyName.includes('Blockchainbloom')) {
      return 'https://www.blockchainbloom.com/pinke-attila/';
    }
    return null;
  };
  
  // Regisztrációk lekérdezése minden konferenciához
  const fetchRegistrations = async () => {
    const counts: Record<string, number> = {};
    
    for (const conference of mockConferences) {
      try {
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-4ed24ea8/conference/${conference.id}/registrations`, {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        });
        
        const data = await response.json();
        if (data.success) {
          counts[conference.id] = data.count;
        }
      } catch (error) {
        console.error(`Hiba a ${conference.id} konferencia regisztrációinak lekérdezésekor:`, error);
        counts[conference.id] = 0;
      }
    }
    
    setCurrentRegistrations(counts);
  };

  // Komponens betöltésekor és regisztráció után frissítjük a számokat
  useEffect(() => {
    fetchRegistrations();
  }, [registrations]);

  const handleRegister = (conferenceId: string) => {
    // Ellenőrizzük a regisztrációs limitet
    const currentCount = currentRegistrations[conferenceId] || 0;
    if (currentCount >= 150) {
      alert('A konferencia elérte a maximális résztvevői létszámot (150 fő).');
      return;
    }
    
    setCurrentConferenceId(conferenceId);
    setShowRegistrationModal(true);
  };

  const handleRegistrationSuccess = () => {
    onRegister();
    fetchRegistrations(); // Frissítjük a számokat azonnal
  };

  const upcomingConference = mockConferences[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Professional Conference Image */}
      <section className="relative text-white overflow-hidden bg-black">
        {/* Background Image - Full width, professional display */}
        <div className="relative">
          <div className="absolute inset-0 bg-black"></div>
          <img 
            src={heroImage}
            alt="Tőzsdeforum X. Jövőbe Tekintő Konferencia"
            className="w-full h-[500px] lg:h-[650px] 2xl:h-[800px] 3xl:h-[900px] object-cover object-center"
          />
          {/* Professional gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80"></div>
        </div>
        
        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex items-end lg:items-center justify-center">
          <div className="container mx-auto px-4 lg:px-6 xl:px-8 2xl:px-12 3xl:px-16 pb-12 lg:pb-0">
            <div className="max-w-6xl 2xl:max-w-7xl mx-auto text-center space-y-6 2xl:space-y-8">
              {/* Event Badge */}
              <div className="inline-flex items-center gap-2 bg-emerald-600/30 backdrop-blur-md rounded-full px-5 py-2.5 2xl:px-6 2xl:py-3 text-sm 2xl:text-base text-white border border-emerald-400/50 shadow-lg">
                <Award className="w-4 h-4 2xl:w-5 2xl:h-5 text-emerald-300" />
                <span className="font-medium">X. Jövőbe Tekintő Konferencia</span>
              </div>
              
              {/* Main Title */}
              <h1 className="text-4xl lg:text-6xl 2xl:text-7xl 3xl:text-8xl leading-tight text-white drop-shadow-2xl">
                <span className="block mb-2" style={{textShadow: '2px 2px 12px rgba(0,0,0,0.9), 0px 0px 30px rgba(0,0,0,0.7)'}}>
                  Tőzsdeforum Konferencia
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl lg:text-2xl 2xl:text-3xl 3xl:text-4xl text-emerald-100 max-w-3xl 2xl:max-w-4xl mx-auto font-light" style={{textShadow: '1px 1px 8px rgba(0,0,0,0.9), 0px 0px 20px rgba(0,0,0,0.7)'}}>
                GeoAkku Innováció & Sikeres Kriptóbefektetés
              </p>
              
              {/* CTA Button */}
              <div className="pt-4 2xl:pt-6">
                <Button 
                  size="lg" 
                  className="bg-emerald-600 text-white hover:bg-emerald-500 px-10 py-4 2xl:px-14 2xl:py-6 text-base 2xl:text-xl shadow-2xl hover:shadow-emerald-500/50 transform hover:scale-105 transition-all duration-300 border border-emerald-400/30"
                  onClick={() => document.getElementById('conference-details')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span>Részletek és Regisztráció</span>
                  <ArrowRight className="ml-2 w-5 h-5 2xl:w-6 2xl:h-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section id="featured-event" className="py-16 2xl:py-20">
        <div className="container mx-auto px-4 lg:px-6 xl:px-8 2xl:px-12 3xl:px-16">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-emerald-200 text-emerald-700 dark:border-emerald-700 dark:text-emerald-300">Kiemelt esemény</Badge>
            <h2 className="text-3xl lg:text-4xl mb-4 text-foreground">GeoAkku bemutatása & Energetika és a sikeres kriptobefektetés titka</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Kattintson az eseményre a részletes információkért
            </p>
          </div>
          
          <div className="space-y-6 max-w-4xl mx-auto">
            {mockConferences.filter(conference => conference.title === "Jövőbe tekintő").map((conference) => {
              const currentCount = currentRegistrations[conference.id] || 0;
              const isFullyBooked = currentCount >= 150;
              
              return (
                <Card key={conference.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-emerald-100 dark:border-emerald-800">
                  <div className="lg:flex">
                    <div className="lg:w-1/2">
                      <ImageWithFallback 
                        src={conference.imageUrl} 
                        alt={conference.title}
                        className="w-full h-48 lg:h-full object-cover"
                      />
                    </div>
                    <div className="lg:w-1/2 p-6 lg:p-8 space-y-4">
                      <div>
                        <h3 className="text-xl lg:text-2xl mb-2 text-emerald-900 dark:text-emerald-100">Jövőbe tekintő konferencia</h3>
                        
                        {isFullyBooked && (
                          <div className="mt-2 inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-1 rounded-full text-sm">
                            <Users className="w-4 h-4" />
                            Betelt - Regisztráció lezárva
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-sm">
                          <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-foreground">{conference.date}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-foreground">{conference.time}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-foreground">
                            <a 
                              href="https://www.google.com/maps/place/Kimpton+BEM+Budapest/@47.5121956,19.035791,1089m/data=!3m1!1e3!4m20!1m10!3m9!1s0x4741dd9602c5773b:0x466074bff9930099!2sKimpton+BEM+Budapest!5m2!4m1!1i2!8m2!3d47.5120631!4d19.0379298!16s%2Fg%2F11vw_99ybn!3m8!1s0x4741dd9602c5773b:0x466074bff9930099!5m2!4m1!1i2!8m2!3d47.5120631!4d19.0379298!16s%2Fg%2F11vw_99ybn?entry=ttu&g_ep=EgoyMDI1MDkxNS4wIKXMDSoASAFQAw%3D%3D"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors underline hover:no-underline"
                            >
                              {conference.venue}, {conference.location}
                            </a>
                          </span>
                        </div>
                        <RegistrationCounter conferenceId="1" />
                      </div>

                      {/* Előadók és cégek - mindig látható */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium flex items-center gap-2 text-foreground">
                          <Building className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          Előadók és cégek
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {conference.speakers.map((speaker) => {
                            const companyUrl = getCompanyUrl(speaker.company);
                            
                            if (companyUrl) {
                              return (
                                <a 
                                  key={speaker.id}
                                  href={companyUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg px-2 py-1 text-xs hover:bg-emerald-100 dark:hover:bg-emerald-800/50 transition-colors border border-emerald-200 dark:border-emerald-700"
                                >
                                  <Avatar className="w-5 h-5">
                                    <AvatarImage src={speaker.imageUrl} alt={speaker.company} />
                                    <AvatarFallback className="bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 text-xs">{speaker.company.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium text-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{speaker.company}</span>
                                </a>
                              );
                            } else {
                              return (
                                <div key={speaker.id} className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg px-2 py-1 text-xs border border-emerald-200 dark:border-emerald-700">
                                  <Avatar className="w-5 h-5">
                                    <AvatarImage src={speaker.imageUrl} alt={speaker.company} />
                                    <AvatarFallback className="bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 text-xs">{speaker.company.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium text-foreground">{speaker.company}</span>
                                </div>
                              );
                            }
                          })}
                        </div>
                        
                        {/* Előadók és cégek részletes leírása */}
                        <div className="mt-4 space-y-3 text-xs text-gray-600 dark:text-gray-300">
                          <div className="space-y-1">
                            <p className="text-emerald-700 dark:text-emerald-300 font-medium">GeoAkku feltalálója - Meleghegyi András</p>
                            <p>A GeoAkku innovatív és fenntartható energiatárolási megoldásait mutatjuk be, a találmány feltalálójának előadásában.</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-emerald-700 dark:text-emerald-300 font-medium">Pinke Attila - Blockchainbloom</p>
                            
                            <p>Kriptovaluta befektetési szakértő, a Blockchainbloom alapítója. Több mint 8 éves tapasztalat a kriptovaluta piacon, befektetési stratégiák és portfóliókezelés területén. Segített már több száz befektetőnek navigálni a kriptovaluta világában.</p>
                          </div>
                        </div>
                      </div>

                      {/* Statisztikai adatok - mindig látható */}
                      <div className="mt-6 pt-4 border-t border-emerald-200 dark:border-emerald-700">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="space-y-1">
                            <AnimatedCounter 
                              end={2} 
                              className="text-lg lg:text-xl text-emerald-600 dark:text-emerald-400 font-bold" 
                              duration={1500}
                            />
                            <p className="text-xs text-gray-600 dark:text-gray-300">Előadók</p>
                          </div>
                          <div className="space-y-1">
                            <AnimatedCounter 
                              end={2} 
                              className="text-lg lg:text-xl text-emerald-600 dark:text-emerald-400 font-bold" 
                              duration={1500}
                            />
                            <p className="text-xs text-gray-600 dark:text-gray-300">Óra időtartam</p>
                          </div>
                          <div className="space-y-1">
                            <AnimatedCounter 
                              end={150} 
                              className="text-lg lg:text-xl text-emerald-600 dark:text-emerald-400 font-bold" 
                              duration={1500}
                            />
                            <p className="text-xs text-gray-600 dark:text-gray-300">Max résztvevő</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center pt-4">
                        <Button 
                          size="lg"
                          className={`${isFullyBooked 
                            ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300'
                          } px-8 py-3 font-medium`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRegister(conference.id);
                          }}
                          disabled={isFullyBooked}
                        >
                          {isFullyBooked ? 'Regisztráció lezárva' : 'Ingyenes regisztráció'}
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Részletes információk - mindig látható */}
                  <div className="border-t border-emerald-200 dark:border-emerald-700 bg-emerald-50/30 dark:bg-emerald-900/10">
                    <div className="p-6 lg:p-8 space-y-8">
                          {/* AirPods nyereményjáték */}
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                              <Gift className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                              <h4 className="font-medium text-foreground">Nyerjen AirPods-t!</h4>
                            </div>
                            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-600/30 rounded-lg p-4">
                              <div className="grid md:grid-cols-3 gap-4 text-center">
                                <div className="space-y-2">
                                  <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                                    <Gift className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                                  </div>
                                  <h5 className="text-sm font-medium text-foreground">3 db AirPods</h5>
                                  <p className="text-xs text-gray-600 dark:text-gray-300">
                                    A legújabb Apple AirPods
                                  </p>
                                </div>
                                <div className="space-y-2">
                                  <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                                    <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                                  </div>
                                  <h5 className="text-sm font-medium text-foreground">Minden résztvevő</h5>
                                  <p className="text-xs text-gray-600 dark:text-gray-300">
                                    Automatikus részvétel
                                  </p>
                                </div>
                                <div className="space-y-2">
                                  <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                                    <Clock className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                                  </div>
                                  <h5 className="text-sm font-medium text-foreground">18:50-kor</h5>
                                  <p className="text-xs text-gray-600 dark:text-gray-300">
                                    Sorsolás az esemény végén
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Előadó cégek szekció */}
                          <div className="space-y-4">
                            <h4 className="font-medium flex items-center gap-2 text-foreground">
                              <Building className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                              Előadók és cégek
                            </h4>
                            <div className="flex flex-wrap gap-3">
                              {conference.speakers.map((speaker) => {
                                const companyUrl = getCompanyUrl(speaker.company);
                                
                                if (companyUrl) {
                                  return (
                                    <a 
                                      key={speaker.id}
                                      href={companyUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className="flex items-center gap-2 bg-white dark:bg-gray-700 rounded-lg px-3 py-2 shadow-sm hover:shadow-md hover:bg-emerald-50 dark:hover:bg-emerald-800/30 transition-all border border-emerald-100 dark:border-emerald-700"
                                    >
                                      <Avatar className="w-8 h-8">
                                        <AvatarImage src={speaker.imageUrl} alt={speaker.company} />
                                        <AvatarFallback className="bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300">{speaker.company.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <span className="text-sm font-medium text-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{speaker.company}</span>
                                    </a>
                                  );
                                } else {
                                  return (
                                    <div key={speaker.id} className="flex items-center gap-2 bg-white dark:bg-gray-700 rounded-lg px-3 py-2 shadow-sm border border-emerald-100 dark:border-emerald-700">
                                      <Avatar className="w-8 h-8">
                                        <AvatarImage src={speaker.imageUrl} alt={speaker.company} />
                                        <AvatarFallback className="bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300">{speaker.company.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <span className="text-sm font-medium text-foreground">{speaker.company}</span>
                                    </div>
                                  );
                                }
                              })}
                            </div>
                          </div>

                          {/* Részletes program */}
                          <div id="conference-details" className="space-y-4">
                            <h4 className="font-medium flex items-center gap-2 text-foreground">
                              <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                              Részletes program
                            </h4>
                            <div className="space-y-3">
                              {conference.agenda.map((item, index) => (
                                <div key={index} className="flex items-start gap-3 p-3 bg-white dark:bg-gray-700 rounded-lg border border-emerald-200 dark:border-emerald-600">
                                  <div className="flex items-center justify-center w-6 h-6 bg-emerald-600 dark:bg-emerald-500 text-white rounded-full text-xs font-medium">
                                    {index + 1}
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-foreground">{item}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Tudnivalók az eseményről */}
                          <div className="space-y-4">
                            <h4 className="font-medium flex items-center gap-2 text-foreground">
                              <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                              Tudnivalók az eseményről
                            </h4>
                            <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-emerald-200 dark:border-emerald-700 space-y-4">
                              {/* Bevezetés */}
                              <div className="space-y-2">
                                <h5 className="text-sm font-medium text-foreground">Az esemény célja</h5>
                                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                                  A Jövőbe Tekintő Konferencia októberben kerül megrendezésre, és a piaci élet aktuális, valamint jövő betekintő dolgait helyezi a középpontba. A program célja, hogy egy aktuális tőzsdei sztorit ismerjenek meg a résztvevők, illetve átfogó képet kapjanak a piaci trendekről, szakértők előadásából.
                                </p>
                              </div>
                              
                              {/* Első előadás */}
                              <div className="space-y-2">
                                <h5 className="text-sm font-medium text-foreground">Első előadás - Épduferr Nyrt.</h5>
                                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                                  A konferencia első részében az Épduferr Nyrt. leányvállalata, a GeoAkku Kft. lesz a fókuszban. Az előadó a találmány feltalálója, Meleghegyi András.
                                </p>
                              </div>
                              
                              {/* Második előadás */}
                              <div className="space-y-2">
                                <h5 className="text-sm font-medium text-foreground">Második előadás - Blockchainbloom</h5>
                                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                                  Pinke Attila a Blockchainbloom alapítója "Mire érdemes figyelni, hogy sikeres kriptóbefektető legyél!" címmel tart előadást. Több mint 8 éves tapasztalattal a kriptovaluta piacon, befektetési stratégiák és portfóliókezelés területén segített már több száz befektetőnek navigálni a kriptovaluta világában. Az előadás során a sikeres kriptóbefektetés kulcsfontosságú elemeit, stratégiáit és buktatóit mutatja be.
                                </p>
                              </div>
                            </div>
                          </div>



                          {/* Helyszín és térkép */}
                          <div className="space-y-4">
                            <h4 className="font-medium flex items-center gap-2 text-foreground">
                              <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                              Helyszín és megközelíthetőség
                            </h4>
                            <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-emerald-200 dark:border-emerald-600 space-y-4">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <div className="flex-1">
                                  <h5 className="font-medium text-foreground mb-2">
                                    <a 
                                      href="https://www.google.com/maps/place/Kimpton+BEM+Budapest/@47.5121956,19.035791,1089m/data=!3m1!1e3!4m20!1m10!3m9!1s0x4741dd9602c5773b:0x466074bff9930099!2sKimpton+BEM+Budapest!5m2!4m1!1i2!8m2!3d47.5120631!4d19.0379298!16s%2Fg%2F11vw_99ybn!3m8!1s0x4741dd9602c5773b:0x466074bff9930099!5m2!4m1!1i2!8m2!3d47.5120631!4d19.0379298!16s%2Fg%2F11vw_99ybn?entry=ttu&g_ep=EgoyMDI1MDkxNS4wIKXMDSoASAFQAw%3D%3D"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors underline hover:no-underline"
                                    >
                                      Kimpton Bem Budapest, 2. kerület
                                    </a>
                                  </h5>
                                  <p className="text-sm text-gray-600 dark:text-gray-300">1027 Budapest, Bem rakpart 16-19.</p>
                                </div>
                              </div>
                              
                              {/* Google Maps embed */}
                              <div className="rounded-lg overflow-hidden border border-emerald-200 dark:border-emerald-600">
                                <iframe
                                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2782.094887776!2d19.035791!3d47.5121956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741dd9602c5773b%3A0x466074bff9930099!2sKimpton%20BEM%20Budapest!5e0!3m2!1sen!2shu!4v1642000000000!5m2!1sen!2shu"
                                  width="100%"
                                  height="300"
                                  style={{ border: 0 }}
                                  allowFullScreen
                                  loading="lazy"
                                  referrerPolicy="no-referrer-when-downgrade"
                                  className="w-full"
                                ></iframe>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-center pt-4">
                            <Button 
                              size="lg" 
                              className={`${
                                isFullyBooked 
                                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300'
                              } px-12 py-4 text-lg font-medium`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRegister(conference.id);
                              }}
                              disabled={isFullyBooked}
                            >
                              {isFullyBooked ? 'Regisztráció lezárva - Betelt' : 'Regisztrálok most'}
                              {!isFullyBooked && <ArrowRight className="ml-2 w-5 h-5" />}
                            </Button>
                          </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Development Debug - csak development környezetben */}
      {process.env.NODE_ENV === 'development' && (
        <section className="py-8 bg-emerald-50 dark:bg-emerald-900/20 border-t border-emerald-200 dark:border-emerald-700">
          <div className="container mx-auto px-4 lg:px-6 xl:px-8">
            <div className="text-center mb-6">
              <h3 className="text-lg font-medium text-emerald-700 dark:text-emerald-300">Development Debug</h3>
              <p className="text-sm text-emerald-600 dark:text-emerald-400">Email küldés tesztelése és hibakeresés</p>
            </div>
            <EmailDebugComponent />
          </div>
        </section>
      )}

      {/* Regisztrációs Modal */}
      <ConferenceRegistrationModal
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        conferenceId={currentConferenceId}
        conferenceName="Jövőbe tekintő"
        onSuccess={handleRegistrationSuccess}
      />
    </div>
  );
}