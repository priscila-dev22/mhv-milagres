import { useEffect, useMemo, useState, type KeyboardEvent } from "react";
import {
  getEssentialMapsUrl,
  getEssentialPhoneHref,
  getEssentialPhoneList,
  getEssentialsByCategory,
  HEALTH_NOTICE,
  visibleEssentialCategories,
  type EssentialCategoryId,
  type EssentialPlace,
} from "../data/essentials";
import { useReveal } from "../hooks/useReveal";
import { useHorizontalStepCarousel } from "../hooks/useHorizontalScrollCarousel";
import { revealDelay } from "../utils/revealDelay";

const cardLinkClass =
  "editorial-link mt-0 inline-flex min-h-11 items-center !text-[0.6875rem] !tracking-[0.12em]";

const arrowButtonClass =
  "flex h-11 w-11 shrink-0 items-center justify-center text-petroleum/55 transition-colors duration-300 hover:text-sepia focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum/45 disabled:pointer-events-none disabled:opacity-30 sm:h-10 sm:w-10";

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

function CatalogNav({
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
  if (total <= 1) return null;

  const currentLabel = String(current).padStart(2, "0");
  const maxLabel = String(total).padStart(2, "0");
  const progress = current / total;

  return (
    <div className="mx-auto w-full max-w-[16rem]">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onPrev}
          disabled={!canPrev}
          className={arrowButtonClass}
          aria-label="Anterior"
        >
          <ChevronIcon direction="left" />
        </button>
        <p
          className="min-w-[5.5rem] text-center font-sans text-[0.75rem] font-medium tabular-nums tracking-[0.14em] text-petroleum/80"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="text-petroleum">{currentLabel}</span>
          <span className="mx-1.5 text-stone-400/90">/</span>
          <span className="text-stone-500">{maxLabel}</span>
        </p>
        <button
          type="button"
          onClick={onNext}
          disabled={!canNext}
          className={arrowButtonClass}
          aria-label="Próximo"
        >
          <ChevronIcon direction="right" />
        </button>
      </div>
      <div
        className="relative mx-auto mt-3 h-px w-full max-w-[10rem] overflow-hidden bg-petroleum/10"
        aria-hidden
      >
        <div
          className="absolute inset-y-0 left-0 bg-petroleum/35 transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}

function EssentialCard({
  place,
  index,
  setSlideRef,
}: {
  place: EssentialPlace;
  index: number;
  setSlideRef: (index: number, node: HTMLElement | null) => void;
}) {
  const mapsHref = getEssentialMapsUrl(place);
  const phones = getEssentialPhoneList(place);

  return (
    <article
      ref={(node) => setSlideRef(index, node)}
      className="flex w-[min(78vw,16.5rem)] shrink-0 snap-start flex-col border-t border-stone-200/40 bg-sand pt-5 sm:w-[18rem]"
    >
      {place.region ? (
        <p className="editorial-caption">{place.region}</p>
      ) : null}
      <h3 className="editorial-title-card mt-2">{place.name}</h3>
      {place.address ? (
        <p className="mt-3 font-sans text-[0.8125rem] font-normal leading-[1.6] tracking-[0.01em] text-stone-600">
          {place.address}
        </p>
      ) : null}
      {place.notes ? (
        <p className="mt-2 font-sans text-[0.8125rem] font-normal leading-[1.6] tracking-[0.01em] text-stone-600">
          {place.notes}
        </p>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
        {mapsHref ? (
          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver ${place.name} no mapa`}
            className={cardLinkClass}
          >
            Ver no mapa
          </a>
        ) : null}
        {phones.map((phone) => (
          <a
            key={phone}
            href={getEssentialPhoneHref(phone)}
            aria-label={`Ligar para ${place.name}: ${phone}`}
            className={cardLinkClass}
          >
            Contato
          </a>
        ))}
      </div>
    </article>
  );
}

function EssentialsCarousel({
  category,
  places,
}: {
  category: EssentialCategoryId;
  places: EssentialPlace[];
}) {
  const {
    trackRef,
    trackProps,
    scrollBar,
    setSlideRef,
    goPrev,
    goNext,
    canGoPrev,
    canGoNext,
    activeIndex,
    scrollToIndex,
  } = useHorizontalStepCarousel(places.length, {
    draggingClass: "gastro-carousel--dragging",
  });

  useEffect(() => {
    scrollToIndex(0, "auto");
  }, [category, scrollToIndex]);

  const total = places.length;
  const mapped = scrollBar.metrics.visible
    ? Math.min(
        total,
        Math.max(1, 1 + Math.round((scrollBar.scrollPercent / 100) * (total - 1))),
      )
    : activeIndex + 1;
  const atEnd = scrollBar.metrics.visible ? scrollBar.scrollPercent >= 98 : false;
  const atStart = !scrollBar.metrics.visible || scrollBar.scrollPercent <= 2;

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  };

  return (
    <div>
      <div
        ref={trackRef}
        {...trackProps}
        onKeyDown={onKeyDown}
        tabIndex={0}
        className="gastro-carousel flex cursor-grab touch-pan-x snap-x snap-mandatory items-start gap-5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing sm:gap-6 [&::-webkit-scrollbar]:hidden"
        aria-label="Pontos de apoio da região"
      >
        {places.map((place, index) => (
          <EssentialCard
            key={place.id}
            place={place}
            index={index}
            setSlideRef={setSlideRef}
          />
        ))}
      </div>
      <div className="mt-6">
        <CatalogNav
          current={atEnd ? total : mapped}
          total={total}
          onPrev={goPrev}
          onNext={goNext}
          canPrev={!atStart && canGoPrev}
          canNext={!atEnd && canGoNext}
        />
      </div>
    </div>
  );
}

export function RegionEssentials() {
  const { ref, visible } = useReveal<HTMLElement>();
  const [category, setCategory] = useState<EssentialCategoryId>(
    visibleEssentialCategories[0]?.id ?? "mercados",
  );

  const places = useMemo(() => getEssentialsByCategory(category), [category]);

  return (
    <section
      ref={ref}
      id="essenciais"
      className={`section-band section-pad-tight scroll-mt-[4.5rem] overflow-x-hidden ${visible ? "section-visible" : ""}`}
    >
      <div className="section-shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12 xl:gap-16">
          <header className={`reveal-item shrink-0 lg:sticky lg:top-[5.5rem] lg:w-[min(100%,20rem)] ${revealDelay(1)}`}>
            <p className="editorial-label">Essenciais da região</p>
            <h2 className="section-title mt-5">Por perto</h2>
            <p className="section-lead measure-tight">
              Informações úteis para aproveitar a estadia com mais tranquilidade.
            </p>

            <nav
              className="mt-8 flex flex-wrap gap-x-4 gap-y-2 border-t border-stone-200/40 pt-6"
              aria-label="Categorias de apoio"
            >
              {visibleEssentialCategories.map((item) => {
                const isActive = category === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCategory(item.id)}
                    className={`min-h-11 border-b pb-0.5 font-sans text-[0.625rem] font-medium uppercase tracking-[0.12em] transition-[color,border-color] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum/40 sm:text-[0.6875rem] ${
                      isActive
                        ? "border-petroleum/50 text-petroleum"
                        : "border-transparent text-stone-500 hover:text-petroleum"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </header>

          <div className={`min-w-0 flex-1 lg:-mr-[max(1rem,calc((100vw-min(100vw,1180px))/2+1rem))] ${revealDelay(2)} reveal-item`}>
            <EssentialsCarousel key={category} category={category} places={places} />
            {category === "saude" ? (
              <p className="mt-8 max-w-[46ch] font-sans text-[0.75rem] font-normal leading-[1.65] tracking-[0.01em] text-stone-500">
                {HEALTH_NOTICE}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
