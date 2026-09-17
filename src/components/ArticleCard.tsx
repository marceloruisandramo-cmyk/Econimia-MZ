import React from 'react';
import { Bookmark, Clock, Flame } from 'lucide-react';
import { NewsArticle } from '../types';

interface ArticleCardProps {
  article: NewsArticle;
  onReadArticle: (article: NewsArticle) => void;
  isSaved: boolean;
  onToggleSave: (articleId: string, e: React.MouseEvent) => void;
  variant?: 'vertical' | 'horizontal' | 'compact';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onReadArticle,
  isSaved,
  onToggleSave,
  variant = 'vertical',
}) => {
  if (variant === 'compact') {
    return (
      <div
        id={`card-compact-${article.id}`}
        onClick={() => onReadArticle(article)}
        className="flex gap-3 py-3 border-b border-slate-100 last:border-b-0 cursor-pointer group"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
              {article.categoryLabel}
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-slate-400 text-xs">{article.publishedAt}</span>
          </div>
          <h4 className="text-sm font-serif font-bold text-slate-900 group-hover:text-amber-800 transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h4>
        </div>
        <div className="w-20 h-16 shrink-0 rounded-md overflow-hidden bg-slate-100">
          <img
            src={article.leadImage}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <article
        id={`card-horiz-${article.id}`}
        onClick={() => onReadArticle(article)}
        className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer group flex flex-col sm:flex-row"
      >
        <div className="sm:w-1/3 relative bg-slate-100 min-h-[160px]">
          <img
            src={article.leadImage}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          />
          {article.isTrending && (
            <span className="absolute top-2 left-2 inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-500 text-white shadow-xs">
              <Flame className="w-3 h-3" /> Mais lida
            </span>
          )}
        </div>

        <div className="sm:w-2/3 p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase text-amber-800 tracking-wider">
                {article.categoryLabel}
              </span>
              <button
                id={`save-btn-${article.id}`}
                onClick={(e) => onToggleSave(article.id, e)}
                title={isSaved ? 'Remover dos salvos' : 'Salvar para ler depois'}
                className="text-slate-400 hover:text-amber-600 p-1"
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />
              </button>
            </div>

            <h3 className="text-base sm:text-lg font-bold font-serif text-slate-900 group-hover:text-amber-900 transition-colors leading-snug mb-1.5 line-clamp-2">
              {article.title}
            </h3>

            <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 mb-3">
              {article.subtitle}
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>{article.author.name}</span>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readTimeMinutes} min
              </span>
              <span>•</span>
              <span>{article.publishedAt}</span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Standard Vertical Card
  return (
    <article
      id={`card-vert-${article.id}`}
      onClick={() => onReadArticle(article)}
      className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
    >
      <div>
        <div className="relative aspect-video bg-slate-100 overflow-hidden">
          <img
            src={article.leadImage}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
          />
          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-slate-900 bg-white/95 rounded backdrop-blur-xs shadow-xs">
            {article.categoryLabel}
          </span>
          <button
            id={`save-vert-${article.id}`}
            onClick={(e) => onToggleSave(article.id, e)}
            title={isSaved ? 'Remover dos salvos' : 'Salvar para ler depois'}
            className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-amber-600 shadow-xs transition-colors"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />
          </button>
        </div>

        <div className="p-4 sm:p-5">
          <h3 className="text-base sm:text-lg font-bold font-serif text-slate-900 group-hover:text-amber-900 transition-colors leading-snug mb-2 line-clamp-2">
            {article.title}
          </h3>

          <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed">
            {article.subtitle}
          </p>
        </div>
      </div>

      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="truncate max-w-[130px] font-medium text-slate-700">
          {article.author.name}
        </span>
        <div className="flex items-center gap-2 shrink-0">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readTimeMinutes} min
          </span>
          <span>•</span>
          <span>{article.publishedAt}</span>
        </div>
      </div>
    </article>
  );
};
