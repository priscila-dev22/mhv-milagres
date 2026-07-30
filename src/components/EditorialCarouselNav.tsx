import type { PointerEvent as ReactPointerEvent, RefObject } from "react";

type ScrollBarBundle = {
  railRef: RefObject<HTMLDivElement | null>;
  railProps: {
    onPointerDown: (event: ReactPointerEvent<HTMLDivElement>) => void;
  };
  thumbProps: {
    onPointerDown: (event: ReactPointerEvent<HTMLDivElement>) => void;
    onPointerMove: (event: ReactPointerEvent<HTMLDivElement>) => void;
    onPointerUp: (event: ReactPointerEvent<HTMLDivElement>) => void;
    onPointerCancel: (event: ReactPointerEvent<HTMLDivElement>) => void;
  };
  metrics: {
    thumbLeft: number;
    thumbWidth: number;
    visible: boolean;
  };
  scrollPercent: number;
};

const arrowButtonClass =
  "flex h-11 w-11 shrink-0 items-center justify-center text-petroleum/55 transition-colors duration-300 hover:text-sepia focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum/45 disabled:pointer-events-none disabled:opacity-30 sm:h-10 sm:w-10";

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden
    >
      {direction === "left" ? (
        <path d="M14 6l-6 6 6 6" />
      ) : (
        <path d="M10 6l6 6-6 6" />
      )}
    </svg>
  );
}

type EditorialCarouselNavProps = {
  scrollBar: ScrollBarBundle;
  controlsId: string;
  ariaLabel: string;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
};

export function EditorialCarouselNav({
  scrollBar,
  controlsId,
  ariaLabel,
  onPrev,
  onNext,
  canPrev,
  canNext,
}: EditorialCarouselNavProps) {
  if (!scrollBar.metrics.visible) return null;

  return (
    <div className="mx-auto flex w-full max-w-[min(100%,20rem)] items-center gap-2 px-1 sm:max-w-[22rem] sm:gap-3 md:max-w-[24rem]">
      <button
        type="button"
        onClick={onPrev}
        disabled={!canPrev}
        className={arrowButtonClass}
        aria-label="Imagem anterior"
      >
        <ChevronIcon direction="left" />
      </button>

      <div
        ref={scrollBar.railRef}
        {...scrollBar.railProps}
        className="relative h-3 min-w-0 flex-1 cursor-pointer touch-none"
        role="scrollbar"
        aria-controls={controlsId}
        aria-orientation="horizontal"
        aria-valuenow={scrollBar.scrollPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-petroleum/15"
          aria-hidden
        />
        <div
          {...scrollBar.thumbProps}
          data-carousel-thumb
          data-gastro-thumb
          className="absolute top-1/2 h-[3px] min-w-[2rem] -translate-y-1/2 cursor-grab rounded-full bg-petroleum/40 transition-[background-color,height] duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:h-1 hover:bg-sepia/55 active:cursor-grabbing active:bg-sepia/65"
          style={{
            left: `${scrollBar.metrics.thumbLeft * 100}%`,
            width: `${scrollBar.metrics.thumbWidth * 100}%`,
          }}
        />
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={!canNext}
        className={arrowButtonClass}
        aria-label="Próxima imagem"
      >
        <ChevronIcon direction="right" />
      </button>
    </div>
  );
}
