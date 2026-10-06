import React from "react";

const Account = () => {
  return (
    <div className="w-full px-5 py-12 sm:px-10 lg:px-20">

      <div className="mb-12 text-center">
        <h1 className="font-playfair text-3xl tracking-wider md:text-5xl">
          ACCOUNT
        </h1>

        <p className="mt-2 font-josefin text-sm text-neutral-500 md:text-base">
          Welcome back to your little corner of AURÈNE.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">

        <div className="border border-neutral-300 p-7 md:p-10">
          <p className="mb-6 font-josefin text-xs tracking-[0.2em] text-neutral-500">
            PROFILE
          </p>

          <h2 className="font-playfair text-2xl">
            Komal Avaduta
          </h2>

          <p className="mt-2 font-josefin text-sm text-neutral-500">
            komal@example.com
          </p>

          <button className="mt-8 border border-black px-6 py-3 font-josefin text-xs tracking-widest transition hover:bg-black hover:text-white">
            EDIT PROFILE
          </button>
        </div>

        {/* Orders */}
        <div className="border border-neutral-300 p-7 md:p-10">
          <p className="mb-6 font-josefin text-xs tracking-[0.2em] text-neutral-500">
            MY ACCOUNT
          </p>

          <div className="space-y-5 font-josefin text-sm">

            <div className="flex cursor-pointer justify-between border-b border-neutral-200 pb-4">
              <span>My Orders</span>
              <span>→</span>
            </div>

            <div className="flex cursor-pointer justify-between border-b border-neutral-200 pb-4">
              <span>Wishlist</span>
              <span>→</span>
            </div>

            <div className="flex cursor-pointer justify-between border-b border-neutral-200 pb-4">
              <span>Saved Addresses</span>
              <span>→</span>
            </div>

            <div className="flex cursor-pointer justify-between border-b border-neutral-200 pb-4">
              <span>Payment Methods</span>
              <span>→</span>
            </div>

          </div>
        </div>

      </div>

      <div className="mt-12 text-center">
        <button className="font-josefin text-xs tracking-widest underline underline-offset-4">
          LOG OUT
        </button>
      </div>

    </div>
  );
};

export default Account;