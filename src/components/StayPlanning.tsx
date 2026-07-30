import { useReveal } from "../hooks/useReveal";
import { revealDelay } from "../utils/revealDelay";

const ESTADIA_BG_SRC = "/media/images/estadia/estadia.jpg?v=3";

const ESTADIA_TITLE_SHADOW =
  "[text-shadow:0_2px_10px_rgba(0,0,0,0.28),0_1px_3px_rgba(0,0,0,0.18)]";

const ESTADIA_CAPTION_SHADOW =
  "[text-shadow:0_2px_10px_rgba(0,0,0,0.26),0_1px_4px_rgba(0,0,0,0.16)]";

const CHAMPAGNE = "#F1E6D2";

const editorialBlocks = [
  {
    title: "Conforto",
    lines: ["Arquitetura pensada", "para descansar."],
  },
  {
    title: "Privacidade",
    lines: ["Casas exclusivas", "para viver Milagres."],
  },
  {
    title: "Experiências",
    lines: ["Vivências selecionadas", "para cada hóspede."],
  },
  {
    title: "Concierge",
    lines: ["Tudo preparado", "antes da sua chegada."],
  },
];

export function StayPlanning() {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="estadia"
      className={`section-pad relative isolate scroll-mt-[4.5rem] overflow-hidden min-h-[min(100vh,40rem)] sm:min-h-[min(92vh,44rem)] ${visible ? "section-visible" : ""}`}
    >
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <img
          src={ESTADIA_BG_SRC}
          alt=""
          decoding="async"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full min-h-[28rem] object-cover object-[46%_58%] sm:min-h-[32rem] sm:object-[44%_54%] lg:object-[42%_52%]"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_right,rgba(15,36,40,0.36)_0%,rgba(15,36,40,0.15)_24%,rgba(15,36,40,0.05)_40%,transparent_55%)] sm:bg-[linear-gradient(to_right,rgba(15,36,40,0.3)_0%,rgba(15,36,40,0.11)_22%,transparent_46%)]"
        aria-hidden
      />

      <div className="section-shell relative z-[2]">
        <div className="max-w-[min(100%,19.5rem)] sm:max-w-[22.5rem] lg:max-w-[24rem]">
          <header className="reveal-item mb-12 sm:mb-14 lg:mb-[4.25rem]">
            <span
              className="mb-4 block h-[0.5px] w-8 sm:mb-5 sm:w-9"
              style={{ backgroundColor: CHAMPAGNE }}
              aria-hidden
            />
            <h2
              className={`section-title font-semibold text-[#FFFFFF] ${ESTADIA_TITLE_SHADOW} text-[clamp(2rem,3.45vw,3.35rem)]`}
            >
              Planejando sua estadia
            </h2>
          </header>

          <div className="flex flex-col">
            {editorialBlocks.map((block, index) => (
              <div key={block.title}>
                <article
                  className={`reveal-item py-12 first:pt-0 sm:py-14 lg:py-16 ${revealDelay(index + 1)}`}
                >
                  <h3
                    className={`font-serif text-[clamp(1.9rem,3.95vw,2.875rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-[#FFFFFF] ${ESTADIA_TITLE_SHADOW}`}
                  >
                    {block.title}
                  </h3>
                  <p
                    className={`mt-6 max-w-[22ch] font-sans text-[clamp(0.875rem,1.42vw,1rem)] font-light leading-[1.85] tracking-[0.025em] text-[#F1E6D2] sm:mt-7 ${ESTADIA_CAPTION_SHADOW}`}
                  >
                    {block.lines.map((line, lineIndex) => (
                      <span key={line}>
                        {lineIndex > 0 ? <br /> : null}
                        {line}
                      </span>
                    ))}
                  </p>
                </article>
                {index < editorialBlocks.length - 1 ? (
                  <div
                    className="h-[0.5px] w-full max-w-[9rem] opacity-55 sm:max-w-[10rem]"
                    style={{ backgroundColor: CHAMPAGNE }}
                    aria-hidden
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
