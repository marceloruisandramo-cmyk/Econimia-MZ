import React from 'react';
import { X, Bookmark, Trash2, ArrowRight } from 'lucide-react';
import { NewsArticle } from '../types';

interface SavedArticlesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
  onRemoveSaved: (articleId: string) => void;
  onClearAll: () => void;
}

export const SavedArticlesModal: React.FC<SavedArticlesModalProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onSelectArticle,
  onRemoveSaved,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-400 fill-amber-400" />
            <div>
              <h3 className="font-bold text-base sm:text-lg">Artigos Salvos</h3>
              <p className="text-xs text-slate-400">
                {savedArticles.length === 0
                  ? 'Nenhum artigo salvo'
                  : `${savedArticles.length} ${savedArticles.length === 1 ? 'notícia salva' : 'notícias salvas'} para leitura posterior`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-4 sm:p-6 divide-y divide-slate-100 flex-1">
          {savedArticles.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-3 stroke-1" />
              <p className="text-sm font-medium text-slate-700">Sua lista de leitura está vazia</p>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Clique no ícone de marcador em qualquer notícia para salvá-la e ler quando quiser.
              </p>
            </div>
          ) : (
            savedArticles.map((article) => (
              <div key={article.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 group">
                <div
                  onClick={() => {
                    onSelectArticle(article);
                    onClose();
                  }}
                  className="flex-1 cursor-pointer min-w-0"
                >
                  <span className="text-[10px] font-bold uppercase text-amber-800 tracking-wider">
                    {article.categoryLabel} • {article.publishedAt}
                  </span>
                  <h4 className="text-sm font-serif font-bold text-slate-900 group-hover:text-amber-800 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h4>
                  <span className="text-xs text-slate-400 mt-0.5 block">
                    {article.readTimeMinutes} min de leitura
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      onSelectArticle(article);
                      onClose();
                    }}
                    className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1"
                    title="Ler agora"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onRemoveSaved(article.id)}
                    className="p-1.5 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Remover"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {savedArticles.length > 0 && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs">
            <button
              onClick={onClearAll}
              className="text-rose-600 hover:text-rose-700 font-medium cursor-pointer"
            >
              Limpar todos
            </button>
            <span className="text-slate-500">Salvo no seu navegador</span>
          </div>
        )}
      </div>
    </div>
  );
};
