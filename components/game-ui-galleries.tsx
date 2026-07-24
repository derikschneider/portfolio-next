"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Dialog } from "radix-ui";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import type { StudioGallery } from "@/lib/game-ui-galleries";

export function GameUIGalleries({ galleries }: { galleries: StudioGallery[] }) {
  const [openId, setOpenId] = useState<StudioGallery["id"] | null>(null);
  const [index, setIndex] = useState(0);
  const active = galleries.find((gallery) => gallery.id === openId) ?? null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-6">
        {galleries.map((gallery) => (
          <GalleryStack
            key={gallery.id}
            gallery={gallery}
            onOpen={() => {
              setOpenId(gallery.id);
              setIndex(0);
            }}
          />
        ))}
      </div>

      {active && (
        <Lightbox
          gallery={active}
          index={index}
          onIndexChange={setIndex}
          onClose={() => setOpenId(null)}
        />
      )}
    </>
  );
}

function GalleryStack({
  gallery,
  onOpen,
}: {
  gallery: StudioGallery;
  onOpen: () => void;
}) {
  const [cover, back1, back2] = gallery.images;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex flex-col gap-3 text-left"
    >
      <div className="relative aspect-4/3 w-full">
        {back2 && (
          <div className="absolute inset-0 translate-x-2 translate-y-3 -rotate-3 overflow-hidden rounded-md border border-border opacity-50 transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-4">
            <Image
              src={back2.src}
              alt=""
              fill
              sizes="(min-width: 640px) 22vw, 45vw"
              className="object-cover"
            />
          </div>
        )}
        {back1 && (
          <div className="absolute inset-0 -translate-x-1.5 translate-y-1.5 rotate-2 overflow-hidden rounded-md border border-border opacity-70 transition-transform duration-300 group-hover:-translate-x-2 group-hover:translate-y-2">
            <Image
              src={back1.src}
              alt=""
              fill
              sizes="(min-width: 640px) 22vw, 45vw"
              className="object-cover"
            />
          </div>
        )}
        <div className="absolute inset-0 overflow-hidden rounded-md border border-border shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="(min-width: 640px) 22vw, 45vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent" />
          <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-2.5 py-1 font-mono text-xs text-fg-75 backdrop-blur-sm">
            <Images className="size-3.5" aria-hidden="true" />
            {gallery.images.length}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="font-display text-lg font-light tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-xl">
          {gallery.studio}
        </h3>
        <p className="text-sm leading-relaxed text-fg-75">
          {gallery.description}
        </p>
      </div>
    </button>
  );
}

function Lightbox({
  gallery,
  index,
  onIndexChange,
  onClose,
}: {
  gallery: StudioGallery;
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  const total = gallery.images.length;
  const current = gallery.images[index];

  const goPrev = useCallback(
    () => onIndexChange((index - 1 + total) % total),
    [index, total, onIndexChange],
  );
  const goNext = useCallback(
    () => onIndexChange((index + 1) % total),
    [index, total, onIndexChange],
  );

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goPrev, goNext]);

  return (
    <Dialog.Root
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-0 z-50 flex flex-col outline-none">
          <Dialog.Title className="sr-only">
            {gallery.studio} gallery
          </Dialog.Title>
          <Dialog.Description className="sr-only">
            {current.caption}
          </Dialog.Description>

          <div className="flex items-center justify-between px-4 py-4 sm:px-8">
            <span className="font-mono text-sm tracking-wide text-fg-60">
              {gallery.studio}{" "}
              <span className="text-fg-50">
                — {index + 1} / {total}
              </span>
            </span>
            <Dialog.Close className="rounded-md p-2 text-fg-60 transition-colors hover:bg-foreground/10 hover:text-foreground">
              <X className="size-5" aria-hidden="true" />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-3 sm:px-16">
            {total > 1 && (
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous image"
                className="absolute left-2 z-10 rounded-full border border-border bg-background/70 p-2 text-fg-60 backdrop-blur-sm transition-colors hover:border-primary hover:text-primary sm:left-4"
              >
                <ChevronLeft className="size-5 sm:size-6" aria-hidden="true" />
              </button>
            )}

            <div className="relative h-full max-h-[65vh] w-full max-w-4xl">
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>

            {total > 1 && (
              <button
                type="button"
                onClick={goNext}
                aria-label="Next image"
                className="absolute right-2 z-10 rounded-full border border-border bg-background/70 p-2 text-fg-60 backdrop-blur-sm transition-colors hover:border-primary hover:text-primary sm:right-4"
              >
                <ChevronRight className="size-5 sm:size-6" aria-hidden="true" />
              </button>
            )}
          </div>

          <p className="px-4 pb-3 text-center font-mono text-xs text-fg-60 sm:text-sm">
            {current.caption}
          </p>

          {total > 1 && (
            <div className="flex gap-2 overflow-x-auto px-4 pb-6 sm:justify-center sm:px-8">
              {gallery.images.map((image, i) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => onIndexChange(i)}
                  aria-label={image.caption}
                  aria-current={i === index ? "true" : undefined}
                  className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-sm border transition-all ${
                    i === index
                      ? "border-primary"
                      : "border-border opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
