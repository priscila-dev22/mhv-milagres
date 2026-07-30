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
      <div className="flex flex-col lg:min-h-[clamp(760px,88vh,900px)] lg:flex-row lg:items-stretch">
        <figure className="stay-planning-media reveal-item relative order-1 aspect-[4/5] w-full shrink-0 overflow-hidden sm:aspect-[5/4] lg:order-2 lg:aspect-auto lg:min-h-[clamp(760px,88vh,900px)] lg:w-[58%] xl:w-[60%]">
          <img
            src={ESTADIA_IMAGE_SRC}
            alt="Sala com sofá claro e vegetação ao fundo, ambiente acolhedor da estadia em Milagres"
            width={1920}
            height={1280}
            decoding="async"
            loading="eager"
            draggable={false}
            className="h-full w-full object-cover object-[34%_62%] sm:object-[38%_58%] md:object-[40%_55%] lg:object-[42%_52%] xl:object-[44%_50%]"
          />
        </figure>

        <div className="stay-planning-panel order-2 flex min-w-0 flex-1 flex-col bg-petroleum text-sand lg:order-1 lg:w-[42%] xl:w-[40%]">
          <div className="flex flex-1 flex-col justify-center px-6 py-10 sm:px-8 sm:py-12 lg:px-[clamp(2rem,5vw,4.5rem)] lg:py-[clamp(2.5rem,6vw,5.5rem)]">
            <header className="reveal-item max-w-[28rem]">
              <p className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.26em] text-[rgba(241,230,210,0.88)]">
                Sua estadia
              </p>
              <h2
                id="estadia-titulo"
                className="mt-4 font-serif text-[clamp(2.625rem,5vw,4.5rem)] font-medium leading-[1.06] tracking-[-0.025em] text-[#F8F4ED] sm:mt-5"
              >
                Planejando sua estadia
              </h2>
              <p className="mt-5 max-w-[34ch] font-sans text-[clamp(1rem,1.35vw,1.125rem)] font-normal leading-[1.75] tracking-[0.012em] text-[rgba(241,230,210,0.82)] sm:mt-6">
                Cada detalhe pode ser organizado antes da sua chegada, para que
                você aproveite Milagres com mais conforto e tranquilidade.
              </p>
            </header>

            <ul
              className="stay-planning-list reveal-item reveal-item-delay-1 mt-[clamp(3rem,6vh,4.5rem)] list-none border-t border-[rgba(241,230,210,0.14)] p-0"
              aria-label="Aspectos do planejamento da estadia"
            >
              {editorialBlocks.map((block, index) => (
                <li
                  key={block.title}
                  className={`stay-planning-item border-b border-[rgba(241,230,210,0.14)] py-6 sm:py-7 lg:py-8 ${revealDelay(index + 2)} reveal-item`}
                >
                  <p className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[rgba(241,230,210,0.65)]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-serif text-[clamp(1.75rem,3vw,2.625rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[#F8F4ED]">
                    {block.title}
                  </h3>
                  <p className="stay-planning-desc mt-3 max-w-[32ch] font-sans text-[clamp(0.9375rem,1.2vw,1.0625rem)] font-normal leading-[1.72] tracking-[0.01em] text-[rgba(241,230,210,0.78)] sm:mt-4">
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
