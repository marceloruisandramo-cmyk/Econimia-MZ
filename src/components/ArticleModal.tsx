import React, { useState, useEffect } from 'react';
import { X, Bookmark, Share2, Clock, Check, ChevronLeft, Calendar, Tag, ArrowRight } from 'lucide-react';
import { NewsArticle } from '../types';

interface ArticleModalProps {
  article: NewsArticle | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (articleId: string) => void;
  allArticles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  isSaved,
  onToggleSave,
  allArticles,
  onSelectArticle,
}) => {
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [copiedToast, setCopiedToast] = useState(false);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!article) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id && (a.category === article.category || article.relatedArticleIds?.includes(a.id)))
    .slice(0, 3);

  const fontSizeClasses = {
    sm: 'text-sm sm:text-base leading-relaxed',
    base: 'text-base sm:text-lg leading-relaxed',
    lg: 'text-lg sm:text-xl leading-relaxed',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      {/* Click outside to close container */}
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-article-title"
        className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-auto z-10 flex flex-col max-h-[92vh]"
      >
        {/* Modal Top Sticky Actions Bar */}
        <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <button
            id="close-article-back-btn"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 py-1.5 px-3 rounded-md transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Voltar às notícias</span>
          </button>

          <div className="flex items-center gap-2">
            {/* Font Size Adjuster */}
            <div className="flex items-center border border-slate-200 rounded-md overflow-hidden bg-slate-50 text-xs">
              <button
                onClick={() => setFontSize('sm')}
                title="Texto Menor"
                className={`px-2 py-1 font-bold ${fontSize === 'sm' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-200'}`}
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('base')}
                title="Texto Normal"
                className={`px-2 py-1 font-bold ${fontSize === 'base' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-200'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                title="Texto Maior"
                className={`px-2 py-1 font-bold ${fontSize === 'lg' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-200'}`}
              >
                A+
              </button>
            </div>

            {/* Bookmark button */}
            <button
              id="modal-bookmark-btn"
              onClick={() => onToggleSave(article.id)}
              className={`p-2 rounded-md border transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-amber-500 text-white border-amber-500'
                  : 'text-slate-600 hover:bg-slate-100 border-slate-200'
              }`}
              title={isSaved ? 'Remover dos salvos' : 'Salvar artigo'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            {/* Share button */}
            <button
              id="modal-share-btn"
              onClick={handleShare}
              className="p-2 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer relative"
              title="Compartilhar link"
            >
              {copiedToast ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              {copiedToast && (
                <span className="absolute -bottom-8 right-0 bg-slate-900 text-white text-[11px] font-semibold px-2 py-0.5 rounded shadow-lg whitespace-nowrap">
                  Link copiado!
                </span>
              )}
            </button>

            {/* Close button */}
            <button
              id="modal-close-x-btn"
              onClick={onClose}
              className="p-2 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors ml-1"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-6">
          {/* Header Metadata */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100 rounded">
                {article.categoryLabel}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {article.publishedAt}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {article.readTimeMinutes} min de leitura
              </span>
            </div>

            {/* Main Title */}
            <h1
              id="modal-article-title"
              className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif text-slate-950 leading-tight mb-4"
            >
              {article.title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal mb-6">
              {article.subtitle}
            </p>

            {/* Author Byline */}
            <div className="flex items-center gap-3 py-3 border-y border-slate-100">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                referrerPolicy="no-referrer"
                className="w-11 h-11 rounded-full object-cover border border-slate-200"
              />
              <div>
                <div className="text-sm font-bold text-slate-950">Por {article.author.name}</div>
                <div className="text-xs text-slate-500">{article.author.role}</div>
              </div>
            </div>
          </div>

          {/* Lead Photo */}
          <div className="rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
            <img
              src={article.leadImage}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-full max-h-[420px] object-cover"
            />
            {article.imageCaption && (
              <div className="p-3 bg-slate-50 text-xs text-slate-600 border-t border-slate-200 italic">
                Foto: {article.imageCaption}
              </div>
            )}
          </div>

          {/* Key Takeaways Box */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-5 my-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-950">
                  Pontos-Chave da Análise
                </h3>
              </div>
              <ul className="space-y-2 text-sm sm:text-base text-slate-800">
                {article.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-amber-700 font-bold mt-1">✓</span>
                    <span className="leading-snug">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Paragraphs */}
          <div className={`space-y-5 text-slate-800 font-serif ${fontSizeClasses[fontSize]}`}>
            {article.content.map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Article Tags */}
          <div className="pt-6 border-t border-slate-200">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-bold text-slate-500 uppercase">Tags:</span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-medium hover:bg-slate-200 cursor-default"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Related Articles Section */}
          {relatedArticles.length > 0 && (
            <div className="pt-8 border-t border-slate-200 mt-8">
              <h4 className="text-base font-bold font-serif text-slate-950 mb-4">
                Leia Também sobre Economia:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      onSelectArticle(rel);
                      // scroll to top of modal
                      const modalEl = document.querySelector('[role="dialog"] .overflow-y-auto');
                      if (modalEl) modalEl.scrollTop = 0;
                    }}
                    className="p-3 border border-slate-200 rounded-lg hover:border-amber-400 hover:shadow-xs transition-all cursor-pointer bg-slate-50 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase text-amber-800 tracking-wider block mb-1">
                        {rel.categoryLabel}
                      </span>
                      <h5 className="text-xs font-serif font-bold text-slate-900 line-clamp-2 leading-snug">
                        {rel.title}
                      </h5>
                    </div>
                    <div className="mt-3 text-[11px] text-amber-800 font-semibold flex items-center justify-between">
                      <span>{rel.readTimeMinutes} min</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
