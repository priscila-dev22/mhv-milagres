import {
  useBackgroundVideoPlayback,
  useBackgroundVideoSrc,
} from "../hooks/useBackgroundVideo";

/** Bump in production when replacing final / final.mobile mp4 (cache bust CDN). */
const FOOTER_VIDEO_CACHE_BUST = import.meta.env.DEV ? String(Date.now()) : "2";
const FOOTER_VIDEO_DESKTOP = `/media/videos/final.mp4?v=${FOOTER_VIDEO_CACHE_BUST}`;
const FOOTER_VIDEO_MOBILE = `/media/videos/final.mobile.mp4?v=${FOOTER_VIDEO_CACHE_BUST}`;

const footerLinks = [
  {
    href: "https://givalto.stays.net/pt/",
    label: "Contato e reservas",
    ariaLabel: "Contato e reservas no Stays.net",
  },
  {
    href: "https://www.google.com/search?q=roteiro+ecológico+milagres+sustentabilidade",
    label: "Sustentabilidade na região",
    ariaLabel: "Pesquisar sustentabilidade na região dos Milagres",
  },
  {
    href: "https://givalto.stays.net/pt/terms-and-conditions",
    label: "Termos de reserva",
    ariaLabel: "Termos e condições de reserva no Stays.net",
  },
] as const;

const institutionalLinkClass =
  "group flex min-h-[44px] items-center justify-between gap-3 border-b border-transparent py-3 font-sans text-[0.8125rem] font-medium tracking-[0.02em] text-petroleum/85 transition-[color,border-color] duration-luxe ease-luxe hover:text-sepia focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum/40 sm:text-sm";

export function Footer() {
  const footerVideoSrc = useBackgroundVideoSrc(
    FOOTER_VIDEO_DESKTOP,
    FOOTER_VIDEO_MOBILE,
  );
  const { videoRef, onVideoReady } = useBackgroundVideoPlayback(footerVideoSrc);

  return (
    <footer className="footer-site">
      <div
        className="footer-video-only relative h-[clamp(22rem,68vh,34rem)] w-full overflow-hidden sm:h-[clamp(26rem,72vh,40rem)] lg:h-[clamp(28rem,78vh,44rem)]"
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
          onLoadedData={onVideoReady}
          onCanPlay={onVideoReady}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="footer-institutional border-t border-stone-200/50 bg-sand pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-8 sm:pt-9 lg:pt-10">
        <div className="section-shell px-5 md:px-5 lg:px-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-10 lg:items-center">
            <p className="editorial-title-card max-w-[18rem] !text-[clamp(1.25rem,3.5vw,1.5rem)]">
              MHV — Você vive. A gente cuida.
            </p>

            <nav
              aria-label="Links institucionais"
              className="w-full sm:max-w-[17.5rem] sm:shrink-0"
            >
              <ul className="divide-y divide-stone-200/55 border-y border-stone-200/55">
                {footerLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.ariaLabel}
                      className={institutionalLinkClass}
                    >
                      <span>{link.label}</span>
                      <span
                        className="shrink-0 text-petroleum/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-sepia/70 motion-reduce:transition-none"
                        aria-hidden
                      >
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
