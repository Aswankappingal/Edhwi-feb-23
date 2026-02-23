import React from 'react';
import './HomeBanner.scss';
import Navbar from '../Navbar/Navbar';

const HomeBanner = () => {
    return (
        <div className="home-banner">
            {/* Background Image Overlay */}
            <div className="home-banner__overlay"></div>

            {/* The Navbar sits on top of the banner */}
            <Navbar />

            {/* Main Content Area */}
            <div className="home-banner__content">
                <div className="home-banner__text-container">
                    <h6 className="home-banner__title">
                        Kerala's authentic taste<br />
                        in every pack
                    </h6>
                    <p className="home-banner__subtitle">
                        Kerala flavours that make every bite feel warm,<br className="desktop-only" />
                        homely, and truly satisfying.
                    </p>
                </div>
            </div>

            {/* Carousel Indicators (Mockup) */}
            <div className="home-banner__indicators">
                <span className="home-banner__indicator active"></span>
                <span className="home-banner__indicator"></span>
                <span className="home-banner__indicator"></span>
            </div>
        </div>
    );
};

export default HomeBanner;
