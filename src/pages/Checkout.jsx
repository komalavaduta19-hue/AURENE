import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import { getCart, saveCart } from "../data/cart";

const COUPONS = {
  AURENE10: { type: "percent", value: 10, label: "10% off" },
  WELCOME15: { type: "percent", value: 15, label: "15% off" },
  FLAT20: { type: "flat", value: 20, label: "€20 off" },
  FREESHIP: { type: "ship", value: 0, label: "Free shipping" },
};

const FREE_SHIPPING_ABOVE = 150;
const SHIPPING_FEE = 9;

const COUNTRIES = [
  "India", "France", "Germany", "Italy", "Spain", "Netherlands",
  "United Kingdom", "United States", "United Arab Emirates", "Australia",
];

const loadCart = () =>
  getCart()
    .map((i) => {
      const p = products.find((p) => p.id === i.id);
      if (!p) return null;
      return {
        id: p.id,
        name: p.name,
        price: Number(p.price) || 0,
        image: p.image,
        qty: Number(i.qty ?? i.quantity) || 1,
        size: i.size,
        color: i.color,
      };
    })
    .filter(Boolean);

const fmt = (n) => `€${n.toFixed(2).replace(/\.00$/, "")}`;

const initial = {
  firstName: "", lastName: "", email: "", phone: "", address: "",
  apartment: "", city: "", state: "", postal: "", country: "India",
  cardNumber: "", cardName: "", expiry: "", cvv: "",
};

function Field({ label, error, className = "", ...inputProps }) {
  return (
    <div className={className} data-error={!!error}>
      <label className="block font-josefin text-[11px] tracking-[0.15em] uppercase text-neutral-500 mb-1.5">
        {label}
      </label>
      <input
        {...inputProps}
        className={`w-full border px-3.5 py-3 text-sm bg-white outline-none transition-colors focus:border-black ${
          error ? "border-red-500" : "border-neutral-300"
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default function Checkout() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [payment, setPayment] = useState("card");
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState(null);
  const [couponMsg, setCouponMsg] = useState(null);
  const [placing, setPlacing] = useState(false);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    setItems(loadCart());
    window.scrollTo(0, 0);
  }, []);

  const subtotal = useMemo(
    () => items.reduce((s, i) => s + i.price * i.qty, 0),
    [items]
  );

  const discount = useMemo(() => {
    if (!coupon) return 0;
    if (coupon.type === "percent") return (subtotal * coupon.value) / 100;
    if (coupon.type === "flat") return Math.min(coupon.value, subtotal);
    return 0;
  }, [coupon, subtotal]);

  const discounted = subtotal - discount;
  const shipping =
    coupon?.type === "ship" || discounted >= FREE_SHIPPING_ABOVE || discounted === 0
      ? 0
      : SHIPPING_FEE;
  const total = discounted + shipping;

  const set = (k) => (e) => {
    let v = e.target.value;
    if (k === "cardNumber") {
      v = v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    }
    if (k === "expiry") {
      v = v.replace(/\D/g, "").slice(0, 4);
      if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
    }
    if (k === "cvv") v = v.replace(/\D/g, "").slice(0, 4);
    if (k === "phone") v = v.replace(/[^\d+\s-]/g, "").slice(0, 16);
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const fp = (name) => ({
    value: form[name],
    onChange: set(name),
    error: errors[name],
  });

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return setCouponMsg({ ok: false, text: "Enter a code first." });
    if (COUPONS[code]) {
      setCoupon({ code, ...COUPONS[code] });
      setCouponMsg({ ok: true, text: `${code} applied — ${COUPONS[code].label}` });
    } else {
      setCoupon(null);
      setCouponMsg({ ok: false, text: "Invalid coupon code." });
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    setCouponInput("");
    setCouponMsg(null);
  };

  const validate = () => {
    const e = {};
    const req = ["firstName", "lastName", "email", "phone", "address", "city", "state", "postal", "country"];
    req.forEach((k) => {
      if (!form[k].trim()) e[k] = "Required";
    });
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Invalid email";
    const digits = form.phone.replace(/\D/g, "");
    if (form.phone && (digits.length < 8 || digits.length > 15)) e.phone = "Invalid phone number";
    if (form.postal && form.postal.trim().length < 4) e.postal = "Invalid postal code";

    if (payment === "card") {
      if (form.cardNumber.replace(/\s/g, "").length !== 16) e.cardNumber = "Enter 16-digit card number";
      if (!form.cardName.trim()) e.cardName = "Required";
      const m = form.expiry.match(/^(\d{2})\/(\d{2})$/);
      if (!m) e.expiry = "MM/YY";
      else {
        const mm = +m[1];
        const yy = 2000 + +m[2];
        const now = new Date();
        if (mm < 1 || mm > 12) e.expiry = "Invalid month";
        else if (yy < now.getFullYear() || (yy === now.getFullYear() && mm < now.getMonth() + 1))
          e.expiry = "Card expired";
      }
      if (form.cvv.length < 3) e.cvv = "Invalid CVV";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const placeOrder = () => {
    if (!items.length) return;
    if (!validate()) {
      setTimeout(() => {
        document
          .querySelector("[data-error='true']")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
      return;
    }
    setPlacing(true);
    setTimeout(() => {
      const id = "AUR-" + Math.random().toString(36).slice(2, 8).toUpperCase();
      setOrder({ id, total, email: form.email, name: form.firstName, payment });
      saveCart([]);
      setItems([]);
      setPlacing(false);
      window.scrollTo(0, 0);
    }, 1400);
  };

  if (order) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-20">
        <div className="w-14 h-14 rounded-full border border-black flex items-center justify-center mb-6 text-2xl">✓</div>
        <h1 className="font-playfair text-3xl md:text-4xl mb-3">Thank you, {order.name}.</h1>
        <p className="font-josefin text-sm text-neutral-600 mb-1">
          Your order <span className="text-black font-semibold">{order.id}</span> has been placed.
        </p>
        <p className="font-josefin text-sm text-neutral-600 mb-1">
          Total: {fmt(order.total)} · {order.payment === "cod" ? "Cash on Delivery" : "Paid by card"}
        </p>
        <p className="font-josefin text-sm text-neutral-500 mb-8">
          A confirmation has been sent to {order.email}.
        </p>
        <Link
          to="/"
          className="bg-black text-white font-josefin text-xs tracking-[0.2em] uppercase px-10 py-4 hover:bg-neutral-800 transition-colors"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-20">
        <h1 className="font-playfair text-3xl mb-3">Your basket is empty</h1>
        <p className="font-josefin text-sm text-neutral-500 mb-8">Add something beautiful before checking out.</p>
        <Link
          to="/"
          className="bg-black text-white font-josefin text-xs tracking-[0.2em] uppercase px-10 py-4 hover:bg-neutral-800 transition-colors"
        >
          Shop now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-14">
      <div className="text-center mb-10">
        <h1 className="font-playfair text-3xl md:text-4xl tracking-wide mb-2">CHECKOUT</h1>
        <p className="font-playfair italic text-neutral-500 text-sm md:text-base">
          One final step before it’s yours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-start">
        <div>
          <h2 className="font-josefin text-sm tracking-[0.2em] uppercase mb-5 pb-3 border-b border-neutral-200">
            Delivery details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="First name" autoComplete="given-name" {...fp("firstName")} />
            <Field label="Last name" autoComplete="family-name" {...fp("lastName")} />
            <Field label="Email" type="email" className="sm:col-span-2" autoComplete="email" {...fp("email")} />
            <Field label="Phone" type="tel" className="sm:col-span-2" autoComplete="tel" {...fp("phone")} />
            <Field label="Address" className="sm:col-span-2" autoComplete="street-address" {...fp("address")} />
            <Field label="Apartment / Flat (optional)" className="sm:col-span-2" {...fp("apartment")} />
            <Field label="City" autoComplete="address-level2" {...fp("city")} />
            <Field label="State" autoComplete="address-level1" {...fp("state")} />
            <Field label="Postal code" autoComplete="postal-code" {...fp("postal")} />
            <div>
              <label className="block font-josefin text-[11px] tracking-[0.15em] uppercase text-neutral-500 mb-1.5">
                Country
              </label>
              <select
                value={form.country}
                onChange={set("country")}
                className="w-full border border-neutral-300 px-3.5 py-3 text-sm bg-white outline-none focus:border-black"
              >
                {COUNTRIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <h2 className="font-josefin text-sm tracking-[0.2em] uppercase mt-12 mb-5 pb-3 border-b border-neutral-200">
            Payment
          </h2>
          <div className="space-y-3">
            {[
              { id: "card", label: "Credit / Debit Card" },
              { id: "cod", label: "Cash on Delivery" },
            ].map((opt) => (
              <label
                key={opt.id}
                className={`flex items-center gap-3 border px-4 py-3.5 cursor-pointer transition-colors ${
                  payment === opt.id ? "border-black bg-neutral-50" : "border-neutral-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={payment === opt.id}
                  onChange={() => setPayment(opt.id)}
                  className="accent-black"
                />
                <span className="font-josefin text-sm">{opt.label}</span>
              </label>
            ))}
          </div>

          {payment === "card" && (
            <div className="grid grid-cols-2 gap-4 mt-5">
              <Field label="Card number" placeholder="1234 5678 9012 3456" className="col-span-2" inputMode="numeric" autoComplete="cc-number" {...fp("cardNumber")} />
              <Field label="Name on card" className="col-span-2" autoComplete="cc-name" {...fp("cardName")} />
              <Field label="Expiry" placeholder="MM/YY" inputMode="numeric" autoComplete="cc-exp" {...fp("expiry")} />
              <Field label="CVV" placeholder="123" inputMode="numeric" type="password" autoComplete="cc-csc" {...fp("cvv")} />
            </div>
          )}
          {payment === "cod" && (
            <p className="font-josefin text-sm text-neutral-500 mt-4">
              Pay in cash when your order arrives at your doorstep.
            </p>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 border border-neutral-200 p-6 md:p-7 bg-neutral-50/60">
          <h2 className="font-josefin text-sm tracking-[0.2em] uppercase mb-5 pb-3 border-b border-neutral-200">
            Order summary
          </h2>

          <div className="space-y-5 mb-6">
            {items.map((it, idx) => (
              <div key={idx} className="flex gap-4">
                <img src={it.image} alt={it.name} className="w-20 h-24 object-cover bg-neutral-200" />
                <div className="flex-1 min-w-0">
                  <p className="font-playfair text-base leading-snug">{it.name}</p>
                  <p className="font-josefin text-sm mt-1">{fmt(it.price)}</p>
                  <p className="font-josefin text-xs text-neutral-500 mt-1">
                    Qty: {it.qty}
                    {it.size ? ` · Size ${it.size}` : ""}
                    {it.color ? ` · ${it.color}` : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-neutral-200 pt-5 mb-5">
            {coupon ? (
              <div className="flex items-center justify-between bg-white border border-neutral-300 px-3.5 py-3">
                <span className="font-josefin text-xs tracking-wider">
                  {coupon.code} · {coupon.label}
                </span>
                <button onClick={removeCoupon} className="text-xs underline">
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                  placeholder="Coupon code"
                  className="flex-1 min-w-0 border border-neutral-300 px-3.5 py-3 text-sm bg-white outline-none focus:border-black uppercase"
                />
                <button
                  onClick={applyCoupon}
                  className="border border-black px-5 font-josefin text-xs tracking-[0.15em] uppercase hover:bg-black hover:text-white transition-colors"
                >
                  Apply
                </button>
              </div>
            )}
            {couponMsg && (
              <p className={`text-xs mt-2 ${couponMsg.ok ? "text-green-700" : "text-red-500"}`}>
                {couponMsg.text}
              </p>
            )}
            {!coupon && (
              <p className="text-[11px] text-neutral-400 mt-2">Try: AURENE10, WELCOME15, FLAT20, FREESHIP</p>
            )}
          </div>

          <div className="space-y-2.5 font-josefin text-sm border-t border-neutral-200 pt-5">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{fmt(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-700">
                <span>Discount</span>
                <span>−{fmt(discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "FREE" : fmt(shipping)}</span>
            </div>
            <div className="flex justify-between text-base font-semibold pt-3 border-t border-neutral-200">
              <span>Total</span>
              <span>{fmt(total)}</span>
            </div>
          </div>

          <button
            onClick={placeOrder}
            disabled={placing}
            className="w-full mt-6 bg-black text-white font-josefin text-xs tracking-[0.25em] uppercase py-4 hover:bg-neutral-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {placing ? "Placing order..." : "Place order"}
          </button>
          <p className="text-[11px] text-neutral-400 text-center mt-3">
            Free shipping on orders above €{FREE_SHIPPING_ABOVE}
          </p>
        </aside>
      </div>
    </div>
  );
}