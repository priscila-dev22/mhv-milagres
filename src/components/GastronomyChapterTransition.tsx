import { useMemo, useState, type CSSProperties } from "react";
import {
  destinationFilters,
  filterDestinationsByCategory,
  getDestinationMapsUrl,
  type Destination,
  type DestinationCategory,
} from "../data/destinations";
import {
  getSnapSlideVisualRole,
  useHorizontalSnapCarousel,
} from "../hooks/useHorizontalScrollCarousel";
import { useReveal } from "../hooks/useReveal";

const trackClassName =
  "gastro-carousel experience-gallery flex w-full max-w-[100vw] cursor-grab touch-pan-x touch-pan-y snap-x snap-mandatory gap-3 overflow-x-auto pb-1 pt-0.5 [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing sm:gap-5 md:gap-6 lg:gap-6 lg:px-[calc((100%-min(58vw,56rem))/2)] [&::-webkit-scrollbar]:hidden max-lg:px-[calc((100%-84vw)/2)] max-[389px]:px-[calc((100%-82vw)/2)]";

const arrowButtonClass =
  "flex h-11 w-11 shrink-0 items-center justify-center text-wine/55 transition-colors duration-300 hover:text-wine focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine/45 disabled:pointer-events-none disabled:opacity-30 sm:h-10 sm:w-10";

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden
    >
      {direction === "left" ? (
        <path d="M14 6l-6 6 6 6" />
      ) : (
        <path d="M10 6l6 6-6 6" />
      )}
    </svg>
  );
}

function DestinationsNav({
  current,
  total,
  onPrev,
  onNext,
  canPrev,
  canNext,
}: {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
}) {
  const currentLabel = String(current).padStart(2, "0");
  const maxLabel = String(total).padStart(2, "0");

  return (
    <div className="mx-auto w-full max-w-[16rem] sm:max-w-[18rem]">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onPrev}
          disabled={!canPrev}
          className={arrowButtonClass}
          aria-label="Local anterior"
        >
          <ChevronIcon direction="left" />
        </button>
        <p
          className="min-w-[5.5rem] text-center font-sans text-[0.75rem] font-medium tabular-nums tracking-[0.14em] text-wine/80 sm:text-[0.8125rem]"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="text-wine">{currentLabel}</span>
          <span className="mx-1.5 text-stone-400/90">/</span>
          <span className="text-stone-500">{maxLabel}</span>
        </p>
        <button
          type="button"
          onClick={onNext}
          disabled={!canNext}
          className={arrowButtonClass}
          aria-label="Próximo local"
        >
          <ChevronIcon direction="right" />
        </button>
      </div>
    </div>
  );
}

function DestinationMedia({
  destination,
  eager,
}: {
  destination: Destination;
  eager?: boolean;
}) {
  if (!destination.image) {
    return (
      <div
        className="flex h-full w-full flex-col items-center justify-center bg-toast px-6 text-center"
        aria-hidden
      >
        <span className="font-sans text-[0.625rem] font-medium uppercase tracking-[0.16em] text-wine/55">
          {destination.location}
        </span>
        <span className="mt-2 font-serif text-[0.9375rem] font-medium text-wine/70">
          Imagem em breve
        </span>
      </div>
    );
  }

  const objectStyle = {
    "--exp-pos": destination.objectPosition ?? "50% 50%",
    "--exp-pos-md":
      destination.objectPositionMd ?? destination.objectPosition ?? "50% 50%",
    "--exp-pos-lg":
      destination.objectPositionLg ??
      destination.objectPositionMd ??
      destination.objectPosition ??
      "50% 50%",
  } as CSSProperties;

  const fitClass =
    destination.imageFit === "contain" ? "object-contain" : "object-cover";

  return (
    <img
      src={destination.image}
      alt={destination.imageAlt ?? destination.name}
      width={1600}
      height={1067}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      onDragStart={(event) => event.preventDefault()}
      onError={(event) => {
        event.currentTarget.style.visibility = "hidden";
      }}
      className={`experience-slide-img pointer-events-none h-full w-full select-none ${fitClass}`}
      style={objectStyle}
    />
  );
}

function DestinationsGallery({ items }: { items: Destination[] }) {
  const {
    trackRef,
    trackProps,
    activeIndex,
    setSlideRef,
    goPrev,
    goNext,
    canGoPrev,
    canGoNext,
  } = useHorizontalSnapCarousel(items.length, 0, {
    thumbSelector: "[data-destination-thumb]",
  });

  const active = items[activeIndex] ?? items[0];
  const mapsHref = active ? getDestinationMapsUrl(active) : undefined;

  if (!active) return null;

  return (
    <>
      <div className="chapter-pause-item chapter-pause-delay-1 mt-[clamp(1.75rem,5vh,2.75rem)] w-full max-w-[100vw]">
        <div className="destination-gallery-stage">
          <div
            id="descubra-milagres-galeria"
            ref={trackRef}
            {...trackProps}
            tabIndex={0}
            role="region"
            aria-roledescription="carrossel"
            aria-label="Locais da Rota dos Milagres"
            className={trackClassName}
          >
            {items.map((destination, index) => {
              const visualRole = getSnapSlideVisualRole(index, activeIndex);

              return (
                <figure
                  key={destination.id}
                  ref={(node) => setSlideRef(index, node)}
                  data-role={visualRole}
                  className="destination-slide shrink-0 snap-center w-[82vw] min-[390px]:w-[84vw] md:w-[58vw] lg:w-[58vw] lg:max-w-[56rem] xl:w-[56vw] xl:max-w-[52rem]"
                >
                  <div className="overflow-hidden rounded-sm bg-toast aspect-[4/5] max-h-[min(58vh,22.5rem)] sm:aspect-[5/4] sm:max-h-[min(52vh,24rem)] md:aspect-[3/2] md:max-h-[min(46vh,28rem)] lg:h-[clamp(18rem,42vh,30rem)] lg:max-h-[30rem] lg:aspect-auto">
                    <DestinationMedia
                      destination={destination}
                      eager={index <= 1}
                    />
                  </div>
                </figure>
              );
            })}
          </div>
        </div>

        <div className="section-shell mt-6 px-4 sm:mt-7 sm:px-5 md:px-6">
          <DestinationsNav
            current={activeIndex + 1}
            total={items.length}
            onPrev={goPrev}
            onNext={goNext}
            canPrev={canGoPrev}
            canNext={canGoNext}
          />
        </div>
      </div>

      <div
        className="chapter-pause-item chapter-pause-delay-2 section-shell mt-[clamp(1.25rem,3vh,2rem)] px-4 text-center sm:px-5 md:px-6 lg:text-left"
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="font-sans text-[0.625rem] font-medium uppercase tracking-[0.16em] text-wine/65 sm:text-[0.6875rem]">
          {active.location}
        </p>
        <h3 className="mt-2 font-serif text-[clamp(1.375rem,2.8vw,1.875rem)] font-medium leading-snug tracking-[-0.015em] text-wine">
          {active.name}
        </h3>
        <p className="mx-auto mt-3 max-w-[38ch] font-sans text-[clamp(0.875rem,1.25vw,0.9875rem)] font-normal leading-[1.7] tracking-[0.01em] text-stone-600 lg:mx-0">
          {active.description}
        </p>
        {mapsHref ? (
          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-link mt-5"
          >
            Ver no mapa
            <span aria-hidden> →</span>
          </a>
        ) : null}
      </div>
    </>
  );
}

export function GastronomyChapterTransition() {
  const { ref, visible } = useReveal<HTMLElement>(0.08);
  const [categoryFilter, setCategoryFilter] = useState<
    DestinationCategory | "all"
  >("all");

  const filteredDestinations = useMemo(
    () => filterDestinationsByCategory(categoryFilter),
    [categoryFilter],
  );

  return (
    <section
      ref={ref}
      id="rota-ecologica-pausa"
      aria-labelledby="descubra-milagres-titulo"
      className={`relative w-full overflow-hidden bg-toast pb-[clamp(2.75rem,6vh,4.5rem)] pt-[clamp(3.25rem,8vh,5.5rem)] ${visible ? "chapter-pause-visible" : ""}`}
    >
      <header className="section-shell mx-auto max-w-[40rem]">
        <h2
          id="descubra-milagres-titulo"
          className="chapter-pause-item text-center font-serif text-[clamp(2.125rem,5.2vw,3.625rem)] font-medium leading-[1.1] tracking-[-0.02em] text-wine lg:text-left"
        >
          Descubra Milagres
        </h2>
      </header>

      <nav
        className="chapter-pause-item section-shell mt-8 flex gap-x-4 overflow-x-auto pb-1 pt-0.5 [-ms-overflow-style:none] [scrollbar-width:none] lg:mt-10 lg:flex-wrap lg:gap-x-5 lg:overflow-visible [&::-webkit-scrollbar]:hidden"
        aria-label="Filtrar locais da Rota dos Milagres"
      >
        {destinationFilters.map((filter) => {
          const isActive = categoryFilter === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => setCategoryFilter(filter.id)}
              className={`min-h-11 shrink-0 border-b pb-0.5 font-sans text-[0.625rem] font-medium uppercase tracking-[0.14em] transition-[color,border-color] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine/40 sm:text-[0.6875rem] ${
                isActive
                  ? "border-wine/50 text-wine"
                  : "border-transparent text-stone-500 hover:text-wine"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </nav>

      <DestinationsGallery
        key={categoryFilter}
        items={filteredDestinations}
      />
    </section>
  );
}
