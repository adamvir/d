import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Alert, AlertDescription } from "./ui/alert";
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function EmailTestComponent() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const testEmail = async () => {
    if (!email) {
      setResult({ success: false, error: 'Email cím kötelező' });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-4ed24ea8/test-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ email })
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

  return (
    <div className="max-w-md mx-auto p-6 bg-card border rounded-lg">
      <h3 className="text-lg font-medium mb-4">Email API Teszt</h3>
      
      <div className="space-y-4">
        <div>
          <Input
            type="email"
            placeholder="test@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>
        
        <Button 
          onClick={testEmail}
          disabled={isLoading || !email}
          className="w-full"
        >
          {isLoading ? 'Küldés...' : 'Teszt Email Küldése'}
        </Button>
        
        {result && (
          <Alert className={result.success ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}>
            <AlertDescription>
              <div className="space-y-2">
                <p className={result.success ? 'text-green-700' : 'text-red-700'}>
                  {result.success ? '✓ Siker' : '✗ Hiba'}: {result.message || result.error}
                </p>
                {result.resendResponse && (
                  <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
                    {JSON.stringify(result.resendResponse, null, 2)}
                  </pre>
                )}
                {result.resendError && (
                  <pre className="text-xs bg-red-100 p-2 rounded overflow-auto">
                    {JSON.stringify(result.resendError, null, 2)}
                  </pre>
                )}
                {result.details && (
                  <p className="text-xs text-gray-600">{result.details}</p>
                )}
              </div>
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}