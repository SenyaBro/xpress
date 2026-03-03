import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { siteConfig } from "@/src/config/data";
import { Container } from "@/src/components/ui/Container";
import { Section, SectionHeader } from "@/src/components/ui/Section";

export function Coverage() {
  return (
    <Section id="coverage" className="bg-brand-dark relative overflow-hidden">
      {/* Abstract Map Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-brand-lime/20 border-dashed animate-[spin_60s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/10 animate-[spin_120s_linear_infinite_reverse]" />
      </div>

      <Container className="relative z-10">
        <SectionHeader
          title={siteConfig.coverage.title}
          subtitle="Зона выезда"
        />

        <div className="text-center mb-12">
          <p className="text-brand-muted text-lg max-w-2xl mx-auto">
            {siteConfig.coverage.description}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {siteConfig.coverage.zones.map((zone, index) => (
            <motion.div
              key={zone}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex items-center gap-2 bg-brand-card/80 backdrop-blur-sm border border-white/5 px-6 py-3 rounded-full hover:border-brand-lime/30 hover:bg-white/5 transition-colors cursor-default"
            >
              <MapPin className="w-4 h-4 text-brand-lime" />
              <span className="text-white font-medium">{zone}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
