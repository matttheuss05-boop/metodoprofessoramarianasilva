/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ChevronDown,
  Puzzle,
  Zap,
  ShieldCheck,
  AlertTriangle,
  Flame,
  Users
} from 'lucide-react';

// Common Components
// (Button component removed if unused to reduce surface area for circular structure errors)

export default function App() {
  const [timeLeft, setTimeLeft] = useState(251); 
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const safeTrack = (event: string, params: object) => {
    try {
      if (typeof window !== 'undefined' && (window as any).fbq) {
        // Ensure params are a clean non-circular object
        const cleanParams = JSON.parse(JSON.stringify(params));
        (window as any).fbq('track', event, cleanParams);
      }
    } catch (e) {
      // Silently catch tracking errors to avoid crashing the app
    }
  };

  const scrollToPlans = () => {
    // Lead tracking
    setTimeout(() => safeTrack('Lead', { content_name: 'Scroll to Plans' }), 0);
    
    const element = document.getElementById('plans');
    if (element) {
       element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const initiateCheckout = (plan: string) => {
    // Checkout tracking
    setTimeout(() => safeTrack('InitiateCheckout', { content_name: plan }), 0);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white overflow-x-hidden selection:bg-green-100">
      {/* 1. Header/Countdown - Page 1 */}
      <div className="sticky top-0 z-50 bg-[#E11D48] py-2 px-4 flex justify-center items-center gap-3 text-white font-black text-xs sm:text-sm">
        <div className="flex items-center gap-1.5 uppercase tracking-wider">
           <AlertTriangle size={16} />
           <Flame size={16} fill="white" />
           OFERTA EXPIRA EM:
        </div>
        <div className="flex gap-1.5 font-mono">
          <div className="bg-black/20 w-8 h-8 flex items-center justify-center rounded-md text-lg">{minutes.toString().padStart(2, '0')}</div>
          <span className="text-lg">:</span>
          <div className="bg-black/20 w-8 h-8 flex items-center justify-center rounded-md text-lg">{seconds.toString().padStart(2, '0')}</div>
        </div>
      </div>

      {/* 2. Hero Section - Page 1 */}
      <header className="relative bg-white pt-10 pb-16 px-6 sm:px-12 text-center bg-dot-pattern">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white border border-green-100 text-green-600 px-5 py-2 rounded-full font-bold text-sm mb-12 shadow-sm">
            <CheckCircle2 size={16} /> Alinhado à BNCC 2026
          </div>
          <h1 className="text-[2.2rem] sm:text-6xl lg:text-[5rem] font-[950] text-[#1E293B] leading-[1.05] mb-8 tracking-[-0.04em] uppercase">
            Você <span className="text-[#22C55E]">NÃO</span> precisa de <span className="text-[#22C55E] block sm:inline relative">
              computador
              <svg className="absolute -bottom-1 left-0 w-full h-2 text-green-200/40" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none"/></svg>
            </span> para ensinar BNCC
          </h1>

          <p className="text-lg sm:text-3xl text-slate-700 font-black mb-10 px-4">
            <span className="text-[#22C55E] underline decoration-green-200 decoration-4 underline-offset-4">+500 atividades</span> prontas para aplicar hoje mesmo
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto mb-10 px-2 uppercase">
            {[
              "Sem laboratório",
              "Sem planejamento",
              "Para infantil ao 5º ano",
              "Aplicação imediata"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-green-100 text-left text-sm sm:text-base font-black text-slate-800 shadow-sm">
                <CheckCircle2 className="text-[#22C55E] shrink-0" size={18} strokeWidth={4} />
                {item}
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-4 px-4">
             <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
                <div className="flex -space-x-2">
                   {['bg-green-400', 'bg-blue-400', 'bg-cyan-400', 'bg-emerald-400'].map((color, i) => (
                      <div key={i} className={`w-9 h-9 rounded-full border-2 border-white ${color} flex items-center justify-center text-[10px] font-bold text-white uppercase`}>
                        {['A', 'M', 'C', 'J'][i]}
                      </div>
                   ))}
                </div>
                <div className="text-sm text-slate-500 font-bold">
                  Mais de <span className="text-slate-900 font-extrabold">2.000 professores</span> já estão usando
                </div>
             </div>
             
             <button 
                type="button"
                onClick={() => scrollToPlans()}
                className="w-full max-w-lg py-5 bg-[#22C55E] text-white font-[950] text-xl sm:text-2xl rounded-2xl shadow-glow flex items-center justify-center gap-3 uppercase tracking-tighter hover:bg-[#16A34A] transition-all btn-shine-effect animate-pulse-subtle"
             >
                QUERO ACESSAR AGORA <ArrowRight strokeWidth={4} size={24} />
             </button>
             
             <div className="text-[10px] sm:text-xs text-[#EF4444] font-black flex items-center gap-1.5 mt-4 uppercase">
                <AlertTriangle size={14} /> Desconto válido apenas nesta página
             </div>
          </div>
        </div>
      </header>

      {/* 3. Product Display Section - Page 2 */}
      <section className="py-16 bg-slate-50 px-4 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-12 text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <span className="flex items-center gap-2"><LockIcon /> Compra Segura</span>
            <span className="flex items-center gap-2"><SSLIcon /> SSL Criptografado</span>
            <span className="flex items-center gap-2"><Zap size={16} /> Acesso Imediato</span>
          </div>
          
          <div className="relative inline-block w-full max-w-3xl">
             <div className="rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl border-2 sm:border-4 border-white">
                <img 
                  src="https://i.postimg.cc/cJsJ1qRM/hero-product-By-V8rz-KT.jpg" 
                  alt="Kit BNCC" 
                  className="w-full h-auto"
                />
             </div>
          </div>
        </div>
      </section>

      {/* 4. Dores Reais (Pain Points) - Page 2/3 */}
      <section className="py-20 bg-[#FFF1F2] px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center sm:justify-start mb-8">
            <div className="bg-[#FECDD3] text-[#E11D48] px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-[950] uppercase tracking-widest flex items-center gap-2">
               <XCircle size={14} /> DORES REAIS
            </div>
          </div>
          <h2 className="text-3xl sm:text-6xl font-black text-[#1E293B] mb-10 text-center sm:text-left leading-tight">Você vive essa rotina?</h2>
          
          <div className="space-y-4">
            {[
              "A coordenação cobra Pensamento Computacional e ninguém te explicou o que é",
              "Sua escola não tem laboratório de informática (e nunca vai ter)",
              "Você passa o domingo planejando atividades do zero",
              "Os materiais que você acha online são complicados demais para a sua turma",
              "Você sabe que vai cair na próxima avaliação externa, e está sem chão"
            ].map((text, i) => (
              <div key={i} className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-[2rem] shadow-sm border border-rose-100 flex gap-4 sm:gap-6 items-center">
                <div className="w-8 h-8 sm:w-10 h-10 bg-[#FFF1F2] text-[#E11D48] rounded-full flex items-center justify-center shrink-0">
                  <XCircle size={20} sm:size={24} strokeWidth={3} />
                </div>
                <p className="text-slate-700 font-bold text-base sm:text-xl leading-tight">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Solution Section - Page 3/4 */}
      <section className="py-20 px-6 bg-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
               <div className="w-16 h-16 sm:w-24 h-24 bg-[#22C55E] rounded-[1.5rem] sm:rounded-[2.2rem] flex items-center justify-center mx-auto mb-8 shadow-lg -rotate-3">
                  <Puzzle className="text-white" size={32} sm:size={48} />
               </div>
               <h2 className="text-3xl sm:text-6xl font-black text-[#1E293B] mb-6 leading-tight">A solução existe e cabe na sua mochila</h2>
               <p className="text-lg sm:text-2xl text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed px-2">
                  <span className="text-slate-900 font-black italic">Pensamento Computacional desplugado</span> é ensinar lógica, algoritmos e resolução de problemas com papel, giz e movimento. Sem tela, sem internet, sem dor de cabeça.
               </p>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { icon: 'printer', title: "Pronto para imprimir", desc: "Baixe, imprima e aplique sem adaptações." },
                { icon: 'code', title: "Alinhado à BNCC", desc: "Cada atividade traz o código da habilidade." },
                { icon: 'check', title: "Testado em sala", desc: "Mais de 2.000 professoras já validaram." }
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 sm:p-10 rounded-2xl sm:rounded-[2.5rem] border border-slate-100 shadow-sm text-center">
                  <div className="w-12 h-12 sm:w-16 h-16 bg-slate-50 text-slate-400 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-5">
                    {item.icon === 'printer' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>}
                    {item.icon === 'code' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>}
                    {item.icon === 'check' && <Users size={24} />}
                  </div>
                  <h4 className="text-xl sm:text-2xl font-[900] text-slate-800 mb-3 tracking-tighter uppercase">{item.title}</h4>
                  <p className="text-slate-500 font-bold text-sm sm:text-base leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* 6. Portal Resources - Page 5 */}
      <section className="py-20 bg-[#F8FAFC] px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-white border border-green-100 text-[#15803D] px-5 py-1.5 rounded-full text-[10px] sm:text-xs font-[900] uppercase tracking-widest mb-4 shadow-sm">RECURSOS DO PORTAL</div>
            <h2 className="text-3xl sm:text-6xl font-black text-[#1E293B] leading-tight">O que você encontra no portal</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              { title: "Organizado por habilidade", desc: "Encontre a atividade certa em segundos com filtros BNCC." },
              { title: "Planejamento semanal", desc: "Sequência didática pronta para cada semana letiva." },
              { title: "Rubricas de avaliação", desc: "Avalie seus alunos com critérios claros e objetivos." },
              { title: "Atividades lúdicas", desc: "Jogos e dinâmicas que engajam a turma toda." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 sm:p-10 rounded-2xl sm:rounded-[2.5rem] border border-slate-200/60 shadow-sm flex items-start gap-4 sm:gap-8">
                <div className="w-12 h-12 sm:w-16 h-16 bg-green-50 text-green-500 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 border border-green-100 shadow-sm">
                  <CheckCircle2 size={24} sm:size={32} />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-[900] text-[#1E293B] mb-2 tracking-tighter uppercase">{item.title}</h3>
                  <p className="text-slate-500 font-bold text-sm sm:text-base leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6b. Testimonials - Page 6 */}
      <section className="py-24 bg-[#0F172A] px-0 overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
            <h2 className="text-4xl sm:text-7xl font-black text-white mb-4">Amado por <span className="text-[#22C55E]">Milhares de Educadores</span></h2>
            <p className="text-[#94A3B8] text-lg sm:text-xl font-bold italic">"Professores relatam aplicar a primeira atividade no MESMO DIA após acessar o material."</p>
         </div>
         
         <div className="relative">
            {/* Seamless Infinite Slider */}
            <div className="flex overflow-hidden group">
               <motion.div 
                  className="flex gap-4 sm:gap-8 py-8 px-4"
                  animate={{
                     x: [0, -1920],
                  }}
                  transition={{
                     x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 40,
                        ease: "linear",
                     },
                  }}
               >
                  {[
                     "https://i.postimg.cc/LXSft0M4/feedback-5-D83GYp-Ei.png",
                     "https://i.postimg.cc/WzbkKF3w/feedback-4-D9QRTJgd.png",
                     "https://i.postimg.cc/1XCqZmnT/feedback-1-B0Yt4Zn-P.png",
                     "https://i.postimg.cc/66YRZ0jf/feedback-6-Be-Kt47x-O.png",
                     "https://i.postimg.cc/7Yhzn2jv/feedback-3-s-Oh-Mve-CM.png",
                     "https://i.postimg.cc/WbykW4PG/feedback-7-CKh7x-OZW.png",
                     // Duplicate for seamless loop
                     "https://i.postimg.cc/LXSft0M4/feedback-5-D83GYp-Ei.png",
                     "https://i.postimg.cc/WzbkKF3w/feedback-4-D9QRTJgd.png",
                     "https://i.postimg.cc/1XCqZmnT/feedback-1-B0Yt4Zn-P.png",
                     "https://i.postimg.cc/66YRZ0jf/feedback-6-Be-Kt47x-O.png",
                     "https://i.postimg.cc/7Yhzn2jv/feedback-3-s-Oh-Mve-CM.png",
                     "https://i.postimg.cc/WbykW4PG/feedback-7-CKh7x-OZW.png"
                  ].map((url, i) => (
                     <div key={i} className="flex-none w-[280px] sm:w-[400px]">
                        <div className="bg-[#1E293B] p-2 rounded-2xl sm:rounded-3xl border border-slate-800 shadow-2xl hover:border-[#22C55E]/30 transition-colors">
                           <img 
                              src={url} 
                              alt={`Feedback ${i}`} 
                              className="w-full h-auto rounded-xl sm:rounded-2xl"
                              loading="lazy"
                           />
                        </div>
                     </div>
                  ))}
               </motion.div>
            </div>
            
            {/* Gradient Overlays for Fade Effect */}
            <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#0F172A] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#0F172A] to-transparent z-10 pointer-events-none"></div>
         </div>
      </section>

      {/* 6c. File List & Detailed Content - Page 7-12 */}
      <section className="py-24 bg-white px-4">
         <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
               <h2 className="text-4xl sm:text-6xl font-black text-[#1E293B] mb-6 tracking-tighter uppercase leading-none px-4">O que você vai receber <span className="text-[#22C55E]">agora mesmo...</span></h2>
               <p className="text-base sm:text-xl text-slate-500 font-medium leading-relaxed px-4 max-w-3xl mx-auto">Não é apenas um PDF. É um sistema organizado para você não ter que pensar em "como" ensinar. Basta abrir e seguir o passo a passo.</p>
            </div>

            {/* Automatic Looping Material Carousel */}
            <div className="relative mb-20 overflow-hidden px-4">
               <div className="max-w-5xl mx-auto">
                  <motion.div 
                     className="flex gap-4 sm:gap-8"
                     animate={{
                        x: [0, -1000], // Adjust based on content width
                     }}
                     transition={{
                        x: {
                           repeat: Infinity,
                           repeatType: "loop",
                           duration: 20,
                           ease: "linear",
                        },
                     }}
                  >
                     {[
                        "https://i.postimg.cc/nhztzHsN/materiais-1-B5m-Roc6U.png",
                        "https://i.postimg.cc/wTFpgtB1/materiais-2-Bu-Z5h-Rk-A.png",
                        // Duplicate for seamless loop
                        "https://i.postimg.cc/nhztzHsN/materiais-1-B5m-Roc6U.png",
                        "https://i.postimg.cc/wTFpgtB1/materiais-2-Bu-Z5h-Rk-A.png",
                     ].map((url, i) => (
                        <div key={i} className="flex-none w-[300px] sm:w-[500px]">
                           <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden transform hover:scale-105 transition-transform duration-500">
                              <img 
                                 src={url} 
                                 alt={`Material ${i}`} 
                                 className="w-full h-auto"
                              />
                           </div>
                        </div>
                     ))}
                  </motion.div>
               </div>
               {/* Gradients to hide edges */}
               <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
               <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
            </div>

            <div className="text-center mb-12">
               <span className="bg-white text-[#22C55E] px-8 py-2.5 rounded-full text-[11px] font-[950] border-2 border-[#22C55E] tracking-widest uppercase shadow-sm">
                  CONTEÚDO DETALHADO POR ANO
               </span>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
               <Accordion 
                 title="Habilidades Comuns (1º ao 5º Ano)" 
                 borderColor="border-[#22C55E]" 
                 titleColor="text-[#1E293B]"
               >
                  <div className="space-y-3 pt-2">
                     {[
                        { code: "EF15CO01", text: "Organização e representação da informação (matrizes, registros, listas e grafos)." },
                        { code: "EF15CO02", text: "Construir e simular algoritmos para resolver problemas do cotidiano." },
                        { code: "EF15CO03", text: "Lógica computacional (verdadeiro/falso, negação, conjunção e disjunção)." },
                        { code: "EF15CO04", text: "Dividir problemas complexos em partes menores (Decomposição)." },
                        { code: "EF15CO05", text: "Codificação da informação em diferentes formas (armazenamento e transmissão)." },
                        { code: "EF15CO06", text: "Funcionamento de dispositivos computacionais básicos." },
                        { code: "EF15CO07", text: "Sistema Operacional: Integração entre software e hardware." },
                        { code: "EF15CO08", text: "Uso de artefatos computacionais para pesquisa e resolução de problemas." },
                        { code: "EF15CO09", text: "Segurança e responsabilidade no uso da tecnologia (ética, direitos autorais)." }
                     ].map((item, i) => (
                        <div key={i} className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 flex gap-4">
                           <span className="text-[#22C55E] font-black shrink-0 text-xs sm:text-sm">{item.code}</span>
                           <p className="text-slate-600 font-bold text-xs sm:text-sm leading-snug">{item.text}</p>
                        </div>
                     ))}
                  </div>
               </Accordion>

               <Accordion 
                 title="1º Ano do Ensino Fundamental" 
                 borderColor="border-[#F97316]" 
                 titleColor="text-[#F97316]"
               >
                  <div className="space-y-3 pt-2">
                     {[
                        { code: "EF01CO01", text: "Organização de objetos identificando padrões e diferenças." },
                        { code: "EF01CO02", text: "Conceituação de Algoritmos aplicados no dia a dia." },
                        { code: "EF01CO03", text: "Criar sequências de passos físicos ou digitais (Algoritmos)." },
                        { code: "EF01CO04", text: "Codificação da informação em diferentes meios e linguagens." },
                        { code: "EF01CO05", text: "Representar informação usando diferentes codificações." },
                        { code: "EF01CO06", text: "Uso de artefatos computacionais para necessidades pessoais." },
                        { code: "EF01CO07", text: "Segurança e proteção de dados pessoais e própria segurança." }
                     ].map((item, i) => (
                        <div key={i} className="bg-orange-50/40 p-4 rounded-xl border border-orange-100 flex gap-4">
                           <span className="text-[#F97316] font-black shrink-0 text-xs sm:text-sm">{item.code}</span>
                           <p className="text-slate-600 font-bold text-xs sm:text-sm leading-snug">{item.text}</p>
                        </div>
                     ))}
                  </div>
               </Accordion>

               <Accordion 
                 title="2º Ano do Ensino Fundamental" 
                 borderColor="border-[#F97316]" 
                 titleColor="text-[#F97316]"
               >
                  <div className="space-y-3 pt-2">
                     {[
                        { code: "EF02CO01", text: "Modelagem de objetos identificando atributos essenciais." },
                        { code: "EF02CO02", text: "Algoritmos com repetições simples e instruções preestabelecidas." },
                        { code: "EF02CO03", text: "Instrução de máquina para definir algoritmos." },
                        { code: "EF02CO04", text: "Diferenciar componentes físicos (hardware) e instruções (software)." },
                        { code: "EF02CO05", text: "Uso de artefatos computacionais no cotidiano." },
                        { code: "EF02CO06", text: "Segurança e responsabilidade no uso de tecnologia." }
                     ].map((item, i) => (
                        <div key={i} className="bg-orange-50/40 p-4 rounded-xl border border-orange-100 flex gap-4">
                           <span className="text-[#F97316] font-black shrink-0 text-xs sm:text-sm">{item.code}</span>
                           <p className="text-slate-600 font-bold text-xs sm:text-sm leading-snug">{item.text}</p>
                        </div>
                     ))}
                  </div>
               </Accordion>

               <Accordion 
                 title="3º Ano do Ensino Fundamental" 
                 borderColor="border-[#F97316]" 
                 titleColor="text-[#F97316]"
               >
                  <div className="space-y-3 pt-2">
                     {[
                        { code: "EF03CO01", text: "Lógica computacional: valores verdadeiro e falso e negação." },
                        { code: "EF03CO02", text: "Algoritmos com repetições condicionais simples." },
                        { code: "EF03CO03", text: "Estratégia de Decomposição para problemas complexos." },
                        { code: "EF03CO04", text: "Diferenciar informação e dado (Codificação)." },
                        { code: "EF03CO05", text: "Dados estruturados em formatos específicos." },
                        { code: "EF03CO06", text: "Interface física (dispositivos de entrada e saída)." },
                        { code: "EF03CO07", text: "Ferramentas de busca e navegadores web." },
                        { code: "EF03CO08", text: "Ferramentas para se expressar em formatos digitais." },
                        { code: "EF03CO09", text: "Impacto do compartilhamento de informações pessoais na rede." }
                     ].map((item, i) => (
                        <div key={i} className="bg-orange-50/40 p-4 rounded-xl border border-orange-100 flex gap-4">
                           <span className="text-[#F97316] font-black shrink-0 text-xs sm:text-sm">{item.code}</span>
                           <p className="text-slate-600 font-bold text-xs sm:text-sm leading-snug">{item.text}</p>
                        </div>
                     ))}
                  </div>
               </Accordion>

               <Accordion 
                 title="4º Ano do Ensino Fundamental" 
                 borderColor="border-[#F97316]" 
                 titleColor="text-[#F97316]"
               >
                  <div className="space-y-3 pt-2">
                     {[
                        { code: "EF04CO01", text: "Matrizes: Organização baseada em coordenadas." },
                        { code: "EF04CO02", text: "Registros: Identificação de componentes por nomes." },
                        { code: "EF04CO03", text: "Algoritmos com repetições simples e aninhadas." },
                        { code: "EF04CO04", text: "Codificação para armazenamento e transmissão em formato digital." },
                        { code: "EF04CO05", text: "Codificação binária, ASCII e atributos de pixel (RGB)." },
                        { code: "EF04CO06", text: "Criação de conteúdo (textos, apresentações, vídeos)." },
                        { code: "EF04CO07", text: "Postura ética na coleta, guarda e uso de dados." },
                        { code: "EF04CO08", text: "Verificar confiabilidade das fontes de informação na Internet." }
                     ].map((item, i) => (
                        <div key={i} className="bg-orange-50/40 p-4 rounded-xl border border-orange-100 flex gap-4">
                           <span className="text-[#F97316] font-black shrink-0 text-xs sm:text-sm">{item.code}</span>
                           <p className="text-slate-600 font-bold text-xs sm:text-sm leading-snug">{item.text}</p>
                        </div>
                     ))}
                  </div>
               </Accordion>

               <Accordion 
                 title="5º Ano do Ensino Fundamental" 
                 borderColor="border-[#F97316]" 
                 titleColor="text-[#F97316]"
               >
                  <div className="space-y-3 pt-2">
                     {[
                        { code: "EF05CO01", text: "Listas: Organização de itens dispostos em sequência variável." },
                        { code: "EF05CO02", text: "Grafos: Organização com vértices e arestas." },
                        { code: "EF05CO03", text: "Lógica: Operações de negação, conjunção (E) e disjunção (OU)." },
                        { code: "EF05CO04", text: "Algoritmos com sequências, repetições e seleções condicionais." },
                        { code: "EF05CO05", text: "Arquitetura de computadores (Entrada/Saída, processador, RAM)." },
                        { code: "EF05CO06", text: "Armazenamento de dados local e remoto (Nuvem)." },
                        { code: "EF05CO07", text: "Sistema operacional e gerenciamento de hardware." },
                        { code: "EF05CO08", text: "Acesso crítico para distinguir conteúdos confiáveis na Internet." },
                        { code: "EF05CO09", text: "Direitos autorais e de imagem em mídias digitais." },
                        { code: "EF05CO10", text: "Compreensão das mudanças tecnológicas no mundo do trabalho." },
                        { code: "EF05CO11", text: "Adequação de diferentes tecnologias na resolução de problemas." }
                     ].map((item, i) => (
                        <div key={i} className="bg-orange-50/40 p-4 rounded-xl border border-orange-100 flex gap-4">
                           <span className="text-[#F97316] font-black shrink-0 text-xs sm:text-sm">{item.code}</span>
                           <p className="text-slate-600 font-bold text-xs sm:text-sm leading-snug">{item.text}</p>
                        </div>
                     ))}
                  </div>
               </Accordion>
            </div>
         </div>
      </section>

      {/* 7. Bonus Section - Page 13 */}
      <section className="py-20 bg-[#0F172A] px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#1E293B] text-[#22C55E] px-5 py-1.5 rounded-full text-[10px] sm:text-xs font-[900] mb-4 uppercase tracking-widest border border-slate-800">
               BÔNUS EXCLUSIVOS
            </div>
            <h2 className="text-3xl sm:text-7xl font-black text-white mb-6 uppercase tracking-tight">Bônus do <span className="text-[#22C55E]">Combo Mestre</span></h2>
            <p className="text-lg sm:text-xl text-[#94A3B8] font-medium max-w-3xl mx-auto italic">Libere 4 materiais extras exclusivos HOJE:</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              { id: "01", title: "Ponte Digital", desc: "Do papel direto para o tablet, sem complicação.", tag: "INTEGRAÇÃO DIGITAL", img: "https://i.postimg.cc/sxQhsFYh/bonus-ponte-digital-Dh-GSQGq-V.png" },
              { id: "02", title: "Práticas Avançadas", desc: "Aulas com Realidade Aumentada usando só o celular.", tag: "PROJETOS QUE ENCANTAM", img: "https://i.postimg.cc/fTd9PNWH/bonus-praticas-avancadas-BUpd1Ct-R.png" },
              { id: "03", title: "Storytelling & Lógica", desc: "Clássicos da literatura para ensinar algoritmos.", tag: "NARRATIVA MÁGICA", img: "https://i.postimg.cc/wTNmrpTd/bonus-storytelling-CG5w-dsl.png" },
              { id: "04", title: "Guia BNCC Comentado", desc: "Habilidades da BNCC comentadas passo a passo.", tag: "DOCUMENTAÇÃO OFICIAL", img: "https://i.postimg.cc/K8yMSHRM/bonus-guia-bncc-DB21Bjk-O.png" }
            ].map((bonus, i) => (
              <div key={i} className="bg-[#1E293B]/40 p-6 sm:p-8 rounded-2xl sm:rounded-[3rem] border border-slate-800 relative group overflow-hidden flex flex-col">
                <div className="absolute -top-4 -right-4 text-6xl sm:text-8xl font-black text-white/5 group-hover:text-white/10 transition-all select-none">{bonus.id}</div>
                
                <div className="mb-6 relative z-10 rounded-2xl overflow-hidden border border-white/5">
                   <img 
                     src={bonus.img} 
                     alt={bonus.title} 
                     className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-700" 
                   />
                </div>

                <div className="relative z-10 mt-auto">
                  <div className="bg-slate-800 text-[#22C55E] px-3 py-1 rounded-full text-[9px] font-black tracking-widest mb-4 inline-block">
                    {bonus.tag}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 uppercase tracking-tight">{bonus.title}</h3>
                  <p className="text-[#94A3B8] font-medium text-sm sm:text-base leading-relaxed">{bonus.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7b. Two Paths Comparison - Page 16-17 */}
      <section className="py-24 bg-white px-6">
         <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
               <h2 className="text-4xl sm:text-6xl font-black text-[#1E293B] mb-4 uppercase leading-none tracking-tight">Uma decisão, dois caminhos diferentes</h2>
               <p className="text-slate-500 font-bold mb-12">A Nova Lei da Educação Digital chegou. Como você vai lidar com ela?</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 items-start">
               <div className="bg-rose-50/50 p-10 rounded-[3rem] border border-rose-100">
                  <div className="bg-white text-rose-500 px-6 py-2 rounded-full text-[10px] font-black uppercase mb-8 shadow-sm flex items-center justify-center gap-2">
                     SEM O KIT MESTRE <XCircle size={14} />
                  </div>
                  <h4 className="text-2xl font-black text-slate-800 mb-8 uppercase tracking-tighter">O ciclo do estresse:</h4>
                  <ul className="space-y-4">
                     {[
                        "Horas perdidas buscando no Google",
                        "Aulas improvisadas que não engajam",
                        "Medo de não cumprir a BNCC",
                        "Exaustão e insegurança pedagógica",
                        "Sentimento de estar ficando para trás"
                     ].map((item, i) => (
                        <li key={i} className="flex gap-4 text-slate-600 font-bold text-sm">
                           <XCircle className="text-rose-400 shrink-0" size={18} /> {item}
                        </li>
                     ))}
                  </ul>
               </div>

               <div className="bg-emerald-50/50 p-10 rounded-[3rem] border-2 border-emerald-500 relative">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase shadow-xl flex items-center gap-2 whitespace-nowrap">
                     COM O MÉTODO PRONTO <CheckCircle2 size={14} />
                  </div>
                  <h4 className="text-2xl font-black text-slate-800 mb-8 uppercase tracking-tighter mt-4">A liberdade de ensinar:</h4>
                  <ul className="space-y-4">
                     {[
                        "Material aberto e aplicado em 5 min",
                        "Alunos 100% engajados e lúdicos",
                        "Segurança total com códigos BNCC",
                        "Mais tempo livre para você",
                        "Referência em inovação na sua escola"
                     ].map((item, i) => (
                        <li key={i} className="flex gap-4 text-slate-600 font-bold text-sm">
                           <CheckCircle2 className="text-emerald-500 shrink-0" size={18} /> {item}
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         </div>
      </section>

      {/* 8. Pricing Section - Page 18-19 */}
      <section id="plans" className="py-24 px-4 bg-dot-pattern flex flex-col items-center justify-center gap-20">
        <div className="max-w-3xl w-full">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#DCFCE7] text-[#15803D] px-6 py-1.5 rounded-full text-[10px] sm:text-xs font-[900] uppercase mb-4 tracking-widest">OFERTA ESPECIAL</div>
            <h2 className="text-4xl sm:text-7xl font-black text-[#1E293B] uppercase leading-none px-4">Escolha seu plano</h2>
          </div>

          <div className="bg-white rounded-[2.5rem] sm:rounded-[3.5rem] border-4 sm:border-[10px] border-[#22C55E] p-6 sm:p-16 relative shadow-2xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#E11D48] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-sm flex items-center gap-2 shadow-xl whitespace-nowrap">
               <Flame size={16} sm:size={18} fill="white" /> RECOMENDADO
            </div>
            
            <div className="text-center mb-10">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ACESSO COMPLETO + BÔNUS</p>
              <h3 className="text-2xl sm:text-5xl font-black text-[#1E293B] mb-2 uppercase tracking-tighter">Kit Estratégico Mestre</h3>
              <p className="text-sm sm:text-lg text-slate-600 font-bold italic px-4">
                 O método definitivo para o <span className="text-[#22C55E]">Infantil ao 5º ano</span>
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl mb-8 border border-slate-100 flex flex-col items-center text-slate-400 text-xs font-bold gap-2">
               <p className="uppercase tracking-widest">Valor individual dos materiais:</p>
               <div className="w-full space-y-1">
                  <div className="flex justify-between"><span>Dinâmicas Desplugadas</span><span className="line-through">R$ 97</span></div>
                  <div className="flex justify-between"><span>Storytelling & Lógica</span><span className="line-through">R$ 97</span></div>
                  <div className="flex justify-between"><span>Ponte Digital (VAAR)</span><span className="line-through">R$ 97</span></div>
                  <div className="flex justify-between"><span>Práticas Avançadas</span><span className="line-through">R$ 97</span></div>
               </div>
               <div className="w-full h-px bg-slate-200 my-2"></div>
               <div className="w-full flex justify-between text-slate-900 font-black"><span>VALOR TOTAL:</span><span>R$ 388,00</span></div>
            </div>

            <div className="text-center mb-10 py-6 sm:py-8 bg-slate-50 rounded-2xl sm:rounded-[2rem] border-2 border-green-100">
               <p className="text-[#22C55E] font-black text-xs uppercase tracking-widest mb-2">HOJE POR APENAS:</p>
               <div className="flex items-center justify-center gap-1 sm:gap-2">
                 <span className="text-2xl sm:text-5xl font-black text-[#22C55E] self-start mt-4 sm:mt-8">R$</span>
                 <span className="text-7xl sm:text-[13rem] font-[950] text-[#22C55E] leading-none tracking-tighter">27</span>
                 <span className="text-2xl sm:text-5xl font-black text-[#22C55E] self-end mb-4 sm:mb-8">,90</span>
               </div>
            </div>

            <div className="space-y-3 sm:space-y-4 mb-10 px-2 sm:px-0">
              {[
                "+500 Dinâmicas Desplugadas (Fundamentos)",
                "Habilidades BNCC Mapeadas, Infantil ao 5º ano",
                "Acesso Permanente e Imediato",
                "Série Práticas Educativas (RA e Chroma Key)",
                "Manual BNCC Comentado & Fichas de Acompanhamento"
              ].map((item, i) => (
                <div key={i} className="flex gap-3 sm:gap-4 items-center font-black text-slate-700 text-xs sm:text-sm">
                  <CheckCircle2 className="text-[#22C55E] shrink-0" size={16} sm:size={18} strokeWidth={4} />
                  {item}
                </div>
              ))}
            </div>

            <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 mb-8 text-xs font-bold text-orange-800 leading-relaxed italic">
               <Flame size={14} className="inline mr-2" /> Ao comprar terá opção de adquirir <b>anos finais e ensino médio com 80% OFF</b>
            </div>

            <button 
              type="button"
              onClick={() => {
                initiateCheckout('Combo Mestre');
                window.location.href = 'https://checkout.perfectpay.com.br/pay/PPU38CQBFN0?';
              }}
              className="w-full py-5 sm:py-7 bg-[#22C55E] text-white font-[950] text-xl sm:text-2xl rounded-2xl sm:rounded-3xl shadow-glow uppercase flex flex-col items-center justify-center tracking-tighter hover:bg-[#16A34A] transition-all btn-shine-effect animate-pulse-subtle"
            >
              <span>QUERO O KIT MESTRE</span>
              <span className="text-xs font-bold opacity-80">(+500 Dinâmicas)</span>
            </button>

            <div className="grid grid-cols-2 mt-8 gap-4">
               <div className="flex items-center gap-2 text-[8px] font-black text-slate-400 uppercase tracking-widest"><LockIcon /> Compra segura</div>
               <div className="flex items-center gap-2 text-[8px] font-black text-slate-400 uppercase tracking-widest"><Zap size={14} /> Acesso imediato</div>
               <div className="flex items-center gap-2 text-[8px] font-black text-slate-400 uppercase tracking-widest"><ShieldCheck size={14} /> 7 dias de garantia</div>
               <div className="flex items-center gap-2 text-[8px] font-black text-slate-400 uppercase tracking-widest"><Users size={14} /> Suporte direto</div>
            </div>
          </div>
        </div>

        {/* Secondary Plan */}
        <div className="max-w-xl w-full">
           <div className="bg-white rounded-[2.5rem] border-2 border-slate-100 p-10 sm:p-12 text-center shadow-lg">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">PLANO INDIVIDUAL</p>
              <h3 className="text-3xl font-black text-[#1E293B] mb-2 uppercase tracking-tighter">Básico Alívio</h3>
              <p className="text-slate-500 font-bold mb-10 italic">Para quem precisa de atividades práticas agora.</p>

              <div className="mb-10">
                 <p className="text-slate-400 line-through font-bold">R$ 47,00</p>
                 <p className="text-6xl font-[950] text-[#1E293B] tracking-tighter flex items-center justify-center gap-1">
                    <span className="text-2xl self-start mt-2">R$</span>10<span className="text-2xl self-end mb-2">,00</span>
                 </p>
              </div>

              <div className="space-y-4 text-left mb-10 max-w-xs mx-auto">
                 {[
                    "100 Dinâmicas Desplugadas",
                    "Alinhamento Completo BNCC",
                    "Acesso Vitalício"
                 ].map((item, i) => (
                    <div key={i} className="flex gap-3 items-center font-black text-slate-700 text-sm">
                       <CheckCircle2 className="text-[#22C55E] shrink-0" size={16} strokeWidth={4} />
                       {item}
                    </div>
                 ))}
              </div>

              <button 
                type="button"
                onClick={() => {
                  initiateCheckout('Básico Alívio');
                  window.location.href = 'https://go.perfectpay.com.br/PPU38CQBFQC';
                }}
                className="w-full py-5 border-4 border-[#1E293B] bg-white text-[#1E293B] font-black text-xl rounded-2xl hover:bg-slate-50 transition-all uppercase tracking-tighter btn-shine-effect animate-pulse-subtle"
              >
                 QUERO O ALÍVIO
              </button>
           </div>
        </div>
      </section>

      {/* 9. Creator Section - Page 20 */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative inline-block mb-8">
             <div className="w-32 h-32 sm:w-40 h-40 rounded-2xl sm:rounded-[3rem] overflow-hidden border-2 sm:border-4 border-white shadow-xl relative z-10">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400" alt="Profª Mariana Silva" className="w-full h-full object-cover" />
             </div>
             <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#22C55E] border-4 border-slate-50 rounded-full z-20"></div>
          </div>
          <p className="text-[10px] font-black text-[#22C55E] uppercase tracking-widest mb-1">QUEM CRIOU ESSE PORTAL</p>
          <h3 className="text-3xl sm:text-4xl font-black text-[#1E293B] mb-6">Profª Mariana Silva</h3>
          <p className="text-lg sm:text-xl text-slate-600 font-bold leading-relaxed mb-10 px-2">
            "Professora há mais de 15 anos, especialista em Pensamento Computacional e formação docente. Já ajudou mais de 2.000 professores."
          </p>
          <div className="flex flex-wrap justify-center gap-2">
             {["15+ anos", "Especialista BNCC", "2.000+ professores"].map((tag, i) => (
               <span key={i} className="bg-white px-4 py-1.5 rounded-full text-[10px] font-black text-slate-800 border border-slate-200 shadow-sm">{tag}</span>
             ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ Section - Page 21 */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-6xl font-[950] text-center text-[#1E293B] mb-12 sm:20 leading-tight uppercase tracking-tighter">Perguntas frequentes</h2>
          <div className="space-y-3">
            {[
              { 
                q: "Funciona para qual idade?", 
                a: "O Kit é ideal para crianças da Educação Infantil e Anos Iniciais do Ensino Fundamental (aproximadamente 3 a 10 anos). As atividades são modulares e podem ser adaptadas conforme o nível de cada turma." 
              },
              { 
                q: "Preciso de computador para aplicar?", 
                a: "Não! O foco principal são atividades 'desplugadas'. Você usará materiais simples do dia a dia (papel, lápis, objetos recicláveis) para ensinar lógica e tecnologia sem depender de telas." 
              },
              { 
                q: "Como recebo o acesso?", 
                a: "O acesso é imediato após a confirmação do pagamento. Você receberá um e-mail automático com seu login e senha para entrar no portal e baixar todo o material." 
              },
              { 
                q: "Posso imprimir o material?", 
                a: "Com certeza! Todo o material está em formato PDF de alta resolução, organizado para facilitar a impressão em qualquer impressora comum ou em gráficas." 
              }
            ].map((item, i) => (
              <Accordion key={i} title={item.q}>
                <p className="text-base sm:text-lg text-slate-500 font-bold leading-relaxed">
                   {item.a}
                </p>
              </Accordion>
            ))}
          </div>

          <div className="mt-16 sm:24 p-8 sm:p-12 bg-emerald-50 rounded-2xl sm:rounded-[3rem] border border-emerald-100 text-center relative overflow-hidden">
             <div className="w-16 h-16 sm:w-20 h-20 bg-[#22C55E] rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <ShieldCheck className="text-white" size={32} sm:size={40} />
             </div>
             <h3 className="text-2xl sm:text-3xl font-black text-[#1E293B] mb-4 uppercase">Garantia de 7 dias</h3>
             <p className="text-sm sm:text-lg text-slate-600 font-bold leading-relaxed px-2">
                Se você não gostar, devolvemos 100% do seu valor. Sem perguntas, sem burocracia.
             </p>
          </div>
        </div>
      </section>

      {/* 11. Footer CTA - Page 22 */}
      <footer className="py-24 sm:py-32 bg-[#0F172A] px-6 text-center text-white relative">
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-6xl font-black mb-4 leading-tight uppercase">Sua próxima segunda-feira</h2>
          <h2 className="text-4xl sm:text-6xl font-black text-[#22C55E] mb-10 sm:12 italic">pode ser bem mais leve</h2>
          
          <p className="text-base sm:text-xl text-slate-400 font-bold mb-10 sm:12 max-w-2xl mx-auto leading-relaxed">
            Pare de sofrer com planejamento. Comece a aplicar atividades prontas amanhã mesmo.
          </p>
          
          <div className="flex flex-col items-center">
             <button 
                type="button"
                onClick={() => scrollToPlans()}
                className="w-full max-w-lg py-5 sm:py-6 bg-[#22C55E] text-white font-[950] text-xl sm:text-3xl rounded-2xl sm:rounded-3xl shadow-glow uppercase flex items-center justify-center gap-3 tracking-tighter hover:bg-[#16A34A] transition-all mb-4 btn-shine-effect animate-pulse-subtle"
             >
                QUERO ACESSAR AGORA <ArrowRight strokeWidth={4} size={28} />
             </button>
             <p className="text-[10px] sm:text-xs font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">Acesso imediato • Garantia de 7 dias</p>
          </div>
          
          <div className="mt-24 sm:32 pt-12 sm:16 border-t border-slate-800">
             <p className="text-lg sm:text-xl font-black text-white mb-6 uppercase tracking-tight">Portal de Materiais</p>
             <div className="text-[10px] sm:text-xs text-slate-500 flex flex-col gap-1 items-center font-bold">
                <p>© 2026 Portal de Materiais - Todos os direitos reservados</p>
                <p>CNPJ XX.XXX.XXX/0001-XX</p>
             </div>
          </div>
        </div>
      </footer>

      {/* Floating Sticky CTA mobile only removed as requested */}
    </div>
  );
}

// Internal Accordion Component
const Accordion = ({ 
  title, 
  children, 
  borderColor = "border-slate-100", 
  titleColor = "text-slate-800" 
}: { 
  title: string, 
  children?: ReactNode, 
  borderColor?: string,
  titleColor?: string
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`border-2 ${borderColor} rounded-[1.2rem] bg-white overflow-hidden shadow-sm`}>
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
      >
        <div>
           <span className={`text-base sm:text-lg font-[900] tracking-tight truncate block ${titleColor}`}>{title}</span>
           <span className="text-[#22C55E] text-[10px] font-bold mt-1 flex items-center gap-1">
              👉 Clique para mostrar o conteúdo
           </span>
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0 ml-4">
           <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} text-slate-400`} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 sm:p-6 pt-0 border-t border-slate-50">
               {children || <div className="text-slate-400 italic text-sm">Conteúdo em breve...</div>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Internal Icons for mirroring
const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);
const SSLIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);
