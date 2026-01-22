import React, { useState, useEffect } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { 
  Users, 
  Mail, 
  Phone, 
  Calendar,
  CheckCircle,
  XCircle,
  RefreshCw,
  Download
} from "lucide-react";
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface Registration {
  id: string;
  name: string;
  phone: string;
  email: string;
  conferenceConsent: boolean;
  lotteryConsent: boolean;
  newsletterConsent: boolean;
  conferenceId: string;
  registeredAt: string;
  status: string;
}

export function AdminRegistrations() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<string>('all');

  const fetchRegistrations = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-4ed24ea8/admin/registrations`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setRegistrations(data.registrations || []);
      } else {
        setError(data.error || 'Hiba történt az adatok betöltésekor');
      }
    } catch (err) {
      console.error('Regisztrációk betöltési hiba:', err);
      setError('Hiba történt az adatok betöltésekor');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const filteredRegistrations = filter === 'all' 
    ? registrations 
    : registrations.filter(reg => reg.conferenceId === filter);

  const conferenceIds = Array.from(new Set(registrations.map(reg => reg.conferenceId)));

  const exportToCSV = () => {
    const headers = ['ID', 'Név', 'Email', 'Telefon', 'Konferencia ID', 'Regisztráció dátuma', 'Konferencia hozzájárulás', 'Hírlevél feliratkozás', 'Státusz'];
    
    const rows = filteredRegistrations.map(reg => [
      reg.id,
      reg.name,
      reg.email,
      reg.phone,
      reg.conferenceId,
      new Date(reg.registeredAt).toLocaleString('hu-HU'),
      reg.conferenceConsent ? 'Igen' : 'Nem',
      reg.newsletterConsent ? 'Igen' : 'Nem',
      reg.status
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `regisztraciok_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-black text-white py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <Card className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 rounded-2xl mb-8">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
                  <Users className="w-8 h-8 text-cyan-400" />
                  Admin - Regisztrációk
                </CardTitle>
                <p className="text-gray-400 text-sm mt-2">
                  Összes regisztráció: <span className="text-cyan-400 font-medium">{registrations.length}</span>
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={fetchRegistrations}
                  disabled={isLoading}
                  className="bg-cyan-600/80 hover:bg-cyan-600 text-white"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Frissítés
                </Button>
                <Button
                  onClick={exportToCSV}
                  disabled={filteredRegistrations.length === 0}
                  className="bg-green-600/80 hover:bg-green-600 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Filters */}
        <Card className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 rounded-2xl mb-8">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => setFilter('all')}
                variant={filter === 'all' ? 'default' : 'outline'}
                className={filter === 'all' ? 'bg-cyan-600 text-white' : ''}
              >
                Összes ({registrations.length})
              </Button>
              {conferenceIds.map(confId => {
                const count = registrations.filter(r => r.conferenceId === confId).length;
                return (
                  <Button
                    key={confId}
                    onClick={() => setFilter(confId)}
                    variant={filter === confId ? 'default' : 'outline'}
                    className={filter === confId ? 'bg-cyan-600 text-white' : ''}
                  >
                    Konferencia #{confId} ({count})
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <Card className="bg-red-500/10 border border-red-500/30 rounded-2xl mb-8">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-red-400">
                <XCircle className="w-5 h-5" />
                <p>{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Registrations List */}
        {isLoading ? (
          <div className="text-center py-12">
            <RefreshCw className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Regisztrációk betöltése...</p>
          </div>
        ) : filteredRegistrations.length === 0 ? (
          <Card className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 rounded-2xl">
            <CardContent className="p-12 text-center">
              <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Még nincs regisztráció</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredRegistrations.map((reg, index) => (
              <Card 
                key={reg.id} 
                className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 hover:border-cyan-500/40 shadow-xl shadow-cyan-500/5 rounded-xl transition-all duration-300"
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Basic Info */}
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Név</p>
                          <p className="text-white font-medium">{reg.name}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                          <Mail className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Email</p>
                          <p className="text-white font-medium text-sm break-all">{reg.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                          <Phone className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Telefon</p>
                          <p className="text-white font-medium">{reg.phone}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Regisztráció</p>
                          <p className="text-white font-medium text-sm">
                            {new Date(reg.registeredAt).toLocaleString('hu-HU')}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Consent Info */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        {reg.conferenceConsent ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-400" />
                        )}
                        <span className="text-sm text-gray-300">Konferencia hozzájárulás</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {reg.newsletterConsent ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-gray-600" />
                        )}
                        <span className="text-sm text-gray-300">Hírlevél feliratkozás</span>
                      </div>
                      
                      <div className="pt-2">
                        <p className="text-xs text-gray-400">Konferencia ID</p>
                        <p className="text-cyan-400 font-medium">#{reg.conferenceId}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-400">Státusz</p>
                        <span className="inline-block px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-medium">
                          {reg.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
