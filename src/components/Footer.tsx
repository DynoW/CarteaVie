"use client"

import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';

export const Footer = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 w-full px-12 py-24 md:p-24 bg-slate-950 border-t-[1px] border-slate-800">
            <div className="flex flex-col mb-12">
                <h4 className="text-4xl font-bold">
                    CarteaVie
                </h4>
                <span className="text-sm font-light">Evenimentul care transformă poveștile <br /> în experiențe interactive</span>
            </div>
            <div className="flex flex-col md:items-end items-start">
                <h4 className="text-xl font-bold mb-4">
                    Our Social Links
                </h4>
                <div className="flex gap-4">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-xl text-blue-600">
                        <FaFacebookF />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-xl text-pink-500">
                        <FaInstagram />
                    </a>
                    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-xl text-red-600">
                        <FaYoutube />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-xl text-blue-400">
                        <FaTwitter />
                    </a>
                </div>
            </div>
        </div>
    )
}
