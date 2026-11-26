import { useReveal } from "../hooks/useReveal";
import { revealDelay } from "../utils/revealDelay";

const CHAMPAGNE = "#E8D9B5";

const numberClass =
  "font-sans text-[0.625rem] font-medium tabular-nums tracking-[0.22em] text-wine/70";

const topicClass =
  "font-serif text-[1.5rem] font-normal leading-[1.15] tracking-[-0.015em] text-petroleum sm:text-[1.625rem] lg:text-[1.75rem]";

const labelClass =
  "font-sans text-[0.625rem] font-medium uppercase tracking-[0.16em] text-wine/70 sm:text-[0.6875rem]";

const bodyClass =
  "mt-1.5 font-sans text-[0.8125rem] font-normal leading-[1.6] tracking-[0.004em] text-stone-600 sm:text-[0.875rem] sm:leading-[1.65]";

const routes = [
  {
    title: "Aeroporto Maceió → Milagres",
    fares: [
      { label: "Van", price: "R$ 800" },
      { label: "Carro", price: "R$ 400" },
    ],
  },
  {
    title: "Aeroporto Recife → Milagres",
    fares: [
      { label: "Van", price: "R$ 1.400" },
      { label: "Carro", price: "R$ 800" },
    ],
  },
] as const;

export function Transfer() {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="transfer"
      aria-labelledby="transfer-titulo"
      className={`section-band scroll-mt-[4.5rem] py-[clamp(3.25rem,7vh,5.5rem)] ${visible ? "section-visible" : ""}`}
    >
      <div className="section-shell">
        <div className={`reveal-item ${revealDelay(1)}`}>
          <header className="mb-10 sm:mb-12">
            <h2 id="transfer-titulo" className="editorial-label">
              Transfer
            </h2>
            <span
              className="mt-3 block h-px w-8"
              style={{ backgroundColor: CHAMPAGNE }}
              aria-hidden
            />
          </header>

          <div className="border-t border-wine/[0.12]">
            {routes.map((route, index) => (
              <div
                key={route.title}
                className="relative border-b border-wine/[0.10] last:border-b-0"
              >
                <div className="flex flex-col lg:flex-row lg:items-start">
                  <div className="lg:w-[22%] lg:shrink-0 lg:pr-8">
                    <div className="flex flex-col gap-1.5 py-4 lg:py-5">
                      <p className={numberClass}>
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className={topicClass}>{route.title}</h3>
                    </div>
                  </div>

                  <div className="min-w-0 flex-1 pb-5 lg:py-5 lg:pr-12">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-8">
                      {route.fares.map((fare) => (
                        <div key={fare.label}>
                          <p className={labelClass}>{fare.label}</p>
                          <p className={bodyClass}>
                            <strong className="font-medium text-petroleum">
                              {fare.price}
                            </strong>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
