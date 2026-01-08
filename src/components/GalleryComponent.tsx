/* Renderar en interaktiv galleri-vy */

import { useState, useRef } from "preact/hooks";
import ImageViewer from "./ImageViewer";
import { triggerEvent } from "astro/virtual-modules/transitions-events.js";

type ImageProps = {
  src: string;
  alt: string;
};

type GalleryProps = {
  images: ImageProps[];
};

export default function Gallery({ images }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Funktion som håller reda på vilken bild som öppnats
  function openModal(index: number, button: HTMLButtonElement) {
    buttonRef.current = button;
    setActiveIndex(index);
  }

  // Återvänder till bilden som öppnats där modalen stängs
  function closeModal() {
    setActiveIndex(null);
    buttonRef.current?.focus();
  }

  return (
    <>
      <div class="columns-2 sm:columns-4 gap-4 space-y-4">
        {images.map((img, index) => (
          <button
            key={img.src}
            onClick={() => setActiveIndex(index)}
            class="focus-visible:outline-2"
          >
            <img src={img.src} alt={img.alt} />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <ImageViewer
          images={images}
          startIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </>
  );
}

/* 
  return (
    <>


      {activeIndex !== null && (
        <ImageViewer
          images={images}
          startIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </>
  );
}
 */
