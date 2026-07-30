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

function extendedToReal(extendedIndex: number, slideCount: number) {
  if (extendedIndex === 0) return slideCount - 1;
  if (extendedIndex === slideCount + 1) return 0;
  return extendedIndex - 1;
}

const SNAP_THRESHOLD_RATIO = 0.2;

function closestExtendedToCenter(
  gallery: HTMLDivElement,
  slideRefs: (HTMLElement | null)[],
  slideCount: number,
) {
  const center = gallery.scrollLeft + gallery.clientWidth / 2;
  let closest = 0;
  let minDistance = Number.POSITIVE_INFINITY;

  slideRefs.forEach((slide, index) => {
    if (!slide) return;
    const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
    const distance = Math.abs(center - slideCenter);
    if (distance < minDistance) {
      minDistance = distance;
      closest = index;
    }
  });

  return Math.min(Math.max(closest, 0), slideCount + 1);
}

export function useExperienceCarousel(
  slideCount: number,
  initialRealIndex = 0,
) {
  const initialExtended = initialRealIndex + 1;

  const galleryRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(initialRealIndex);
  const [focusedExtendedIndex, setFocusedExtendedIndex] =
    useState(initialExtended);
  const focusedExtendedRef = useRef(initialExtended);
  const isDraggingRef = useRef(false);
  const dragState = useRef({ startX: 0, scrollLeft: 0, pointerId: -1 });
  const gestureStartExtendedRef = useRef(initialExtended);
  const pendingSnapExtendedRef = useRef<number | null>(null);
  const programmaticNavRef = useRef(false);
  const loopAdjusting = useRef(false);
  const resizeTimeout = useRef<number | null>(null);
  const dragVisualRaf = useRef<number | null>(null);
  const wheelSnapTimeout = useRef<number | null>(null);

  const scrollBar = useCarouselScrollBar(galleryRef, "[data-exp-thumb]");

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

  const pickSnapAmongGestureCandidates = useCallback(() => {
    const gallery = galleryRef.current;
    if (!gallery) return gestureStartExtendedRef.current;

    const start = gestureStartExtendedRef.current;
    const center = gallery.scrollLeft + gallery.clientWidth / 2;
    const scrollMoved = Math.abs(
      gallery.scrollLeft - dragState.current.scrollLeft,
    );
    const threshold = gallery.clientWidth * SNAP_THRESHOLD_RATIO;

    const candidates = [start - 1, start, start + 1].filter(
      (i) => i >= 0 && i <= slideCount + 1,
    );

    let best = start;
    let minDistance = Number.POSITIVE_INFINITY;

    for (const index of candidates) {
      const slide = slideRefs.current[index];
      if (!slide) continue;
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(center - slideCenter);
      if (distance < minDistance) {
        minDistance = distance;
        best = index;
      }
    }

    if (best !== start && scrollMoved < threshold) {
      best = start;
    }

    const startSlide = slideRefs.current[start];
    const candidateSlide = slideRefs.current[best];
    if (
      best !== start &&
      startSlide &&
      candidateSlide &&
      scrollMoved >= threshold
    ) {
      const startCenter = startSlide.offsetLeft + startSlide.offsetWidth / 2;
      const candidateCenter =
        candidateSlide.offsetLeft + candidateSlide.offsetWidth / 2;
      const midpoint = (startCenter + candidateCenter) / 2;
      if (best > start && center < midpoint) best = start;
      if (best < start && center > midpoint) best = start;
    }

    if (best < start - 1) best = start - 1;
    if (best > start + 1) best = start + 1;

    return best;
  }, [slideCount]);

  const updateVisualDuringDrag = useCallback(() => {
    if (!isDraggingRef.current || loopAdjusting.current) return;

    const gallery = galleryRef.current;
    if (!gallery) return;

    const closest = closestExtendedToCenter(
      gallery,
      slideRefs.current,
      slideCount,
    );
    setFocusedExtendedIndex(closest);
  }, [slideCount]);

  const scheduleVisualDuringDrag = useCallback(() => {
    if (dragVisualRaf.current !== null) return;
    dragVisualRaf.current = window.requestAnimationFrame(() => {
      dragVisualRaf.current = null;
      updateVisualDuringDrag();
    });
  }, [updateVisualDuringDrag]);

  const snapToOneSlideFromCommitted = useCallback(
    (behavior: ScrollBehavior = "smooth") => {
      const gallery = galleryRef.current;
      if (!gallery) return;

      const start = focusedExtendedRef.current;
      const center = gallery.scrollLeft + gallery.clientWidth / 2;
      const candidates = [start - 1, start, start + 1].filter(
        (i) => i >= 0 && i <= slideCount + 1,
      );

      let best = start;
      let minDistance = Number.POSITIVE_INFINITY;

      for (const index of candidates) {
        const slide = slideRefs.current[index];
        if (!slide) continue;
        const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
        const distance = Math.abs(center - slideCenter);
        if (distance < minDistance) {
          minDistance = distance;
          best = index;
        }
      }

      pendingSnapExtendedRef.current = best;
      scrollToExtended(best, behavior);
    },
    [scrollToExtended, slideCount],
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

  const finalizeSnap = useCallback(
    (extendedTarget: number) => {
      const resolved = applyLoopJump(extendedTarget);
      commitFocusedExtended(resolved);
    },
    [applyLoopJump, commitFocusedExtended],
  );

  const beginGestureSnap = useCallback(() => {
    const best = pickSnapAmongGestureCandidates();
    const gallery = galleryRef.current;

    if (!gallery) {
      finalizeSnap(best);
      return;
    }

    if (best === focusedExtendedRef.current) {
      const center = gallery.scrollLeft + gallery.clientWidth / 2;
      const slide = slideRefs.current[best];
      if (slide) {
        const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
        if (Math.abs(center - slideCenter) < 2) {
          finalizeSnap(best);
          return;
        }
      }
    }

    pendingSnapExtendedRef.current = best;
    scrollToExtended(best, "smooth");
    window.setTimeout(() => {
      if (pendingSnapExtendedRef.current === best) {
        pendingSnapExtendedRef.current = null;
        finalizeSnap(best);
      }
    }, 480);
  }, [finalizeSnap, pickSnapAmongGestureCandidates, scrollToExtended]);

  const onScrollEnd = useCallback(() => {
    if (loopAdjusting.current) return;

    if (pendingSnapExtendedRef.current !== null) {
      const target = pendingSnapExtendedRef.current;
      pendingSnapExtendedRef.current = null;
      finalizeSnap(target);
      return;
    }

    if (programmaticNavRef.current) {
      programmaticNavRef.current = false;
      syncFromScroll(true);
    }
  }, [finalizeSnap, syncFromScroll]);

  useLayoutEffect(() => {
    let cancelled = false;
    const centerInitial = (attempt = 0) => {
      if (cancelled) return;
      const targetSlide = slideRefs.current[initialExtended];
      if (targetSlide && targetSlide.offsetWidth > 0) {
        scrollToExtended(initialExtended, "auto");
        commitFocusedExtended(initialExtended);
        gestureStartExtendedRef.current = initialExtended;
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
  }, [commitFocusedExtended, initialExtended, scrollToExtended]);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    gallery.addEventListener("scrollend", onScrollEnd);

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      event.preventDefault();
      gallery.scrollLeft += event.deltaY;
      scrollBar.updateMetrics();

      if (wheelSnapTimeout.current !== null) {
        window.clearTimeout(wheelSnapTimeout.current);
      }
      wheelSnapTimeout.current = window.setTimeout(() => {
        wheelSnapTimeout.current = null;
        if (isDraggingRef.current) return;
        snapToOneSlideFromCommitted("smooth");
      }, 140);
    };

    gallery.addEventListener("wheel", onWheel, { passive: false });

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
      gallery.removeEventListener("scrollend", onScrollEnd);
      gallery.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
      if (resizeTimeout.current !== null) {
        window.clearTimeout(resizeTimeout.current);
      }
      if (wheelSnapTimeout.current !== null) {
        window.clearTimeout(wheelSnapTimeout.current);
      }
    };
  }, [onScrollEnd, scrollBar, scrollToExtended, snapToOneSlideFromCommitted, syncFromScroll]);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const ro = new ResizeObserver(() => {
      if (isDraggingRef.current) return;
      scrollToExtended(focusedExtendedRef.current, "auto");
      scrollBar.updateMetrics();
    });
    ro.observe(gallery);
    for (const child of gallery.children) {
      ro.observe(child);
    }
    return () => ro.disconnect();
  }, [scrollBar, scrollToExtended]);

  const scrollToRealIndex = useCallback(
    (realIndex: number, behavior: ScrollBehavior = "smooth") => {
      programmaticNavRef.current = true;
      pendingSnapExtendedRef.current = null;
      scrollToExtended(realIndex + 1, behavior);
      window.setTimeout(() => {
        if (programmaticNavRef.current) {
          programmaticNavRef.current = false;
          syncFromScroll(true);
        }
      }, 480);
    },
    [scrollToExtended, syncFromScroll],
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

    pendingSnapExtendedRef.current = null;
    programmaticNavRef.current = false;
    gestureStartExtendedRef.current = focusedExtendedRef.current;
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
    const deltaX = event.clientX - state.startX;
    gallery.scrollLeft = state.scrollLeft - deltaX;
    scrollBar.updateMetrics();
    scheduleVisualDuringDrag();
  }, [scheduleVisualDuringDrag, scrollBar]);

  const endDrag = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const gallery = galleryRef.current;
      const state = dragState.current;
      if (!gallery || state.pointerId !== event.pointerId) return;

      dragState.current.pointerId = -1;
      isDraggingRef.current = false;
      if (dragVisualRaf.current !== null) {
        window.cancelAnimationFrame(dragVisualRaf.current);
        dragVisualRaf.current = null;
      }
      gallery.classList.remove("experience-gallery--dragging");
      gallery.releasePointerCapture(event.pointerId);
      beginGestureSnap();
      scrollBar.updateMetrics();
    },
    [beginGestureSnap, scrollBar],
  );

  const snapAfterScrollBar = useCallback(() => {
    window.setTimeout(() => {
      syncFromScroll(true);
      scrollToExtended(focusedExtendedRef.current, "smooth");
      scrollBar.updateMetrics();
    }, 120);
  }, [scrollBar, scrollToExtended, syncFromScroll]);

  const scrollBarThumbProps = {
    ...scrollBar.thumbProps,
    onPointerUp: (event: ReactPointerEvent<HTMLDivElement>) => {
      scrollBar.thumbProps.onPointerUp(event);
      snapAfterScrollBar();
    },
    onPointerCancel: (event: ReactPointerEvent<HTMLDivElement>) => {
      scrollBar.thumbProps.onPointerCancel(event);
      snapAfterScrollBar();
    },
  };

  const scrollBarRailProps = {
    ...scrollBar.railProps,
    onPointerDown: (event: ReactPointerEvent<HTMLDivElement>) => {
      scrollBar.railProps.onPointerDown(event);
      window.setTimeout(() => snapAfterScrollBar(), 200);
    },
  };

  return {
    galleryRef,
    setSlideRef,
    activeIndex,
    focusedExtendedIndex,
    scrollToRealIndex,
    goPrev,
    goNext,
    scrollBar: {
      ...scrollBar,
      thumbProps: scrollBarThumbProps,
      railProps: scrollBarRailProps,
    },
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
