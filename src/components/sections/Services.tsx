import { motion, useReducedMotion } from "framer-motion";
import { RefreshCw, Wrench, Target, Box, Zap, Fuel, ArrowRight } from "lucide-react";
import { siteConfig } from "@/src/config/data";
import { Container } from "@/src/components/ui/Container";
import { Section, SectionHeader } from "@/src/components/ui/Section";

const iconMap = {
  refresh: RefreshCw,
  tool: Wrench,
  target: Target,
  box: Box,
  zap: Zap,
  fuel: Fuel,
};

export function Services() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section id="services" className="bg-brand-darker">
      <Container>
        <SectionHeader
          title="Наши услуги"
          subtitle="Что мы делаем"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.services.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || Wrench;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : index * 0.1 }}
                className="group relative glass-panel p-8 rounded-3xl overflow-hidden hover:border-brand-lime/20 transition-colors"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-lime/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 motion-reduce:transition-none" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 text-brand-lime group-hover:scale-110 transition-transform duration-300 motion-reduce:transition-none">
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-brand-muted mb-8 flex-grow">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                    <div className="flex flex-col">
                      <span className="text-xs text-brand-muted uppercase tracking-wider mb-1">Стоимость</span>
                      <span className="text-lg font-bold text-white">от {service.priceFrom} ₽</span>
                    </div>
                    <a 
                      href="#calculator" 
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-brand-lime group-hover:text-brand-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime"
                      aria-label={`Рассчитать стоимость для ${service.title}`}
                    >
                      <ArrowRight className="w-5 h-5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
