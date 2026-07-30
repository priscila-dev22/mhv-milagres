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
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0, pointerId: -1 });
  const scrollRaf = useRef<number | null>(null);
  const loopAdjusting = useRef(false);
  const focusedExtendedRef = useRef(1);

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

  const recenterFocused = useCallback(
    (behavior: ScrollBehavior = "auto") => {
      scrollToExtended(focusedExtendedRef.current, behavior);
    },
    [scrollToExtended],
  );

  const applyLoopJump = useCallback(
    (closestExtended: number) => {
      const gallery = galleryRef.current;
      if (!gallery || slideCount < 2) return closestExtended;

      if (closestExtended === 0) {
        loopAdjusting.current = true;
        scrollToExtended(slideCount, "auto");
        window.requestAnimationFrame(() => {
          loopAdjusting.current = false;
          focusedExtendedRef.current = slideCount;
          setFocusedExtendedIndex(slideCount);
          setActiveIndex(slideCount - 1);
        });
        return slideCount;
      }

      if (closestExtended === slideCount + 1) {
        loopAdjusting.current = true;
        scrollToExtended(1, "auto");
        window.requestAnimationFrame(() => {
          loopAdjusting.current = false;
          focusedExtendedRef.current = 1;
          setFocusedExtendedIndex(1);
          setActiveIndex(0);
        });
        return 1;
      }

      return closestExtended;
    },
    [scrollToExtended, slideCount],
  );

  const syncFromScroll = useCallback(
    (withLoopJump = false) => {
      if (loopAdjusting.current) return;

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

      let resolvedExtended = closest;
      if (
        withLoopJump &&
        (closest === 0 || closest === slideCount + 1)
      ) {
        resolvedExtended = applyLoopJump(closest);
      }

      setFocusedExtendedIndex(resolvedExtended);
      setActiveIndex(extendedToReal(resolvedExtended, slideCount));
      focusedExtendedRef.current = resolvedExtended;
    },
    [applyLoopJump, slideCount],
  );

  const scheduleSync = useCallback(() => {
    if (scrollRaf.current !== null) return;
    scrollRaf.current = window.requestAnimationFrame(() => {
      scrollRaf.current = null;
      syncFromScroll(false);
    });
  }, [syncFromScroll]);

  useLayoutEffect(() => {
    let cancelled = false;
    const centerInitial = (attempt = 0) => {
      if (cancelled) return;
      const head = slideRefs.current[0];
      const first = slideRefs.current[1];
      if (head && first && first.offsetWidth > 0) {
        scrollToExtended(1, "auto");
        focusedExtendedRef.current = 1;
        setFocusedExtendedIndex(1);
        setActiveIndex(0);
        return;
      }
      if (attempt < 24) {
        window.requestAnimationFrame(() => centerInitial(attempt + 1));
      }
    };
    centerInitial();
    return () => {
      cancelled = true;
    };
  }, [scrollToExtended]);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const onScrollEnd = () => syncFromScroll(true);
    const onResize = () => {
      recenterFocused("auto");
      syncFromScroll(false);
    };

    gallery.addEventListener("scroll", scheduleSync, { passive: true });
    gallery.addEventListener("scrollend", onScrollEnd);
    window.addEventListener("resize", onResize);

    const resizeObserver = new ResizeObserver(() => {
      recenterFocused("auto");
    });
    resizeObserver.observe(gallery);

    return () => {
      gallery.removeEventListener("scroll", scheduleSync);
      gallery.removeEventListener("scrollend", onScrollEnd);
      window.removeEventListener("resize", onResize);
      resizeObserver.disconnect();
      if (scrollRaf.current !== null) {
        window.cancelAnimationFrame(scrollRaf.current);
      }
    };
  }, [recenterFocused, scheduleSync, syncFromScroll]);

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

  const endDrag = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const gallery = galleryRef.current;
      const state = dragState.current;
      if (!gallery || !state.active || state.pointerId !== event.pointerId) return;

      state.active = false;
      gallery.releasePointerCapture(event.pointerId);
      syncFromScroll(true);
      window.setTimeout(() => syncFromScroll(true), 120);
    },
    [syncFromScroll],
  );

  return {
    galleryRef,
    setSlideRef,
    activeIndex,
    focusedExtendedIndex,
    scrollToRealIndex,
    goPrev,
    goNext,
    recenterFocused,
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
