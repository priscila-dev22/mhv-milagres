import { useReveal } from "../hooks/useReveal";
import { revealDelay } from "../utils/revealDelay";

const CHAMPAGNE = "#E8D9B5";

const editorialImageClass =
  "h-full w-full object-cover brightness-[1.02] contrast-[1.03] saturate-[0.98] sepia-[0.015] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none group-hover:scale-[1.01]";

type MosaicImageProps = {
  src: string;
  alt: string;
  className?: string;
  delayClass?: string;
  imagePositionClass?: string;
};

function MosaicImage({
  src,
  alt,
  className = "",
  delayClass = "",
  imagePositionClass = "object-center",
}: MosaicImageProps) {
  return (
    <div
      className={`group reveal-item overflow-hidden rounded-[20px] ${delayClass} ${className}`}
    >
      <img
        src={src}
        alt={alt}
        decoding="async"
        className={`${editorialImageClass} ${imagePositionClass}`}
        loading="lazy"
      />
    </div>
  );
}

export function HospitalityEditorial() {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="experiencia-hospedagem"
      className={`scroll-mt-[4.5rem] bg-petroleum py-[clamp(3rem,7vh,4.5rem)] ${visible ? "section-visible" : ""}`}
      aria-label="Detalhes da experiência de hospedagem"
    >
      <div className="section-shell">
        <div className="grid min-h-0 grid-cols-1 gap-4 sm:gap-5 lg:h-[min(900px,max(720px,78vh))] lg:grid-cols-12 lg:grid-rows-[1.05fr_1fr_0.9fr] lg:gap-5 xl:gap-6">
          <MosaicImage
            src="/media/images/hospedagem/foto4.jpg"
            alt="Detalhe de acolhimento na hospedagem MHV Milagres"
            delayClass={revealDelay(1)}
            className="min-h-[11rem] sm:min-h-[13rem] lg:col-span-7 lg:row-start-1 lg:min-h-0"
          />

          <MosaicImage
            src="/media/images/foto2.jpg"
            alt="Momento vibrante da experiência na região"
            delayClass={revealDelay(2)}
            className="min-h-[9rem] sm:min-h-[11rem] lg:col-span-5 lg:row-start-1 lg:min-h-0"
          />

          <MosaicImage
            src="/media/images/hospedagem/foto5.jpg"
            alt="Conforto e cuidado nos ambientes"
            delayClass={revealDelay(3)}
            className="min-h-[10rem] sm:min-h-[12rem] lg:col-span-5 lg:row-start-2 lg:min-h-0"
          />

          <div
            className={`reveal-item flex flex-col justify-center px-1 py-6 sm:px-2 lg:col-span-7 lg:row-start-2 lg:min-h-0 lg:py-0 ${revealDelay(4)}`}
          >
            <span
              className="mb-5 block h-px w-8 opacity-80 sm:mb-6 sm:w-9"
              style={{ backgroundColor: CHAMPAGNE }}
              aria-hidden
            />
            <h2 className="font-serif text-[clamp(1.75rem,3.8vw,2.75rem)] font-medium leading-[1.12] tracking-[-0.02em] text-[#F8F6F2] [text-shadow:0_2px_14px_rgba(0,0,0,0.22)]">
              Cada{" "}
              <span className="font-semibold italic tracking-[-0.025em]">detalhe</span>
              <br />
              pensado para
              <br />
              receber você.
            </h2>
          </div>

          <MosaicImage
            src="/media/images/hospedagem/foto6.jpg"
            alt="Arquitetura da casa e área da piscina"
            delayClass={revealDelay(5)}
            imagePositionClass="object-[center_65%] lg:object-[center_72%]"
            className="min-h-[9.5rem] sm:min-h-[11rem] lg:col-span-12 lg:row-start-3 lg:min-h-0"
          />
        </div>
      </div>
    </section>
  );
}
