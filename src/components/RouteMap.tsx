import { useEffect, useId, useMemo, useState } from "react";
import {
  ROUTE_MAP_FULL_URL,
  mapLocations,
  routeMapEmbedForQuery,
  routeMapZones,
} from "../data/routeMapPlaces";
import { useReveal } from "../hooks/useReveal";
import { WHATSAPP_NUMBER } from "./WhatsAppConcierge";

const CONCIERGE_WHATSAPP_MESSAGE =
  "Olá! Estou hospedado pela MHV Milagres e gostaria de ajuda para montar minha rota pela região.";

const conciergeWhatsAppHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(CONCIERGE_WHATSAPP_MESSAGE)}`;

const textLinkClass =
  "route-map-text-link group inline-flex min-h-11 items-center gap-1.5 border-b border-petroleum/20 pb-0.5 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-petroleum transition-[color,border-color] duration-300 hover:border-petroleum/45 hover:text-sepia focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum/40";

type MapFrameProps = {
  embedSrc: string;
  showMapOverlay: boolean;
  overlayId: string;
  onActivateMap: () => void;
};

function MapFrame({
  embedSrc,
  showMapOverlay,
  overlayId,
  onActivateMap,
}: MapFrameProps) {
  return (
    <div className="route-map-frame relative h-[clamp(420px,52vh,520px)] w-full overflow-hidden rounded-sm border border-stone-200/50 bg-stone-200/25 lg:h-full lg:min-h-[620px] lg:max-h-[760px]">
      {showMapOverlay && (
        <button
          type="button"
          id={overlayId}
          className="absolute inset-0 z-10 flex items-center justify-center bg-sand/55 px-6 backdrop-blur-[2px] transition-colors duration-300 hover:bg-sand/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum/40"
          onClick={onActivateMap}
          aria-label="Ativar interação com o mapa da Rota Ecológica dos Milagres"
        >
          <span className="max-w-[16rem] text-center font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-petroleum/90">
            Toque para interagir com o mapa
          </span>
        </button>
      )}
      <iframe
        key={embedSrc}
        title="Mapa — São Miguel dos Milagres e Rota Ecológica"
        className={`h-full w-full grayscale-[0.08] contrast-[1.02] sepia-[0.04] transition-[filter] duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:grayscale-0 ${showMapOverlay ? "pointer-events-none" : "pointer-events-auto"}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={embedSrc}
        tabIndex={showMapOverlay ? -1 : 0}
      />
    </div>
  );
}

function MapSearchIcon() {
  return (
    <svg
      className="h-[1.125rem] w-[1.125rem] shrink-0 text-petroleum/55"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

export function RouteMap() {
  const overlayId = useId();
  const mapSearchId = useId();
  const mapSearchListId = useId();
  const { ref, visible } = useReveal<HTMLElement>(0.06);

  const [mapInteractive, setMapInteractive] = useState(false);
  const [compactMap, setCompactMap] = useState(false);
  const [mapSearch, setMapSearch] = useState("");
  const [appliedMapSearch, setAppliedMapSearch] = useState("");

  const embedSrc = useMemo(
    () => routeMapEmbedForQuery(appliedMapSearch),
    [appliedMapSearch],
  );

  const mapSearchSuggestions = useMemo(
    () => mapLocations.map((loc) => loc.name),
    [],
  );

  const submitMapSearch = () => {
    setAppliedMapSearch(mapSearch.trim());
    if (compactMap) setMapInteractive(true);
  };

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
      aria-labelledby="mapa-titulo"
      className={`route-map-section scroll-mt-[4.5rem] overflow-x-hidden bg-sand pb-[clamp(5.625rem,11vw,10rem)] pt-[clamp(5.625rem,11vw,10rem)] ${visible ? "section-visible" : ""}`}
    >
      <div className="section-shell px-5 lg:px-6">
        <div className="route-map-grid grid grid-cols-1 gap-8 lg:grid-cols-[minmax(17.5rem,34%)_1fr] lg:items-start lg:gap-10 xl:gap-14">
          <header className="reveal-item lg:col-start-1 lg:row-start-1">
            <p className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.26em] text-sepia/90">
              Explore a rota
            </p>
            <h2
              id="mapa-titulo"
              className="mt-4 font-serif text-[clamp(2.875rem,5.5vw,5.125rem)] font-medium leading-[1.04] tracking-[-0.025em] text-petroleum sm:mt-5"
            >
              Milagres, do seu jeito.
            </h2>
            <p className="mt-5 max-w-[38ch] font-sans text-[clamp(0.9375rem,1.35vw,1.0625rem)] font-normal leading-[1.75] tracking-[0.012em] text-stone-600">
              Navegue a Rota Ecológica dos Milagres — do Patacho à Japaratinga.
              Use o mapa para traçar rotas e descobrir estabelecimentos com fotos
              reais no Google.
            </p>
          </header>

          <div className="reveal-item reveal-item-delay-2 lg:col-start-2 lg:row-start-1 lg:row-span-3 lg:min-h-[620px] lg:self-stretch">
            <form
              className="route-map-search-bar mb-3 flex items-center gap-3 border-b border-stone-200/55 bg-white/40 px-1 py-2.5 sm:mb-4"
              role="search"
              aria-label="Buscar local no mapa"
              onSubmit={(e) => {
                e.preventDefault();
                submitMapSearch();
              }}
            >
              <MapSearchIcon />
              <label htmlFor={mapSearchId} className="sr-only">
                Buscar local no mapa
              </label>
              <input
                id={mapSearchId}
                type="search"
                list={mapSearchListId}
                value={mapSearch}
                onChange={(e) => setMapSearch(e.target.value)}
                placeholder="Buscar praias, restaurantes ou passeios"
                autoComplete="off"
                className="min-w-0 flex-1 border-0 bg-transparent font-sans text-[0.9375rem] font-normal tracking-[0.01em] text-petroleum placeholder:text-stone-400 focus:outline-none focus:ring-0"
              />
              <datalist id={mapSearchListId}>
                {mapSearchSuggestions.map((name) => (
                  <option key={name} value={name} />
                ))}
              </datalist>
              <button
                type="submit"
                className="shrink-0 rounded-sm px-2 py-1.5 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-petroleum transition-colors duration-200 hover:text-sepia focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum/40"
              >
                Buscar
              </button>
            </form>
            <MapFrame
              embedSrc={embedSrc}
              showMapOverlay={showMapOverlay}
              overlayId={overlayId}
              onActivateMap={() => setMapInteractive(true)}
            />
          </div>

          <nav
            className="reveal-item reveal-item-delay-3 border-t border-stone-200/45 pt-8 lg:col-start-1 lg:row-start-2"
            aria-label="Leitura geográfica da Rota Ecológica"
          >
            <p className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-sepia/90">
              Leitura geográfica
            </p>
            <div className="mt-6 space-y-4">
              {routeMapZones.map((zone) => (
                <div key={zone.title}>
                  <p className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-petroleum">
                    {zone.title}
                    <span className="font-normal normal-case tracking-normal text-stone-500">
                      {" "}
                      · {zone.subtitle}
                    </span>
                  </p>
                  <p className="mt-1.5 font-sans text-[0.8125rem] leading-[1.65] text-stone-600">
                    {zone.text}
                  </p>
                </div>
              ))}
            </div>
          </nav>

          <div className="reveal-item reveal-item-delay-3 border-t border-stone-200/45 pt-6 lg:col-start-1 lg:row-start-3">
            <p className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-sepia/90">
              Dica de navegação
            </p>
            <p className="mt-2 font-sans text-[0.8125rem] leading-[1.65] text-stone-600">
              Busque por Praia do Patacho, Praia do Toque ou Japaratinga para
              ajustar o zoom e explorar a região.
            </p>
          </div>

          <a
            href={ROUTE_MAP_FULL_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir mapa completo da Rota Ecológica dos Milagres no Google Maps"
            className={`${textLinkClass} reveal-item reveal-item-delay-4 inline-flex lg:col-start-1 lg:row-start-4`}
          >
            <span>Abrir mapa completo</span>
            <span
              className="route-map-arrow transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            >
              →
            </span>
          </a>
        </div>

        <footer className="route-map-concierge reveal-item reveal-item-delay-4 mt-[clamp(4rem,8vh,6rem)] border-t border-stone-200/45 pt-[clamp(2.5rem,5vh,3.5rem)] lg:max-w-[40rem]">
          <p className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-sepia/90">
            Precisa de ajuda?
          </p>
          <h3 className="mt-4 font-serif text-[clamp(1.625rem,3vw,2.625rem)] font-medium leading-[1.12] tracking-[-0.02em] text-petroleum">
            A gente monta a rota por você.
          </h3>
          <p className="mt-4 max-w-[38ch] font-sans text-[clamp(0.9375rem,1.2vw,1.0625rem)] leading-[1.75] text-stone-600">
            Fale com o concierge MHV para receber recomendações de acordo com o
            seu perfil, horário e localização.
          </p>
          <a
            href={conciergeWhatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar com o concierge MHV pelo WhatsApp"
            className={`${textLinkClass} mt-8`}
          >
            <span>Falar com o concierge</span>
            <span
              className="route-map-arrow transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            >
              →
            </span>
          </a>
        </footer>
      </div>
    </section>
  );
}
