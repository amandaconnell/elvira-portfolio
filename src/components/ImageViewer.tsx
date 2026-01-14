// Gör det möjligt att öppna och navigera mellan bilder i fullskärm

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
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function close() {
    dialogRef.current?.close();
    onClose();
  }

  function next() {
    setIndex((i: number) => Math.min(i + 1, images.length - 1)); // Navigerar till nästa bild
  }

  function prev() {
    setIndex((i: number) => Math.max(i - 1, 0)); // Navigerar till föregående bild
  }

  // Kopplar funktionerna till en tangent för tangentbordsnavigering
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
      aria-label="Bildvisare"
      class="fixed inset-0 w-full h-full max-w-none max-h-none m-0 p-0 border-none bg-white/95 dark:bg-zinc-900/95 dark:text-white"
      onKeyDown={keyControls}
    >
      <div class="relative grid grid-cols-[4rem_minmax(0,1fr)_4rem] items-center min-h-screen">
        <button
          onClick={close}
          class="absolute top-4 right-4 focus-visible:outline cursor-pointer"
          aria-label="Stäng bildvisare"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>

        <button
          onClick={prev}
          disabled={index === 0}
          aria-label="Föregående bild"
          class="justify-self-center p-4 focus-visible:outline disabled:opacity-40 cursor-pointer"
        >
          <i class="fa-solid fa-chevron-left"></i>
        </button>

        <img
          src={image.src}
          alt={image.alt}
          class="max-h-[90vh] max-w-full mx-auto"
        />

        <button
          onClick={next}
          disabled={index === images.length - 1}
          aria-label="Nästa bild"
          class="justify-self-center p-4 focus-visible:outline disabled:opacity-40 cursor-pointer"
        >
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </dialog>
  );
}
