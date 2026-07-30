import { useReveal } from "../hooks/useReveal";
import { revealDelay } from "../utils/revealDelay";

type ListCard = {
  title: string;
  type: "list";
  items: string[];
};

type TextCard = {
  title: string;
  type: "text";
  body: string;
};

type Card = ListCard | TextCard;

const cards: Card[] = [
  {
    title: "Check-in",
    type: "list",
    items: [
      "Check-in a partir das 14h.",
      "Early Check-in gratuito mediante disponibilidade.",
      "Caso deseje garantir entrada antecipada, consulte nossa equipe.",
    ],
  },
  {
    title: "Check-out",
    type: "list",
    items: [
      "Check-out até as 10h.",
      "Late Check-out gratuito mediante disponibilidade.",
      "Caso deseje garantir saída estendida, consulte nossa equipe.",
    ],
  },
  {
    title: "Durante sua estadia",
    type: "text",
    body: "Nosso concierge poderá auxiliar com restaurantes, passeios, compras, experiências e suporte durante toda sua hospedagem.",
  },
  {
    title: "Suporte",
    type: "text",
    body: "Caso precise de qualquer ajuda durante sua estadia, basta entrar em contato com nossa equipe pelo WhatsApp.",
  },
];

export function StayPlanning() {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="estadia"
      className={`section-pad-tight scroll-mt-[4.5rem] ${visible ? "section-visible" : ""}`}
    >
      <div className="section-shell">
        <header className="section-header mb-6 text-center sm:mb-8 sm:text-left">
          <h2 className="section-title reveal-item">Planejando sua estadia</h2>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {cards.map((card, index) => (
            <div
              key={card.title}
              className={`luxe-card flex h-full flex-col p-5 sm:p-6 reveal-item ${revealDelay(index + 1)}`}
            >
              <h3 className="card-title">{card.title}</h3>
              {card.type === "list" ? (
                <ul className="mt-3 space-y-2 body-text text-[0.875rem] leading-[1.6]">
                  {card.items.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span
                        className="mt-[0.5em] h-1 w-1 shrink-0 rounded-full bg-sepia/70"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 body-text text-[0.875rem] leading-[1.6]">{card.body}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
