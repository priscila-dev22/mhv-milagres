import { useReveal } from "../hooks/useReveal";
import { revealDelay } from "../utils/revealDelay";

const zones = [
  {
    title: "Zona Norte",
    subtitle: "Patacho / Lages",
    text: "Sossego e águas turquesa — extensões de areia e mar calmo para dias longos à sombra dos coqueiros.",
  },
  {
    title: "Zona Central",
    subtitle: "Milagres / Porto da Rua",
    text: "O coração da vila: serviços, gastronomia e a praia principal da hospedagem.",
  },
  {
    title: "Zona Sul",
    subtitle: "Marceneiro / Riacho",
    text: "Calma, igrejinha e charme — ritmo mais lento e contato com a natureza.",
  },
];

export function RouteMap() {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="mapa"
      className={`section-pad scroll-mt-[4.5rem] ${visible ? "section-visible" : ""}`}
    >
      <div className="section-shell">
        <header className="section-header text-center sm:text-left">
          <h2 className="section-title reveal-item">Mapa Interativo da Rota</h2>
          <p className="section-lead reveal-item reveal-item-delay-1">
            Navegue a Rota Ecológica dos Milagres — do Patacho à Japaratinga. Use o mapa para traçar rotas e
            descobrir estabelecimentos com fotos reais no Google.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-7">
          <div className="reveal-item reveal-item-delay-2 lg:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-stone-200/55 bg-stone-200/30 shadow-[0_2px_14px_rgba(23,52,58,0.04)]">
              <div className="h-[min(460px,58vw)] min-h-[430px] w-full sm:h-[480px]">
                <iframe
                  title="Mapa — São Miguel dos Milagres e Rota Ecológica"
                  className="h-full w-full grayscale-[0.1] contrast-[1.03] sepia-[0.06] transition-[filter] duration-luxe ease-luxe hover:grayscale-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=São+Miguel+dos+Milagres,+AL&hl=pt&z=10&output=embed"
                />
              </div>
            </div>
            <p className="mt-3 font-sans text-xs font-normal leading-[1.6] tracking-[0.01em] text-stone-600">
              Dica: busque “Praia do Patacho”, “Praia do Toque” ou “Japaratinga” para ajustar o zoom.
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:col-span-5 lg:gap-3.5">
            <p className="reveal-item reveal-item-delay-2 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-sepia">
              Leitura geográfica
            </p>
            {zones.map((z, index) => (
              <div
                key={z.title}
                className={`luxe-card bg-gradient-to-br from-white/90 to-sand/45 p-4 sm:p-5 reveal-item ${revealDelay(index + 3)}`}
              >
                <h3 className="card-title">{z.title}</h3>
                <p className="mt-1 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-sepia">
                  {z.subtitle}
                </p>
                <p className="mt-2 body-text text-[0.875rem] leading-[1.6]">{z.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
