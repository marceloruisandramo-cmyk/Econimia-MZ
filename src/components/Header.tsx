import React from 'react';
import { Search, Bookmark, Clock, RefreshCw, X, TrendingUp } from 'lucide-react';
import { NewsCategory } from '../types';
import { CATEGORIES_LIST } from '../data/mockData';

interface HeaderProps {
  selectedCategory: NewsCategory;
  onSelectCategory: (cat: NewsCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  savedCount: number;
  onOpenSavedModal: () => void;
  onRefreshQuotes: () => void;
  isRefreshing: boolean;
  marketOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  savedCount,
  onOpenSavedModal,
  onRefreshQuotes,
  isRefreshing,
  marketOpen,
}) => {
  // Format current Brazilian date
  const todayFormatted = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  const capitalizedDate = todayFormatted.charAt(0).toUpperCase() + todayFormatted.slice(1);

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Date & Market Status */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {capitalizedDate}
            </span>

            <div className="flex items-center gap-2 border-l border-slate-700 pl-4">
              <span className="text-slate-400">B3 (São Paulo):</span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                {marketOpen ? 'Mercado Aberto' : 'Fechamento'}
              </span>
            </div>

            <div className="hidden md:flex items-center gap-2 text-slate-400 border-l border-slate-700 pl-4">
              <span>Ibovespa: <strong className="text-emerald-400">+0,74%</strong></span>
              <span className="text-slate-600">•</span>
              <span>Dólar: <strong className="text-rose-400">-0,42%</strong></span>
            </div>
          </div>

          {/* Saved Articles & Quick Actions */}
          <div className="flex items-center gap-3">
            <button
              id="refresh-quotes-btn"
              onClick={onRefreshQuotes}
              disabled={isRefreshing}
              title="Atualizar cotações do mercado"
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer py-1 px-2 rounded hover:bg-slate-800"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
              <span className="hidden sm:inline">Cotações</span>
            </button>

            <button
              id="open-saved-articles-btn"
              onClick={onOpenSavedModal}
              className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 px-2.5 py-1 rounded text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Salvos</span>
              {savedCount > 0 && (
                <span className="bg-amber-400 text-slate-900 font-bold px-1.5 py-0.2 rounded-full text-[10px]">
                  {savedCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Masthead Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Subtitle */}
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-amber-400 shadow-sm">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-950 uppercase font-serif">
                Notícias de Economia
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              Informação financeira fidedigna, cotações de mercado e análises macroeconômicas
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-80 relative">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                id="news-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Pesquisar notícias, Selic, ações..."
                className="w-full bg-slate-100 border border-slate-300 text-slate-900 text-sm rounded-lg pl-9 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  id="clear-search-btn"
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 text-slate-400 hover:text-slate-600 p-0.5"
                  title="Limpar busca"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Pills Navigation */}
        <nav aria-label="Categorias de notícias" className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES_LIST.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-btn-${cat.id}`}
                onClick={() => onSelectCategory(cat.id)}
                className={`whitespace-nowrap px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
