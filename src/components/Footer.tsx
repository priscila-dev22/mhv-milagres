import { useReveal } from "../hooks/useReveal";
import {
  useBackgroundVideoPlayback,
  useBackgroundVideoSrc,
} from "../hooks/useBackgroundVideo";

const FOOTER_VIDEO_DESKTOP = "/media/videos/final.mp4";
const FOOTER_VIDEO_MOBILE = "/media/videos/final.mobile.mp4";

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
      className={`relative isolate overflow-hidden border-t border-white/8 px-4 py-10 text-sand md:px-5 lg:px-6 ${visible ? "section-visible" : ""}`}
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
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-petroleum/42 via-petroleum/22 to-petroleum/28"
        aria-hidden
      />

      <div className="section-shell relative z-[2] flex flex-col items-center gap-8 text-center sm:flex-row sm:items-start sm:justify-between sm:gap-10 sm:text-left [text-shadow:0_1px_8px_rgba(0,0,0,0.18)]">
        <div className="reveal-item max-w-md">
          <p className="font-serif text-[clamp(1.25rem,2vw,1.4375rem)] font-semibold italic leading-snug">
            MHV — Você vive. A gente cuida.
          </p>
          <p className="mt-3 font-sans text-sm font-normal leading-[1.65] tracking-[0.01em] text-white/70">
            Guia informativo para hóspedes. Dados de terceiros podem mudar sem aviso.
          </p>
        </div>

        <nav
          aria-label="Links úteis"
          className="reveal-item reveal-item-delay-2 flex flex-col gap-2.5 sm:items-end"
        >
          <a
            href="https://givalto.stays.net/pt/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contato e reservas no Stays.net"
            className="link-footer min-h-[44px] inline-flex items-center sm:min-h-0"
          >
            Contato &amp; reservas (Stays.net)
          </a>
          <a
            href="https://www.google.com/search?q=roteiro+ecológico+milagres+sustentabilidade"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pesquisar sustentabilidade na região dos Milagres"
            className="link-footer min-h-[44px] inline-flex items-center sm:min-h-0"
          >
            Sustentabilidade na região
          </a>
          <a
            href="https://givalto.stays.net/pt/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Termos de reserva no Stays.net"
            className="link-footer min-h-[44px] inline-flex items-center sm:min-h-0"
          >
            Termos de reserva
          </a>
        </nav>
      </div>
    </footer>
  );
}
