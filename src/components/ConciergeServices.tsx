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

type ServiceCardProps = {
  role: string;
  price: string;
  description: string;
  delayClass: string;
  gridClass?: string;
};

function ServiceCard({ role, price, description, delayClass, gridClass = "" }: ServiceCardProps) {
  return (
    <article
      className={`luxe-card flex h-full flex-col p-5 sm:p-6 reveal-item ${delayClass} ${gridClass}`}
    >
      <div className="flex flex-1 flex-col">
        <h3 className="card-title">{role}</h3>
        <p className="mt-1.5 font-sans text-[0.9375rem] font-semibold tracking-[0.01em] text-sepia">
          {price}
        </p>
        <p className="mt-2.5 body-text text-[0.875rem] leading-[1.6]">{description}</p>
      </div>
      <a
        href={serviceWhatsAppHref(role)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Solicitar serviço de ${role} pelo WhatsApp`}
        className="btn-pill-primary mt-5 w-full max-w-full"
      >
        Solicitar serviço
      </a>
    </article>
  );
}

export function ConciergeServices() {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="concierge"
      className={`section-band section-pad scroll-mt-[4.5rem] ${visible ? "section-visible" : ""}`}
    >
      <div className="section-shell">
        <header className="section-header text-center sm:text-left">
          <h2 className="section-title reveal-item">
            Concierge MHV:{" "}
            <span className="whitespace-nowrap">Serviços de Casa</span>
          </h2>
          <p className="section-lead reveal-item reveal-item-delay-1">
            MHV — Você vive. A gente cuida.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
          {services.map((service, index) => (
            <ServiceCard
              key={service.role}
              role={service.role}
              price={service.price}
              description={service.description}
              delayClass={revealDelay(index + 2)}
              gridClass={`h-full lg:col-span-2 ${index === 3 ? "lg:col-start-2" : ""}`}
            />
          ))}
        </div>

        <div className={`mt-7 overflow-hidden rounded-2xl border border-stone-200/45 bg-white/50 reveal-item ${revealDelay(7)}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-stone-200/45">
            {ruleCards.map((card, index) => (
              <div
                key={card.title}
                className={`border-b border-stone-200/45 px-5 py-4 sm:px-6 sm:py-4 ${index === ruleCards.length - 1 ? "border-b-0" : ""} md:border-b-0`}
              >
                <h3 className="font-sans text-[0.875rem] font-semibold tracking-[0.01em] text-petroleum">
                  {card.title}
                </h3>
                <p className="mt-1.5 body-text text-[0.8125rem] leading-[1.6]">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
