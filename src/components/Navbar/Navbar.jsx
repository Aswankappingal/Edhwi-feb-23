import React from 'react';
import './Navbar.scss';
import { FiHeart, FiShoppingBag, FiUser, FiMenu } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ setCurrentPage }) => {

    // 🔥 NEW: Get current route
    const location = useLocation();

    // 🔥 NEW: Check if current page is home
    const isHome = location.pathname === "/";

    return (
        <nav className={`navbar navbar-expand-lg ${isHome ? 'navbar-dark-mode' : 'navbar-light-mode'}`}>
            <div className="container-fluid px-0" style={{ maxWidth: '1440px', margin: '0 auto' }}>

                {/* Logo Section */}
                <Link
                    to="/"
                    className="navbar-brand d-flex align-items-center"
                    style={{ cursor: "pointer", width: "55px", marginRight: '2rem' }}
                >
                    <img src="/Edhwi-logo.svg" alt="edhwi" style={{ width: '100%', height: 'auto' }} />
                </Link>

                {/* Mobile Toggle */}
                <button
                    className="navbar-toggler border-0 shadow-none px-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                >
                    <FiMenu size={28} color={isHome ? "#fff" : "#000"} />
                </button>

                {/* Collapsible Content */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    {/* Center Menu */}
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0 navbar__nav-items align-items-lg-center">
                        <li className="nav-item navbar__nav-item">
                            <Link className="nav-link" to="/" style={{ color: isHome ? "#fff" : "#000" }}>
                                Home
                            </Link>
                        </li>

                        <li className="nav-item navbar__nav-item">
                            <a className="nav-link" href="#about" style={{ color: isHome ? "#fff" : "#000" }}>
                                About Us
                            </a>
                        </li>

                        <li className="nav-item navbar__nav-item">
                            <Link className="nav-link" to="/our-products" style={{ color: isHome ? "#fff" : "#000" }}>
                                Our Products
                            </Link>
                        </li>

                        <li className="nav-item navbar__nav-item">
                            <a className="nav-link" href="#gallery" style={{ color: isHome ? "#fff" : "#000" }}>
                                Gallery
                            </a>
                        </li>
                    </ul>

                    <div className="navbar__divider d-none d-lg-block"></div>

                    {/* Right Actions */}
                    <div className="d-flex align-items-lg-center justify-content-center flex-column flex-lg-row gap-4 mt-4 mt-lg-0 navbar__actions">

                        <div className="navbar__action-icon" style={{ color: isHome ? "#fff" : "#000" }}>
                            <FiHeart size={22} color={isHome ? "#fff" : "#000"} />
                            <span>Wishlist</span>
                        </div>

                        <div className="navbar__action-icon navbar__cart-wrapper" style={{ color: isHome ? "#fff" : "#000" }}>
                            <div className="position-relative d-flex align-items-center justify-content-center">
                                <FiShoppingBag size={22} color={isHome ? "#fff" : "#000"} />
                                <span className="navbar__cart-badge">0</span>
                            </div>
                            <span>Cart</span>
                        </div>

                        <Link
                            to="/my-account"
                            className="navbar__action-icon"
                            style={{ textDecoration: "none", color: isHome ? "#fff" : "#000" }}
                        >
                            <FiUser size={22} color={isHome ? "#fff" : "#000"} />
                            <span>Account</span>
                        </Link>

                        <button
                            className="navbar__contact-btn w-100 w-lg-auto mt-3 mt-lg-0 ms-lg-3"
                        >
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;