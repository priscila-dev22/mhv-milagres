import { useReveal } from "../hooks/useReveal";

export function Footer() {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <footer
      ref={ref}
      className={`border-t border-white/8 bg-petroleum px-4 py-10 text-sand md:px-5 lg:px-6 ${visible ? "section-visible" : ""}`}
    >
      <div className="section-shell flex flex-col items-center gap-8 text-center sm:flex-row sm:items-start sm:justify-between sm:gap-10 sm:text-left">
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
            className="link-footer"
          >
            Contato &amp; reservas (Stays.net)
          </a>
          <a
            href="https://www.google.com/search?q=roteiro+ecológico+milagres+sustentabilidade"
            target="_blank"
            rel="noopener noreferrer"
            className="link-footer"
          >
            Sustentabilidade na região
          </a>
          <a
            href="https://givalto.stays.net/pt/"
            target="_blank"
            rel="noopener noreferrer"
            className="link-footer"
          >
            Termos de reserva
          </a>
        </nav>
      </div>
    </footer>
  );
}
