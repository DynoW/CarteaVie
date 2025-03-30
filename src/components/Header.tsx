"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './styles.module.css';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isRotated, setIsRotated] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    window.umami?.track('toggle_mobile_menu', { state: !mobileMenuOpen ? 'open' : 'close' });
  };

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 40) {
        // Scrolling down & past initial threshold
        setIsVisible(false);
      } else {
        // Scrolling up or at top
        setIsVisible(true);
      }

      // Control logo rotation
      if (currentScrollY > 100) {
        setIsRotated(true);
      } else {
        setIsRotated(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  // Enhanced smooth scroll function with tracking
  const handleScroll = (
    event: React.UIEvent<HTMLDivElement> |
      React.MouseEvent<HTMLAnchorElement> |
      React.MouseEvent<HTMLSpanElement>,
    targetId: string,
  ) => {
    event.preventDefault();

    // Track navigation event
    window.umami?.track('navigation_click', {
      target: targetId,
      isMobile: window.innerWidth < 768
    });

    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Custom smooth scroll implementation for better browser support
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      const duration = 1000; // ms
      let start: number | null = null;

      function step(timestamp: number) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const easeInOutQuad = (t: number): number => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

        window.scrollTo(0, startPosition + distance * easeInOutQuad(Math.min(progress / duration, 1)));

        if (progress < duration) {
          window.requestAnimationFrame(step);
        }
      }

      window.requestAnimationFrame(step);
    }

    // Close mobile menu when a link is clicked
    if (mobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  return (
    <>
      {/* Mobile Navbar */}
      <div className={`fixed top-0 left-0 right-0 z-50 md:hidden transform transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex items-center justify-between p-4 ">
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
          className={`fixed top-0 right-0 h-screen w-64 bg-white text-black shadow-lg transform transition-transform duration-300 ease-in-out z-20 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div className="flex flex-col items-start pt-20 px-6">
            <span onClick={(event) => handleScroll(event, 'top')} className="py-4 px-2 hover:text-gray-600 font-medium border-b border-gray-200 w-full cursor-pointer">Acasă</span>
            <span onClick={(event) => handleScroll(event, 'about')} className="py-4 px-2 hover:text-gray-600 font-medium border-b border-gray-200 w-full cursor-pointer">Despre</span>
            {/* <span onClick={(event) => handleScroll(event, 'schedule')} className="py-4 px-2 hover:text-gray-600 font-medium border-b border-gray-200 w-full cursor-pointer">Program</span> */}
            {/* <span onClick={(event) => handleScroll(event, 'speakers')} className="py-4 px-2 hover:text-gray-600 font-medium border-b border-gray-200 w-full cursor-pointer">Speakeri</span> */}
            <span onClick={(event) => handleScroll(event, 'gallery')} className="py-4 px-2 hover:text-gray-600 font-medium w-full cursor-pointer">Galerie</span>
          </div>
        </div>

        {/* Overlay when menu is open */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 h-screen bg-black/50 md:hidden"
            onClick={toggleMobileMenu}
            aria-hidden="true"
          ></div>
        )}
      </div>

      {/* Desktop Navbar */}
      <nav className='hidden fixed w-[88vw] top 10px mx-auto py-5 md:flex flex-col gap-5 md:flex-row justify-end items-center z-50 bg-transparent'>
        <div className={`${styles.logoContainer} ${isRotated ? styles.logoRotated : ''}`}>
          <h1 className={`${styles.logoHeading} text-3xl font-bold mix-blend-difference drop-shadow-xl transition-all duration-500`}>
            CarteaVie
          </h1>
        </div>
        <div className='flex px-6 py-4 justify-center bg-white/60 backdrop-blur-lg rounded-full text-slate-900 font-semibold text-sm'>
          <ul className='flex flex-nowrap gap-5'>
            <li>
              <Link href="#" passHref>
                <span onClick={(event) => handleScroll(event, 'top')}>Acasă</span>
              </Link>
            </li>
            <li>
              <Link href="#about" passHref>
                <span onClick={(event) => handleScroll(event, 'about')}>Despre</span>
              </Link>
            </li>
            {/* <li>
              <Link href="#schedule" passHref>
                <span onClick={(event) => handleScroll(event, 'schedule')}>Program</span>
              </Link>
            </li> */}
            {/* <li>
              <Link href="#speakers" passHref>
                <span onClick={(event) => handleScroll(event, 'speakers')}>Speakeri</span>
              </Link>
            </li> */}
            <li>
              <Link href="#gallery" passHref>
                <span onClick={(event) => handleScroll(event, 'gallery')}>Galerie</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}