import React, { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isHome = pathname === '/'

  return (
    <header className={`w-full ${!isHome ? 'border-b border-gray-200' : ''}`}>


      <div className='w-full hidden xl:flex justify-between px-20 py-5 items-center'>
        <div className='flex items-center'>
          <NavLink to="/" className='font-playfair font-semibold text-3xl tracking-wide'>AURÈNE</NavLink>

          <div className='font-josefin navleft text-base'>
            <NavLink to="/dresses">DRESSES</NavLink>
            <NavLink to="/tops">TOPS</NavLink>
            <NavLink to="/bags">ATELIER</NavLink>
            <NavLink to="/accessories">ACCESSORIES</NavLink>
            <NavLink to="/about">ABOUT</NavLink>
          </div>
        </div>

        <div className='flex flex-row navright mr-14'>
          <img
            src="/assets/search.webp"
            alt="wishlist"
            className='w-5 h-5 cursor-pointer'
            onClick={() => navigate('/search')}
          />          <img
            src="/assets/heart.png"
            alt="wishlist"
            className='w-5 h-5 cursor-pointer'
            onClick={() => navigate('/wishlist')}
          />
          <img
            src="/assets/bag.webp"
            alt="bag"
            className='w-5 h-5 cursor-pointer'
            onClick={() => navigate('/cart')}
          />
          <img
            src="/assets/user.webp"
            alt="bag"
            className='w-5 h-5 cursor-pointer'
            onClick={() => navigate('/account')}
          />

        </div>
      </div>


      <div className='xl:hidden w-full px-4 sm:px-8 py-4'>
        <div className='grid grid-cols-3 items-center'>

   
          <div className='flex items-center gap-4'>
            <button
              onClick={() => setOpen(!open)}
              aria-label='menu'
              className='flex flex-col justify-between w-6 h-4 cursor-pointer'
            >
              <span className='block w-full h-0.5 bg-black'></span>
              <span className='block w-full h-0.5 bg-black'></span>
              <span className='block w-full h-0.5 bg-black'></span>
            </button>
            <img src="/assets/search.webp" alt="search" className='w-5 h-5' />
          </div>


          <h1 className='font-playfair font-semibold text-xl sm:text-2xl text-center'>AURÈNE</h1>
          <div className='flex items-center justify-end gap-4'>
            <img
              src="/assets/heart.png"
              alt="wishlist"
              className='w-5 h-5 cursor-pointer'
              onClick={() => navigate('/wishlist')}
            />
            <img src="/assets/user.webp" alt="user" className='w-5 h-5' />
            <img src="/assets/bag.webp" alt="bag" className='w-5 h-5' />
          </div>
        </div>

        {/* Hamburger dropdown */}
        {open && (
          <div className='mobilemenu font-josefin'>
            <NavLink to="/dresses" onClick={() => setMenuOpen(false)}><span>DRESSES</span><span className='arrow'>&gt;</span></NavLink>
            <NavLink to="/tops" onClick={() => setMenuOpen(false)}><span>TOPS</span><span className='arrow'>&gt;</span></NavLink>
            <NavLink to="/bags" onClick={() => setMenuOpen(false)}><span>ATELIER</span><span className='arrow'>&gt;</span></NavLink>
            <NavLink to="/accessories" onClick={() => setMenuOpen(false)}><span>ACCESSORIES</span><span className='arrow'>&gt;</span></NavLink>
            <NavLink to="/" onClick={() => setMenuOpen(false)}><span>HOME</span><span className='arrow'>&gt;</span></NavLink>
            <NavLink to="/about" onClick={() => setMenuOpen(false)}><span>ABOUT</span><span className='arrow'>&gt;</span></NavLink>
          </div>
        )}
      </div>

    </header>
  )
}

export default Navbar