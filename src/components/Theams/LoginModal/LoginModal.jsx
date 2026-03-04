import React from 'react';
import './LoginModal.scss';
import { FiX } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

const LoginModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="login-modal-overlay" onClick={onClose}>
            <div className="login-modal-content" onClick={(e) => e.stopPropagation()}>

                {/* Left Side: Image */}
                <div className="login-modal__image-wrapper">
                    <img
                        src="/Login-modal-IM.svg"
                        alt="Edhwi Coconuts"
                        className="login-modal__image"
                    />
                </div>

                {/* Right Side: Form */}
                <div className="login-modal__form-wrapper">
                    <button className="login-modal__close" onClick={onClose} aria-label="Close modal">
                        <FiX />
                    </button>

                    <div className="login-modal__header">
                        <h2><span className="text-blue">Welcome</span> back!</h2>
                        <p>Your account for everything Edhwi</p>
                    </div>

                    <form className="login-modal__form">
                        <div className="form-group">
                            <label htmlFor="loginId">Enter Mobile Number / Email*</label>
                            <input
                                type="text"
                                id="loginId"
                                placeholder="Email or Mobile"
                                className="form-control"
                            />
                        </div>

                        <button type="submit" className="login-modal__submit-btn">
                            Continue
                        </button>
                    </form>

                    <div className="login-modal__divider">
                        <span>OR</span>
                    </div>

                    <div className="login-modal__social-logins">
                        <button className="social-btn google-btn">
                            <FcGoogle size={20} className="social-icon" />
                            Continue with Google
                        </button>
                        <button className="social-btn facebook-btn">
                            <FaFacebook size={20} color="#1877F2" className="social-icon" />
                            Continue with Facebook
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
