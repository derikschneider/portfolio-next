"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Dialog } from "radix-ui";
import { ArrowLeft, ArrowRight, Images } from "lucide-react";
import type { GalleryImage, StudioGallery } from "@/lib/game-ui-galleries";
import { useHoverFx } from "@/components/reveal/use-hover-fx";
import { CrosshairCloseIcon } from "@/components/field/crosshair-close-icon";
import { RevealGroup } from "@/components/reveal/reveal-group";

type LightboxImage = GalleryImage & { studio: string };

type LightboxGroup = {
  images: LightboxImage[];
  startIndexByGalleryId: Map<StudioGallery["id"], number>;
};

// Concatenates images in `galleries` array order, grouped by
// `lightboxGroup` (each gallery falls back to its own id when ungrouped,
// so it stays a solo one-card-one-lightbox group exactly like before).
// Records where each source gallery's own images begin in the combined
// list — that offset is what lets two different preview cards open the
// same Lightbox at two different starting positions.
function buildLightboxGroups(galleries: StudioGallery[]): Map<string, LightboxGroup> {
  const groups = new Map<string, LightboxGroup>();
  for (const gallery of galleries) {
    const key = gallery.lightboxGroup ?? gallery.id;
    let group = groups.get(key);
    if (!group) {
      group = { images: [], startIndexByGalleryId: new Map() };
      groups.set(key, group);
    }
    group.startIndexByGalleryId.set(gallery.id, group.images.length);
    for (const image of gallery.images) {
      group.images.push({ ...image, studio: gallery.studio });
    }
  }
  return groups;
}

export function GameUIGalleries({ galleries }: { galleries: StudioGallery[] }) {
  const [openGroupKey, setOpenGroupKey] = useState<string | null>(null);
  const [index, setIndex] = useState(0);

  const groups = useMemo(() => buildLightboxGroups(galleries), [galleries]);
  const activeGroup = openGroupKey ? (groups.get(openGroupKey) ?? null) : null;

  const openGallery = (gallery: StudioGallery, imageIndexInGallery = 0) => {
    const key = gallery.lightboxGroup ?? gallery.id;
    const group = groups.get(key);
    setOpenGroupKey(key);
    setIndex((group?.startIndexByGalleryId.get(gallery.id) ?? 0) + imageIndexInGallery);
  };

  const stackGalleries = galleries.filter((gallery) => gallery.layout !== "sideBySide");
  const sideBySideGalleries = galleries.filter((gallery) => gallery.layout === "sideBySide");

  return (
    <>
      <div className="flex flex-col gap-8 sm:gap-10">
        {stackGalleries.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            {stackGalleries.map((gallery) => (
              <GalleryStack key={gallery.id} gallery={gallery} onOpen={() => openGallery(gallery)} />
            ))}
          </div>
        )}

        {sideBySideGalleries.map((gallery) => (
          <SideBySideGallery
            key={gallery.id}
            gallery={gallery}
            onOpenAt={(imageIndex) => openGallery(gallery, imageIndex)}
          />
        ))}
      </div>

      {activeGroup && (
        <Lightbox
          images={activeGroup.images}
          index={index}
          onIndexChange={setIndex}
          onClose={() => setOpenGroupKey(null)}
        />
      )}
    </>
  );
}

// Images shown directly, side by side — not hidden behind the fanned
// collection-preview card. Same Lightbox, same prev/next behavior, just a
// different entry point. Use for small, fully-known image sets.
function SideBySideGallery({
  gallery,
  onOpenAt,
}: {
  gallery: StudioGallery;
  onOpenAt: (index: number) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-lg font-light tracking-tight text-foreground sm:text-xl">
          {gallery.studio}
        </h3>
        <p className="text-sm leading-relaxed text-fg-75">{gallery.description}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-6">
        {gallery.images.map((image, i) => (
          <SideBySideImage
            key={image.src}
            image={image}
            onOpen={() => onOpenAt(i)}
            // These galleries sit directly under the case-study header, so
            // the first one is the LCP element — Next warns without this.
            priority={i === 0}
          />
        ))}
      </div>
    </div>
  );
}

function SideBySideImage({
  image,
  onOpen,
  priority,
}: {
  image: StudioGallery["images"][number];
  onOpen: () => void;
  priority?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      // The image's own alt already describes the content, so the label
      // only has to add what the button does with it.
      aria-label={`Enlarge image: ${image.alt}`}
      // No text under these, so the outline-and-dim is the whole hover
      // affordance. See `[data-preview]` in reveal.css.
      data-preview
      // Deliberately no `overflow-hidden` on the button: the frame's outline
      // is painted outside the frame's own box, so a clipping ancestor would
      // cut it off. The frame clips its own image instead.
      className="relative aspect-4/3 cursor-pointer"
    >
      <span data-preview-frame className="absolute inset-0 overflow-hidden">
        <Image
          src={image.src}
          alt=""
          fill
          sizes="(min-width: 640px) 45vw, 90vw"
          className="object-cover"
          priority={priority}
        />
      </span>
    </button>
  );
}

function GalleryStack({
  gallery,
  onOpen,
}: {
  gallery: StudioGallery;
  onOpen: () => void;
}) {
  const cover = gallery.cover ?? gallery.images[0];
  const ref = useRef<HTMLButtonElement>(null);

  // Same hover grammar as the case-study rows: the title blinks and scrambles
  // once per hover-in, the description scrambles immediately and then keeps
  // cycling on its own random interval while the pointer stays. The image
  // gets the gold outline and dim (CSS, see reveal.css) so the preview
  // reads as the clickable thing, not just the text under it.
  useHoverFx(ref, {
    scrambleOnceSelector: "h3",
    blinkSelector: "h3",
    scrambleSelector: "p",
  });

  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      data-preview
      className="group flex cursor-pointer flex-col gap-4 text-left"
    >
      {/* One image, level and unadorned — no fanned rear cards, no border, no
          bottom scrim, and no scale/lift on hover. The hover affordance is
          carried entirely by the text flicker below (Derik, 2026-08-05). */}
      <div data-preview-frame className="relative aspect-4/3 w-full overflow-hidden">
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes="(min-width: 640px) 22vw, 45vw"
          className="object-cover"
          priority
        />
        {/* A "1" badge on a single-image gallery reads as a broken counter —
            the blink and the viewer label carry the affordance there. */}
        {gallery.images.length > 1 && (
          <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-2.5 py-1 font-mono text-xs text-fg-75 backdrop-blur-sm">
            <Images className="size-3.5" aria-hidden="true" />
            {gallery.images.length}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <h3
          data-reveal="text"
          data-reveal-size="fine"
          className="font-display text-lg font-light tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-xl"
        >
          {gallery.studio}
        </h3>
        <p data-reveal="text" className="text-sm leading-relaxed text-fg-75">
          {gallery.description}
        </p>
      </div>

      {/* Appended to the accessible name rather than an aria-label, which
          would replace the visible title and description entirely. */}
      <span className="sr-only">
        — open image viewer,{" "}
        {gallery.images.length === 1 ? "1 image" : `${gallery.images.length} images`}
      </span>
    </button>
  );
}

function Lightbox({
  images,
  index,
  onIndexChange,
  onClose,
}: {
  images: LightboxImage[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  const total = images.length;
  const current = images[index];

  const thumbStripRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Keep the active thumbnail centered in the scroll area as the selection
  // changes, clamped so we never scroll past the first/last thumbnail into
  // empty space — the boundary padding (matching the inter-thumbnail gap)
  // is the only "whitespace" that should ever show at either end.
  useEffect(() => {
    const container = thumbStripRef.current;
    const thumb = thumbRefs.current[index];
    if (!container || !thumb) return;
    const target = thumb.offsetLeft - container.clientWidth / 2 + thumb.clientWidth / 2;
    const maxScroll = container.scrollWidth - container.clientWidth;
    container.scrollTo({
      left: Math.max(0, Math.min(target, maxScroll)),
      behavior: "smooth",
    });
  }, [index]);

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
            {current.studio} gallery
          </Dialog.Title>
          <Dialog.Description className="sr-only">
            {current.caption}
          </Dialog.Description>

          {/* Inset matches the prev/next arrows below (left-2 / sm:left-4) so
              the close button sits the same distance from the window edge
              rather than the wider px-4/sm:px-8 it used to carry. */}
          <div className="flex items-center justify-between px-2 py-2 sm:px-4 sm:py-4">
            {/* Keyed by the current image so it fully remounts (not just
                re-renders) on every navigation — wrapTextReveal() mutates the
                DOM outside React's tracking, so without a fresh mount here a
                later index change would leave the chunk-wrapped text frozen
                on whatever image it first revealed for. Same reasoning as the
                caption below, and the same key the main <Image> already uses
                for this exact purpose. */}
            <RevealGroup
              key={current.src}
              immediate
              className="font-mono text-sm tracking-wide text-fg-60"
            >
              <span data-reveal="text" data-reveal-size="fine">
                {current.studio}
              </span>{" "}
              <span className="text-fg-50" data-reveal="text" data-reveal-size="fine">
                — {index + 1} / {total}
              </span>
            </RevealGroup>
            {/* Same border/hover treatment as the prev/next arrows below, but
                the crosshair itself stays red — only the outline goes yellow
                on hover. Square corners to match them too. */}
            <Dialog.Close className="cursor-pointer rounded-none border border-border p-2 text-accent-red transition-colors hover:border-primary">
              {/* size-5 / sm:size-6 matches the arrow icons, so all three
                  lightbox controls render as identically sized boxes. */}
              <CrosshairCloseIcon className="size-5 sm:size-6" />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-3 sm:px-16">
            {total > 1 && (
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous image"
                className="absolute left-2 z-10 cursor-pointer rounded-none border border-border bg-background/70 p-2 text-fg-60 backdrop-blur-sm transition-colors hover:border-primary hover:text-primary sm:left-4"
              >
                <ArrowLeft className="size-5 sm:size-6" aria-hidden="true" />
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
                className="absolute right-2 z-10 cursor-pointer rounded-none border border-border bg-background/70 p-2 text-fg-60 backdrop-blur-sm transition-colors hover:border-primary hover:text-primary sm:right-4"
              >
                <ArrowRight className="size-5 sm:size-6" aria-hidden="true" />
              </button>
            )}
          </div>

          <RevealGroup
            key={current.src}
            immediate
            className="px-4 pb-3 text-center font-mono text-xs text-fg-60 sm:text-sm"
          >
            <span data-reveal="text" data-reveal-size="fine">
              {current.caption}
            </span>
          </RevealGroup>

          {total > 1 && (
            <div
              ref={thumbStripRef}
              className="scrollbar-hide flex gap-2 overflow-x-auto px-2 pb-6"
            >
              {images.map((image, i) => (
                <button
                  key={image.src}
                  ref={(el) => {
                    thumbRefs.current[i] = el;
                  }}
                  type="button"
                  onClick={() => onIndexChange(i)}
                  aria-label={image.caption}
                  aria-current={i === index ? "true" : undefined}
                  className={`relative h-14 w-20 shrink-0 cursor-pointer overflow-hidden rounded-sm border transition-all ${
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
