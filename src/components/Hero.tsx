import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import {
  useBackgroundVideoPlayback,
  useBackgroundVideoSrc,
} from "../hooks/useBackgroundVideo";

/** Cache-bust: bump `v` in production when replacing hero / hero.mobile mp4 */
const HERO_VIDEO_CACHE_BUST = import.meta.env.DEV ? String(Date.now()) : "3";
const HERO_VIDEO_DESKTOP = `/media/videos/hero.mp4?v=${HERO_VIDEO_CACHE_BUST}`;
const HERO_VIDEO_MOBILE = `/media/videos/hero.mobile.mp4?v=${HERO_VIDEO_CACHE_BUST}`;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroVideoSrc = useBackgroundVideoSrc(HERO_VIDEO_DESKTOP, HERO_VIDEO_MOBILE);
  const { videoRef, onVideoReady } = useBackgroundVideoPlayback(heroVideoSrc);
  const [parallaxY, setParallaxY] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  function handleHeroVideoError(event: SyntheticEvent<HTMLVideoElement, Event>) {
    console.error(
      "[Hero] Falha ao carregar vídeo:",
      event.currentTarget.currentSrc || heroVideoSrc,
      event.currentTarget.error,
    );
  }

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
      className="relative isolate min-h-[32rem] overflow-hidden sm:min-h-[85vh]"
    >
      <div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{
          transform: reduceMotion
            ? undefined
            : `translate3d(0, ${parallaxY}px, 0) scale(1.02)`,
        }}
        aria-hidden
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onError={handleHeroVideoError}
          onLoadedData={onVideoReady}
          onCanPlay={onVideoReady}
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center opacity-100 [filter:none]"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-petroleum/28 via-transparent to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 z-[1] h-[min(55%,22rem)] w-[min(100%,42rem)] bg-[radial-gradient(ellipse_100%_100%_at_0%_100%,rgba(23,52,58,0.38),transparent_72%)]"
        aria-hidden
      />

      <div className="section-shell relative z-[2] flex min-h-[32rem] flex-col justify-end bg-transparent pb-[clamp(2.75rem,8vh,5rem)] pt-24 sm:min-h-[85vh] sm:pb-[clamp(3.5rem,9vh,5.5rem)] sm:pt-28">
        <div className="max-w-[720px] [text-shadow:0_1px_3px_rgba(23,52,58,0.45),0_8px_32px_rgba(23,52,58,0.22)]">
          <p className="hero-animate hero-animate-delay-1 mb-5 flex items-center gap-3 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.24em] text-[#FAFAF8] [text-shadow:0_1px_5px_rgba(0,0,0,0.2),0_1px_2px_rgba(255,255,255,0.12)]">
            <span className="h-px w-8 bg-[#E8D9B5]/70 sm:w-10" aria-hidden />
            MHV Milagres · Guia Exclusivo do Hóspede
          </p>

          <h1 className="hero-animate hero-animate-delay-2 hero-title-display max-w-[19ch] text-[clamp(2.25rem,4.6vw,4.125rem)] leading-[1.1] text-[#FFFFFF] sm:max-w-[17ch]">
            Sua jornada de luxo e tranquilidade começa aqui.
          </h1>

          <div className="hero-animate hero-animate-delay-3 relative mt-5 max-w-md">
            <div
              className="pointer-events-none absolute -left-2 top-1/2 z-0 h-[calc(100%+1.5rem)] w-[min(110%,26rem)] -translate-y-1/2 bg-[radial-gradient(ellipse_95%_120%_at_0%_50%,rgba(15,36,40,0.26),transparent_72%)] sm:w-[min(105%,28rem)]"
              aria-hidden
            />
            <p className="relative z-[1] font-sans text-[clamp(1.125rem,1.85vw,1.1875rem)] font-medium leading-[1.65] tracking-[0.015em] text-[#FFFFFF] [text-shadow:0_2px_10px_rgba(0,0,0,0.28),0_1px_3px_rgba(0,0,0,0.18)]">
              Descubra o melhor da Rota Ecológica.
            </p>
          </div>

          <div className="hero-animate hero-animate-delay-4 mt-7 sm:mt-8">
            <a
              href="#mapa"
              aria-label="Explorar o mapa da Rota Ecológica dos Milagres"
              className="hero-cta group relative inline-flex min-h-[44px] items-center gap-1 overflow-hidden rounded-full border border-petroleum/[0.22] bg-[#FDFCFA] px-3 py-1 font-sans text-[0.5625rem] font-semibold uppercase tracking-[0.1em] text-petroleum shadow-[0_1px_2px_rgba(23,52,58,0.06),0_4px_14px_rgba(23,52,58,0.09)] transition-[background-color,box-shadow,transform,border-color] duration-[550ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-px hover:border-petroleum/32 hover:bg-white hover:shadow-[0_2px_4px_rgba(23,52,58,0.07),0_8px_22px_rgba(23,52,58,0.11)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum/50 active:scale-[0.99] sm:min-h-0 sm:px-3 sm:py-1"
            >
              <span
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-[850ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:translate-x-full"
                aria-hidden
              />
              <span className="relative">Explorar o Santuário</span>
              <span
                className="relative flex h-4 w-4 items-center justify-center rounded-full border border-petroleum/15 bg-petroleum/[0.04] transition-[transform,border-color] duration-[550ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:translate-x-px group-hover:border-petroleum/22"
                aria-hidden
              >
                <svg
                  width="8"
                  height="8"
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
        className="hero-animate hero-animate-delay-5 pointer-events-none absolute bottom-6 left-1/2 z-[2] hidden -translate-x-1/2 flex-col items-center gap-1.5 sm:flex"
        aria-hidden
      >
        <span className="font-sans text-[0.6rem] font-medium uppercase tracking-[0.24em] text-[#FAFAF8]/90 [text-shadow:0_1px_6px_rgba(0,0,0,0.22),0_1px_2px_rgba(255,255,255,0.1)]">
          Descer
        </span>
        <span className="hero-scroll-line block h-8 w-px bg-gradient-to-b from-[#E8D9B5]/55 via-white/45 to-transparent" />
      </div>

      <span className="sr-only">
        Praia tropical — São Miguel dos Milagres e Rota Ecológica
      </span>
    </section>
  );
}
