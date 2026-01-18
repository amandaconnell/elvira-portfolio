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
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const [index, setIndex] = useState<number>(startIndex);

  useEffect(() => {
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
      setTimeout(() => closeBtnRef.current?.focus(), 0); // Fokuserar på stäng-knappen när modalen öppnats
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

    // Tab-trap för att kunna navigera med tab
    if (e.key === "Tab") {
      e.preventDefault();

      const focusables = [
        closeBtnRef.current,
        nextBtnRef.current,
        prevBtnRef.current,
      ];
      const currentIndex = focusables.indexOf(
        document.activeElement as HTMLButtonElement,
      );
      if (e.shiftKey) {
        // Shift+Tab = gå bakåt
        const prevIndex =
          (currentIndex - 1 + focusables.length) % focusables.length;
        focusables[prevIndex]?.focus();
      } else {
        // Tab = gå framåt
        const nextIndex = (currentIndex + 1) % focusables.length;
        focusables[nextIndex]?.focus();
      }
    }
  }

  const image = images[index];

  const prevBtnRef = useRef<HTMLButtonElement | null>(null);
  const nextBtnRef = useRef<HTMLButtonElement | null>(null);

  return (
    <dialog
      ref={dialogRef}
      aria-label="Bildvisare"
      class="fixed inset-0 w-full h-full max-w-none max-h-none m-0 p-0 border-none bg-white/97 dark:bg-zinc-900/97 dark:text-white"
      onKeyDown={keyControls}
    >
      <div class="relative grid grid-cols-[4rem_minmax(0,1fr)_4rem] items-center min-h-screen">
        <button
          ref={closeBtnRef}
          onClick={close}
          aria-label="Stäng bildvisare"
          class="absolute top-4 right-4 p-2 bg-white dark:bg-zinc-900 focus-visible:outline-2 focus-visible:outline-fuchsia-500 cursor-pointer"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>

        <button
          ref={prevBtnRef}
          onClick={prev}
          disabled={index === 0}
          aria-label="Föregående bild"
          class="justify-self-center p-4 focus-visible:outline-2 focus-visible:outline-fuchsia-500 disabled:opacity-40 cursor-pointer"
        >
          <i class="fa-solid fa-chevron-left"></i>
        </button>

        <img
          src={image.src}
          alt={image.alt}
          class="max-h-[90vh] max-w-full mx-auto"
        />

        <button
          ref={nextBtnRef}
          onClick={next}
          disabled={index === images.length - 1}
          aria-label="Nästa bild"
          class="justify-self-center p-4 focus-visible:outline-2 focus-visible:outline-fuchsia-500 disabled:opacity-40 cursor-pointer"
        >
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </dialog>
  );
}
