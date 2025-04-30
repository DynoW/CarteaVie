"use client"

import React from 'react';
import Image from 'next/image';

export const Footer = () => {
    return (
        <div className="relative flex flex-col w-full px-12 py-10 md:py-20 md:p-24 bg-slate-950 border-t-[1px] border-slate-800 gap-5">
            <div className="flex flex-col md:flex-row justify-between w-full gap-5 md:gap-10">
                <div className="flex flex-col items-center text-center md:items-start md:text-start gap-2">
                    <h4 className="text-4xl font-bold">
                        CarteaVie
                    </h4>
                    <span className="text-sm font-light">
                        transformă poveștile în experiențe
                    </span>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <Image
                        src="/images/laicuza.png"
                        alt="Laicuza"
                        width={100}
                        height={100}
                        className="rounded-md"
                    />
                    <br />
                    {/* <h4 className="text-xl font-bold mb-4">
                        Our Social Links
                    </h4>
                    <div className="flex gap-4">
                        <a
                            href="https://www.facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xl text-blue-600"
                            onClick={() => trackSocialClick('facebook')}
                        >
                            <FaFacebookF />
                        </a>
                        <a
                            href="https://www.instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xl text-pink-500"
                            onClick={() => trackSocialClick('instagram')}
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="https://www.youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xl text-red-600"
                            onClick={() => trackSocialClick('youtube')}
                        >
                            <FaYoutube />
                        </a>
                        <a
                            href="https://www.twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xl text-blue-400"
                            onClick={() => trackSocialClick('twitter')}
                        >
                            <FaTwitter />
                        </a>
                    </div> */}
                </div>
            </div>

            {/* Copyright section */}
            <div className="md:mt-6 text-xs text-gray-400 md:absolute md:left-24 md:bottom-10">
                <p>© CarteaVie 2025 | Credits:</p>
                <p>Fonts: &quot;PurePixel&quot;, &quot;MadPixel&quot; (CC licensed)</p>
                <p>3D Model: <a
                    href="https://skfb.ly/6V7Qq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                    onClick={() => window.umami?.track('credit_link_click', { type: '3d_model' })}
                >Enchanting Table</a> by Brendan George</p>
                <p className="mt-2">Site dezvoltat de: <a
                    href="https://github.com/chirilad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-white"
                    onClick={() => window.umami?.track('developer_link_click', { name: 'chirila' })}
                >Chirila Daniel Ștefan</a>, <a
                    href="https://github.com/gabrielastefan"
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="underline hover:text-white"
                    onClick={() => window.umami?.track('developer_link_click', { name: 'stefan' })}
                >Ștefan Gabriela</a>, <a
                    href="https://github.com/costindobre"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-white"
                    onClick={() => window.umami?.track('developer_link_click', { name: 'dobre' })}
                >Dobre Costin</a> and <a
                    href="https://github.com/tudorcojocaru"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-white"
                    onClick={() => window.umami?.track('developer_link_click', { name: 'cojocaru' })}
                >Cojocaru Tudor</a></p>
            </div>
        </div>
    )
}