import type { CSSProperties } from "react";
import { useReveal } from "../hooks/useReveal";
import { useExperienceCarousel } from "../hooks/useExperienceCarousel";
import { milagresExperiences } from "../data/milagresExperiences";

const editorialLinkClass =
  "mt-8 inline-block font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-petroleum/85 underline-offset-[5px] transition-[color,border-color] duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:text-sepia focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-petroleum/40 border-b border-petroleum/22 pb-0.5 hover:border-sepia/45";

const navControlClass =
  "min-h-[44px] font-sans text-[0.625rem] font-medium uppercase tracking-[0.14em] text-petroleum/80 underline-offset-[4px] transition-colors duration-500 hover:text-sepia hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum/45 disabled:pointer-events-none disabled:opacity-35 sm:min-h-0";

export function MilagresExperiencesEditorial() {
  const { ref, visible } = useReveal<HTMLElement>(0.08);
  const {
    galleryRef,
    setSlideRef,
    activeIndex,
    goPrev,
    goNext,
    galleryProps,
  } = useExperienceCarousel(milagresExperiences.length);

  const active = milagresExperiences[activeIndex];
  const indexLabel = String(activeIndex + 1).padStart(2, "0");
  const totalLabel = String(milagresExperiences.length).padStart(2, "0");

  return (
    <section
      ref={ref}
      id="experiencias"
      aria-labelledby="experiencias-titulo"
      className={`experience-section scroll-mt-[4.5rem] overflow-hidden bg-sand pb-[clamp(3.5rem,8vh,5.5rem)] pt-[clamp(3.75rem,9vh,6rem)] ${visible ? "experience-section-visible" : ""}`}
    >
      <header className="section-shell mx-auto max-w-[40rem] text-center">
        <p className="experience-header-item font-sans text-[0.625rem] font-semibold uppercase tracking-[0.28em] text-sepia/90 sm:text-[0.6875rem]">
          EXPERIÊNCIAS
        </p>
        <h2
          id="experiencias-titulo"
          className="experience-header-item experience-header-delay-1 mt-5 font-serif text-[clamp(2rem,4.2vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.02em] text-petroleum"
        >
          Um dia em Milagres
        </h2>
        <p className="experience-header-item experience-header-delay-2 mx-auto mt-5 max-w-[34ch] font-sans text-[clamp(0.9375rem,1.4vw,1.0625rem)] font-normal leading-[1.75] tracking-[0.012em] text-stone-600">
          Da primeira caminhada à beira-mar ao conforto de voltar para casa, cada
          momento encontra o seu próprio ritmo.
        </p>
        <a
          href="#experiencias-galeria"
          className={`experience-header-item experience-header-delay-3 ${editorialLinkClass}`}
        >
          Descubra a experiência
        </a>
      </header>

      <div
        id="experiencias-galeria"
        ref={galleryRef}
        {...galleryProps}
        tabIndex={0}
        role="region"
        aria-roledescription="carrossel"
        aria-label="Galeria Um dia em Milagres"
        className="experience-gallery experience-gallery-reveal mt-[clamp(2.75rem,7vh,4.25rem)] flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-[calc((100%-min(86vw,22rem))/2)] [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing sm:gap-5 sm:px-[calc((100%-min(72vw,28rem))/2)] md:gap-6 md:px-[calc((100%-min(64vw,42rem))/2)] lg:gap-8 lg:px-[calc((100%-min(62vw,56rem))/2)] [&::-webkit-scrollbar]:hidden"
      >
        {milagresExperiences.map((experience, index) => {
          const isActive = index === activeIndex;
          const objectStyle = {
            "--exp-pos": experience.objectPosition,
            "--exp-pos-md": experience.objectPositionMd ?? experience.objectPosition,
          } as CSSProperties;

          return (
            <figure
              key={experience.id}
              ref={(node) => setSlideRef(index, node)}
              className={`experience-slide shrink-0 snap-center transition-[transform,opacity] duration-[650ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] motion-reduce:transition-none ${
                isActive ? "scale-[1.015] opacity-100" : "scale-100 opacity-[0.68]"
              } w-[min(86vw,22rem)] sm:w-[min(72vw,28rem)] md:w-[min(64vw,42rem)] lg:w-[min(62vw,56rem)]`}
            >
              <div className="experience-slide-media overflow-hidden rounded-sm bg-stone-200/30 aspect-[4/5] sm:aspect-[5/4] md:aspect-[3/2] lg:h-[clamp(22rem,62vh,68vh)] lg:max-h-[68vh] lg:aspect-auto">
                <img
                  src={experience.image}
                  alt={experience.alt}
                  width={experience.width}
                  height={experience.height}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
                  className="experience-slide-img h-full w-full object-cover"
                  style={objectStyle}
                />
              </div>
            </figure>
          );
        })}
      </div>

      <div className="section-shell mt-[clamp(2rem,5vh,3rem)] text-center">
        <p className="font-sans text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-sepia/90">
          {active.moment}
        </p>
        <h3 className="mt-3 font-serif text-[clamp(1.375rem,2.8vw,1.875rem)] font-medium leading-snug tracking-[-0.015em] text-petroleum">
          {active.title}
        </h3>
        <p className="mx-auto mt-3 max-w-[32ch] font-sans text-[clamp(0.875rem,1.25vw,0.9875rem)] font-normal leading-[1.7] tracking-[0.01em] text-stone-600">
          {active.support}
        </p>

        <div className="mt-8 flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-10">
          <p
            className="font-sans text-[0.6875rem] font-medium tabular-nums tracking-[0.18em] text-petroleum/55"
            aria-live="polite"
            aria-atomic="true"
          >
            {indexLabel} / {totalLabel}
          </p>
          <div className="flex items-center gap-8">
            <button
              type="button"
              onClick={goPrev}
              disabled={activeIndex === 0}
              className={navControlClass}
              aria-label="Experiência anterior"
            >
              Anterior
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={activeIndex === milagresExperiences.length - 1}
              className={navControlClass}
              aria-label="Próxima experiência"
            >
              Próximo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
