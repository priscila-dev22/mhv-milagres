import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from "react";

/** Cache-bust: bump `v` in production when replacing public/media/videos/hero.mp4 */
const HERO_VIDEO_CACHE_BUST = import.meta.env.DEV ? String(Date.now()) : "2";
const HERO_VIDEO_SRC = `/media/videos/hero.mp4?v=${HERO_VIDEO_CACHE_BUST}`;

function logHeroVideoState(label: string, video: HTMLVideoElement) {
  console.info(`[Hero] ${label}:`, {
    currentSrc: video.currentSrc,
    paused: video.paused,
    ended: video.ended,
    readyState: video.readyState,
    videoWidth: video.videoWidth,
    videoHeight: video.videoHeight,
    duration: video.duration,
    currentTime: video.currentTime,
    autoplay: video.autoplay,
    muted: video.muted,
    loop: video.loop,
    playsInline: video.playsInline,
  });
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playbackCheckRef = useRef<number | null>(null);
  const [parallaxY, setParallaxY] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  const ensureHeroVideoPlayback = useCallback(async (video: HTMLVideoElement) => {
    video.muted = true;
    try {
      await video.play();
    } catch (error) {
      console.error("[Hero] Autoplay bloqueado:", error);
    }
  }, []);

  const handleHeroVideoLoaded = useCallback(
    (event: SyntheticEvent<HTMLVideoElement, Event>) => {
      const video = event.currentTarget;
      void ensureHeroVideoPlayback(video);
      logHeroVideoState("Vídeo carregado (loadedData)", video);

      if (playbackCheckRef.current !== null) {
        window.clearTimeout(playbackCheckRef.current);
      }

      const startTime = video.currentTime;
      playbackCheckRef.current = window.setTimeout(() => {
        logHeroVideoState("Verificação após 3s", video);
        if (video.currentTime <= startTime) {
          console.warn("[Hero] currentTime não avançou — vídeo pode estar pausado.");
        }
      }, 3000);
    },
    [ensureHeroVideoPlayback],
  );

  const handleHeroVideoCanPlay = useCallback(
    (event: SyntheticEvent<HTMLVideoElement, Event>) => {
      void ensureHeroVideoPlayback(event.currentTarget);
    },
    [ensureHeroVideoPlayback],
  );

  function handleHeroVideoError(event: SyntheticEvent<HTMLVideoElement, Event>) {
    console.error(
      "[Hero] Falha ao carregar vídeo:",
      event.currentTarget.currentSrc || HERO_VIDEO_SRC,
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
      if (playbackCheckRef.current !== null) {
        window.clearTimeout(playbackCheckRef.current);
      }
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
          src={HERO_VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onError={handleHeroVideoError}
          onLoadedData={handleHeroVideoLoaded}
          onCanPlay={handleHeroVideoCanPlay}
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center opacity-100 [filter:none]"
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
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
          <p className="hero-animate hero-animate-delay-1 mb-5 flex items-center gap-3 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-white/95">
            <span className="h-px w-8 bg-white/55 sm:w-10" aria-hidden />
            MHV Milagres · Guia Exclusivo do Hóspede
          </p>

          <h1 className="hero-animate hero-animate-delay-2 max-w-[18ch] font-serif text-[clamp(2.375rem,4.8vw,4.25rem)] font-semibold leading-[1.04] tracking-[-0.02em] text-[#FFFFFF] sm:max-w-[16ch]">
            Sua jornada de luxo e tranquilidade começa aqui.
          </h1>

          <p className="hero-animate hero-animate-delay-3 mt-5 max-w-md font-sans text-[clamp(0.9375rem,1.6vw,1.0625rem)] font-medium leading-[1.65] tracking-[0.01em] text-white/92">
            Explore o melhor da Rota Ecológica.
          </p>

          <div className="hero-animate hero-animate-delay-4 mt-7 sm:mt-8">
            <a
              href="#mapa"
              aria-label="Explorar o mapa da Rota Ecológica dos Milagres"
              className="hero-cta group relative inline-flex min-h-[44px] items-center gap-3 overflow-hidden rounded-full border border-petroleum/25 bg-white/95 px-7 py-3 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-petroleum shadow-[0_4px_20px_rgba(23,52,58,0.12)] transition-[background-color,box-shadow,transform,border-color] duration-500 ease-out hover:border-petroleum/40 hover:bg-white hover:shadow-[0_8px_28px_rgba(23,52,58,0.16)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum/50 active:scale-[0.98]"
            >
              <span
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                aria-hidden
              />
              <span className="relative">Explorar o Santuário</span>
              <span
                className="relative flex h-7 w-7 items-center justify-center rounded-full border border-petroleum/15 bg-petroleum/[0.06] transition-[transform,background-color] duration-500 ease-out group-hover:translate-x-0.5"
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
        className="hero-animate hero-animate-delay-5 pointer-events-none absolute bottom-6 left-1/2 z-[2] hidden -translate-x-1/2 flex-col items-center gap-1.5 sm:flex"
        aria-hidden
      >
        <span className="font-sans text-[0.6rem] font-medium uppercase tracking-[0.22em] text-white/75 [text-shadow:0_1px_8px_rgba(23,52,58,0.45)]">
          Descer
        </span>
        <span className="hero-scroll-line block h-8 w-px bg-gradient-to-b from-white/50 to-transparent" />
      </div>

      <span className="sr-only">
        Praia tropical — São Miguel dos Milagres e Rota Ecológica
      </span>
    </section>
  );
}
