import { useId, useState } from "react";
import { useReveal } from "../hooks/useReveal";
import { revealDelay } from "../utils/revealDelay";

const faqItems = [
  {
    title: "Caução",
    body: "Algumas reservas podem exigir caução, devolvida após a vistoria do imóvel caso não existam danos.",
  },
  {
    title: "Visitantes",
    body: "Visitantes extras devem ser previamente autorizados conforme as regras da propriedade.",
  },
  {
    title: "Enxoval",
    body: "Todas as casas são entregues preparadas com enxoval e utensílios básicos.",
  },
  {
    title: "Suporte",
    body: "Durante toda a hospedagem o concierge permanece disponível para auxiliar.",
  },
  {
    title: "Manutenção",
    body: "Caso ocorra qualquer problema na casa, o hóspede deve comunicar imediatamente para que a equipe providencie atendimento.",
  },
];

type AccordionItemProps = {
  title: string;
  body: string;
  isOpen: boolean;
  onToggle: () => void;
  triggerId: string;
  panelId: string;
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
      className={`h-3.5 w-3.5 text-sepia transition-transform duration-luxe ease-luxe motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
    >
      <path d="M5 7.5 10 12.5 15 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AccordionItem({ title, body, isOpen, onToggle, triggerId, panelId }: AccordionItemProps) {
  return (
    <div className="border-b border-stone-200/45 last:border-b-0">
      <h3>
        <button
          type="button"
          id={triggerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full min-h-[44px] items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-luxe ease-luxe hover:bg-sand/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-petroleum/40 sm:px-6"
        >
          <span className="font-sans text-[0.9375rem] font-semibold tracking-[0.01em] text-petroleum">
            {title}
          </span>
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-stone-200/50 bg-white/70">
            <ChevronIcon open={isOpen} />
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!isOpen}
        className={`grid transition-[grid-template-rows] duration-luxe ease-luxe motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-4 body-text text-[0.875rem] leading-[1.6] sm:px-6 sm:pb-5">
            {body}
          </p>
        </div>
      </div>
    </div>
  );
}

export function AccommodationInfo() {
  const baseId = useId();
  const { ref, visible } = useReveal<HTMLElement>();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      id="informacoes"
      className={`section-band section-pad-tight scroll-mt-[4.5rem] ${visible ? "section-visible" : ""}`}
    >
      <div className="section-shell">
        <header className="section-header mb-6 text-center sm:mb-8 sm:text-left">
          <h2 className="section-title reveal-item">Informações da Hospedagem</h2>
        </header>

        <div className={`mx-auto max-w-[960px] luxe-card reveal-item ${revealDelay(1)}`}>
          {faqItems.map((item, index) => (
            <AccordionItem
              key={item.title}
              title={item.title}
              body={item.body}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              triggerId={`${baseId}-trigger-${index}`}
              panelId={`${baseId}-panel-${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
