import { useEffect } from "react";
import { bioLinks, bioPage, type BioLink } from "../data/bioLinks";
import "./LinksPage.css";

const GUIDE_TITLE = "MHV Milagres · Guia Exclusivo do Hóspede";
const GUIDE_DESCRIPTION =
  "MHV Milagres — Guia exclusivo do hóspede. Rota Ecológica, gastronomia, passeios e concierge.";

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="links-editorial__arrow"
    >
      <path
        d="M7 17L17 7M10 7h7v7"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BioLinkInner({ link }: { link: BioLink }) {
  return (
    <>
      <span className="links-editorial__copy">
        <span className="links-editorial__label">{link.label}</span>
        {link.description ? (
          <span className="links-editorial__desc">{link.description}</span>
        ) : null}
      </span>
      <ArrowIcon />
    </>
  );
}

function BioLinkItem({ link }: { link: BioLink }) {
  const className = `links-editorial__link${link.featured ? " is-featured" : ""}`;

  if (!link.href) {
    return (
      <span className={`${className} is-disabled`} aria-disabled="true">
        <BioLinkInner link={link} />
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
      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <BioLinkInner link={link} />
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
    <div className="links-editorial">
      <a href="#links-bio" className="skip-link">
        Pular para os links
      </a>

      <img
        className="links-editorial__bg"
        src={bioPage.editorial.background.src}
        alt=""
        decoding="async"
        fetchPriority="high"
        draggable={false}
      />
      <div className="links-editorial__veil" aria-hidden />

      <main className="links-editorial__content">
        <header className="links-editorial__brand">
          <img
            className="links-editorial__logo"
            src={bioPage.editorial.logo.src}
            alt={bioPage.editorial.logo.alt}
            width={945}
            height={354}
            decoding="async"
            fetchPriority="high"
            draggable={false}
          />
          <h1 className="sr-only">{bioPage.title}</h1>
          <p className="links-editorial__location">{bioPage.location}</p>
        </header>

        <nav id="links-bio" aria-label="Links da MHV Milagres" className="links-editorial__nav">
          {bioLinks.map((link) => (
            <BioLinkItem key={link.id} link={link} />
          ))}
        </nav>

        <p className="links-editorial__tagline">{bioPage.tagline}</p>
      </main>
    </div>
  );
}
