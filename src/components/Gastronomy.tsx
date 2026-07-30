import { EditorialCarouselNav } from "./EditorialCarouselNav";
import { useReveal } from "../hooks/useReveal";
import { useHorizontalStepCarousel } from "../hooks/useHorizontalScrollCarousel";
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

function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

const cardLinkClass = "editorial-link mt-4";

export function Gastronomy() {
  const { ref, visible } = useReveal<HTMLElement>();
  const {
    trackRef,
    trackProps,
    scrollBar,
    setSlideRef,
    goPrev,
    goNext,
    canGoPrev,
    canGoNext,
  } = useHorizontalStepCarousel(restaurants.length, {
    thumbSelector: "[data-gastro-thumb]",
  });

  return (
    <section
      ref={ref}
      id="gastronomia"
      className={`section-pad scroll-mt-[4.5rem] overflow-hidden bg-sand ${visible ? "section-visible" : ""}`}
    >
      <div className="section-shell">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12 xl:gap-16">
          <header className="reveal-item shrink-0 lg:sticky lg:top-[5.5rem] lg:w-[min(100%,22rem)] lg:max-w-[24rem] xl:w-[26rem]">
            <p className="editorial-label">GASTRONOMIA</p>
            <h2 className="section-title mt-5">Sabores de Milagres</h2>
            <p className="section-lead measure-tight">
              Uma seleção de restaurantes, beach clubs e experiências gastronômicas
              para descobrir durante sua estadia.
            </p>
          </header>

          <div className="min-w-0 flex-1 lg:-mr-[max(1rem,calc((100vw-min(100vw,1180px))/2+1rem))]">
            <div
              ref={trackRef}
              {...trackProps}
              className={`gastro-carousel flex cursor-grab touch-pan-x touch-pan-y snap-x snap-mandatory gap-5 overflow-x-auto pb-1 pt-0.5 [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing sm:gap-6 md:gap-7 [&::-webkit-scrollbar]:hidden ${revealDelay(2)} reveal-item`}
              id="gastronomia-carrossel"
              aria-label="Carrossel de restaurantes"
            >
              {restaurants.map((restaurant, index) => (
                <article
                  key={restaurant.name}
                  ref={(node) => setSlideRef(index, node)}
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
                  <h3 className="editorial-title-card mt-5">{restaurant.name}</h3>
                  <p className="editorial-caption mt-2.5">{restaurant.location}</p>
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

            <div className="mt-8">
              <EditorialCarouselNav
                scrollBar={scrollBar}
                controlsId="gastronomia-carrossel"
                ariaLabel="Posição do carrossel de restaurantes"
                onPrev={goPrev}
                onNext={goNext}
                canPrev={canGoPrev}
                canNext={canGoNext}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
