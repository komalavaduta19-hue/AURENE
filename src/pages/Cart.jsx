import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { getCart, saveCart } from "../data/cart";

const fixCart = (list) =>
  list.map((item) => ({
    ...item,
    qty: Number(item.qty ?? item.quantity) || 1,
  }));

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => fixCart(getCart()));

  const update = (newCart) => {
    saveCart(newCart);
    setCart(newCart);
  };

  const changeQty = (index, change) => {
    const newQty = cart[index].qty + change;
    if (newQty < 1) return;
    const newCart = [...cart];
    newCart[index] = { ...newCart[index], qty: newQty };
    update(newCart);
  };

  const removeItem = (index) => {
    update(cart.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-10 lg:py-12">
      <Link
        to="/"
        className="font-josefin text-xs uppercase tracking-widest"
      >
        ← Continue shopping
      </Link>

      <h1 className="mt-8 border-b border-neutral-200 pb-4 font-josefin text-sm uppercase tracking-widest">
        Cart
      </h1>

      {cart.length === 0 ? (
        <p className="py-20 text-center font-josefin text-neutral-500">
          Your cart is empty.
        </p>
      ) : (
        <div className="mt-2 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
          {/* LEFT: items */}
          <div>
            {cart.map((item, index) => {
              const product = products.find((p) => p.id === item.id);
              if (!product) return null;

              return (
                <div
                  key={index}
                  className="flex gap-4 border-b border-neutral-200 py-6"
                >
                  <Link to={`/product/${product.id}`} className="shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-40 w-28 object-cover sm:h-48 sm:w-32"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h2 className="font-playfair text-lg uppercase tracking-wider">
                        {product.name}
                      </h2>
                      {item.color && (
                        <p className="mt-1 font-josefin text-sm text-neutral-500">
                          {item.color}
                        </p>
                      )}
                      {item.size && (
                        <p className="font-josefin text-sm text-neutral-500">
                          Size: {item.size}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-4 font-josefin">
                      <button
                        onClick={() => changeQty(index, -1)}
                        className="px-2 text-xl"
                      >
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() => changeQty(index, 1)}
                        className="px-2 text-xl"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <p className="font-josefin text-neutral-700">
                      €{product.price * item.qty}
                    </p>

                    <img
                      src="/assets/dustbin.webp"
                      alt="remove"
                      className="h-5 w-5 cursor-pointer"
                      onClick={() => removeItem(index)}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="h-fit border border-neutral-200">
            <div className="space-y-4 p-6 font-josefin text-sm uppercase tracking-widest">
              <div className="flex justify-between text-neutral-500">
                <span className="text-black">Subtotal</span>
                <span>€{total}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>€{total}</span>
              </div>
            </div>

            <div className="border-t border-neutral-200 p-6">
              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-black py-4 font-josefin text-sm uppercase tracking-widest text-white transition-opacity hover:opacity-85"
              >
                Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;