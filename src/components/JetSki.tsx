import { useReveal } from "../hooks/useReveal";

const JETSKI_IMAGE = "/media/images/turista/jetski.jpg";

const JETSKI_WHATSAPP_NUMBER: string = "5582993623883";

const JETSKI_INSTAGRAM_URL: string = "https://www.instagram.com/pri.ribe/";

const JETSKI_WHATSAPP_MESSAGE =
  "Olá! Gostaria de conhecer a experiência Japaratinga Jet Ski e consultar disponibilidade.";

const isJetskiWhatsAppConfigured = JETSKI_WHATSAPP_NUMBER !== "INSERIR_NUMERO_AQUI";

const jetskiExperienceHref = isJetskiWhatsAppConfigured
  ? `https://wa.me/${JETSKI_WHATSAPP_NUMBER}?text=${encodeURIComponent(JETSKI_WHATSAPP_MESSAGE)}`
  : "#jetski";

const editorialLinkClass =
  "inline-block font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-petroleum/85 underline-offset-[5px] transition-[color,border-color] duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:text-sepia focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-petroleum/40 border-b border-petroleum/22 pb-0.5 hover:border-sepia/45";

export function JetSki() {
  const { ref, visible } = useReveal<HTMLElement>(0.12);

  return (
    <section
      ref={ref}
      id="jetski"
      aria-labelledby="jetski-titulo"
      className={`jetski-section scroll-mt-[4.5rem] overflow-hidden bg-sand pb-[clamp(4rem,9vh,6.5rem)] pt-[clamp(4rem,9vh,6.5rem)] ${visible ? "jetski-section-visible" : ""}`}
    >
      <div className="section-shell">
        <div className="flex flex-col gap-[clamp(2.75rem,7vh,4rem)] lg:flex-row lg:items-stretch lg:justify-between lg:gap-12 xl:gap-20">
          <div className="jetski-copy flex flex-col justify-center lg:order-2 lg:w-[min(100%,45%)] lg:max-w-[26rem] lg:pl-2 xl:max-w-[28rem]">
            <p className="jetski-copy-item font-sans text-[0.625rem] font-semibold uppercase tracking-[0.26em] text-sepia/90 sm:text-[0.6875rem]">
              Experiência exclusiva
            </p>
            <h2
              id="jetski-titulo"
              className="jetski-copy-item jetski-copy-delay-1 mt-6 font-serif text-[clamp(1.875rem,3.6vw,3.125rem)] font-medium leading-[1.08] tracking-[-0.02em] text-petroleum sm:mt-7"
            >
              Japaratinga vista por outro horizonte.
            </h2>
            <p className="jetski-copy-item jetski-copy-delay-2 mt-8 max-w-[38ch] font-sans text-[clamp(0.9375rem,1.35vw,1.0625rem)] font-normal leading-[1.78] tracking-[0.012em] text-stone-600 sm:mt-10">
              Algumas paisagens só revelam toda a sua beleza quando observadas a
              partir do mar. Navegue por águas cristalinas, descubra novos ângulos
              da costa e viva um momento reservado para quem deseja conhecer a
              região de uma forma diferente.
            </p>
            <div className="jetski-copy-item jetski-copy-delay-3 mt-10 sm:mt-12">
              {isJetskiWhatsAppConfigured ? (
                <a
                  href={jetskiExperienceHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={editorialLinkClass}
                  aria-label="Conhecer a experiência Japaratinga Jet Ski pelo WhatsApp"
                >
                  Conhecer a experiência
                </a>
              ) : (
                <span
                  className={`${editorialLinkClass} cursor-not-allowed opacity-50`}
                  aria-disabled
                >
                  Conhecer a experiência
                </span>
              )}
            </div>
            <p className="jetski-copy-item jetski-copy-delay-4 mt-8 font-sans text-[0.6875rem] font-normal leading-relaxed tracking-[0.04em] text-stone-500/95 sm:mt-10">
              Experiência mediante agendamento.
            </p>
          </div>

          <figure className="jetski-media jetski-media-reveal lg:order-1 lg:w-[min(100%,55%)] lg:shrink-0">
            <div className="overflow-hidden rounded-sm border border-stone-200/45 bg-stone-200/20">
              <img
                src={JETSKI_IMAGE}
                alt="Horizonte aberto e mar cristalino na costa de Japaratinga, vista editorial"
                width={1800}
                height={1200}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="jetski-media-img block aspect-[4/5] w-full object-cover object-[50%_42%] sm:aspect-[5/4] lg:aspect-[4/5] lg:min-h-[28rem] lg:max-h-[min(72vh,40rem)] xl:min-h-[30rem]"
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}

export { JETSKI_INSTAGRAM_URL, JETSKI_WHATSAPP_NUMBER };
