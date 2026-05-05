'use client';

import { useEffect, useEffectEvent, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import {
  Captions,
  Gauge,
  LoaderCircle,
  Maximize,
  Minimize,
  MoreVertical,
  Pause,
  Play,
  Settings2,
  Volume1,
  Volume2,
  VolumeX,
  type LucideIcon,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocaleDirection } from '@/app/hooks/useLocaleDirection';
import { LessonStatus } from './types';

type VideoQuality = '144p' | '240p' | '360p' | '480p' | '720p' | '1080p';
type SubtitleLanguage = 'ar' | 'en' | null;
type MenuView = 'root' | 'quality' | 'speed' | 'subtitles';

const MOCK_VIDEO_BASE_URL = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
const PLAYER_PRIMARY_COLOR = '#F97316';
const KEYBOARD_VOLUME_STEP = 0.1;
const KEYBOARD_SEEK_STEP = 5;
const SPACE_HOLD_DELAY_MS = 180;
const CENTER_OVERLAY_HIDE_DELAY_MS = 2000;

const QUALITY_OPTIONS: VideoQuality[] = ['144p', '240p', '360p', '480p', '720p', '1080p'];
const PLAYBACK_SPEED_OPTIONS = [0.25, 0.5, 1, 1.5, 2] as const;
const SUBTITLE_CUES = [
  { id: '1', start: 0, end: 1.8 },
  { id: '2', start: 1.8, end: 3.8 },
  { id: '3', start: 3.8, end: 5.6 },
] as const;

function buildMockVideoSources() {
  return QUALITY_OPTIONS.reduce<Record<VideoQuality, string>>((accumulator, quality) => {
    accumulator[quality] = `${MOCK_VIDEO_BASE_URL}?quality=${quality}`;
    return accumulator;
  }, {} as Record<VideoQuality, string>);
}

function clampValue(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getDefaultSubtitleLanguage(locale: string): Exclude<SubtitleLanguage, null> {
  return locale.startsWith('ar') ? 'ar' : 'en';
}

export default function VideoHero({
  image,
  title,
  status,
  instructorName,
  instructorAvatar,
}: {
  image: string;
  title: string;
  status: LessonStatus;
  instructorName: string;
  instructorAvatar: string;
}) {
  const { t, i18n } = useTranslation();
  const { dir, isRTL } = useLocaleDirection();
  const locale = i18n.resolvedLanguage ?? i18n.language ?? 'en';
  const defaultSubtitleLanguage = useMemo(() => getDefaultSubtitleLanguage(locale), [locale]);
  const playerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const overlayHideTimerRef = useRef<number | null>(null);
  const spaceHoldTimerRef = useRef<number | null>(null);
  const isSpacePressedRef = useRef(false);
  const isSpaceHoldActiveRef = useRef(false);
  const pendingSeekTimeRef = useRef<number | null>(null);
  const pendingPlayAfterReloadRef = useRef(false);
  const previousVolumeRef = useRef(0.7);
  const preferredSubtitleLanguageRef = useRef<Exclude<SubtitleLanguage, null>>(defaultSubtitleLanguage);
  const temporaryPlaybackStateRef = useRef<{
    previousRate: (typeof PLAYBACK_SPEED_OPTIONS)[number];
    wasPaused: boolean;
  } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuView, setMenuView] = useState<MenuView>('root');
  const [isHovered, setIsHovered] = useState(false);
  const [isFocusWithin, setIsFocusWithin] = useState(false);
  const [isCenterOverlayVisible, setIsCenterOverlayVisible] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bufferedPercent, setBufferedPercent] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [selectedQuality, setSelectedQuality] = useState<VideoQuality>('720p');
  const [playbackSpeed, setPlaybackSpeed] = useState<(typeof PLAYBACK_SPEED_OPTIONS)[number]>(1);
  const [subtitleLanguage, setSubtitleLanguage] = useState<SubtitleLanguage>(defaultSubtitleLanguage);
  const [capturedPoster, setCapturedPoster] = useState<string | null>(null);
  const [videoKey, setVideoKey] = useState(0);
  const mockVideoSources = useMemo(() => buildMockVideoSources(), []);
  const subtitleTracks = useMemo(
    () => ({
      ar: SUBTITLE_CUES.map((cue) => ({
        ...cue,
        text: t(`player.video.subtitleCues.${cue.id}.ar`),
      })),
      en: SUBTITLE_CUES.map((cue) => ({
        ...cue,
        text: t(`player.video.subtitleCues.${cue.id}.en`),
      })),
    }),
    [t],
  );
  const rootMenuItems = useMemo(
    () =>
      [
        { id: 'quality', icon: Settings2, label: t('player.video.menu.quality') },
        { id: 'speed', icon: Gauge, label: t('player.video.menu.speed') },
        { id: 'subtitles', icon: Captions, label: t('player.video.menu.subtitles') },
      ] satisfies { id: Exclude<MenuView, 'root'>; icon: LucideIcon; label: string }[],
    [t],
  );

  const isLocked = status === 'locked';
  const videoSource = mockVideoSources[selectedQuality];
  const isKeyboardScopeActive = !isLocked && (isHovered || isFocusWithin || isFullscreen);
  const progressPercent = duration > 0 ? clampValue((currentTime / duration) * 100, 0, 100) : 0;
  const effectiveVolume = isMuted ? 0 : volume;
  const volumePercent = clampValue(effectiveVolume * 100, 0, 100);
  const activeSubtitle =
    subtitleLanguage === null
      ? null
      : subtitleTracks[subtitleLanguage].find((cue) => currentTime >= cue.start && currentTime < cue.end) ?? null;
  const centerOverlayShouldRender = !isLocked && (!isPlaying || isCenterOverlayVisible);
  const VolumeIcon = isMuted || effectiveVolume === 0 ? VolumeX : effectiveVolume < 0.5 ? Volume1 : Volume2;

  const clearOverlayHideTimer = () => {
    if (overlayHideTimerRef.current !== null) {
      window.clearTimeout(overlayHideTimerRef.current);
      overlayHideTimerRef.current = null;
    }
  };

  const clearSpaceHoldTimer = () => {
    if (spaceHoldTimerRef.current !== null) {
      window.clearTimeout(spaceHoldTimerRef.current);
      spaceHoldTimerRef.current = null;
    }
  };

  const updateBufferedProgress = () => {
    const video = videoRef.current;

    if (!video || !video.duration || video.buffered.length === 0) {
      setBufferedPercent(0);
      return;
    }

    const bufferedEnd = video.buffered.end(video.buffered.length - 1);

    setBufferedPercent(clampValue((bufferedEnd / video.duration) * 100, 0, 100));
  };

  const formatTime = (value: number) => {
    if (!Number.isFinite(value) || value < 0) {
      return '00:00';
    }

    const totalSeconds = Math.floor(value);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };
  const formattedTime = `${formatTime(currentTime)} / ${formatTime(duration)}`;

  const showCenterOverlay = (autoHide: boolean) => {
    clearOverlayHideTimer();
    setIsCenterOverlayVisible(true);

    if (!autoHide) return;

    overlayHideTimerRef.current = window.setTimeout(() => {
      setIsCenterOverlayVisible(false);
      overlayHideTimerRef.current = null;
    }, CENTER_OVERLAY_HIDE_DELAY_MS);
  };

  const registerInteraction = () => {
    if (isLocked) return;

    showCenterOverlay(!videoRef.current?.paused);
  };

  const capturePosterFrame = () => {
    const video = videoRef.current;

    if (!video || video.videoWidth === 0 || video.videoHeight === 0) return;

    try {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext('2d');

      if (!context) return;

      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      setCapturedPoster(canvas.toDataURL('image/jpeg', 0.82));
    } catch {
      setCapturedPoster(null);
    }
  };

  const handleSeek = (nextTime: number) => {
    const video = videoRef.current;

    if (!video || duration <= 0) return;

    const normalizedTime = clampValue(nextTime, 0, duration);
    video.currentTime = normalizedTime;
    setCurrentTime(normalizedTime);
    updateBufferedProgress();
  };

  const seekBy = (seconds: number) => {
    const video = videoRef.current;
    const baseTime = video?.currentTime ?? currentTime;

    handleSeek(baseTime + seconds);
  };

  const handleVolumeChange = (nextVolume: number) => {
    const video = videoRef.current;
    const normalizedVolume = clampValue(nextVolume, 0, 1);

    if (normalizedVolume > 0) {
      previousVolumeRef.current = normalizedVolume;
    }

    setVolume(normalizedVolume);
    setIsMuted(normalizedVolume === 0);

    if (!video) return;

    video.volume = normalizedVolume;
    video.muted = normalizedVolume === 0;
  };

  const adjustVolume = (delta: number) => {
    handleVolumeChange(effectiveVolume + delta);
  };

  const handleMuteToggle = () => {
    const video = videoRef.current;

    if (isMuted || effectiveVolume === 0) {
      const restoredVolume = previousVolumeRef.current || 0.7;

      setVolume(restoredVolume);
      setIsMuted(false);

      if (video) {
        video.volume = restoredVolume;
        video.muted = false;
      }

      return;
    }

    previousVolumeRef.current = effectiveVolume;
    setVolume(0);
    setIsMuted(true);

    if (!video) return;

    video.volume = 0;
    video.muted = true;
  };

  const togglePlayback = async () => {
    const video = videoRef.current;

    if (!video || isLocked) return;

    if (video.paused) {
      setIsBuffering(true);

      try {
        await video.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
        setIsBuffering(false);
      }

      return;
    }

    video.pause();
    setIsPlaying(false);
    setIsBuffering(false);
  };

  const handleQualityChange = (quality: VideoQuality) => {
    if (quality === selectedQuality) {
      setIsMenuOpen(false);
      setMenuView('root');
      return;
    }

    const video = videoRef.current;

    pendingSeekTimeRef.current = video?.currentTime ?? currentTime;
    pendingPlayAfterReloadRef.current = Boolean(video && !video.paused);
    setCapturedPoster(null);
    setSelectedQuality(quality);
    setIsMenuOpen(false);
    setMenuView('root');
    setIsBuffering(true);
    setVideoKey((currentKey) => currentKey + 1);
  };

  const handleSpeedChange = (speed: (typeof PLAYBACK_SPEED_OPTIONS)[number]) => {
    const video = videoRef.current;

    setPlaybackSpeed(speed);

    if (video) {
      video.playbackRate = speed;
    }

    setIsMenuOpen(false);
    setMenuView('root');
  };

  const adjustPlaybackSpeed = (step: number) => {
    const currentIndex = PLAYBACK_SPEED_OPTIONS.indexOf(playbackSpeed);
    const nextIndex = clampValue(currentIndex + step, 0, PLAYBACK_SPEED_OPTIONS.length - 1);
    const nextSpeed = PLAYBACK_SPEED_OPTIONS[nextIndex];
    const video = videoRef.current;

    setPlaybackSpeed(nextSpeed);

    if (video) {
      video.playbackRate = nextSpeed;
    }
  };

  const handleSubtitleChange = (language: SubtitleLanguage) => {
    if (language !== null) {
      preferredSubtitleLanguageRef.current = language;
    }

    setSubtitleLanguage(language);
    setIsMenuOpen(false);
    setMenuView('root');
  };

  const toggleSubtitles = () => {
    setSubtitleLanguage((currentLanguage) => {
      if (currentLanguage === null) {
        return preferredSubtitleLanguageRef.current;
      }

      preferredSubtitleLanguageRef.current = currentLanguage;
      return null;
    });
  };

  const toggleFullscreen = async () => {
    const player = playerRef.current as (HTMLDivElement & { webkitRequestFullscreen?: () => Promise<void> }) | null;
    const fullscreenDocument = document as Document & { webkitExitFullscreen?: () => Promise<void> };

    if (!player) return;

    if (document.fullscreenElement) {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else {
        await fullscreenDocument.webkitExitFullscreen?.();
      }

      return;
    }

    if (player.requestFullscreen) {
      await player.requestFullscreen();
    } else {
      await player.webkitRequestFullscreen?.();
    }
  };

  const activateTemporarySpacePlayback = async () => {
    const video = videoRef.current;

    if (!video || isLocked) return;

    isSpaceHoldActiveRef.current = true;
    temporaryPlaybackStateRef.current = {
      previousRate: playbackSpeed,
      wasPaused: video.paused,
    };

    if (video.paused) {
      try {
        await video.play();
      } catch {
        isSpaceHoldActiveRef.current = false;
        temporaryPlaybackStateRef.current = null;
        return;
      }
    }

    setPlaybackSpeed(2);
    video.playbackRate = 2;
    showCenterOverlay(true);
  };

  const restoreTemporarySpacePlayback = () => {
    const video = videoRef.current;
    const temporaryState = temporaryPlaybackStateRef.current;

    if (!video || !temporaryState) return;

    isSpaceHoldActiveRef.current = false;
    temporaryPlaybackStateRef.current = null;
    setPlaybackSpeed(temporaryState.previousRate);
    video.playbackRate = temporaryState.previousRate;

    if (temporaryState.wasPaused) {
      video.pause();
    } else {
      showCenterOverlay(true);
    }
  };

  const openMenuRoot = () => {
    setMenuView('root');
    setIsMenuOpen(true);
  };

  const handleMenuButtonClick = () => {
    registerInteraction();

    if (!isMenuOpen) {
      openMenuRoot();
      return;
    }

    if (menuView !== 'root') {
      setMenuView('root');
      return;
    }

    setIsMenuOpen(false);
  };

  const handleKeyboardKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (!isKeyboardScopeActive) return;

    const target = event.target as HTMLElement | null;

    if (target instanceof HTMLTextAreaElement) return;
    if (target instanceof HTMLInputElement && target.type !== 'range') return;
    if (target instanceof HTMLElement && target.isContentEditable) return;

    const key = event.key.toLowerCase();

    if (event.code === 'Space') {
      if (event.repeat || isSpacePressedRef.current) {
        event.preventDefault();
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      isSpacePressedRef.current = true;
      clearSpaceHoldTimer();
      spaceHoldTimerRef.current = window.setTimeout(() => {
        void activateTemporarySpacePlayback();
        spaceHoldTimerRef.current = null;
      }, SPACE_HOLD_DELAY_MS);
      return;
    }

    let handled = true;

    if (key === 'k') {
      void togglePlayback();
    } else if (key === 'f') {
      void toggleFullscreen();
    } else if (event.key === 'Escape') {
      if (document.fullscreenElement) {
        void toggleFullscreen();
      } else {
        handled = false;
      }
    } else if (key === 'm') {
      handleMuteToggle();
    } else if (event.key === 'ArrowRight') {
      seekBy(KEYBOARD_SEEK_STEP);
    } else if (event.key === 'ArrowLeft') {
      seekBy(-KEYBOARD_SEEK_STEP);
    } else if (event.key === 'ArrowUp') {
      adjustVolume(KEYBOARD_VOLUME_STEP);
    } else if (event.key === 'ArrowDown') {
      adjustVolume(-KEYBOARD_VOLUME_STEP);
    } else if (key === 'c') {
      toggleSubtitles();
    } else if ((event.shiftKey && event.key === '>') || (event.shiftKey && event.key === '.')) {
      adjustPlaybackSpeed(1);
    } else if ((event.shiftKey && event.key === '<') || (event.shiftKey && event.key === ',')) {
      adjustPlaybackSpeed(-1);
    } else {
      handled = false;
    }

    if (!handled) return;

    registerInteraction();
    event.preventDefault();
    event.stopPropagation();
  });

  const handleKeyboardKeyUp = useEffectEvent((event: KeyboardEvent) => {
    if (event.code !== 'Space') return;
    if (!isSpacePressedRef.current) return;

    event.preventDefault();
    event.stopPropagation();
    isSpacePressedRef.current = false;

    if (spaceHoldTimerRef.current !== null) {
      clearSpaceHoldTimer();
      void togglePlayback();
      registerInteraction();
      return;
    }

    if (isSpaceHoldActiveRef.current) {
      restoreTemporarySpacePlayback();
      registerInteraction();
    }
  });

  const renderMenuPanel = () => {
    if (menuView === 'root') {
      return rootMenuItems.map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setMenuView(item.id);
            }}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-start text-[12px] font-medium text-white/90 transition-colors hover:bg-[rgba(255,255,255,0.1)]"
          >
            <Icon className="h-4 w-4 shrink-0 text-white/90" />
            <span>{item.label}</span>
          </button>
        );
      });
    }

    if (menuView === 'quality') {
      return QUALITY_OPTIONS.map((quality) => (
        <button
          key={quality}
          type="button"
          onClick={() => {
            handleQualityChange(quality);
          }}
          className={`flex w-full items-center rounded-xl px-3 py-2.5 text-start text-[12px] font-medium transition-colors hover:bg-[rgba(255,255,255,0.1)] ${
            selectedQuality === quality ? 'text-[#F97316]' : 'text-white/90'
          }`}
        >
          <span>{quality}</span>
        </button>
      ));
    }

    if (menuView === 'speed') {
      return PLAYBACK_SPEED_OPTIONS.map((speed) => {
        const label = `${speed}x`;

        return (
          <button
            key={speed}
            type="button"
            onClick={() => {
              handleSpeedChange(speed);
            }}
            className={`flex w-full items-center rounded-xl px-3 py-2.5 text-start text-[12px] font-medium transition-colors hover:bg-[rgba(255,255,255,0.1)] ${
              playbackSpeed === speed ? 'text-[#F97316]' : 'text-white/90'
            }`}
          >
            <span>{label}</span>
          </button>
        );
      });
    }

    return (
      <>
        <button
          type="button"
          onClick={() => {
            handleSubtitleChange('ar');
          }}
          className={`flex w-full items-center rounded-xl px-3 py-2.5 text-start text-[12px] font-medium transition-colors hover:bg-[rgba(255,255,255,0.1)] ${
            subtitleLanguage === 'ar' ? 'text-[#F97316]' : 'text-white/90'
          }`}
        >
          <span>{t('player.video.subtitles.arabic')}</span>
        </button>
        <button
          type="button"
          onClick={() => {
            handleSubtitleChange('en');
          }}
          className={`flex w-full items-center rounded-xl px-3 py-2.5 text-start text-[12px] font-medium transition-colors hover:bg-[rgba(255,255,255,0.1)] ${
            subtitleLanguage === 'en' ? 'text-[#F97316]' : 'text-white/90'
          }`}
        >
          <span>{t('player.video.subtitles.english')}</span>
        </button>
        <button
          type="button"
          onClick={() => {
            handleSubtitleChange(null);
          }}
          className={`flex w-full items-center rounded-xl px-3 py-2.5 text-start text-[12px] font-medium transition-colors hover:bg-[rgba(255,255,255,0.1)] ${
            subtitleLanguage === null ? 'text-[#F97316]' : 'text-white/90'
          }`}
        >
          <span>{t('player.video.subtitles.off')}</span>
        </button>
      </>
    );
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    preferredSubtitleLanguageRef.current = defaultSubtitleLanguage;
  }, [defaultSubtitleLanguage]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setMenuView('root');
      }
    };

    document.addEventListener('mousedown', handlePointerDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.volume = volume;
    video.muted = isMuted;
    video.playbackRate = playbackSpeed;
  }, [volume, isMuted, playbackSpeed, videoKey]);

  useEffect(() => {
    return () => {
      clearOverlayHideTimer();
      clearSpaceHoldTimer();
    };
  }, []);

  useEffect(() => {
    if (!isKeyboardScopeActive) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      handleKeyboardKeyDown(event);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      handleKeyboardKeyUp(event);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isKeyboardScopeActive]);

  return (
    <div
      ref={playerRef}
      dir={dir}
      tabIndex={isLocked ? -1 : 0}
      onMouseEnter={() => {
        setIsHovered(true);
        registerInteraction();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      onMouseMove={() => {
        registerInteraction();
      }}
      onFocusCapture={() => {
        setIsFocusWithin(true);
        registerInteraction();
      }}
      onBlurCapture={(event) => {
        if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
        setIsFocusWithin(false);
      }}
      className={`h-49.5 w-full overflow-hidden rounded-lg bg-black shadow-[0_10px_24px_rgba(17,53,85,0.06)] outline-none focus-visible:outline-none sm:h-57 md:h-65 lg:h-67.5 xl:h-59 ${
        isFullscreen ? 'bg-black' : ''
      }`}
    >
      <div className={`relative h-full w-full ${isFullscreen ? 'flex items-center justify-center bg-black' : ''}`}>
        <div className={`relative h-full w-full bg-black ${isFullscreen ? 'aspect-video max-h-full max-w-full' : ''}`}>
          {!isLocked ? (
            <video
              key={`${videoSource}-${videoKey}`}
              ref={videoRef}
              src={videoSource}
              poster={capturedPoster ?? undefined}
              preload="auto"
              playsInline
              crossOrigin="anonymous"
              className="h-full w-full object-contain"
              onLoadedMetadata={(event) => {
                const video = event.currentTarget;
                const resumeAt = pendingSeekTimeRef.current;

                setDuration(video.duration || 0);
                video.playbackRate = playbackSpeed;
                video.volume = volume;
                video.muted = isMuted;

                if (resumeAt !== null) {
                  video.currentTime = clampValue(resumeAt, 0, video.duration || resumeAt);
                  setCurrentTime(video.currentTime);
                  pendingSeekTimeRef.current = null;
                }

                updateBufferedProgress();
              }}
              onLoadedData={() => {
                capturePosterFrame();
                updateBufferedProgress();
              }}
              onLoadStart={() => {
                setIsBuffering(true);
              }}
              onCanPlay={async () => {
                setIsBuffering(false);
                updateBufferedProgress();

                if (!pendingPlayAfterReloadRef.current) return;

                pendingPlayAfterReloadRef.current = false;

                try {
                  await videoRef.current?.play();
                  setIsPlaying(true);
                } catch {
                  setIsPlaying(false);
                }
              }}
              onProgress={() => {
                updateBufferedProgress();
              }}
              onPlay={() => {
                setIsPlaying(true);
                setIsBuffering(false);
                showCenterOverlay(true);
              }}
              onPause={() => {
                setIsPlaying(false);
                showCenterOverlay(false);
              }}
              onTimeUpdate={(event) => {
                setCurrentTime(event.currentTarget.currentTime);
                updateBufferedProgress();
              }}
              onDurationChange={(event) => {
                setDuration(event.currentTarget.duration || 0);
                updateBufferedProgress();
              }}
              onVolumeChange={(event) => {
                const video = event.currentTarget;
                const nextVolume = video.muted ? 0 : video.volume;

                setIsMuted(video.muted);
                setVolume(nextVolume);

                if (!video.muted && video.volume > 0) {
                  previousVolumeRef.current = video.volume;
                }
              }}
              onWaiting={() => {
                setIsBuffering(true);
              }}
              onStalled={() => {
                setIsBuffering(true);
              }}
              onPlaying={() => {
                setIsBuffering(false);
                updateBufferedProgress();
              }}
              onEnded={() => {
                setIsPlaying(false);
                setIsBuffering(false);
                showCenterOverlay(false);
              }}
            />
          ) : (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 702px"
            />
          )}

          <div className="pointer-events-none absolute inset-0 bg-[rgba(0,0,0,0.32)]" />

          <div
            className={`absolute inset-x-0 top-0 z-10 flex p-4 sm:px-5 sm:py-4 ${
              isRTL ? 'justify-start' : 'justify-start'
            }`}
          >
            <div
              className={`flex items-center gap-2.5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)] ${
                isRTL ? 'flex-row text-right' : 'text-left'
              }`}
            >
              <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-white/20">
                <Image
                  src={instructorAvatar}
                  alt={t('player.video.instructorAvatarAlt', { name: instructorName })}
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate text-[12px] font-semibold text-white">{title}</p>
                <p className="truncate text-[11px] font-medium text-white/85">{instructorName}</p>
              </div>
            </div>
          </div>

          {activeSubtitle && !isLocked && (
            <div className="pointer-events-none absolute inset-x-0 bottom-18 z-10 flex justify-center px-6 sm:bottom-20">
              <div className="max-w-[85%] rounded-md bg-[rgba(0,0,0,0.6)] px-3 py-2 text-center text-[12px] font-medium leading-5 text-white">
                {activeSubtitle.text}
              </div>
            </div>
          )}

          {!isLocked && isBuffering && (
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(0,0,0,0.18)]">
                <LoaderCircle className="h-5 w-5 animate-spin text-[#F97316]" aria-label={t('player.video.loading')} />
              </div>
            </div>
          )}

          {centerOverlayShouldRender && (
            <button
              type="button"
              onClick={() => {
                registerInteraction();
                void togglePlayback();
              }}
              className={`absolute left-1/2 top-1/2 z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#F97316] text-white shadow-[0_0_0_8px_rgba(249,115,22,0.10),0_10px_24px_rgba(0,0,0,0.18)] transition-all duration-300 hover:opacity-95 ${
                centerOverlayShouldRender ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
              aria-label={isPlaying ? t('player.video.aria.pause') : t('player.video.aria.play')}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 fill-current" />
              ) : (
                <Play className={`h-5 w-5 fill-current ${isRTL ? 'mr-0.5' : 'ml-0.5'}`} />
              )}
            </button>
          )}

          {!isLocked && (
            <div className="absolute inset-x-0 bottom-0 z-20 bg-[rgba(0,0,0,0.6)] px-4 py-3 sm:px-5">
              <div className={`flex items-center gap-3.5 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <button
                  type="button"
                  onClick={() => {
                    registerInteraction();
                    void togglePlayback();
                  }}
                  className="inline-flex h-5 w-5 shrink-0 items-center justify-center text-white transition-opacity hover:opacity-80"
                  aria-label={isPlaying ? t('player.video.aria.pause') : t('player.video.aria.play')}
                >
                  {isPlaying ? (
                    <Pause className="h-4.5 w-4.5 fill-current" />
                  ) : (
                    <Play className={`h-4.5 w-4.5 fill-current ${isRTL ? 'mr-0.5' : 'ml-0.5'}`} />
                  )}
                </button>

                <div className="min-w-0 flex-1" dir="ltr">
                  <input
                    type="range"
                    min={0}
                    max={duration || 0}
                    step={0.1}
                    value={duration > 0 ? currentTime : 0}
                    onChange={(event) => {
                      registerInteraction();
                      handleSeek(Number(event.currentTarget.value));
                    }}
                    aria-label={t('player.video.aria.seek')}
                    className="video-control-range h-1.5 w-full"
                    style={{
                      background: `linear-gradient(to right, ${PLAYER_PRIMARY_COLOR} 0%, ${PLAYER_PRIMARY_COLOR} ${progressPercent}%, rgba(255,255,255,0.45) ${progressPercent}%, rgba(255,255,255,0.45) ${Math.max(progressPercent, bufferedPercent)}%, rgba(255,255,255,0.3) ${Math.max(progressPercent, bufferedPercent)}%, rgba(255,255,255,0.3) 100%)`,
                    }}
                  />
                </div>

                <span
                  dir="ltr"
                  className="shrink-0 whitespace-nowrap text-[11px] font-medium text-white/85"
                >
                  {formattedTime}
                </span>

                <div className={`flex items-center gap-2.5 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                  <button
                    type="button"
                    onClick={() => {
                      registerInteraction();
                      handleMuteToggle();
                    }}
                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center text-white transition-opacity hover:opacity-80"
                    aria-label={isMuted ? t('player.video.aria.unmute') : t('player.video.aria.mute')}
                  >
                    <VolumeIcon className="h-4.5 w-4.5" />
                  </button>

                  <div className="w-18.5 sm:w-21.5" dir="ltr">
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={effectiveVolume}
                      onChange={(event) => {
                        registerInteraction();
                        handleVolumeChange(Number(event.currentTarget.value));
                      }}
                      aria-label={t('player.video.aria.volume')}
                      className="video-control-range h-1.5 w-full"
                      style={{
                        background: `linear-gradient(to right, ${PLAYER_PRIMARY_COLOR} 0%, ${PLAYER_PRIMARY_COLOR} ${volumePercent}%, rgba(255,255,255,0.3) ${volumePercent}%, rgba(255,255,255,0.3) 100%)`,
                      }}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    registerInteraction();
                    toggleSubtitles();
                  }}
                  className={`inline-flex h-5 w-5 shrink-0 items-center justify-center transition-opacity hover:opacity-80 ${
                    subtitleLanguage === null ? 'text-white/80' : 'text-[#F97316]'
                  }`}
                  aria-label={t('player.video.menu.subtitles')}
                >
                  <Captions className="h-4.5 w-4.5" />
                </button>

                

                <button
                  type="button"
                  onClick={() => {
                    registerInteraction();
                    void toggleFullscreen();
                  }}
                  className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white transition-colors hover:bg-[rgba(255,255,255,0.1)]"
                  aria-label={isFullscreen ? t('player.video.aria.exitFullscreen') : t('player.video.aria.fullscreen')}
                >
                  {isFullscreen ? <Minimize className="h-4.5 w-4.5" /> : <Maximize className="h-4.5 w-4.5" />}
                </button>
                <div ref={menuRef} className="relative shrink-0" dir={dir}>
                  <button
                    type="button"
                    onClick={handleMenuButtonClick}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full text-white transition-colors hover:bg-[rgba(255,255,255,0.1)]"
                    aria-label={t('player.video.aria.moreOptions')}
                  >
                    <MoreVertical className="h-4.5 w-4.5" />
                  </button>

          {isMenuOpen && (
            <div
              className={`
                absolute z-30 overflow-hidden
                bg-[rgba(45,45,45,0.65)]
                backdrop-blur-[9.16px]
                text-white
                shadow-[0_16px_35px_rgba(0,0,0,0.35)]
                flex flex-col  items-center
                transition-all duration-200
              `}
              style={{
                insetInlineStart: '-5px',
                bottom: isFullscreen ? '70px' : '5px',

                width: isFullscreen ? '284px' : '135px',
                height: isFullscreen ? '396px' : '204px',
              }}
            >
              <div className="flex flex-col justify-around items-center h-full">
                {renderMenuPanel()}
              </div>
            </div>
          )}                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
