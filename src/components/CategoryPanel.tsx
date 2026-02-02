// Skapar paneler som länkar till gallerierna och används i en carousel på startsidan

import type { FunctionalComponent } from "preact";

interface CategoryPanelProps {
  imageSrc: string;
  altText: string;
  category: string;
  linkHref: string;
}

const CategoryPanel: FunctionalComponent<CategoryPanelProps> = ({
  imageSrc,
  altText,
  category,
  linkHref,
}) => {
  return (
    <div class="h-screen relative overflow-hidden">
      <img class="object-cover h-full w-full" src={imageSrc} alt={altText} />
      <div class="absolute bottom-48 left-1/2 transform -translate-x-1/2 text-center text-white">
        <a
          href={linkHref}
          class="inline-block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fuchsia-500"
        >
          <h2 class="font-secondary text-6xl font-bold">{category}</h2>
        </a>
      </div>
    </div>
  );
};

export default CategoryPanel;
