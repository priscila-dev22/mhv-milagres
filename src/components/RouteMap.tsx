import { useEffect, useId, useState } from "react";
import { useReveal } from "../hooks/useReveal";
import { revealDelay } from "../utils/revealDelay";

const MAP_EMBED_URL =
  "https://www.google.com/maps?q=São+Miguel+dos+Milagres,+AL&hl=pt&z=10&output=embed";

const MAP_FULL_URL =
  "https://www.google.com/maps/search/?api=1&query=Rota+Ecológica+dos+Milagres,+São+Miguel+dos+Milagres,+AL&hl=pt";

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
  const overlayId = useId();
  const { ref, visible } = useReveal<HTMLElement>();
  const [mapInteractive, setMapInteractive] = useState(false);
  const [compactMap, setCompactMap] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const update = () => {
      setCompactMap(mediaQuery.matches);
      if (!mediaQuery.matches) setMapInteractive(true);
    };

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const showMapOverlay = compactMap && !mapInteractive;

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

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-7">
          <div className="reveal-item reveal-item-delay-2 lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-stone-200/55 bg-stone-200/30 shadow-[0_2px_14px_rgba(23,52,58,0.04)]">
              <div className="relative h-[320px] w-full md:h-[360px] lg:h-[480px]">
                {showMapOverlay && (
                  <button
                    type="button"
                    id={overlayId}
                    className="absolute inset-0 z-10 flex min-h-[44px] items-center justify-center bg-petroleum/10 px-6 text-center font-sans text-sm font-medium leading-snug text-petroleum backdrop-blur-[1px] transition-colors duration-luxe ease-luxe hover:bg-petroleum/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum/40"
                    onClick={() => setMapInteractive(true)}
                    aria-label="Ativar interação com o mapa da Rota Ecológica dos Milagres"
                  >
                    Toque para interagir com o mapa
                  </button>
                )}
                <iframe
                  title="Mapa — São Miguel dos Milagres e Rota Ecológica"
                  className={`h-full w-full grayscale-[0.1] contrast-[1.03] sepia-[0.06] transition-[filter] duration-luxe ease-luxe hover:grayscale-0 ${showMapOverlay ? "pointer-events-none" : "pointer-events-auto"}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={MAP_EMBED_URL}
                  tabIndex={showMapOverlay ? -1 : 0}
                />
              </div>
            </div>

            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-sans text-xs font-normal leading-[1.6] tracking-[0.01em] text-stone-600">
                Dica: busque “Praia do Patacho”, “Praia do Toque” ou “Japaratinga” para ajustar o zoom.
              </p>
              <a
                href={MAP_FULL_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir mapa completo da Rota Ecológica dos Milagres no Google Maps"
                className="btn-pill-secondary inline-flex min-h-[44px] shrink-0 items-center justify-center self-start sm:self-auto"
              >
                Abrir mapa completo
              </a>
            </div>
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
