import { useEffect, useRef, useState } from "react";

const heroImg =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=85";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [parallaxY, setParallaxY] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(motionQuery.matches);

    const onMotionChange = (event: MediaQueryListEvent) => {
      setReduceMotion(event.matches);
    };
    motionQuery.addEventListener("change", onMotionChange);

    let rafId = 0;

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section || motionQuery.matches) {
          setParallaxY(0);
          return;
        }
        const rect = section.getBoundingClientRect();
        if (rect.bottom <= 0) return;
        setParallaxY(window.scrollY * 0.28);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[32rem] overflow-hidden sm:min-h-[85vh]"
    >
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: reduceMotion
            ? undefined
            : `translate3d(0, ${parallaxY}px, 0) scale(1.06)`,
        }}
        aria-hidden
      >
        <div
          className="absolute inset-[-6%] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImg})` }}
        />
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-b from-petroleum/55 via-petroleum/15 to-petroleum/75"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-petroleum/60 via-petroleum/10 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_85%,rgba(23,52,58,0.4),transparent_65%)]"
        aria-hidden
      />

      <div className="section-shell relative flex min-h-[32rem] flex-col justify-end pb-[clamp(2.75rem,8vh,5rem)] pt-24 sm:min-h-[85vh] sm:pb-[clamp(3.5rem,9vh,5.5rem)] sm:pt-28">
        <div className="max-w-[720px]">
          <p className="hero-animate hero-animate-delay-1 mb-5 flex items-center gap-3 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-sand/90">
            <span className="h-px w-8 bg-sand/45 sm:w-10" aria-hidden />
            MHV Milagres · Guia Exclusivo do Hóspede
          </p>

          <h1 className="hero-animate hero-animate-delay-2 max-w-[18ch] font-serif text-[clamp(2.375rem,4.8vw,4.25rem)] font-semibold leading-[1.04] tracking-[-0.02em] text-sand sm:max-w-[16ch]">
            Sua jornada de luxo e tranquilidade começa aqui.
          </h1>

          <p className="hero-animate hero-animate-delay-3 mt-5 max-w-md font-sans text-[clamp(0.9375rem,1.6vw,1.0625rem)] font-normal leading-[1.65] tracking-[0.01em] text-white/88">
            Explore o melhor da Rota Ecológica.
          </p>

          <div className="hero-animate hero-animate-delay-4 mt-7 sm:mt-8">
            <a
              href="#mapa"
              aria-label="Explorar o mapa da Rota Ecológica dos Milagres"
              className="hero-cta group relative inline-flex min-h-[44px] items-center gap-3 overflow-hidden rounded-full border border-sand/30 bg-sand/95 px-7 py-3 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-petroleum shadow-[0_4px_20px_rgba(23,52,58,0.14)] transition-[background-color,box-shadow,transform,border-color] duration-500 ease-out hover:border-sand hover:bg-white hover:shadow-[0_8px_28px_rgba(23,52,58,0.16)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand/60 active:scale-[0.98]"
            >
              <span
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                aria-hidden
              />
              <span className="relative">Explorar o Santuário</span>
              <span
                className="relative flex h-7 w-7 items-center justify-center rounded-full border border-petroleum/12 bg-petroleum/[0.05] transition-[transform,background-color] duration-500 ease-out group-hover:translate-x-0.5"
                aria-hidden
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 7H11.5M11.5 7L7.5 3M11.5 7L7.5 11"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>

      <div
        className="hero-animate hero-animate-delay-5 pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 sm:flex"
        aria-hidden
      >
        <span className="font-sans text-[0.6rem] font-medium uppercase tracking-[0.22em] text-sand/40">
          Descer
        </span>
        <span className="hero-scroll-line block h-8 w-px bg-gradient-to-b from-sand/45 to-transparent" />
      </div>

      <span className="sr-only">
        Praia tropical — São Miguel dos Milagres e Rota Ecológica
      </span>
    </section>
  );
}
