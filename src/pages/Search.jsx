import React, { useMemo, useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

const Search = () => {
  const [query, setQuery] = useState("");

  const searchResults = useMemo(() => {
    const searchText = query.trim().toLowerCase();

    if (!searchText) {
      return [];
    }

    return products.filter((product) => {
      const searchableText = [
        product.name,
        product.category,
        product.subcategory,
        product.shortDescription,
        product.colors?.join(" "),
        product.sizes?.join(" "),
        product.description?.join(" "),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(searchText);
    });
  }, [query]);

  const clearSearch = () => {
    setQuery("");
  };

  return (
    <div className="min-h-screen w-full px-4 py-10 sm:px-8 lg:px-16 xl:px-20">

      <div className="mx-auto max-w-5xl text-center">
        <h1 className="font-playfair text-3xl tracking-wider sm:text-4xl md:text-5xl">
          SEARCH
        </h1>

        <p className="mt-2 font-josefin text-sm text-neutral-500 sm:text-base">
          Find something worth keeping.
        </p>
      </div>

      <div className="mx-auto mt-8 w-full max-w-3xl">
        <div className="relative flex items-center border-b border-black">

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dresses, tops, bags..."
            className="w-full bg-transparent py-4 pr-20 font-josefin text-sm outline-none placeholder:text-neutral-400 sm:text-base"
          />

          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-0 cursor-pointer px-2 font-josefin text-xs tracking-wider text-neutral-500 hover:text-black"
            >
              CLEAR
            </button>
          )}
        </div>
      </div>

      {query.trim() && (
        <div className="mx-auto mt-8 max-w-7xl">
          <p className="font-josefin text-sm text-neutral-500">
            {searchResults.length}{" "}
            {searchResults.length === 1 ? "result" : "results"} for{" "}
            <span className="text-black">“{query}”</span>
          </p>
        </div>
      )}

      {!query.trim() && (
        <div className="mx-auto mt-20 max-w-xl text-center">
          <p className="font-playfair text-xl text-neutral-700 sm:text-2xl">
            Start typing to discover your next favourite.
          </p>
        </div>
      )}

      {query.trim() && searchResults.length > 0 && (
        <div className="mx-auto mt-8 grid max-w-7xl grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-7">
          {searchResults.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              aspectRatio="aspect-[3/4]"
            />
          ))}
        </div>
      )}

      {query.trim() && searchResults.length === 0 && (
        <div className="mx-auto mt-24 max-w-lg text-center">
          <h2 className="font-playfair text-2xl sm:text-3xl">
            Nothing found.
          </h2>

          <p className="mt-3 font-josefin text-sm leading-6 text-neutral-500">
            Try another name, category, colour, or product type.
          </p>

          <button
            onClick={clearSearch}
            className="mt-6 border border-black px-6 py-3 font-josefin text-xs tracking-widest transition hover:bg-black hover:text-white"
          >
            CLEAR SEARCH
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;