import React from 'react'
import ProductCard from '../components/ProductCard';
import { products } from "../data/products";
import Dresses from './Dresses';
import {Link} from "react-router-dom";


const Home = () => {
  const items = [
    { name: "NEW IN", img: "/assets/silk.webp", to: "/accessories/scarves" },
    { name: "SHOES", img: "/assets/flats.webp", to: "/accessories/shoes" },
    { name: "RESIN", img: "/assets/resin.webp", to: "/accessories/resin" },
    { name: "SILKWRAPS", img: "/assets/brown_neck.webp", to: "/accessories/scarves" },
    { name: "TOPS", img: "/assets/t4.webp", to: "/tops" },
    { name: "WRISTLETS", img: "/assets/knot_bracelet.webp", to: "/accessories/bracelets" },
    { name: "STUDS", img: "/assets/goldie.webp", to: "/accessories/earrings" },
    { name: "SPECTRA", img: "/assets/aesthetic.webp", to: "/accessories/sunglasses" },
    { name: "LEATHER GOODS", img: "/assets/b3.webp", to: "/bags" },
    { name: "SCARVES", img: "/assets/brownie.webp", to: "/accessories/scarves" },
  ];

  const nextitems = [
    { name: "LOOKBOOK", img: "/assets/light_emerald.webp", to: "/accessories/resin" },
    { name: "FASHION", img: "/assets/curvy.webp", to: "/accessories/necklaces" },
  ];

  const thirdscr = [
    { name: "LUSTRE", img: "/assets/gold_rounded.webp", to: "/accessories/resin" },
    { name: "SATIN", img: "/assets/scarf.webp", to: "/accessories/scarves" },
    { name: "GLIMPSE", img: "/assets/retro.webp", to: "/accessories/sunglasses" },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {items.map((item, i) => {
          const isWide = (i + 1) % 5 === 0; // 5th aur 10th item

          return (
            <Link
              key={item.name + i}
              to={item.to}
              className={`relative block ${
                isWide
                  ? "col-span-2 aspect-square md:col-span-1 md:aspect-[3/4]"
                  : "aspect-[3/4]"
              }`}
            >
              <img
                src={item.img}
                alt={item.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                <h2 className="text-white font-playfair tracking-widest text-lg">
                  {item.name}
                </h2>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 m-4 md:m-30 xl:grid-cols-2 xl:m-30">
        {nextitems.map((item) => (
          <Link
            key={item.name}
            to={item.to}
            className="relative block aspect-[3/4]"
          >
            <img
              src={item.img}
              alt={item.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
              <h2 className="text-white font-playfair tracking-widest text-lg">
                {item.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 px-4 md:grid-cols-3 md:gap-10 md:px-14">
        {thirdscr.map((item) => (
          <Link
            key={item.name}
            to={item.to}
            className="relative block aspect-[3/4] last:col-span-2 last:aspect-square md:last:col-span-1 md:last:aspect-[3/4]"
          >
            <img
              src={item.img}
              alt={item.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
              <h2 className="text-white font-playfair tracking-widest text-lg">
                {item.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home

