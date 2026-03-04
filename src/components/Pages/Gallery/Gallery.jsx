import React from 'react';
import './Gallery.scss';
import { FaPlay } from 'react-icons/fa';

const Gallery = () => {
    const images = [
        { id: 1, src: "/gallery7.svg", alt: "Gallery Video 1", isVideo: true },
        { id: 2, src: "/galley8.svg", alt: "Gallery Video 2", isVideo: true },
        { id: 3, src: "/gallery1.svg", alt: "Gallery Image 1" },
        { id: 4, src: "/gallery2.svg", alt: "Gallery Image 2" },
        { id: 5, src: "/gallery3.svg", alt: "Gallery Image 3" },
        { id: 6, src: "/gallery4.svg", alt: "Gallery Image 4" },
        { id: 7, src: "/gallery5.svg", alt: "Gallery Image 5" },
        { id: 8, src: "/gallery6.svg", alt: "Gallery Image 6" },

    ];

    return (
        <div className="gallery-section">
            <div className="gallery-header">
                <h3>Gallery</h3>

            </div>
            <div className="gallery-grid">
                {images.map((image) => (
                    <div key={image.id} className={`gallery-item ${image.isVideo ? 'video-item' : 'image-item'}`}>
                        <img src={image.src} alt={image.alt} />
                        {image.isVideo && (
                            <div className="play-button-overlay">
                                <button className="play-button" aria-label="Play video">
                                    <FaPlay className="play-icon" />
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
