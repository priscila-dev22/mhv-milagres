import { useEffect, useId, useMemo, useState } from "react";
import {
  ROUTE_MAP_FULL_URL,
  mapLocationHasMarker,
  mapLocations,
  mapLocationsWithMarkers,
  routeMapCategories,
  routeMapPlaces,
  routeMapSequence,
  routeMapZones,
  type MapLocation,
  type RouteMapCategoryId,
} from "../data/routeMapPlaces";
import { useReveal } from "../hooks/useReveal";
import { WHATSAPP_NUMBER } from "./WhatsAppConcierge";
import { RouteMapLeaflet, RouteMapMapShell } from "./RouteMapLeaflet";

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

export function RouteMap() {
  const searchId = useId();
  const { ref, visible } = useReveal<HTMLElement>(0.06);

  const [activeCategory, setActiveCategory] = useState<RouteMapCategoryId>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  const filteredPlaces = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return mapLocations.filter((place) => {
      const categoryMatch =
        activeCategory === "all" || place.category === activeCategory;
      if (!categoryMatch) return false;
      if (!q) return true;
      return (
        place.name.toLowerCase().includes(q) ||
        place.region.toLowerCase().includes(q) ||
        place.address.toLowerCase().includes(q)
      );
    });
  }, [activeCategory, searchQuery]);

  const markerPlaces = useMemo(
    () => mapLocationsWithMarkers(filteredPlaces),
    [filteredPlaces],
  );

  useEffect(() => {
    if (!selectedPlaceId) return;
    const stillVisible = filteredPlaces.some((p) => p.id === selectedPlaceId);
    if (!stillVisible) setSelectedPlaceId(null);
  }, [filteredPlaces, selectedPlaceId]);

  const selectedPlace = useMemo(
    () =>
      selectedPlaceId
        ? mapLocations.find((p) => p.id === selectedPlaceId) ?? null
        : null,
    [selectedPlaceId],
  );

  const mapFocusPlace =
    selectedPlace && mapLocationHasMarker(selectedPlace) ? selectedPlace : null;

  const fitKey = useMemo(
    () =>
      `${activeCategory}|${searchQuery.trim()}|${markerPlaces.map((p) => p.id).join(",")}`,
    [activeCategory, markerPlaces, searchQuery],
  );

  const focusPlace = (place: MapLocation) => {
    setSelectedPlaceId(place.id);
  };

  const handleCategoryChange = (categoryId: RouteMapCategoryId) => {
    setActiveCategory(categoryId);
    setSelectedPlaceId(null);
  };

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
              className="route-map-filters -mx-1 flex snap-x snap-mandatory flex-wrap gap-x-1 gap-y-1 overflow-x-auto pb-1 pt-6 lg:flex-nowrap lg:pt-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="reveal-item reveal-item-delay-2 lg:col-start-2 lg:row-start-1 lg:row-span-4 lg:min-h-[620px] lg:self-stretch">
            <RouteMapMapShell>
              <RouteMapLeaflet
                markerPlaces={markerPlaces}
                selectedPlace={mapFocusPlace}
                fitKey={fitKey}
                onSelectPlace={setSelectedPlaceId}
                onClearSelection={() => setSelectedPlaceId(null)}
              />
            </RouteMapMapShell>
          </div>

          <nav
            className="reveal-item reveal-item-delay-3 border-t border-stone-200/45 pt-8 lg:col-start-1 lg:row-start-3"
            aria-label="Sequência geográfica da Rota Ecológica"
          >
            <p className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-sepia/90">
              Leitura geográfica
            </p>
            <div className="route-map-sequence mt-4 flex snap-x snap-mandatory items-center gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {routeMapSequence.map((stop, index) => (
                <span
                  key={stop.id}
                  className="flex shrink-0 snap-start items-center gap-2"
                >
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

          <div className="reveal-item reveal-item-delay-3 border-t border-stone-200/45 pt-6 lg:col-start-1 lg:row-start-4">
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
            className={`${textLinkClass} reveal-item reveal-item-delay-4 inline-flex lg:col-start-1 lg:row-start-5`}
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
