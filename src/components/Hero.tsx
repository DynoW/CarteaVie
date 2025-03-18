"use client"

import React from 'react';
import styles from './styles.module.css';
import ArrowButton from './ui/ArrowButton';

export const Hero = () => {
  return (
    <div className="px-12 md:px-24 w-full h-screen flex flex-col py-6 justify-center bg-[url('/minecraft.png')] bg-no-repeat bg-cover bg-fixed bg-bottom">
        <p>14 Martie 2025 | Liceul Teoretic „Alexandru Ioan Cuza”</p>
        <h1 className='text-5xl md:text-8xl font-bold mt-14'>
            CarteaVie<br/>
            <span className={`${styles.textOutline} bg-clip-text text-transparent backdrop-blur-lg bg-white/20`}>2025</span>
        </h1>
        <ArrowButton onClick={() => window.location.href = '#about'}>CITEȘTE MAI MULT</ArrowButton>
    </div>
  )
}

