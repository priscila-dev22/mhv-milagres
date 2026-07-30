import { useReveal } from "../hooks/useReveal";

const JETSKI_WHATSAPP_NUMBER: string = "5582993623883";

const JETSKI_INSTAGRAM_URL: string = "https://www.instagram.com/pri.ribe/";

const JETSKI_WHATSAPP_MESSAGE =
  "Olá! Vi o passeio de Jet Ski no guia da MHV Milagres e gostaria de consultar horários e disponibilidade.";

const isJetskiWhatsAppConfigured = JETSKI_WHATSAPP_NUMBER !== "INSERIR_NUMERO_AQUI";
const isJetskiInstagramConfigured =
  JETSKI_INSTAGRAM_URL !== "INSERIR_URL_DIRETA_AQUI" && JETSKI_INSTAGRAM_URL.startsWith("http");

const jetskiWhatsAppHref = isJetskiWhatsAppConfigured
  ? `https://wa.me/${JETSKI_WHATSAPP_NUMBER}?text=${encodeURIComponent(JETSKI_WHATSAPP_MESSAGE)}`
  : undefined;

const prices = [
  { duration: "20 min", value: "R$ 200" },
  { duration: "30 min", value: "R$ 300" },
  { duration: "1 h", value: "R$ 500" },
];

const actionButtonClass =
  "btn-pill-light inline-flex min-h-[44px] w-full items-center justify-center gap-2 sm:w-auto";

export function JetSki() {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="jetski"
      className={`section-pad scroll-mt-[4.5rem] ${visible ? "section-visible" : ""}`}
    >
      <div className="section-shell">
        <div className="relative isolate overflow-hidden rounded-2xl border border-stone-200/55 shadow-[0_2px_14px_rgba(23,52,58,0.04)]">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url(/media/jetski-bg.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-br from-petroleum/88 via-petroleum/72 to-[#0f2428]/92"
            aria-hidden
          />

          <div className="relative z-10 max-w-2xl p-6 text-sand sm:p-8 lg:p-9">
            <p className="reveal-item font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-sand/70">
              Adrenalina
            </p>
            <h2 className="reveal-item reveal-item-delay-1 mt-2 font-serif text-[clamp(1.625rem,2.8vw,2rem)] font-semibold leading-[1.12]">
              Japaratinga Jet Ski
            </h2>
            <p className="reveal-item reveal-item-delay-2 mt-4 font-sans text-[0.9375rem] font-normal leading-[1.65] tracking-[0.01em] text-white/90">
              Saídas na orla de Japaratinga — combine com o concierge MHV para horário, briefing e condições do mar.
            </p>

            <div className="reveal-item reveal-item-delay-3 mt-6 overflow-hidden rounded-xl border border-white/15 bg-petroleum/55">
              <table className="w-full border-collapse text-left font-sans text-[0.9375rem] tracking-[0.01em]">
                <caption className="sr-only">Tabela de preços do passeio de Jet Ski</caption>
                <thead>
                  <tr className="border-b border-white/12 text-[0.6875rem] uppercase tracking-[0.12em] text-sand/65">
                    <th scope="col" className="w-1/2 px-5 py-3 font-semibold sm:px-6">
                      Duração
                    </th>
                    <th scope="col" className="w-1/2 px-5 py-3 font-semibold sm:px-6">
                      Valor
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {prices.map((row) => (
                    <tr
                      key={row.duration}
                      className="border-b border-white/8 transition-colors duration-luxe ease-luxe last:border-0 hover:bg-white/[0.04]"
                    >
                      <td className="px-5 py-3 text-white/92 sm:px-6">{row.duration}</td>
                      <td className="px-5 py-3 font-semibold text-sand sm:px-6">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="reveal-item reveal-item-delay-4 mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              {isJetskiWhatsAppConfigured ? (
                <a
                  href={jetskiWhatsAppHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Agendar passeio de Jet Ski pelo WhatsApp do fornecedor"
                  className={actionButtonClass}
                >
                  Agendar pelo WhatsApp
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  aria-label="Agendar pelo WhatsApp — contato do fornecedor ainda não configurado"
                  className={`${actionButtonClass} cursor-not-allowed opacity-60`}
                  title="TODO: inserir JETSKI_WHATSAPP_NUMBER"
                >
                  Agendar pelo WhatsApp
                </button>
              )}

              {isJetskiInstagramConfigured ? (
                <a
                  href={JETSKI_INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ver perfil oficial do fornecedor de Jet Ski no Instagram"
                  className={`${actionButtonClass} border-white/20 bg-white/10 text-sand hover:border-white/35 hover:bg-white/15`}
                >
                  Ver Instagram
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  aria-label="Ver Instagram — perfil do fornecedor ainda não configurado"
                  className={`${actionButtonClass} cursor-not-allowed border-white/20 bg-white/10 text-sand opacity-60`}
                  title="TODO: inserir JETSKI_INSTAGRAM_URL"
                >
                  Ver Instagram
                </button>
              )}
            </div>

            <p className="reveal-item reveal-item-delay-5 mt-4 font-sans text-xs font-normal leading-[1.6] tracking-[0.01em] text-white/72">
              Valores e disponibilidade sujeitos à temporada. Confirme com o anfitrião / concierge MHV antes do
              check-in.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export { JETSKI_INSTAGRAM_URL, JETSKI_WHATSAPP_NUMBER };
