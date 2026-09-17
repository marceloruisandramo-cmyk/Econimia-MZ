import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { MarketTicker } from './components/MarketTicker';
import { BreakingNewsBar } from './components/BreakingNewsBar';
import { HeroLeadArticle } from './components/HeroLeadArticle';
import { ArticleCard } from './components/ArticleCard';
import { EconomyToolsWidget } from './components/EconomyToolsWidget';
import { ArticleModal } from './components/ArticleModal';
import { SavedArticlesModal } from './components/SavedArticlesModal';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { ARTICLES_DATA, INITIAL_INDICATORS } from './data/mockData';
import { NewsArticle, NewsCategory, MarketIndicator } from './types';
import { Calendar, TrendingUp, AlertTriangle, Filter, Sparkles } from 'lucide-react';

export default function App() {
  const [articles] = useState<NewsArticle[]>(ARTICLES_DATA);
  const [indicators, setIndicators] = useState<MarketIndicator[]>(INITIAL_INDICATORS);
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState<boolean>(false);

  // LocalStorage persistence for saved articles
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('economia_noticias_salvas');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('economia_noticias_salvas', JSON.stringify(savedIds));
    } catch (e) {
      console.warn('Falha ao salvar no localStorage', e);
    }
  }, [savedIds]);

  const toggleSaveArticle = (articleId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedIds((prev) =>
      prev.includes(articleId) ? prev.filter((id) => id !== articleId) : [...prev, articleId]
    );
  };

  const clearAllSaved = () => {
    setSavedIds([]);
  };

  // Quotes Refresh Simulation
  const handleRefreshQuotes = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIndicators((prev) =>
        prev.map((item) => {
          if (item.id === 'selic') return item; // Selic is set by Copom
          const deltaFactor = (Math.random() - 0.48) * 0.004; // small fluctuation
          const newValue = Number((item.value * (1 + deltaFactor)).toFixed(item.id === 'dolar' || item.id === 'euro' ? 3 : 2));
          const newChange = Number((item.changePercent + (Math.random() - 0.49) * 0.1).toFixed(2));
          return {
            ...item,
            value: newValue,
            formattedValue:
              item.id === 'dolar' || item.id === 'euro'
                ? `R$ ${newValue.toFixed(3).replace('.', ',')}`
                : item.id === 'btc'
                ? `$ ${newValue.toLocaleString('pt-BR')}`
                : item.id === 'ibov'
                ? `${newValue.toLocaleString('pt-BR')} pts`
                : item.id === 'sp500'
                ? `${newValue.toLocaleString('pt-BR')} pts`
                : `${newValue}`,
            changePercent: newChange,
            trend: newChange > 0 ? 'up' : newChange < 0 ? 'down' : 'neutral',
            history: [...item.history.slice(1), newValue],
          };
        })
      );
      setIsRefreshing(false);
    }, 600);
  };

  // Filtered articles based on category and search query
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchCategory = selectedCategory === 'todas' || article.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchCategory;

      const matchSearch =
        article.title.toLowerCase().includes(q) ||
        article.subtitle.toLowerCase().includes(q) ||
        article.tags.some((t) => t.toLowerCase().includes(q)) ||
        article.author.name.toLowerCase().includes(q);

      return matchCategory && matchSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  // Lead breaking article
  const breakingArticle = useMemo(() => {
    return articles.find((a) => a.isBreaking) || articles[0];
  }, [articles]);

  // Hero article for frontpage
  const heroArticle = useMemo(() => {
    if (selectedCategory !== 'todas' || searchQuery) {
      return filteredArticles[0] || null;
    }
    return articles.find((a) => a.isFeatured) || articles[0];
  }, [articles, selectedCategory, searchQuery, filteredArticles]);

  // Secondary highlights
  const secondaryArticles = useMemo(() => {
    if (!heroArticle) return filteredArticles;
    return filteredArticles.filter((a) => a.id !== heroArticle.id);
  }, [filteredArticles, heroArticle]);

  // Trending articles for the sidebar
  const trendingArticles = useMemo(() => {
    return [...articles].sort((a, b) => b.viewsCount - a.viewsCount).slice(0, 4);
  }, [articles]);

  const savedArticlesList = useMemo(() => {
    return articles.filter((a) => savedIds.includes(a.id));
  }, [articles, savedIds]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-amber-200 selection:text-slate-900 font-sans">
      {/* 1. Masthead & Header */}
      <Header
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        savedCount={savedIds.length}
        onOpenSavedModal={() => setIsSavedModalOpen(true)}
        onRefreshQuotes={handleRefreshQuotes}
        isRefreshing={isRefreshing}
        marketOpen={true}
      />

      {/* 2. Live Market Ticker */}
      <MarketTicker indicators={indicators} />

      {/* 3. Breaking News Plantão Alert */}
      <BreakingNewsBar breakingArticle={breakingArticle} onReadArticle={setActiveArticle} />

      {/* 4. Main Body Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Active Filter Bar (when searching or category selected) */}
        {(selectedCategory !== 'todas' || searchQuery) && (
          <div className="mb-6 p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-500" />
              <span className="text-xs sm:text-sm font-semibold text-slate-700">
                Filtro ativo:{' '}
                <strong className="text-slate-950 font-bold uppercase">
                  {selectedCategory !== 'todas' ? selectedCategory : 'Busca Livre'}
                </strong>
                {searchQuery && (
                  <span className="text-slate-600 font-normal ml-1">
                    para termos &ldquo;{searchQuery}&rdquo;
                  </span>
                )}
              </span>
              <span className="bg-slate-100 text-slate-700 text-xs px-2 py-0.5 rounded-full font-medium ml-1">
                {filteredArticles.length} {filteredArticles.length === 1 ? 'notícia' : 'notícias'}
              </span>
            </div>

            <button
              onClick={() => {
                setSelectedCategory('todas');
                setSearchQuery('');
              }}
              className="text-xs text-amber-800 hover:text-amber-950 font-bold underline cursor-pointer"
            >
              Limpar filtros
            </button>
          </div>
        )}

        {/* Empty State when search returns no news */}
        {filteredArticles.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center my-6">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-3 stroke-1" />
            <h3 className="text-lg font-bold font-serif text-slate-900 mb-1">
              Nenhuma notícia encontrada
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mb-4">
              Não encontramos resultados para sua pesquisa. Tente palavras-chave mais genéricas como
              &ldquo;Selic&rdquo;, &ldquo;Dólar&rdquo;, &ldquo;Bolsa&rdquo; ou &ldquo;Copom&rdquo;.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('todas');
                setSearchQuery('');
              }}
              className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Ver todas as notícias
            </button>
          </div>
        )}

        {/* Normal Newspaper Grid */}
        {filteredArticles.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Main Column: Lead News & Feed */}
            <div className="lg:col-span-8 space-y-8">
              {/* Primary Lead Article */}
              {heroArticle && (
                <section aria-label="Manchete Principal">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2.5 h-2.5 rounded-xs bg-amber-500" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
                      Manchete em Destaque
                    </h3>
                  </div>
                  <HeroLeadArticle
                    article={heroArticle}
                    onReadArticle={setActiveArticle}
                    isSaved={savedIds.includes(heroArticle.id)}
                    onToggleSave={toggleSaveArticle}
                  />
                </section>
              )}

              {/* Secondary Grid (Two Columns of Cards) */}
              {secondaryArticles.length > 0 && (
                <section aria-label="Notícias Principais">
                  <div className="flex items-center justify-between pb-2 mb-4 border-b border-slate-200">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-mono flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-xs bg-slate-900" />
                      Destaques do Noticiário Econômico
                    </h3>
                    <span className="text-xs text-slate-500 font-medium">
                      Atualizado em tempo real
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {secondaryArticles.slice(0, 4).map((article) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        onReadArticle={setActiveArticle}
                        isSaved={savedIds.includes(article.id)}
                        onToggleSave={toggleSaveArticle}
                        variant="vertical"
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Horizontal Extended Feed */}
              {secondaryArticles.length > 4 && (
                <section aria-label="Outras Notícias" className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                    <span className="w-2.5 h-2.5 rounded-xs bg-amber-600" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-mono">
                      Análises & Aprofundamento
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {secondaryArticles.slice(4).map((article) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        onReadArticle={setActiveArticle}
                        isSaved={savedIds.includes(article.id)}
                        onToggleSave={toggleSaveArticle}
                        variant="horizontal"
                      />
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Sidebar: Tools, Trending, and Agenda */}
            <div className="lg:col-span-4 space-y-6">
              {/* 1. Interactive Financial Tools Widget */}
              <EconomyToolsWidget />

              {/* 2. Mais Lidas dos Mercados (Trending List) */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-amber-500" />
                    Mais Lidas Hoje
                  </h3>
                  <span className="text-[11px] text-slate-400 font-mono">Top 4</span>
                </div>

                <div className="space-y-3 divide-y divide-slate-100">
                  {trendingArticles.map((art, index) => (
                    <div
                      key={art.id}
                      onClick={() => setActiveArticle(art)}
                      className="pt-3 first:pt-0 cursor-pointer group flex items-start gap-3"
                    >
                      <span className="font-serif font-black text-2xl text-slate-300 group-hover:text-amber-500 transition-colors leading-none w-5">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold uppercase text-amber-800 tracking-wider block mb-0.5">
                          {art.categoryLabel}
                        </span>
                        <h4 className="text-xs sm:text-sm font-serif font-bold text-slate-900 group-hover:text-amber-900 transition-colors leading-snug line-clamp-2">
                          {art.title}
                        </h4>
                        <span className="text-[11px] text-slate-400 mt-1 block">
                          {art.viewsCount.toLocaleString('pt-BR')} leituras
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Agenda Econômica da Semana */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-700" />
                    Agenda Econômica
                  </h3>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono">
                    Próximos Dias
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between font-bold text-slate-900 mb-0.5">
                      <span>Boletim Focus (BCB)</span>
                      <span className="font-mono text-amber-800 text-[11px]">Seg • 08h25</span>
                    </div>
                    <p className="text-slate-500 text-[11px]">
                      Projeções do mercado financeiro para PIB, IPCA, Câmbio e Selic.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between font-bold text-slate-900 mb-0.5">
                      <span>Decisão do Copom</span>
                      <span className="font-mono text-amber-800 text-[11px]">Qua • 18h30</span>
                    </div>
                    <p className="text-slate-500 text-[11px]">
                      Comitê de Política Monetária anuncia nova meta da taxa básica Selic.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between font-bold text-slate-900 mb-0.5">
                      <span>Divulgação IPCA-15 (IBGE)</span>
                      <span className="font-mono text-amber-800 text-[11px]">Sex • 09h00</span>
                    </div>
                    <p className="text-slate-500 text-[11px]">
                      Prévia da inflação oficial do mês com impacto direto no custo de vida.
                    </p>
                  </div>
                </div>
              </div>

              {/* 4. Editorial Integrity Box */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 text-xs text-amber-950">
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>Cobertura Econômica Independente</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Todas as notícias são apuradas por analistas e jornalistas especializados com foco em dados públicos, relatórios oficiais e balanços corporativos auditados.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 5. Newsletter Signup Module */}
        <NewsletterSection />
      </main>

      {/* 6. Footer */}
      <Footer onSelectCategory={(cat) => setSelectedCategory(cat)} />

      {/* 7. Article Modal Reader View */}
      {activeArticle && (
        <ArticleModal
          article={activeArticle}
          onClose={() => setActiveArticle(null)}
          isSaved={savedIds.includes(activeArticle.id)}
          onToggleSave={toggleSaveArticle}
          allArticles={articles}
          onSelectArticle={setActiveArticle}
        />
      )}

      {/* 8. Saved Articles Modal */}
      <SavedArticlesModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedArticles={savedArticlesList}
        onSelectArticle={setActiveArticle}
        onRemoveSaved={(id) => setSavedIds((prev) => prev.filter((i) => i !== id))}
        onClearAll={clearAllSaved}
      />
    </div>
  );
}
