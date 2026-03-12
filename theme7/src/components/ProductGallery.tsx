'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './ProductGallery.module.css';

interface ProductGalleryProps {
    images: string[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
    const [activeImg, setActiveImg] = useState(0);
    const [zoomPos, setZoomPos] = useState({ x: 0, y: 0, show: false });
    const mainImgRef = useRef<HTMLDivElement>(null);

    const nextImg = () => setActiveImg((prev) => (prev + 1) % images.length);
    const prevImg = () => setActiveImg((prev) => (prev - 1 + images.length) % images.length);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!mainImgRef.current) return;
        const { left, top, width, height } = mainImgRef.current.getBoundingClientRect();
        const x = ((e.pageX - left - window.scrollX) / width) * 100;
        const y = ((e.pageY - top - window.scrollY) / height) * 100;
        setZoomPos({ x, y, show: true });
    };

    return (
        <div className={styles.gallery}>
            <div
                className={styles.mainImageWrapper}
                ref={mainImgRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setZoomPos({ ...zoomPos, show: false })}
            >
                <Image
                    src={images[activeImg]}
                    alt="Product Image"
                    fill
                    style={{
                        objectFit: 'contain',
                        transform: zoomPos.show ? `scale(1.5)` : 'scale(1)',
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`
                    }}
                    className={styles.mainImage}
                />

                <button className={`${styles.navBtn} ${styles.prev}`} onClick={prevImg}>
                    <ChevronLeft size={24} />
                </button>
                <button className={`${styles.navBtn} ${styles.next}`} onClick={nextImg}>
                    <ChevronRight size={24} />
                </button>
            </div>

            <div className={styles.thumbnails}>
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`${styles.thumb} ${activeImg === index ? styles.activeThumb : ''}`}
                        onClick={() => setActiveImg(index)}
                    >
                        <Image
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            width={80}
                            height={80}
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductGallery;
