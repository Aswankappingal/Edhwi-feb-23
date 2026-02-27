import React, { useState } from 'react';
import './Navbar.scss';
import { FiHeart, FiShoppingBag, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Navbar = ({ setCurrentPage }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar__container">
                {/* Logo Section */}
                <div className="navbar__logo">
                    {/* // 🔹 CHANGED: div → Link */}
                    <Link
                        to="/"
                        className="navbar__logo-icon"
                        style={{ cursor: "pointer" }}
                    >
                        <img src="/Edhwi-logo.svg" alt="edhwi" />
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="navbar__links desktop-only">
                    <ul className="navbar__nav-items">
                        <li className="navbar__nav-item"><a href="#home" onClick={(e) => { e.preventDefault(); if (setCurrentPage) setCurrentPage('home'); }}>Home</a></li>
                        <li className="navbar__nav-item"><a href="#about">About Us</a></li>
                        <li className="navbar__nav-item">
                            <a href="/our-products">Our Products</a>
                        </li>
                        <li className="navbar__nav-item"><a href="#gallery">Gallery</a></li>
                    </ul>
                </div>

                {/* Right Actions */}
                <div className="navbar__actions desktop-only">
                    <div className="navbar__divider"></div>
                    <div className="navbar__action-icon">
                        <FiHeart size={22} color="#fff" strokeWidth={1.5} />
                        <span>Wishlist</span>
                    </div>
                    <div className="navbar__action-icon">
                        <div className="navbar__cart-wrapper">
                            <FiShoppingBag size={22} color="#fff" strokeWidth={1.5} />
                            <span className="navbar__cart-badge"></span>
                        </div>
                        <span>Cart</span>
                    </div>


                    <Link
                        to="/my-account"
                        className="navbar__action-icon"
                        style={{ textDecoration: "none", cursor: "pointer" }}
                    >
                        <FiUser size={22} color="#fff" strokeWidth={1.5} />
                        <span>Account</span>
                    </Link>


                    <button className="navbar__contact-btn">Contact Us</button>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="navbar__mobile-toggle mobile-only" onClick={toggleMenu}>
                    {isMenuOpen ? <FiX size={24} color="#fff" /> : <FiMenu size={24} color="#fff" />}
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div className={`navbar__mobile-menu ${isMenuOpen ? 'open' : ''}`}>
                <div className="navbar__mobile-menu-header">
                    <svg className="navbar__mobile-wave" viewBox="0 0 1440 120" preserveAspectRatio="none">
                        <path d="M0,0 L1440,0 L1440,60 C1200,100 960,20 720,60 C480,100 240,20 0,60 Z" fill="#172554" opacity="0.8" />
                        <path d="M0,0 L1440,0 L1440,40 C1200,80 960,0 720,40 C480,80 240,0 0,40 Z" fill="#1e3a8a" opacity="0.9" />
                    </svg>
                    <div className="navbar__mobile-close" onClick={toggleMenu}>
                        <FiX size={24} color="#fff" strokeWidth={1} />
                    </div>
                </div>

                <div className="navbar__mobile-content">
                    <div className="navbar__mobile-logo">
                        <div className="navbar__mobile-logo-icon" onClick={() => { toggleMenu(); if (setCurrentPage) setCurrentPage('home'); }} style={{ cursor: 'pointer' }}>
                            <img src="../../../public/Edhwi-logo.svg" alt="edhwi" />
                        </div>
                    </div>

                    <ul className="navbar__mobile-nav-items">
                        <li className="navbar__mobile-nav-item"><a href="#home" onClick={(e) => { e.preventDefault(); toggleMenu(); if (setCurrentPage) setCurrentPage('home'); }}>Home</a></li>
                        <li className="navbar__mobile-nav-item"><a href="#about" onClick={toggleMenu}>About Us</a></li>
                        <li className="navbar__mobile-nav-item"><a href="#products" onClick={toggleMenu}>Our Products</a></li>
                        <li className="navbar__mobile-nav-item"><a href="#gallery" onClick={toggleMenu}>Gallery</a></li>
                        <li className="navbar__mobile-nav-item"><a href="#wishlist" onClick={toggleMenu}>Whishlist</a></li>
                        <li className="navbar__mobile-nav-item"><a href="#cart" onClick={toggleMenu}>Cart</a></li>
                        <li className="navbar__mobile-nav-item"><a href="#account" onClick={(e) => { e.preventDefault(); toggleMenu(); if (setCurrentPage) setCurrentPage('my-account'); }}>Account</a></li>
                    </ul>

                    <button className="navbar__mobile-login-btn">Login/ Register</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
