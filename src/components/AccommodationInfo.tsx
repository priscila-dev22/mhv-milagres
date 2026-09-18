import { useId, useState, type ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";
import { revealDelay } from "../utils/revealDelay";

const CHAMPAGNE = "#E8D9B5";

const SUPPORT_WHATSAPP_NUMBER = "5582988701957";
const SUPPORT_WHATSAPP_MESSAGE =
  "Olá! Estou hospedado pela MHV Milagres e preciso de ajuda.";
const SUPPORT_WHATSAPP_HREF = `https://wa.me/${SUPPORT_WHATSAPP_NUMBER}?text=${encodeURIComponent(SUPPORT_WHATSAPP_MESSAGE)}`;

const numberClass =
  "font-sans text-[0.625rem] font-medium tabular-nums tracking-[0.22em] text-wine/70";

const topicClass =
  "font-serif text-[1.5rem] font-normal leading-[1.15] tracking-[-0.015em] text-petroleum sm:text-[1.625rem] lg:text-[1.75rem]";

const labelClass =
  "font-sans text-[0.625rem] font-medium uppercase tracking-[0.16em] text-wine/70 sm:text-[0.6875rem]";

const bodyClass =
  "mt-1.5 font-sans text-[0.8125rem] font-normal leading-[1.6] tracking-[0.004em] text-stone-600 sm:text-[0.875rem] sm:leading-[1.65]";

const noteClass =
  "font-sans text-[0.75rem] font-normal leading-[1.6] text-stone-500 sm:text-[0.8125rem]";

function Em({ children }: { children: ReactNode }) {
  return <strong className="font-medium text-petroleum">{children}</strong>;
}

type Fact = {
  label: string;
  body: ReactNode;
};

type HospitalityItem = {
  title: string;
  facts: Fact[];
  note?: ReactNode;
};

const hospitalityItems: HospitalityItem[] = [
  {
    title: "Check-in",
    facts: [
      {
        label: "Horário padrão",
        body: (
          <>
            A partir das <Em>14h00</Em>.
          </>
        ),
      },
      {
        label: "Early check-in",
        body: (
          <>
            A partir das <Em>10h00</Em>, mediante disponibilidade e desde que
            não haja check-out da acomodação no mesmo dia.
          </>
        ),
      },
      {
        label: "Entrada antes das 10h00",
        body: (
          <>
            Caso o hóspede queira garantir o check-in antes das{" "}
            <Em>10h00</Em>, será cobrado o equivalente a{" "}
            <Em>50% do valor de uma nova diária</Em>.
          </>
        ),
      },
      {
        label: "Antes da meia-noite do dia anterior",
        body: (
          <>
            Se a entrada ocorrer antes da meia-noite do dia anterior ao início
            da reserva, será cobrado o valor equivalente a{" "}
            <Em>uma diária completa</Em>.
          </>
        ),
      },
    ],
    note: "O early check-in depende da disponibilidade da acomodação.",
  },
  {
    title: "Check-out",
    facts: [
      {
        label: "Horário padrão",
        body: (
          <>
            Até as <Em>10h00</Em>.
          </>
        ),
      },
      {
        label: "Late check-out",
        body: (
          <>
            Até as <Em>17h00</Em>, mediante disponibilidade e desde que não
            haja check-in na acomodação no mesmo dia.
          </>
        ),
      },
      {
        label: "Após as 17h00 até meia-noite",
        body: (
          <>
            Será cobrado o equivalente a{" "}
            <Em>50% do valor de uma nova diária</Em>.
          </>
        ),
      },
      {
        label: "Depois das 18h00",
        body: (
          <>
            Caso o hóspede queira garantir o check-out depois das{" "}
            <Em>18h00</Em>, será cobrado o equivalente a{" "}
            <Em>50% do valor de uma nova diária</Em>.
          </>
        ),
      },
      {
        label: "Após meia-noite",
        body: (
          <>
            Será cobrado o equivalente a <Em>uma diária completa</Em>.
          </>
        ),
      },
    ],
    note: "O late check-out depende da disponibilidade da acomodação.",
  },
  {
    title: "Caução",
    facts: [
      {
        label: "Valor",
        body: "O valor da caução varia de acordo com a acomodação reservada.",
      },
      {
        label: "Reservas via Airbnb",
        body: "Não é exigida caução integral. É retido apenas o valor correspondente à taxa de limpeza, devolvido integralmente após a vistoria, desde que a acomodação seja entregue em boas condições, sem danos e sem necessidade de limpeza extraordinária.",
      },
      {
        label: "Site ou outras plataformas",
        body: "A caução correspondente à acomodação é cobrada e restituída em até 48 horas após o check-out, mediante vistoria e desde que não sejam identificadas avarias ou situações que justifiquem retenção.",
      },
      {
        label: "Entrega da acomodação",
        body: "Ao deixar a acomodação, o hóspede deverá registrar um vídeo completo mostrando como o imóvel foi entregue.",
      },
      {
        label: "Limpeza extraordinária",
        body: "Caso a acomodação seja deixada excessivamente bagunçada, será cobrado o valor correspondente a uma nova limpeza.",
      },
    ],
  },
  {
    title: "Visitantes",
    facts: [
      {
        label: "Autorização",
        body: "Visitantes podem ser permitidos, mas a autorização e as regras aplicáveis dependem da acomodação e/ou do condomínio.",
      },
    ],
    note: "Existem orientações gerais da MHV, porém determinadas acomodações e condomínios possuem regras específicas. Consulte a MHV antes de receber visitantes.",
  },
  {
    title: "Pets",
    facts: [
      {
        label: "Hospedagem",
        body: "Pets são permitidos nas acomodações.",
      },
    ],
    note: "Caso existam regras particulares da acomodação ou do condomínio, elas deverão ser observadas.",
  },
  {
    title: "Fumo",
    facts: [
      {
        label: "Áreas abertas",
        body: "É permitido fumar somente em áreas abertas.",
      },
      {
        label: "Ambientes internos",
        body: "Não é permitido fumar em ambientes internos ou fechados, incluindo quartos, salas, banheiros e demais ambientes internos da acomodação.",
      },
    ],
  },
  {
    title: "Estacionamento",
    facts: [
      {
        label: "Vagas",
        body: "Todas as acomodações possuem pelo menos 1 vaga de garagem.",
      },
    ],
    note: "A quantidade exata e demais regras podem variar conforme a acomodação.",
  },
  {
    title: "Chaves",
    facts: [
      {
        label: "Reposição",
        body: "Em caso de perda de chave, poderá haver cobrança para reposição.",
      },
      {
        label: "Valor",
        body: "O custo pode variar entre R$ 15 e R$ 200, conforme o tipo de chave, controle ou sistema utilizado na acomodação.",
      },
    ],
  },
  {
    title: "Regras da casa",
    facts: [
      {
        label: "Silêncio",
        body: "Horário de silêncio: das 20h00 às 08h00. Evite sons altos, festas ou eventos sem autorização. Se o condomínio ou a acomodação possuir regra mais restritiva, prevalecem as orientações específicas da propriedade.",
      },
      {
        label: "Festas e eventos",
        body: "Não realize festas ou eventos sem informar e obter autorização prévia da administração / MHV.",
      },
      {
        label: "Lixo e áreas comuns",
        body: "As orientações para descarte de lixo e uso das áreas comuns variam de acordo com a acomodação e/ou condomínio. Observe as instruções específicas recebidas para a propriedade reservada.",
      },
      {
        label: "Enxoval",
        body: "Cada casa é recebida com enxoval impecável e utensílios essenciais, para que você se sinta em casa desde o primeiro momento.",
      },
      {
        label: "Toalhas",
        body: "Ao remover maquiagem ou utilizar protetor solar, tenha cuidado com as toalhas de banho — uma orientação simples para conservar a acomodação.",
      },
      {
        label: "Energia",
        body: "Ao sair da acomodação, desligue a iluminação e o ar-condicionado.",
      },
    ],
    note: "Algumas regras podem variar conforme a acomodação ou condomínio reservado. As orientações específicas da propriedade prevalecem sobre as regras gerais apresentadas neste guia.",
  },
  {
    title: "Suporte",
    facts: [
      {
        label: "Concierge",
        body: "Durante toda a estadia, nossa equipe de concierge permanece disponível para auxiliar sempre que necessário. Se surgir qualquer necessidade na casa, basta avisar — organizamos o atendimento com agilidade e discrição.",
      },
      {
        label: "WhatsApp MHV",
        body: (
          <>
            <p>
              Para dúvidas sobre a estadia, solicitação de serviços, passeios,
              aluguel de itens ou suporte, fale diretamente com o Concierge MHV.
            </p>
            <a
              href={SUPPORT_WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar com o concierge MHV pelo WhatsApp"
              className="editorial-link !mt-2"
            >
              Falar com o concierge
              <span aria-hidden> →</span>
            </a>
          </>
        ),
      },
    ],
  },
];

function factGridClass(count: number): string {
  if (count <= 1) return "grid grid-cols-1";
  if (count === 2) return "grid grid-cols-1 md:grid-cols-2";
  if (count === 3) return "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3";
  return "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4";
}

function factCellClass(index: number, count: number): string {
  const base = [
    "min-w-0",
    index > 0
      ? "mt-3.5 border-t border-wine/[0.08] pt-3.5 md:mt-0 md:border-t-0 md:pt-0"
      : "",
    "md:px-5",
    index > 0 ? "md:border-l md:border-wine/[0.10]" : "md:pl-0",
  ];

  if (count >= 2 && index % 2 === 0) {
    base.push("md:border-l-0 md:pl-0");
  }

  if (count === 3) {
    if (index > 0) base.push("xl:border-l xl:pl-5");
    if (index === 0) base.push("xl:border-l-0 xl:pl-0");
  }

  if (count >= 4) {
    if (index % 4 === 0) {
      base.push("xl:border-l-0 xl:pl-0");
    } else {
      base.push("xl:border-l xl:pl-5");
    }
    if (index >= 4) {
      base.push(
        "xl:mt-5 xl:border-t xl:border-wine/[0.08] xl:pt-5",
      );
    }
  }

  return base.filter(Boolean).join(" ");
}

function FactBand({ facts, note }: { facts: Fact[]; note?: ReactNode }) {
  return (
    <div>
      <div className={factGridClass(facts.length)}>
        {facts.map((fact, index) => (
          <div key={fact.label} className={factCellClass(index, facts.length)}>
            <p className={labelClass}>{fact.label}</p>
            <div className={bodyClass}>{fact.body}</div>
          </div>
        ))}
      </div>
      {note ? (
        <p className={`${noteClass} mt-4 border-t border-wine/[0.08] pt-3`}>
          {note}
        </p>
      ) : null}
    </div>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden
      className={`h-3 w-3 text-wine/40 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M5 7.5 10 12.5 15 7.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type DirectoryBandProps = {
  indexLabel: string;
  title: string;
  facts: Fact[];
  note?: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  triggerId: string;
  panelId: string;
};

function DirectoryBand({
  indexLabel,
  title,
  facts,
  note,
  isOpen,
  onToggle,
  triggerId,
  panelId,
}: DirectoryBandProps) {
  return (
    <div className="relative border-b border-wine/[0.10] last:border-b-0">
      <div
        className={
          isOpen
            ? "flex flex-col lg:flex-row lg:items-start"
            : "flex items-center"
        }
      >
        <h3 className={isOpen ? "lg:w-[22%] lg:shrink-0 lg:pr-8" : "min-w-0 flex-1"}>
          <button
            type="button"
            id={triggerId}
            aria-expanded={isOpen}
            aria-controls={panelId}
            onClick={onToggle}
            className={`flex w-full text-left transition-colors duration-300 hover:text-wine focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine/35 ${
              isOpen
                ? "items-center justify-between py-4 lg:flex-col lg:items-start lg:gap-1.5 lg:py-5"
                : "items-center gap-5 py-4 sm:gap-7"
            }`}
          >
            <span
              className={
                isOpen
                  ? "flex flex-col gap-1.5"
                  : "flex min-w-0 items-baseline gap-5 sm:gap-7"
              }
            >
              <span className={numberClass}>{indexLabel}</span>
              <span className={topicClass}>{title}</span>
            </span>
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center ${isOpen ? "lg:hidden" : "ml-auto"}`}
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
          className={
            isOpen
              ? "min-w-0 flex-1 pb-5 lg:py-5 lg:pr-12"
              : "hidden"
          }
        >
          {isOpen ? <FactBand facts={facts} note={note} /> : null}
        </div>

        {isOpen ? (
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-controls={panelId}
            className="absolute right-0 top-2 hidden h-11 w-11 items-center justify-center lg:flex"
            aria-label={`Fechar ${title}`}
          >
            <ChevronIcon open />
          </button>
        ) : null}
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
      className={`section-band scroll-mt-[4.5rem] py-[clamp(3.25rem,7vh,5.5rem)] ${visible ? "section-visible" : ""}`}
    >
      <div className="section-shell">
        <div className={`reveal-item ${revealDelay(1)}`}>
          <header className="mb-10 sm:mb-12">
            <p className="editorial-label">Informações da hospedagem</p>
            <span
              className="mt-3 block h-px w-8"
              style={{ backgroundColor: CHAMPAGNE }}
              aria-hidden
            />
          </header>

          <div className="border-t border-wine/[0.12]">
            {hospitalityItems.map((item, index) => (
              <DirectoryBand
                key={item.title}
                indexLabel={String(index + 1).padStart(2, "0")}
                title={item.title}
                facts={item.facts}
                note={item.note}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
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
