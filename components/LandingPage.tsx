
import React from 'react';

interface LandingPageProps {
  onStart: () => void;
  onHowItWorks: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onHowItWorks }) => {
  return (
    <div className="min-h-screen bg-[#fafbfc] flex flex-col selection:bg-blue-100 selection:text-blue-900">
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto w-full z-30 sticky top-0 bg-[#fafbfc]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-600 rounded-[14px] flex items-center justify-center shadow-xl shadow-blue-500/20 transform rotate-3 hover:rotate-0 transition-transform cursor-pointer">
            <i className="fa-solid fa-bolt text-white text-xl"></i>
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-900">PayFlow</span>
        </div>
        <div className="hidden md:flex gap-10 text-sm font-bold text-slate-500 items-center">
          <button onClick={onHowItWorks} className="hover:text-blue-600 transition-colors">How it works</button>
          <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
          <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
        </div>
        <div className="flex gap-4">
          <button onClick={onStart} className="hidden sm:block px-6 py-3 text-slate-600 font-black text-sm hover:text-slate-900 transition-colors">Login</button>
          <button 
            onClick={onStart}
            className="px-8 py-3.5 bg-slate-900 text-white font-black text-sm rounded-2xl hover:bg-blue-600 transition-all shadow-2xl shadow-slate-900/10 active:scale-95"
          >
            Launch App
          </button>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center">
        {/* Hero Section */}
        <section className="px-6 text-center py-24 lg:py-32 max-w-6xl mx-auto relative overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[150px] -z-10"></div>

          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-800 text-[11px] font-black uppercase tracking-widest mb-10 shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Next-Gen Escrow v2.0
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tight leading-[0.95] mb-10 max-w-4xl">
            Get Paid <span className="text-blue-600 italic">Safely</span> with AI & Escrow
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mb-12 leading-relaxed font-medium mx-auto">
            The trust layer for the freelance economy. Describe work, generate invoices, and secure payments in stablecoin.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 mb-24 justify-center">
            <button 
              onClick={onStart}
              className="px-12 py-6 bg-blue-600 text-white text-lg font-black rounded-3xl hover:bg-blue-700 transition-all transform hover:scale-105 shadow-2xl shadow-blue-500/40 active:scale-95 flex items-center gap-3"
            >
              🚀 Start Invoicing Now
            </button>
            <button 
              onClick={onHowItWorks}
              className="px-12 py-6 bg-white border border-slate-200 text-slate-900 text-lg font-black rounded-3xl hover:bg-slate-50 transition-all shadow-lg active:scale-95"
            >
              View Protocol
            </button>
          </div>
        </section>

        {/* Short Preview Section */}
        <section className="w-full py-20 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
             <p className="text-slate-400 text-lg font-medium mb-10">Trusted by modern teams</p>
             <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale contrast-125">
               <span className="text-2xl font-black">GITHUB</span>
               <span className="text-2xl font-black">VERCEL</span>
               <span className="text-2xl font-black">STRIPE</span>
               <span className="text-2xl font-black">FIGMA</span>
               <span className="text-2xl font-black">LINEAR</span>
             </div>
          </div>
        </section>

        {/* Features Preview */}
        <section id="features" className="w-full py-32 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: 'fa-magic', title: 'AI-Generated Structure', desc: 'Describe your job in plain English and let AI handle the heavy lifting.' },
                { icon: 'fa-shield-heart', title: 'Decentralized Escrow', desc: 'No middlemen. Funds are held in decentralized smart contracts on the Ethereum network.' },
                { icon: 'fa-bolt-lightning', title: 'Stablecoin Payments', desc: 'Get paid in MNEE. Avoid volatility while keeping the speed of blockchain.' }
              ].map((feature, i) => (
                <div key={i} className="group bg-[#fafbfc] p-10 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-start text-left transition-all hover:-translate-y-2 hover:shadow-2xl hover:border-blue-100">
                  <div className="w-14 h-14 bg-white text-blue-600 rounded-2xl flex items-center justify-center text-xl mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                    <i className={`fa-solid ${feature.icon}`}></i>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-4">{feature.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 text-slate-400 text-sm font-medium">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                 <i className="fa-solid fa-bolt text-white text-lg"></i>
               </div>
               <span className="text-xl font-black tracking-tighter text-slate-900">PayFlow</span>
             </div>
             <div className="flex gap-8">
               <a href="#" className="hover:text-slate-900">Privacy</a>
               <a href="#" className="hover:text-slate-900">Terms</a>
               <a href="#" className="hover:text-slate-900">Security</a>
             </div>
             <p>© 2026 PayFlow Protocol.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
