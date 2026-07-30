import { useState } from "react";
import {
  getTourDisplayRank,
  milagresTours,
} from "../data/milagresTours";
import { useReveal } from "../hooks/useReveal";

const exploreLinkClass =
  "mt-8 inline-block font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-petroleum/85 underline-offset-[5px] transition-[color,border-color] duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:text-sepia focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-petroleum/40 border-b border-petroleum/22 pb-0.5 hover:border-sepia/45";

export function ToursMosaic() {
  const { ref, visible } = useReveal<HTMLElement>(0.08);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = milagresTours.length;

  return (
    <section
      ref={ref}
      id="passeios"
      aria-labelledby="passeios-titulo"
      className={`tours-section scroll-mt-[4.5rem] overflow-hidden bg-sand pb-[clamp(3.5rem,8vh,5.5rem)] pt-[clamp(3.75rem,9vh,6rem)] ${visible ? "tours-section-visible" : ""}`}
    >
      <div className="section-shell">
        <div className="flex flex-col gap-[clamp(2.75rem,6vh,3.5rem)] lg:flex-row lg:items-start lg:gap-12 xl:gap-16">
          <header className="tours-header shrink-0 lg:sticky lg:top-[5.5rem] lg:w-[min(100%,20rem)] lg:max-w-[22rem] xl:w-[24rem]">
            <p className="tours-header-item font-sans text-[0.625rem] font-semibold uppercase tracking-[0.26em] text-sepia/90 sm:text-[0.6875rem]">
              PASSEIOS
            </p>
            <h2
              id="passeios-titulo"
              className="tours-header-item tours-header-delay-1 mt-5 font-serif text-[clamp(1.875rem,3.5vw,3.125rem)] font-medium leading-[1.08] tracking-[-0.02em] text-petroleum"
            >
              Explore um outro lado de Milagres.
            </h2>
            <p className="tours-header-item tours-header-delay-2 mt-5 max-w-[32ch] font-sans text-[clamp(0.9375rem,1.35vw,1.0625rem)] font-normal leading-[1.75] tracking-[0.012em] text-stone-600">
              Descubra experiências que revelam paisagens, ritmos e momentos
              completamente diferentes entre si.
            </p>
            <a
              href="#passeios-composicao"
              className={`tours-header-item tours-header-delay-3 ${exploreLinkClass}`}
            >
              Explorar roteiros
            </a>
          </header>

          <div
            id="passeios-composicao"
            className="tours-editorial-reveal min-w-0 flex-1"
            aria-label="Composição editorial de passeios"
          >
            <div
              className="tours-editorial-stage relative mx-auto w-full max-w-[42rem] lg:max-w-none"
              data-active-count={total}
            >
              {milagresTours.map((tour, index) => {
                const rank = getTourDisplayRank(index, activeIndex, total);
                const isFeatured = index === activeIndex;

                return (
                  <button
                    key={tour.id}
                    type="button"
                    data-rank={rank}
                    aria-pressed={isFeatured}
                    aria-label={`${tour.name}. ${tour.description}${isFeatured ? " — em destaque" : ""}`}
                    onClick={() => setActiveIndex(index)}
                    className="tours-editorial-piece group absolute overflow-hidden rounded-sm bg-stone-200/30 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum/45"
                  >
                    <img
                      src={tour.image}
                      alt={tour.alt}
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                      draggable={false}
                      className="tours-editorial-img h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] motion-reduce:transition-none motion-reduce:group-hover:scale-100 group-hover:scale-[1.02]"
                      style={
                        tour.objectPosition
                          ? { objectPosition: tour.objectPosition }
                          : undefined
                      }
                    />
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-petroleum/55 via-petroleum/20 to-transparent px-3 pb-3 pt-10 sm:px-4 sm:pb-4 sm:pt-12"
                      aria-hidden
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 px-3 pb-3 sm:px-4 sm:pb-4">
                      <p className="font-sans text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-[rgba(248,244,237,0.92)] sm:text-[0.6875rem]">
                        {tour.name}
                      </p>
                      <p className="mt-1 font-sans text-[0.75rem] font-normal leading-snug tracking-[0.01em] text-[rgba(248,244,237,0.88)] sm:text-[0.8125rem] sm:leading-relaxed">
                        {tour.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
