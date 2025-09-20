import React, { useState } from 'react';
import { InfoIcon } from './icons/InfoIcon';
import { EyeIcon } from './icons/EyeIcon';
import { CodeIcon } from './icons/CodeIcon';

interface SimplifiedOutputProps {
  simplifiedText: string;
  isLoading: boolean;
  error: string | null;
}

const LoadingSkeleton: React.FC = () => (
    <div className="space-y-4 animate-pulse">
        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
        <div className="h-4 bg-slate-200 rounded"></div>
        <div className="h-4 bg-slate-200 rounded w-5/6"></div>
        <div className="h-4 bg-slate-200 rounded w-1/2"></div>
        <div className="h-4 bg-slate-200 rounded w-4/5 mt-6"></div>
        <div className="h-4 bg-slate-200 rounded"></div>
    </div>
);

const markdownToHtml = (markdown: string): string => {
    if (!markdown) return '';

    const processedMd = markdown
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/^## (.*$)/gim, '<h2 class="text-lg font-bold mt-4 mb-2">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-md font-semibold mt-3 mb-1">$1</h3>');

    const blocks = processedMd.split(/\n\s*\n/);
    const htmlBlocks = blocks.map(block => {
        if (block.startsWith('<h')) {
            return block;
        }
        if (block.match(/^\* /m)) {
            const items = block.split('\n').map(item => `<li class="ml-4 list-disc">${item.replace(/^\* /, '')}</li>`).join('');
            return `<ul>${items}</ul>`;
        }
        return `<p>${block.replace(/\n/g, '<br>')}</p>`;
    });

    return htmlBlocks.join('');
};

export const SimplifiedOutput: React.FC<SimplifiedOutputProps> = ({ simplifiedText, isLoading, error }) => {
  const [viewMode, setViewMode] = useState<'formatted' | 'raw'>('formatted');
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  
  const renderContent = () => {
    if (isLoading) {
      return <LoadingSkeleton />;
    }
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center text-center text-red-600 p-4 bg-red-50 rounded-lg border border-red-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="font-semibold">Analysis Failed</p>
          <p>{error}</p>
        </div>
      );
    }
    if (simplifiedText) {
      const fontClass = { sm: 'text-sm', base: 'text-base', lg: 'text-lg' }[fontSize];
      if (viewMode === 'formatted') {
        return (
          <div
            className={`prose prose-slate max-w-none text-slate-700 ${fontClass}`}
            dangerouslySetInnerHTML={{ __html: markdownToHtml(simplifiedText) }}
          />
        );
      }
      return (
        <pre className={`whitespace-pre-wrap font-mono bg-slate-100 p-3 rounded text-slate-800 ${fontClass}`}>
          <code>{simplifiedText}</code>
        </pre>
      );
    }
    return (
        <div className="flex flex-col items-center justify-center text-center text-slate-500 p-4">
            <InfoIcon className="h-12 w-12 mb-3 text-slate-400" />
            <h4 className="font-semibold text-lg text-slate-600">Waiting for Analysis</h4>
            <p>Your simplified explanation will appear here once you submit a document.</p>
        </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 min-h-[476px] flex flex-col">
      <div className="flex-shrink-0 flex justify-between items-center mb-4 flex-wrap gap-2">
        <h3 className="text-xl font-semibold text-slate-800">Simplified Explanation</h3>
        {simplifiedText && !isLoading && !error && (
            <div className="flex items-center space-x-3">
                <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg p-0.5" role="group">
                    <button onClick={() => setFontSize('sm')} className={`px-2 py-1 text-xs font-bold rounded-md transition-colors ${fontSize === 'sm' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:bg-slate-200'}`} aria-label="Small text">A-</button>
                    <button onClick={() => setFontSize('base')} className={`px-2 py-1 text-sm font-bold rounded-md transition-colors ${fontSize === 'base' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:bg-slate-200'}`} aria-label="Medium text">A</button>
                    <button onClick={() => setFontSize('lg')} className={`px-2 py-1 text-base font-bold rounded-md transition-colors ${fontSize === 'lg' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:bg-slate-200'}`} aria-label="Large text">A+</button>
                </div>
                <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg p-0.5" role="group">
                    <button onClick={() => setViewMode('formatted')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'formatted' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:bg-slate-200'}`} aria-label="Formatted view" aria-pressed={viewMode === 'formatted'}>
                        <EyeIcon className="h-4 w-4" />
                    </button>
                    <button onClick={() => setViewMode('raw')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'raw' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:bg-slate-200'}`} aria-label="Raw markdown view" aria-pressed={viewMode === 'raw'}>
                        <CodeIcon className="h-4 w-4" />
                    </button>
                </div>
            </div>
        )}
      </div>
      <div className="flex-grow p-4 bg-slate-50 rounded-lg overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};