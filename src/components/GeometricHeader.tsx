import React, { useState, useEffect, useRef } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { ModernRovatDropdown } from "./ModernRovatDropdown";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "./ui/sheet";
import { Menu, ChevronRight, Calendar, Mail, Grid3X3, ChevronDown } from "lucide-react";
import logoImage from "figma:asset/a057787a3831ed1d53ac8b38ddc0957e507cd404.png";

interface GeometricHeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isDark: boolean;
  onThemeToggle: () => void;
  onSubscribeOpen: () => void;
}

export function GeometricHeader({ currentPage, onNavigate, isDark, onThemeToggle, onSubscribeOpen }: GeometricHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRovatOpen, setIsRovatOpen] = useState(false);
  const [isDesktopRovatOpen, setIsDesktopRovatOpen] = useState(false);
  const rovatDropdownRef = useRef<HTMLDivElement>(null);
  
  const navItems = [
    { label: "Konferenciák", value: "konferenciak", icon: Calendar },
    { label: "Hírlevél", value: "hirlevel", icon: Mail },
  ];

  const handleMobileNavigate = (page: string) => {
    onNavigate(page);
    setIsOpen(false);
    setIsRovatOpen(false);
  };

  const handleDesktopRovatClick = () => {
    setIsDesktopRovatOpen(!isDesktopRovatOpen);
  };

  // Bezárja a desktop dropdown-ot ha máshová kattintanak
  const handleNavigateAndCloseDropdown = (page: string) => {
    onNavigate(page);
    setIsDesktopRovatOpen(false);
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rovatDropdownRef.current && !rovatDropdownRef.current.contains(event.target as Node)) {
        setIsDesktopRovatOpen(false);
      }
    };

    if (isDesktopRovatOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDesktopRovatOpen]);

  return (
    <header className="border-b border-white/10 bg-black/90 backdrop-blur-2xl supports-[backdrop-filter]:bg-black/90 sticky top-0 z-50 shadow-xl shadow-black/20">
      <div className="container mx-auto px-4 lg:px-6 xl:px-8 2xl:px-12 3xl:px-16">
        {/* Modern Flex Layout */}
        <div className="flex items-center justify-between h-14 sm:h-16 2xl:h-20 max-w-[1920px] mx-auto">
          
          {/* Left Section - Navigation */}
          <div className="flex items-center gap-2 lg:gap-3 2xl:gap-4">
            <div className="hidden lg:flex items-center gap-1 2xl:gap-2">
              {/* Navigation Items */}
              {navItems.map((item) => {
                const isActive = currentPage === item.value;
                
                return (
                  <button
                    key={item.value}
                    onClick={() => onNavigate(item.value)}
                    className={`relative px-5 py-3 2xl:px-6 2xl:py-4 text-sm 2xl:text-base transition-all duration-300 group ${
                      isActive 
                        ? 'text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <span className="uppercase tracking-wide relative z-10">{item.label}</span>
                    
                    {/* Hover underline - expands from center (always on hover) */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-white/60 group-hover:w-full transition-all duration-300 ease-out"></div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Section - Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 2xl:gap-4">
            <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
            
            {/* Subscribe Button - Elegant glassmorphism style */}
            <button 
              onClick={onSubscribeOpen}
              className="hidden sm:flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 2xl:px-6 2xl:py-3 bg-white/5 hover:bg-white/10 text-white transition-all duration-300 group border border-white/20 hover:border-white/30 rounded-lg backdrop-blur-xl shadow-lg text-sm 2xl:text-base"
            >
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 2xl:w-4.5 2xl:h-4.5" />
              <span>Feliratkozás</span>
            </button>
            
            {/* Mobile Menu - Modern style */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="lg:hidden p-2 sm:p-2.5 rounded-lg border border-white/20 hover:border-white/30 hover:bg-white/5 transition-all duration-300 backdrop-blur-sm">
                  <Menu className="h-4 w-4 sm:h-5 sm:w-5 text-gray-300" />
                </button>
              </SheetTrigger>
              
              <SheetContent side="right" className="w-[85vw] sm:w-80 bg-black/98 backdrop-blur-2xl border-l border-white/20 shadow-2xl">
                <SheetTitle className="sr-only">Navigációs menü</SheetTitle>
                <SheetDescription className="sr-only">
                  Böngésszen az oldal különböző szakaszai között
                </SheetDescription>
                
                {/* Mobile Menu Content */}
                <div className="mt-8 space-y-2">
                  {/* Navigation Items */}
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.value;
                    
                    return (
                      <button
                        key={item.value}
                        onClick={() => handleMobileNavigate(item.value)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 border ${
                          isActive 
                            ? 'bg-white/10 text-white border-white/20 shadow-lg shadow-white/5' 
                            : 'text-gray-400 hover:text-white hover:bg-white/5 border-transparent hover:border-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isActive ? 'bg-cyan-500/20' : 'bg-white/5'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="font-medium">{item.label}</span>
                        </div>
                        {isActive && <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>}
                      </button>
                    );
                  })}
                  
                  {/* Separator */}
                  <div className="border-t border-white/10 my-6"></div>
                  
                  {/* Mobile Subscribe Button - Elegant style */}
                  <button
                    onClick={() => {
                      onSubscribeOpen();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-white/5 to-white/10 hover:from-white/10 hover:to-white/15 text-white transition-all duration-300 rounded-xl border border-white/20 hover:border-white/30 backdrop-blur-xl shadow-lg hover:shadow-xl group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-cyan-500/20 group-hover:bg-cyan-500/30 transition-colors">
                        <Mail className="w-4 h-4" />
                      </div>
                      <span className="font-medium">Feliratkozás</span>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}