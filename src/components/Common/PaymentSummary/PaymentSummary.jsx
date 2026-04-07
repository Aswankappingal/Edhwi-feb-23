import React from 'react';
import './PaymentSummary.scss';

const PaymentSummary = ({
    totalMrp,
    basePrice,
    discount,
    taxableValue,
    gstAmount,
    delivery,
    codCharge,
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
                        <span className="row-label">Subtotal (Excl. GST)</span>
                        <span className="row-value">₹{basePrice?.toFixed(2) || '0.00'}</span>
                    </div>

                    {discount > 0 && (
                        <div className="summary-row">
                            <span className="row-label">Discount</span>
                            <span className="row-value discount-value">-₹{discount?.toFixed(2) || '0.00'}</span>
                        </div>
                    )}


                    <div className="summary-row gst-row">
                        <div className="row-label-group">
                            <span className="row-label">Applicable GST</span>
                        </div>
                        <span className="row-value">₹{gstAmount?.toFixed(2) || '0.00'}</span>
                    </div>

                    <div className="summary-row">
                        <span className="row-label">Delivery</span>
                        <span className="row-value">{delivery === 0 ? 'Free' : `₹${delivery?.toFixed(2) || '0.00'}`}</span>
                    </div>

                    {codCharge > 0 && (
                        <div className="summary-row">
                            <span className="row-label">COD Charge</span>
                            <span className="row-value">₹{codCharge?.toFixed(2) || '0.00'}</span>
                        </div>
                    )}
                </div>

                <div className="summary-total-row">
                    <span className="total-label">Total</span>
                    <span className="total-value">₹{Math.round(total || 0).toLocaleString()}</span>
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
