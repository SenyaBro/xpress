import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Clock, Shield, Zap } from "lucide-react";
import { siteConfig } from "@/src/config/data";
import { Container } from "@/src/components/ui/Container";
import { Section, SectionHeader } from "@/src/components/ui/Section";

const icons = {
  "Экономия времени": Clock,
  "Удобство": Zap,
  "Надежность": Shield,
};

export function About() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section id="about" className="bg-brand-darker">
      <Container>
        <SectionHeader
          title={siteConfig.about.title}
          subtitle="Концепция"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {siteConfig.about.features.map((feature, index) => {
            const Icon = icons[feature.title as keyof typeof icons] || CheckCircle2;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : index * 0.1 }}
                className="glass-panel p-8 rounded-3xl relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-lime/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 motion-reduce:transition-none" />

                <div className="w-14 h-14 rounded-2xl bg-brand-lime/10 flex items-center justify-center mb-6 text-brand-lime relative z-10">
                  <Icon className="w-7 h-7" aria-hidden="true" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 relative z-10">
                  {feature.title}
                </h3>
                <p className="text-brand-muted leading-relaxed relative z-10">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Equipment Sub-section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {siteConfig.about.equipment.title}
            </h3>
            <p className="text-brand-muted max-w-2xl mx-auto">
              {siteConfig.about.equipment.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {siteConfig.about.equipment.items.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : index * 0.1 }}
                className="group rounded-3xl overflow-hidden glass-panel border border-white/5"
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-brand-dark">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-white mb-2">{item.name}</h4>
                  <p className="text-sm text-brand-muted">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
