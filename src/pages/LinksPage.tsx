import { useEffect } from "react";
import { bioLinks, bioPage, type BioLink } from "../data/bioLinks";

const GUIDE_TITLE = "MHV Milagres · Guia Exclusivo do Hóspede";
const GUIDE_DESCRIPTION =
  "MHV Milagres — Guia exclusivo do hóspede. Rota Ecológica, gastronomia, passeios e concierge.";

function MhvWordmark() {
  return (
    <div className="flex flex-col items-center text-wine" aria-hidden>
      <span className="font-serif text-[2.375rem] font-normal leading-none tracking-[0.28em]">
        MHV
      </span>
      <span className="mt-2.5 font-sans text-[0.625rem] font-medium uppercase tracking-[0.42em] text-sepia">
        Milagres
      </span>
    </div>
  );
}

function linkClassName(link: BioLink) {
  const base =
    "flex min-h-12 w-full items-center justify-center px-5 text-center font-sans text-[0.8125rem] font-medium tracking-[0.04em] transition-[background-color,border-color,color,transform] duration-luxe ease-luxe focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine/40";

  if (link.featured) {
    return `${base} bg-wine text-sand hover:bg-[#382328]`;
  }

  return `${base} border border-wine/20 bg-transparent text-wine hover:border-wine/35 hover:bg-white/40`;
}

function BioLinkItem({ link }: { link: BioLink }) {
  const className = linkClassName(link);

  if (!link.href) {
    return (
      <span className={`${className} cursor-default opacity-70`} aria-disabled="true">
        {link.label}
      </span>
    );
  }

  return (
    <a
      href={link.href}
      className={className}
      {...(link.external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {link.label}
    </a>
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

      <main className="pb-[max(2.5rem,env(safe-area-inset-bottom))]">
        <figure className="relative isolate overflow-hidden">
          <img
            src={bioPage.photo.src}
            alt={bioPage.photo.alt}
            width={1600}
            height={1067}
            decoding="async"
            fetchPriority="high"
            className="h-[min(46vh,22rem)] w-full object-cover object-[50%_42%] sm:h-[min(50vh,28rem)] sm:object-[50%_32%] lg:object-[50%_28%]"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sand via-sand/10 to-transparent"
            aria-hidden
          />
        </figure>

        <div className="relative z-[1] mx-auto -mt-8 w-full max-w-[24.5rem] px-6 sm:-mt-10">
          <header className="flex flex-col items-center text-center">
            <MhvWordmark />
            <h1 className="sr-only">{bioPage.title}</h1>
            <p className="mt-4 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-sepia/90">
              {bioPage.location}
            </p>
          </header>

          <nav
            id="links-bio"
            aria-label="Links da MHV Milagres"
            className="mt-9 flex flex-col gap-2.5"
          >
            {bioLinks.map((link) => (
              <BioLinkItem key={link.id} link={link} />
            ))}
          </nav>

          <p className="mt-10 text-center font-serif text-[0.9375rem] font-normal italic tracking-[0.01em] text-wine/70">
            {bioPage.tagline}
          </p>
        </div>
      </main>
    </div>
  );
}
