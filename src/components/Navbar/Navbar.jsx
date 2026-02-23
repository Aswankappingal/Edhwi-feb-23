import React, { useState } from 'react';
import './Navbar.scss';
import { FiHeart, FiShoppingBag, FiUser, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar__container">
                {/* Logo Section */}
                <div className="navbar__logo">
                    {/* Placeholder for Logo Image, user will provide */}
                    <div className="navbar__logo-icon">
                        <img src="../../../public/Edhwi-logo.svg" alt="no-image" />
                    </div>
                    {/* <span className="navbar__logo-text">edhwi</span> */}
                </div>

                {/* Desktop Menu */}
                <div className="navbar__links desktop-only">
                    <ul className="navbar__nav-items">
                        <li className="navbar__nav-item"><a href="#home">Home</a></li>
                        <li className="navbar__nav-item"><a href="#about">About Us</a></li>
                        <li className="navbar__nav-item"><a href="#products">Our Products</a></li>
                        <li className="navbar__nav-item"><a href="#gallery">Gallery</a></li>
                    </ul>
                </div>

                {/* Right Actions */}
                <div className="navbar__actions desktop-only">
                    <div className="navbar__action-icon">
                        <FiHeart size={20} />
                        <span>Wishlist</span>
                    </div>
                    <div className="navbar__action-icon">
                        <FiShoppingBag size={20} />
                        <span>Cart</span>
                    </div>
                    <div className="navbar__action-icon">
                        <FiUser size={20} />
                        <span>Account</span>
                    </div>
                    <button className="navbar__contact-btn">Contact Us</button>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="navbar__mobile-toggle mobile-only" onClick={toggleMenu}>
                    {isMenuOpen ? <FiX size={24} color="#fff" /> : <FiMenu size={24} color="#fff" />}
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div className={`navbar__mobile-menu ${isMenuOpen ? 'open' : ''}`}>
                <ul className="navbar__mobile-nav-items">
                    <li className="navbar__mobile-nav-item"><a href="#home">Home</a></li>
                    <li className="navbar__mobile-nav-item"><a href="#about">About Us</a></li>
                    <li className="navbar__mobile-nav-item"><a href="#products">Our Products</a></li>
                    <li className="navbar__mobile-nav-item"><a href="#gallery">Gallery</a></li>
                </ul>
                <div className="navbar__mobile-actions">
                    <div className="navbar__mobile-action-icon">
                        <FiHeart size={20} />
                        <span>Wishlist</span>
                    </div>
                    <div className="navbar__mobile-action-icon">
                        <FiShoppingBag size={20} />
                        <span>Cart</span>
                    </div>
                    <div className="navbar__mobile-action-icon">
                        <FiUser size={20} />
                        <span>Account</span>
                    </div>
                </div>
                <button className="navbar__mobile-contact-btn">Contact Us</button>
            </div>
        </nav>
    );
};

export default Navbar;
