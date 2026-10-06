import React from "react";
import { products } from "../data/products";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../data/cart";
const ProductCard = ({ id, aspectRatio = "aspect-[3/4]" }) => {
  const navigate = useNavigate();
  const product = products.find((item) => item.id === id);

  if (!product) {
    return null;
  }

  const colorCount = Array.isArray(product.colors)
    ? product.colors.length
    : Number(product.colors) || 0;

  const inWishlist = (
    JSON.parse(localStorage.getItem("wishlist")) || []
  ).includes(product.id);

  const handleHeart = () => {
    const list = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (!list.includes(product.id)) {
      localStorage.setItem("wishlist", JSON.stringify([...list, product.id]));
    }
    navigate("/wishlist");
  };

 const handleBag = () => {
  addToCart(product.id, "", "");
  navigate("/cart");
};

  const productLink = `/product/${id}`;

  return (
    <div className="flex w-full min-w-0 flex-col items-start">
     
      <div className="group relative w-full overflow-hidden">
        <Link to={productLink} className="block">
        <img
  src={product.image}
  alt={product.name}
  className={`${aspectRatio} w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]`}
  loading="lazy"
  decoding="async"
/>
        </Link>

        <button
          type="button"
          onClick={handleHeart}
          aria-label={`Add ${product.name} to wishlist`}
          className="absolute right-3 top-3 z-10 cursor-pointer"
        >
          <img
            src={inWishlist ? "/assets/heart-filled.png" : "/assets/white-heart.webp"}
            alt=""
            className="h-4 w-4"
          />
        </button>

        {product.sizes?.length > 0 && (
          <Link
            to={productLink}
            className="absolute bottom-0 left-0 flex w-full translate-y-full justify-center gap-6 bg-[#fffcf8] py-4 font-josefin text-sm transition-transform duration-300 group-hover:translate-y-0"
          >
            {product.sizes.map((size) => (
              <span key={size} className="cursor-pointer hover:underline">
                {size}
              </span>
            ))}
          </Link>
        )}
      </div>

      <div className="mt-3 flex w-full justify-between font-josefin">
        
        <Link to={productLink} className="block">
          <p className="text-sm font-playfair tracking-widest text-neutral-950">
            {product.name}
          </p>

          {product.shortDescription && (
            <p className="mt-1 max-w-[14rem] text-xs leading-5 text-neutral-500">
              {product.shortDescription}
            </p>
          )}

          <p className="mt-1 text-sm text-neutral-900 tracking-widest">
            €{product.price}
          </p>
        </Link>

        <div className="flex flex-col items-end">
          {colorCount > 0 && (
            <p className="text-xs text-neutral-500 tracking-widest">
              + {colorCount} colors
            </p>
          )}

          <button
            type="button"
            onClick={handleBag}
            aria-label={`Open basket`}
            className="mt-2 cursor-pointer"
          >
            <img src="/assets/bag.webp" alt="" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;