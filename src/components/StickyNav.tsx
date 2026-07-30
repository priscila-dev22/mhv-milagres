import { useEffect, useState } from "react";

const links = [
  { href: "#hero", label: "Início" },
  { href: "#gastronomia", label: "Gastronomia" },
  { href: "#passeios", label: "Passeios" },
  { href: "#jetski", label: "Jet Ski" },
  { href: "#concierge", label: "Concierge" },
  { href: "#mapa", label: "Mapa" },
];

const SCROLL_THRESHOLD = 48;

export function StickyNav() {
  const [overHero, setOverHero] = useState(true);
  const [activeId, setActiveId] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setOverHero(window.scrollY < SCROLL_THRESHOLD);

      const offset = 88;
      let current = links[0].href.slice(1);

      for (const { href } of links) {
        const id = href.slice(1);
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) {
          current = id;
        }
      }

      setActiveId(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const desktopLinkClass = (href: string) => {
    const isActive = activeId === href.slice(1);
    const base =
      "inline-flex min-h-[44px] items-center rounded-full px-2.5 py-2 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.1em] antialiased transition-[color,background-color,opacity] duration-luxe ease-luxe focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 md:min-h-0 md:px-3 md:py-2 md:text-[0.75rem]";

    if (overHero) {
      return `${base} [text-shadow:0_1px_3px_rgba(255,255,255,0.32),0_1px_2px_rgba(0,0,0,0.06)] ${
        isActive
          ? "bg-white/20 text-petroleum"
          : "text-petroleum hover:bg-white/15 hover:text-petroleum"
      } focus-visible:outline-petroleum/40`;
    }

    return `${base} ${
      isActive
        ? "bg-petroleum/8 text-petroleum"
        : "text-petroleum/75 hover:bg-white/60 hover:text-petroleum"
    } focus-visible:outline-petroleum/30`;
  };

  const mobileLinkClass = (href: string) => {
    const isActive = activeId === href.slice(1);
    return `mobile-nav-link flex min-h-[52px] w-full items-center border-b border-stone-200/80 px-1 font-sans text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-petroleum transition-[color,background-color] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum/40 ${
      isActive
        ? "mobile-nav-link-active bg-petroleum/[0.06] pl-3 font-bold"
        : "hover:bg-stone-100/80"
    }`;
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-luxe ease-luxe ${
        menuOpen
          ? "border-b border-stone-200/70 bg-sand shadow-[0_2px_16px_rgba(23,52,58,0.06)] md:border-stone-200/60 md:bg-sand/95 md:backdrop-blur-md"
          : overHero
            ? "border-b border-transparent bg-transparent"
            : "border-b border-stone-200/60 bg-sand/95 shadow-[0_2px_16px_rgba(23,52,58,0.04)] backdrop-blur-md"
      }`}
    >
      <nav
        className="section-shell relative flex h-16 items-center justify-between gap-3 md:h-[4.5rem]"
        aria-label="Seções do guia"
      >
        <p
          className={`shrink-0 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.15em] antialiased transition-colors duration-luxe ease-luxe ${
            menuOpen || !overHero
              ? "text-sepia"
              : "text-petroleum [text-shadow:0_1px_3px_rgba(255,255,255,0.32),0_1px_2px_rgba(0,0,0,0.06)]"
          }`}
        >
          MHV Milagres
        </p>

        <button
          type="button"
          className={`inline-flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-sm border antialiased transition-colors duration-luxe ease-luxe focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 md:hidden ${
            menuOpen || !overHero
              ? "border-stone-200/80 bg-sand text-petroleum hover:bg-stone-100/80 focus-visible:outline-petroleum/40"
              : "border-petroleum/25 text-petroleum hover:bg-white/15 focus-visible:outline-petroleum/40 [text-shadow:0_1px_3px_rgba(255,255,255,0.32),0_1px_2px_rgba(0,0,0,0.06)]"
          }`}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-panel"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden>
            {menuOpen ? (
              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
            ) : (
              <path
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            )}
          </svg>
        </button>

        <ul className="hidden md:flex md:flex-row md:flex-wrap md:justify-end md:gap-0.5">
          {links.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={desktopLinkClass(href)}
                aria-current={activeId === href.slice(1) ? "page" : undefined}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {menuOpen ? (
        <div
          id="mobile-nav-panel"
          className="mobile-nav-panel fixed inset-x-0 bottom-0 top-16 z-[60] overflow-y-auto border-t border-stone-200/80 bg-sand shadow-[0_8px_32px_rgba(23,52,58,0.12)] md:hidden motion-reduce:transition-none"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
        >
          <ul className="flex flex-col px-4 py-3">
            {links.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className={mobileLinkClass(href)}
                  onClick={() => setMenuOpen(false)}
                  aria-current={activeId === href.slice(1) ? "page" : undefined}
                >
                  {isActiveMarker(activeId, href) ? (
                    <span className="mr-3 h-px w-4 shrink-0 bg-petroleum" aria-hidden />
                  ) : null}
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}

function isActiveMarker(activeId: string, href: string) {
  return activeId === href.slice(1);
}
