import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Cal, { getCalApi } from '@calcom/embed-react';
import { MapPin, Phone, Mail, Instagram, Facebook, Clock, X } from 'lucide-react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi({"namespace":"prenotazione"});
        cal("ui", {
          theme: "dark",
          styles: { branding: { brandColor: "#050505" } },
          hideEventTypeDetails: true,
          layout: "month_view"
        });
      } catch (error) {
        console.error("Cal API error:", error);
      }
    })();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white/20">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#050505]/90 backdrop-blur-md py-4 border-b border-white/10' : 'py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="font-serif text-2xl tracking-widest uppercase">Senso</div>
          <div className="hidden md:flex gap-8 items-center">
            <button type="button" onClick={() => scrollToSection('about')} className="small-caps hover:text-white transition-colors">La Filosofia</button>
            <button type="button" onClick={() => scrollToSection('menu')} className="small-caps hover:text-white transition-colors">Il Menu</button>
            <button type="button" onClick={() => scrollToSection('contact')} className="small-caps hover:text-white transition-colors">Contatti</button>
            <button type="button" onClick={() => scrollToSection('reserve')} className="nav-pill">Prenota</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/assets/hero3.jpg" style={{ filter: 'blur(2px)' }} alt="Senso Restaurant Interior" className="w-full h-full object-cover opacity-40" referrerPolicy="no-referrer"/>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
            <span className="small-caps mb-6 block">Ristorante & Lounge</span>
            <h1 className="title-text mb-6">Un'esperienza<br/>culinaria per i sensi</h1>
            <p className="font-sans font-light text-white/70 max-w-xl mx-auto mb-12 text-lg">
              Scopri un viaggio gastronomico dove la tradizione italiana incontra l'innovazione contemporanea in un ambiente di pura eleganza.
            </p>
            <button type="button" onClick={() => scrollToSection('reserve')} className="circle-button mx-auto">
              Prenota
            </button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="image-mask h-[600px]">
            <img src="/assets/chilometro_zero.jpg" alt="Ingredienti freschi e locali" className="w-full h-full object-cover" referrerPolicy="no-referrer"/>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="small-caps mb-4 block">La Nostra Filosofia</span>
            <h2 className="subtitle-text mb-8">L'arte dell'essenziale</h2>
            <div className="horizontal-line mb-8"></div>
            <p className="text-white/70 font-light leading-relaxed mb-6">
              Da Senso, crediamo che la vera eleganza risieda nella semplicità. Selezioniamo meticolosamente ingredienti di stagione dai migliori produttori locali per creare piatti che celebrano la purezza dei sapori.
            </p>
            <p className="text-white/70 font-light leading-relaxed">
              Ogni creazione è un dialogo tra memoria e scoperta, progettata per risvegliare i sensi e lasciare un'impressione duratura. Il nostro ambiente intimo e il servizio attento completano un'esperienza pensata per essere indimenticabile.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Menu Highlights */}
      <section id="menu" className="py-32 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="small-caps mb-4 block">Degustazione</span>
            <h2 className="subtitle-text">I Nostri Piatti</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Crudo di Mare",
                desc: "Gambero rosso di Mazara, agrumi di Sicilia, olio evo monocultivar",
                img: "/assets/crudo_di_mare.jpg"
              },
              {
                title: "Risotto Riserva",
                desc: "Riso Carnaroli, tartufo bianco d'Alba, burro di malga, Parmigiano 36 mesi",
                img: "/assets/risotto.jpg"
              },
              {
                title: "Polpo Verace",
                desc: "Polpo arrostito, crema di patate affumicate, polvere di capperi e olive",
                img: "/assets/polpo3.jpg"
              }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.2 }} className="group cursor-pointer">
                <div className="overflow-hidden mb-6 aspect-[3/4]">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" referrerPolicy="no-referrer"/>
                </div>
                <h3 className="font-serif text-2xl mb-2">{item.title}</h3>
                <p className="text-white/60 font-light text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <button type="button" onClick={() => setIsMenuOpen(true)}
              className="nav-pill inline-flex items-center gap-2 hover:bg-white hover:text-black transition-colors"
            >
              Scopri il Menu Completo
            </button>
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section id="reserve" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="small-caps mb-4 block">Riserva il tuo posto</span>
            <h2 className="subtitle-text mb-6">Prenota un Tavolo</h2>
            <p className="text-white/60 font-light">Seleziona la data e l'orario desiderati per la tua esperienza da Senso.</p>
          </div>
          
          <div className="bg-[#0a0a0a] p-4 md:p-8 rounded-2xl border border-white/10">
            <Cal namespace="prenotazione" calLink="rick/get-rick-rolled" style={{width:"100%",height:"100%",overflow:"scroll"}} config={{layout: 'month_view', theme: 'dark'}}/>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="pt-20 pb-10 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="font-serif text-3xl tracking-widest uppercase mb-6">Senso</div>
            <p className="text-white/60 font-light max-w-sm">
              Un santuario gastronomico dove il tempo si ferma e i sensi si risvegliano.
            </p>
          </div>
          
          <div>
            <span className="small-caps mb-6 block">Contatti</span>
            <ul className="space-y-4 text-white/70 font-light text-sm">
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-white/40"/>
                Via Lungomare delle Sirene 15, 84011 Amalfi (SA), Italia
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-white/40"/>
                +39 02 1234 5678
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-white/40"/>
                info@ristorantesenso.it
              </li>
            </ul>
          </div>
          
          <div>
            <span className="small-caps mb-6 block">Orari</span>
            <ul className="space-y-4 text-white/70 font-light text-sm">
              <li className="flex items-start gap-3">
                <Clock size={16} className="text-white/40 mt-0.5"/>
                <div>
                  <p className="text-white">Mar - Sab</p>
                  <p>19:30 - 23:00</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-4"></div>
                <div>
                  <p className="text-white">Dom - Lun</p>
                  <p>Chiuso</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto horizontal-line mb-8"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-xs font-light">
          <p>&copy; {new Date().getFullYear()} Senso Ristorante. Tutti i diritti riservati.</p>
          <div className="flex gap-6">
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Termini di Servizio</a>
            <div className="flex gap-4 ml-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Instagram"><Instagram size={16}/></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Facebook"><Facebook size={16}/></a>
            </div>
          </div>
        </div>
      </footer>

      {/* Full Menu Modal */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8">
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="bg-[#0a0a0a] border border-white/10 w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden flex flex-col relative">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b border-white/10 shrink-0">
                <h2 className="font-serif text-2xl tracking-widest uppercase">Menu Completo</h2>
                <button type="button" onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Chiudi menu"
                >
                  <X size={24}/>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar flex-1">
                <div className="space-y-16 max-w-2xl mx-auto">
                  
                  {/* Antipasti */}
                  <section>
                    <h3 className="text-xl font-serif italic mb-8 text-white/80 border-b border-white/10 pb-4">Antipasti</h3>
                    <div className="space-y-6">
                      <div className="flex justify-between items-baseline gap-4">
                        <div>
                          <h4 className="font-medium text-lg">Crudo di Mare</h4>
                          <p className="text-sm text-white/50 font-light mt-1">Gamberi rossi di Mazara, scampi, ostriche, tartare di tonno</p>
                        </div>
                        <span className="font-serif">€ 35</span>
                      </div>
                      <div className="flex justify-between items-baseline gap-4">
                        <div>
                          <h4 className="font-medium text-lg">Polpo Verace</h4>
                          <p className="text-sm text-white/50 font-light mt-1">Polpo arrosto, crema di patate allo zafferano, olive taggiasche</p>
                        </div>
                        <span className="font-serif">€ 22</span>
                      </div>
                      <div className="flex justify-between items-baseline gap-4">
                        <div>
                          <h4 className="font-medium text-lg">Capesante Scottate</h4>
                          <p className="text-sm text-white/50 font-light mt-1">Capesante, purea di topinambur, guanciale croccante</p>
                        </div>
                        <span className="font-serif">€ 24</span>
                      </div>
                      <div className="flex justify-between items-baseline gap-4">
                        <div>
                          <h4 className="font-medium text-lg">Impepata di Cozze</h4>
                          <p className="text-sm text-white/50 font-light mt-1">Cozze, pepe nero, limone, crostoni di pane all'aglio</p>
                        </div>
                        <span className="font-serif">€ 18</span>
                      </div>
                    </div>
                  </section>

                  {/* Primi Piatti */}
                  <section>
                    <h3 className="text-xl font-serif italic mb-8 text-white/80 border-b border-white/10 pb-4">Primi Piatti</h3>
                    <div className="space-y-6">
                      <div className="flex justify-between items-baseline gap-4">
                        <div>
                          <h4 className="font-medium text-lg">Paccheri allo Scoglio</h4>
                          <p className="text-sm text-white/50 font-light mt-1">Paccheri di Gragnano, frutti di mare, pomodorini del piennolo</p>
                        </div>
                        <span className="font-serif">€ 26</span>
                      </div>
                      <div className="flex justify-between items-baseline gap-4">
                        <div>
                          <h4 className="font-medium text-lg">Linguine all'Astice</h4>
                          <p className="text-sm text-white/50 font-light mt-1">Linguine, mezzo astice, pomodorini, basilico</p>
                        </div>
                        <span className="font-serif">€ 32</span>
                      </div>
                      <div className="flex justify-between items-baseline gap-4">
                        <div>
                          <h4 className="font-medium text-lg">Risotto Riserva</h4>
                          <p className="text-sm text-white/50 font-light mt-1">Riso Carnaroli, tartufo bianco d'Alba, burro di malga, Parmigiano 36 mesi</p>
                        </div>
                        <span className="font-serif">€ 38</span>
                      </div>
                      <div className="flex justify-between items-baseline gap-4">
                        <div>
                          <h4 className="font-medium text-lg">Spaghetti alle Vongole</h4>
                          <p className="text-sm text-white/50 font-light mt-1">Spaghetti, vongole veraci, bottarga di muggine</p>
                        </div>
                        <span className="font-serif">€ 24</span>
                      </div>
                    </div>
                  </section>

                  {/* Secondi Piatti */}
                  <section>
                    <h3 className="text-xl font-serif italic mb-8 text-white/80 border-b border-white/10 pb-4">Secondi Piatti</h3>
                    <div className="space-y-6">
                      <div className="flex justify-between items-baseline gap-4">
                        <div>
                          <h4 className="font-medium text-lg">Pescato del Giorno</h4>
                          <p className="text-sm text-white/50 font-light mt-1">Pesce fresco al forno in crosta di sale, verdure di stagione</p>
                        </div>
                        <span className="font-serif">€ 8 / hg</span>
                      </div>
                      <div className="flex justify-between items-baseline gap-4">
                        <div>
                          <h4 className="font-medium text-lg">Frittura di Paranza</h4>
                          <p className="text-sm text-white/50 font-light mt-1">Calamari, gamberi, pesciolini, maionese al limone</p>
                        </div>
                        <span className="font-serif">€ 25</span>
                      </div>
                      <div className="flex justify-between items-baseline gap-4">
                        <div>
                          <h4 className="font-medium text-lg">Trancio di Ricciola</h4>
                          <p className="text-sm text-white/50 font-light mt-1">Ricciola scottata, crema di zucchine alla scapece, menta</p>
                        </div>
                        <span className="font-serif">€ 28</span>
                      </div>
                      <div className="flex justify-between items-baseline gap-4">
                        <div>
                          <h4 className="font-medium text-lg">Aragosta alla Griglia</h4>
                          <p className="text-sm text-white/50 font-light mt-1">Aragosta intera, burro fuso alle erbe, insalatina</p>
                        </div>
                        <span className="font-serif">€ 45</span>
                      </div>
                    </div>
                  </section>

                  {/* Dolci */}
                  <section>
                    <h3 className="text-xl font-serif italic mb-8 text-white/80 border-b border-white/10 pb-4">Dolci</h3>
                    <div className="space-y-6">
                      <div className="flex justify-between items-baseline gap-4">
                        <div>
                          <h4 className="font-medium text-lg">Delizia al Limone</h4>
                          <p className="text-sm text-white/50 font-light mt-1">Pan di spagna, crema al limone di Amalfi, limoncello</p>
                        </div>
                        <span className="font-serif">€ 10</span>
                      </div>
                      <div className="flex justify-between items-baseline gap-4">
                        <div>
                          <h4 className="font-medium text-lg">Tiramisù Rivisitato</h4>
                          <p className="text-sm text-white/50 font-light mt-1">Mascarpone, savoiardi, caffè espresso, cacao amaro</p>
                        </div>
                        <span className="font-serif">€ 10</span>
                      </div>
                      <div className="flex justify-between items-baseline gap-4">
                        <div>
                          <h4 className="font-medium text-lg">Sorbetto Artigianale</h4>
                          <p className="text-sm text-white/50 font-light mt-1">Limone di Sorrento, basilico fresco</p>
                        </div>
                        <span className="font-serif">€ 8</span>
                      </div>
                    </div>
                  </section>

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}