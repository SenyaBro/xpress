import { motion, useReducedMotion } from "framer-motion";
import { Phone, MessageCircle, MapPin, Clock, Mail } from "lucide-react";
import { siteConfig } from "@/src/config/data";
import { Container } from "@/src/components/ui/Container";
import { Section, SectionHeader } from "@/src/components/ui/Section";
import { ButtonLink } from "@/src/components/ui/Button";

export function Contacts() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section id="contacts" className="bg-brand-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-lime/5 rounded-full blur-[100px] opacity-50 pointer-events-none" />
      
      <Container className="relative z-10">
        <SectionHeader
          title="Свяжитесь с нами"
          subtitle="Контакты"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                Готовы выехать прямо сейчас
              </h3>
              <p className="text-brand-muted text-lg mb-10 max-w-md">
                Оставьте заявку, и мы свяжемся с вами в течение 5 минут для уточнения деталей.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.1 }}
                className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-lime/10 flex items-center justify-center text-brand-lime">
                  <Phone className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm text-brand-muted mb-1">Телефон</p>
                  <a href={siteConfig.contact.phoneLink} className="text-xl font-bold text-white hover:text-brand-lime transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime rounded px-1 -ml-1">
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.2 }}
                className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#229ED9]/10 flex items-center justify-center text-[#229ED9]">
                  <MessageCircle className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm text-brand-muted mb-1">Мессенджеры</p>
                  <a href={siteConfig.contact.telegram} target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-white hover:text-[#229ED9] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#229ED9] rounded px-1 -ml-1">
                    Telegram
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.3 }}
                className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white">
                  <Clock className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm text-brand-muted mb-1">Режим работы</p>
                  <p className="text-lg font-bold text-white">
                    {siteConfig.contact.schedule}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.4 }}
                className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white">
                  <MapPin className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm text-brand-muted mb-1">Базирование</p>
                  <p className="text-base font-bold text-white leading-tight">
                    {siteConfig.contact.address}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Contact Form / CTA Box */}
          <motion.div
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-panel p-8 md:p-12 rounded-3xl border border-brand-lime/20 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-lime/10 to-transparent opacity-50" />
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2">Быстрый вызов</h3>
              <p className="text-brand-muted mb-8">
                Выберите удобный способ связи. Мы ответим моментально.
              </p>
              
              <div className="flex flex-col gap-4">
                <ButtonLink href={siteConfig.contact.phoneLink} size="lg" className="w-full h-16 text-lg">
                  <Phone className="w-6 h-6 mr-3" aria-hidden="true" />
                  Позвонить {siteConfig.contact.phone}
                </ButtonLink>
                
                <div className="relative flex items-center py-4">
                  <div className="flex-grow border-t border-white/10"></div>
                  <span className="flex-shrink-0 mx-4 text-brand-muted text-sm">или</span>
                  <div className="flex-grow border-t border-white/10"></div>
                </div>
                
                <ButtonLink 
                  href={siteConfig.contact.telegram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  variant="secondary" 
                  size="lg" 
                  className="w-full h-16 text-lg bg-[#229ED9]/10 text-[#229ED9] hover:bg-[#229ED9]/20 border border-[#229ED9]/20"
                >
                  <MessageCircle className="w-6 h-6 mr-3" aria-hidden="true" />
                  Написать в Telegram
                </ButtonLink>
                
                <ButtonLink 
                  href={siteConfig.contact.whatsapp} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  variant="outline" 
                  size="lg" 
                  className="w-full h-16 text-lg border-white/10 hover:bg-white/5"
                >
                  <MessageCircle className="w-6 h-6 mr-3 text-[#25D366]" aria-hidden="true" />
                  Написать в WhatsApp
                </ButtonLink>
              </div>
              
              <p className="text-xs text-brand-muted text-center mt-6">
                Нажимая на кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
