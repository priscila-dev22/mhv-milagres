import { useEffect, useMemo, useState, type KeyboardEvent } from "react";
import {
  filterRestaurantsByRegion,
  getRestaurantMapsUrl,
  getRestaurantPhoneHref,
  restaurantRegions,
  type Restaurant,
  type RestaurantRegion,
} from "../data/restaurants";
import { useReveal } from "../hooks/useReveal";
import { useHorizontalStepCarousel } from "../hooks/useHorizontalScrollCarousel";
import { revealDelay } from "../utils/revealDelay";

const actionLinkClass =
  "editorial-link !mt-0 inline-flex min-h-11 items-center !text-[0.6875rem] !tracking-[0.12em]";

const actionIdleClass =
  "inline-flex min-h-11 cursor-default items-center font-sans text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-stone-400/70";

const actionDotClass =
  "select-none px-2.5 font-sans text-[0.6875rem] font-medium text-stone-300";

function RestaurantAction({
  href,
  label,
  ariaLabel,
  external,
}: {
  href?: string;
  label: string;
  ariaLabel: string;
  external?: boolean;
}) {
  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        aria-label={ariaLabel}
        className={actionLinkClass}
      >
        {label}
      </a>
    );
  }

  return (
    <span className={actionIdleClass} aria-disabled="true">
      {label}
    </span>
  );
}

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

function GastroCatalogNav({
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
  if (total === 0) return null;

  const currentLabel = String(current).padStart(2, "0");
  const maxLabel = String(total).padStart(2, "0");
  const progress = total > 1 ? current / total : 1;

  return (
    <div className="mx-auto w-full max-w-[16rem] sm:max-w-[18rem]">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onPrev}
          disabled={!canPrev}
          className={arrowButtonClass}
          aria-label="Restaurante anterior"
        >
          <ChevronIcon direction="left" />
        </button>
        <p
          className="min-w-[5.5rem] text-center font-sans text-[0.75rem] font-medium tabular-nums tracking-[0.14em] text-petroleum/80 sm:text-[0.8125rem]"
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
          aria-label="Próximo restaurante"
        >
          <ChevronIcon direction="right" />
        </button>
      </div>
      <div
        className="relative mx-auto mt-4 h-px w-full max-w-[10rem] overflow-hidden bg-petroleum/10"
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

function RestaurantImage({
  restaurant,
  eager,
}: {
  restaurant: Restaurant;
  eager?: boolean;
}) {
  if (restaurant.image) {
    return (
      <img
        src={restaurant.image}
        alt=""
        width={900}
        height={1125}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
        className="h-full w-full object-cover"
        style={
          restaurant.objectPosition
            ? { objectPosition: restaurant.objectPosition }
            : undefined
        }
      />
    );
  }

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center bg-stone-200/30 px-4 text-center"
      aria-hidden
    >
      <span className="font-sans text-[0.625rem] font-medium uppercase tracking-[0.16em] text-sepia/80">
        {restaurant.regionLabel}
      </span>
      <span className="mt-2 font-serif text-[0.875rem] font-medium text-petroleum/65">
        Imagem em breve
      </span>
    </div>
  );
}

function RestaurantCard({
  restaurant,
  index,
  setSlideRef,
  eagerImage,
}: {
  restaurant: Restaurant;
  index: number;
  setSlideRef: (index: number, node: HTMLElement | null) => void;
  eagerImage?: boolean;
}) {
  const mapsHref = getRestaurantMapsUrl(restaurant);
  const phoneHref = restaurant.phone
    ? getRestaurantPhoneHref(restaurant.phone)
    : undefined;
  const showContact =
    restaurant.id !== "vilinha-marceneiro" &&
    restaurant.id !== "tahafa-milagres" &&
    restaurant.id !== "frutos-de-goias";
  const showInstagram = restaurant.id !== "vila-da-mata-bistro";

  return (
    <article
      ref={(node) => setSlideRef(index, node)}
      className="flex w-[min(76vw,17.25rem)] shrink-0 snap-start flex-col sm:w-[18.5rem] md:w-[20rem] lg:w-[21.5rem] xl:w-[22.5rem]"
    >
      <div className="aspect-[4/5] overflow-hidden bg-stone-200/40">
        <RestaurantImage restaurant={restaurant} eager={eagerImage} />
      </div>

      <p className="editorial-caption mt-5">{restaurant.regionLabel}</p>
      <h3 className="editorial-title-card mt-2">{restaurant.name}</h3>

      {restaurant.description ? (
        <p className="mt-3 font-sans text-[0.875rem] font-normal leading-[1.65] tracking-[0.01em] text-stone-600 sm:text-[0.9375rem] sm:leading-[1.72]">
          {restaurant.description}
        </p>
      ) : null}

      {restaurant.address ? (
        <p className="editorial-caption mt-3">{restaurant.address}</p>
      ) : null}

      <nav
        className="mt-4 flex flex-wrap items-center"
        aria-label={`Contatos de ${restaurant.name}`}
      >
        <RestaurantAction
          href={mapsHref}
          label="Ver no mapa"
          ariaLabel={`Ver ${restaurant.name} no mapa`}
          external
        />
        {showContact ? (
          <>
            <span className={actionDotClass} aria-hidden>
              ·
            </span>
            <RestaurantAction
              href={phoneHref}
              label="Contato"
              ariaLabel={`Contato de ${restaurant.name}`}
            />
          </>
        ) : null}
        {showInstagram ? (
          <>
            <span className={actionDotClass} aria-hidden>
              ·
            </span>
            <RestaurantAction
              href={restaurant.instagram}
              label="Instagram"
              ariaLabel={`Ver perfil de ${restaurant.name} no Instagram`}
              external
            />
          </>
        ) : null}
      </nav>
    </article>
  );
}

export function Gastronomy() {
  const { ref, visible } = useReveal<HTMLElement>();
  const [regionFilter, setRegionFilter] = useState<RestaurantRegion | "all">("all");

  const filteredRestaurants = useMemo(
    () => filterRestaurantsByRegion(regionFilter),
    [regionFilter],
  );

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
  } = useHorizontalStepCarousel(filteredRestaurants.length, {
    draggingClass: "gastro-carousel--dragging",
  });

  useEffect(() => {
    scrollToIndex(0, "auto");
  }, [regionFilter, scrollToIndex]);

  const total = filteredRestaurants.length;
  const mapped = scrollBar.metrics.visible
    ? Math.min(
        total,
        Math.max(1, 1 + Math.round((scrollBar.scrollPercent / 100) * (total - 1))),
      )
    : activeIndex + 1;
  const atEnd = scrollBar.metrics.visible ? scrollBar.scrollPercent >= 98 : false;
  const atStart = !scrollBar.metrics.visible || scrollBar.scrollPercent <= 2;
  const current = atEnd ? total : mapped;

  const onTrackKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  };

  return (
    <section
      ref={ref}
      id="gastronomia"
      className={`section-pad scroll-mt-[4.5rem] overflow-hidden bg-sand ${visible ? "section-visible" : ""}`}
    >
      <div className="section-shell">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12 xl:gap-16">
          <header className="reveal-item shrink-0 lg:sticky lg:top-[5.5rem] lg:w-[min(100%,22rem)] lg:max-w-[24rem] xl:w-[26rem]">
            <p className="editorial-label">GASTRONOMIA</p>
            <h2 className="section-title mt-5">Sabores de Milagres</h2>
            <p className="section-lead measure-tight">
              Uma seleção de restaurantes, beach clubs e experiências gastronômicas
              para descobrir durante sua estadia.
            </p>

            <nav
              className="mt-8 flex flex-wrap gap-x-3 gap-y-2 border-t border-stone-200/40 pt-6"
              aria-label="Filtrar por região"
            >
              {restaurantRegions.map((region) => {
                const isActive = regionFilter === region.id;
                return (
                  <button
                    key={region.id}
                    type="button"
                    onClick={() => setRegionFilter(region.id)}
                    className={`min-h-11 border-b pb-0.5 font-sans text-[0.625rem] font-medium uppercase tracking-[0.12em] transition-[color,border-color] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum/40 sm:text-[0.6875rem] ${
                      isActive
                        ? "border-petroleum/50 text-petroleum"
                        : "border-transparent text-stone-500 hover:text-petroleum"
                    }`}
                  >
                    {region.label}
                  </button>
                );
              })}
            </nav>
          </header>

          <div className="min-w-0 flex-1 lg:-mr-[max(1rem,calc((100vw-min(100vw,1180px))/2+1rem))]">
            <div
              ref={trackRef}
              {...trackProps}
              onKeyDown={onTrackKeyDown}
              tabIndex={0}
              className={`gastro-carousel flex cursor-grab touch-pan-x touch-pan-y snap-x snap-mandatory items-start gap-5 overflow-x-auto pb-1 pt-0.5 [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing sm:gap-6 md:gap-7 [&::-webkit-scrollbar]:hidden ${revealDelay(2)} reveal-item`}
              id="gastronomia-carrossel"
              aria-label="Carrossel de restaurantes"
            >
              {filteredRestaurants.map((restaurant, index) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  index={index}
                  setSlideRef={setSlideRef}
                  eagerImage={index < 2}
                />
              ))}
            </div>

            <div className="mt-8">
              <GastroCatalogNav
                current={current}
                total={total}
                onPrev={goPrev}
                onNext={goNext}
                canPrev={!atStart && canGoPrev}
                canNext={!atEnd && canGoNext}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
