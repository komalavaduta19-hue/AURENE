const KEY = "recentlyViewed";
const MAX = 10;

export const getRecentlyViewed = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
};

export const addRecentlyViewed = (id) => {
  const list = getRecentlyViewed().filter((x) => x !== id);
  list.unshift(id);
  localStorage.setItem(KEY, JSON.stringify(list.slice(0, MAX)));
};

export const clearRecentlyViewed = () => localStorage.removeItem(KEY);