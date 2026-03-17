import React from 'react';
import Navbar from '../../Navbar/Navbar';
import './Aboutus.scss';

const Aboutus = () => {
    return (
        <div className="about-us-page">
            <Navbar />

            {/* 1. Hero Section */}
            <section className="about-hero">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5 about-hero__content">
                            <h1 className="about-hero__title">
                                Crafted by Nature, <br />
                                perfected by purpose
                            </h1>
                            <p className="about-hero__description">
                                At Edhwi, we believe nature holds the purest answers to modern needs. Rooted in Kerala’s rich coconut heritage, we create products that blend traditional wisdom with sustainable innovation.
                            </p>
                        </div>
                        <div className="col-lg-7 about-hero__collage">
                            <div className="collage-grid">
                                {/* Background Roller */}
                                <div className="background-roller">
                                    <img src="/Images/background roller.svg" alt="Background Swirl" />
                                </div>
                                <div className="collage-item item-green">
                                    <img src="/Images/coc-baby.svg" alt="Green coconuts" />
                                </div>
                                <div className="collage-item item-workers">
                                    <img src="/Images/Coconut-lights.svg" alt="Workers" />
                                </div>
                                <div className="collage-item item-bw">
                                    <img src="/Images/black-white.svg" alt="Black and white" />
                                </div>
                                <div className="collage-item item-split">
                                    <img src="/Images/Coconut-muri.svg" alt="Split coconut" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Visual Border Accent */}
                <div className="hero-border-accent"></div>
            </section>

            {/* 2. Product Showcase */}
            <section className="about-products">
                <div className="container text-center">
                    <img src="/Images/coconut-graphics-removebg-preview.png" alt="Edhwi Products" className="main-product-img" />
                </div>
            </section>

            {/* 3. Innovation Section */}
            <section className="about-innovation">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 about-innovation__images">
                            <div className="innovation-grid">
                                <div className="innovation-item innovation-item--vertical">
                                    <img src="/Images/Edhwi-tree.svg" alt="Nature" />
                                </div>
                                <div className="innovation-item innovation-item--large">
                                    <img src="/Images/Coconut-s.svg" alt="Innovation" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 about-innovation__content">
                            <h2 className="innovation-title">
                                Innovating <br />
                                Through Nature
                            </h2>
                            <p className="innovation-description">
                                We combine traditional wisdom with modern innovation to ensure
                                that you receive the best nature has to offer. Our sustainable
                                practices and commitment to purity are at the heart of everything we do.
                            </p>
                            <button className="btn-know-more">
                                Know more
                            </button>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Aboutus;
