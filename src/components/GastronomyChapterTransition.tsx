import { useReveal } from "../hooks/useReveal";

export function GastronomyChapterTransition() {
  const { ref, visible } = useReveal<HTMLElement>(0.1);

  return (
    <section
      ref={ref}
      id="rota-ecologica-pausa"
      aria-label="Rota Ecológica dos Milagres"
      className={`relative flex min-h-[80vh] max-h-[100vh] w-full items-center bg-[#1D3027] ${visible ? "chapter-pause-visible" : ""}`}
    >
      <div className="section-shell w-full py-[clamp(5rem,16vh,10rem)]">
        <div className="max-w-[36rem] lg:max-w-[40rem]">
          <p className="chapter-pause-item font-sans text-[0.625rem] font-medium uppercase tracking-[0.26em] text-[rgba(248,244,237,0.60)] sm:text-[0.6875rem] sm:tracking-[0.28em]">
            ROTA ECOLÓGICA DOS MILAGRES
          </p>

          <h2 className="chapter-pause-item chapter-pause-delay-1 mt-[clamp(2.5rem,6vh,3.75rem)] font-serif text-[clamp(2.125rem,5.2vw,3.625rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[#F8F4ED]">
            Descubra Milagres
            <br />
            no seu ritmo.
          </h2>

          <p className="chapter-pause-item chapter-pause-delay-2 mt-[clamp(2rem,5vh,3rem)] max-w-[34ch] font-sans text-[clamp(0.9375rem,1.45vw,1.0625rem)] font-normal leading-[1.75] tracking-[0.015em] text-[rgba(248,244,237,0.80)]">
            Praias quase intocadas, gastronomia autoral, experiências exclusivas e
            dias que parecem passar mais devagar.
          </p>
        </div>
      </div>
    </section>
  );
}
