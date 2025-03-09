"use client";

import { useRef, useEffect } from "react";

import { useWavesurfer } from "@wavesurfer/react";

type Props = {
  audioUrl: string;
  playbackState: "play" | "pause" | "default";
  setCurrentTime: (value: string) => void;
  setDuration: (value: string) => void;
  setIsPlaying: (value: boolean) => void;
};

const WaveSurferPlayer = ({
  audioUrl,
  playbackState,
  setCurrentTime,
  setDuration,
  setIsPlaying,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const props = { url: audioUrl };

  const { wavesurfer } = useWavesurfer({
    container: containerRef,
    cursorWidth: 0,
    barHeight: 2.5,
    height: 192,
    waveColor: "#FFE1DE",
    progressColor: "#FE6250",
    barWidth: 2,
    barGap: 6,
    barRadius: 16,
    ...props,
  });

  useEffect(() => {
    const x = async () => {
      try {
        if (!wavesurfer) return;
        await wavesurfer.playPause();
      } catch (e) {
        console.log(e);
      }
    };

    x();
  }, [playbackState, wavesurfer]);

  useEffect(() => {
    if (!wavesurfer) return;

    const subscriptions = [
      wavesurfer.on("play", () => setIsPlaying(true)),
      wavesurfer.on("pause", () => setIsPlaying(false)),
      wavesurfer.on("decode", (duration) => setDuration(formatTime(duration))),
      wavesurfer.on("timeupdate", (currentTime) =>
        setCurrentTime(formatTime(currentTime))
      ),
    ];

    const formatTime = (seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const secondsRemainder = Math.round(seconds) % 60;
      const paddedSeconds = `0${secondsRemainder}`.slice(-2);
      return `${minutes}:${paddedSeconds}`;
    };

    return () => {
      subscriptions.forEach((unsub) => unsub());
    };
  }, [wavesurfer, setCurrentTime, setIsPlaying, setDuration]);

  return <div ref={containerRef} className="h-full w-full" />;
};

export default WaveSurferPlayer;
