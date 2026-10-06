export const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];

export const saveCart = (cart) =>
  localStorage.setItem("cart", JSON.stringify(cart));

export const addToCart = (id, color, size) => {
  const cart = getCart();
  const found = cart.find(
    (item) => item.id === id && item.color === color && item.size === size
  );

  if (found) {
    found.qty += 1;
  } else {
    cart.push({ id, color, size, qty: 1 });
  }

  saveCart(cart);
};