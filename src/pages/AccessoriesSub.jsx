import React from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

const slugMap = {
  shoes: ["shoes"],
  sunglasses: ["sunglasses"],
  scarves: ["scarves"],
  jewelry: ["earrings", "rings", "bracelets", "necklaces", "resin"],
};

const layoutPattern = [
  { count: 4, grid: "grid-cols-2 lg:grid-cols-4", ratio: "aspect-[3/4]" },
  {
    count: 3,
    grid: "grid-cols-2 md:grid-cols-3 [&>*:last-child:nth-child(odd)]:col-span-2 md:[&>*:last-child:nth-child(odd)]:col-span-1",
    ratio: "aspect-[4/5]",
  },
  {
    count: 3,
    grid: "grid-cols-2 md:grid-cols-3 [&>*:last-child:nth-child(odd)]:col-span-2 md:[&>*:last-child:nth-child(odd)]:col-span-1",
    ratio: "aspect-[4/5]",
  },
];

const AccessoriesSub = () => {
  const { subCategory } = useParams();
  const slug = subCategory.toLowerCase();

  const allowed = slugMap[slug] ?? [slug];

  const filtered = products.filter(
    (p) =>
      p.category === "Accessories" &&
      allowed.includes(p.subcategory?.toLowerCase())
  );

  const rows = [];
  let start = 0;
  let patternIndex = 0;

  while (start < filtered.length) {
    const layout = layoutPattern[patternIndex];
    rows.push({
      ...layout,
      products: filtered.slice(start, start + layout.count),
    });
    start += layout.count;
    patternIndex = (patternIndex + 1) % layoutPattern.length;
  }

  return (
    <div>
      <div className="mb-1 mt-3 text-center">
        <Link
          to="/accessories"
          className="font-josefin text-xs uppercase tracking-widest text-neutral-500"
        >
          ← Accessories
        </Link>
        <h1 className="font-playfair text-2xl uppercase tracking-wider md:text-4xl">
          {subCategory}
        </h1>
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center font-josefin text-neutral-500">
          Coming soon.
        </p>
      ) : (
        <div className="flex w-full flex-col gap-4 px-4 py-8 md:px-10 lg:gap-7 lg:px-20 lg:py-8">
          {rows.map((row, index) => (
            <div key={index} className={`grid ${row.grid} gap-4 lg:gap-7`}>
              {row.products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  aspectRatio={row.ratio}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccessoriesSub;