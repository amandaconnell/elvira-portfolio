/* ---
const { imageSrc, altText, category, linkHref } = Astro.props;
---

<div class="h-screen relative sm:flex-2 sm:hover:flex-6 transition-all duration-500 ease-out overflow-hidden">
  <img class="object-cover h-full w-full" src={imageSrc} alt={altText} />
  <div class="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-center">
    <p>Kategori</p>
    <a href={linkHref}><h2 class="font-secondary text-5xl font-bold">{category}</h2></a>
  </div>
</div>
 */

/* ---
const { imageSrc, altText, category, linkHref } = Astro.props;
---

<div class="h-screen relative sm:flex-2 sm:hover:flex-6 transition-all duration-500 ease-out overflow-hidden">
  <img class="object-cover h-full w-full" src={imageSrc} alt={altText} />
  <div class="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-center">
    <p>Kategori</p>
    <a href={linkHref}><h2 class="font-secondary text-5xl font-bold">{category}</h2></a>
  </div>
</div>
 */
/* ---
const { imageSrc, altText, category, linkHref } = Astro.props;
---

<div class="h-screen relative sm:flex-2 sm:hover:flex-6 transition-all duration-500 ease-out overflow-hidden">
  <img class="object-cover h-full w-full" src={imageSrc} alt={altText} />
  <div class="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-center">
    <p>Kategori</p>
    <a href={linkHref}><h2 class="font-secondary text-5xl font-bold">{category}</h2></a>
  </div>
</div>
 */
/* ---
const { imageSrc, altText, category, linkHref } = Astro.props;
---

<div class="h-screen relative sm:flex-2 sm:hover:flex-6 transition-all duration-500 ease-out overflow-hidden">
  <img class="object-cover h-full w-full" src={imageSrc} alt={altText} />
  <div class="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-center">
    <p>Kategori</p>
    <a href={linkHref}><h2 class="font-secondary text-5xl font-bold">{category}</h2></a>
  </div>
</div>
 */
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
    <div class="h-screen relative sm:flex-2 sm:hover:flex-6 transition-all duration-500 ease-out overflow-hidden">
      <img class="object-cover h-full w-full" src={imageSrc} alt={altText} />
      <div class="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-center text-white">
        <p>Kategori</p>
        <a href={linkHref}>
          <h2 class="font-secondary text-5xl font-bold">{category}</h2>
        </a>
      </div>
    </div>
  );
};

export default CategoryPanel;
