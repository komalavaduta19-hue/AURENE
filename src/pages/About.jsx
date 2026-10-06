import React from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";

const img = (i) => products[i % products.length]?.image;

const values = [
  {
    no: "01",
    title: "Timeless Design",
    text: "Clean silhouettes and soft details that outlast every season. We design pieces you reach for again and again.",
  },
  {
    no: "02",
    title: "Considered Quality",
    text: "Thoughtful fabrics, careful finishing and fits that feel as good as they look, from the first wear to the fiftieth.",
  },
  {
    no: "03",
    title: "Everyday Elegance",
    text: "Dresses, tops, bags and accessories made to move easily between a quiet morning and a special evening.",
  },
];

const About = () => {
  return (
    <div className="bg-white text-black">

      <section className="mx-auto max-w-6xl px-5 pb-6 pt-14 text-center md:px-10 md:pt-20">
        <p className="font-josefin text-xs uppercase tracking-[0.35em] text-neutral-500">
          Our Story
        </p>
        <h1 className="mt-5 font-playfair text-4xl leading-tight md:text-5xl">
          Dressed in quiet elegance.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl font-josefin text-base leading-relaxed text-neutral-600 md:text-lg">
          AURÈNE is a European-inspired fashion house for women who believe
          that style is felt, not shouted. Soft lines, graceful details and
          pieces made to be loved for years.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:gap-16 md:px-10 md:py-24">
        <img
          src={img(22)}
          alt="Our story"
          className="h-[420px] w-full object-cover md:h-[560px]"
        />
        <div>
          <p className="font-josefin text-xs uppercase tracking-[0.3em] text-neutral-500">
            Where it began
          </p>
          <h2 className="mt-4 font-playfair text-3xl leading-snug md:text-4xl">
            A simple idea, designed with care.
          </h2>
          <div className="mt-6 space-y-4 font-josefin leading-relaxed text-neutral-600">
            <p>
              AURÈNE started with a simple thought: getting dressed should feel
              effortless. Not every piece needs to be loud to be memorable.
            </p>
            <p>
              Inspired by the grace of European wardrobes, we create dresses,
              tops, bags and accessories that blend softness with structure,
              made for real days and real moments.
            </p>
            <p>
              Every collection is built around one promise: pieces that make
              you feel like the most polished version of yourself.
            </p>
          </div>
          <Link
            to="/dresses"
            className="mt-8 inline-block border-b border-black pb-1 font-josefin text-xs uppercase tracking-[0.25em] transition-opacity hover:opacity-60"
          >
            Explore dresses
          </Link>
        </div>
      </section>

      <section className="bg-neutral-50">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-10 md:py-24">
          <h2 className="text-center font-playfair text-3xl md:text-4xl">
            What we believe in
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
            {values.map((v) => (
              <div key={v.no} className="border-t border-black pt-6">
                <span className="font-josefin text-xs tracking-[0.3em] text-neutral-400">
                  {v.no}
                </span>
                <h3 className="mt-3 font-playfair text-xl uppercase tracking-wider">
                  {v.title}
                </h3>
                <p className="mt-3 font-josefin text-sm leading-relaxed text-neutral-600">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 text-center md:py-24">
        <p className="font-playfair text-2xl  leading-relaxed md:text-3xl">
          “Beautiful clothes should feel like they were always meant to be
          yours.”
        </p>
        <p className="mt-5 font-josefin text-xs uppercase tracking-[0.3em] text-neutral-500">
          — The AURÈNE Studio
        </p>
      </section>

      <section className="border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-5 py-16 text-center md:py-20">
          <h2 className="font-playfair text-3xl md:text-4xl">
            Find your next favourite piece.
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/dresses"
              className="w-full bg-black px-10 py-4 font-josefin text-xs uppercase tracking-[0.25em] text-white transition-opacity hover:opacity-85 sm:w-auto"
            >
              Shop dresses
            </Link>
            <Link
              to="/accessories"
              className="w-full border border-black px-10 py-4 font-josefin text-xs uppercase tracking-[0.25em] transition-colors hover:bg-black hover:text-white sm:w-auto"
            >
              Shop accessories
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;