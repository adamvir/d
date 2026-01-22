import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Building
} from "lucide-react";
import newConferenceImage from 'figma:asset/f95527d788a22008fdb14ab8df8cd7d679436ef2.png';
import eventDetailsImage from 'figma:asset/2e3efb50aeeebcda952d6909240390d86d7def00.png';
import verticalLogo from 'figma:asset/9e80e2579c37fc96254a8341db4b55a82ed20060.png';
import blockchainbloomLogo from "figma:asset/edb569ca3bbe09608bec83cf8241fa086d70872a.png";
import logoImage from "figma:asset/a057787a3831ed1d53ac8b38ddc0957e507cd404.png";
import kimptonBemImage from 'figma:asset/21a827dcf0de12bdddb6451969fcb2e15aa365e7.png';
import { ConferenceRegistrationModal } from './ConferenceRegistrationModal';

export function VerticalPage() {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  
  const handleRegistrationSuccess = () => {
    console.log('Sikeres regisztráció a XI. Jövőbe Tekintő Konferenciára');
  };
  
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden bg-black">
        <div className="relative">
          <div className="absolute inset-0 bg-black"></div>
          <img 
            src={newConferenceImage}
            alt="XI. Jövőbe Tekintő Konferencia"
            className="w-full h-[500px] sm:h-[380px] lg:h-[650px] 2xl:h-[800px] 3xl:h-[900px] object-cover object-center opacity-90"
          />
          {/* Cyan/Blue tint for Vertikál branding */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/20 via-transparent to-cyan-950/20"></div>
        </div>
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 lg:px-6 xl:px-8 2xl:px-12 3xl:px-16">
            <div className="max-w-6xl 2xl:max-w-7xl mx-auto text-center space-y-4 sm:space-y-5 2xl:space-y-8">
              {/* Upcoming Event Badge */}
              <div className="inline-flex items-center gap-2 bg-cyan-600/20 backdrop-blur-xl rounded-full px-4 py-2 sm:px-5 sm:py-2.5 2xl:px-6 2xl:py-3 text-sm sm:text-sm 2xl:text-base text-cyan-200 border border-cyan-400/30 shadow-lg">
                <Calendar className="w-4 h-4 sm:w-4 sm:h-4 2xl:w-5 2xl:h-5 text-cyan-300" />
                <span className="font-medium">2026. január 29.</span>
              </div>
              
              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-6xl 2xl:text-7xl 3xl:text-8xl leading-tight text-white drop-shadow-2xl">
                <span className="block mb-0.5" style={{textShadow: '2px 2px 12px rgba(0,0,0,0.9), 0px 0px 30px rgba(0,0,0,0.7)'}}>
                  XI. Jövőbe Tekintő Konferencia
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg sm:text-xl lg:text-2xl 2xl:text-3xl 3xl:text-4xl text-cyan-100 max-w-3xl 2xl:max-w-4xl mx-auto font-light" style={{textShadow: '1px 1px 8px rgba(0,0,0,0.9), 0px 0px 20px rgba(0,0,0,0.7)'}}>
                Vertikál x Blockchainbloom
              </p>
              
              {/* CTA */}
              <div className="pt-2 sm:pt-4 2xl:pt-6">
                <Button 
                  size="lg" 
                  onClick={() => setShowRegistrationModal(true)}
                  className="bg-cyan-600/80 text-white hover:bg-cyan-600 px-8 py-6 sm:px-10 sm:py-4 2xl:px-14 2xl:py-6 text-base sm:text-base 2xl:text-xl shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 border border-cyan-400/30 rounded-lg backdrop-blur-sm"
                >
                  <Users className="mr-2 w-5 h-5 sm:w-5 sm:h-5 2xl:w-6 2xl:h-6" />
                  <span>Regisztráció</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12 lg:py-16 2xl:py-24 bg-black">
        <div className="container mx-auto px-4 lg:px-6 xl:px-8 2xl:px-12 3xl:px-16">
          <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 lg:space-y-12 2xl:space-y-16">
            
            {/* Event Details Card */}
            <Card className="overflow-hidden bg-black/40 backdrop-blur-xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 rounded-2xl">
              <CardContent className="p-0">
                {/* Hero Image */}
                <div className="relative h-48 sm:h-64 lg:h-96 2xl:h-[500px] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-transparent to-blue-500/30 z-10"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
                  <img 
                    src={eventDetailsImage}
                    alt="Konferencia helyszín"
                    className="w-full h-full object-cover transform scale-105 transition-transform duration-700 hover:scale-110"
                  />
                  
                  {/* Floating Title */}
                  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8 2xl:bottom-12 2xl:left-12 z-20">
                    <h2 className="text-xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold text-white mb-1 sm:mb-2 drop-shadow-2xl">
                      Esemény részletei
                    </h2>
                    <p className="text-xs sm:text-sm lg:text-base 2xl:text-lg text-cyan-200 drop-shadow-lg">
                      Minden, amit tudnod kell a konferenciáról
                    </p>
                  </div>
                </div>
                
                {/* Event Info Grid */}
                <div className="p-4 sm:p-6 lg:p-8 2xl:p-12 grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  {/* Date */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl blur-lg group-hover:blur-xl transition-all"></div>
                    <div className="relative flex items-start gap-3 sm:gap-4 p-4 sm:p-5 2xl:p-6 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 backdrop-blur-sm transition-all duration-300">
                      <div className="flex items-center justify-center min-w-[40px] h-[40px] sm:min-w-[48px] sm:h-[48px] 2xl:min-w-[56px] 2xl:h-[56px] bg-gradient-to-br from-cyan-600/30 to-blue-600/30 text-cyan-300 rounded-xl flex-shrink-0">
                        <Calendar className="w-5 h-5 sm:w-6 sm:h-6 2xl:w-7 2xl:h-7" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm text-gray-400 mb-1">Dátum</p>
                        <p className="text-base sm:text-lg lg:text-xl 2xl:text-2xl text-white font-medium">2026. január 29.</p>
                        <p className="text-xs sm:text-sm text-cyan-300 mt-1">Csütörtök</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Time */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl blur-lg group-hover:blur-xl transition-all"></div>
                    <div className="relative flex items-start gap-3 sm:gap-4 p-4 sm:p-5 2xl:p-6 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 backdrop-blur-sm transition-all duration-300">
                      <div className="flex items-center justify-center min-w-[40px] h-[40px] sm:min-w-[48px] sm:h-[48px] 2xl:min-w-[56px] 2xl:h-[56px] bg-gradient-to-br from-cyan-600/30 to-blue-600/30 text-cyan-300 rounded-xl flex-shrink-0">
                        <Clock className="w-5 h-5 sm:w-6 sm:h-6 2xl:w-7 2xl:h-7" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm text-gray-400 mb-1">Időpont</p>
                        <p className="text-base sm:text-lg lg:text-xl 2xl:text-2xl text-white font-medium">17:00 - 19:00</p>
                        <p className="text-xs sm:text-sm text-cyan-300 mt-1">2 óra program</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Location */}
                  <div className="relative group md:col-span-2">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl blur-lg group-hover:blur-xl transition-all"></div>
                    <div className="relative flex items-start gap-3 sm:gap-4 p-4 sm:p-5 2xl:p-6 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 backdrop-blur-sm transition-all duration-300">
                      <div className="flex items-center justify-center min-w-[40px] h-[40px] sm:min-w-[48px] sm:h-[48px] 2xl:min-w-[56px] 2xl:h-[56px] bg-gradient-to-br from-cyan-600/30 to-blue-600/30 text-cyan-300 rounded-xl flex-shrink-0">
                        <MapPin className="w-5 h-5 sm:w-6 sm:h-6 2xl:w-7 2xl:h-7" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm text-gray-400 mb-1">Helyszín</p>
                        <p className="text-base sm:text-lg lg:text-xl 2xl:text-2xl text-white font-medium mb-1 sm:mb-2">Kimpton BEM Budapest</p>
                        <p className="text-xs sm:text-sm text-cyan-300">Budapest, Bem József tér 3, 1027</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Speakers Section */}
            <Card className="overflow-hidden bg-black/40 backdrop-blur-xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 rounded-2xl">
              <CardContent className="p-4 sm:p-6 lg:p-8 2xl:p-12">
                <div className="mb-4 sm:mb-6 lg:mb-8">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <Building className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 2xl:w-12 2xl:h-12 text-cyan-400" />
                    <h3 className="text-xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold text-white">
                      Előadók és cégek
                    </h3>
                  </div>
                  <p className="text-cyan-200 text-xs sm:text-sm lg:text-base 2xl:text-lg max-w-3xl">
                    Ismerd meg a szakértőket és a vezető cégeket, akik megosztják tapasztalataikat.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  {/* Vertical Group Card */}
                  <div className="relative group h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                    <div className="relative bg-gradient-to-br from-cyan-500/5 to-transparent rounded-2xl p-4 sm:p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-sm space-y-3 sm:space-y-4 h-full flex flex-col">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 2xl:w-20 2xl:h-20 rounded-xl bg-white p-2 shadow-lg flex-shrink-0">
                          <img src={verticalLogo} alt="Vertical Group" className="w-full h-full object-contain rounded-lg" />
                        </div>
                        <div>
                          <h4 className="text-base sm:text-xl 2xl:text-2xl text-cyan-400 font-medium">Vertikál Group</h4>
                          <p className="text-xs sm:text-sm text-gray-400">Befektetési szakértők</p>
                        </div>
                      </div>
                      <p className="text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed flex-1">
                        [Ide várjuk az előadó anyagát]
                      </p>
                    </div>
                  </div>

                  {/* Blockchainbloom Card */}
                  <div className="relative group h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                    <div className="relative bg-gradient-to-br from-cyan-500/5 to-transparent rounded-2xl p-4 sm:p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-sm space-y-3 sm:space-y-4 h-full flex flex-col">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 2xl:w-20 2xl:h-20 rounded-xl bg-white p-2 shadow-lg flex-shrink-0">
                          <img src={blockchainbloomLogo} alt="Blockchainbloom" className="w-full h-full object-contain rounded-lg" />
                        </div>
                        <div>
                          <h4 className="text-base sm:text-xl 2xl:text-2xl text-cyan-400 font-medium">Pinke Attila</h4>
                          <p className="text-xs sm:text-sm text-gray-400">Blockchainbloom alapítója</p>
                        </div>
                      </div>
                      <p className="text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed flex-1">
                        Kriptovaluta befektetési szakértő, a Blockchainbloom alapítója. Több mint 8 éves tapasztalat a kriptovaluta piacon, befektetési stratégiák és portfóliókezelés területén. Segített már több száz befektetőnek navigálni a kriptovaluta világában.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Program Section */}
            <Card className="overflow-hidden bg-black/40 backdrop-blur-xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 rounded-2xl">
              <CardContent className="p-4 sm:p-6 lg:p-8 2xl:p-12">
                <div className="mb-4 sm:mb-6 lg:mb-8">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <Clock className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 2xl:w-12 2xl:h-12 text-cyan-400" />
                    <h3 className="text-xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold text-white">
                      Program részletei
                    </h3>
                  </div>
                  <p className="text-cyan-200 text-xs sm:text-sm lg:text-base 2xl:text-lg max-w-3xl">
                    Részletes ütemterv az esemény pontos lebonyolításáról.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  {[
                    { time: "17:00 - 17:30", title: "Regisztráció és networking" },
                    { time: "17:30 - 18:15", title: "Vertikál Group előadás", speaker: "[Ide várjuk az előadó anyagát]" },
                    { time: "18:15 - 19:00", title: "Hogyan legyél sikeres befektető", speaker: "Blockchainbloom Hungary - Pinke Attila" },
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-xl blur-lg group-hover:blur-xl transition-all"></div>
                      <div className="relative flex items-start gap-3 sm:gap-4 p-3 sm:p-4 lg:p-5 2xl:p-6 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 backdrop-blur-sm transition-all duration-300">
                        <div className="flex items-center justify-center min-w-[36px] h-[36px] sm:min-w-[48px] sm:h-[48px] 2xl:min-w-[56px] 2xl:h-[56px] bg-gradient-to-br from-cyan-600/30 to-blue-600/30 text-cyan-300 rounded-xl text-base sm:text-lg 2xl:text-xl font-bold border border-cyan-500/30 flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                          <p className="text-cyan-300 text-xs sm:text-sm lg:text-base 2xl:text-lg mb-1 sm:mb-2 font-medium">{item.time}</p>
                          <p className="text-white font-medium text-sm sm:text-base lg:text-lg 2xl:text-xl mb-0.5 sm:mb-1">{item.title}</p>
                          {item.speaker && <p className="text-gray-400 text-xs sm:text-sm lg:text-base">{item.speaker}</p>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Google Maps Location Card */}
            <Card className="overflow-hidden bg-black/40 backdrop-blur-xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 rounded-2xl">
              <CardContent className="p-0">
                {/* Hero Image */}
                <div className="relative h-48 sm:h-64 lg:h-80 2xl:h-[400px] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-transparent to-blue-500/30 z-10"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
                  <img 
                    src={kimptonBemImage}
                    alt="Kimpton Bem Budapest"
                    className="w-full h-full object-cover transform scale-105 transition-transform duration-700 hover:scale-110"
                  />
                  
                  {/* Floating Title */}
                  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8 2xl:bottom-12 2xl:left-12 z-20">
                    <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                      <MapPin className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 2xl:w-12 2xl:h-12 text-cyan-400" />
                      <h3 className="text-xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold text-white drop-shadow-2xl">
                        Helyszín és megközelíthetőség
                      </h3>
                    </div>
                    <p className="text-cyan-200 text-xs sm:text-sm lg:text-base 2xl:text-lg max-w-2xl drop-shadow-lg">
                      Prémium környezet Budapest szívében, könnyen megközelíthető lokáció.
                    </p>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-4 sm:p-6 lg:p-8 2xl:p-12 space-y-4 sm:space-y-6">
                  {/* Location Info */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                    <div className="relative bg-gradient-to-br from-cyan-500/5 to-transparent rounded-2xl p-4 sm:p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-sm">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 2xl:w-14 2xl:h-14 rounded-xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-5 h-5 sm:w-6 sm:h-6 2xl:w-7 2xl:h-7 text-cyan-400" />
                        </div>
                        <div>
                          <a 
                            href="https://www.google.com/maps/place/Kimpton+BEM+Budapest"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-base sm:text-xl lg:text-2xl 2xl:text-3xl text-cyan-400 hover:text-cyan-300 transition-colors font-medium underline decoration-cyan-500/30 hover:decoration-cyan-500"
                          >
                            Kimpton Bem Budapest
                          </a>
                          <p className="text-gray-300 text-xs sm:text-sm lg:text-base mt-1 sm:mt-2">
                            Budapest, Bem József tér 3, 1027
                          </p>
                          <p className="text-gray-400 text-xs sm:text-sm mt-0.5 sm:mt-1">
                            2. kerület - Dunai panoráma
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Google Maps Embed */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl blur-2xl"></div>
                    <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl">
                      <iframe
                        src="https://maps.google.com/maps?q=Budapest,+Bem+József+tér+3,+1027&t=&z=18&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-48 sm:h-64 lg:h-80 2xl:h-96"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>
      
      {/* Registration Modal */}
      <ConferenceRegistrationModal
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        conferenceId="7"
        conferenceName="XI. Jövőbe Tekintő Konferencia"
        onSuccess={handleRegistrationSuccess}
      />
    </div>
  );
}