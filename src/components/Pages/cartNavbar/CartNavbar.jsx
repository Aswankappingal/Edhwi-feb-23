import React, { useState } from 'react';
import './CartNavbar.scss';
import { FiShoppingCart, FiMenu } from 'react-icons/fi';
import { BiHomeAlt } from 'react-icons/bi';
import { BsCreditCard } from 'react-icons/bs';
import { MdVerified } from 'react-icons/md';

const CartNavbar = ({ currentStep = 'cart' }) => {
    // currentStep can be 'cart', 'address', or 'payment'
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const steps = [
        { id: 'cart', label: 'Cart', icon: <FiShoppingCart /> },
        { id: 'address', label: 'Address', icon: <BiHomeAlt /> },
        { id: 'payment', label: 'Payment', icon: <BsCreditCard /> },
    ];

    const getStepIndex = (stepId) => steps.findIndex(s => s.id === stepId);
    const currentIndex = getStepIndex(currentStep);

    return (
        <>
            <nav className="cart-navbar">
                <div className="cart-navbar-left">
                    <button className="mobile-menu-toggle d-lg-none" onClick={() => setIsMenuOpen(true)}>
                        <FiMenu size={24} color="#135cdd" />
                    </button>
                    <div className="logo-placeholder ms-2 ms-lg-0">
                        <span style={{ fontWeight: 'bold', fontSize: '1.75rem', color: '#135cdd' }}>edhwi</span>
                    </div>
                </div>

                {/* Desktop Stepper */}
                <div className="cart-navbar-center d-none d-lg-flex">
                    {steps.map((step, index) => {
                        const isActive = index === currentIndex;

                        return (
                            <React.Fragment key={step.id}>
                                <div className={`stepper-item ${isActive ? 'active' : ''}`}>
                                    <div className="step-icon-wrapper">
                                        {step.icon}
                                    </div>
                                    <span className="step-label">{step.label}</span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className="stepper-line"></div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>

                <div className="cart-navbar-right">
                    <div className="security-badge">
                        <MdVerified className="security-icon" />
                        <div className="security-text">
                            <strong>100% Secure payments,</strong>
                            <span>Shop with confidence!</span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Offcanvas Menu */}
            <div className={`offcanvas offcanvas-start ${isMenuOpen ? 'show' : ''}`} tabIndex="-1" id="cartOffcanvas" style={{ visibility: isMenuOpen ? 'visible' : 'hidden' }}>
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" style={{ fontWeight: 'bold', color: '#135cdd' }}>edhwi</h5>
                    <button type="button" className="btn-close text-reset" onClick={() => setIsMenuOpen(false)}></button>
                </div>
                <div className="offcanvas-body">
                    <div className="mobile-stepper-container">
                        {steps.map((step, index) => {
                            const isActive = index === currentIndex;
                            return (
                                <div key={step.id} className={`mobile-stepper-item ${isActive ? 'active' : ''} mb-4 d-flex align-items-center`}>
                                    <div className="step-icon-wrapper me-3" style={{ background: isActive ? '#135cdd' : '#f0f0f0', color: isActive ? 'white' : 'black', padding: '10px', borderRadius: '50%' }}>
                                        {step.icon}
                                    </div>
                                    <span className="step-label fw-bold" style={{ color: isActive ? '#135cdd' : '#666' }}>{step.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Overlay */}
            {isMenuOpen && <div className="offcanvas-backdrop fade show" onClick={() => setIsMenuOpen(false)}></div>}
        </>
    );
};

export default CartNavbar;
