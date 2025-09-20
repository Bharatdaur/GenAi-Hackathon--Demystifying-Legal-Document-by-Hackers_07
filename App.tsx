
import React, { useState, useCallback } from 'react';
import { LegalInput } from './components/LegalInput';
import { SimplifiedOutput } from './components/SimplifiedOutput';
import { demystifyLegalText } from './services/geminiService';
import { ScaleIcon } from './components/icons/ScaleIcon';

const App: React.FC = () => {
  const [legalText, setLegalText] = useState<string>('');
  const [simplifiedText, setSimplifiedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleDemystify = useCallback(async () => {
    if (!legalText.trim()) {
      setError('Please enter some legal text to analyze.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setSimplifiedText('');

    try {
      const result = await demystifyLegalText(legalText);
      setSimplifiedText(result);
    } catch (err) {
      setError('An error occurred while analyzing the document. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [legalText]);

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
          <ScaleIcon className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Legal Document Demystifier
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-slate-700">Understand Legal Jargon Instantly</h2>
            <p className="mt-2 text-lg text-slate-500 max-w-3xl mx-auto">
                Paste your complex legal text below, and our AI will translate it into simple, easy-to-understand language.
            </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <LegalInput
            legalText={legalText}
            setLegalText={setLegalText}
            onDemystify={handleDemystify}
            isLoading={isLoading}
          />
          <SimplifiedOutput
            simplifiedText={simplifiedText}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
      
      <footer className="text-center py-6 mt-8 text-slate-500 text-sm">
        <p>Disclaimer: This tool provides simplified explanations and is not a substitute for professional legal advice.</p>
        <p>&copy; 2024 AI Legal Tools Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
