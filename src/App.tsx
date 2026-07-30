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
      <StickyNav />
      <main className="overflow-x-hidden">
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
