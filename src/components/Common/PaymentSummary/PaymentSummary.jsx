import React from 'react';
import './PaymentSummary.scss';

const PaymentSummary = ({
    totalMrp,
    discountOnMrp,
    couponSavings,
    applicableGst,
    delivery,
    total,
    buttonText = 'Continue',
    onButtonClick,
    showButton = true,
    className = ''
}) => {
    return (
        <div className={`payment-summary-wrapper ${className}`}>
            <div className="payment-summary-card">
                <h3 className="summary-title">Payment summary</h3>

                <div className="summary-details">
                    <div className="summary-row">
                        <span className="row-label">Total MRP</span>
                        <span className="row-value">₹{totalMrp.toFixed(2)}</span>
                    </div>

                    <div className="summary-row">
                        <span className="row-label">Discount on MRP</span>
                        <span className="row-value discount-value">-₹{discountOnMrp.toFixed(2)}</span>
                    </div>

                    <div className="summary-row">
                        <span className="row-label">Coupon savings</span>
                        <span className="row-value discount-value">-₹{couponSavings.toFixed(2)}</span>
                    </div>

                    <div className="summary-row">
                        <span className="row-label">Applicable GST</span>
                        <span className="row-value">₹{applicableGst.toFixed(2)}</span>
                    </div>

                    <div className="summary-row">
                        <span className="row-label">Delivery</span>
                        <span className="row-value">{delivery === 0 ? 'Free' : `₹${delivery.toFixed(2)}`}</span>
                    </div>
                </div>

                <div className="summary-total-row">
                    <span className="total-label">Total</span>
                    <span className="total-value">₹{total.toFixed(2)}</span>
                </div>
            </div>

            {showButton && (
                <button className="summary-action-button" onClick={onButtonClick}>
                    {buttonText}
                </button>
            )}
        </div>
    );
};

export default PaymentSummary;
