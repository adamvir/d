import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import * as kv from './kv_store.tsx';
// Egyszerű és működő SMTP könyvtár
import { SMTPClient } from 'https://deno.land/x/denomailer@1.6.0/mod.ts';

const app = new Hono();

// Email validation helper
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Remove accents from Hungarian text for email compatibility
const removeAccents = (text: string): string => {
  const accentsMap: { [key: string]: string } = {
    'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ö': 'o', 'ő': 'o', 'ú': 'u', 'ü': 'u', 'ű': 'u',
    'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ö': 'O', 'Ő': 'O', 'Ú': 'U', 'Ü': 'U', 'Ű': 'U'
  };
  
  return text.replace(/[áéíóöőúüűÁÉÍÓÖŐÚÜŰ]/g, (match) => accentsMap[match] || match);
};

// CORS middleware
app.use('*', cors({
  origin: '*',
  allowHeaders: ['*'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

// Logger
app.use('*', logger(console.log));

// Konferencia regisztráció endpoint
app.post('/make-server-4ed24ea8/conference/register', async (c) => {
  try {
    const body = await c.req.json();
    const { name, phone, email, conferenceConsent, lotteryConsent, newsletterConsent, conferenceId } = body;

    // Alapvető validáció
    if (!name?.trim() || !phone?.trim() || !email?.trim() || !conferenceId || !conferenceConsent) {
      return c.json({ 
        success: false, 
        error: 'Minden kötelező mező kitöltése szükséges, beleértve a konferencia részvételi hozzájárulást' 
      }, 400);
    }

    // Email formátum ellenőrzés
    if (!isValidEmail(email)) {
      return c.json({ 
        success: false, 
        error: 'Helytelen email formátum' 
      }, 400);
    }

    // Regisztráció ID generálása
    const registrationId = `reg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Egyszerű duplikáció ellenőrzés - csak email alapján
    try {
      const existingRegistrations = await kv.getByPrefix(`conference_registration:`);
      const emailExists = existingRegistrations.some(
        reg => reg?.email?.toLowerCase() === email.trim().toLowerCase()
      );

      if (emailExists) {
        return c.json({ 
          success: false, 
          error: 'Hiba. Ezzel az email-el már regisztráltál' 
        }, 400);
      }

      // Telefonszám duplikáció ellenőrzés
      const normalizedPhone = phone.replace(/\s/g, '').replace(/^\+36/, '06');
      const phoneExists = existingRegistrations.some(
        reg => {
          if (!reg?.phone) return false;
          const existingPhone = reg.phone.replace(/\s/g, '').replace(/^\+36/, '06');
          return existingPhone === normalizedPhone;
        }
      );

      if (phoneExists) {
        return c.json({ 
          success: false, 
          error: 'Már regisztráltál ezzel a telefonszámmal' 
        }, 400);
      }

      // 150 fős limit ellenőrzés
      const conferenceRegistrations = existingRegistrations.filter(
        reg => reg?.conferenceId === conferenceId
      );
      
      if (conferenceRegistrations.length >= 150) {
        return c.json({ 
          success: false, 
          error: 'A konferencia elérte a maximális résztvevői létszámot (150 fő).' 
        }, 400);
      }
    } catch (error) {
      // Folytatjuk a regisztrációt ha az ellenőrzés hibázik
    }
    
    // Regisztrációs adatok tárolása
    const registrationData = {
      id: registrationId,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      conferenceConsent: !!conferenceConsent,
      lotteryConsent: !!lotteryConsent,
      newsletterConsent: !!newsletterConsent,
      conferenceId,
      registeredAt: new Date().toISOString(),
      status: 'confirmed'
    };

    await kv.set(`conference_registration:${registrationId}`, registrationData);

    // Visszaigazoló email küldése Gmail SMTP-n keresztül
    let emailSent = false;
    try {
      // Egyszerű szöveges email tartalom - HTML eltávolítva
      const emailHTML = null;

      // Részletes email tartalom teljesen ékezetek nélkül
      const cleanName = removeAccents(name);
      const cleanPhone = removeAccents(phone);
      const registrationDate = new Date().toLocaleDateString('hu-HU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
      
      const emailText = `Koszonjuk a regisztraciot! Az alabbi adatokkal rogzitettuk jelentkezeset:

ESEMENY RESZLETEI:
Nev: XI. Jovobe Tekinto Konferencia
Datum: 2026. januar 29.
Idopont: 17:00
Helyszin: Kimpton Bem Budapest
Cim: Budapest, Bem Jozsef ter 3, 1027

AZ ON ADATAI:
Nev: ${cleanName}
Email: ${email}
Telefon: ${cleanPhone}
Regisztracio: ${registrationDate}

FONTOS TUDNIVALOK:
A konferencia ingyenes
Kerjuk, orizze meg ezt az emailt
A helyszinen regisztracios asztal varja

Varjuk Ont szeretettel!

Tozsdeforum.hu`;

      // Gmail SMTP konfiguráció - eredeti email
      const GMAIL_USER = 'tozsdeforumgpt@gmail.com';
      const GMAIL_PASS = Deno.env.get('GMAIL_APP_PASSWORD') || 'dtvw eltt sfek gkui';
      
      // Email data for Gmail SMTP - csak szöveges
      const emailData = {
        from: `\"Tozsdeforum\" <${GMAIL_USER}>`,
        to: email,
        subject: 'Regisztracio megerositese - XI. Jovobe Tekinto Konferencia',
        text: emailText,
        reply_to: 'hirlevel@tozsdeforum.hu'
      };
      
      // EGYSZERŰ és MŰKÖDŐ Gmail SMTP - Denomailer könyvtárral
      try {
        console.log('🚀 Gmail SMTP email küldés indítása (Denomailer)...');
        
        // Denomailer SMTP client
        const client = new SMTPClient({
          connection: {
            hostname: "smtp.gmail.com",
            port: 587, // STARTTLS
            tls: true,
            auth: {
              username: GMAIL_USER,
              password: GMAIL_PASS,
            },
          },
        });

        console.log('📡 Gmail SMTP kapcsolódás...');

        // Email küldése - CSAK szöveges tartalom
        await client.send({
          from: `Tozsdeforum <${GMAIL_USER}>`,
          to: email,
          subject: "Regisztracio megerositese - XI. Jovobe Tekinto Konferencia",
          content: emailText,
        });

        await client.close();
        
        console.log(`✅ Gmail SMTP email SIKERESEN elküldve: ${email}`);
        emailSent = true;

      } catch (smtpError) {
        console.error('❌ Denomailer SMTP hiba:', smtpError);
        
        // Fallback - 465-ös port SSL-lel
        try {
          console.log('🔄 Gmail SMTP SSL fallback (port 465)...');
          
          const sslClient = new SMTPClient({
            connection: {
              hostname: "smtp.gmail.com",
              port: 465, // SSL
              tls: true,
              auth: {
                username: GMAIL_USER,
                password: GMAIL_PASS,
              },
            },
          });

          await sslClient.send({
            from: `Tozsdeforum <${GMAIL_USER}>`,
            to: email,
            subject: "Regisztracio megerositese - XI. Jovobe Tekinto Konferencia",
            content: emailText,
          });

          await sslClient.close();
          
          console.log(`✅ Gmail SMTP SSL email SIKERESEN elküldve: ${email}`);
          emailSent = true;

        } catch (sslError) {
          console.error('❌ Gmail SMTP SSL fallback is sikertelen:', sslError);
          
          // Részletes debug info
          console.log('🔍 SMTP Debug információk:', {
            gmail_user: GMAIL_USER,
            password_hossz: GMAIL_PASS?.length || 0,
            password_first_4: GMAIL_PASS?.substring(0, 4) + '...',
            target_email: email,
            starttls_error: smtpError.message,
            ssl_error: sslError.message,
            timestamp: new Date().toISOString()
          });
          
          emailSent = false;
        }
      }
      
    } catch (error) {
      console.error('Gmail SMTP email küldési hiba:', error);
      // Email küldési hiba - folytatjuk a regisztrációt
    }

    // Mailchimp feliratkozás ha kérte
    let newsletterResult = null;
    if (newsletterConsent) {
      try {
        const MAILCHIMP_API_KEY = Deno.env.get('MAILCHIMP_API_KEY');
        const MAILCHIMP_SERVER = Deno.env.get('MAILCHIMP_SERVER_PREFIX');
        const AUDIENCE_ID = Deno.env.get('MAILCHIMP_AUDIENCE_ID');

        if (MAILCHIMP_API_KEY && MAILCHIMP_SERVER && AUDIENCE_ID) {
          const url = `https://${MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;
          
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Basic ${btoa(`any:${MAILCHIMP_API_KEY}`)}`,
            },
            body: JSON.stringify({
              email_address: email.trim(),
              status: 'subscribed'
            }),
          });

          if (response.ok) {
            newsletterResult = 'subscribed';
          } else {
            const data = await response.json();
            if (response.status === 400 && data.title === 'Member Exists') {
              newsletterResult = 'already_subscribed';
            }
          }
        }
      } catch (error) {
        // Mailchimp hiba nem akadályozza a regisztrációt
      }
    }

    return c.json({ 
      success: true, 
      registrationId,
      emailSent,
      newsletterResult,
      message: 'Regisztráció sikeres' 
    });

  } catch (error) {
    console.error('Regisztrációs hiba:', error);
    return c.json({ 
      success: false, 
      error: 'Szerver hiba történt' 
    }, 500);
  }
});

// Hírlevél feliratkozás endpoint
app.post('/make-server-4ed24ea8/newsletter/subscribe', async (c) => {
  try {
    const body = await c.req.json();
    const { email } = body;

    if (!email?.trim()) {
      return c.json({ 
        success: false, 
        error: 'Email cím megadása kötelező' 
      }, 400);
    }

    if (!isValidEmail(email)) {
      return c.json({ 
        success: false, 
        error: 'Helytelen email formátum' 
      }, 400);
    }

    // Mailchimp feliratkozás
    try {
      const MAILCHIMP_API_KEY = Deno.env.get('MAILCHIMP_API_KEY');
      const MAILCHIMP_SERVER = Deno.env.get('MAILCHIMP_SERVER_PREFIX');
      const AUDIENCE_ID = Deno.env.get('MAILCHIMP_AUDIENCE_ID');

      if (!MAILCHIMP_API_KEY || !MAILCHIMP_SERVER || !AUDIENCE_ID) {
        return c.json({ 
          success: false, 
          error: 'Email szolgáltatás nem elérhető' 
        }, 500);
      }

      const url = `https://${MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${btoa(`any:${MAILCHIMP_API_KEY}`)}`,
        },
        body: JSON.stringify({
          email_address: email.trim(),
          status: 'subscribed'
        }),
      });

      if (response.ok) {
        return c.json({ 
          success: true, 
          message: 'Sikeres feliratkozás' 
        });
      } else {
        const data = await response.json();
        if (response.status === 400 && data.title === 'Member Exists') {
          return c.json({ 
            success: false, 
            error: 'Ez az email cím már fel van iratkozva' 
          }, 400);
        } else {
          throw new Error(data.detail || 'Mailchimp hiba');
        }
      }
    } catch (error) {
      console.error('Mailchimp feliratkozási hiba:', error);
      return c.json({ 
        success: false, 
        error: 'Email feliratkozási hiba történt' 
      }, 500);
    }

  } catch (error) {
    console.error('Hírlevél feliratkozási hiba:', error);
    return c.json({ 
      success: false, 
      error: 'Szerver hiba történt' 
    }, 500);
  }
});

// Konferencia regisztrációk számának lekérdezése
app.get('/make-server-4ed24ea8/conference/:conferenceId/registrations', async (c) => {
  try {
    const conferenceId = c.req.param('conferenceId');
    
    const registrations = await kv.getByPrefix(`conference_registration:`);
    const conferenceRegistrations = registrations.filter(
      reg => reg?.conferenceId === conferenceId
    );
    
    return c.json({ 
      success: true, 
      count: conferenceRegistrations.length,
      conferenceId
    });
  } catch (error) {
    console.error('Regisztrációk lekérdezési hiba:', error);
    return c.json({ 
      success: false, 
      error: 'Szerver hiba történt',
      count: 0
    }, 500);
  }
});

// Admin endpoint - összes regisztráció lekérdezése
app.get('/make-server-4ed24ea8/admin/registrations', async (c) => {
  try {
    const registrations = await kv.getByPrefix(`conference_registration:`);
    
    // Rendezzük időrendben (legújabb először)
    const sortedRegistrations = registrations.sort((a, b) => {
      const dateA = new Date(a.registeredAt || 0);
      const dateB = new Date(b.registeredAt || 0);
      return dateB.getTime() - dateA.getTime();
    });
    
    return c.json({ 
      success: true, 
      registrations: sortedRegistrations,
      count: sortedRegistrations.length
    });
  } catch (error) {
    console.error('Admin regisztrációk lekérdezési hiba:', error);
    return c.json({ 
      success: false, 
      error: 'Szerver hiba történt',
      registrations: [],
      count: 0
    }, 500);
  }
});

// Health check endpoint
app.get('/make-server-4ed24ea8/health', (c) => {
  return c.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Default route
app.get('/', (c) => {
  return c.text('Tozsdeforum.hu Backend Server v1.0');
});

Deno.serve(app.fetch);