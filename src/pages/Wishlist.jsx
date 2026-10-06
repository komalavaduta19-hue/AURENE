import React, { useState } from "react";
import { products } from "../data/products";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../data/cart";

const WishlistCard = ({ product, onRemove }) => {
  const sizes = product.sizes || [];
  const [size, setSize] = useState(sizes[0] || "");
  const navigate = useNavigate();

  const firstColor =
    typeof product.colors?.[0] === "string"
      ? product.colors[0]
      : product.colors?.[0]?.name;
  const subText = product.shortDescription || firstColor;

  const handleAddToCart = () => {
  addToCart(product.id, firstColor, size);
  navigate("/cart");
};

  return (
    <div className="flex min-h-[220px] border border-neutral-200">
      <Link to={`/product/${product.id}`} className="shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-32 object-cover sm:w-48"
        />
      </Link>

      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div>
          <div className="flex items-start justify-between gap-3">
            <Link to={`/product/${product.id}`}>
              <h2 className="font-playfair text-lg uppercase tracking-wider sm:text-xl">
                {product.name}
              </h2>
            </Link>

            <button onClick={onRemove} aria-label="Remove from wishlist" className="shrink-0">
              <img src="/assets/heart-filled.png" alt="remove" className="h-6 w-6" />
            </button>
          </div>

          {subText && (
            <p className="mt-1 font-josefin text-sm text-neutral-500">{subText}</p>
          )}
          <p className="mt-1 font-josefin text-neutral-600">€{product.price}</p>

          {sizes.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`font-josefin text-xs uppercase tracking-widest ${
                    size === s
                      ? "border-b border-black font-semibold text-black"
                      : "text-neutral-600"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-neutral-900 py-4 font-josefin text-sm font-semibold uppercase tracking-widest text-white transition-opacity hover:opacity-85"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

const Wishlist = () => {
  const [ids, setIds] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  const removeItem = (id) => {
    const updated = ids.filter((i) => i !== id);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    setIds(updated);
  };

  const items = products.filter((p) => ids.includes(p.id));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-10 lg:py-12">
      <h1 className="font-playfair text-2xl uppercase tracking-wider md:text-3xl">
        My Wishlist
      </h1>

      {items.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-josefin text-neutral-500">Your wishlist is empty.</p>
          <Link
            to="/accessories"
            className="mt-4 inline-block border-b border-black font-josefin text-sm uppercase tracking-widest"
          >
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {items.map((product) => (
            <WishlistCard
              key={product.id}
              product={product}
              onRemove={() => removeItem(product.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;