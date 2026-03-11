import { siteConfig } from "@/src/config/data";
import { Container } from "@/src/components/ui/Container";

export function Footer() {
  return (
    <footer className="bg-brand-darker py-12 border-t border-white/5">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <a
              href="#"
              className="inline-flex items-center mb-4 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime"
            >
              <img
                src={`${import.meta.env.BASE_URL}logo-xpresso.jpg`}
                alt="Экспрессо"
                className="h-10 w-auto object-contain"
              />
            </a>
            <p className="text-brand-muted max-w-sm">
              {siteConfig.description}. Быстрый, надежный и современный сервис для вашего автомобиля.
            </p>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Навигация</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-brand-muted hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime rounded px-1 -ml-1">О нас</a></li>
              <li><a href="#services" className="text-brand-muted hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime rounded px-1 -ml-1">Услуги</a></li>
              <li><a href="#pricing" className="text-brand-muted hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime rounded px-1 -ml-1">Цены</a></li>
              <li><a href="#calculator" className="text-brand-muted hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime rounded px-1 -ml-1">Калькулятор</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Контакты</h4>
            <ul className="space-y-2">
              <li>
                <a href={siteConfig.contact.phoneLink} className="text-brand-lime hover:underline font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime rounded px-1 -ml-1">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="text-brand-muted">{siteConfig.contact.schedule}</li>
              <li className="text-brand-muted text-sm">{siteConfig.contact.address}</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-brand-muted text-sm">
            © {new Date().getFullYear()} {siteConfig.name}. Все права защищены.
          </p>
          <div className="flex items-center gap-4 text-sm text-brand-muted">
            <a href="#" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime rounded px-1">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lime rounded px-1">Договор оферты</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}