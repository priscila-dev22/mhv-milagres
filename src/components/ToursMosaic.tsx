import type { CSSProperties } from "react";
import {
  getTourOptionContactHref,
  milagresCollageImages,
  milagresTourOptions,
  tourOptionHasContact,
  type MilagresTourOption,
} from "../data/milagresTours";
import { useReveal } from "../hooks/useReveal";

const tourLinkClass = "editorial-link mt-1 !text-[0.6875rem] !tracking-[0.12em] normal-case";

function TourOptionInline({ option }: { option: MilagresTourOption }) {
  const href = tourOptionHasContact(option)
    ? getTourOptionContactHref(option)
    : undefined;
  const linkLabel =
    option.contactLabel?.trim() ||
    (option.partnerName?.trim()
      ? `Falar com ${option.partnerName.trim()}`
      : "Ver indicação");

  return (
    <span className="tours-option-entry inline-flex max-w-full flex-col items-start">
      <span className="font-sans text-[clamp(0.875rem,1.25vw,1rem)] font-normal leading-snug tracking-[0.02em] text-petroleum/90">
        {option.label}
      </span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={tourLinkClass}
          aria-label={`${linkLabel}: ${option.label}`}
        >
          {linkLabel}
        </a>
      ) : null}
    </span>
  );
}

export function ToursMosaic() {
  const { ref, visible } = useReveal<HTMLElement>(0.06);

  return (
    <section
      ref={ref}
      id="passeios"
      aria-labelledby="passeios-titulo"
      className={`tours-section scroll-mt-[4.5rem] overflow-x-hidden bg-sand pb-[clamp(4rem,10vh,7rem)] pt-[clamp(4.25rem,10vh,7rem)] ${visible ? "tours-section-visible" : ""}`}
    >
      <div className="section-shell">
        <header className="max-w-[46rem]">
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

        <ul
          className="tours-header-item tours-header-delay-3 mt-[clamp(2rem,5vh,3.25rem)] flex max-w-[52rem] list-none flex-wrap items-baseline gap-x-[0.5rem] gap-y-[0.85rem] p-0 sm:gap-x-[0.65rem] sm:gap-y-3 md:gap-x-[0.75rem] lg:max-w-[58rem] lg:gap-x-[0.85rem]"
          aria-label="Opções de passeios"
        >
          {milagresTourOptions.flatMap((option, index) => {
            const items = [
              <li key={option.id} className="list-none">
                <TourOptionInline option={option} />
              </li>,
            ];
            if (index > 0) {
              items.unshift(
                <li
                  key={`sep-${option.id}`}
                  className="tours-option-sep shrink-0 list-none select-none font-sans text-[0.45rem] leading-none text-stone-400/90 sm:text-[0.5rem]"
                  aria-hidden
                >
                  ●
                </li>,
              );
            }
            return items;
          })}
        </ul>

        <div
          id="passeios-composicao"
          className="tours-collage-reveal mt-[clamp(3rem,8vh,5.5rem)] w-full min-w-0"
          aria-label="Colagem fotográfica de passeios em Milagres"
        >
          <div className="tours-collage mx-auto w-full max-w-[72rem]">
            {milagresCollageImages.map((image, index) => (
              <figure
                key={image.id}
                data-slot={image.slot}
                className={`tours-collage-piece tours-collage-delay-${Math.min(index + 1, 7)} min-h-0 min-w-0 ${image.className ?? ""}`}
                style={
                  image.aspectRatio
                    ? ({ ["--tours-aspect" as string]: image.aspectRatio } as CSSProperties)
                    : undefined
                }
              >
                <div className="tours-collage-frame h-full w-full overflow-hidden rounded-sm bg-stone-200/20">
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    loading={index < 2 ? "eager" : "lazy"}
                    decoding="async"
                    draggable={false}
                    className="tours-collage-img block h-full w-full object-cover motion-reduce:transition-none"
                    style={{
                      objectPosition: image.objectPosition ?? "50% 50%",
                      aspectRatio: image.aspectRatio,
                    }}
                  />
                </div>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
