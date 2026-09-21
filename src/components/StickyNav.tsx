import { useEffect, useState } from "react";

const DESKTOP_NAV_MIN = 1180;

const desktopLinks = [
  { href: "#hero", label: "Início" },
  { href: "#informacoes", label: "Regras e informações" },
  { href: "#gastronomia", label: "Gastronomia" },
  { href: "#beach-clubs", label: "Beach Clubs" },
  { href: "#passeios", label: "Passeios" },
  { href: "#concierge", label: "Concierge" },
  { href: "#servicos", label: "Serviços" },
];

const links = [
  { href: "#hero", label: "Início" },
  { href: "#informacoes", label: "Regras e informações" },
  { href: "#gastronomia", label: "Gastronomia" },
  { href: "#beach-clubs", label: "Beach Clubs" },
  { href: "#passeios", label: "Passeios" },
  { href: "#concierge", label: "Concierge" },
  { href: "#servicos", label: "Serviços" },
  { href: "#itens-infantis", label: "Itens infantis" },
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
    const mq = window.matchMedia(`(min-width: ${DESKTOP_NAV_MIN}px)`);
    const onChange = () => setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const mq = window.matchMedia(`(min-width: ${DESKTOP_NAV_MIN}px)`);
    if (mq.matches) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const desktopLinkClass = (href: string) => {
    const isActive = activeId === href.slice(1);
    const base =
      "inline-flex min-h-[44px] shrink-0 items-center whitespace-nowrap rounded-full px-2.5 py-2 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.1em] antialiased transition-[color,background-color,opacity] duration-luxe ease-luxe focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 md:min-h-0 md:px-3 md:py-2 md:text-[0.75rem]";

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
      className={`fixed inset-x-0 top-0 z-50 overflow-visible transition-[background-color,border-color,box-shadow,backdrop-filter] duration-luxe ease-luxe ${
        menuOpen
          ? "border-b border-stone-200/70 bg-sand shadow-[0_2px_16px_rgba(69,43,49,0.06)] min-[1180px]:border-stone-200/60 min-[1180px]:bg-sand/95 min-[1180px]:backdrop-blur-md"
          : overHero
            ? "border-b border-transparent bg-transparent"
            : "border-b border-stone-200/60 bg-sand/95 shadow-[0_2px_16px_rgba(69,43,49,0.04)] backdrop-blur-md"
      }`}
    >
      <nav
        className="section-shell relative flex h-16 items-center justify-between gap-4 md:h-[4.5rem] min-[1180px]:gap-6"
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

        <div className="relative flex min-w-0 items-center justify-end gap-3 min-[1180px]:gap-5">
          <ul className="hidden min-[1180px]:flex min-[1180px]:flex-nowrap min-[1180px]:items-center min-[1180px]:gap-x-1 xl:gap-x-2">
            {desktopLinks.map(({ href, label }) => (
              <li key={href} className="shrink-0">
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

          <button
            type="button"
            className={`inline-flex h-11 w-11 min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-sm border antialiased transition-colors duration-luxe ease-luxe focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
              menuOpen || !overHero
                ? "border-stone-200/80 bg-sand text-petroleum hover:bg-stone-100/80 focus-visible:outline-petroleum/40"
                : "border-petroleum/25 text-petroleum hover:bg-white/15 focus-visible:outline-petroleum/40 [text-shadow:0_1px_3px_rgba(255,255,255,0.32),0_1px_2px_rgba(0,0,0,0.06)]"
            }`}
            aria-expanded={menuOpen}
            aria-controls="nav-panel"
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

          {menuOpen ? (
            <>
              <button
                type="button"
                className="fixed inset-0 z-[55] hidden bg-petroleum/10 min-[1180px]:block"
                aria-label="Fechar menu"
                onClick={() => setMenuOpen(false)}
              />
              <div
                id="nav-panel"
                className="mobile-nav-panel fixed inset-x-0 bottom-0 top-16 z-[60] overflow-y-auto border-t border-stone-200/80 bg-sand shadow-[0_8px_32px_rgba(69,43,49,0.12)] motion-reduce:transition-none md:top-[4.5rem] min-[1180px]:absolute min-[1180px]:inset-auto min-[1180px]:right-0 min-[1180px]:top-full min-[1180px]:z-[60] min-[1180px]:mt-2 min-[1180px]:w-[20.5rem] min-[1180px]:overflow-visible min-[1180px]:rounded-sm min-[1180px]:border min-[1180px]:border-stone-200/80 min-[1180px]:shadow-[0_12px_40px_rgba(69,43,49,0.12)]"
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
            </>
          ) : null}
        </div>
      </nav>
    </header>
  );
}

function isActiveMarker(activeId: string, href: string) {
  return activeId === href.slice(1);
}
