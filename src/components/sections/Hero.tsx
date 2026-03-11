import { motion, useReducedMotion } from "framer-motion";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { siteConfig } from "@/src/config/data";
import { Container } from "@/src/components/ui/Container";
import { ButtonLink } from "@/src/components/ui/Button";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-brand-dark">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-lime/10 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-brand-dark to-transparent" />
      </div>


      <Container className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-brand-lime motion-safe:animate-pulse" />
          <span className="text-sm font-medium text-white/80 uppercase tracking-wider">
            {siteConfig.name} • {siteConfig.description
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter text-white mb-6 leading-[1.1]"
        >
          {siteConfig.hero.title} <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-lime to-[#85cc00]">
            {siteConfig.hero.subtitle}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.2 }}
          className="text-lg md:text-xl text-brand-muted max-w-2xl mb-10 leading-relaxed"
        >
          {siteConfig.hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <ButtonLink
            href={siteConfig.contact.phoneLink}
            size="lg"
            className="w-full sm:w-auto group"
          >
            <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
            Позвонить
            <ArrowRight
              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform motion-reduce:transition-none"
              aria-hidden="true"
            />
          </ButtonLink>

          <ButtonLink
            href={siteConfig.contact.telegram}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto group bg-[#229ED9]/10 text-[#229ED9] hover:bg-[#229ED9]/20 border border-[#229ED9]/20"
          >
            <MessageCircle className="w-5 h-5 mr-2" aria-hidden="true" />
            Написать в Telegram
          </ButtonLink>
        </motion.div>

        {!shouldReduceMotion && (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -right-20 top-20 w-64 h-64 rounded-full border border-white/5 border-dashed opacity-50 hidden lg:block pointer-events-none"
              aria-hidden="true"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{
                duration: 60,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -left-32 bottom-20 w-96 h-96 rounded-full border border-brand-lime/10 border-dashed opacity-30 hidden lg:block pointer-events-none"
              aria-hidden="true"
            />
          </>
        )}
      </Container>
    </section>
  );
}