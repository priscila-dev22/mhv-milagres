import { useId, useState } from "react";
import { useReveal } from "../hooks/useReveal";
import { revealDelay } from "../utils/revealDelay";

const CHAMPAGNE = "#E8D9B5";

const hospitalityItems = [
  {
    title: "Caução e garantia",
    body: "Algumas reservas podem incluir caução, devolvida após a vistoria de saída, desde que o imóvel seja entregue nas condições acordadas.",
  },
  {
    title: "Recebendo visitantes",
    body: "Para preservar a tranquilidade e a segurança da hospedagem, visitantes devem ser previamente autorizados conforme a política de cada propriedade.",
  },
  {
    title: "Enxoval completo",
    body: "Cada casa é recebida com enxoval impecável e utensílios essenciais, para que você se sinta em casa desde o primeiro momento.",
  },
  {
    title: "Concierge e suporte",
    body: "Durante toda a estadia, nossa equipe de concierge permanece disponível para auxiliar sempre que necessário.",
  },
  {
    title: "Assistência durante a estadia",
    body: "Se surgir qualquer necessidade na casa, basta avisar — nossa equipe organizará o atendimento com agilidade e discrição.",
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
      strokeWidth="1.25"
      aria-hidden
      className={`h-3 w-3 text-petroleum/70 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
    >
      <path d="M5 7.5 10 12.5 15 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AccordionItem({ title, body, isOpen, onToggle, triggerId, panelId }: AccordionItemProps) {
  return (
    <div className="border-b border-stone-200/35 last:border-b-0">
      <h3>
        <button
          type="button"
          id={triggerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full min-h-[44px] items-center justify-between gap-4 py-5 text-left transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-stone-100/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-petroleum/35 sm:py-[1.375rem]"
        >
          <span className="editorial-title-card">{title}</span>
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-stone-200/45 bg-[#FAF8F5]"
            style={{ boxShadow: "0 1px 6px rgba(23, 52, 58, 0.04)" }}
          >
            <ChevronIcon open={isOpen} />
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!isOpen}
        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <p className="editorial-body pb-6 pr-2 sm:pb-7 sm:pr-4">{body}</p>
        </div>
      </div>
    </div>
  );
}

export function AccommodationInfo() {
  const baseId = useId();
  const { ref, visible } = useReveal<HTMLElement>();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      ref={ref}
      id="informacoes"
      className={`section-band section-pad scroll-mt-[4.5rem] ${visible ? "section-visible" : ""}`}
    >
      <div className="section-shell">
        <div className={`reveal-item mx-auto max-w-3xl ${revealDelay(1)}`}>
            <header className="mb-6 sm:mb-7">
              <p className="editorial-label">Informações da hospedagem</p>
              <span
                className="mt-4 block h-px w-9"
                style={{ backgroundColor: CHAMPAGNE }}
                aria-hidden
              />
            </header>

            <div className="border-t border-stone-200/40">
              {hospitalityItems.map((item, index) => (
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
      </div>
    </section>
  );
}
