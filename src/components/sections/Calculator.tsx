import { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Calculator as CalcIcon, Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/src/config/data";
import { Container } from "@/src/components/ui/Container";
import { Section, SectionHeader } from "@/src/components/ui/Section";
import { ButtonLink } from "@/src/components/ui/Button";
import { cn } from "@/src/utils/cn";

export function Calculator() {
  const shouldReduceMotion = useReducedMotion();
  const [service, setService] = useState(siteConfig.services[0].id);
  const [radius, setRadius] = useState(Object.keys(siteConfig.calculator.radiusMultipliers)[0]);
  const [vehicle, setVehicle] = useState(Object.keys(siteConfig.calculator.vehicleTypes)[0]);
  const [urgency, setUrgency] = useState(Object.keys(siteConfig.calculator.urgency)[0]);
  const [distance, setDistance] = useState(Object.keys(siteConfig.calculator.distance)[0]);

  const isDistanceUrgencyOnly = service === "battery" || service === "fuel";
  const estimatedPrice = useMemo(() => {
    const baseService = siteConfig.services.find((s) => s.id === service);
    const basePrice = baseService
      ? baseService.priceFrom
      : siteConfig.calculator.basePrice;

    const radiusMult = isDistanceUrgencyOnly
      ? 1
      : siteConfig.calculator.radiusMultipliers[
      radius as keyof typeof siteConfig.calculator.radiusMultipliers
      ] || 1;

    const vehicleMult = isDistanceUrgencyOnly
      ? 1
      : siteConfig.calculator.vehicleTypes[
      vehicle as keyof typeof siteConfig.calculator.vehicleTypes
      ] || 1;

    const urgencyMult =
      siteConfig.calculator.urgency[
      urgency as keyof typeof siteConfig.calculator.urgency
      ] || 1;

    const distanceAdd =
      siteConfig.calculator.distance[
      distance as keyof typeof siteConfig.calculator.distance
      ] || 0;

    return Math.round(basePrice * radiusMult * vehicleMult * urgencyMult + distanceAdd);
  }, [service, radius, vehicle, urgency, distance, isDistanceUrgencyOnly]);

  return (
    <Section id="calculator" className="bg-brand-dark">
      <Container>
        <SectionHeader
          title="Калькулятор стоимости"
          subtitle="Предварительный расчет"
        />

        <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-6 md:p-10 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Service */}
              <div>
                <label className="block text-sm font-medium text-brand-muted mb-3 uppercase tracking-wider">Услуга</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {siteConfig.services.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setService(s.id)}
                      className={cn(
                        "px-4 py-3 rounded-xl text-left text-sm font-medium transition-all border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime",
                        service === s.id
                          ? "bg-brand-lime/10 border-brand-lime text-brand-lime"
                          : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                      )}
                      aria-pressed={service === s.id}
                    >
                      {s.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Radius & Vehicle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="radius-select" className="block text-sm font-medium text-brand-muted mb-3 uppercase tracking-wider">Радиус колес</label>
                  <select
                    id="radius-select"
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                    disabled={isDistanceUrgencyOnly}
                    className={cn(
                      "w-full border rounded-xl px-4 py-3 text-white appearance-none",
                      isDistanceUrgencyOnly
                        ? "bg-white/[0.03] border-white/5 text-brand-muted cursor-not-allowed opacity-50"
                        : "bg-white/5 border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime"
                    )}
                  >
                    {Object.keys(siteConfig.calculator.radiusMultipliers).map((r) => (
                      <option key={r} value={r} className="bg-brand-dark text-white">{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="vehicle-select" className="block text-sm font-medium text-brand-muted mb-3 uppercase tracking-wider">Тип авто</label>
                  <select
                    id="vehicle-select"
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    disabled={isDistanceUrgencyOnly}
                    className={cn(
                      "w-full border rounded-xl px-4 py-3 text-white appearance-none",
                      isDistanceUrgencyOnly
                        ? "bg-white/[0.03] border-white/5 text-brand-muted cursor-not-allowed opacity-50"
                        : "bg-white/5 border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime"
                    )}
                  >
                    {Object.keys(siteConfig.calculator.vehicleTypes).map((v) => (
                      <option key={v} value={v} className="bg-brand-dark text-white">{v}</option>
                    ))}
                  </select>
                </div>
              </div>
              {isDistanceUrgencyOnly ? (
                <p className="text-sm text-brand-muted -mt-4">
                  Для этой услуги учитываются только срочность и удаленность. Параметры радиуса и типа авто не влияют на расчет.
                </p>
              ) : null}
              {/* Urgency & Distance */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-brand-muted mb-3 uppercase tracking-wider">Срочность</label>
                  <div className="flex flex-col gap-2">
                    {Object.keys(siteConfig.calculator.urgency).map((u) => (
                      <button
                        key={u}
                        type="button"
                        onClick={() => setUrgency(u)}
                        className={cn(
                          "px-4 py-2 rounded-lg text-left text-sm transition-all border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime",
                          urgency === u
                            ? "bg-brand-lime/10 border-brand-lime text-brand-lime"
                            : "bg-transparent border-transparent text-brand-muted hover:text-white"
                        )}
                        aria-pressed={urgency === u}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-muted mb-3 uppercase tracking-wider">Удаленность</label>
                  <div className="flex flex-col gap-2">
                    {Object.keys(siteConfig.calculator.distance).map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDistance(d)}
                        className={cn(
                          "px-4 py-2 rounded-lg text-left text-sm transition-all border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime",
                          distance === d
                            ? "bg-brand-lime/10 border-brand-lime text-brand-lime"
                            : "bg-transparent border-transparent text-brand-muted hover:text-white"
                        )}
                        aria-pressed={distance === d}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="lg:col-span-1 bg-brand-darker rounded-2xl p-6 md:p-8 flex flex-col justify-between border border-white/5">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-brand-lime/10 flex items-center justify-center text-brand-lime">
                    <CalcIcon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Итого</h3>
                </div>

                <div className="mb-2">
                  <span className="text-sm text-brand-muted uppercase tracking-wider">Ориентировочно</span>
                </div>

                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-sm text-brand-muted">от</span>
                  <motion.span
                    key={estimatedPrice}
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-display font-bold text-brand-lime"
                  >
                    {estimatedPrice.toLocaleString('ru-RU')}
                  </motion.span>
                  <span className="text-xl text-brand-muted">₽</span>
                </div>

                <p className="text-xs text-brand-muted mb-8 leading-relaxed">
                  * Расчет является предварительным. Точная стоимость зависит от сложности работ и расходных материалов.
                </p>
              </div>

              <div className="space-y-3">
                <ButtonLink href={siteConfig.contact.phoneLink} className="w-full">
                  <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                  Вызвать мастера
                </ButtonLink>
                <ButtonLink
                  href={siteConfig.contact.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  className="w-full"
                >
                  <MessageCircle className="w-4 h-4 mr-2 text-[#229ED9]" aria-hidden="true" />
                  Уточнить в Telegram
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
