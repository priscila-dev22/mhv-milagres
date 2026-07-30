import { useEffect, useId, useMemo, useState } from "react";
import {
  ROUTE_MAP_FULL_URL,
  routeMapCategories,
  routeMapDirectionsUrl,
  routeMapEmbedForCategory,
  routeMapPlaceLocationHref,
  routeMapPlaces,
  routeMapSequence,
  routeMapZones,
  type RouteMapCategoryId,
  type RouteMapPlace,
} from "../data/routeMapPlaces";
import { useReveal } from "../hooks/useReveal";
import { WHATSAPP_NUMBER } from "./WhatsAppConcierge";

const CONCIERGE_WHATSAPP_MESSAGE =
  "Olá! Estou hospedado pela MHV Milagres e gostaria de ajuda para montar minha rota pela região.";

const conciergeWhatsAppHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(CONCIERGE_WHATSAPP_MESSAGE)}`;

const textLinkClass =
  "route-map-text-link group inline-flex min-h-11 items-center gap-1.5 border-b border-petroleum/20 pb-0.5 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-petroleum transition-[color,border-color] duration-300 hover:border-petroleum/45 hover:text-sepia focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum/40";

const filterBtnClass = (active: boolean) =>
  `route-map-filter shrink-0 snap-start rounded-none border-0 border-b-2 bg-transparent px-2.5 py-2 font-sans text-[0.75rem] font-medium tracking-[0.02em] transition-[border-color,color,background-color] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum/40 sm:px-3 sm:text-[0.8125rem] ${
    active
      ? "border-petroleum font-semibold text-petroleum"
      : "border-transparent text-petroleum/70 hover:border-petroleum/25 hover:text-petroleum"
  }`;

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

type PlaceDetailPanelProps = {
  place: RouteMapPlace;
  categoryLabel: string;
  onClose: () => void;
};

function PlaceDetailPanel({
  place,
  categoryLabel,
  onClose,
}: PlaceDetailPanelProps) {
  const whatsappHref = place.whatsapp
    ? place.whatsapp.startsWith("http")
      ? place.whatsapp
      : `https://wa.me/${place.whatsapp.replace(/\D/g, "")}`
    : null;

  return (
    <div
      className="route-map-detail mb-3 rounded-sm border border-stone-200/55 bg-white/95 px-4 py-4 shadow-[0_4px_20px_rgba(23,52,58,0.08)] sm:px-5"
      role="region"
      aria-label={`Detalhes de ${place.name}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-sepia/85">
            {categoryLabel}
          </p>
          <h3 className="mt-1 font-serif text-lg font-medium leading-snug text-petroleum">
            {place.name}
          </h3>
        </div>
        <button
          type="button"
          className="shrink-0 rounded-sm p-2 font-sans text-xs font-medium uppercase tracking-wider text-petroleum/70 transition-colors hover:text-petroleum focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum/40"
          onClick={onClose}
          aria-label="Fechar detalhes do local"
        >
          Fechar
        </button>
      </div>
      {place.description ? (
        <p className="mt-2 font-sans text-[0.8125rem] leading-relaxed text-stone-600">
          {place.description}
        </p>
      ) : null}
      {place.address ? (
        <p className="mt-2 font-sans text-[0.8125rem] leading-relaxed text-stone-600">
          {place.address}
        </p>
      ) : null}
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
        {place.instagram ? (
          <li>
            <a
              href={place.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={textLinkClass}
              aria-label={`Instagram de ${place.name}`}
            >
              Instagram
            </a>
          </li>
        ) : null}
        {whatsappHref ? (
          <li>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={textLinkClass}
              aria-label={`WhatsApp de ${place.name}`}
            >
              WhatsApp
            </a>
          </li>
        ) : null}
        <li>
          <a
            href={routeMapPlaceLocationHref(place)}
            target="_blank"
            rel="noopener noreferrer"
            className={textLinkClass}
            aria-label={`Ver localização de ${place.name}`}
          >
            Localização
          </a>
        </li>
      </ul>
    </div>
  );
}

export function RouteMap() {
  const overlayId = useId();
  const searchId = useId();
  const { ref, visible } = useReveal<HTMLElement>(0.06);

  const [activeCategory, setActiveCategory] = useState<RouteMapCategoryId>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
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

  const filteredPlaces = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return routeMapPlaces.filter((place) => {
      const categoryMatch =
        activeCategory === "all" || place.category === activeCategory;
      if (!categoryMatch) return false;
      if (!q) return true;
      return (
        place.name.toLowerCase().includes(q) ||
        place.region.toLowerCase().includes(q)
      );
    });
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    if (!selectedPlaceId) return;
    const stillVisible = filteredPlaces.some((p) => p.id === selectedPlaceId);
    if (!stillVisible) setSelectedPlaceId(null);
  }, [filteredPlaces, selectedPlaceId]);

  const embedSrc = useMemo(
    () =>
      routeMapEmbedForCategory(
        activeCategory,
        filteredPlaces,
        selectedPlaceId,
      ),
    [activeCategory, filteredPlaces, selectedPlaceId],
  );

  const selectedPlace = useMemo(
    () =>
      selectedPlaceId
        ? routeMapPlaces.find((p) => p.id === selectedPlaceId) ?? null
        : null,
    [selectedPlaceId],
  );

  const showMapOverlay = compactMap && !mapInteractive;

  const focusPlace = (place: RouteMapPlace) => {
    setSelectedPlaceId(place.id);
    if (compactMap) setMapInteractive(true);
  };

  const activateMap = () => setMapInteractive(true);

  const categoryLabel = (categoryId: RouteMapPlace["category"]) =>
    routeMapCategories.find((c) => c.id === categoryId)?.label ?? categoryId;

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
              Descubra praias, restaurantes, passeios e pontos essenciais da
              Rota Ecológica em um mapa pensado para facilitar cada momento da
              sua estadia.
            </p>
            <p className="mt-3 max-w-[36ch] font-sans text-[0.9375rem] font-normal leading-[1.7] tracking-[0.01em] text-stone-500">
              Do Patacho a Japaratinga, encontre os lugares selecionados pela
              curadoria MHV.
            </p>
          </header>

          <div className="reveal-item reveal-item-delay-1 lg:col-start-1 lg:row-start-2 lg:space-y-6">
            <div>
              <label htmlFor={searchId} className="sr-only">
                Buscar no mapa da rota
              </label>
              <input
                id={searchId}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Busque praias, restaurantes ou passeios"
                autoComplete="off"
                className="route-map-search w-full border-0 border-b border-stone-200/55 bg-white/35 px-0 py-3 font-sans text-base font-normal tracking-[0.01em] text-petroleum placeholder:text-stone-400 focus:border-petroleum/35 focus:bg-white/50 focus:outline-none focus:ring-0"
              />
            </div>

            <div
              className="route-map-filters -mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 pt-6 lg:pt-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              role="tablist"
              aria-label="Filtrar pontos do mapa"
            >
              {routeMapCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  className={filterBtnClass(activeCategory === cat.id)}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setSelectedPlaceId(null);
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="reveal-item reveal-item-delay-2 lg:col-start-2 lg:row-start-1 lg:row-span-6 lg:min-h-[620px] lg:self-stretch">
            {selectedPlace ? (
              <PlaceDetailPanel
                place={selectedPlace}
                categoryLabel={categoryLabel(selectedPlace.category)}
                onClose={() => setSelectedPlaceId(null)}
              />
            ) : null}
            <MapFrame
              embedSrc={embedSrc}
              showMapOverlay={showMapOverlay}
              overlayId={overlayId}
              onActivateMap={activateMap}
            />
          </div>

          <div
            className="route-map-list reveal-item reveal-item-delay-2 min-h-0 border-t border-stone-200/45 lg:col-start-1 lg:row-start-3 lg:max-h-[min(420px,50vh)] lg:overflow-y-auto lg:overscroll-contain lg:pr-2"
            role="list"
            aria-label="Locais selecionados"
          >
            {filteredPlaces.length === 0 ? (
              <p className="py-8 font-sans text-[0.9375rem] leading-[1.65] text-stone-600">
                Nenhum ponto curado nesta categoria. Ajuste o filtro, use a
                busca ou abra o mapa completo no Google Maps.
              </p>
            ) : (
              filteredPlaces.map((place) => {
                const isActive = selectedPlaceId === place.id;
                return (
                  <article
                    key={place.id}
                    role="listitem"
                    className={`route-map-place border-b border-stone-200/45 py-5 transition-[background-color,border-color] duration-300 sm:py-6 ${
                      isActive
                        ? "route-map-place-active border-l-2 border-l-petroleum bg-white/45 pl-3 sm:pl-4"
                        : "border-l-2 border-l-transparent pl-3 sm:pl-4"
                    }`}
                  >
                    <button
                      type="button"
                      className="group w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum/40"
                      onClick={() => focusPlace(place)}
                      aria-pressed={isActive}
                    >
                      <p className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-sepia/85">
                        {categoryLabel(place.category)}
                      </p>
                      <h3 className="route-map-place-name mt-2 font-serif text-[clamp(1.0625rem,1.8vw,1.25rem)] font-medium leading-snug tracking-[-0.01em] text-petroleum transition-colors duration-300 group-hover:text-sepia/95">
                        {place.name}
                      </h3>
                      <p className="mt-1.5 font-sans text-[0.8125rem] leading-relaxed text-stone-600">
                        {place.region}
                      </p>
                    </button>
                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                      <button
                        type="button"
                        className={textLinkClass}
                        onClick={() => focusPlace(place)}
                      >
                        <span>Ver no mapa</span>
                        <span className="route-map-arrow transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>
                          →
                        </span>
                      </button>
                      <a
                        href={routeMapDirectionsUrl(place.mapsQuery)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={textLinkClass}
                        aria-label={`Traçar rota até ${place.name} no Google Maps`}
                      >
                        <span>Traçar rota</span>
                        <span className="route-map-arrow transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>
                          →
                        </span>
                      </a>
                    </div>
                  </article>
                );
              })
            )}
          </div>

          <nav
            className="reveal-item reveal-item-delay-3 border-t border-stone-200/45 pt-8 lg:col-start-1 lg:row-start-4"
            aria-label="Sequência geográfica da Rota Ecológica"
          >
            <p className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-sepia/90">
              Leitura geográfica
            </p>
            <div className="route-map-sequence mt-4 flex snap-x snap-mandatory items-center gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {routeMapSequence.map((stop, index) => (
                <span key={stop.id} className="flex shrink-0 snap-start items-center gap-2">
                  {index > 0 ? (
                    <span
                      className="h-px w-4 shrink-0 bg-stone-300/80 sm:w-6"
                      aria-hidden
                    />
                  ) : null}
                  <button
                    type="button"
                    className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-petroleum/80 transition-colors duration-300 hover:text-sepia focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum/40 sm:text-[0.75rem]"
                    onClick={() => {
                      const place = routeMapPlaces.find((p) => p.id === stop.id);
                      if (place) focusPlace(place);
                    }}
                  >
                    {stop.short}
                  </button>
                </span>
              ))}
            </div>
            <div className="mt-6 space-y-4 border-t border-stone-200/40 pt-6">
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

          <div className="reveal-item reveal-item-delay-3 border-t border-stone-200/45 pt-6 lg:col-start-1 lg:row-start-5">
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
            className={`${textLinkClass} reveal-item reveal-item-delay-4 inline-flex lg:col-start-1 lg:row-start-6`}
          >
            <span>Abrir mapa completo</span>
            <span className="route-map-arrow transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
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
            <span className="route-map-arrow transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
              →
            </span>
          </a>
        </footer>
      </div>
    </section>
  );
}
