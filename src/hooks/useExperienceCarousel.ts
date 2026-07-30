import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

export function useExperienceCarousel(slideCount: number) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0, pointerId: -1 });
  const scrollRaf = useRef<number | null>(null);

  const setSlideRef = useCallback((index: number, node: HTMLElement | null) => {
    slideRefs.current[index] = node;
  }, []);

  const syncActiveIndex = useCallback(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const center = gallery.scrollLeft + gallery.clientWidth / 2;
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

    setActiveIndex(closest);
  }, []);

  const scheduleSync = useCallback(() => {
    if (scrollRaf.current !== null) return;
    scrollRaf.current = window.requestAnimationFrame(() => {
      scrollRaf.current = null;
      syncActiveIndex();
    });
  }, [syncActiveIndex]);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    syncActiveIndex();
    gallery.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("resize", syncActiveIndex);

    return () => {
      gallery.removeEventListener("scroll", scheduleSync);
      window.removeEventListener("resize", syncActiveIndex);
      if (scrollRaf.current !== null) {
        window.cancelAnimationFrame(scrollRaf.current);
      }
    };
  }, [scheduleSync, syncActiveIndex]);

  const scrollToIndex = useCallback((index: number) => {
    const gallery = galleryRef.current;
    const slide = slideRefs.current[index];
    if (!gallery || !slide) return;

    const target =
      slide.offsetLeft - (gallery.clientWidth - slide.offsetWidth) / 2;
    gallery.scrollTo({ left: target, behavior: "smooth" });
  }, []);

  const goPrev = useCallback(() => {
    scrollToIndex(Math.max(activeIndex - 1, 0));
  }, [activeIndex, scrollToIndex]);

  const goNext = useCallback(() => {
    scrollToIndex(Math.min(activeIndex + 1, slideCount - 1));
  }, [activeIndex, scrollToIndex, slideCount]);

  const onGalleryKeyDown = useCallback(
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

  const onPointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    const gallery = galleryRef.current;
    if (!gallery) return;

    dragState.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: gallery.scrollLeft,
      pointerId: event.pointerId,
    };
    gallery.setPointerCapture(event.pointerId);
  }, []);

  const onPointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const gallery = galleryRef.current;
    const state = dragState.current;
    if (!gallery || !state.active || state.pointerId !== event.pointerId) return;

    event.preventDefault();
    gallery.scrollLeft = state.scrollLeft - (event.clientX - state.startX);
  }, []);

  const endDrag = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const gallery = galleryRef.current;
    const state = dragState.current;
    if (!gallery || !state.active || state.pointerId !== event.pointerId) return;

    state.active = false;
    gallery.releasePointerCapture(event.pointerId);
    syncActiveIndex();
  }, [syncActiveIndex]);

  return {
    galleryRef,
    setSlideRef,
    activeIndex,
    scrollToIndex,
    goPrev,
    goNext,
    galleryProps: {
      onKeyDown: onGalleryKeyDown,
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
    },
  };
}
