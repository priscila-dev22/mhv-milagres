import { useReveal } from "../hooks/useReveal";
import {
  useBackgroundVideoPlayback,
  useBackgroundVideoSrc,
} from "../hooks/useBackgroundVideo";

const FOOTER_VIDEO_DESKTOP = "/media/videos/final.mp4";
const FOOTER_VIDEO_MOBILE = "/media/videos/final.mobile.mp4";

const footerLinks = [
  {
    href: "https://givalto.stays.net/pt/",
    label: "Contato & reservas (Stays.net)",
    ariaLabel: "Contato e reservas no Stays.net",
  },
  {
    href: "https://www.google.com/search?q=roteiro+ecológico+milagres+sustentabilidade",
    label: "Sustentabilidade na região",
    ariaLabel: "Pesquisar sustentabilidade na região dos Milagres",
  },
  {
    href: "https://givalto.stays.net/pt/",
    label: "Termos de reserva",
    ariaLabel: "Termos de reserva no Stays.net",
  },
] as const;

export function Footer() {
  const { ref, visible } = useReveal<HTMLElement>();
  const footerVideoSrc = useBackgroundVideoSrc(
    FOOTER_VIDEO_DESKTOP,
    FOOTER_VIDEO_MOBILE,
  );
  const { videoRef, onVideoReady } = useBackgroundVideoPlayback(footerVideoSrc);

  return (
    <footer
      ref={ref}
      className={`footer-video-section relative isolate overflow-hidden border-t border-white/8 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-[clamp(3rem,8vh,4.5rem)] text-sand md:px-5 lg:px-6 ${visible ? "section-visible" : ""}`}
    >
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
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
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center opacity-100 [filter:none]"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-petroleum/72 via-petroleum/48 to-petroleum/35"
        aria-hidden
      />

      <div className="section-shell relative z-[2] px-5 md:px-0">
        <div className="footer-video-content mx-auto flex max-w-[36rem] flex-col gap-8 text-left sm:max-w-none sm:flex-row sm:items-end sm:justify-between sm:gap-12 lg:items-end">
          <div className="reveal-item min-w-0">
            <p className="font-serif text-[clamp(1.375rem,4.5vw,1.75rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#F8F4ED] [text-shadow:0_1px_12px_rgba(0,0,0,0.35)] sm:text-[clamp(1.5rem,2vw,1.875rem)]">
              MHV — Você vive. A gente cuida.
            </p>
            <p className="mt-3 max-w-[32ch] font-sans text-[0.875rem] font-normal leading-[1.65] tracking-[0.01em] text-white/82 [text-shadow:0_1px_8px_rgba(0,0,0,0.28)] sm:max-w-md sm:text-sm">
              Guia informativo para hóspedes. Dados de terceiros podem mudar sem aviso.
            </p>
          </div>

          <nav
            aria-label="Links úteis"
            className="reveal-item reveal-item-delay-2 w-full shrink-0 sm:max-w-[17rem]"
          >
            <ul className="footer-link-list divide-y divide-white/15 border-y border-white/15">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.ariaLabel}
                    className="footer-editorial-link group flex min-h-[48px] items-center justify-between gap-3 py-3 font-sans text-[0.8125rem] font-medium tracking-[0.02em] text-white/88 transition-[color] duration-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 sm:min-h-[44px] sm:text-sm [text-shadow:0_1px_6px_rgba(0,0,0,0.25)]"
                  >
                    <span>{link.label}</span>
                    <span
                      className="shrink-0 text-white/55 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-white/80 motion-reduce:transition-none"
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
    </footer>
  );
}
