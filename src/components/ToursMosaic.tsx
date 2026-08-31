import { useEffect, useId, useState, type KeyboardEvent, type ReactNode } from "react";
import {
  getTourCtaHref,
  tours,
  type Tour,
  type TourDetailSection,
  type TourModality,
} from "../data/tours";
import { useReveal } from "../hooks/useReveal";
import { useHorizontalStepCarousel } from "../hooks/useHorizontalScrollCarousel";
import { revealDelay } from "../utils/revealDelay";

const cardLinkClass =
  "editorial-link mt-4 inline-flex min-h-11 items-center !text-[0.6875rem] !tracking-[0.12em]";

const arrowButtonClass =
  "flex h-11 w-11 shrink-0 items-center justify-center text-petroleum/55 transition-colors duration-300 hover:text-sepia focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum/45 disabled:pointer-events-none disabled:opacity-30 sm:h-10 sm:w-10";

const subtitleClass =
  "font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-sepia sm:text-[0.75rem] sm:tracking-[0.16em]";

const bodyClass =
  "font-sans text-[0.875rem] font-normal leading-[1.68] tracking-[0.006em] text-stone-600 sm:text-[0.9375rem] sm:leading-[1.7]";

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

function ToursCatalogNav({
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
          aria-label="Experiência anterior"
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
          aria-label="Próxima experiência"
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

function DetailBody({ body }: { body: string | string[] }) {
  if (Array.isArray(body)) {
    return (
      <ul className={`${bodyClass} mt-1.5 list-none space-y-1 p-0`}>
        {body.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  return <p className={`${bodyClass} mt-1.5`}>{body}</p>;
}

function DetailSection({ section }: { section: TourDetailSection }) {
  return (
    <div className="min-w-0">
      <p className={subtitleClass}>{section.label}</p>
      <DetailBody body={section.body} />
    </div>
  );
}

function ModalityBlock({ modality }: { modality: TourModality }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-serif text-[1.0625rem] font-normal leading-snug tracking-[-0.015em] text-petroleum">
        {modality.name}
      </p>
      {modality.sections.map((section) => (
        <DetailSection key={section.label} section={section} />
      ))}
    </div>
  );
}

function TourImage({ tour, eager }: { tour: Tour; eager?: boolean }) {
  if (tour.image) {
    return (
      <img
        src={tour.image}
        alt={tour.imageAlt || tour.name}
        width={900}
        height={1125}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
        className="h-full w-full object-cover"
        style={tour.objectPosition ? { objectPosition: tour.objectPosition } : undefined}
      />
    );
  }

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center bg-stone-200/30 px-4 text-center"
      aria-hidden
    >
      <span className="font-sans text-[0.625rem] font-medium uppercase tracking-[0.16em] text-sepia/80">
        {tour.category}
      </span>
      <span className="mt-2 font-serif text-[0.875rem] font-medium text-petroleum/65">
        Imagem em breve
      </span>
    </div>
  );
}

function TourCard({
  tour,
  index,
  setSlideRef,
  eagerImage,
}: {
  tour: Tour;
  index: number;
  setSlideRef: (index: number, node: HTMLElement | null) => void;
  eagerImage?: boolean;
}) {
  const baseId = useId();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const panelId = `${baseId}-detalhes`;
  const triggerId = `${baseId}-trigger`;
  const href = getTourCtaHref(tour);
  const isJetSki = tour.id === "jetski";

  const details: ReactNode = (
    <div className="flex flex-col gap-6">
      {tour.modalities?.map((modality) => (
        <ModalityBlock key={modality.name} modality={modality} />
      ))}
      {tour.sections?.map((section) => (
        <DetailSection key={section.label} section={section} />
      ))}
    </div>
  );

  return (
    <article
      ref={(node) => setSlideRef(index, node)}
      id={isJetSki ? "jetski" : `passeio-${tour.id}`}
      className={`flex w-[min(78vw,18rem)] shrink-0 snap-start flex-col sm:w-[19rem] md:w-[21rem] lg:w-[22.5rem] xl:w-[23.5rem] ${isJetSki ? "scroll-mt-[4.5rem]" : ""}`}
    >
      <div className="aspect-[4/5] overflow-hidden bg-stone-200/40">
        <TourImage tour={tour} eager={eagerImage} />
      </div>

      <p className="editorial-caption mt-5">{tour.category}</p>
      <h3 className="editorial-title-card mt-2">{tour.name}</h3>
      <p className="mt-3 font-sans text-[0.875rem] font-normal leading-[1.65] tracking-[0.01em] text-stone-600 sm:text-[0.9375rem] sm:leading-[1.7]">
        {tour.summary}
      </p>

      <p className="mt-4 font-sans text-[0.9375rem] font-medium leading-snug text-petroleum">
        {tour.highlight}
      </p>
      {tour.duration ? (
        <p className="editorial-caption mt-2">{tour.duration}</p>
      ) : null}
      {tour.location ? (
        <p className="editorial-caption mt-1.5">{tour.location}</p>
      ) : null}

      <button
        type="button"
        id={triggerId}
        aria-expanded={detailsOpen}
        aria-controls={panelId}
        onClick={() => setDetailsOpen((open) => !open)}
        className={`${cardLinkClass} !mt-5 bg-transparent p-0`}
      >
        {detailsOpen ? "Fechar detalhes" : "Ver detalhes"}
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!detailsOpen}
        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${detailsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-stone-200/30 pt-5">{details}</div>
        </div>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${tour.ctaLabel}: ${tour.name}`}
        className={cardLinkClass}
      >
        {tour.ctaLabel}
      </a>
    </article>
  );
}

export function ToursMosaic() {
  const { ref, visible } = useReveal<HTMLElement>(0.06);
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
  } = useHorizontalStepCarousel(tours.length, {
    draggingClass: "gastro-carousel--dragging",
  });

  useEffect(() => {
    const alignJetSki = () => {
      if (window.location.hash.replace("#", "") !== "jetski") return;
      const index = tours.findIndex((tour) => tour.id === "jetski");
      if (index < 0) return;
      scrollToIndex(index, "auto");
    };

    alignJetSki();
    const retry = window.setTimeout(alignJetSki, 280);
    window.addEventListener("hashchange", alignJetSki);
    return () => {
      window.clearTimeout(retry);
      window.removeEventListener("hashchange", alignJetSki);
    };
  }, [scrollToIndex]);

  const total = tours.length;
  const current = scrollBar.metrics.visible
    ? Math.min(total, Math.max(1, 1 + Math.round((scrollBar.scrollPercent / 100) * (total - 1))))
    : activeIndex + 1;
  const atEnd = scrollBar.metrics.visible ? scrollBar.scrollPercent >= 98 : false;
  const atStart = !scrollBar.metrics.visible || scrollBar.scrollPercent <= 2;

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
      id="passeios"
      aria-labelledby="passeios-titulo"
      className={`tours-section scroll-mt-[4.5rem] overflow-x-hidden bg-sand pb-[clamp(4rem,10vh,7rem)] pt-[clamp(4.25rem,10vh,7rem)] ${visible ? "tours-section-visible" : ""}`}
    >
      <div className="section-shell">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12 xl:gap-16">
          <header className="max-w-[46rem] shrink-0 lg:sticky lg:top-[5.5rem] lg:w-[min(100%,22rem)] lg:max-w-[24rem] xl:w-[26rem]">
            <p className="tours-header-item editorial-label">Passeios</p>
            <h2
              id="passeios-titulo"
              className="tours-header-item tours-header-delay-1 editorial-title-section mt-5 sm:mt-6"
            >
              Milagres também se revela pelo caminho.
            </h2>
            <p className="tours-header-item tours-header-delay-2 editorial-body measure-relaxed mt-5 sm:mt-6">
              Entre o mar, os coqueirais e as paisagens da Rota Ecológica, cada
              passeio oferece uma forma diferente de conhecer a região.
            </p>
          </header>

          <div className="min-w-0 flex-1 lg:-mr-[max(1rem,calc((100vw-min(100vw,1180px))/2+1rem))]">
            <div
              ref={trackRef}
              {...trackProps}
              onKeyDown={onTrackKeyDown}
              tabIndex={0}
              className={`gastro-carousel flex cursor-grab touch-pan-x touch-pan-y snap-x snap-mandatory items-start gap-5 overflow-x-auto pb-1 pt-0.5 [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing sm:gap-6 md:gap-7 [&::-webkit-scrollbar]:hidden ${revealDelay(2)} tours-header-item tours-header-delay-3`}
              id="passeios-carrossel"
              aria-label="Catálogo de experiências e passeios"
            >
              {tours.map((tour, index) => (
                <TourCard
                  key={tour.id}
                  tour={tour}
                  index={index}
                  setSlideRef={setSlideRef}
                  eagerImage={index < 2}
                />
              ))}
            </div>

            <div className="mt-8">
              <ToursCatalogNav
                current={atEnd ? total : current}
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
