"use client"

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if device is mobile on initial load
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is the md breakpoint in Tailwind
    };

    // Set initial state
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the about section enters the viewport
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -100px 0px' // Slightly before it enters viewport
      }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  return (
    <div 
      id="about" 
      ref={aboutRef}
      className='flex flex-col w-full h-auto relative pb-25 pt-10 md:p-24 gap-6 text-black bg-[#77481b] md:bg-white overflow-hidden'
    >
      <h3 
        className={`hidden md:block text-xl font-semibold minecraft-regular ${
          !isMobile ? `transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }` : 'opacity-100'
        }`}
      >
        Despre eveniment
      </h3>
      <div 
        className={`relative w-full h-[500px] ${
          !isMobile ? `transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }` : 'opacity-100'
        }`}
      >
        <h4 
          className={`absolute z-10 md:z-30 text-2xl text-white minecraft-regular max-w-md p-5 bg-amber-950 rounded-2xl -top-10 left-2 md:top-10 md:left-10 ${
            !isMobile ? `transform transition-all duration-1000 delay-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
            }` : 'opacity-100'
          }`}
        >
          CarteaVie ajută elevii să descopere frumusețea literaturii, prin sesiuni interactive cu autori contemporani.
        </h4>
        <Image 
          src="/images/creeper.png" 
          alt="Creeper" 
          width="200" 
          height="421" 
          className={`absolute z-20 -bottom-24 right-1 md:-bottom-5 md:-right-5 h-auto ${
            !isMobile ? `transform transition-all duration-1000 delay-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'
            }` : 'opacity-100'
          }`}
        />
        <Image 
          src="/images/gallery/image-4.jpg" 
          alt="Background" 
          fill 
          className={`object-cover object-[40%_40%] w-full h-full ${
            !isMobile ? `transition-opacity duration-1500 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }` : 'opacity-100'
          }`}
        />
      </div>
    </div>
  )
}