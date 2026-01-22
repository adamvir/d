import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Award,
  CheckCircle,
  Gift,
  Building,
  Image as ImageIcon,
  X
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import heroImage from 'figma:asset/15405f25001c1bf97736f79b172332af19ac2fb9.png';
import conferenceVenueImage from 'figma:asset/8be3b4162e401577b54217bb2156d6895d18f937.png';
import epduferrLogo from "figma:asset/bbeca7a6de705d26c58b57ebdf298f4324c8b0f6.png";
import blockchainbloomLogo from "figma:asset/edb569ca3bbe09608bec83cf8241fa086d70872a.png";
import galleryImage1 from 'figma:asset/15405f25001c1bf97736f79b172332af19ac2fb9.png';
import galleryImage2 from 'figma:asset/be3694a9b3cd6a75a78d76095e94ec7381dfd8dc.png';
import galleryImage3 from 'figma:asset/29df5efeba2163f614fdfb5e7546680f21dcfb45.png';
import galleryImage4 from 'figma:asset/df292b27346c4c7c9b83902030f4a9012882a2fe.png';

export function JovobeTekintoPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Galéria képek - valódi esemény fotók
  const galleryImages = [
    galleryImage1,
    galleryImage2,
    galleryImage3,
    galleryImage4,
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden bg-black">
        <div className="relative">
          <div className="absolute inset-0 bg-black"></div>
          <img 
            src={conferenceVenueImage}
            alt="Jövőbe Tekintő Konferencia"
            className="w-full h-[500px] lg:h-[650px] 2xl:h-[800px] 3xl:h-[900px] object-cover object-center opacity-70 grayscale"
          />
          {/* Lighter overlay - less emerald tint */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/20 via-transparent to-emerald-950/20"></div>
        </div>
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-end lg:items-center justify-center">
          <div className="container mx-auto px-4 lg:px-6 xl:px-8 2xl:px-12 3xl:px-16 pb-12 lg:pb-0">
            <div className="max-w-6xl 2xl:max-w-7xl mx-auto text-center space-y-6 2xl:space-y-8">
              {/* Past Event Badge */}
              <div className="inline-flex items-center gap-2 bg-emerald-600/20 backdrop-blur-xl rounded-full px-5 py-2.5 2xl:px-6 2xl:py-3 text-sm 2xl:text-base text-emerald-200 border border-emerald-400/30 shadow-lg">
                <CheckCircle className="w-4 h-4 2xl:w-5 2xl:h-5 text-emerald-300" />
                <span className="font-medium">Megtörtént esemény</span>
              </div>
              
              {/* Title */}
              <h1 className="text-4xl lg:text-6xl 2xl:text-7xl 3xl:text-8xl leading-tight text-white drop-shadow-2xl">
                <span className="block mb-2" style={{textShadow: '2px 2px 12px rgba(0,0,0,0.9), 0px 0px 30px rgba(0,0,0,0.7)'}}>
                  X. Jövőbe Tekintő Konferencia
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl lg:text-2xl 2xl:text-3xl 3xl:text-4xl text-emerald-100 max-w-3xl 2xl:max-w-4xl mx-auto font-light" style={{textShadow: '1px 1px 8px rgba(0,0,0,0.9), 0px 0px 20px rgba(0,0,0,0.7)'}}>
                GeoAkku Innováció & Sikeres Kriptóbefektetés
              </p>
              
              {/* CTA */}
              <div className="pt-4 2xl:pt-6">
                <Button 
                  size="lg" 
                  className="bg-emerald-600/80 text-white hover:bg-emerald-600 px-10 py-4 2xl:px-14 2xl:py-6 text-base 2xl:text-xl shadow-2xl hover:shadow-emerald-500/50 transform hover:scale-105 transition-all duration-300 border border-emerald-400/30 rounded-lg backdrop-blur-sm"
                  onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <ImageIcon className="mr-2 w-5 h-5 2xl:w-6 2xl:h-6" />
                  <span>Galéria megtekintése</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 2xl:py-24 bg-black">
        <div className="container mx-auto px-4 lg:px-6 xl:px-8 2xl:px-12 3xl:px-16">
          <div className="max-w-7xl mx-auto space-y-12 2xl:space-y-16">
            
            {/* Event Details Card */}
            <Card className="overflow-hidden bg-black/40 backdrop-blur-xl border border-emerald-500/20 shadow-2xl shadow-emerald-500/10 rounded-2xl">
              <CardContent className="p-6 lg:p-8 2xl:p-10">
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                  {/* Left - Image */}
                  <div className="relative group h-64 lg:h-80">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                    <img 
                      src={conferenceVenueImage}
                      alt="Konferencia helyszín"
                      className="relative w-full h-full object-cover rounded-2xl shadow-2xl transition-all duration-500"
                    />
                  </div>
                  
                  {/* Right - Details */}
                  <div className="space-y-4 2xl:space-y-5">
                    <div>
                      <h2 className="text-2xl lg:text-3xl 2xl:text-4xl mb-3 text-emerald-400">
                        Esemény részletei
                      </h2>
                      <p className="text-gray-300">
                        Exkluzív networking esemény vezető cégekkel a pénzügyi szektor jövőjéről.
                      </p>
                    </div>
                    
                    {/* Info Grid */}
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/10 backdrop-blur-sm">
                        <Calendar className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-emerald-300 mb-0.5">Időpont</p>
                          <p className="text-white text-sm">2025. október 16. - Csütörtök</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/10 backdrop-blur-sm">
                        <Clock className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-emerald-300 mb-0.5">Időtartam</p>
                          <p className="text-white text-sm">17:00 - 19:00 (2 óra)</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/10 backdrop-blur-sm">
                        <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-emerald-300 mb-0.5">Helyszín</p>
                          <a 
                            href="https://www.google.com/maps/place/Kimpton+BEM+Budapest"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-emerald-300 transition-colors underline text-sm"
                          >
                            Kimpton Bem Budapest, Budapest 2. kerület
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/10 backdrop-blur-sm">
                        <Users className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-emerald-300 mb-0.5">Résztvevők</p>
                          <p className="text-white text-sm">150 fő kapacitás - Betelt</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Speakers Section */}
            <Card className="overflow-hidden bg-black/40 backdrop-blur-xl border border-emerald-500/20 shadow-2xl shadow-emerald-500/10 rounded-2xl">
              <CardContent className="p-8 lg:p-12 2xl:p-16">
                <h3 className="text-2xl lg:text-3xl 2xl:text-4xl mb-8 text-emerald-400 flex items-center gap-3">
                  <Building className="w-6 h-6 2xl:w-8 2xl:h-8" />
                  Előadók és cégek
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                  {/* Épduferr */}
                  <div className="p-6 bg-emerald-500/5 rounded-xl border border-emerald-500/10 backdrop-blur-sm hover:bg-emerald-500/10 transition-all duration-300 group">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-white p-2">
                        <img src={epduferrLogo} alt="Épduferr" className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <h4 className="text-xl text-white font-medium">Épduferr Nyrt.</h4>
                        <p className="text-emerald-300 text-sm">Meleghegyi András - Feltaláló</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      A GeoAkku innovatív energiatárolási megoldásának feltalálója és fejlesztője. Az előadás során bemutatta a GeoAkku technológiáját és annak gyakorlati alkalmazási lehetőségeit.
                    </p>
                    <a 
                      href="https://www.epduferr.hu/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 text-emerald-400 hover:text-emerald-300 transition-colors text-sm underline"
                    >
                      Tovább az Épduferr weboldalára →
                    </a>
                  </div>
                  
                  {/* Blockchainbloom */}
                  <div className="p-6 bg-emerald-500/5 rounded-xl border border-emerald-500/10 backdrop-blur-sm hover:bg-emerald-500/10 transition-all duration-300 group">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-white p-2">
                        <img src={blockchainbloomLogo} alt="Blockchainbloom" className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <h4 className="text-xl text-white font-medium">Blockchainbloom</h4>
                        <p className="text-emerald-300 text-sm">Pinke Attila - Szakértő</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Kriptovaluta befektetési szakértő, a Blockchainbloom alapítója. Több mint 8 éves tapasztalat a kriptovaluta piacon. Az előadásban a sikeres kriptóbefektetés kulcsfontosságú elemeit és stratégiáit mutatta be.
                    </p>
                    <a 
                      href="https://www.blockchainbloom.com/pinke-attila/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 text-emerald-400 hover:text-emerald-300 transition-colors text-sm underline"
                    >
                      Tovább a Blockchainbloom weboldalára →
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gallery Section */}
            <div id="gallery" className="scroll-mt-24">
              <Card className="overflow-hidden bg-black/40 backdrop-blur-xl border border-emerald-500/20 shadow-2xl shadow-emerald-500/10 rounded-2xl">
                <CardContent className="p-8 lg:p-12 2xl:p-16">
                  <h3 className="text-2xl lg:text-3xl 2xl:text-4xl mb-8 text-emerald-400 flex items-center gap-3">
                    <ImageIcon className="w-6 h-6 2xl:w-8 2xl:h-8" />
                    Esemény galéria
                  </h3>
                  
                  <p className="text-gray-300 mb-8">
                    Tekintse meg az esemény legjobb pillanatait fotógalériánkban.
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
                    {galleryImages.map((image, index) => (
                      <div 
                        key={index}
                        className="relative group cursor-pointer overflow-hidden rounded-xl aspect-video"
                        onClick={() => setSelectedImage(image)}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-10"></div>
                        <img 
                          src={image}
                          alt={`Konferencia fotó ${index + 1}`}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                          <ImageIcon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <img 
            src={selectedImage}
            alt="Nagyított kép"
            className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}