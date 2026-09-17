import React from 'react';
import { AlertCircle, ChevronRight } from 'lucide-react';
import { NewsArticle } from '../types';

interface BreakingNewsBarProps {
  breakingArticle?: NewsArticle;
  onReadArticle: (article: NewsArticle) => void;
}

export const BreakingNewsBar: React.FC<BreakingNewsBarProps> = ({ breakingArticle, onReadArticle }) => {
  if (!breakingArticle) return null;

  return (
    <div className="bg-amber-50 border-y border-amber-200 py-2.5 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-2.5 flex-1 min-w-[280px]">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-bold uppercase bg-amber-600 text-white tracking-wider animate-pulse shrink-0">
            <AlertCircle className="w-3.5 h-3.5" />
            Plantão Econômico
          </span>
          <p className="text-slate-800 font-medium line-clamp-1 text-xs sm:text-sm">
            <span className="text-slate-500 mr-2">[{breakingArticle.publishedAt}]</span>
            {breakingArticle.title}
          </p>
        </div>

        <button
          id="read-breaking-btn"
          onClick={() => onReadArticle(breakingArticle)}
          className="inline-flex items-center gap-1 text-xs font-bold text-amber-900 hover:text-amber-700 bg-amber-200/70 hover:bg-amber-200 px-2.5 py-1 rounded transition-colors cursor-pointer shrink-0"
        >
          <span>Ler cobertura</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
