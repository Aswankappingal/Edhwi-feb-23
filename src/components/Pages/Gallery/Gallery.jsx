import React from 'react';
import './Gallery.scss';

const Gallery = () => {
    const images = [
        { id: 1, src: "/gallery1.svg", alt: "Gallery Image 1" },
        { id: 2, src: "/gallery2.svg", alt: "Gallery Image 2" },
        { id: 3, src: "/gallery3.svg", alt: "Gallery Image 3" },
        { id: 4, src: "/gallery4.svg", alt: "Gallery Image 4" },
        { id: 5, src: "/gallery5.svg", alt: "Gallery Image 5" },
        { id: 6, src: "/gallery6.svg", alt: "Gallery Image 6" },
    ];

    return (
        <div className="gallery-section">
            <div className="gallery-header">
                <h2>Gallery</h2>

            </div>
            <div className="gallery-grid">
                {images.map((image) => (
                    <div key={image.id} className="gallery-item">
                        <img src={image.src} alt={image.alt} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
