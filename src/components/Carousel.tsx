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

  // Håller reda på antal paneler som visas
  const mobile_visible = 1;
  const tablet_visible = 3;

  // Navigation
  function prev(maxIndex: number) {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }

  function next(maxIndex: number) {
    setCurrentIndex((i) => Math.min(i + 1, maxIndex));
  }

  // Renderar paneler
  function renderPanels(
    visibleCount: number,
    wrapperClass = "",
    isFlex = false
  ) {
    const maxIndex = Math.max(0, panels.length - visibleCount);
    /* const visiblePanels = panels.slice(
      currentIndex,
      currentIndex + visibleCount
    ); */

    return (
      <>
        <div class={`relative ${wrapperClass}`}>
          <div class={isFlex ? "flex w-full" : ""}>
            {panels.map((panel, index) => {
              const isVisible =
                index >= currentIndex && index < currentIndex + visibleCount;

              return (
                <div
                  key={`${panel.category}-${index}`}
                  hidden={!isVisible} // removes from tab order
                  class={
                    isFlex
                      ? `flex-2 hover:flex-6 focus-within:flex-6 transition-all duration-500 ease-out overflow-hidden`
                      : ""
                  }
                >
                  <CategoryPanel
                    imageSrc={panel.imageSrc}
                    altText={panel.altText}
                    category={panel.category}
                    linkHref={panel.linkHref}
                  />
                </div>
              );
            })}
            ;
          </div>

          {/* Knappar för att navigera mellan paneler */}
          {visibleCount < panels.length && (
            <div class="flex absolute bottom-4 right-4 gap-2">
              <button
                onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
                disabled={currentIndex === 0}
                aria-label="Föregående panel"
                class="p-2 text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fuchsia-500 disabled:opacity-40"
              >
                <i class="fa-solid fa-circle-chevron-left fa-2xl"></i>
              </button>

              <button
                onClick={() =>
                  setCurrentIndex((i) => Math.min(i + 1, maxIndex))
                }
                disabled={currentIndex === maxIndex}
                aria-label="Nästa panel"
                class="p-2 text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fuchsia-500 disabled:opacity-40"
              >
                <i class="fa-solid fa-circle-chevron-right fa-2xl"></i>
              </button>
            </div>
          )}
        </div>
      </>
    );
  }

  /* function renderPanels(visibleCount: number, wrapperClass = "") {
    const maxIndex = Math.max(0, panels.length - visibleCount);
    const visiblePanels = panels.slice(
      currentIndex,
      currentIndex + visibleCount
    );

    return (
      <>
        <div class={wrapperClass}>
          {visiblePanels.map((panel, index) => (
            <CategoryPanel
              key={`${panel.category}-${index}`}
              imageSrc={panel.imageSrc}
              altText={panel.altText}
              category={panel.category}
              linkHref={panel.linkHref}
            />
          ))}
        </div>

        {visibleCount < panels.length && (
          <div class="flex absolute bottom-2 right-4 gap-2">
            <button
              onClick={() => prev(maxIndex)}
              disabled={currentIndex === 0}
              aria-label="Föregående panel"
              class="p-2 text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fuchsia-500 disabled:opacity-40"
            >
              <i class="fa-solid fa-circle-chevron-left fa-2xl"></i>
            </button>

            <button
              onClick={() => next(maxIndex)}
              disabled={currentIndex === maxIndex}
              aria-label="Nästa panel"
              class="p-2 text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fuchsia-500 disabled:opacity-40"
            >
              <i class="fa-solid fa-circle-chevron-right fa-2xl"></i>
            </button>
          </div>
        )}
      </>
    );
  } */

  return (
    <div class="relative mb-20">
      <h1 class="sr-only">Elvira Holmberg: Startsida</h1>

      {/* Desktop: alla paneler synliga */}
      <div class="hidden xl:flex">
        {panels.map((panel, index) => (
          <div
            key={index}
            class="flex-2 hover:flex-6 focus-within:flex-6 transition-all duration-500 ease-out overflow-hidden"
          >
            <CategoryPanel
              key={`${panel.category}-${index}`}
              imageSrc={panel.imageSrc}
              altText={panel.altText}
              category={panel.category}
              linkHref={panel.linkHref}
            />
          </div>
        ))}
      </div>

      {/* Tablet: 3 paneler synliga åt gången */}
      <div class="hidden lg:flex xl:hidden relative">
        {renderPanels(tablet_visible, "flex w-full", true)}
      </div>

      {/* Mobil: 1 panel synlig åt gången */}
      <div class="lg:hidden relative h-screen overflow-hidden">
        {renderPanels(mobile_visible, "w-full h-full", true)}
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
