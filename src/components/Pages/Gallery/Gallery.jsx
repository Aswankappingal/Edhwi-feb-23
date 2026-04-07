import React, { useState } from 'react';
import './Gallery.scss';
import { FaPlay } from 'react-icons/fa';
import Navbar from '../../Navbar/Navbar';

const Gallery = () => {
    const [playingVideo, setPlayingVideo] = useState(null);

    const images = [
        { id: 1, src: "/Images/gallery7.svg", alt: "Gallery Video 1", isVideo: true, videoId: "-iCPxPQcxZw" },
        { id: 2, src: "/Images/galley8.svg", alt: "Gallery Video 2", isVideo: true, videoId: "lKtAO_3Lz-Y" },
        { id: 3, src: "/Images/gallery1.svg", alt: "Gallery Image 1" },
        { id: 4, src: "/Images/gallery2.svg", alt: "Gallery Image 2" },
        { id: 5, src: "/Images/gallery3.svg", alt: "Gallery Image 3" },
        { id: 6, src: "/Images/gallery4.svg", alt: "Gallery Image 4" },
        { id: 7, src: "/Images/gallery5.svg", alt: "Gallery Image 5" },
        { id: 8, src: "/Images/gallery6.svg", alt: "Gallery Image 6" },

    ];

    const handlePlay = (id) => {
        setPlayingVideo(id);
    };

    return (
        <>
            <Navbar />
            <div className="gallery-section">
                <div className="gallery-header">
                    <h3>Gallery</h3>

                </div>
                <div className="gallery-grid">
                    {images.map((image) => (
                        <div 
                            key={image.id} 
                            className={`gallery-item ${image.isVideo ? 'video-item' : 'image-item'}`}
                            onClick={() => image.isVideo && handlePlay(image.id)}
                        >
                            {playingVideo === image.id && image.isVideo ? (
                                <div className="video-wrapper">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${image.videoId}?autoplay=1&rel=0`}
                                        title={`Video ${image.id}`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                    <button 
                                        className="close-video-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setPlayingVideo(null);
                                        }}
                                    >
                                        &times;
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <img src={image.src} alt={image.alt} />
                                    {image.isVideo && (
                                        <div className="play-button-overlay">
                                            <button className="play-button" aria-label="Play video">
                                                <FaPlay className="play-icon" />
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Gallery;
