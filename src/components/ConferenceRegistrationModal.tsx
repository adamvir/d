import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Alert, AlertDescription } from "./ui/alert";
import { CheckCircle, X, Loader2, User, Phone, Mail } from "lucide-react";
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface ConferenceRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  conferenceId: string;
  conferenceName: string;
  onSuccess: () => void;
}

export function ConferenceRegistrationModal({ 
  isOpen, 
  onClose, 
  conferenceId, 
  conferenceName,
  onSuccess 
}: ConferenceRegistrationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    conferenceConsent: false,
    newsletterConsent: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [emailSent, setEmailSent] = useState(false);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'A teljes név megadása kötelező';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'A telefonszám megadása kötelező';
    } else {
      // Magyar telefonszám formátum ellenőrzés (+36 XX XXX XXXX vagy 06 XX XXX XXXX)
      const phoneRegex = /^(\+36|06)\s?\d{2}\s?\d{3}\s?\d{4}$/;
      if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
        errors.phone = 'Helytelen telefonszám formátum (pl. +36 30 123 4567)';
      }
    }

    if (!formData.email.trim()) {
      errors.email = 'Az email cím megadása kötelező';
    } else {
      // Email formátum ellenőrzés
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = 'Helytelen email formátum';
      }
    }

    if (!formData.conferenceConsent) {
      errors.conferenceConsent = 'A konferencia részvételi hozzájárulás kötelező';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Supabase backend hívás
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-4ed24ea8/conference/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          conferenceConsent: formData.conferenceConsent,
          newsletterConsent: formData.newsletterConsent,
          conferenceId
        })
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setEmailSent(data.emailSent || false);
        onSuccess();
        
        // Esemény küldése a RegistrationCounter frissítéséhez
        window.dispatchEvent(new CustomEvent('registration-success', { 
          detail: { conferenceId } 
        }));
        
        // Hírlevél eredmény kezelése
        if (formData.newsletterConsent && data.newsletterResult === 'subscribed') {
          console.log('Sikeres hírlevél feliratkozás');
        } else if (formData.newsletterConsent && data.newsletterResult === 'already_subscribed') {
          console.log('Már feliratkozott a hírlevelre');
        }
        
        // Email küldés eredmény kezelése
        if (data.emailSent) {
          console.log('Visszaigazoló email sikeresen elküldve');
        } else {
          console.log('Email küldés sikertelen, de a regisztráció megtörtént');
        }
        
        // Automatikus bezárás 5 másodperc után (megnöveltük az időt)
        setTimeout(() => {
          handleClose();
        }, 5000);
      } else {
        setError(data.error || 'Hiba történt a regisztráció során');
      }
    } catch (err) {
      console.error('Regisztrációs hiba:', err);
      setError('Hiba történt a regisztráció során. Kérjük próbálja újra később.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      conferenceConsent: false,
      newsletterConsent: false
    });
    setIsSuccess(false);
    setError('');
    setValidationErrors({});
    setIsSubmitting(false);
    setEmailSent(false);
    onClose();
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Töröljük a mezőhöz tartozó hibaüzenetet
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-lg max-w-[90vw]">
          <div className="text-center space-y-4 p-6">
            <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Sikeres regisztráció!</h3>
            <p className="text-sm text-gray-600 dark:text-white">
              Köszönjük a regisztrációját a "{conferenceName}" konferenciára. 
              Várjuk Önt a rendezvényen!
            </p>
            {emailSent && (
              <p className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-2 rounded-md">
                ✓ Visszaigazoló emailt küldtünk az Ön email címére
              </p>
            )}
            {!emailSent && (
              <div className="text-xs text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 p-2 rounded-md space-y-1">
                <p>⚠ Az email küldés sikertelen volt, de a regisztráció megtörtént</p>
                <p className="text-xs opacity-75">
                  Lehetséges ok: Email szolgáltató korlátozások. Kérem, ellenőrizze a spam mappát is.
                </p>
              </div>
            )}
            <Button onClick={handleClose} className="bg-blue-600 hover:bg-blue-700 text-white">
              Bezárás
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg w-[95vw] max-w-[95vw] sm:w-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl text-foreground">Konferencia regisztráció</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Regisztráljon a "{conferenceName}" konferenciára. Kérjük, töltse ki az alábbi mezőket.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {error && (
            <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
              <AlertDescription className="text-red-700 dark:text-red-300 text-sm">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-foreground flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Teljes név *
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Kovács János"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={validationErrors.name ? 'border-red-500' : ''}
              disabled={isSubmitting}
            />
            {validationErrors.name && (
              <p className="text-xs text-red-600 dark:text-red-400">{validationErrors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-foreground flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Telefonszám *
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+36 30 123 4567"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={validationErrors.phone ? 'border-red-500' : ''}
              disabled={isSubmitting}
            />
            {validationErrors.phone && (
              <p className="text-xs text-red-600 dark:text-red-400">{validationErrors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Email cím *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="kovacs.janos@email.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={validationErrors.email ? 'border-red-500' : ''}
              disabled={isSubmitting}
            />
            {validationErrors.email && (
              <p className="text-xs text-red-600 dark:text-red-400">{validationErrors.email}</p>
            )}
          </div>

          <div className="space-y-3 pt-2">
            {/* Kötelező konferencia részvételi hozzájárulás */}
            <div className="space-y-2">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <Checkbox
                  id="conference"
                  checked={formData.conferenceConsent}
                  onCheckedChange={(checked) => handleInputChange('conferenceConsent', !!checked)}
                  disabled={isSubmitting}
                  className="mt-0.5 flex-shrink-0"
                />
                <Label 
                  htmlFor="conference" 
                  className="text-xs leading-relaxed text-foreground cursor-pointer"
                >
                  Részt veszek a konferencián, az <a href="https://tozsdeforum.hu/wp-content/uploads/2025/09/Tozsdeforum_adatkezelesi-tajekoztato_TERVEZET_v2.docx.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Adatkezelési tájékoztatót</a> elfogadom. *
                </Label>
              </div>
              {validationErrors.conferenceConsent && (
                <p className="text-xs text-red-600 dark:text-red-400 ml-6 sm:ml-7">{validationErrors.conferenceConsent}</p>
              )}
            </div>

            {/* Opcionális hírlevél feliratkozás */}
            <div className="flex items-start space-x-2 sm:space-x-3">
              <Checkbox
                id="newsletter"
                checked={formData.newsletterConsent}
                onCheckedChange={(checked) => handleInputChange('newsletterConsent', !!checked)}
                disabled={isSubmitting}
                className="mt-0.5 flex-shrink-0"
              />
              <Label 
                htmlFor="newsletter" 
                className="text-xs leading-relaxed text-foreground cursor-pointer"
              >
                Feliratkozom a hírlevelre, az <a href="https://tozsdeforum.hu/adatvedelem/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">adatkezelési tájékoztatót</a> elfogadom.
              </Label>
            </div>


          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 w-full sm:w-auto"
            >
              Mégse
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !formData.name.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.conferenceConsent}
              className="flex-1 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Regisztráció...
                </>
              ) : (
                'Regisztrálok'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}