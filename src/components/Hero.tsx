"use client"

import React, { useState, useEffect, useMemo } from 'react';
import styles from './styles.module.css';
import ArrowButton from './ui/ArrowButton';
import EnchantingTable from './EnchantingTable';

// Animation configuration constants
const TYPING_CONFIG = {
  NORMAL_TYPING_SPEED: 200,
  DELETION_SPEED: 75,
  FIRST_WORD_BLINK_DELAY: 0,
  SECOND_WORD_BLINK_DELAY: 0,
  DELETION_DELAY: 3000,
  DELETION_BLINK_DELAY: 500,
};

// Scroll animation configuration
const SCROLL_CONFIG = {
  DURATION: 1000,
};

export const Hero = () => {
  // Words to animate between
  const words = useMemo(() => ["Vie", "2025"], []);
  
  // Typing animation states
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [isTyping, setIsTyping] = useState(true); // Track active typing state
  const [typingSpeed, setTypingSpeed] = useState(TYPING_CONFIG.NORMAL_TYPING_SPEED);
  
  // Setup typing animation with loop
  useEffect(() => {
    const handleTyping = () => {
      setIsTyping(true); // Set cursor to solid when actively typing
      
      setDisplayText(prev => {
        // Current full word
        const word = words[loopNum % words.length];
        const isSecondWord = loopNum % words.length === 1; // Check if word is "2025"
        
        // If deleting, remove a character
        if (isDeleting) {
          const newText = word.substring(0, prev.length - 1);
          
          // If deleted everything, switch to typing mode and next word
          if (newText === '') {
            setIsDeleting(false);
            setTypingSpeed(TYPING_CONFIG.NORMAL_TYPING_SPEED);
            setLoopNum(loopNum + 1);
            // Keep cursor solid for a moment after deletion completes
            setTimeout(() => {
              setIsTyping(false); // Start blinking after deletion completes
            }, TYPING_CONFIG.DELETION_BLINK_DELAY);
          }
          
          return newText;
        } 
        // If typing, add a character
        else {
          const newText = word.substring(0, prev.length + 1);
          
          // If finished typing, wait longer then delete
          if (newText === word) {
            // Use shorter wait times for "2025"
            const cursorBlinkDelay = isSecondWord ? 
              TYPING_CONFIG.SECOND_WORD_BLINK_DELAY : 
              TYPING_CONFIG.FIRST_WORD_BLINK_DELAY;
            
            // Keep cursor solid briefly after finishing typing
            setTimeout(() => {
              setIsTyping(false); // Set cursor to blinking during pause
              // Wait before starting to delete
              setTimeout(() => setIsDeleting(true), TYPING_CONFIG.DELETION_DELAY);
            }, cursorBlinkDelay);
            
            setTypingSpeed(TYPING_CONFIG.DELETION_SPEED);
          }
          
          return newText;
        }
      });
    };
    
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, typingSpeed, words]);

  // Enhanced smooth scroll function
  const handleScroll = (event: React.MouseEvent, targetId: string) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      
      let start: number | null = null;
      
      function step(timestamp: number) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const easeInOutQuad = (t: number): number => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        
        window.scrollTo(0, startPosition + distance * easeInOutQuad(Math.min(progress / SCROLL_CONFIG.DURATION, 1)));
        
        if (progress < SCROLL_CONFIG.DURATION) {
          window.requestAnimationFrame(step);
        }
      }
      
      window.requestAnimationFrame(step);
    }
  };

  return (
    <div id="top" className="relative px-12 md:px-24 w-full h-screen flex flex-col py-6 pt-48 md:pt-0 md:justify-center bg-[url('/images/mine.png')] bg-no-repeat bg-cover md:bg-fixed bg-scroll bg-bottom">
      <p className="font-sans">14 Martie 2025 | Liceul Teoretic &bdquo;Alexandru Ioan Cuza&rdquo;</p>
      <h1 className="minecraft-bold text-5xl md:text-8xl font-bold mt-14">
        <div className='font-minecraft'>Cartea</div>
        <div className="h-[1.2em] min-h-[1.2em]">
          <span className={`${styles.typingAnimation} ${loopNum % words.length !== 0 ? `${styles.textOutline} bg-clip-text text-transparent backdrop-blur-lg bg-white/20` : ''}`}>
            {displayText}
            <span className={`${styles.cursor} ${isTyping ? styles.cursorTyping : styles.cursorIdle}`}></span>
          </span>
        </div>
      </h1>
      <ArrowButton onClick={(e) => handleScroll(e, 'about')} className="z-40 relative font-minecraft">CITEȘTE MAI MULT</ArrowButton>
      <EnchantingTable />
    </div>
  )
}