import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import AccessoriesSub from "./pages/AccessoriesSub";
import Checkout from "./pages/Checkout";

import Home from "./pages/Home";
import Dresses from "./pages/Dresses";
import Tops from "./pages/Tops";
import Bags from "./pages/Bags";
import Accessories from "./pages/Accessories";
import HomeCategory from "./pages/HomeCategory";
import ProductDetails from "./pages/ProductDetail";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Search from "./pages/Search";
import Account from "./pages/Account";
import About from "./pages/About";

import { Routes, Route } from "react-router-dom";
import ProductCard from "./components/ProductCard";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/" element={<Home />} />
        <Route path="/dresses" element={<Dresses />} />
        <Route path="/tops" element={<Tops />} />
        <Route path="/bags" element={<Bags />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/home" element={<HomeCategory />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<Search />} />
        <Route path="/account" element={<Account />} />
        <Route path="/about" element={<About />} />

        <Route path="/accessories/:subCategory" element={<AccessoriesSub />} />


      </Routes>
      <Footer />
      
      

    </>
  );
}

export default App

