import { AnimatePresence, LayoutGroup, motion } from "motion/react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";
import { Button } from "../ui/button";
import { useState } from "react";
import { CanceIcon } from "@/config/icons";

interface PreviewProps {
  index: number;
  files: File[];
  setIndex: (index: number) => void;
}

interface GalleryProps {
  files: File[];
  onRemoveClick: (index: number) => void;
}

function Preview({ index, files, setIndex }: PreviewProps) {
  return (
    <motion.div
      id={`${index}`}
      className="fixed h-full top-0 left-0 w-full p-6 flex items-center justify-center z-50"
    >
      <motion.div
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          duration: 0.3,
          ease: "easeInOut",
        }}
        layoutId={`${index}`}
        className="flex justify-center max-h-[80svh]"
      >
        <motion.div
          className="fixed top-0 left-0 h-full w-full bg-black/70 backdrop-blur-2xl"
          onClick={() => setIndex(-1)}
        />

        <Button
          className="rounded-full bg-black/60 backdrop-blur-sm absolute bottom-4 text-white right-4 z-2 h-11 w-11"
          size="icon"
          variant="outline"
          onClick={() => setIndex(-1)}
        >
          <CanceIcon className="!h-5 !w-5" />
        </Button>

        <motion.div
          layout
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="relative z-50"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={URL.createObjectURL(files[index])}
            alt=""
            style={{ objectFit: "contain" }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function Gallery({ files, onRemoveClick }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(-1);

  return (
    <div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-sm py-2"
      >
        <CarouselContent className="m-0 ">
          <div className="flex gap-2">
            <LayoutGroup>
              <AnimatePresence mode="popLayout">
                {files.map((file, index) => (
                  <motion.div
                    layout
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    onClick={() => setCurrentIndex(index)}
                  >
                    <CarouselItem className="basis-auto p-0 h-16 w-16 border rounded-xl overflow-hidden">
                      <div className="h-full w-full shrink-0 relative">
                        <Image
                          src={URL.createObjectURL(file)}
                          alt=""
                          height={64}
                          width={64}
                          className="shrink-0 min-h-full"
                          style={{ objectFit: "cover" }}
                        />
                        <Button
                          className="rounded-full bg-black/60 backdrop-blur-sm absolute text-white bottom-0.5 right-0.5 z-2 h-6 w-6"
                          size="icon"
                          variant="outline"
                          onClick={() => onRemoveClick(index)}
                        >
                          <CanceIcon className="!h-3 !w-3" />
                        </Button>
                      </div>
                    </CarouselItem>
                  </motion.div>
                ))}
              </AnimatePresence>
            </LayoutGroup>
          </div>
        </CarouselContent>
        <AnimatePresence>
          {currentIndex >= 0 && (
            <Preview
              index={currentIndex}
              files={files}
              setIndex={(index) => setCurrentIndex(index)}
            />
          )}
        </AnimatePresence>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default Gallery;
