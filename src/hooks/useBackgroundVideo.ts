import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type SyntheticEvent,
} from "react";

const MOBILE_VIDEO_MQ = "(max-width: 768px)";

export function useMobileVideoViewport() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(MOBILE_VIDEO_MQ).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_VIDEO_MQ);
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return isMobile;
}

export function useBackgroundVideoSrc(desktopSrc: string, mobileSrc: string) {
  const isMobile = useMobileVideoViewport();
  return isMobile ? mobileSrc : desktopSrc;
}

export function useBackgroundVideoPlayback(videoSrc: string) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const ensurePlayback = useCallback(async (video: HTMLVideoElement) => {
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "true");

    try {
      await video.play();
    } catch {
      /* autoplay policy / low power mode */
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const applySrc = () => {
      if (video.getAttribute("data-video-src") !== videoSrc) {
        video.setAttribute("data-video-src", videoSrc);
        video.src = videoSrc;
        video.load();
      }
      void ensurePlayback(video);
    };

    applySrc();

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        void ensurePlayback(video);
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [videoSrc, ensurePlayback]);

  const onVideoReady = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      void ensurePlayback(event.currentTarget);
    },
    [ensurePlayback],
  );

  return { videoRef, onVideoReady, ensurePlayback };
}
