import { useReveal } from "../hooks/useReveal";

const FIM_DE_TARDE_SRC = "/media/images/experiencia/fim-de-tarde.jpg";
const IMAGE_WIDTH = 941;
const IMAGE_HEIGHT = 1672;

export function EveningAtMilagresEditorial() {
  const { ref, visible } = useReveal<HTMLElement>(0.12);

  return (
    <section
      ref={ref}
      id="fim-de-tarde-milagres"
      aria-label="Fim de tarde em Milagres"
      className={`editorial-sunset relative isolate w-full overflow-hidden ${visible ? "editorial-sunset-visible" : ""}`}
    >
      <div
        className="relative h-[clamp(75vh,82vh,85vh)] min-h-[75vh] max-h-[85vh] sm:min-h-[720px] sm:max-h-[980px] sm:h-[clamp(720px,90vh,980px)]"
        aria-hidden
      >
        <img
          src={FIM_DE_TARDE_SRC}
          alt=""
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          loading="lazy"
          decoding="async"
          className="editorial-sunset-media pointer-events-none absolute inset-0 h-full w-full object-cover object-[48%_40%] sm:object-[50%_38%] md:object-[50%_36%] lg:object-[50%_35%]"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_right,rgba(15,36,40,0.34)_0%,rgba(15,36,40,0.12)_20%,rgba(15,36,40,0.03)_36%,transparent_48%)] sm:bg-[linear-gradient(to_right,rgba(15,36,40,0.3)_0%,rgba(15,36,40,0.1)_18%,transparent_42%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_bottom,rgba(15,36,40,0.22)_0%,transparent_28%)] sm:bg-[linear-gradient(to_bottom,rgba(15,36,40,0.16)_0%,transparent_24%)]"
        aria-hidden
      />

      <div className="section-shell absolute inset-0 z-[2] flex items-start pt-[clamp(2.75rem,10vh,4.5rem)] sm:pt-[clamp(3.25rem,11vh,5rem)]">
        <div className="max-w-[17.5rem] sm:max-w-[20rem] md:max-w-[22rem] lg:max-w-[23rem]">
          <p className="editorial-sunset-item font-sans text-[0.625rem] font-medium uppercase tracking-[0.26em] text-[#F1E6D2]/88 sm:text-[0.6875rem] sm:tracking-[0.28em] [text-shadow:0_1px_8px_rgba(0,0,0,0.22)]">
            FIM DE TARDE EM MILAGRES
          </p>

          <h2 className="editorial-sunset-item editorial-sunset-delay-1 mt-[clamp(1.75rem,4vh,2.5rem)] font-serif text-[clamp(1.875rem,4.6vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.02em] text-[#FAFAF8] [text-shadow:0_2px_12px_rgba(0,0,0,0.28),0_1px_3px_rgba(0,0,0,0.18)]">
            Os dias terminam assim.
          </h2>

          <p className="editorial-sunset-item editorial-sunset-delay-2 mt-[clamp(1.25rem,3vh,1.75rem)] font-sans text-[clamp(0.875rem,1.35vw,1rem)] font-normal leading-[1.75] tracking-[0.015em] text-[#F8F6F2]/78 [text-shadow:0_1px_10px_rgba(0,0,0,0.24)]">
            Quando o sol começa a desaparecer, Milagres ganha um novo ritmo.
          </p>

          <p className="editorial-sunset-item editorial-sunset-delay-3 mt-[clamp(1.5rem,3.5vh,2rem)] font-sans text-[clamp(0.8125rem,1.2vw,0.9375rem)] font-light leading-[1.85] tracking-[0.06em] text-[#E8D9B5]/82 [text-shadow:0_1px_8px_rgba(0,0,0,0.2)]">
            Silêncio. Água. Brisa. Tempo.
          </p>
        </div>
      </div>
    </section>
  );
}
