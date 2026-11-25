import { useEffect, type ReactNode } from "react";
import { bioLinks, bioPage, type BioLink } from "../data/bioLinks";

const GUIDE_TITLE = "MHV Milagres · Guia Exclusivo do Hóspede";
const GUIDE_DESCRIPTION =
  "MHV Milagres — Guia exclusivo do hóspede. Rota Ecológica, gastronomia, passeios e concierge.";

function MhvWordmark() {
  return (
    <div className="flex flex-col items-center text-wine" aria-hidden>
      <span className="font-serif text-[1.75rem] font-normal leading-none tracking-[0.46em] sm:text-[1.875rem]">
        MHV
      </span>
      <span className="mt-3 font-sans text-[0.5625rem] font-light uppercase tracking-[0.52em] text-sepia/90">
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
      className={`h-3.5 w-3.5 shrink-0 ${featured ? "opacity-70" : "opacity-40"}`}
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
    "group flex min-h-11 w-full items-center justify-between gap-4 px-5 text-left font-sans text-[0.75rem] font-light tracking-[0.08em] transition-[background-color,border-color,color,opacity] duration-luxe ease-luxe focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine/35 sm:min-h-12 sm:px-6 sm:text-[0.8125rem] sm:tracking-[0.1em]";

  if (link.featured) {
    return `${base} bg-wine text-sand hover:bg-[#3d262c]`;
  }

  return `${base} border border-wine/15 bg-transparent text-wine hover:border-wine/30 hover:bg-white/25`;
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

      <main className="pb-[max(3rem,env(safe-area-inset-bottom))]">
        <figure className="relative isolate overflow-hidden">
          <img
            src={bioPage.photo.src}
            alt={bioPage.photo.alt}
            width={1600}
            height={1067}
            decoding="async"
            fetchPriority="high"
            className="h-[min(28vh,13.5rem)] w-full object-cover object-[50%_42%] saturate-[0.62] contrast-[0.92] brightness-[1.08] sm:h-[min(30vh,15.5rem)] sm:object-[50%_40%] lg:object-[50%_38%]"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-sand/25"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-sand via-sand/70 to-transparent"
            aria-hidden
          />
        </figure>

        <div className="relative z-[1] mx-auto -mt-5 w-full max-w-[400px] px-5 sm:-mt-6 sm:px-0">
          <header className="flex flex-col items-center text-center">
            <MhvWordmark />
            <h1 className="sr-only">{bioPage.title}</h1>
            <span
              className="mt-5 block h-px w-8 bg-wine/20"
              aria-hidden
            />
            <p className="mt-5 font-sans text-[0.5625rem] font-light uppercase tracking-[0.32em] text-sepia/80">
              {bioPage.location}
            </p>
          </header>

          <nav
            id="links-bio"
            aria-label="Links da MHV Milagres"
            className="mt-10 flex flex-col gap-2 sm:mt-12 sm:gap-2.5"
          >
            {bioLinks.map((link) => (
              <BioLinkItem key={link.id} link={link} />
            ))}
          </nav>

          <p className="mt-12 text-center font-serif text-[0.8125rem] font-normal italic leading-relaxed tracking-[0.04em] text-wine/45 sm:mt-14 sm:text-[0.875rem]">
            {bioPage.tagline}
          </p>
        </div>
      </main>
    </div>
  );
}
