import type { CSSProperties } from "react";
import type { MilagresTour } from "../data/milagresTours";
import { milagresTours, milagresToursInitialIndex } from "../data/milagresTours";
import {
  getSnapSlideVisualRole,
  useHorizontalSnapCarousel,
} from "../hooks/useHorizontalScrollCarousel";
import { useReveal } from "../hooks/useReveal";
import { EditorialCarouselNav } from "./EditorialCarouselNav";
import { JETSKI_WHATSAPP_NUMBER } from "./JetSki";
import { WHATSAPP_NUMBER } from "./WhatsAppConcierge";

const editorialLinkClass =
  "mt-8 inline-block font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-petroleum/85 underline-offset-[5px] transition-[color,border-color] duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:text-sepia focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-petroleum/40 border-b border-petroleum/22 pb-0.5 hover:border-sepia/45";

const tourLinkClass =
  "font-sans text-[0.625rem] font-medium uppercase tracking-[0.12em] text-petroleum/90 underline-offset-[4px] transition-[color,text-decoration-color] duration-300 hover:text-sepia hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum/45";

const frameSlideClass: Record<MilagresTour["frame"], string> = {
  tall: "tours-slide--tall",
  wide: "tours-slide--wide",
  narrow: "tours-slide--narrow",
  standard: "tours-slide--standard",
};

const trackClassName =
  "gastro-carousel tours-gallery experience-gallery flex w-full max-w-[100vw] cursor-grab touch-pan-x touch-pan-y snap-x snap-mandatory items-end gap-4 overflow-x-auto pb-1 pt-0.5 [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing sm:gap-5 md:gap-6 lg:gap-7 lg:px-[calc((100%-min(56vw,42rem))/2)] [&::-webkit-scrollbar]:hidden max-lg:px-[calc((100%-84vw)/2)] max-[389px]:px-[calc((100%-82vw)/2)]";

function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function reserveUrl(tour: MilagresTour) {
  const message =
    tour.reserveVia === "jetski"
      ? "Olá! Gostaria de agendar um passeio de Jet Ski em Milagres."
      : `Olá! Gostaria de reservar o passeio: ${tour.name}.`;
  const number =
    tour.reserveVia === "jetski" ? JETSKI_WHATSAPP_NUMBER : WHATSAPP_NUMBER;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function ToursMosaic() {
  const { ref, visible } = useReveal<HTMLElement>(0.08);
  const {
    trackRef,
    trackProps,
    scrollBar,
    activeIndex,
    setSlideRef,
    goPrev,
    goNext,
    canGoPrev,
    canGoNext,
  } = useHorizontalSnapCarousel(milagresTours.length, milagresToursInitialIndex, {
    thumbSelector: "[data-carousel-thumb]",
  });

  const active = milagresTours[activeIndex]!;

  return (
    <section
      ref={ref}
      id="passeios"
      aria-labelledby="passeios-titulo"
      className={`tours-section scroll-mt-[4.5rem] overflow-hidden bg-sand pb-[clamp(3.5rem,8vh,5.5rem)] pt-[clamp(3.75rem,9vh,6rem)] ${visible ? "tours-section-visible" : ""}`}
    >
      <div className="section-shell">
        <div className="flex flex-col gap-[clamp(2.5rem,6vh,3.5rem)] lg:flex-row lg:items-start lg:gap-10 xl:gap-14">
          <header className="tours-header shrink-0 lg:sticky lg:top-[5.5rem] lg:w-[min(100%,22rem)] lg:max-w-[24rem] xl:w-[26rem]">
            <p className="tours-header-item font-sans text-[0.625rem] font-semibold uppercase tracking-[0.26em] text-sepia/90 sm:text-[0.6875rem]">
              PASSEIOS
            </p>
            <h2
              id="passeios-titulo"
              className="tours-header-item tours-header-delay-1 mt-5 font-serif text-[clamp(1.875rem,3.4vw,3rem)] font-medium leading-[1.08] tracking-[-0.02em] text-petroleum"
            >
              Milagres muda conforme você decide explorá-la.
            </h2>
            <p className="tours-header-item tours-header-delay-2 mt-5 max-w-[32ch] font-sans text-[clamp(0.9375rem,1.35vw,1.0625rem)] font-normal leading-[1.75] tracking-[0.012em] text-stone-600">
              A melhor parte não é escolher um passeio. É descobrir que cada
              caminho revela um Milagres diferente.
            </p>
            <a
              href="#passeios-galeria"
              className={`tours-header-item tours-header-delay-3 ${editorialLinkClass}`}
            >
              Explorar experiências
            </a>
          </header>

          <div className="min-w-0 flex-1 lg:-mr-[max(1rem,calc((100vw-min(100vw,1180px))/2+1rem))]">
            <div className="tours-gallery-reveal w-full max-w-[100vw] overflow-hidden">
              <div className="tours-gallery-stage">
                <div
                  id="passeios-galeria"
                  ref={trackRef}
                  {...trackProps}
                  tabIndex={0}
                  role="region"
                  aria-roledescription="carrossel"
                  aria-label="Galeria de passeios em Milagres"
                  className={trackClassName}
                >
                  {milagresTours.map((tour, index) => {
                    const visualRole = getSnapSlideVisualRole(index, activeIndex);
                    const objectStyle = {
                      "--tour-pos": tour.objectPosition,
                      "--tour-pos-md":
                        tour.objectPositionMd ?? tour.objectPosition,
                    } as CSSProperties;

                    return (
                      <figure
                        key={tour.id}
                        ref={(node) => setSlideRef(index, node)}
                        data-role={visualRole}
                        data-frame={tour.frame}
                        className={`tours-slide shrink-0 snap-center ${frameSlideClass[tour.frame]}`}
                      >
                        <div className="tours-slide-media overflow-hidden rounded-sm bg-stone-200/30">
                          <img
                            src={tour.image}
                            alt={tour.alt}
                            width={tour.width}
                            height={tour.height}
                            loading={index <= 1 ? "eager" : "lazy"}
                            decoding="async"
                            draggable={false}
                            onDragStart={(event) => event.preventDefault()}
                            onError={(event) => {
                              event.currentTarget.style.visibility = "hidden";
                            }}
                            className="tours-slide-img pointer-events-none h-full w-full select-none object-cover"
                            style={objectStyle}
                          />
                        </div>
                      </figure>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 sm:mt-7">
                <EditorialCarouselNav
                  scrollBar={scrollBar}
                  controlsId="passeios-galeria"
                  ariaLabel="Posição da galeria de passeios"
                  onPrev={goPrev}
                  onNext={goNext}
                  canPrev={canGoPrev}
                  canNext={canGoNext}
                />
              </div>

              <div
                className="mt-[clamp(1.25rem,3vh,2rem)]"
                aria-live="polite"
                aria-atomic="true"
              >
                <h3 className="font-serif text-[clamp(1.25rem,2.2vw,1.625rem)] font-medium tracking-[0.06em] text-petroleum">
                  {active.name}
                </h3>
                <p className="mt-3 max-w-[36ch] font-sans text-[clamp(0.875rem,1.2vw,0.9875rem)] font-normal leading-[1.7] tracking-[0.01em] text-stone-600">
                  {active.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                  <a
                    href={mapsUrl(active.mapsQuery)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={tourLinkClass}
                    aria-label={`Ver roteiro de ${active.name} no Google Maps`}
                  >
                    Ver roteiro
                  </a>
                  <a
                    href={reserveUrl(active)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={tourLinkClass}
                    aria-label={`Reservar ${active.name} pelo WhatsApp`}
                  >
                    Reservar
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
