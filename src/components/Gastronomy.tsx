import { useReveal } from "../hooks/useReveal";
import { revealDelay } from "../utils/revealDelay";

type Restaurant = {
  name: string;
  location: string;
  vibe: string;
  image: string;
  mapsQuery: string;
  /** URL direta do perfil oficial no Instagram. */
  instagram: string;
};

const restaurants: Restaurant[] = [
  {
    name: "Patrícia Bistrô",
    location: "São Miguel dos Milagres, AL",
    vibe: "Bistrô intimista, cozinha criativa e carta de vinhos selecionada.",
    image: "/media/patricia-bistro.png",
    mapsQuery: "Patrícia Bistrô São Miguel dos Milagres",
    instagram: "https://www.instagram.com/patriciabistro/",
  },
  {
    name: "No Quintal",
    location: "Milagres · ambiente rústico-chique",
    vibe: "Sabores regionais em clima de quintal, ideal para o pôr do sol.",
    image: "/media/no-quintal.png",
    mapsQuery: "No Quintal restaurante São Miguel dos Milagres",
    instagram: "https://www.instagram.com/restaurantenoquintal/",
  },
  {
    name: "NACASA de boa",
    location: "no litoral norte de Alagoas.",
    vibe: "Restaurante ao ar livre. Drinks, comida de verdade, belisquetes e (boa) música.",
    image: "/media/nacasa-de-boa.png",
    mapsQuery: "NACASA de boa São Miguel dos Milagres",
    instagram: "https://www.instagram.com/nacasadeboa/",
  },
  {
    name: "O beco",
    location: "Tradicional na região",
    vibe: "Experimente uma viagem culinária única, traremos sabores inesquecíveis para sua mesa.",
    image: "/media/o-beco.png",
    mapsQuery: "O beco São Miguel dos Milagres",
    instagram: "https://www.instagram.com/restauranteobeco/",
  },
  {
    name: "Sur",
    location: "Milagres / entorno costeiro",
    vibe: "Pelo chef Serginho Jucá, uma verdadeira arte gastronômica.",
    image: "/media/sur.png",
    mapsQuery: "Sur restaurante São Miguel dos Milagres",
    instagram: "https://www.instagram.com/restaurantesur/",
  },
  {
    name: "Milagres do Toque",
    location: "Praia do Toque",
    vibe: "Ambiente vibrante, pé na areia, frutos do mar e drinks criativos.",
    image: "/media/milagres-do-toque.png",
    mapsQuery: "Milagres do Toque Praia do Toque",
    instagram: "https://www.instagram.com/milagresdotoque/",
  },
];

function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function Gastronomy() {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="gastronomia"
      className={`section-pad scroll-mt-[4.5rem] ${visible ? "section-visible" : ""}`}
    >
      <div className="section-shell">
        <header className="section-header text-center sm:text-left">
          <h2 className="section-title reveal-item">Curadoria Gastronômica</h2>
          <p className="section-lead reveal-item reveal-item-delay-1">
            Seleção rigorosa do rústico ao contemporâneo.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {restaurants.map((r, index) => (
            <article
              key={r.name}
              className={`luxe-card group flex h-full flex-col reveal-item ${revealDelay(index + 2)}`}
            >
              <div className="relative aspect-[4/3] shrink-0 overflow-hidden">
                <img
                  src={r.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover object-center luxe-media group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-petroleum/25 via-transparent to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="card-title min-h-[2.75rem] line-clamp-2">{r.name}</h3>
                <p className="mt-1.5 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-sepia">
                  {r.location}
                </p>
                <p className="mt-3 min-h-[4.75rem] flex-1 body-text text-[0.875rem] leading-[1.6] line-clamp-3">
                  {r.vibe}
                </p>
                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  <a
                    href={mapsUrl(r.mapsQuery)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ver rota para ${r.name} no Google Maps`}
                    className="btn-pill-primary"
                  >
                    Rota
                  </a>
                  <a
                    href={r.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ver perfil oficial de ${r.name} no Instagram`}
                    className="btn-pill-secondary"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
