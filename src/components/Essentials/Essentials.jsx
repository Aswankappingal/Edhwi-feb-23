import React from 'react';
import './Essentials.scss';
import { FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi';

const Essentials = () => {
    const products = [
        { id: 1, bgColor: '#e6efff', image: 'Edhwi-packet.svg', alt: 'Pure Coconut Oil Packet' },
        { id: 2, bgColor: '#fbf3d3', image: 'Edhwi-bottle.svg', alt: 'Coconut Oil Bottle' },
        { id: 3, bgColor: '#e3f5f3', image: 'Bottle-blue.svg', alt: 'Cleaning Product Bottle' },
    ];

    return (
        <section className="essentials">
            <div className="essentials__container">
                {/* Carousel Navigation (Top Right) */}
                <div className="essentials__header-nav">
                    <button className="essentials__nav-btn" aria-label="Previous">
                        <FiChevronLeft size={20} />
                    </button>
                    <button className="essentials__nav-btn" aria-label="Next">
                        <FiChevronRight size={20} />
                    </button>
                </div>

                {/* Products Grid */}
                <div className="essentials__products-carousel">
                    {products.map(product => (
                        <div
                            key={product.id}
                            className="essentials__product-card"
                            style={{ backgroundColor: product.bgColor }}
                        >
                            {/* User will add real images later */}
                            <div className="essentials__image-wrapper">
                                <img src={`/${product.image}`} alt={product.alt} className="essentials__product-img" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Content */}
                <div className="essentials__footer">
                    <div className="essentials__footer-col">
                        <h2 className="essentials__title">
                            Pure. Authentic.<br />
                            Everyday Essentials.
                        </h2>
                    </div>

                    <div className="essentials__footer-col essentials__footer-col--desc">
                        <p className="essentials__desc">
                            Explore our finest picks — from coconut oil to pickles and vermicelli,<br className="desktop-br" />
                            crafted with tradition and care.
                        </p>
                    </div>

                    <div className="essentials__footer-col essentials__footer-col--link">
                        <a href="#all-products" className="essentials__link">
                            View all products <FiArrowRight className="arrow-icon" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Essentials;
