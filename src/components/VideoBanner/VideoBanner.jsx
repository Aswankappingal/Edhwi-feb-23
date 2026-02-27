import React from 'react';
import './VideoBanner.scss';
import { FaPlay } from 'react-icons/fa';

const VideoBanner = () => {
    return (
        <section className="video-banner">
            <div className="video-banner__container">
                {/* Left Video Item (Blue Gradient) */}
                <div className="video-banner__item">
                    {/* Placeholder image background - update with actual video later */}
                    <div
                        className="video-banner__background"
                        style={{ backgroundImage: 'url("/Edhwi-women.svg")' }}
                    ></div>
                    <div className="video-banner__overlay video-banner__overlay--blue"></div>

                    <div className="video-banner__content">
                        <button className="video-banner__play-btn" aria-label="Play video">
                            <FaPlay className="video-banner__play-icon" />
                        </button>
                        {/* <p className="video-banner__text">
                            Currently we're one of the few brands which produce pure & natural unrefined coconut oil.
                        </p> */}
                    </div>
                </div>

                {/* Right Video Item (Yellow Gradient) */}
                <div className="video-banner__item">
                    {/* Placeholder image background - update with actual video later */}
                    <div
                        className="video-banner__background"
                        style={{ backgroundImage: 'url("/Yellow-image.svg")' }}
                    ></div>
                    <div className="video-banner__overlay video-banner__overlay--yellow"></div>

                    <div className="video-banner__content">
                        <button className="video-banner__play-btn" aria-label="Play video">
                            <FaPlay className="video-banner__play-icon" />
                        </button>
                        {/* <p className="video-banner__text">
                            Currently we're one of the few brands which produce pure & natural unrefined coconut oil.
                        </p> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoBanner;
