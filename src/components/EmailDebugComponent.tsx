import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Alert, AlertDescription } from "./ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function EmailDebugComponent() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  const checkResendStatus = async () => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-4ed24ea8/debug/resend`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      const data = await response.json();
      setDebugInfo(data);
    } catch (error) {
      setDebugInfo({ error: error.toString() });
    }
  };

  const testRegistration = async () => {
    if (!email) {
      setResult({ success: false, error: 'Email cím kötelező' });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-4ed24ea8/conference/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          name: 'Test User',
          phone: '+36 30 123 4567',
          email: email,
          newsletterConsent: false,
          conferenceId: '1'
        })
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ 
        success: false, 
        error: 'Hálózati hiba', 
        details: error.toString() 
      });
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    checkResendStatus();
  }, []);

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Badge variant="outline">Debug</Badge>
          Email Teszt és Debug
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Resend API Status */}
        <div className="space-y-2">
          <h4 className="font-medium">Resend API Státusz</h4>
          {debugInfo ? (
            <Alert className={debugInfo.hasResendKey ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}>
              <AlertDescription>
                <div className="space-y-1">
                  <p className={debugInfo.hasResendKey ? 'text-green-700' : 'text-red-700'}>
                    API Kulcs: {debugInfo.hasResendKey ? '✓ Elérhető' : '✗ Hiányzik'}
                  </p>
                  {debugInfo.hasResendKey && (
                    <p className="text-xs text-gray-600">
                      Kulcs hossz: {debugInfo.keyLength} | Prefix: {debugInfo.keyPrefix}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    Ellenőrzés: {new Date(debugInfo.timestamp).toLocaleString('hu-HU')}
                  </p>
                </div>
              </AlertDescription>
            </Alert>
          ) : (
            <div className="text-sm text-gray-500">Betöltés...</div>
          )}
        </div>

        {/* Email Test */}
        <div className="space-y-4">
          <h4 className="font-medium">Regisztráció és Email Teszt</h4>
          
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="test@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              onClick={testRegistration}
              disabled={isLoading || !email}
            >
              {isLoading ? 'Teszt...' : 'Regisztráció Teszt'}
            </Button>
          </div>
          
          {result && (
            <Alert className={result.success ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}>
              <AlertDescription>
                <div className="space-y-2">
                  <p className={result.success ? 'text-green-700' : 'text-red-700'}>
                    {result.success ? '✓ Sikeres regisztráció' : '✗ Hiba'}: {result.message || result.error}
                  </p>
                  {result.success && (
                    <div className="text-xs space-y-1">
                      <p>Email küldés: {result.emailSent ? '✓ Sikeres' : '✗ Sikertelen'}</p>
                      {result.registrationId && <p>Regisztráció ID: {result.registrationId}</p>}
                      {result.newsletterResult && <p>Hírlevél: {result.newsletterResult}</p>}
                    </div>
                  )}
                  {result.details && (
                    <p className="text-xs text-gray-600">{result.details}</p>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="text-xs text-gray-500 border-t pt-4 space-y-2">
          <p>Ez a debug komponens csak development módban érhető el.</p>
          <p>A teszt egy valódi regisztrációt hajt végre "Test User" névvel.</p>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 p-3 rounded text-yellow-800 dark:text-yellow-200">
            <p className="font-medium">⚠ Resend Email Korlátozások:</p>
            <ul className="mt-1 space-y-1 text-xs">
              <li>• Sandbox módban csak verifikált email címekre lehet küldeni</li>
              <li>• A tozsdeforum.hu domain verifikációra szorul</li>
              <li>• Jelenleg fallback: onboarding@resend.dev</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}