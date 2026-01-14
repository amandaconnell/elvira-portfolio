// En interaktiv carousel som används på startsidan

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

  // Håller reda på antal paneler som är synliga
  const mobileVisible = 1;
  const tabletVisible = 3;

  function prev(maxIndex: number) {
    setCurrentIndex((i) => Math.max(i - 1, 0)); // Navigerar bakåt
  }

  function next(maxIndex: number) {
    setCurrentIndex((i) => Math.min(i + 1, maxIndex)); // Navigerar framåt
  }

  function renderPanels(
    visibleCount: number,
    wrapperClass = "", // För att justera layout
    isFlex = false // För att panelerna alltid ska ha samma bredd
  ) {
    const maxIndex = Math.max(0, panels.length - visibleCount);

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
                  hidden={!isVisible} // Hindrar att man med tab-knappen kan navigera till paneler som inte är synliga
                  class={
                    isFlex
                      ? `flex-2 hover:flex-6 focus-within:flex-6 transition-all duration-500 motion-safe:transition-all motion-safe:duration-500 motion-reduce:transition-none motion-reduce:flex-6 ease-out overflow-hidden`
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

  return (
    <div class="relative mb-20">
      <h1 class="sr-only">Elvira Holmberg: Startsida</h1>

      {/* Desktop: alla paneler synliga */}
      <div class="hidden xl:flex">
        {renderPanels(panels.length, "flex w-full", true)}

        {/* {panels.map((panel, index) => (
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
        ))} */}
      </div>

      {/* Tablet: 3 paneler synliga åt gången */}
      <div class="hidden lg:flex xl:hidden relative">
        {renderPanels(tabletVisible, "flex w-full", true)}
      </div>

      {/* Mobil: 1 panel synlig åt gången */}
      <div class="lg:hidden relative h-screen overflow-hidden">
        {renderPanels(mobileVisible, "w-full h-full", true)}
      </div>
    </div>
  );
};

export default Carousel;
