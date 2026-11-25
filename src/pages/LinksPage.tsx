import { useEffect, type ReactNode } from "react";
import { bioLinks, bioPage, type BioLink } from "../data/bioLinks";

const GUIDE_TITLE = "MHV Milagres · Guia Exclusivo do Hóspede";
const GUIDE_DESCRIPTION =
  "MHV Milagres — Guia exclusivo do hóspede. Rota Ecológica, gastronomia, passeios e concierge.";

const mosaic = {
  sunset: bioPage.mosaic[0],
  beach: bioPage.mosaic[1],
  table: bioPage.mosaic[2],
  interior: bioPage.mosaic[3],
};

function MhvWordmark() {
  return (
    <div className="flex flex-col text-wine" aria-hidden>
      <span className="font-serif text-[1.375rem] font-normal leading-none tracking-[0.48em] lg:text-[1.5rem]">
        MHV
      </span>
      <span className="mt-2.5 font-sans text-[0.5625rem] font-light uppercase tracking-[0.46em] text-sepia">
        Milagres
      </span>
    </div>
  );
}

function ArrowIcon({ featured }: { featured?: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={`h-3.5 w-3.5 shrink-0 ${featured ? "opacity-75" : "opacity-35"}`}
    >
      <path
        d="M4 12h15M15 7l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function linkClassName(link: BioLink) {
  const base =
    "group flex min-h-12 w-full items-center justify-between gap-5 text-left font-sans font-light tracking-[0.1em] transition-[color,background-color,border-color] duration-luxe ease-luxe focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine/35";

  if (link.featured) {
    return `${base} mb-4 bg-wine px-5 text-[0.8125rem] text-sand hover:bg-[#3a2429]`;
  }

  return `${base} border-b border-wine/10 px-1 text-[0.75rem] text-wine hover:border-wine/25 hover:text-wine/75 sm:text-[0.8125rem]`;
}

function BioLinkInner({
  children,
  featured,
}: {
  children: ReactNode;
  featured?: boolean;
}) {
  return (
    <>
      <span className="min-w-0 flex-1 leading-snug">{children}</span>
      <ArrowIcon featured={featured} />
    </>
  );
}

function BioLinkItem({ link }: { link: BioLink }) {
  const className = linkClassName(link);

  if (!link.href) {
    return (
      <span className={`${className} cursor-default opacity-70`} aria-disabled="true">
        <BioLinkInner featured={link.featured}>{link.label}</BioLinkInner>
      </span>
    );
  }

  const isPdf = /\.pdf($|\?)/i.test(link.href);
  const href = link.href.startsWith("/")
    ? `${window.location.origin}${link.href}`
    : link.href;

  return (
    <a
      href={href}
      className={className}
      {...(isPdf ? { type: "application/pdf" } : {})}
      {...(link.external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      <BioLinkInner featured={link.featured}>{link.label}</BioLinkInner>
    </a>
  );
}

function MosaicImg({
  src,
  alt,
  position,
}: {
  src: string;
  alt: string;
  position?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      decoding="async"
      loading="eager"
      fetchPriority="high"
      draggable={false}
      style={position ? { objectPosition: position } : undefined}
    />
  );
}

function EditorialMosaic() {
  return (
    <div className="min-h-0 w-full lg:h-full">
      <div className="links-mosaic links-mosaic-mobile">
        <figure className="tile-sunset">
          <MosaicImg
            src={mosaic.sunset.src}
            alt={mosaic.sunset.alt}
            position="52% 40%"
          />
        </figure>
        <div className="tile-stack">
          <figure className="tile-beach">
            <MosaicImg
              src={mosaic.beach.src}
              alt={mosaic.beach.alt}
              position="38% 52%"
            />
          </figure>
          <div className="tile-pair">
            <figure>
              <MosaicImg
                src={mosaic.table.src}
                alt={mosaic.table.alt}
                position="48% 58%"
              />
            </figure>
            <figure>
              <MosaicImg
                src={mosaic.interior.src}
                alt={mosaic.interior.alt}
                position="50% 46%"
              />
            </figure>
          </div>
        </div>
      </div>

      <div className="links-mosaic links-mosaic-desktop">
        <figure className="tile-sunset">
          <MosaicImg
            src={mosaic.sunset.src}
            alt=""
            position="50% 36%"
          />
        </figure>
        <figure className="tile-beach">
          <MosaicImg src={mosaic.beach.src} alt="" position="38% 50%" />
        </figure>
        <figure className="tile-table">
          <MosaicImg src={mosaic.table.src} alt="" position="48% 58%" />
        </figure>
        <figure className="tile-interior">
          <MosaicImg src={mosaic.interior.src} alt="" position="50% 46%" />
        </figure>
      </div>
    </div>
  );
}

export function LinksPage() {
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute("content") ?? "";

    document.title = "MHV Milagres · Links";
    description?.setAttribute(
      "content",
      "MHV Milagres — reservas, guia da Rota Ecológica e atendimento.",
    );

    return () => {
      document.title = previousTitle || GUIDE_TITLE;
      description?.setAttribute("content", previousDescription || GUIDE_DESCRIPTION);
    };
  }, []);

  return (
    <div className="min-h-dvh bg-sand text-wine antialiased">
      <a href="#links-bio" className="skip-link">
        Pular para os links
      </a>

      <main className="mx-auto flex min-h-dvh max-w-[88rem] flex-col px-4 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-4 sm:px-6 lg:grid lg:h-dvh lg:grid-cols-[minmax(0,1.2fr)_minmax(22.5rem,0.8fr)] lg:items-stretch lg:gap-12 lg:overflow-hidden lg:px-10 lg:py-8 xl:gap-16 xl:px-14">
        <EditorialMosaic />

        <section className="flex flex-1 flex-col pt-7 lg:justify-between lg:pt-2 lg:pb-2">
          <div className="max-w-[28rem]">
            <header>
              <MhvWordmark />
              <h1 className="sr-only">{bioPage.title}</h1>
              <p className="mt-8 max-w-[12ch] font-serif text-[clamp(2.125rem,6.4vw,3.75rem)] font-normal italic leading-[1.05] tracking-[-0.02em] text-wine sm:mt-10">
                {bioPage.headline}
              </p>
              <p className="mt-5 font-sans text-[0.5625rem] font-light uppercase tracking-[0.32em] text-sepia/85">
                {bioPage.location}
              </p>
            </header>

            <nav
              id="links-bio"
              aria-label="Links da MHV Milagres"
              className="mt-9 flex flex-col lg:mt-12"
            >
              {bioLinks.map((link) => (
                <BioLinkItem key={link.id} link={link} />
              ))}
            </nav>
          </div>

          <p className="mt-8 font-serif text-[0.8125rem] font-normal italic tracking-[0.03em] text-wine/45 lg:mt-0">
            {bioPage.tagline}
          </p>
        </section>
      </main>
    </div>
  );
}
