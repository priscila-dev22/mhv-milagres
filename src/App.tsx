import { AccommodationInfo } from "./components/AccommodationInfo";
import { ConciergeServices } from "./components/ConciergeServices";
import { Footer } from "./components/Footer";
import { Gastronomy } from "./components/Gastronomy";
import { Hero } from "./components/Hero";
import { JetSki } from "./components/JetSki";
import { RouteMap } from "./components/RouteMap";
import { StayPlanning } from "./components/StayPlanning";
import { StickyNav } from "./components/StickyNav";
import { ToursMosaic } from "./components/ToursMosaic";
import { WhatsAppConcierge } from "./components/WhatsAppConcierge";

export default function App() {
  return (
    <div className="min-h-screen bg-sand antialiased">
      <a href="#conteudo-principal" className="skip-link">
        Pular para o conteúdo
      </a>
      <StickyNav />
      <main id="conteudo-principal" className="overflow-x-hidden" tabIndex={-1}>
        <Hero />
        <StayPlanning />
        <AccommodationInfo />
        <Gastronomy />
        <ToursMosaic />
        <JetSki />
        <ConciergeServices />
        <RouteMap />
      </main>
      <Footer />
      <WhatsAppConcierge />
    </div>
  );
}
