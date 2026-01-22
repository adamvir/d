import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ChevronRight,
  TrendingUp,
  Newspaper,
  Mail,
  Search
} from "lucide-react";
import logoImage from "figma:asset/a057787a3831ed1d53ac8b38ddc0957e507cd404.png";
import newConferenceImage from 'figma:asset/f95527d788a22008fdb14ab8df8cd7d679436ef2.png';
import conferenceVenueImage from "figma:asset/8be3b4162e401577b54217bb2156d6895d18f937.png";
import eventDetailsImage from 'figma:asset/2e3efb50aeeebcda952d6909240390d86d7def00.png';

interface NewsHomePageProps {
  onNavigate?: (page: string, conferenceId?: string) => void;
}

export function NewsHomePage({ onNavigate }: NewsHomePageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Összes', icon: Newspaper },
    { id: 'conferences', name: 'Konferenciák', icon: Calendar },
    { id: 'analysis', name: 'Elemzések', icon: TrendingUp },
    { id: 'newsletter', name: 'Hírlevél', icon: Mail },
  ];

  const featuredNews = {
    id: '7',
    title: 'XI. Jövőbe Tekintő Konferencia',
    subtitle: 'Vertikál x Blockchainbloom',
    date: '2026. január 29.',
    time: '17:00 - 19:00',
    location: 'Kimpton BEM Budapest',
    category: 'Konferencia',
    imageUrl: newConferenceImage,
    description: 'Csatlakozzon hozzánk a Vertikál Group és Blockchainbloom közös rendezvényére, ahol a sikeres befektetés titkait tárjuk fel.',
  };

  const recentNews = [
    {
      id: '1',
      title: 'X. Jövőbe Tekintő Konferencia - Visszatekintés',
      subtitle: 'Épduferr & Blockchainbloom',
      date: '2025. október 16.',
      category: 'Konferencia',
      imageUrl: conferenceVenueImage,
      description: 'Sikeres esemény a GeoAkku innovációval és kriptobefektetési stratégiákkal.',
      isPast: true,
    },
    {
      id: '2',
      title: 'A konferencia zárt, telt házzal',
      subtitle: 'Rekord részvétel',
      date: '2025. október 17.',
      category: 'Hír',
      imageUrl: eventDetailsImage,
      description: 'Az X. Jövőbe Tekintő Konferencia minden résztvevői helyet betöltött.',
      isPast: true,
    },
    {
      id: '3',
      title: 'Készülj a következő konferenciára',
      subtitle: 'XI. Jövőbe Tekintő',
      date: '2026. január 29.',
      category: 'Előzetes',
      imageUrl: newConferenceImage,
      description: 'Ne maradj le a XI. Jövőbe Tekintő Konferenciáról - regisztrálj most!',
      isPast: false,
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-cyan-500/20">
        <div className="container mx-auto px-4 lg:px-6 xl:px-8 2xl:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20 2xl:h-24">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img 
                src={logoImage} 
                alt="Tőzsdefórum" 
                className="h-8 sm:h-10 lg:h-12 2xl:h-14 w-auto"
              />
              <div>
                <h1 className="text-white font-bold text-lg sm:text-xl lg:text-2xl 2xl:text-3xl">
                  Tőzsdefórum
                </h1>
                <p className="text-cyan-400 text-xs sm:text-sm lg:text-base">
                  Hírek & Konferenciák
                </p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-4 lg:gap-6 2xl:gap-8">
              <button 
                onClick={() => onNavigate?.('home')}
                className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm lg:text-base 2xl:text-lg font-medium"
              >
                Főoldal
              </button>
              <button 
                onClick={() => onNavigate?.('konferenciak')}
                className="text-gray-400 hover:text-cyan-400 transition-colors text-sm lg:text-base 2xl:text-lg"
              >
                Konferenciák
              </button>
              <button 
                onClick={() => onNavigate?.('hirlevel')}
                className="text-gray-400 hover:text-cyan-400 transition-colors text-sm lg:text-base 2xl:text-lg"
              >
                Hírlevél
              </button>
            </nav>

            {/* Search Button */}
            <Button 
              variant="outline"
              className="hidden sm:flex bg-cyan-600/10 text-cyan-400 border-cyan-500/30 hover:bg-cyan-600/20 hover:border-cyan-500/50 px-4 py-2 lg:px-6 lg:py-3 2xl:px-8 2xl:py-4 text-sm lg:text-base 2xl:text-lg"
            >
              <Search className="mr-2 w-4 h-4 lg:w-5 lg:h-5 2xl:w-6 2xl:h-6" />
              Keresés
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section - Featured News */}
      <section className="relative text-white overflow-hidden bg-black py-8 sm:py-12 lg:py-16 2xl:py-20">
        <div className="container mx-auto px-4 lg:px-6 xl:px-8 2xl:px-12">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background Image */}
            <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] 2xl:h-[700px]">
              <div className="absolute inset-0 bg-black"></div>
              <img 
                src={featuredNews.imageUrl}
                alt={featuredNews.title}
                className="w-full h-full object-cover opacity-80"
              />
              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/30 via-transparent to-cyan-950/30"></div>
            </div>

            {/* Hero Content */}
            <div className="absolute inset-0 flex items-end">
              <div className="w-full p-6 sm:p-8 lg:p-12 2xl:p-16">
                <div className="max-w-4xl space-y-3 sm:space-y-4 lg:space-y-6">
                  {/* Category Badge */}
                  <div className="inline-flex items-center gap-2 bg-cyan-600/20 backdrop-blur-xl rounded-full px-4 py-2 2xl:px-6 2xl:py-3 text-xs sm:text-sm 2xl:text-base text-cyan-200 border border-cyan-400/30">
                    <Calendar className="w-4 h-4 2xl:w-5 2xl:h-5 text-cyan-300" />
                    <span className="font-medium">{featuredNews.category} • {featuredNews.date}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-white drop-shadow-2xl">
                    {featuredNews.title}
                  </h2>

                  {/* Subtitle */}
                  <p className="text-base sm:text-xl lg:text-2xl 2xl:text-3xl text-cyan-100 font-light">
                    {featuredNews.subtitle}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm lg:text-base 2xl:text-lg text-gray-300">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 lg:w-5 lg:h-5 text-cyan-400" />
                      <span>{featuredNews.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 lg:w-5 lg:h-5 text-cyan-400" />
                      <span>{featuredNews.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base lg:text-lg 2xl:text-xl text-gray-300 max-w-2xl">
                    {featuredNews.description}
                  </p>

                  {/* CTA */}
                  <div className="pt-2 sm:pt-4">
                    <Button 
                      size="lg"
                      onClick={() => onNavigate?.('vertical', featuredNews.id)}
                      className="bg-cyan-600/80 text-white hover:bg-cyan-600 px-6 py-4 sm:px-8 sm:py-5 lg:px-10 lg:py-6 2xl:px-12 2xl:py-7 text-sm sm:text-base lg:text-lg 2xl:text-xl shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 border border-cyan-400/30 rounded-lg backdrop-blur-sm"
                    >
                      Részletek és regisztráció
                      <ChevronRight className="ml-2 w-4 h-4 lg:w-5 lg:h-5 2xl:w-6 2xl:h-6" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-black py-6 sm:py-8 2xl:py-10">
        <div className="container mx-auto px-4 lg:px-6 xl:px-8 2xl:px-12">
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 2xl:px-8 2xl:py-4 
                    rounded-xl font-medium transition-all duration-300
                    text-sm sm:text-base 2xl:text-lg
                    ${isActive 
                      ? 'bg-cyan-600/80 text-white border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/30' 
                      : 'bg-gray-800/40 text-gray-400 border-2 border-gray-700/30 hover:bg-gray-800/60 hover:text-cyan-400 hover:border-cyan-500/30'
                    }
                  `}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 2xl:w-6 2xl:h-6" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent News Grid */}
      <section className="bg-black py-8 sm:py-12 lg:py-16 2xl:py-20">
        <div className="container mx-auto px-4 lg:px-6 xl:px-8 2xl:px-12">
          {/* Section Header */}
          <div className="mb-8 sm:mb-12 2xl:mb-16">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold text-white mb-2 sm:mb-3">
              Legfrissebb hírek
            </h3>
            <p className="text-sm sm:text-base lg:text-lg 2xl:text-xl text-cyan-300">
              Ne maradj le a legújabb eseményekről és elemzésekről
            </p>
          </div>

          {/* News Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 2xl:gap-10">
            {recentNews.map((news) => (
              <Card 
                key={news.id}
                className={`
                  group overflow-hidden bg-black/40 backdrop-blur-xl border rounded-2xl
                  shadow-2xl transition-all duration-300 hover:scale-105
                  ${news.isPast 
                    ? 'border-gray-700/30 shadow-gray-500/10 opacity-70 grayscale hover:opacity-90 hover:grayscale-0' 
                    : 'border-cyan-500/20 shadow-cyan-500/10 hover:border-cyan-500/40 hover:shadow-cyan-500/20'
                  }
                `}
              >
                <CardContent className="p-0">
                  {/* Image */}
                  <div className="relative h-48 sm:h-56 lg:h-64 2xl:h-72 overflow-hidden">
                    <img 
                      src={news.imageUrl}
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent`}></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`
                        inline-block px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium
                        ${news.isPast
                          ? 'bg-gray-700/80 text-gray-300'
                          : 'bg-cyan-600/80 text-white'
                        }
                      `}>
                        {news.category}
                      </span>
                    </div>

                    {/* Past Event Badge */}
                    {news.isPast && (
                      <div className="absolute top-4 right-4">
                        <span className="inline-block px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-gray-600/80 text-gray-300">
                          Lezárult
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6 2xl:p-8">
                    {/* Date */}
                    <p className={`
                      text-xs sm:text-sm 2xl:text-base mb-2 sm:mb-3 flex items-center gap-2
                      ${news.isPast ? 'text-gray-500' : 'text-cyan-400'}
                    `}>
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      {news.date}
                    </p>

                    {/* Title */}
                    <h4 className={`
                      text-base sm:text-lg lg:text-xl 2xl:text-2xl font-bold mb-2 sm:mb-3
                      ${news.isPast ? 'text-gray-400' : 'text-white'}
                    `}>
                      {news.title}
                    </h4>

                    {/* Subtitle */}
                    <p className={`
                      text-sm sm:text-base 2xl:text-lg mb-3 sm:mb-4
                      ${news.isPast ? 'text-gray-500' : 'text-cyan-200'}
                    `}>
                      {news.subtitle}
                    </p>

                    {/* Description */}
                    <p className={`
                      text-xs sm:text-sm 2xl:text-base mb-4 sm:mb-6 line-clamp-2
                      ${news.isPast ? 'text-gray-600' : 'text-gray-400'}
                    `}>
                      {news.description}
                    </p>

                    {/* Read More Button */}
                    <Button 
                      variant="outline"
                      className={`
                        w-full transition-all duration-300 text-xs sm:text-sm 2xl:text-base
                        ${news.isPast
                          ? 'bg-gray-800/40 text-gray-500 border-gray-700/30 hover:bg-gray-800/60 hover:text-gray-400'
                          : 'bg-cyan-600/10 text-cyan-400 border-cyan-500/30 hover:bg-cyan-600/20 hover:border-cyan-500/50'
                        }
                      `}
                    >
                      {news.isPast ? 'Részletek' : 'Tovább olvasom'}
                      <ChevronRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          <div className="mt-8 sm:mt-12 2xl:mt-16 text-center">
            <Button 
              variant="outline"
              size="lg"
              className="bg-cyan-600/10 text-cyan-400 border-cyan-500/30 hover:bg-cyan-600/20 hover:border-cyan-500/50 px-8 py-4 sm:px-10 sm:py-5 2xl:px-12 2xl:py-6 text-sm sm:text-base 2xl:text-lg"
            >
              További hírek betöltése
              <ChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 2xl:w-6 2xl:h-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="bg-black py-12 sm:py-16 lg:py-20 2xl:py-24">
        <div className="container mx-auto px-4 lg:px-6 xl:px-8 2xl:px-12">
          <Card className="overflow-hidden bg-gradient-to-br from-cyan-950/30 via-black/40 to-blue-950/30 backdrop-blur-xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 rounded-3xl">
            <CardContent className="p-8 sm:p-12 lg:p-16 2xl:p-20 text-center">
              <Mail className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 2xl:w-24 2xl:h-24 text-cyan-400 mx-auto mb-4 sm:mb-6 2xl:mb-8" />
              
              <h3 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold text-white mb-3 sm:mb-4 2xl:mb-6">
                Iratkozz fel hírlevelünkre
              </h3>
              
              <p className="text-sm sm:text-base lg:text-lg 2xl:text-xl text-cyan-200 mb-6 sm:mb-8 2xl:mb-10 max-w-2xl mx-auto">
                Kapj értesítést a legfrissebb konferenciákról, elemzésekről és befektetési trendekről!
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-xl mx-auto">
                <input 
                  type="email"
                  placeholder="Email címed"
                  className="flex-1 px-4 py-3 sm:px-6 sm:py-4 2xl:px-8 2xl:py-5 bg-black/50 border border-cyan-500/30 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/60 text-sm sm:text-base 2xl:text-lg"
                />
                <Button 
                  size="lg"
                  className="bg-cyan-600 text-white hover:bg-cyan-500 px-6 py-3 sm:px-8 sm:py-4 2xl:px-10 2xl:py-5 text-sm sm:text-base 2xl:text-lg shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 rounded-xl"
                >
                  Feliratkozás
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}