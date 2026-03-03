import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";
import { Hero } from "@/src/components/sections/Hero";
import { About } from "@/src/components/sections/About";
import { Coverage } from "@/src/components/sections/Coverage";
import { Services } from "@/src/components/sections/Services";
import { Calculator } from "@/src/components/sections/Calculator";
import { LeadMagnet } from "@/src/components/sections/LeadMagnet";
import { Contacts } from "@/src/components/sections/Contacts";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-dark text-brand-text font-sans selection:bg-brand-lime selection:text-brand-dark">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Coverage />
        <Services />
        <Calculator />
        <LeadMagnet />
        <Contacts />
      </main>
      <Footer />
    </div>
  );
}
