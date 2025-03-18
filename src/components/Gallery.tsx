"use client";

import React, { useState } from 'react';
import styles from './styles.module.css';
import Image from 'next/image';

export const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    
    const galleryImages = [''];
    
    const openImage = (index: number) => {
        setSelectedImage(index);
        // Reset zoom when opening new image
        setScale(1);
        setPosition({ x: 0, y: 0 });
    };
    
    const closeModal = () => setSelectedImage(null);
    
    const navigate = (direction: 'prev' | 'next') => {
        if (selectedImage === null) return;
        
        // Reset zoom when navigating
        setScale(1);
        setPosition({ x: 0, y: 0 });
        
        if (direction === 'prev') {
            setSelectedImage(prev => prev !== null && prev === 0 ? galleryImages.length - 1 : prev !== null ? prev - 1 : 0);
        } else {
            setSelectedImage(prev => prev !== null && prev === galleryImages.length - 1 ? 0 : prev !== null ? prev + 1 : 0);
        }
    };
    
    const handleMouseDown = () => {
        setIsDragging(true);
    };
    
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        setPosition({
            x: position.x + e.movementX,
            y: position.y + e.movementY
        });
    };
    
    const handleMouseUp = () => {
        setIsDragging(false);
    };
    
    const handleZoom = (e: React.WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        setScale(prev => Math.min(Math.max(0.5, prev + delta), 3));
    };

    return (
        <div id="gallery" className='bg-amber-950 flex flex-col w-full h-auto relative px-12 py-24 md:p-24 gap-6 overflow-hidden'>
            <p>Galerie foto</p>
            <h2 className='text-2xl md:text-4xl w-full md:max-w-3xl '>
                Experience the magic of past festivals with our special photo gallery.
            </h2>
            <div className={`${styles.galleryBox} columns-2 md:columns-3`}>
                {galleryImages.map((src, index) => (
                    <Image 
                    key={index}
                    alt={`gallery ${index + 1}`} 
                    src={src}
                    className={`mb-4 cursor-pointer hover:opacity-90 transition-opacity`}
                    onClick={() => openImage(index)}
                    width={500}
                    height={500}
                />
                ))}
            </div>
            
            {/* Image Modal */}
            {selectedImage !== null && (
                <div className={styles.modal} onClick={closeModal}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={closeModal}>&times;</button>
                        
                        <div 
                            className={styles.imageContainer}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            onWheel={handleZoom}
                        >
                            <Image 
                                src={galleryImages[selectedImage]} 
                                alt={`Gallery ${selectedImage + 1}`}
                                style={{
                                    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                                    cursor: isDragging ? 'grabbing' : 'grab'
                                }}
                                className={styles.modalImage}
                                onDoubleClick={() => {
                                    setScale(1);
                                    setPosition({ x: 0, y: 0 });
                                }}
                                width={800}
                                height={600}
                            />
                        </div>
                        
                        <div className={styles.navigation}>
                            <button onClick={() => navigate('prev')}>&larr; Previous</button>
                            <span>{selectedImage + 1} / {galleryImages.length}</span>
                            <button onClick={() => navigate('next')}>Next &rarr;</button>
                        </div>
                        
                        <div className={styles.zoomControls}>
                            <button onClick={() => setScale(prev => Math.max(0.5, prev - 0.1))}>-</button>
                            <span>{Math.round(scale * 100)}%</span>
                            <button onClick={() => setScale(prev => Math.min(3, prev + 0.1))}>+</button>
                            <button onClick={() => {
                                setScale(1);
                                setPosition({ x: 0, y: 0 });
                            }}>Reset</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}