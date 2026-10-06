import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { addToCart } from "../data/cart";
import RecentlyViewed from "../components/RecentlyViewed";
import { addRecentlyViewed } from "../data/recentlyViewed";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));
  const navigate = useNavigate();

  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [error, setError] = useState("");
  const [liked, setLiked] = useState(
    (JSON.parse(localStorage.getItem("wishlist")) || []).includes(Number(id))
  );

  useEffect(() => {
    if (product) addRecentlyViewed(product.id);
  }, [product]);

  if (!product) {
    return (
      <p className="py-20 text-center font-josefin text-neutral-500">
        Product not found.
      </p>
    );
  }

  const toggleLike = () => {
    const list = JSON.parse(localStorage.getItem("wishlist")) || [];
    const updated = list.includes(product.id)
      ? list.filter((i) => i !== product.id)
      : [...list, product.id];
    localStorage.setItem("wishlist", JSON.stringify(updated));
    setLiked(!liked);
  };

  const colors = (product.colors || []).map((c) =>
    typeof c === "string" ? c : c.name
  );
  const sizes = product.sizes || [];
  const selectedColor = color || colors[0] || "";

  const subText = product.shortDescription || selectedColor;

  const handleAddToBasket = () => {
    if (sizes.length > 0 && !size) {
      setError("Please select a size");
      return;
    }
    setError("");
    addToCart(product.id, selectedColor, size);
    navigate("/cart");
  };

  return (
    <>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-8 md:grid-cols-2 md:gap-12 md:px-10 lg:gap-20 lg:py-12">
        <div className="w-full overflow-hidden bg-neutral-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-auto w-full object-contain"
          />
        </div>

        <div className="flex flex-col md:pt-8">
          <div className="flex items-start justify-between gap-4">
            <h1 className="font-playfair text-2xl uppercase tracking-wider md:text-3xl">
              {product.name}
            </h1>

            <button
              onClick={toggleLike}
              aria-label="Add to wishlist"
              className="mt-1 shrink-0"
            >
              <img
                src={liked ? "/assets/heart-filled.png" : "/assets/heart.png"}
                alt="wishlist"
                className="h-4 w-4"
              />
            </button>
          </div>

          <p className="mt-3 font-josefin uppercase tracking-widest text-neutral-600">
            <span className="text-xs md:text-sm">{subText}</span>
            {subText && <span className="mx-3 text-lg">—</span>}
            <span className="text-lg">€{product.price}</span>
          </p>

          <h2 className="mt-8 self-start border-b border-black pb-1 font-josefin text-sm uppercase tracking-widest">
            Description
          </h2>

          <div className="mt-5 space-y-1 font-josefin text-neutral-700">
            {(product.description || []).map((line, i) => (
              <p key={i}>- {line}</p>
            ))}
          </div>

          {colors.length > 0 && (
            <div className="mt-8 flex items-center gap-4 border border-neutral-300 p-1 pr-4">
              <img
                src={product.image}
                alt=""
                className="h-20 w-14 object-cover"
              />
              <select
                value={selectedColor}
                onChange={(e) => setColor(e.target.value)}
                className="w-full bg-transparent py-3 font-josefin text-sm uppercase tracking-widest outline-none"
              >
                {colors.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          )}

          {sizes.length > 0 && (
            <div className="mt-5">
              <div className="flex flex-wrap gap-3">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSize(s);
                      setError("");
                    }}
                    className={`min-w-[3.5rem] border px-3 py-3 font-josefin text-sm uppercase tracking-widest ${
                      size === s
                        ? "border-black"
                        : "border-neutral-300 hover:border-black"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {error && (
                <p className="mt-2 font-josefin text-sm text-red-600">{error}</p>
              )}
            </div>
          )}

          <button
            onClick={handleAddToBasket}
            className="mt-8 w-full bg-black py-4 font-josefin text-sm uppercase tracking-widest text-white transition-opacity hover:opacity-85"
          >
            Add to basket
          </button>
        </div>
      </div>

      <RecentlyViewed currentId={product.id} />
    </>
  );
};

export default ProductDetail;