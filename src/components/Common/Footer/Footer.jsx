import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedinIn, FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import './Footer.scss';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__top">
                    {/* Left Section: Logo */}
                    <div className="footer__logo-container">
                        <img src="/Edhwi-logo.svg" alt="Edhwi Logo" className="footer__logo-img" />
                    </div>

                    {/* Right Section: Links Columns */}
                    <div className="footer__links-section">
                        {/* Office Column */}
                        <div className="footer__column">
                            <h3 className="footer__column-title">Office</h3>
                            <div className="footer__address">
                                <p>Thara Online Store 11/321, Thara</p>
                                <p>Appartments, Hospital Road,</p>
                                <p>Perinthalmanna, Malappuram,</p>
                                <p>Kerala, India - 679322</p>
                            </div>
                            <div className="footer__contact">
                                <p className="footer__phone">+91 8589 8585 22</p>
                                <a href="mailto:sales@edhwi.com">sales@edhwi.com</a>
                                <a href="mailto:care@edhwi.com">care@edhwi.com</a>
                            </div>
                        </div>

                        {/* Shop / Quick Links Column */}
                        <div className="footer__column">
                            <h3 className="footer__column-title">Shop</h3>
                            <ul className="footer__list">
                                <li><Link to="/our-products">Our Products</Link></li>
                                <li><a href="#about">About</a></li>
                                <li><Link to="/gallery">Gallery</Link></li>
                                <li><Link to="/blogs">Blogs</Link></li>
                                <li><a href="#faq">FAQ</a></li>
                            </ul>
                        </div>

                        {/* Help Column */}
                        <div className="footer__column">
                            <h3 className="footer__column-title">Help</h3>
                            <ul className="footer__list">
                                <li><a href="#privacy">Privacy policy</a></li>
                                <li><a href="#return">Return policy</a></li>
                                <li><a href="#shipping">Shipping policy</a></li>
                                <li><a href="#terms">Terms & Conditions</a></li>
                                <li><a href="#contact">Contact Us</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer__bottom">
                    {/* Large Brand Text */}
                    <div className="footer__brand-text-wrapper">
                        <h1 className="footer__brand-text">edhwi</h1>
                    </div>

                    {/* Socials and Copyright */}
                    <div className="footer__socials-container">
                        <div className="footer__socials">
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <FaLinkedinIn />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <FaFacebookF />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <FaInstagram />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                <FaYoutube />
                            </a>
                        </div>
                        <p className="footer__copyright">©edhwi 2024. All rights reserved.</p>
                    </div>
                </div>
            </div>

            {/* Bottom Wave Graphics */}
            <div className="footer__waves">
                <svg className="wave-svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path d="M0,60 C320,120 420,-40 1440,60 L1440,120 L0,120 Z" fill="#184BC6" opacity="0.3"></path>
                    <path d="M0,80 C280,140 500,-20 1440,80 L1440,120 L0,120 Z" fill="#0D2D8A" opacity="0.6"></path>
                    <path d="M0,100 C350,160 550,0 1440,100 L1440,120 L0,120 Z" fill="#0B1C4A"></path>
                </svg>
            </div>
        </footer>
    );
};

export default Footer;
