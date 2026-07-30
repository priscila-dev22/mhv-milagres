import type { ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

const JETSKI_WHATSAPP_NUMBER: string = "5582993623883";

const JETSKI_INSTAGRAM_URL: string = "https://www.instagram.com/pri.ribe/";

const JETSKI_WHATSAPP_MESSAGE =
  "Olá! Vi o passeio de Jet Ski no guia da MHV Milagres e gostaria de consultar horários e disponibilidade.";

const isJetskiWhatsAppConfigured = JETSKI_WHATSAPP_NUMBER !== "INSERIR_NUMERO_AQUI";
const isJetskiInstagramConfigured =
  JETSKI_INSTAGRAM_URL !== "INSERIR_URL_DIRETA_AQUI" &&
  JETSKI_INSTAGRAM_URL.startsWith("http");

const jetskiWhatsAppHref = isJetskiWhatsAppConfigured
  ? `https://wa.me/${JETSKI_WHATSAPP_NUMBER}?text=${encodeURIComponent(JETSKI_WHATSAPP_MESSAGE)}`
  : undefined;

const prices = [
  { duration: "20 min", value: "R$ 200" },
  { duration: "30 min", value: "R$ 300" },
  { duration: "1 h", value: "R$ 500" },
] as const;

const inlineLinkClass =
  "font-sans text-[0.8125rem] font-normal text-petroleum underline-offset-[4px] transition-colors duration-300 hover:text-sepia hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum/45";

type FactRowProps = {
  label: string;
  children: ReactNode;
  delayClass?: string;
};

function FactRow({ label, children, delayClass }: FactRowProps) {
  return (
    <div
      className={`jetski-fact-row group jetski-copy-item border-t border-stone-200/45 py-5 transition-[border-color] duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:border-petroleum/25 sm:py-6 ${delayClass ?? ""}`}
    >
      <p className="font-sans text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-sepia/90 transition-colors duration-300 group-hover:text-sepia">
        {label}
      </p>
      <div className="jetski-fact-value mt-2.5 font-sans text-[0.9375rem] font-normal leading-[1.72] tracking-[0.01em] text-stone-700">
        {children}
      </div>
    </div>
  );
}

export function JetSki() {
  const { ref, visible } = useReveal<HTMLElement>(0.1);

  return (
    <section
      ref={ref}
      id="jetski"
      aria-labelledby="jetski-titulo"
      className={`jetski-section scroll-mt-[4.5rem] overflow-hidden bg-sand pb-[clamp(4rem,9vh,6.5rem)] pt-[clamp(4rem,9vh,6.5rem)] ${visible ? "jetski-section-visible" : ""}`}
    >
      <div className="section-shell">
        <div className="grid grid-cols-1 gap-[clamp(2.5rem,6vh,3.5rem)] lg:grid-cols-2 lg:items-start lg:gap-14 xl:gap-20">
          <div className="jetski-sheet min-w-0 lg:max-w-[28rem] xl:max-w-[32rem]">
            <p className="jetski-copy-item font-sans text-[0.625rem] font-semibold uppercase tracking-[0.26em] text-sepia/90 sm:text-[0.6875rem]">
              Experiência
            </p>
            <h2
              id="jetski-titulo"
              className="jetski-copy-item jetski-copy-delay-1 mt-4 font-serif text-[clamp(1.75rem,3.2vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em] text-petroleum sm:mt-5"
            >
              Japaratinga Jet Ski
            </h2>
            <p className="jetski-copy-item jetski-copy-delay-2 mt-5 max-w-[42ch] font-sans text-[clamp(0.9375rem,1.3vw,1.0625rem)] font-normal leading-[1.75] tracking-[0.012em] text-stone-600 sm:mt-6">
              Saídas na orla de Japaratinga — combine com o concierge MHV para
              horário, briefing e condições do mar.
            </p>
          </div>

          <div className="jetski-sheet min-w-0 flex-1 lg:max-w-none">
            <div className="jetski-copy-item jetski-copy-delay-3 border-t border-stone-200/45 lg:mt-0 lg:border-t-0 lg:pt-0">
              <FactRow label="Valor">
                <ul className="space-y-1.5">
                  {prices.map((row) => (
                    <li key={row.duration}>
                      <span className="text-petroleum/90">{row.duration}</span>
                      <span className="text-stone-500"> — </span>
                      <span className="font-medium text-petroleum">{row.value}</span>
                    </li>
                  ))}
                </ul>
              </FactRow>

              <FactRow label="Duração" delayClass="jetski-copy-delay-3">
                Opções de 20 minutos, 30 minutos ou 1 hora, conforme o roteiro
                escolhido na reserva.
              </FactRow>

              <FactRow label="Capacidade" delayClass="jetski-copy-delay-3">
                Saídas individuais ou em dupla, conforme equipamento e
                disponibilidade — confirme ao agendar.
              </FactRow>

              <FactRow label="Horários" delayClass="jetski-copy-delay-4">
                Mediante disponibilidade do mar e do anfitrião. O concierge MHV
                auxilia na combinação de horário e briefing antes da saída.
              </FactRow>

              <FactRow label="Local" delayClass="jetski-copy-delay-4">
                Orla de Japaratinga, litoral norte de Alagoas.
              </FactRow>

              <FactRow label="Reserva" delayClass="jetski-copy-delay-4">
                <p>Concierge MHV</p>
                <div className="mt-3 flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
                  {isJetskiWhatsAppConfigured ? (
                    <a
                      href={jetskiWhatsAppHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={inlineLinkClass}
                      aria-label="Agendar passeio de Jet Ski pelo WhatsApp do fornecedor"
                    >
                      Agendar pelo WhatsApp
                    </a>
                  ) : (
                    <span className="text-stone-500">WhatsApp em configuração</span>
                  )}
                  {isJetskiInstagramConfigured ? (
                    <a
                      href={JETSKI_INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={inlineLinkClass}
                      aria-label="Ver perfil oficial do fornecedor de Jet Ski no Instagram"
                    >
                      Ver Instagram
                    </a>
                  ) : null}
                </div>
              </FactRow>

              <FactRow label="Observações" delayClass="jetski-copy-delay-4">
                Valores e disponibilidade sujeitos à temporada. Confirme com o
                anfitrião ou concierge MHV antes do check-in. Briefing de
                segurança realizado antes de cada saída.
              </FactRow>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { JETSKI_INSTAGRAM_URL, JETSKI_WHATSAPP_NUMBER };
