"use client"

import React from 'react';
import styles from './styles.module.css';
import ArrowButton from './ui/ArrowButton';

export const Hero = () => {
  // Enhanced smooth scroll function
  const handleScroll = (event: React.MouseEvent, targetId: string) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
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
  };

  return (
    <div id="top" className="relative px-12 md:px-24 w-full h-screen flex flex-col py-6 pt-62 md:pt-0 md:justify-center bg-[url('/minecraft.png')] bg-no-repeat bg-cover md:bg-fixed bg-scroll bg-bottom">
      <p>14 Martie 2025 | Liceul Teoretic &bdquo;Alexandru Ioan Cuza&rdquo;</p>
      <h1 className='text-5xl md:text-8xl font-bold mt-14'>
          CarteaVie<br/>
          <span className={`${styles.textOutline} bg-clip-text text-transparent backdrop-blur-lg bg-white/20`}>2025</span>
      </h1>
      <ArrowButton onClick={(e) => handleScroll(e, 'about')} className="z-40 relative">CITEȘTE MAI MULT</ArrowButton>
    </div>
  )
}