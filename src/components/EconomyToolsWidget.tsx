import React, { useState } from 'react';
import { ArrowRightLeft, Calculator, Percent, TrendingUp, Info } from 'lucide-react';
import { CURRENCY_RATES } from '../data/mockData';

export const EconomyToolsWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cambio' | 'rendimento'>('cambio');

  // Conversor State
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('BRL');

  // Rendimento State
  const [investAmount, setInvestAmount] = useState<number>(5000);
  const [investMonths, setInvestMonths] = useState<number>(12);

  // Conversion Calculation
  const fromRate = CURRENCY_RATES.find((c) => c.code === fromCurrency)?.rateToBRL || 1;
  const toRate = CURRENCY_RATES.find((c) => c.code === toCurrency)?.rateToBRL || 1;
  const convertedValue = (amount * fromRate) / toRate;

  // Rendimento Calculation (Selic atual ~10,75% a.a. vs Poupança ~6,17% a.a.)
  const annualSelic = 0.1075;
  const annualPoupanca = 0.0617;
  // Approximations with IR brackets
  const irRate = investMonths <= 6 ? 0.225 : investMonths <= 12 ? 0.20 : 0.175;
  
  const monthlySelic = Math.pow(1 + annualSelic, 1 / 12) - 1;
  const grossSelicReturn = investAmount * (Math.pow(1 + monthlySelic, investMonths) - 1);
  const netSelicProfit = grossSelicReturn * (1 - irRate);
  const totalSelic = investAmount + netSelicProfit;

  const monthlyPoupanca = Math.pow(1 + annualPoupanca, 1 / 12) - 1;
  const poupancaProfit = investAmount * (Math.pow(1 + monthlyPoupanca, investMonths) - 1);
  const totalPoupanca = investAmount + poupancaProfit;

  const difference = netSelicProfit - poupancaProfit;

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
      {/* Header with Tabs */}
      <div className="bg-slate-900 p-4 text-white">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Ferramentas Financeiras
            </span>
          </div>
          <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
            Dados B3 & BCB
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-950 rounded-lg text-xs font-semibold">
          <button
            id="tab-cambio-btn"
            onClick={() => setActiveTab('cambio')}
            className={`py-1.5 px-3 rounded-md transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'cambio'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            Conversor de Câmbio
          </button>
          <button
            id="tab-rendimento-btn"
            onClick={() => setActiveTab('rendimento')}
            className={`py-1.5 px-3 rounded-md transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'rendimento'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Percent className="w-3.5 h-3.5" />
            Selic vs Poupança
          </button>
        </div>
      </div>

      {/* Tab 1: Conversor de Moedas */}
      {activeTab === 'cambio' && (
        <div className="p-4 sm:p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Valor a Converter:
            </label>
            <div className="relative">
              <input
                id="currency-amount-input"
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-base font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 items-center">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">De:</label>
              <select
                id="from-currency-select"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                {CURRENCY_RATES.map((curr) => (
                  <option key={curr.code} value={curr.code}>
                    {curr.code} - {curr.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Para:</label>
              <select
                id="to-currency-select"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                {CURRENCY_RATES.map((curr) => (
                  <option key={curr.code} value={curr.code}>
                    {curr.code} - {curr.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Result Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
            <span className="text-[11px] text-slate-500 font-medium block">Resultado Estimado:</span>
            <p className="text-xl sm:text-2xl font-black font-mono text-slate-950 mt-0.5">
              {toCurrency === 'BTC'
                ? `₿ ${convertedValue.toFixed(6)}`
                : `${toCurrency} ${convertedValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            </p>
            <span className="text-[10px] text-slate-500 mt-1 block">
              1 {fromCurrency} = {(fromRate / toRate).toFixed(4)} {toCurrency}
            </span>
          </div>
        </div>
      )}

      {/* Tab 2: Simulador Selic vs Poupança */}
      {activeTab === 'rendimento' && (
        <div className="p-4 sm:p-5 space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Valor do Aporte:
              </label>
              <span className="text-xs font-mono font-bold text-slate-900">
                R$ {investAmount.toLocaleString('pt-BR')}
              </span>
            </div>
            <div className="flex gap-1.5 mb-2">
              {[1000, 5000, 20000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setInvestAmount(val)}
                  className={`text-[11px] py-1 px-2 rounded border font-medium cursor-pointer ${
                    investAmount === val
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  R$ {val >= 1000 ? `${val / 1000} mil` : val}
                </button>
              ))}
            </div>
            <input
              type="range"
              min="500"
              max="100000"
              step="500"
              value={investAmount}
              onChange={(e) => setInvestAmount(Number(e.target.value))}
              className="w-full accent-slate-900 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Prazo:
              </label>
              <span className="text-xs font-bold text-slate-900">
                {investMonths} meses ({investMonths / 12} {investMonths === 12 ? 'ano' : 'anos'})
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[6, 12, 24].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setInvestMonths(m)}
                  className={`py-1 rounded text-xs font-semibold cursor-pointer border ${
                    investMonths === m
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {m} meses
                </button>
              ))}
            </div>
          </div>

          {/* Comparative Results */}
          <div className="space-y-2 pt-1">
            <div className="p-2.5 rounded-lg border border-emerald-200 bg-emerald-50/60">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-emerald-950 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  Tesouro Selic / 100% CDI
                </span>
                <span className="font-mono font-bold text-emerald-900">
                  R$ {totalSelic.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <span className="text-[10px] text-emerald-700 block mt-0.5">
                Rendimento Líquido: +R$ {netSelicProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (já descontado IR)
              </span>
            </div>

            <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-slate-700">Caderneta de Poupança</span>
                <span className="font-mono font-semibold text-slate-800">
                  R$ {totalPoupanca.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                Rendimento: +R$ {poupancaProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (isento de IR)
              </span>
            </div>

            <div className="text-[11px] text-slate-600 bg-amber-50 border border-amber-200 p-2 rounded text-center">
              Vantagem da Selic: <strong className="text-emerald-700">+R$ {difference.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong> a mais no período.
            </div>
          </div>
        </div>
      )}

      {/* Small Disclaimer */}
      <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center gap-1.5 text-[10px] text-slate-400">
        <Info className="w-3 h-3 shrink-0" />
        <span>Simulação informativa considerando Selic a 10,75% a.a. e tabela regressiva de IR.</span>
      </div>
    </div>
  );
};
