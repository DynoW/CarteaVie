"use client"

import React, { useState } from 'react';
import styles from './styles.module.css';
import ArrowButton from './ui/ArrowButton';

export const Hero = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="relative px-12 md:px-24 w-full h-screen flex flex-col py-6 pt-62 md:pt-0 md:justify-center bg-[url('/minecraft.png')] bg-no-repeat bg-cover bg-fixed bg-bottom">
      {/* Mobile Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div className="flex items-center justify-between p-4">
          <div className="text-xl font-bold">CarteaVie</div>
          <button 
            onClick={toggleMobileMenu}
            className="p-2 focus:outline-none z-50 relative"
          >
            <div className={`w-6 h-0.5 ${mobileMenuOpen ? 'bg-black rotate-45 translate-y-2' : 'bg-white'} mb-1.5 transition-all duration-300`}></div>
            <div className={`w-6 h-0.5 ${mobileMenuOpen ? 'bg-black opacity-0' : 'bg-white'} mb-1.5 transition-all duration-300`}></div>
            <div className={`w-6 h-0.5 ${mobileMenuOpen ? 'bg-black -rotate-45 -translate-y-2' : 'bg-white'} transition-all duration-300`}></div>
          </button>
        </div>
        
        {/* Mobile Menu - Side Sliding */}
        <div 
          className={`fixed top-0 right-0 h-full w-64 bg-white text-black shadow-lg transform transition-transform duration-300 ease-in-out z-20 ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col items-start pt-20 px-6">
            <a href="#about" className="py-4 px-2 hover:text-gray-600 font-medium border-b border-gray-200 w-full" onClick={toggleMobileMenu}>Despre</a>
            <a href="#schedule" className="py-4 px-2 hover:text-gray-600 font-medium border-b border-gray-200 w-full" onClick={toggleMobileMenu}>Program</a>
            <a href="#speakers" className="py-4 px-2 hover:text-gray-600 font-medium border-b border-gray-200 w-full" onClick={toggleMobileMenu}>Speakeri</a>
            <a href="#contact" className="py-4 px-2 hover:text-gray-600 font-medium w-full" onClick={toggleMobileMenu}>Contact</a>
          </div>
        </div>
        
        {/* Overlay when menu is open */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-10 md:hidden"
            onClick={toggleMobileMenu}
            aria-hidden="true"
          ></div>
        )}
      </div>

      <p>14 Martie 2025 | Liceul Teoretic &bdquo;Alexandru Ioan Cuza&rdquo;</p>
      <h1 className='text-5xl md:text-8xl font-bold mt-14'>
          CarteaVie<br/>
          <span className={`${styles.textOutline} bg-clip-text text-transparent backdrop-blur-lg bg-white/20`}>2025</span>
      </h1>
      <ArrowButton onClick={() => window.location.href = '#about'}>CITEȘTE MAI MULT</ArrowButton>
    </div>
  )
}