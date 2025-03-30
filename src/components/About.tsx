"use client"

import React from 'react';
import Image from 'next/image';

export const About = () => {
  return (
    <div id="about" className='flex flex-col w-full h-auto relative pb-25 pt-10 md:p-24 gap-6 text-black bg-[#77481b] md:bg-white overflow-hidden'>
      <p className="hidden md:block">Despre eveniment</p>
      <div className="relative w-full h-[500px]">
        <h2 className="absolute z-10 md:z-30 text-2xl text-white minecraft-regular max-w-md p-5 bg-amber-950 rounded-2xl -top-10 left-2 md:top-10 md:left-10">
          CarteaVie ajută elevii să descopere frumusețea literaturii, prin sesiuni interactive cu autori contemporani.
        </h2>
        <Image src="/images/creeper.png" alt="Creeper" width="200" height="421" className="absolute z-20 -bottom-24 right-1 md:-bottom-5 md:-right-5 h-auto" />
        <Image src="/images/gallery/image-4.jpg" alt="Gallery Image 3" fill className="object-cover object-[40%_40%] w-full h-full" />
      </div>
    </div>
  )
}