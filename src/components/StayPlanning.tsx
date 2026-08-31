import { useReveal } from "../hooks/useReveal";
import { revealDelay } from "../utils/revealDelay";

const ESTADIA_IMAGE_SRC = "/media/images/estadia/estadia.jpg?v=4";

const editorialBlocks = [
  {
    title: "Conforto",
    description: "Arquitetura pensada para descansar.",
  },
  {
    title: "Privacidade",
    description: "Casas exclusivas para viver Milagres.",
  },
  {
    title: "Experiências",
    description: "Vivências selecionadas para cada hóspede.",
  },
  {
    title: "Concierge",
    description: "Tudo preparado antes da sua chegada.",
  },
];

export function StayPlanning() {
  const { ref, visible } = useReveal<HTMLElement>(0.08);

  return (
    <section
      ref={ref}
      id="estadia"
      aria-labelledby="estadia-titulo"
      className={`stay-planning-section scroll-mt-[4.5rem] overflow-x-hidden bg-sand ${visible ? "section-visible" : ""}`}
    >
      <figure className="stay-planning-media reveal-item relative aspect-[5/4] w-full max-h-[clamp(15rem,48vw,22rem)] overflow-hidden sm:aspect-[16/10] sm:max-h-[clamp(16rem,40vw,24rem)] lg:aspect-[21/9] lg:max-h-[clamp(17rem,36vw,26rem)]">
        <img
          src={ESTADIA_IMAGE_SRC}
          alt="Sala com sofá claro e vegetação ao fundo, ambiente acolhedor da estadia em Milagres"
          width={1920}
          height={1280}
          decoding="async"
          loading="eager"
          draggable={false}
          className="h-full w-full object-cover object-[34%_62%] sm:object-[38%_58%] md:object-[40%_55%] lg:object-[42%_50%]"
        />
      </figure>

      <div className="stay-planning-panel bg-[#817268] text-sand">
        <div className="section-shell px-6 py-8 sm:px-8 sm:py-9 lg:px-6 lg:py-10 xl:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10 xl:gap-14">
            <header className="reveal-item min-w-0 shrink-0 lg:max-w-[min(100%,20rem)] xl:max-w-[22rem]">
              <h2
                id="estadia-titulo"
                className="font-serif text-[clamp(2rem,4.2vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.025em] text-[#F8F4ED]"
              >
                Planejando sua estadia
              </h2>
              <p className="mt-5 max-w-[34ch] font-sans text-[clamp(0.875rem,1.05vw,0.9875rem)] font-normal leading-[1.7] tracking-[0.006em] text-[rgba(241,230,210,0.82)]">
                Cada detalhe pode ser organizado antes da sua chegada, para que
                você aproveite Milagres com mais conforto e tranquilidade.
              </p>
            </header>

            <ul
              className="stay-planning-list reveal-item reveal-item-delay-1 grid min-w-0 flex-1 list-none grid-cols-1 gap-0 border-t border-[rgba(241,230,210,0.14)] p-0 sm:grid-cols-2 lg:mt-1 lg:border-t-0 lg:pt-0 xl:grid-cols-4 xl:divide-x xl:divide-[rgba(241,230,210,0.14)]"
              aria-label="Aspectos do planejamento da estadia"
            >
              {editorialBlocks.map((block, index) => (
                <li
                  key={block.title}
                  className={`stay-planning-item border-b border-[rgba(241,230,210,0.14)] py-5 sm:border-b-0 sm:py-0 sm:pr-5 lg:px-5 lg:first:pl-0 xl:border-b-0 ${revealDelay(index + 2)} reveal-item`}
                >
                  <p className="font-sans text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-[rgba(241,230,210,0.55)]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-sans text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-[#F8F4ED]">
                    {block.title}
                  </h3>
                  <p className="stay-planning-desc mt-2 max-w-[28ch] font-sans text-[0.8125rem] font-normal leading-[1.6] tracking-[0.01em] text-[rgba(241,230,210,0.72)]">
                    {block.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
