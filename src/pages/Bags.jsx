import React from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

const Bags = () => {
  const bagsProducts = products.filter(
    (item) => item.category === "Bags"
  );

  const layoutPattern = [
    { count: 4, grid: "grid-cols-2 lg:grid-cols-4", ratio: "aspect-[3/4]" },
    { count: 4, grid: "grid-cols-2 lg:grid-cols-4", ratio: "aspect-[3/4]" },
    {
  count: 3,
  grid: "grid-cols-2 md:grid-cols-3 [&>*:last-child:nth-child(odd)]:col-span-2 md:[&>*:last-child:nth-child(odd)]:col-span-1",
  ratio: "aspect-[4/5]",
},
    
  ];

  const rows = [];
  let start = 0;
  let patternIndex = 0;

  while (start < bagsProducts.length) {
    const layout = layoutPattern[patternIndex];

    rows.push({
      ...layout,
      products: bagsProducts.slice(start, start + layout.count),
    });

    start += layout.count;
    patternIndex = (patternIndex + 1) % layoutPattern.length;
  }

  return (
    <div>
      <div className="mb-1 text-center mt-3">
      <h1 className="font-playfair text-2xl tracking-wider md:text-4xl">ATELIER</h1>
      <p className="mt-2 font-josefin text-md text-neutral-500 xl:text-xl">
        Carry your chaos beautifully.
      </p>
    </div>
    
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
    </div>
  );
};

export default Bags;