"use client";

import { capitalize, cn } from "@/lib/utils";
import { motion } from "motion/react";

// const ReactMediaRecorder = dynamic(
//   () => import("react-media-recorder").then((mod) => mod.ReactMediaRecorder),
//   { ssr: false }
// );

import Wave from "react-wavify";

import { useReactMediaRecorder } from "react-media-recorder";

import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import WaveSurferPlayer from "./wave-player";
import Image from "next/image";

const LinkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color="currentColor"
    fill={"none"}
    {...props}
  >
    <path
      d="M9.5 14.5L14.5 9.49995"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M16.8463 14.6095L19.4558 12C21.5147 9.94108 21.5147 6.60298 19.4558 4.54411C17.397 2.48524 14.0589 2.48524 12 4.54411L9.39045 7.15366M14.6095 16.8463L12 19.4558C9.94113 21.5147 6.60303 21.5147 4.54416 19.4558C2.48528 17.3969 2.48528 14.0588 4.54416 12L7.1537 9.39041"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const PauseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    color="currentColor"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2 6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2C7.88562 2 8.82843 2 9.41421 2.58579C10 3.17157 10 4.11438 10 6V18C10 19.8856 10 20.8284 9.41421 21.4142C8.82843 22 7.88562 22 6 22C4.11438 22 3.17157 22 2.58579 21.4142C2 20.8284 2 19.8856 2 18V6Z"
      fill="currentColor"
    />
    <path
      d="M14 6C14 4.11438 14 3.17157 14.5858 2.58579C15.1716 2 16.1144 2 18 2C19.8856 2 20.8284 2 21.4142 2.58579C22 3.17157 22 4.11438 22 6V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22C16.1144 22 15.1716 22 14.5858 21.4142C14 20.8284 14 19.8856 14 18V6Z"
      fill="currentColor"
    />
  </svg>
);

const PlayIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z"
      fill="currentColor"
    />
  </svg>
);

const RecordIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    color="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="12" cy="12" r="10" fill="currentColor" />
  </svg>
);

const StopIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
      fill="currentColor"
    />
  </svg>
);

const AudioRecorder: React.FC = () => {
  const [second, setSecond] = useState<string | number>("00");
  const [minute, setMinute] = useState<string | number>("00");
  const [counter, setCounter] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [duration, setDuration] = useState("00:00");
  const [playbackState, setPlaybackState] = useState<"play" | "pause">("pause");

  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    clearBlobUrl,
    error,
  } = useReactMediaRecorder({
    video: false,
    audio: true,
    askPermissionOnMount: true,
  });

  useEffect(() => {
    let intervalId: NodeJS.Timer;

    if (status === "recording") {
      intervalId = setInterval(() => {
        const seconds = counter % 60;
        const minutes = Math.floor(counter / 60);

        const computedSecond =
          String(seconds).length === 1 ? `0${seconds}` : seconds;

        const computedMinute =
          String(minutes).length === 1 ? `0${minutes}` : minutes;

        setSecond(computedSecond);
        setMinute(computedMinute);

        setCounter((counter) => counter + 1);
      }, 1000);
    } else {
      setSecond("00");
      setMinute("00");
    }

    return () => clearInterval(`${intervalId}`);
  }, [status, counter]);

  const stopTimer = useCallback(() => {
    setCounter(0);
  }, []);

  const onButtonClick = () => {
    if (status === "idle") {
      startRecording();
    } else if (status === "recording") {
      stopRecording();
    } else if (status === "stopped") {
      if (playbackState === "pause") setPlaybackState("play");
      else setPlaybackState("pause");
    }
  };

  return (
    <div className="h-full w-full flex flex-col pt-4">
      <div className="grow">
        <div className="bg-secondary/40 backdrop-blur-2xl flex flex-col h-full rounded-2xl p-1">
          {!error && (
            <div className="flex items-center justify-center gap-2 py-2">
              <div
                className={cn(
                  "h-2 w-2 rounded-full",
                  status === "recording"
                    ? "bg-red-400"
                    : status === "stopped"
                    ? "bg-green-500"
                    : status === "idle"
                    ? "bg-amber-500"
                    : "dark:bg-white/40 bg-gray-400"
                )}
              />
              <p className="text-center text-sm text-muted-foreground">
                {capitalize(status)}
              </p>
            </div>
          )}
          {error && (
            <div className="space-y-8 flex flex-col items-center pt-4">
              <div className="flex items-center justify-center bg-[#D70015]/10 h-16 w-16 rounded-full">
                <Image src="/warning.svg" alt="" height={64} width={64} />
              </div>
              <div className="space-y-4 max-w-70 w-full flex flex-col items-center overflow-hidden">
                <p className="text-center text-xs uppercase">{error}</p>
                <p className="text-center text-sm leading-5 text-secondary-foreground/80 text-pretty">
                  Please check if you have given the app permission to access
                  your microphone.
                </p>
                <a
                  href="https://support.mozilla.org/en-US/kb/how-manage-your-camera-and-microphone-permissions"
                  className="justify-center underline text-blue-500 flex space-x-1 w-full"
                  target="_blank"
                >
                  <LinkIcon className="h-4 w-4 shrink-0" />
                  <span className="text-xs  truncate">
                    How to manage your camera and microphone permissions with
                    Firefox
                  </span>
                </a>
              </div>
            </div>
          )}
          {!error && (
            <div className="grow flex flex-col w-full items-center relative bg-black/20 rounded-xl mt-2">
              {mediaBlobUrl && (
                <div className="w-full my-auto">
                  <div className="h-full">
                    <WaveSurferPlayer
                      audioUrl={mediaBlobUrl ?? "/file_example_WAV_2MG.wav"}
                      playbackState={playbackState}
                      setCurrentTime={setCurrentTime}
                      setDuration={setDuration}
                      setIsPlaying={setIsPlaying}
                    />
                  </div>
                </div>
              )}
              {status === "recording" && (
                <div className="h-full w-full relative flex items-center justify-center">
                  <Wave
                    fill="#FF8C82"
                    paused={false}
                    className="h-full w-full"
                    style={{ display: "flex" }}
                    options={{
                      amplitude: 20,
                      speed: 0.35,
                      points: 4,
                    }}
                  />
                  <div className="absolute">
                    <PauseIcon />
                  </div>
                </div>
              )}
              {status === "idle" && (
                <div className="h-full flex flex-col justify-center items-center gap-4">
                  <Image
                    src="/empty_no_items.svg"
                    alt=""
                    height={150}
                    width={150}
                    className="opacity-90"
                  />
                  <p className="text-lg font-bold">No recording yet</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="pb-12 pt-4 px-4 w-full text-base flex justify-between text-secondary-foreground/80 font-mono">
          <p
            className={cn("truncate ", {
              "opacity-30": !!error,
            })}
          >
            {minute}:{second}
          </p>

          <p
            className={cn(" truncate", {
              "opacity-30":
                !!error || status === "recording" || status === "idle",
            })}
          >
            <span>{currentTime}</span>
            <span className="text-xs opacity-70">/{duration}</span>
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 w-full">
          <Button
            className="text-secondary-foreground/70"
            disabled={!mediaBlobUrl || !!error}
            size="sm"
            variant="link"
            onClick={() => {
              stopTimer();
              clearBlobUrl();
            }}
          >
            Delete
          </Button>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring" }}
            whileTap={{ scale: error ? 1 : 0.9 }}
          >
            <Button
              className={cn(
                "h-20 w-20 rounded-[16px] bg-white text-white shadow-2xl",
                {
                  "animate-pulse bg-red-500 shadow-red-500":
                    status === "recording",
                  "bg-blue-700 shadow-blue-700/40":
                    mediaBlobUrl && status === "stopped",
                }
              )}
              disabled={!!error}
              onClick={onButtonClick}
            >
              {status === "idle" && (
                <RecordIcon className="!h-6 !w-6 text-red-500" />
              )}
              {status === "stopped" && !isPlaying && (
                <PlayIcon className="!h-6 !w-6" />
              )}
              {status === "stopped" && isPlaying && (
                <PauseIcon className="!h-6 !w-6" />
              )}
              {status === "recording" && <StopIcon className="!h-6 !w-6" />}
            </Button>
          </motion.div>
          <Button
            className="text-secondary-foreground/70"
            size="sm"
            variant="link"
            disabled={!mediaBlobUrl || !!error}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AudioRecorder;
