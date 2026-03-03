import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Play, Gift, CheckCircle2, Phone, MessageCircle, Send } from "lucide-react";
import { siteConfig } from "@/src/config/data";
import { Container } from "@/src/components/ui/Container";
import { Section } from "@/src/components/ui/Section";
import { Button, ButtonLink } from "@/src/components/ui/Button";

export function LeadMagnet() {
  const shouldReduceMotion = useReducedMotion();
  const [gameState, setGameState] = useState<"intro" | "playing" | "won" | "form" | "done">("intro");
  const [progress, setProgress] = useState(0);
  
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) {
      setError("Пожалуйста, укажите телефон или ник в Telegram");
      return;
    }
    setError("");
    setGameState("done");
  };

  const getTelegramLink = () => {
    const text = `Здравствуйте! Хочу заказать шиномонтаж. Мой промокод: XPRESS10. ${name ? `Меня зовут ${name}. ` : ''}Мой контакт: ${contact}`;
    return `https://t.me/${siteConfig.contact.telegram.split('/').pop()}?text=${encodeURIComponent(text)}`;
  };

  return (
    <Section id="bonus" className="bg-brand-darker relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-lime/5 to-transparent opacity-50" />
      
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatePresence mode="wait">
            {gameState === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
                className="glass-panel p-8 md:p-12 rounded-3xl border border-brand-lime/20"
              >
                <div className="w-16 h-16 bg-brand-lime/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Gift className="w-8 h-8 text-brand-lime" aria-hidden="true" />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                  Получите скидку 10%
                </h2>
                <p className="text-brand-muted text-lg mb-8 max-w-md mx-auto">
                  Соберите колесо за 10 секунд, чтобы разблокировать персональный промокод на первый вызов.
                </p>
                <Button size="lg" onClick={() => setGameState("playing")} className="px-10">
                  <Play className="w-5 h-5 mr-2" aria-hidden="true" />
                  Начать игру
                </Button>
              </motion.div>
            )}

            {gameState === "playing" && (
              <motion.div
                key="playing"
                initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.1 }}
                className="glass-panel p-8 md:p-12 rounded-3xl border border-brand-lime/50 text-center"
              >
                <h3 className="text-2xl font-bold text-white mb-8">Закрутите все болты!</h3>
                
                <button 
                  type="button"
                  className="relative w-48 h-48 mx-auto mb-8 cursor-pointer select-none touch-manipulation focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-lime rounded-full block"
                  onClick={handleClick}
                  aria-label="Нажать чтобы закрутить болты"
                >
                  {/* Tire base */}
                  <div className="absolute inset-0 rounded-full border-[16px] border-[#1a1a1a] bg-[#2a2a2a] shadow-inner flex items-center justify-center pointer-events-none">
                    {/* Rim */}
                    <div className="w-24 h-24 rounded-full border-4 border-[#4a4a4a] bg-[#3a3a3a] flex items-center justify-center relative">
                      {/* Center cap */}
                      <div className="w-8 h-8 rounded-full bg-brand-lime/20 flex items-center justify-center">
                        <span className="text-brand-lime font-bold text-xs" aria-hidden="true">X</span>
                      </div>
                      
                      {/* Bolts (visual representation of progress) */}
                      {[0, 72, 144, 216, 288].map((deg, i) => {
                        const isTight = progress > i * 20;
                        return (
                          <div 
                            key={deg}
                            className={`absolute w-4 h-4 rounded-full transition-colors duration-300 motion-reduce:transition-none ${isTight ? 'bg-brand-lime' : 'bg-[#5a5a5a]'}`}
                            style={{
                              transform: `rotate(${deg}deg) translateY(-28px)`,
                            }}
                            aria-hidden="true"
                          />
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Progress ring overlay */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" aria-hidden="true">
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
                      className="transition-all duration-200 ease-out motion-reduce:transition-none"
                    />
                  </svg>
                </button>
                
                <p className="text-brand-muted mb-4" aria-live="polite">Прогресс: {progress}%</p>
                <div className="w-full bg-white/10 rounded-full h-2 mb-2" aria-hidden="true">
                  <div 
                    className="bg-brand-lime h-2 rounded-full transition-all duration-200 motion-reduce:transition-none"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </motion.div>
            )}

            {gameState === "won" && (
              <motion.div
                key="won"
                initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
                className="glass-panel p-8 md:p-12 rounded-3xl border border-brand-lime bg-brand-lime/5"
              >
                <div className="w-20 h-20 bg-brand-lime rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(180,255,0,0.4)]">
                  <CheckCircle2 className="w-10 h-10 text-brand-dark" aria-hidden="true" />
                </div>
                <h2 className="text-3xl font-display font-bold text-white mb-2">
                  Отличная работа!
                </h2>
                <p className="text-brand-lime font-medium text-lg mb-8">
                  Ваша скидка 10% активирована
                </p>
                
                <div className="bg-brand-darker rounded-xl p-6 mb-8 border border-white/10">
                  <p className="text-sm text-brand-muted mb-4">Ваш промокод:</p>
                  <div className="text-3xl font-mono font-bold tracking-widest text-white bg-white/5 py-3 rounded-lg border border-white/10" aria-label="Промокод XPRESS10">
                    XPRESS10
                  </div>
                </div>
                
                <Button size="lg" onClick={() => setGameState("form")} className="w-full sm:w-auto px-10">
                  Использовать скидку
                </Button>
              </motion.div>
            )}

            {gameState === "form" && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
                className="glass-panel p-8 md:p-12 rounded-3xl border border-brand-lime/20 text-left"
              >
                <h3 className="text-2xl font-bold text-white mb-2 text-center">Куда приехать?</h3>
                <p className="text-brand-muted mb-8 text-center">
                  Оставьте контакт, и мы свяжемся с вами для уточнения деталей.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-brand-muted mb-1">Имя (необязательно)</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime"
                      placeholder="Иван"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact" className="block text-sm font-medium text-brand-muted mb-1">Телефон или Telegram *</label>
                    <input
                      type="text"
                      id="contact"
                      value={contact}
                      onChange={(e) => {
                        setContact(e.target.value);
                        if (error) setError("");
                      }}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime"
                      placeholder="+7 (999) 000-00-00 или @username"
                      aria-invalid={!!error}
                      aria-describedby={error ? "contact-error" : undefined}
                    />
                    {error && <p id="contact-error" className="text-red-400 text-sm mt-1" role="alert">{error}</p>}
                  </div>
                  <Button type="submit" size="lg" className="w-full mt-4">
                    Продолжить
                  </Button>
                </form>
              </motion.div>
            )}

            {gameState === "done" && (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel p-8 md:p-12 rounded-3xl border border-brand-lime bg-brand-lime/5"
              >
                <h3 className="text-2xl font-bold text-white mb-4">Отлично, {name || 'готово'}!</h3>
                <p className="text-brand-muted mb-8">
                  Выберите удобный способ связи, чтобы подтвердить заявку со скидкой.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <ButtonLink href={siteConfig.contact.phoneLink} size="lg">
                    <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
                    Позвонить сейчас
                  </ButtonLink>
                  <ButtonLink 
                    href={getTelegramLink()} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    variant="secondary" 
                    size="lg"
                  >
                    <Send className="w-5 h-5 mr-2 text-[#229ED9]" aria-hidden="true" />
                    Отправить в Telegram
                  </ButtonLink>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  );
}
