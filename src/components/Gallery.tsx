"use client"

import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import Image from 'next/image';

export const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);

    // Add effect to manage body scroll
    useEffect(() => {
        if (selectedImage !== null) {
            // Disable scrolling when modal is open
            document.body.style.overflow = 'hidden';
        } else {
            // Re-enable scrolling when modal is closed
            document.body.style.overflow = 'auto';
        }

        // Cleanup function to re-enable scrolling if component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [selectedImage]);

    const galleryImages: string[] = [
        '/images/gallery/image-1.jpg',
        // '/images/gallery/image-2.jpg',
        '/images/gallery/image-3.jpg',
        // '/images/gallery/image-4.jpg',
        // '/images/gallery/image-5.jpg',
        '/images/gallery/image-6.jpg',
        '/images/gallery/image-7.jpg',
        '/images/gallery/image-8.jpg',
        // '/images/gallery/image-9.jpg',
        // '/images/gallery/image-10.jpg',
        // '/images/gallery/image-11.jpg',
        '/images/gallery/image-12.jpg',
    ];

    const openImage = (index: number) => {
        setSelectedImage(index);
        // Reset zoom when opening new image
        setScale(1);
        setPosition({ x: 0, y: 0 });
        // Track gallery image open
        window.umami?.track('gallery_image_open', { imageIndex: index });
    };

    const closeModal = () => {
        setSelectedImage(null);
        // Track modal close
        window.umami?.track('gallery_modal_close');
    };

    const navigate = (direction: 'prev' | 'next') => {
        if (selectedImage === null) return;

        // Reset zoom when navigating
        setScale(1);
        setPosition({ x: 0, y: 0 });

        const nextIndex = direction === 'prev'
            ? (selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1)
            : (selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1);

        setSelectedImage(nextIndex);

        // Track gallery navigation
        window.umami?.track('gallery_navigate', {
            direction,
            fromImage: selectedImage,
            toImage: nextIndex
        });
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

    // Add tracking to zoom controls
    const handleZoomIn = () => {
        const newScale = Math.min(3, scale + 0.1);
        setScale(newScale);
        window.umami?.track('gallery_zoom', { action: 'zoom_in', newScale });
    };

    const handleZoomOut = () => {
        const newScale = Math.max(0.5, scale - 0.1);
        setScale(newScale);
        window.umami?.track('gallery_zoom', { action: 'zoom_out', newScale });
    };

    const handleReset = () => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
        window.umami?.track('gallery_zoom', { action: 'reset' });
    };

    return (
        <div id="gallery" className='bg-amber-950 flex flex-col w-full h-auto relative px-12 py-24 md:p-24 gap-6 overflow-hidden'>
            <p>Galerie foto</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {galleryImages.length > 0 ? (
                    galleryImages.map((src, index) => (
                        <div key={index} className="w-full aspect-square relative">
                            <Image
                                alt={`gallery ${index + 1}`}
                                src={src}
                                className={`object-cover cursor-pointer hover:opacity-90 transition-opacity`}
                                onClick={() => openImage(index)}
                                fill
                                sizes="(max-width: 768px) 50vw, 33vw"
                                draggable="false"
                                onDragStart={(e) => e.preventDefault()}
                            />
                        </div>
                    ))
                ) : (
                    <p>Nu sunt imagini disponibile</p>
                )}
            </div>

            {/* Image Modal */}
            {galleryImages.length > 0 && selectedImage !== null && (
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
                                draggable="false"
                                onDragStart={(e) => e.preventDefault()}
                            />
                        </div>

                        <div className={styles.navigation}>
                            <button onClick={() => navigate('prev')}>&larr; Previous</button>
                            <span>{selectedImage + 1} / {galleryImages.length}</span>
                            <button onClick={() => navigate('next')}>Next &rarr;</button>
                        </div>

                        <div className={styles.zoomControls}>
                            <button onClick={handleZoomOut}>-</button>
                            <span>{Math.round(scale * 100)}%</span>
                            <button onClick={handleZoomIn}>+</button>
                            <button onClick={handleReset}>Reset</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}