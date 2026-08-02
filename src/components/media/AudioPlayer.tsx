import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { formatTime, type MediaItem } from "@/lib/media";

type AudioCtx = {
  current: MediaItem | null;
  playing: boolean;
  play: (item: MediaItem, playlist: MediaItem[]) => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  stop: () => void;
  progress: number;
  duration: number;
  seek: (seconds: number) => void;
};

const Ctx = createContext<AudioCtx | null>(null);

export function useAudioPlayer(): AudioCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAudioPlayer must be used within AudioPlayerProvider");
  return ctx;
}

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [queue, setQueue] = useState<MediaItem[]>([]);
  const [index, setIndex] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const current = index >= 0 ? (queue[index] ?? null) : null;

  const play = useCallback(
    (item: MediaItem, playlist: MediaItem[]) => {
      const list = playlist.length ? playlist : [item];
      const i = Math.max(
        0,
        list.findIndex((x) => x.id === item.id),
      );
      setQueue(list);
      setIndex(i);
      setPlaying(true);
    },
    [],
  );

  const toggle = useCallback(() => {
    const el = audioRef.current;
    if (!el || !current) return;
    if (el.paused) {
      void el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  }, [current]);

  const next = useCallback(() => {
    setIndex((i) => (queue.length ? (i + 1) % queue.length : -1));
    setPlaying(true);
  }, [queue.length]);

  const prev = useCallback(() => {
    setIndex((i) => (queue.length ? (i - 1 + queue.length) % queue.length : -1));
    setPlaying(true);
  }, [queue.length]);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    setPlaying(false);
    setIndex(-1);
  }, []);

  const seek = useCallback((seconds: number) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = seconds;
    setProgress(seconds);
  }, []);

  // Load & autoplay whenever the track changes
  useEffect(() => {
    const el = audioRef.current;
    if (!el || !current) return;
    el.src = current.url;
    el.load();
    setProgress(0);
    if (playing) void el.play().catch(() => setPlaying(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.id]);

  const value = useMemo<AudioCtx>(
    () => ({ current, playing, play, toggle, next, prev, stop, progress, duration, seek }),
    [current, playing, play, toggle, next, prev, stop, progress, duration, seek],
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        preload="metadata"
        onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={next}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="hidden"
      />
      <MiniPlayer />
    </Ctx.Provider>
  );
}

function MiniPlayer() {
  const { current, playing, toggle, next, prev, stop, progress, duration, seek } = useAudioPlayer();
  if (!current) return null;

  return (
    <div
      dir="rtl"
      className="fixed inset-x-0 bottom-0 z-[95] border-t border-primary/20 bg-surface-container-low/90 backdrop-blur-2xl pb-[max(env(safe-area-inset-bottom),0.5rem)] md:pb-2"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-3 pt-2 md:px-6">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="flex min-w-0 items-center gap-3">
            {current.thumbnail ? (
              <img
                src={current.thumbnail}
                alt=""
                className="h-10 w-10 shrink-0 rounded-lg object-cover"
              />
            ) : (
              <span className="material-symbols-outlined shrink-0 rounded-lg bg-primary/10 p-2 text-primary">
                graphic_eq
              </span>
            )}
            <span className="truncate text-sm text-on-surface">{current.title}</span>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button type="button" aria-label="السابق" onClick={prev} className="p-2 text-on-surface-variant hover:text-primary">
              <span className="material-symbols-outlined">skip_next</span>
            </button>
            <button
              type="button"
              aria-label={playing ? "إيقاف" : "تشغيل"}
              onClick={toggle}
              className="rounded-full bg-primary/15 p-2 text-primary"
            >
              <span className="material-symbols-outlined">{playing ? "pause" : "play_arrow"}</span>
            </button>
            <button type="button" aria-label="التالي" onClick={next} className="p-2 text-on-surface-variant hover:text-primary">
              <span className="material-symbols-outlined">skip_previous</span>
            </button>
            <button type="button" aria-label="إغلاق المشغل" onClick={stop} className="p-2 text-on-surface-variant hover:text-primary">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3 pb-1 text-[11px] text-on-surface-variant">
          <span className="w-10 shrink-0 text-center">{formatTime(progress)}</span>
          <input
            type="range"
            aria-label="شريط التقدم"
            min={0}
            max={duration || 0}
            step={0.1}
            value={Math.min(progress, duration || 0)}
            onChange={(e) => seek(Number(e.target.value))}
            className="h-1 min-w-0 flex-1 accent-primary"
          />
          <span className="w-10 shrink-0 text-center">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}