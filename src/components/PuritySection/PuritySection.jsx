import React from 'react';
import './PuritySection.scss';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const PuritySection = () => {
    return (
        <section className="purity-section">
            <div className="purity-section__container">

                {/* Left Content */}
                <div className="purity-section__content">
                    <h2 className="purity-section__title">
                        <span className="highlight">Rooted</span> in Purity. Inspired by <br className="desktop-br" />
                        <span className="highlight">Tradition.</span>
                    </h2>

                    <p className="purity-section__description">
                        Edhwi brings the purity of Kerala to your table with products inspired by timeless traditions. From premium unrefined coconut oil to traditional pickles, spices, nuts, and vermicelli, every pack delivers authentic taste, dependable quality, and thoughtful care for your family.
                    </p>

                    <div className="purity-section__features">
                        <div className="feature-card">
                            <img src="/Cup.svg" alt="Pure" className="feature-icon" />
                            <span className="feature-text">Pure</span>
                        </div>
                        <div className="feature-card">
                            <img src="/Flowers.svg" alt="Traditional" className="feature-icon" />
                            <span className="feature-text">Traditional</span>
                        </div>
                        <div className="feature-card">
                            <img src="/Flowerrs.svg" alt="Fresh" className="feature-icon" />
                            <span className="feature-text">Fresh</span>
                        </div>
                    </div>
                </div>

                {/* Right Visuals */}
                <div className="purity-section__visuals">
                    {/* Background decorations - we might adjust positioning once we see them */}
                    <div className="purity-section__visuals-wrapper">
                        <img src="/Rounded part.svg" alt="Podium" className="podium-img" />
                        <img src="/Bottle-Coconut.svg" alt="Edhwi Coconut Oil" className="bottle-img" />
                    </div>

                    <div className="purity-section__nav">
                        <button className="nav-btn" aria-label="Previous">
                            <FiChevronLeft size={20} />
                        </button>
                        <button className="nav-btn" aria-label="Next">
                            <FiChevronRight size={20} />
                        </button>
                    </div>
                </div>

                <img src="/img_greenleafe (1).svg" alt="Leaf Decoration" className="purity-section__leaf-decoration" />
            </div>
        </section>
    );
};

export default PuritySection;
