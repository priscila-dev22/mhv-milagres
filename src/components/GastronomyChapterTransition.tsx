import { useReveal } from "../hooks/useReveal";

export function GastronomyChapterTransition() {
  const { ref, visible } = useReveal<HTMLElement>(0.1);

  return (
    <section
      ref={ref}
      id="rota-ecologica-pausa"
      aria-label="Descubra Milagres no seu ritmo"
      className={`relative flex min-h-[72vh] max-h-[100vh] w-full items-center bg-[#1D3027] ${visible ? "chapter-pause-visible" : ""}`}
    >
      <div className="section-shell w-full py-[clamp(4.5rem,14vh,9rem)]">
        <div className="mx-auto max-w-[36rem] lg:max-w-[40rem]">
          <h2 className="chapter-pause-item text-center font-serif text-[clamp(2.125rem,5.2vw,3.625rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[#F8F4ED] lg:text-left">
            Descubra Milagres
            <br />
            no seu ritmo.
          </h2>
        </div>
      </div>
    </section>
  );
}
