import { useReveal } from "../hooks/useReveal";
import { useHorizontalScrollCarousel } from "../hooks/useHorizontalScrollCarousel";
import { revealDelay } from "../utils/revealDelay";

type Restaurant = {
  name: string;
  location: string;
  image: string;
  mapsQuery: string;
  instagram: string;
  objectPosition?: string;
};

const restaurants: Restaurant[] = [
  {
    name: "Patrícia Bistrô",
    location: "São Miguel dos Milagres, AL",
    image: "/media/images/gastronomy/bistro.jpg",
    mapsQuery: "Patrícia Bistrô São Miguel dos Milagres",
    instagram: "https://www.instagram.com/patriciabistro/",
    objectPosition: "50% 42%",
  },
  {
    name: "No Quintal",
    location: "São Miguel dos Milagres",
    image: "/media/images/gastronomy/quintal.jpg",
    mapsQuery: "No Quintal restaurante São Miguel dos Milagres",
    instagram: "https://www.instagram.com/restaurantenoquintal/",
    objectPosition: "50% 45%",
  },
  {
    name: "NACASA de boa",
    location: "Litoral norte, Alagoas",
    image: "/media/images/gastronomy/nacasa.jpg",
    mapsQuery: "NACASA de boa São Miguel dos Milagres",
    instagram: "https://www.instagram.com/nacasadeboa/",
    objectPosition: "50% 40%",
  },
  {
    name: "O beco",
    location: "São Miguel dos Milagres",
    image: "/media/o-beco.png",
    mapsQuery: "O beco São Miguel dos Milagres",
    instagram: "https://www.instagram.com/restauranteobeco/",
  },
  {
    name: "Sur",
    location: "Milagres · costa",
    image: "/media/images/gastronomy/sur.jpg",
    mapsQuery: "Sur restaurante São Miguel dos Milagres",
    instagram: "https://www.instagram.com/restaurantesur/",
    objectPosition: "50% 38%",
  },
  {
    name: "Milagres do Toque",
    location: "Praia do Toque",
    image: "/media/images/gastronomy/toque.jpg",
    mapsQuery: "Milagres do Toque Praia do Toque",
    instagram: "https://www.instagram.com/milagresdotoque/",
    objectPosition: "50% 44%",
  },
];

const SECTION_MAPS =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("restaurantes São Miguel dos Milagres AL");
const SECTION_INSTAGRAM = "https://www.instagram.com/explore/tags/saomigueldosmilagres/";

function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

const editorialLinkClass =
  "inline-flex min-h-[44px] items-center font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-petroleum underline-offset-[5px] transition-[color,opacity] duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:text-sepia hover:underline sm:min-h-0";

const cardLinkClass =
  "font-sans text-[0.625rem] font-medium uppercase tracking-[0.12em] text-petroleum/90 underline-offset-[4px] transition-colors duration-300 hover:text-sepia hover:underline";

export function Gastronomy() {
  const { ref, visible } = useReveal<HTMLElement>();
  const { trackRef, trackProps, scrollBar } = useHorizontalScrollCarousel();

  return (
    <section
      ref={ref}
      id="gastronomia"
      className={`section-pad scroll-mt-[4.5rem] overflow-hidden bg-sand ${visible ? "section-visible" : ""}`}
    >
      <div className="section-shell">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-10 xl:gap-14">
          <header className="reveal-item shrink-0 lg:sticky lg:top-[5.5rem] lg:w-[min(100%,22rem)] lg:max-w-[24rem] xl:w-[26rem]">
            <p className="font-sans text-[0.625rem] font-semibold uppercase tracking-[0.26em] text-sepia/90 sm:text-[0.6875rem]">
              GASTRONOMIA
            </p>
            <h2 className="section-title mt-5 text-[clamp(2rem,3.6vw,3.125rem)]">
              Sabores de Milagres
            </h2>
            <p className="section-lead mt-5 max-w-[32ch] text-stone-600">
              Uma seleção de restaurantes, beach clubs e experiências gastronômicas
              para descobrir durante sua estadia.
            </p>
            <div className="reveal-item reveal-item-delay-1 mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
              <a
                href={SECTION_MAPS}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ver localização de restaurantes na região no Google Maps"
                className={editorialLinkClass}
              >
                Ver localização
              </a>
              <a
                href={SECTION_INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Explorar São Miguel dos Milagres no Instagram"
                className={editorialLinkClass}
              >
                Instagram
              </a>
            </div>
          </header>

          <div className="min-w-0 flex-1 lg:-mr-[max(1rem,calc((100vw-min(100vw,1180px))/2+1rem))]">
            <div
              ref={trackRef}
              {...trackProps}
              className={`gastro-carousel flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto pb-1 pt-0.5 [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing sm:gap-6 md:gap-7 [&::-webkit-scrollbar]:hidden ${revealDelay(2)} reveal-item`}
              id="gastronomia-carrossel"
              aria-label="Carrossel de restaurantes"
            >
              {restaurants.map((restaurant) => (
                <article
                  key={restaurant.name}
                  className="w-[min(76vw,17.25rem)] shrink-0 snap-start sm:w-[18.5rem] md:w-[20rem] lg:w-[21.5rem] xl:w-[22.5rem]"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-stone-200/40">
                    <img
                      src={restaurant.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                      style={
                        restaurant.objectPosition
                          ? { objectPosition: restaurant.objectPosition }
                          : undefined
                      }
                    />
                  </div>
                  <h3 className="mt-5 font-serif text-[clamp(1.25rem,2vw,1.4375rem)] font-semibold leading-snug text-petroleum">
                    {restaurant.name}
                  </h3>
                  <p className="mt-2 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.11em] text-sepia/95">
                    {restaurant.location}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                    <a
                      href={mapsUrl(restaurant.mapsQuery)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ver rota para ${restaurant.name} no Google Maps`}
                      className={cardLinkClass}
                    >
                      Rota
                    </a>
                    <a
                      href={restaurant.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ver perfil oficial de ${restaurant.name} no Instagram`}
                      className={cardLinkClass}
                    >
                      Instagram
                    </a>
                  </div>
                </article>
              ))}
            </div>

            {scrollBar.metrics.visible ? (
              <div
                ref={scrollBar.railRef}
                {...scrollBar.railProps}
                className="gastro-scroll-rail relative mt-8 h-3 w-full max-w-[min(100%,18rem)] cursor-pointer touch-none sm:max-w-[20rem] md:max-w-[22rem]"
                role="scrollbar"
                aria-controls="gastronomia-carrossel"
                aria-orientation="horizontal"
                aria-valuenow={scrollBar.scrollPercent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Posição do carrossel de restaurantes"
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-petroleum/15"
                  aria-hidden
                />
                <div
                  {...scrollBar.thumbProps}
                  data-gastro-thumb
                  className="absolute top-1/2 h-[3px] min-w-[2.75rem] -translate-y-1/2 cursor-grab rounded-full bg-petroleum/40 transition-[background-color,height] duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:h-1 hover:bg-sepia/55 active:cursor-grabbing active:bg-sepia/65"
                  style={{
                    left: `${scrollBar.metrics.thumbLeft * 100}%`,
                    width: `${scrollBar.metrics.thumbWidth * 100}%`,
                  }}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
