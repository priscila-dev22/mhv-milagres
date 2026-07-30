import {
  useCallback,
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { useCarouselScrollBar } from "./useCarouselScrollBar";

export function useHorizontalScrollCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({
    active: false,
    startX: 0,
    scrollLeft: 0,
    pointerId: -1,
  });

  const scrollBar = useCarouselScrollBar(trackRef, "[data-gastro-thumb]");

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

  const onPointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    if ((event.target as HTMLElement).closest("a")) return;

    const track = trackRef.current;
    if (!track) return;

    dragState.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: track.scrollLeft,
      pointerId: event.pointerId,
    };
    track.classList.add("gastro-carousel--dragging");
    track.setPointerCapture(event.pointerId);
  }, []);

  const onPointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    const state = dragState.current;
    if (!track || !state.active || state.pointerId !== event.pointerId) return;

    event.preventDefault();
    const delta = event.clientX - state.startX;
    track.scrollLeft = state.scrollLeft - delta;
  }, []);

  const endDrag = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    const state = dragState.current;
    if (!track || !state.active || state.pointerId !== event.pointerId) return;

    state.active = false;
    track.classList.remove("gastro-carousel--dragging");
    track.releasePointerCapture(event.pointerId);
    scrollBar.updateMetrics();
  }, [scrollBar]);

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
