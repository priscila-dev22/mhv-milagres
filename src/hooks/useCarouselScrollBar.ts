import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
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

export function useCarouselScrollBar(
  trackRef: RefObject<HTMLDivElement | null>,
  thumbSelector: string,
) {
  const railRef = useRef<HTMLDivElement>(null);
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
  }, [trackRef]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateMetrics();
    track.addEventListener("scroll", updateMetrics, { passive: true });

    const resizeObserver = new ResizeObserver(updateMetrics);
    resizeObserver.observe(track);
    for (const child of track.children) {
      resizeObserver.observe(child);
    }

    return () => {
      track.removeEventListener("scroll", updateMetrics);
      resizeObserver.disconnect();
    };
  }, [trackRef, updateMetrics]);

  const scrollToThumbRatio = useCallback(
    (ratio: number) => {
      const track = trackRef.current;
      if (!track) return;

      const maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll <= 0) return;

      const clamped = Math.min(Math.max(ratio, 0), 1);
      track.scrollLeft = clamped * maxScroll;
    },
    [trackRef],
  );

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
    [trackRef],
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
    [metrics.thumbWidth, scrollToThumbRatio, trackRef],
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
      if ((event.target as HTMLElement).closest(thumbSelector)) return;

      const rail = railRef.current;
      if (!rail) return;

      const rect = rail.getBoundingClientRect();
      const clickRatio = (event.clientX - rect.left) / rect.width;
      const travel = 1 - metrics.thumbWidth;
      scrollToThumbRatio(
        travel > 0 ? (clickRatio - metrics.thumbWidth / 2) / travel : 0,
      );
    },
    [metrics.thumbWidth, scrollToThumbRatio, thumbSelector],
  );

  const scrollPercent = metrics.visible
    ? Math.round(
        (metrics.thumbLeft / Math.max(1 - metrics.thumbWidth, 0.001)) * 100,
      )
    : 0;

  return {
    railRef,
    metrics,
    scrollPercent,
    updateMetrics,
    railProps: {
      onPointerDown: onRailPointerDown,
    },
    thumbProps: {
      onPointerDown: onThumbPointerDown,
      onPointerMove: onThumbPointerMove,
      onPointerUp: endThumbDrag,
      onPointerCancel: endThumbDrag,
    },
  };
}
