"use client";

import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8">
      <div className="text-center">
        <h1 className="text-lg font-semibold">Oops!</h1>
        <div>
          <p className="text-orange-400 text-xs font-semibold mt-4 text-left">
            404
          </p>
          <h2 className="text-3xl font-bold font-mono">Page Not Found</h2>
        </div>
      </div>
      <div className="shadow-xl">
        <Image
          src="/textures-abstract-texture-brush-stain-background.png"
          alt=""
          height={256}
          width={256}
        />
      </div>
      <div className="text-center text-sm max-w-50 space-y-1">
        <p className="font-medium">
          {"We couldn't find the page you were looking for."}
        </p>
        <p>
          Go back to{" "}
          <Link href="/" className="underline">
            homepage
          </Link>
        </p>
      </div>
    </div>
  );
}
