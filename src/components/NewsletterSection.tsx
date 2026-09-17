import React, { useState } from 'react';
import { Mail, CheckCircle, ShieldCheck } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
  };

  return (
    <section className="bg-slate-900 rounded-2xl p-6 sm:p-10 text-white my-8 overflow-hidden relative border border-slate-800 shadow-md">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-3 border border-amber-500/30">
          <Mail className="w-3.5 h-3.5" />
          Boletim Diário Matinal
        </div>

        <h3 className="text-2xl sm:text-3xl font-black font-serif text-white tracking-tight mb-2">
          Receba o resumo dos mercados antes da abertura do pregão
        </h3>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-6">
          Principais acontecimentos da B3, cotações de fechamento em Nova York e análises macroeconômicas direto no seu e-mail todas as manhãs às 7h30.
        </p>

        {subscribed ? (
          <div className="bg-emerald-950/80 border border-emerald-500/50 rounded-xl p-4 inline-flex items-center gap-3 text-emerald-200 text-sm font-medium">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Inscrição confirmada com sucesso! Você receberá a próxima edição amanhã.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              id="newsletter-email-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu melhor e-mail corporativo"
              required
              className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-slate-750"
            />
            <button
              id="newsletter-submit-btn"
              type="submit"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-lg text-sm transition-colors cursor-pointer shrink-0 shadow-xs"
            >
              Assinar Grátis
            </button>
          </form>
        )}

        <div className="flex items-center justify-center gap-4 text-xs text-slate-400 mt-4">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
            Sem spam. Cancele quando desejar.
          </span>
          <span>•</span>
          <span>Mais de 48.000 profissionais cadastrados</span>
        </div>
      </div>
    </section>
  );
};
