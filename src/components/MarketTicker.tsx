import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';
import { MarketIndicator } from '../types';

interface MarketTickerProps {
  indicators: MarketIndicator[];
  onIndicatorClick?: (indicator: MarketIndicator) => void;
}

export const MarketTicker: React.FC<MarketTickerProps> = ({ indicators, onIndicatorClick }) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  return (
    <section aria-label="Indicadores do Mercado Financeiro" className="w-full bg-slate-900 border-b border-slate-800 text-white overflow-hidden shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center">
          {/* Label Badge */}
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-800 text-slate-300 px-3 py-2 text-xs font-semibold uppercase tracking-wider shrink-0 border-r border-slate-700">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            Mercados Hoje
          </div>

          {/* Scrolling / Flex indicators row */}
          <div className="flex-1 overflow-x-auto py-2.5 px-2 flex items-center gap-6 no-scrollbar">
            {indicators.map((ind) => {
              const isPositive = ind.changePercent > 0;
              const isNegative = ind.changePercent < 0;
              const isNeutral = ind.changePercent === 0;

              return (
                <div
                  key={ind.id}
                  id={`indicator-${ind.id}`}
                  onClick={() => {
                    setActiveTooltip(activeTooltip === ind.id ? null : ind.id);
                    if (onIndicatorClick) onIndicatorClick(ind);
                  }}
                  className="flex items-center gap-2.5 shrink-0 cursor-pointer group hover:bg-slate-800/80 px-2.5 py-1 rounded transition-colors relative"
                  title={`Clique para detalhes de ${ind.name}`}
                >
                  <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">
                    {ind.name}
                  </span>
                  <span className="text-xs font-mono font-medium text-slate-100">
                    {ind.formattedValue}
                  </span>

                  <span
                    className={`inline-flex items-center text-[11px] font-mono font-semibold px-1.5 py-0.5 rounded ${
                      isPositive
                        ? 'text-emerald-300 bg-emerald-950/70'
                        : isNegative
                        ? 'text-rose-300 bg-rose-950/70'
                        : 'text-slate-300 bg-slate-800'
                    }`}
                  >
                    {isPositive && <TrendingUp className="w-3 h-3 mr-0.5 inline" />}
                    {isNegative && <TrendingDown className="w-3 h-3 mr-0.5 inline" />}
                    {isNeutral && <Minus className="w-3 h-3 mr-0.5 inline" />}
                    {isPositive ? '+' : ''}
                    {ind.changePercent.toFixed(2)}%
                  </span>

                  {/* Popover indicator details if open */}
                  {activeTooltip === ind.id && (
                    <div
                      className="absolute left-0 top-full mt-2 z-50 w-64 bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs shadow-2xl text-slate-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <div className="font-bold text-white flex items-center gap-1">
                          <Info className="w-3.5 h-3.5 text-amber-400" />
                          {ind.name} ({ind.code})
                        </div>
                        <button
                          onClick={() => setActiveTooltip(null)}
                          className="text-slate-400 hover:text-white"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div>
                          <span className="text-slate-400 text-[10px]">Máx. 24h:</span>
                          <p className="font-mono text-white font-medium">{ind.high24h}</p>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px]">Mín. 24h:</span>
                          <p className="font-mono text-white font-medium">{ind.low24h}</p>
                        </div>
                      </div>

                      {/* Mini sparkline visualization */}
                      <div className="mt-3">
                        <span className="text-slate-400 text-[10px] block mb-1">Tendência Intradiária:</span>
                        <div className="flex items-end gap-1 h-6 pt-1">
                          {ind.history.map((val, idx) => {
                            const min = Math.min(...ind.history);
                            const max = Math.max(...ind.history);
                            const heightPercent = max === min ? 50 : Math.max(15, Math.min(100, ((val - min) / (max - min)) * 100));
                            return (
                              <div
                                key={idx}
                                style={{ height: `${heightPercent}%` }}
                                className={`flex-1 rounded-t-xs ${
                                  isPositive ? 'bg-emerald-400' : isNegative ? 'bg-rose-400' : 'bg-slate-400'
                                }`}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
