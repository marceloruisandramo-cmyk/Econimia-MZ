import React from 'react';
import { Bookmark, Clock, ArrowUpRight, Flame } from 'lucide-react';
import { NewsArticle } from '../types';

interface HeroLeadArticleProps {
  article: NewsArticle;
  onReadArticle: (article: NewsArticle) => void;
  isSaved: boolean;
  onToggleSave: (articleId: string, e: React.MouseEvent) => void;
}

export const HeroLeadArticle: React.FC<HeroLeadArticleProps> = ({
  article,
  onReadArticle,
  isSaved,
  onToggleSave,
}) => {
  return (
    <article
      id={`hero-article-${article.id}`}
      onClick={() => onReadArticle(article)}
      className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left / Top: Editorial Copy */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between order-2 lg:order-1">
          <div>
            {/* Category, Badge & Meta */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 rounded">
                  {article.categoryLabel}
                </span>
                {article.isBreaking && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase px-2 py-0.5 rounded bg-rose-100 text-rose-700">
                    <Flame className="w-3 h-3 text-rose-600" />
                    Destaque
                  </span>
                )}
              </div>

              <button
                id={`save-hero-${article.id}`}
                onClick={(e) => onToggleSave(article.id, e)}
                title={isSaved ? 'Remover dos salvos' : 'Salvar para ler depois'}
                className={`p-2 rounded-full border transition-colors ${
                  isSaved
                    ? 'bg-amber-500 text-white border-amber-500'
                    : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-slate-950 group-hover:text-amber-900 transition-colors leading-tight mb-3">
              {article.title}
            </h2>

            {/* Subtitle */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
              {article.subtitle}
            </p>

            {/* Key Bullet Takeaways Box */}
            {article.keyTakeaways && article.keyTakeaways.length > 0 && (
              <div className="bg-slate-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6 text-sm text-slate-700 space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900 block mb-1">
                  Pontos Centrais da Análise:
                </span>
                <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm text-slate-700">
                  {article.keyTakeaways.slice(0, 2).map((point, idx) => (
                    <li key={idx} className="leading-snug">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Author & Read Time Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2.5">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover border border-slate-200"
              />
              <div>
                <span className="font-bold text-slate-900 block">{article.author.name}</span>
                <span className="text-slate-500 text-[11px]">{article.author.role}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {article.readTimeMinutes} min de leitura
              </span>
              <span className="text-amber-700 font-semibold group-hover:underline flex items-center">
                Ler matéria <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
              </span>
            </div>
          </div>
        </div>

        {/* Right / Bottom: Hero Image */}
        <div className="lg:col-span-5 relative order-1 lg:order-2 bg-slate-100 min-h-[260px] lg:min-h-full">
          <img
            src={article.leadImage}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
          />
          {article.imageCaption && (
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent p-3 text-[11px] text-slate-200 backdrop-blur-xs">
              {article.imageCaption}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
