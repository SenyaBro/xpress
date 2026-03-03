import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Gift, CheckCircle2, Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/src/config/data";
import { Container } from "@/src/components/ui/Container";
import { Section } from "@/src/components/ui/Section";
import { Button } from "@/src/components/ui/Button";

export function LeadMagnet() {
  const [gameState, setGameState] = useState<"intro" | "playing" | "won">("intro");
  const [progress, setProgress] = useState(0);

  // Simple clicker game logic
  const handleClick = () => {
    if (gameState !== "playing") return;
    setProgress((prev) => {
      const next = prev + 20;
      if (next >= 100) {
        setGameState("won");
        return 100;
      }
      return next;
    });
  };

  // Auto-decrease progress to make it slightly challenging
  useEffect(() => {
    if (gameState !== "playing") return;
    
    const interval = setInterval(() => {
      setProgress((prev) => Math.max(0, prev - 5));
    }, 500);
    
    return () => clearInterval(interval);
  }, [gameState]);

  return (
    <Section id="bonus" className="bg-brand-darker relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-lime/5 to-transparent opacity-50" />
      
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatePresence mode="wait">
            {gameState === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-panel p-8 md:p-12 rounded-3xl border border-brand-lime/20"
              >
                <div className="w-16 h-16 bg-brand-lime/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Gift className="w-8 h-8 text-brand-lime" />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                  Получите скидку 10%
                </h2>
                <p className="text-brand-muted text-lg mb-8 max-w-md mx-auto">
                  Соберите колесо за 10 секунд, чтобы разблокировать персональный промокод на первый вызов.
                </p>
                <Button size="lg" onClick={() => setGameState("playing")} className="px-10">
                  <Play className="w-5 h-5 mr-2" />
                  Начать игру
                </Button>
              </motion.div>
            )}

            {gameState === "playing" && (
              <motion.div
                key="playing"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="glass-panel p-8 md:p-12 rounded-3xl border border-brand-lime/50 text-center"
              >
                <h3 className="text-2xl font-bold text-white mb-8">Закрутите все болты!</h3>
                
                <div 
                  className="relative w-48 h-48 mx-auto mb-8 cursor-pointer select-none touch-manipulation"
                  onClick={handleClick}
                >
                  {/* Tire base */}
                  <div className="absolute inset-0 rounded-full border-[16px] border-[#1a1a1a] bg-[#2a2a2a] shadow-inner flex items-center justify-center">
                    {/* Rim */}
                    <div className="w-24 h-24 rounded-full border-4 border-[#4a4a4a] bg-[#3a3a3a] flex items-center justify-center relative">
                      {/* Center cap */}
                      <div className="w-8 h-8 rounded-full bg-brand-lime/20 flex items-center justify-center">
                        <span className="text-brand-lime font-bold text-xs">X</span>
                      </div>
                      
                      {/* Bolts (visual representation of progress) */}
                      {[0, 72, 144, 216, 288].map((deg, i) => {
                        const isTight = progress > i * 20;
                        return (
                          <div 
                            key={deg}
                            className={`absolute w-4 h-4 rounded-full transition-colors duration-300 ${isTight ? 'bg-brand-lime' : 'bg-[#5a5a5a]'}`}
                            style={{
                              transform: `rotate(${deg}deg) translateY(-28px)`,
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Progress ring overlay */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      fill="none"
                      stroke="rgba(180, 255, 0, 0.2)"
                      strokeWidth="4"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      fill="none"
                      stroke="#b4ff00"
                      strokeWidth="4"
                      strokeDasharray="553"
                      strokeDashoffset={553 - (553 * progress) / 100}
                      className="transition-all duration-200 ease-out"
                    />
                  </svg>
                </div>
                
                <p className="text-brand-muted mb-4">Жмите на колесо как можно быстрее!</p>
                <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                  <div 
                    className="bg-brand-lime h-2 rounded-full transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </motion.div>
            )}

            {gameState === "won" && (
              <motion.div
                key="won"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel p-8 md:p-12 rounded-3xl border border-brand-lime bg-brand-lime/5"
              >
                <div className="w-20 h-20 bg-brand-lime rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(180,255,0,0.4)]">
                  <CheckCircle2 className="w-10 h-10 text-brand-dark" />
                </div>
                <h2 className="text-3xl font-display font-bold text-white mb-2">
                  Отличная работа!
                </h2>
                <p className="text-brand-lime font-medium text-lg mb-8">
                  Ваша скидка 10% активирована
                </p>
                
                <div className="bg-brand-darker rounded-xl p-6 mb-8 border border-white/10">
                  <p className="text-sm text-brand-muted mb-4">Назовите этот промокод при заказе:</p>
                  <div className="text-3xl font-mono font-bold tracking-widest text-white bg-white/5 py-3 rounded-lg border border-white/10">
                    XPRESS10
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg">
                    <a href={siteConfig.contact.phoneLink}>
                      <Phone className="w-5 h-5 mr-2" />
                      Вызвать мастера
                    </a>
                  </Button>
                  <Button asChild variant="secondary" size="lg">
                    <a href={siteConfig.contact.telegram} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-5 h-5 mr-2 text-[#229ED9]" />
                      Написать в Telegram
                    </a>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  );
}
