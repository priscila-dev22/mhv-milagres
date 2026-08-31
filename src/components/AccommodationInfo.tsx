import { useId, useState, type ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";
import { revealDelay } from "../utils/revealDelay";

const CHAMPAGNE = "#E8D9B5";

const SUPPORT_WHATSAPP_NUMBER = "5582988701957";
const SUPPORT_WHATSAPP_MESSAGE =
  "Olá! Estou hospedado pela MHV Milagres e preciso de ajuda.";
const SUPPORT_WHATSAPP_HREF = `https://wa.me/${SUPPORT_WHATSAPP_NUMBER}?text=${encodeURIComponent(SUPPORT_WHATSAPP_MESSAGE)}`;

const ROW_GRID =
  "grid grid-cols-[2rem_minmax(0,1fr)_2.75rem] gap-x-3 sm:grid-cols-[2.25rem_minmax(0,1fr)_2.75rem] sm:gap-x-4";

const numberClass =
  "font-sans text-[0.625rem] font-medium tabular-nums tracking-[0.16em] text-wine sm:text-[0.6875rem]";

const titleClass =
  "min-w-0 font-serif text-[1.0625rem] font-normal leading-[1.25] tracking-[-0.015em] text-petroleum sm:text-[1.125rem]";

const subtitleClass =
  "font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-wine/80 sm:text-[0.75rem] sm:tracking-[0.16em]";

const bodyClass =
  "font-sans text-[0.9375rem] font-normal leading-[1.75] tracking-[0.006em] text-stone-600";

function Em({ children }: { children: ReactNode }) {
  return <strong className="font-medium text-petroleum">{children}</strong>;
}

function RuleFact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <p className={subtitleClass}>{label}</p>
      <div className={`${bodyClass} mt-1.5`}>{children}</div>
    </div>
  );
}

function RuleNote({ children }: { children: ReactNode }) {
  return <p className={`${bodyClass} sm:col-span-2`}>{children}</p>;
}

function RuleStack({
  air = "default",
  children,
}: {
  air?: "default" | "roomy";
  children: ReactNode;
}) {
  return (
    <div
      className={
        air === "roomy"
          ? "grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-x-14 sm:gap-y-8"
          : "grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-14 sm:gap-y-7"
      }
    >
      {children}
    </div>
  );
}

const hospitalityItems: { title: string; content: ReactNode }[] = [
  {
    title: "Check-in",
    content: (
      <RuleStack>
        <RuleFact label="Horário padrão">
          A partir das <Em>14h00</Em>.
        </RuleFact>
        <RuleFact label="Early check-in">
          A partir das <Em>10h00</Em>, mediante disponibilidade e desde que não
          haja check-out da acomodação no mesmo dia.
        </RuleFact>
        <RuleFact label="Entrada antes das 10h00">
          Será cobrado o equivalente a{" "}
          <Em>50% do valor de uma nova diária</Em>.
        </RuleFact>
        <RuleFact label="Antes da meia-noite do dia anterior">
          Se a entrada ocorrer antes da meia-noite do dia anterior ao início da
          reserva, será cobrado o valor equivalente a{" "}
          <Em>uma diária completa</Em>.
        </RuleFact>
        <RuleNote>
          O early check-in depende da disponibilidade da acomodação.
        </RuleNote>
      </RuleStack>
    ),
  },
  {
    title: "Check-out",
    content: (
      <RuleStack>
        <RuleFact label="Horário padrão">
          Até as <Em>10h00</Em>.
        </RuleFact>
        <RuleFact label="Late check-out">
          Até as <Em>17h00</Em>, mediante disponibilidade e desde que não haja
          check-in na acomodação no mesmo dia.
        </RuleFact>
        <RuleFact label="Após as 17h00 até meia-noite">
          Será cobrado o equivalente a{" "}
          <Em>50% do valor de uma nova diária</Em>.
        </RuleFact>
        <RuleFact label="Após meia-noite">
          Será cobrado o equivalente a <Em>uma diária completa</Em>.
        </RuleFact>
        <RuleNote>
          O late check-out depende da disponibilidade da acomodação.
        </RuleNote>
      </RuleStack>
    ),
  },
  {
    title: "Caução",
    content: (
      <RuleStack>
        <RuleFact label="Valor">
          O valor da caução varia de acordo com a acomodação reservada.
        </RuleFact>
        <RuleFact label="Reservas via Airbnb">
          Não é exigida caução integral. É retido apenas o valor correspondente
          à taxa de limpeza, devolvido integralmente após a vistoria, desde que
          a acomodação seja entregue em boas condições, sem danos e sem
          necessidade de limpeza extraordinária.
        </RuleFact>
        <RuleFact label="Site ou outras plataformas">
          A caução correspondente à acomodação é cobrada e restituída em até 48
          horas após o check-out, mediante vistoria e desde que não sejam
          identificadas avarias ou situações que justifiquem retenção.
        </RuleFact>
      </RuleStack>
    ),
  },
  {
    title: "Visitantes",
    content: (
      <RuleStack>
        <RuleFact label="Autorização">
          Visitantes podem ser permitidos, mas a autorização e as regras
          aplicáveis dependem da acomodação e/ou do condomínio.
        </RuleFact>
        <RuleNote>
          Existem orientações gerais da MHV, porém determinadas acomodações e
          condomínios possuem regras específicas. Consulte a MHV antes de
          receber visitantes.
        </RuleNote>
      </RuleStack>
    ),
  },
  {
    title: "Pets",
    content: (
      <RuleStack>
        <RuleFact label="Hospedagem">
          Pets são permitidos nas acomodações.
        </RuleFact>
        <RuleNote>
          Caso existam regras particulares da acomodação ou do condomínio, elas
          deverão ser observadas.
        </RuleNote>
      </RuleStack>
    ),
  },
  {
    title: "Fumo",
    content: (
      <RuleStack>
        <RuleFact label="Áreas abertas">
          É permitido fumar somente em áreas abertas.
        </RuleFact>
        <RuleFact label="Ambientes internos">
          Não é permitido fumar em ambientes internos ou fechados, incluindo
          quartos, salas, banheiros e demais ambientes internos da acomodação.
        </RuleFact>
      </RuleStack>
    ),
  },
  {
    title: "Estacionamento",
    content: (
      <RuleStack>
        <RuleFact label="Vagas">
          Todas as acomodações possuem pelo menos 1 vaga de garagem.
        </RuleFact>
        <RuleNote>
          A quantidade exata e demais regras podem variar conforme a
          acomodação.
        </RuleNote>
      </RuleStack>
    ),
  },
  {
    title: "Chaves",
    content: (
      <RuleStack>
        <RuleFact label="Reposição">
          Em caso de perda de chave, poderá haver cobrança para reposição.
        </RuleFact>
        <RuleFact label="Valor">
          O custo pode variar entre R$ 15 e R$ 200, conforme o tipo de chave,
          controle ou sistema utilizado na acomodação.
        </RuleFact>
      </RuleStack>
    ),
  },
  {
    title: "Regras da casa",
    content: (
      <RuleStack air="roomy">
        <RuleFact label="Silêncio">
          Horário de silêncio: das 20h00 às 08h00. Evite sons altos, festas ou
          eventos sem autorização. Se o condomínio ou a acomodação possuir regra
          mais restritiva, prevalecem as orientações específicas da propriedade.
        </RuleFact>
        <RuleFact label="Festas e eventos">
          Não realize festas ou eventos sem informar e obter autorização prévia
          da administração / MHV.
        </RuleFact>
        <RuleFact label="Lixo e áreas comuns">
          As orientações para descarte de lixo e uso das áreas comuns variam de
          acordo com a acomodação e/ou condomínio. Observe as instruções
          específicas recebidas para a propriedade reservada.
        </RuleFact>
        <RuleFact label="Enxoval">
          Cada casa é recebida com enxoval impecável e utensílios essenciais,
          para que você se sinta em casa desde o primeiro momento.
        </RuleFact>
        <RuleFact label="Toalhas">
          Ao remover maquiagem ou utilizar protetor solar, tenha cuidado com as
          toalhas de banho — uma orientação simples para conservar a acomodação.
        </RuleFact>
        <RuleFact label="Energia">
          Ao sair da acomodação, desligue a iluminação e o ar-condicionado.
        </RuleFact>
        <RuleNote>
          Algumas regras podem variar conforme a acomodação ou condomínio
          reservado. As orientações específicas da propriedade prevalecem sobre
          as regras gerais apresentadas neste guia.
        </RuleNote>
      </RuleStack>
    ),
  },
  {
    title: "Suporte",
    content: (
      <RuleStack>
        <RuleFact label="Concierge">
          Durante toda a estadia, nossa equipe de concierge permanece disponível
          para auxiliar sempre que necessário. Se surgir qualquer necessidade na
          casa, basta avisar — organizamos o atendimento com agilidade e
          discrição.
        </RuleFact>
        <RuleFact label="WhatsApp MHV">
          <p>
            Para dúvidas sobre a estadia, solicitação de serviços, passeios,
            aluguel de itens ou suporte, fale diretamente com o Concierge MHV.
          </p>
          <a
            href={SUPPORT_WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar com o concierge MHV pelo WhatsApp"
            className="editorial-link mt-3"
          >
            Falar com o concierge
            <span aria-hidden> →</span>
          </a>
        </RuleFact>
      </RuleStack>
    ),
  },
];

type AccordionItemProps = {
  indexLabel: string;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  triggerId: string;
  panelId: string;
  children: ReactNode;
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
      className={`h-3 w-3 text-wine/50 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
    >
      <path d="M5 7.5 10 12.5 15 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AccordionItem({
  indexLabel,
  title,
  isOpen,
  onToggle,
  triggerId,
  panelId,
  children,
}: AccordionItemProps) {
  return (
    <div className="border-b border-wine/12 last:border-b-0">
      <h3>
        <button
          type="button"
          id={triggerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className={`${ROW_GRID} w-full min-h-11 items-center py-5 text-left transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-wine/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-wine/35 sm:py-6`}
        >
          <span className={numberClass}>{indexLabel}</span>
          <span className={titleClass}>{title}</span>
          <span className="flex h-11 w-11 items-center justify-center justify-self-end">
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
          <div className={`${ROW_GRID} pb-8 sm:pb-10`}>
            <div className="col-start-2 col-span-2 min-w-0">{children}</div>
          </div>
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
      className={`section-band scroll-mt-[4.5rem] py-[clamp(4.5rem,10vh,7.5rem)] ${visible ? "section-visible" : ""}`}
    >
      <div className="section-shell">
        <div className={`reveal-item mx-auto max-w-5xl ${revealDelay(1)}`}>
          <header className="mb-10 sm:mb-12">
            <p className="editorial-label">Informações da hospedagem</p>
            <span
              className="mt-4 block h-px w-9"
              style={{ backgroundColor: CHAMPAGNE }}
              aria-hidden
            />
          </header>

          <div className="border-t border-wine/15">
            {hospitalityItems.map((item, index) => (
              <AccordionItem
                key={item.title}
                indexLabel={String(index + 1).padStart(2, "0")}
                title={item.title}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                triggerId={`${baseId}-trigger-${index}`}
                panelId={`${baseId}-panel-${index}`}
              >
                {item.content}
              </AccordionItem>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
