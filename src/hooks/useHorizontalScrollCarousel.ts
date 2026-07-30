import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

type ScrollMetrics = {
  thumbLeft: number;
  thumbWidth: number;
  visible: boolean;
};

const defaultMetrics: ScrollMetrics = {
  thumbLeft: 0,
  thumbWidth: 1,
  visible: false,
};

export function useHorizontalScrollCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0, pointerId: -1 });
  const thumbDragState = useRef({
    active: false,
    startX: 0,
    startScrollLeft: 0,
    pointerId: -1,
  });
  const [metrics, setMetrics] = useState<ScrollMetrics>(defaultMetrics);

  const updateMetrics = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const { scrollWidth, clientWidth, scrollLeft } = track;
    const maxScroll = scrollWidth - clientWidth;

    if (maxScroll <= 1) {
      setMetrics(defaultMetrics);
      return;
    }

    const rawThumbWidth = clientWidth / scrollWidth;
    const thumbWidth = Math.min(Math.max(rawThumbWidth, 0.14), 1);
    const travel = 1 - thumbWidth;
    const thumbLeft = travel > 0 ? (scrollLeft / maxScroll) * travel : 0;

    setMetrics({ thumbLeft, thumbWidth, visible: true });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateMetrics();
    track.addEventListener("scroll", updateMetrics, { passive: true });

    const resizeObserver = new ResizeObserver(updateMetrics);
    resizeObserver.observe(track);

    return () => {
      track.removeEventListener("scroll", updateMetrics);
      resizeObserver.disconnect();
    };
  }, [updateMetrics]);

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
    const track = trackRef.current;
    if (!track) return;

    dragState.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: track.scrollLeft,
      pointerId: event.pointerId,
    };
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
    track.releasePointerCapture(event.pointerId);
  }, []);

  const scrollToThumbRatio = useCallback((ratio: number) => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 0) return;

    const clamped = Math.min(Math.max(ratio, 0), 1);
    track.scrollLeft = clamped * maxScroll;
  }, []);

  const onThumbPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.button !== 0) return;
      event.stopPropagation();
      const track = trackRef.current;
      if (!track) return;

      thumbDragState.current = {
        active: true,
        startX: event.clientX,
        startScrollLeft: track.scrollLeft,
        pointerId: event.pointerId,
      };
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [],
  );

  const onThumbPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const track = trackRef.current;
      const rail = railRef.current;
      const state = thumbDragState.current;
      if (
        !track ||
        !rail ||
        !state.active ||
        state.pointerId !== event.pointerId
      ) {
        return;
      }

      event.preventDefault();
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll <= 0) return;

      const railWidth = rail.clientWidth;
      const thumbWidthPx = metrics.thumbWidth * railWidth;
      const travelPx = Math.max(railWidth - thumbWidthPx, 1);
      const deltaRatio = (event.clientX - state.startX) / travelPx;
      const startRatio = state.startScrollLeft / maxScroll;
      scrollToThumbRatio(startRatio + deltaRatio);
    },
    [metrics.thumbWidth, scrollToThumbRatio],
  );

  const endThumbDrag = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const state = thumbDragState.current;
    if (!state.active || state.pointerId !== event.pointerId) return;

    state.active = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  }, []);

  const onRailPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.button !== 0) return;
      if ((event.target as HTMLElement).closest("[data-gastro-thumb]")) return;

      const rail = railRef.current;
      if (!rail) return;

      const rect = rail.getBoundingClientRect();
      const clickRatio = (event.clientX - rect.left) / rect.width;
      const travel = 1 - metrics.thumbWidth;
      scrollToThumbRatio(
        travel > 0 ? (clickRatio - metrics.thumbWidth / 2) / travel : 0,
      );
    },
    [metrics.thumbWidth, scrollToThumbRatio],
  );

  const scrollPercent = metrics.visible
    ? Math.round(
        (metrics.thumbLeft / Math.max(1 - metrics.thumbWidth, 0.001)) * 100,
      )
    : 0;

  return {
    trackRef,
    trackProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
    },
    scrollBar: {
      railRef,
      metrics,
      scrollPercent,
      railProps: {
        onPointerDown: onRailPointerDown,
      },
      thumbProps: {
        onPointerDown: onThumbPointerDown,
        onPointerMove: onThumbPointerMove,
        onPointerUp: endThumbDrag,
        onPointerCancel: endThumbDrag,
      },
    },
  };
}
