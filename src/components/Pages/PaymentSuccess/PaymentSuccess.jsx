import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdDone } from 'react-icons/md';
import './PaymentSuccess.scss';
import coconutFooter from '../../../../public/success-coconut.svg';

const PaymentSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Data passed from Payment.jsx after successful order
    // Fallback to static data if navigated directly for testing the design
    const { orderId, totalAmount, paymentMethod } = location.state || {
        orderId: '341234566',
        totalAmount: 15600,
        paymentMethod: 'online'
    };

    return (
        <div className="payment-success-wrapper">
            <div className="payment-success-content">
                <div className="success-icon-container">
                    <div className="icon-outer-circle">
                        <div className="icon-inner-circle">
                            <MdDone className="check-icon" />
                        </div>
                    </div>
                </div>

                <h1 className="success-heading">
                    <span className="text-blue">Payment</span> <span className="text-dark">Successful!</span>
                </h1>

                <div className="order-details">
                    <p className="detail-label">Order ID:</p>
                    <h2 className="detail-value">{orderId || 'N/A'}</h2>

                    <p className="detail-row">Total Amount: <strong>₹{totalAmount || 0}</strong></p>
                    <p className="detail-row">Payment Method: <strong>{paymentMethod === 'online' ? 'UPI' : 'Cash on Delivery'}</strong></p>
                </div>

                <div className="action-buttons">
                    <button className="btn-outline" onClick={() => navigate('/my-account')}>
                        My Orders
                    </button>
                    <button className="btn-solid" onClick={() => navigate('/our-products')}>
                        Continue shopping
                    </button>
                </div>
            </div>

            <div className="footer-image-section">
                <img src="/success-coconut.svg" alt="Coconut" className="coconut-img" />
            </div>
        </div>
    );
};

export default PaymentSuccess;
