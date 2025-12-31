import type { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";
import CategoryPanel from "./CategoryPanel";

interface Panel {
  imageSrc: string;
  altText: string;
  category: string;
  linkHref: string;
}

interface CarouselProps {
  panels: Panel[];
}

const Carousel: FunctionalComponent<CarouselProps> = ({ panels }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  function prev() {
    setCurrentIndex((currentIndex - 1 + panels.length) % panels.length);
  }

  function next() {
    setCurrentIndex((currentIndex + 1) % panels.length);
  }

  // Get 3 panels starting from currentIndex, wrapping around if needed
  const visiblePanels = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(panels[(currentIndex + i) % panels.length]);
    }
    return visible;
  };

  return (
    <div class="relative mb-20">
      {/* Fem paneler */}
      <div class="hidden xl:flex">
        {panels.map((panel, index) => (
          <CategoryPanel
            key={index}
            imageSrc={panel.imageSrc}
            altText={panel.altText}
            category={panel.category}
            linkHref={panel.linkHref}
          />
        ))}
      </div>

      {/* Tre paneler */}
      <div class="hidden lg:flex xl:hidden relative">
        {visiblePanels().map((panel, index) => (
          <div
            class="flex flex-2 hover:flex-6 w-1/3 transition-all duration-500 ease-out"
            key={index}
          >
            <CategoryPanel
              imageSrc={panel.imageSrc}
              altText={panel.altText}
              category={panel.category}
              linkHref={panel.linkHref}
            />
          </div>
        ))}
      </div>

      {/* Carousel med en panel */}
      <div class="lg:hidden overflow-hidden relative h-screen">
        {panels.map((panel, index) => (
          <div
            key={index}
            class={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-out ${
              index === currentIndex
                ? "opacity-100 z-10"
                : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <CategoryPanel
              imageSrc={panel.imageSrc}
              altText={panel.altText}
              category={panel.category}
              linkHref={panel.linkHref}
            />
          </div>
        ))}
      </div>

      {/* Knappar som styr carousel */}
      <div class="flex absolute bottom-2 right-4 xl:hidden">
        <button
          class=" z-50 transform -translate-y-1/2 text-white p-2 rounded"
          onClick={prev}
          aria-label="Previous panel"
        >
          <i class="fa-solid fa-circle-chevron-left fa-2xl"></i>
        </button>
        <button
          class=" z-50 transform -translate-y-1/2 text-white p-2 rounded"
          onClick={next}
          aria-label="Next panel"
        >
          <i class="fa-solid fa-circle-chevron-right fa-2xl"></i>
        </button>
      </div>
    </div>
  );
};

export default Carousel;

/* import { useState } from 'preact/hooks';
import CategoryPanel from './CategoryPanel.astro';

const [currentIndex, setCurrentIndex] = useState(0);

function prev() {
  setCurrentIndex((currentIndex - 1 + panels.length) % panels.length);
}

function next() {
  setCurrentIndex((currentIndex + 1) % panels.length);
}

<div class="relative">
  <div class="hidden lg:flex">
    {panels.map((panel: { imageSrc: any; altText: any; category: any; linkHref: any; }) => (
      <CategoryPanel
        imageSrc={panel.imageSrc}
        altText={panel.altText}
        category={panel.category}
        linkHref={panel.linkHref}
      />
    ))}
  </div>

  <div class="lg:hidden overflow-hidden relative h-screen">
    {panels.map((panel: { imageSrc: any; altText: any; category: any; linkHref: any; }, index: number) => (
      <div class={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
        <CategoryPanel
          imageSrc={panel.imageSrc}
          altText={panel.altText}
          category={panel.category}
          linkHref={panel.linkHref}
        />
      </div>
    ))}

    <button
      class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded"
      onClick={prev}
      aria-label="Previous panel"
    >
      ←
    </button>
    <button
      class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded"
      onClick={next}
      aria-label="Next panel"
    >
      →
    </button>
  </div>
</div> */
