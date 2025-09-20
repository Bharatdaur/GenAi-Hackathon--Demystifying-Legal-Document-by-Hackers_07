
import React from 'react';

interface LegalInputProps {
  legalText: string;
  setLegalText: (text: string) => void;
  onDemystify: () => void;
  isLoading: boolean;
}

export const LegalInput: React.FC<LegalInputProps> = ({ legalText, setLegalText, onDemystify, isLoading }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
      <h3 className="text-xl font-semibold mb-4 text-slate-800">Your Legal Document</h3>
      <textarea
        value={legalText}
        onChange={(e) => setLegalText(e.target.value)}
        placeholder="Paste your legal document text here..."
        className="w-full h-80 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-y text-slate-700 leading-relaxed"
        disabled={isLoading}
      />
      <button
        onClick={onDemystify}
        disabled={isLoading}
        className="mt-4 w-full flex justify-center items-center bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors duration-300"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing...
          </>
        ) : (
          'Demystify Text'
        )}
      </button>
    </div>
  );
};
