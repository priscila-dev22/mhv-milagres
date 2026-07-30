import { useReveal } from "../hooks/useReveal";
import { revealDelay } from "../utils/revealDelay";

const spots = [
  {
    title: "Milagres Beach",
    caption: "Águas cristalinas na maré baixa — um dos cenários mais celebrados da Costa dos Corais.",
    image: "/media/milagresbeach.png",
    maps: "https://www.google.com/maps/search/?api=1&query=Praia+do+Toque+Porto+de+Pedras+AL",
    span: "md:col-span-2",
  },
  {
    title: "Igrejinha do Marceneiro",
    caption: "Charme à beira-mar, calma e fotografia — o sul com alma de vilarejo.",
    image: "/media/igrejinha-marceneiro.png",
    maps: "https://www.google.com/maps/search/?api=1&query=Igrejinha+Marceneiro+São+Miguel+dos+Milagres",
    span: "md:col-span-1",
  },
  {
    title: "Associação Peixe-Boi",
    caption: "Encontro educativo com a conservação do peixe-boi-marinho — agende com antecedência.",
    image: "/media/peixe-boi.png",
    maps: "https://www.google.com/maps/search/?api=1&query=Associação+Peixe-Boi+Tatuamunha",
    span: "md:col-span-3",
  },
];

const spotObjectPositions = [
  "object-center",
  "object-[center_35%]",
  "object-[center_40%]",
];

export function ToursMosaic() {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="passeios"
      className={`section-band section-pad scroll-mt-[4.5rem] ${visible ? "section-visible" : ""}`}
    >
      <div className="section-shell">
        <header className="section-header text-center sm:text-left">
          <h2 className="section-title reveal-item">Passeios &amp; Pontos Turísticos</h2>
          <p className="section-lead reveal-item reveal-item-delay-1">
            Endereços imperdíveis da Rota Ecológica — curadoria para viver Milagres com calma.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-[minmax(240px,1fr)_minmax(200px,220px)] md:gap-5">
          {spots.map((s, i) => (
            <a
              key={s.title}
              href={s.maps}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex min-h-[220px] flex-col justify-end overflow-hidden rounded-2xl border border-stone-200/40 shadow-[0_2px_14px_rgba(23,52,58,0.04)] transition-[transform,box-shadow,border-color] duration-luxe ease-luxe hover:-translate-y-px hover:border-stone-200/65 hover:shadow-[0_6px_24px_rgba(23,52,58,0.07)] ${s.span} ${i === 2 ? "md:max-h-[220px]" : ""} reveal-item ${revealDelay(i + 2)}`}
            >
              <img
                src={s.image}
                alt=""
                loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover luxe-media group-hover:scale-[1.02] ${spotObjectPositions[i]}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-petroleum/88 via-petroleum/35 to-petroleum/10" />
              <div className="relative flex flex-col p-5 sm:p-6">
                <h3 className="card-title max-w-[18ch] text-sand line-clamp-2">{s.title}</h3>
                <p className="mt-2 max-w-md body-text text-[0.875rem] leading-[1.6] text-white/88 line-clamp-2">
                  {s.caption}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-sand/90 transition-[gap,color] duration-luxe ease-luxe group-hover:gap-2.5 group-hover:text-sand">
                  Ver no mapa
                  <span aria-hidden className="transition-transform duration-luxe ease-luxe group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
