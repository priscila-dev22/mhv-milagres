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

  const linkClass = (href: string) => {
    const isActive = activeId === href.slice(1);
    const base =
      "inline-flex min-h-[44px] items-center rounded-full px-2.5 py-2 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.1em] transition-[color,background-color,opacity] duration-luxe ease-luxe focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 md:min-h-0 md:px-3 md:py-2 md:text-[0.75rem]";

    if (overHero) {
      return `${base} ${
        isActive
          ? "bg-white/15 text-sand"
          : "text-sand/80 hover:bg-white/10 hover:text-sand"
      } focus-visible:outline-sand/50`;
    }

    return `${base} ${
      isActive
        ? "bg-petroleum/8 text-petroleum"
        : "text-petroleum/75 hover:bg-white/60 hover:text-petroleum"
    } focus-visible:outline-petroleum/30`;
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-luxe ease-luxe ${
        overHero
          ? "border-b border-transparent bg-transparent"
          : "border-b border-stone-200/60 bg-sand/95 shadow-[0_2px_16px_rgba(23,52,58,0.04)] backdrop-blur-md"
      }`}
    >
      <nav
        className="section-shell flex h-16 items-center justify-between gap-3 md:h-[4.5rem]"
        aria-label="Seções do guia"
      >
        <p
          className={`shrink-0 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-luxe ease-luxe ${
            overHero ? "text-sand/90" : "text-sepia"
          }`}
        >
          MHV Milagres
        </p>

        <button
          type="button"
          className={`inline-flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border transition-colors duration-luxe ease-luxe focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 md:hidden ${
            overHero
              ? "border-sand/25 text-sand hover:bg-white/10 focus-visible:outline-sand/50"
              : "border-stone-200/70 text-petroleum hover:bg-white/60 focus-visible:outline-petroleum/40"
          }`}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
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

        <ul
          id="mobile-nav"
          className={`absolute left-0 right-0 top-full flex flex-col gap-0.5 border-b px-4 py-3 md:static md:flex md:flex-row md:flex-wrap md:justify-end md:gap-0.5 md:border-0 md:p-0 ${
            menuOpen ? "flex" : "hidden md:flex"
          } ${
            overHero
              ? "border-sand/15 bg-petroleum/90 backdrop-blur-md md:bg-transparent md:backdrop-blur-none"
              : "border-stone-200/60 bg-sand/98 backdrop-blur-md md:bg-transparent md:backdrop-blur-none"
          }`}
        >
          {links.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={linkClass(href)}
                onClick={() => setMenuOpen(false)}
                aria-current={activeId === href.slice(1) ? "page" : undefined}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
