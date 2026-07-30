import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

function extendedToReal(extendedIndex: number, slideCount: number) {
  if (extendedIndex === 0) return slideCount - 1;
  if (extendedIndex === slideCount + 1) return 0;
  return extendedIndex - 1;
}

export function useExperienceCarousel(slideCount: number) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [focusedExtendedIndex, setFocusedExtendedIndex] = useState(1);
  const focusedExtendedRef = useRef(1);
  const isDraggingRef = useRef(false);
  const dragState = useRef({ startX: 0, scrollLeft: 0, pointerId: -1 });
  const scrollRaf = useRef<number | null>(null);
  const loopAdjusting = useRef(false);
  const resizeTimeout = useRef<number | null>(null);

  const setSlideRef = useCallback((index: number, node: HTMLElement | null) => {
    slideRefs.current[index] = node;
  }, []);

  const scrollToExtended = useCallback(
    (extendedIndex: number, behavior: ScrollBehavior = "smooth") => {
      const gallery = galleryRef.current;
      const slide = slideRefs.current[extendedIndex];
      if (!gallery || !slide) return;

      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const target = slideCenter - gallery.clientWidth / 2;
      const maxScroll = Math.max(0, gallery.scrollWidth - gallery.clientWidth);

      gallery.scrollTo({
        left: Math.min(Math.max(0, target), maxScroll),
        behavior,
      });
    },
    [],
  );

  const applyLoopJump = useCallback(
    (closestExtended: number) => {
      if (slideCount < 2) return closestExtended;

      if (closestExtended === 0) {
        loopAdjusting.current = true;
        scrollToExtended(slideCount, "auto");
        focusedExtendedRef.current = slideCount;
        window.requestAnimationFrame(() => {
          loopAdjusting.current = false;
        });
        return slideCount;
      }

      if (closestExtended === slideCount + 1) {
        loopAdjusting.current = true;
        scrollToExtended(1, "auto");
        focusedExtendedRef.current = 1;
        window.requestAnimationFrame(() => {
          loopAdjusting.current = false;
        });
        return 1;
      }

      return closestExtended;
    },
    [scrollToExtended, slideCount],
  );

  const commitFocusedExtended = useCallback(
    (extendedIndex: number) => {
      focusedExtendedRef.current = extendedIndex;
      setFocusedExtendedIndex(extendedIndex);
      setActiveIndex(extendedToReal(extendedIndex, slideCount));
    },
    [slideCount],
  );

  const syncFromScroll = useCallback(
    (withLoopJump = false) => {
      if (loopAdjusting.current || isDraggingRef.current) return;

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

      const resolved = withLoopJump ? applyLoopJump(closest) : closest;
      commitFocusedExtended(resolved);
    },
    [applyLoopJump, commitFocusedExtended],
  );

  const scheduleSync = useCallback(() => {
    if (isDraggingRef.current || scrollRaf.current !== null) return;
    scrollRaf.current = window.requestAnimationFrame(() => {
      scrollRaf.current = null;
      syncFromScroll(false);
    });
  }, [syncFromScroll]);

  const finishInteraction = useCallback(() => {
    syncFromScroll(true);
  }, [syncFromScroll]);

  useLayoutEffect(() => {
    let cancelled = false;
    const centerInitial = (attempt = 0) => {
      if (cancelled) return;
      const head = slideRefs.current[0];
      const first = slideRefs.current[1];
      if (head && first && first.offsetWidth > 0) {
        scrollToExtended(1, "auto");
        commitFocusedExtended(1);
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
  }, [commitFocusedExtended, scrollToExtended]);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const onScrollEnd = () => finishInteraction();

    gallery.addEventListener("scroll", scheduleSync, { passive: true });
    gallery.addEventListener("scrollend", onScrollEnd);

    const onResize = () => {
      if (resizeTimeout.current !== null) {
        window.clearTimeout(resizeTimeout.current);
      }
      resizeTimeout.current = window.setTimeout(() => {
        scrollToExtended(focusedExtendedRef.current, "auto");
        syncFromScroll(false);
      }, 120);
    };
    window.addEventListener("resize", onResize);

    return () => {
      gallery.removeEventListener("scroll", scheduleSync);
      gallery.removeEventListener("scrollend", onScrollEnd);
      window.removeEventListener("resize", onResize);
      if (scrollRaf.current !== null) {
        window.cancelAnimationFrame(scrollRaf.current);
      }
      if (resizeTimeout.current !== null) {
        window.clearTimeout(resizeTimeout.current);
      }
    };
  }, [finishInteraction, scheduleSync, scrollToExtended, syncFromScroll]);

  const scrollToRealIndex = useCallback(
    (realIndex: number, behavior: ScrollBehavior = "smooth") => {
      scrollToExtended(realIndex + 1, behavior);
    },
    [scrollToExtended],
  );

  const goPrev = useCallback(() => {
    const nextReal = (activeIndex - 1 + slideCount) % slideCount;
    scrollToRealIndex(nextReal);
  }, [activeIndex, scrollToRealIndex, slideCount]);

  const goNext = useCallback(() => {
    const nextReal = (activeIndex + 1) % slideCount;
    scrollToRealIndex(nextReal);
  }, [activeIndex, scrollToRealIndex, slideCount]);

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

    isDraggingRef.current = true;
    gallery.classList.add("experience-gallery--dragging");
    dragState.current = {
      startX: event.clientX,
      scrollLeft: gallery.scrollLeft,
      pointerId: event.pointerId,
    };
    gallery.setPointerCapture(event.pointerId);
  }, []);

  const onPointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const gallery = galleryRef.current;
    const state = dragState.current;
    if (!gallery || state.pointerId !== event.pointerId) return;

    event.preventDefault();
    gallery.scrollLeft = state.scrollLeft - (event.clientX - state.startX);
  }, []);

  const endDrag = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const gallery = galleryRef.current;
      const state = dragState.current;
      if (!gallery || state.pointerId !== event.pointerId) return;

      dragState.current.pointerId = -1;
      isDraggingRef.current = false;
      gallery.classList.remove("experience-gallery--dragging");
      gallery.releasePointerCapture(event.pointerId);
      finishInteraction();
      window.setTimeout(finishInteraction, 100);
    },
    [finishInteraction],
  );

  return {
    galleryRef,
    setSlideRef,
    activeIndex,
    focusedExtendedIndex,
    scrollToRealIndex,
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

export { extendedToReal };

export type ExperienceSlideVisualRole = "active" | "prev" | "next" | "far";

export function getExperienceSlideVisualRole(
  extendedIndex: number,
  focusedExtendedIndex: number,
): ExperienceSlideVisualRole {
  const diff = extendedIndex - focusedExtendedIndex;
  if (diff === 0) return "active";
  if (diff === -1) return "prev";
  if (diff === 1) return "next";
  return "far";
}
