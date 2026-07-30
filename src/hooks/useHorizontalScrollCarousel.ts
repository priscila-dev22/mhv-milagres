import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { useCarouselScrollBar } from "./useCarouselScrollBar";

type HorizontalScrollCarouselOptions = {
  thumbSelector?: string;
  draggingClass?: string;
};

export function useHorizontalScrollCarousel(
  options: HorizontalScrollCarouselOptions = {},
) {
  const thumbSelector = options.thumbSelector ?? "[data-gastro-thumb]";
  const draggingClass = options.draggingClass ?? "gastro-carousel--dragging";

  const trackRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({
    active: false,
    startX: 0,
    scrollLeft: 0,
    pointerId: -1,
  });

  const scrollBar = useCarouselScrollBar(trackRef, thumbSelector);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      event.preventDefault();
      track.scrollLeft += event.deltaY;
    };

    track.addEventListener("wheel", onWheel, { passive: false });
    return () => track.removeEventListener("wheel", onWheel);
  }, []);

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.button !== 0) return;
      if ((event.target as HTMLElement).closest("a")) return;
      if ((event.target as HTMLElement).closest("button")) return;

      const track = trackRef.current;
      if (!track) return;

      dragState.current = {
        active: true,
        startX: event.clientX,
        scrollLeft: track.scrollLeft,
        pointerId: event.pointerId,
      };
      track.classList.add(draggingClass);
      track.setPointerCapture(event.pointerId);
    },
    [draggingClass],
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const track = trackRef.current;
      const state = dragState.current;
      if (!track || !state.active || state.pointerId !== event.pointerId) return;

      event.preventDefault();
      const delta = event.clientX - state.startX;
      track.scrollLeft = state.scrollLeft - delta;
    },
    [],
  );

  const endDrag = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const track = trackRef.current;
      const state = dragState.current;
      if (!track || !state.active || state.pointerId !== event.pointerId) return;

      state.active = false;
      track.classList.remove(draggingClass);
      track.releasePointerCapture(event.pointerId);
      scrollBar.updateMetrics();
    },
    [draggingClass, scrollBar],
  );

  return {
    trackRef,
    trackProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
    },
    scrollBar,
  };
}

export function useHorizontalSnapCarousel(
  slideCount: number,
  initialIndex: number,
  options: HorizontalScrollCarouselOptions = {},
) {
  const carousel = useHorizontalScrollCarousel(options);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const activeIndexRef = useRef(initialIndex);

  const setSlideRef = useCallback((index: number, node: HTMLElement | null) => {
    slideRefs.current[index] = node;
  }, []);

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const track = carousel.trackRef.current;
      const clamped = Math.min(Math.max(index, 0), slideCount - 1);
      const slide = slideRefs.current[clamped];
      if (!track || !slide) return;

      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const target = slideCenter - track.clientWidth / 2;
      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);

      track.scrollTo({
        left: Math.min(Math.max(0, target), maxScroll),
        behavior,
      });
    },
    [carousel.trackRef, slideCount],
  );

  const syncActiveFromScroll = useCallback(() => {
    const track = carousel.trackRef.current;
    if (!track) return;

    const center = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let minDistance = Number.POSITIVE_INFINITY;

    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(center - slideCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closest = index;
      }
    });

    activeIndexRef.current = closest;
    setActiveIndex(closest);
    carousel.scrollBar.updateMetrics();
  }, [carousel.scrollBar, carousel.trackRef]);

  useEffect(() => {
    const track = carousel.trackRef.current;
    if (!track) return;

    let raf: number | null = null;
    const onScroll = () => {
      if (raf !== null) return;
      raf = window.requestAnimationFrame(() => {
        raf = null;
        syncActiveFromScroll();
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [carousel.trackRef, syncActiveFromScroll]);

  useLayoutEffect(() => {
    let cancelled = false;
    const centerInitial = (attempt = 0) => {
      if (cancelled) return;
      const slide = slideRefs.current[initialIndex];
      if (slide && slide.offsetWidth > 0) {
        scrollToIndex(initialIndex, "auto");
        activeIndexRef.current = initialIndex;
        setActiveIndex(initialIndex);
        return;
      }
      if (attempt < 30) {
        window.requestAnimationFrame(() => centerInitial(attempt + 1));
      }
    };
    centerInitial();
    return () => {
      cancelled = true;
    };
  }, [initialIndex, scrollToIndex]);

  useEffect(() => {
    const track = carousel.trackRef.current;
    if (!track) return;

    const ro = new ResizeObserver(() => {
      scrollToIndex(activeIndexRef.current, "auto");
    });
    ro.observe(track);
    for (const child of track.children) {
      ro.observe(child);
    }
    return () => ro.disconnect();
  }, [carousel.trackRef, scrollToIndex]);

  const goPrev = useCallback(() => {
    scrollToIndex(activeIndexRef.current - 1);
  }, [scrollToIndex]);

  const goNext = useCallback(() => {
    scrollToIndex(activeIndexRef.current + 1);
  }, [scrollToIndex]);

  const canGoPrev = activeIndex > 0;
  const canGoNext = activeIndex < slideCount - 1;

  const onKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    },
    [goNext, goPrev],
  );

  return {
    ...carousel,
    activeIndex,
    setSlideRef,
    goPrev,
    goNext,
    canGoPrev,
    canGoNext,
    scrollToIndex,
    trackProps: {
      ...carousel.trackProps,
      onKeyDown,
    },
  };
}

/** Carrossel com snap-start — avança um card por clique (Gastronomia). */
export function useHorizontalStepCarousel(
  slideCount: number,
  options: HorizontalScrollCarouselOptions = {},
) {
  const carousel = useHorizontalScrollCarousel(options);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  const setSlideRef = useCallback((index: number, node: HTMLElement | null) => {
    slideRefs.current[index] = node;
  }, []);

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const track = carousel.trackRef.current;
      const clamped = Math.min(Math.max(index, 0), slideCount - 1);
      const slide = slideRefs.current[clamped];
      if (!track || !slide) return;

      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      const target = Math.min(Math.max(0, slide.offsetLeft), maxScroll);

      track.scrollTo({ left: target, behavior });
    },
    [carousel.trackRef, slideCount],
  );

  const syncActiveFromScroll = useCallback(() => {
    const track = carousel.trackRef.current;
    if (!track) return;

    const scrollPos = track.scrollLeft;
    let closest = 0;
    let minDistance = Number.POSITIVE_INFINITY;

    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;
      const distance = Math.abs(slide.offsetLeft - scrollPos);
      if (distance < minDistance) {
        minDistance = distance;
        closest = index;
      }
    });

    activeIndexRef.current = closest;
    setActiveIndex(closest);
    carousel.scrollBar.updateMetrics();
  }, [carousel.scrollBar, carousel.trackRef]);

  useEffect(() => {
    const track = carousel.trackRef.current;
    if (!track) return;

    let raf: number | null = null;
    const onScroll = () => {
      if (raf !== null) return;
      raf = window.requestAnimationFrame(() => {
        raf = null;
        syncActiveFromScroll();
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [carousel.trackRef, syncActiveFromScroll]);

  useEffect(() => {
    const track = carousel.trackRef.current;
    if (!track) return;

    const ro = new ResizeObserver(() => {
      scrollToIndex(activeIndexRef.current, "auto");
    });
    ro.observe(track);
    for (const child of track.children) {
      ro.observe(child);
    }
    return () => ro.disconnect();
  }, [carousel.trackRef, scrollToIndex]);

  const goPrev = useCallback(() => {
    scrollToIndex(activeIndexRef.current - 1);
  }, [scrollToIndex]);

  const goNext = useCallback(() => {
    scrollToIndex(activeIndexRef.current + 1);
  }, [scrollToIndex]);

  const canGoPrev = activeIndex > 0;
  const canGoNext = activeIndex < slideCount - 1;

  return {
    ...carousel,
    activeIndex,
    setSlideRef,
    goPrev,
    goNext,
    canGoPrev,
    canGoNext,
  };
}

export type SlideVisualRole = "active" | "prev" | "next" | "far";

export function getSnapSlideVisualRole(
  index: number,
  activeIndex: number,
): SlideVisualRole {
  const diff = index - activeIndex;
  if (diff === 0) return "active";
  if (diff === -1) return "prev";
  if (diff === 1) return "next";
  return "far";
}
