import { motion } from "framer-motion";
import { siteConfig } from "@/src/config/data";
import { Container } from "@/src/components/ui/Container";
import { Section, SectionHeader } from "@/src/components/ui/Section";

export function Pricing() {
  return (
    <Section id="pricing" className="bg-brand-dark">
      <Container>
        <SectionHeader
          title="Стоимость услуг"
          subtitle="Цены"
        />
        <div className="max-w-3xl mx-auto glass-panel p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl">
          <div className="flex flex-col gap-6">
            {siteConfig.services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center justify-between border-b border-white/5 pb-6 last:border-0 last:pb-0"
              >
                <div className="pr-4 flex-1">
                  <h4 className="text-lg font-bold text-white mb-1">{service.title}</h4>
                  {service.description ? (
                    <p className="text-sm text-brand-muted">{service.description}</p>
                  ) : null}
                  {service.note ? (
                    <p className="text-xs text-brand-muted mt-2">{service.note}</p>
                  ) : null}
                </div>
                <div className="text-right pl-4 shrink-0">
                  <span className="text-xl font-display font-bold text-brand-lime text-right">
                    {service.price}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 pt-6 border-t border-white/10 text-center">
            <p className="text-sm text-brand-muted">
              Конечная стоимость уточняется при оформлении заказа. <br className="hidden sm:block" />
              Воспользуйтесь <a href="#calculator" className="text-brand-lime hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime rounded px-1">калькулятором</a> для предварительного расчета.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
