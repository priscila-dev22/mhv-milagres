import { useReveal } from "../hooks/useReveal";
import { revealDelay } from "../utils/revealDelay";
import { WHATSAPP_NUMBER } from "./WhatsAppConcierge";

const services = [
  {
    role: "Cozinheira",
    price: "R$ 300 / dia",
    description: "Preparo de refeições personalizadas durante a estadia.",
  },
  {
    role: "Camareira / Auxiliar",
    price: "R$ 200 / dia",
    description: "Apoio na organização e manutenção diária da casa.",
  },
  {
    role: "Churrasqueiro",
    price: "R$ 350 / dia",
    description: "Preparo e serviço de churrasco para momentos especiais.",
  },
  {
    role: "Barman",
    price: "R$ 300 / dia",
    description: "Preparo de drinks e atendimento durante a experiência.",
  },
  {
    role: "Babá",
    price: "R$ 350 / dia",
    description: "Acompanhamento e cuidado infantil durante a hospedagem.",
  },
];

const ruleCards = [
  {
    title: "Horas extras",
    body: "Serviços seguem jornada combinada. Horas adicionais podem ser faturadas conforme tabela do concierge — solicite cotação antes da estadia.",
  },
  {
    title: "Compras de insumos",
    body: "Opção 1: Indicação em Maceió. Opção 2: Compras pela cozinheira (taxa 20%).",
  },
  {
    title: "Confirmação",
    body: "Pagamento de 50% até 10 dias antes do check-in.",
  },
];

function serviceWhatsAppHref(serviceName: string) {
  const message = `Olá! Estou hospedado pela MHV Milagres e gostaria de solicitar o serviço de ${serviceName}.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const ctaClass =
  "concierge-service-cta group inline-flex min-h-11 items-center gap-2 border-b border-petroleum/20 pb-1 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-petroleum transition-[color,border-color,transform] duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:border-petroleum/45 hover:text-sepia focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-petroleum/40 motion-reduce:transition-none";

type ConciergeServiceItemProps = {
  index: number;
  role: string;
  price: string;
  description: string;
  delayClass: string;
};

function ConciergeServiceItem({
  index,
  role,
  price,
  description,
  delayClass,
}: ConciergeServiceItemProps) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <article
      className={`concierge-service-item group reveal-item flex flex-col ${delayClass}`}
    >
      <div className="flex flex-col gap-3 sm:gap-3.5">
        <p className="concierge-service-num font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-sepia/75">
          {num}
        </p>
        <h3 className="concierge-service-name font-serif text-[clamp(1.5625rem,2.5vw,2.25rem)] font-medium leading-[1.12] tracking-[-0.02em] text-petroleum transition-colors duration-300 group-hover:text-sepia/95">
          {role}
        </h3>
      </div>

      <p className="concierge-service-desc mt-5 max-w-[36ch] flex-1 font-sans text-base font-normal leading-[1.72] tracking-[0.01em] text-stone-700 sm:mt-6">
        {description}
      </p>

      <div className="mt-8 flex flex-col items-start gap-5 sm:mt-9">
        <p className="font-sans text-[clamp(1rem,1.15vw,1.125rem)] font-medium tracking-[0.01em] text-sepia">
          {price}
        </p>
        <a
          href={serviceWhatsAppHref(role)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Solicitar serviço de ${role} pelo WhatsApp`}
          className={ctaClass}
        >
          <span>Solicitar serviço</span>
          <span
            className="concierge-service-cta-arrow inline-block transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] motion-reduce:transition-none"
            aria-hidden
          >
            →
          </span>
        </a>
      </div>
    </article>
  );
}

export function ConciergeServices() {
  const { ref, visible } = useReveal<HTMLElement>(0.08);

  return (
    <section
      ref={ref}
      id="concierge"
      aria-labelledby="concierge-titulo"
      className={`concierge-section scroll-mt-[4.5rem] bg-sand pb-[clamp(5rem,10vw,9.375rem)] pt-[clamp(5rem,10vw,9.375rem)] ${visible ? "section-visible" : ""}`}
    >
      <div className="section-shell px-5 md:px-5 lg:px-6">
        <header className="concierge-intro reveal-item lg:flex lg:items-end lg:justify-between lg:gap-12 xl:gap-20">
          <div className="min-w-0 lg:max-w-[min(100%,42rem)]">
            <p className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.26em] text-sepia/90">
              Concierge MHV
            </p>
            <h2
              id="concierge-titulo"
              className="mt-4 font-serif text-[clamp(2.625rem,5vw,4.75rem)] font-medium leading-[1.06] tracking-[-0.025em] text-petroleum sm:mt-5"
            >
              Você aproveita. A gente cuida.
            </h2>
          </div>
          <p className="concierge-intro-lead mt-6 max-w-[34ch] font-sans text-[clamp(0.9375rem,1.35vw,1.0625rem)] font-normal leading-[1.75] tracking-[0.012em] text-stone-600 lg:mt-0 lg:max-w-[22rem] lg:pb-1 xl:max-w-[24rem]">
            Serviços selecionados para tornar sua estadia mais confortável,
            prática e especial, do início ao fim.
          </p>
        </header>

        <div
          className="concierge-catalog reveal-item mt-[clamp(4rem,7vh,6.25rem)] border-b border-stone-200/45"
          role="list"
          aria-label="Catálogo de serviços do concierge"
        >
          {services.map((service, index) => (
            <div key={service.role} role="listitem" className="contents">
              <ConciergeServiceItem
                index={index}
                role={service.role}
                price={service.price}
                description={service.description}
                delayClass={revealDelay(index + 1)}
              />
            </div>
          ))}
        </div>

        <div
          className={`concierge-info reveal-item mt-[clamp(4.5rem,8vh,7.5rem)] border-t border-stone-200/45 ${revealDelay(6)}`}
          aria-label="Informações adicionais sobre serviços"
        >
          <div className="concierge-info-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {ruleCards.map((card, index) => (
              <div
                key={card.title}
                className={`concierge-info-col border-stone-200/45 py-8 sm:py-9 lg:px-8 lg:py-10 ${
                  index < ruleCards.length - 1 ? "border-b" : ""
                } ${index === 0 ? "sm:border-r sm:pr-6 lg:pr-8" : ""} ${
                  index === 1
                    ? "max-sm:border-b sm:border-b-0 lg:border-r lg:pl-6 lg:pr-8"
                    : ""
                } ${index === 2 ? "sm:col-span-2 sm:max-w-[36rem] lg:col-span-1 lg:max-w-none lg:pl-6" : "sm:pl-6 lg:pl-8"} ${
                  index === 0 ? "sm:pl-0" : ""
                }`}
              >
                <h3 className="font-sans text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-petroleum">
                  {card.title}
                </h3>
                <p className="mt-3 font-sans text-[0.9375rem] font-normal leading-[1.72] tracking-[0.01em] text-stone-700 sm:mt-4">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
