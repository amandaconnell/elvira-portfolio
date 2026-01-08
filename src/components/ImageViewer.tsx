/* Gör det möjligt att öppna och navigera mellan bilder i en modal */

import { useEffect, useRef, useState } from "preact/hooks";

type ImageProps = {
  src: string;
  alt: string;
};

type ImageViewerProps = {
  images: ImageProps[];
  startIndex: number;
  onClose: () => void;
};

type Album = {
  slug: string;
  title: string;
  images: ImageProps[];
};

export default function ImageViewer({
  images,
  startIndex,
  onClose,
}: ImageViewerProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [index, setIndex] = useState<number>(startIndex);

  useEffect(() => {
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
      dialogRef.current.focus(); // Fokuserar på modalen när den öppnas
    }
  }, []);

  // Funktion för att stänga modalen
  function close() {
    dialogRef.current?.close();
    onClose();
  }

  // Funktion för att navigera till nästa bild
  function next() {
    setIndex((i: number) => Math.min(i + 1, images.length - 1));
  }

  // Funktion för att navigera till föregående bild
  function prev() {
    setIndex((i: number) => Math.max(i - 1, 0));
  }

  // Funktion för att hantera tangentbordsnavigering
  function keyControls(e: KeyboardEvent) {
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  }

  const image = images[index];

  return (
    <dialog
      ref={dialogRef}
      tabIndex={-1}
      aria-label="Image viewer"
      class=" fixed inset-0 w-screen h-screen max-w-none max-h-none m-0 p-0 bg-white/95 dark:bg-zinc-900/95 dark:text-white"
      onKeyDown={keyControls}
      style={{ border: "none" }}
    >
      <div class="relative flex items-center justify-center min-h-screen">
        <button
          onClick={close}
          class="absolute top-4 right-8 focus-visible:outline"
          aria-label="Close image viewer"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>

        <button
          onClick={prev}
          disabled={index === 0}
          aria-label="Previous image"
          class="absolute left-4 focus-visible:outline disabled:opacity-40"
        >
          <i class="fa-solid fa-chevron-left"></i>
        </button>

        <img
          src={image.src}
          alt={image.alt}
          class="max-h-[90vh] max-w-[90vw] mr-4"
        />

        <button
          onClick={next}
          disabled={index === images.length - 1}
          aria-label="Next image"
          class="absolute right-8 focus-visible:outline disabled:opacity-40"
        >
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </dialog>
  );
}
