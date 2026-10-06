import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import { getRecentlyViewed, clearRecentlyViewed } from "../data/recentlyViewed";

const RecentlyViewed = ({ currentId, limit = 8 }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const list = getRecentlyViewed()
      .filter((id) => id !== currentId)
      .map((id) => products.find((p) => p.id === id))
      .filter(Boolean)
      .slice(0, limit);
    setItems(list);
  }, [currentId, limit]);

  if (items.length === 0) return null;

  const clear = () => {
    clearRecentlyViewed();
    setItems([]);
  };

  return (
    <section className="mx-auto max-w-6xl border-t border-neutral-200 px-4 py-12 md:px-10">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="font-playfair text-2xl md:text-3xl">Recently viewed</h2>
        <button
          onClick={clear}
          className="font-josefin text-xs uppercase tracking-widest underline"
        >
          Clear
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((p) => (
          <Link
            key={p.id}
            to={`/product/${p.id}`}
            className="group w-40 shrink-0 sm:w-48 md:w-56"
          >
            <div className="overflow-hidden bg-neutral-100">
              <img
                src={p.image}
                alt={p.name}
                className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p className="mt-3 font-playfair text-sm uppercase tracking-wider">
              {p.name}
            </p>
            <p className="font-josefin text-sm text-neutral-600">€{p.price}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewed;