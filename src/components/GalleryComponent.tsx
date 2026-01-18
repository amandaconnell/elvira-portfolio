// Renderar en interaktiv galleri-vy

import { useState, useRef } from "preact/hooks";
import ImageViewer from "./ImageViewer";

type ImageItem = {
  thumbnail: string;
  full: string;
  alt: string;
};

type GalleryProps = {
  images: ImageItem[];
};

const base = import.meta.env.BASE_URL;

export default function Gallery({ images }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  function openModal(index: number, button: HTMLButtonElement) {
    buttonRef.current = button;
    setActiveIndex(index); // Håller reda på vilken bild som öppnats
  }

  function closeModal() {
    setActiveIndex(null);
    buttonRef.current?.focus(); // Återvänder till bilden som öppnats där modalen stängs
  }

  return (
    <>
      <div class="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map((img, index) => (
          <button
            key={img.full}
            onClick={() => setActiveIndex(index)}
            class="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fuchsia-500"
          >
            <img src={`${base}${img.thumbnail}`} alt={img.alt} />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <ImageViewer
          images={images.map((img) => ({
            src: `${base}${img.full}`,
            alt: img.alt,
          }))}
          startIndex={activeIndex}
          onClose={closeModal}
        />
      )}
    </>
  );
}
