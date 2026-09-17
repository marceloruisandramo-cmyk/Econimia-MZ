import React from 'react';
import { TrendingUp, ShieldAlert, Globe, Award } from 'lucide-react';
import { NewsCategory } from '../types';

interface FooterProps {
  onSelectCategory: (cat: NewsCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2 text-white">
              <div className="w-7 h-7 rounded-md bg-amber-500 text-slate-950 flex items-center justify-center font-black">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span className="font-serif font-black text-lg text-white uppercase tracking-tight">
                Notícias de Economia
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Jornalismo econômico e financeiro com rigor técnico, dados em tempo real e análises independentes sobre os rumos dos mercados no Brasil e no mundo.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Compromisso com a precisão dos dados</span>
            </div>
          </div>

          {/* Categorias Editoriais */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3 font-mono">
              Seções
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onSelectCategory('mercados')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Mercados & Bolsa (B3)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('macroeconomia')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Macroeconomia & Copom
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('cambio')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Câmbio, Dólar e Juros
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('empresas')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Empresas & Negócios
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('agro')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Agronegócio & Commodities
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('financas')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Finanças Pessoais & Renda Fixa
                </button>
              </li>
            </ul>
          </div>

          {/* Indicadores do Mercado */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3 font-mono">
              Indicadores Principais
            </h4>
            <ul className="space-y-1.5 font-mono text-[11px]">
              <li className="flex justify-between border-b border-slate-900 pb-1">
                <span>Ibovespa</span>
                <span className="text-emerald-400">134.920 pts (+0,74%)</span>
              </li>
              <li className="flex justify-between border-b border-slate-900 pb-1">
                <span>Dólar PTAX</span>
                <span className="text-rose-400">R$ 5,432 (-0,42%)</span>
              </li>
              <li className="flex justify-between border-b border-slate-900 pb-1">
                <span>Taxa Selic Meta</span>
                <span className="text-slate-300">10,75% a.a.</span>
              </li>
              <li className="flex justify-between border-b border-slate-900 pb-1">
                <span>IPCA Acumulado 12m</span>
                <span className="text-slate-300">4,24%</span>
              </li>
              <li className="flex justify-between border-b border-slate-900 pb-1">
                <span>S&P 500</span>
                <span className="text-emerald-400">5.634 pts (+0,51%)</span>
              </li>
            </ul>
          </div>

          {/* Disclaimer & Legal */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3 font-mono flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
              Aviso Legal & Fontes
            </h4>
            <p className="text-[11px] leading-relaxed text-slate-400">
              As informações contidas neste portal têm finalidade estritamente jornalística e informativa. As cotações de ativos e taxas de juros são disponibilizadas com base em dados de mercado (B3, Banco Central do Brasil, IBGE) e não constituem recomendação de investimento.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <Globe className="w-3 h-3" />
              <span>Cobertura de mercados nacional e global</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} Notícias de Economia. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-200">Termos de Uso</span>
            <span>•</span>
            <span className="hover:text-slate-200">Política de Privacidade</span>
            <span>•</span>
            <span className="hover:text-slate-200">Expediente Editorial</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
