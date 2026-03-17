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
                                At Edhwi, we believe in the purity of nature. Our journey began with a simple mission: 
                                to bring the authentic, traditional flavors of Kerala to your table. 
                                From handpicked coconuts to time-honored recipes, every product tells a story of quality and care.
                            </p>
                        </div>
                        <div className="col-lg-7 about-hero__collage">
                            <div className="collage-grid">
                                <div className="collage-item collage-item--main">
                                    <img src="/Images/gallery4.svg" alt="Natural source" />
                                </div>
                                <div className="collage-item collage-item--top-right">
                                    <img src="/Images/Coconut-green.svg" alt="Fresh coconut" />
                                </div>
                                <div className="collage-item collage-item--mid-right">
                                    <img src="/Images/Coconut-dry.svg" alt="Coconuts" />
                                </div>
                                <div className="collage-item collage-item--bottom-right">
                                    <img src="/Images/Second.svg" alt="Split coconut" />
                                </div>
                                {/* Leaf Overlay */}
                                <div className="leaf-overlay">
                                    <img src="/Images/img_greenleafe (1).svg" alt="" />
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
                    <div className="product-display-wrapper">
                        <img src="/Images/Group-bottles.svg" alt="Edhwi Products" className="main-product-img" />
                        {/* Static Accents around the products */}
                        <div className="product-accent product-accent--left">
                            <img src="/Images/success-coconut.svg" alt="" />
                        </div>
                        <div className="product-accent product-accent--right">
                            <img src="/Images/Coconut.svg" alt="" />
                        </div>
                    </div>
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