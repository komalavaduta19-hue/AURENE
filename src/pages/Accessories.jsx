import React from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

const subCategories = [
  { name: "Shoes", slug: "shoes", image: "/assets/shoes.webp" },
  { name: "Sunglasses", slug: "sunglasses", image: "/assets/sunglasses.webp" },
  { name: "Jewelry", slug: "jewelry", image: "/assets/jewels.webp" },
  { name: "Scarves", slug: "scarves", image: "/assets/scarves.webp" },
];

const mixedAccessoryIds = [
  36, 56, 46, 96,
  67, 106, 58, 98
];

const mixedAccessories = mixedAccessoryIds
  .map((id) => products.find((item) => item.id === id))
  .filter(Boolean);

const Accessories = () => {
  return (
    <div>
      <div className="mb-1 text-center mt-3">
        <h1 className="font-playfair text-2xl tracking-wider md:text-4xl">
          ACCESSORIES
        </h1>
        <p className="mt-2 font-josefin text-md text-neutral-500 xl:text-xl">
A little something for the main character.       
 </p>
      </div>

<div className="mx-auto grid w-full max-w-3xl grid-cols-4 gap-3 px-2 py-8 sm:gap-4 sm:px-4 md:gap-5 lg:gap-6">        
  {subCategories.map((sub) => (
          <Link
            key={sub.slug}
            to={`/accessories/${sub.slug}`}
            className="group block"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={sub.image}
                alt={sub.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
           <p className="mt-2 text-center font-josefin text-[9px] uppercase tracking-[0.15em] sm:text-[10px] md:text-[11px] lg:mt-3 lg:text-sm lg:tracking-widest">
              {sub.name}
            </p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 px-4 pb-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-7 lg:px-20">
  {mixedAccessories.map((product) => (
    <ProductCard
      key={product.id}
      id={product.id}
      aspectRatio="aspect-[3/4]"
    />
  ))}
</div>
    </div>
  );
};

export default Accessories;