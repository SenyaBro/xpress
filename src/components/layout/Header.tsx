import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/src/config/data";
import { Container } from "@/src/components/ui/Container";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "О нас", href: "#about" },
    { name: "Услуги", href: "#services" },
    { name: "Цены", href: "#pricing" },
    { name: "Калькулятор", href: "#calculator" },
    { name: "Контакты", href: "#contacts" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-brand-dark/90 backdrop-blur-md border-b border-white/5 py-3" : "bg-transparent py-5"
        }`}
    >
      <Container className="flex items-center justify-between">
        <a
          href="#"
          className="flex items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime"
        >
          <img
            src="/logo-xpresso.png"
            alt="Х-прессО"
            className="h-10 md:h-12 w-auto object-contain"
          />
        </a>
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-brand-muted hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime rounded px-2 py-1"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={siteConfig.contact.phoneLink}
            className="flex items-center gap-2 text-sm font-medium text-white hover:text-brand-lime transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime rounded px-2 py-1"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            {siteConfig.contact.phone}
          </a>
          <a
            href={siteConfig.contact.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime"
          >
            <MessageCircle className="w-4 h-4 text-[#229ED9]" aria-hidden="true" />
            Telegram
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime rounded-lg"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-brand-dark border-b border-white/10 p-4 md:hidden flex flex-col gap-4 shadow-2xl"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="h-px bg-white/10 w-full my-2" />
            <div className="flex flex-col gap-3">
              <a
                href={siteConfig.contact.phoneLink}
                className="flex items-center justify-center gap-2 bg-brand-lime text-brand-dark px-4 py-3 rounded-xl font-medium"
              >
                <Phone className="w-5 h-5" />
                {siteConfig.contact.phone}
              </a>
              <a
                href={siteConfig.contact.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white/10 text-white px-4 py-3 rounded-xl font-medium"
              >
                <MessageCircle className="w-5 h-5 text-[#229ED9]" />
                Написать в Telegram
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
