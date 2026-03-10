import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import './CancelOrder.scss';

const CancelOrder = ({ setActiveTab }) => {
    return (
        <div className="cancel-order-container">
            <h1 className="cancel-title">
                <span className="text-blue">C</span>ancel order
            </h1>

            <div className="cancel-card">
                <div className="order-header">
                    <span className="order-id-label">Order id:</span> <span className="order-id-value">ORD 30103</span>
                </div>

                <div className="warning-banner">
                    <FiAlertCircle className="warning-icon" />
                    <span>You are about to cancel order <strong>ORD-01121</strong>. This action cannot be undone.</span>
                </div>

                <div className="order-summary-section">
                    <div className="summary-header">
                        <h3>ORDER SUMMARY</h3>
                        <span className="status-badge">Processing</span>
                    </div>

                    <div className="summary-details">
                        <p><strong>Items:</strong> T-shirt, Cups, Tender coconut bottle</p>
                        <p>Ordered on: 3 Mar 12, 2023</p>
                        <p className="total-price"><strong>Total:</strong> 2345</p>
                    </div>
                </div>

                <div className="divider"></div>

                <div className="form-group">
                    <label>Reason for cancellation</label>
                    <select className="form-control" defaultValue="">
                        <option value="" disabled>Select Reason</option>
                        <option value="changed-mind">Changed my mind</option>
                        <option value="found-cheaper">Found a cheaper alternative</option>
                        <option value="ordered-mistake">Ordered by mistake</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Additional feedback</label>
                    <textarea className="form-control" rows="4" placeholder="Optional..."></textarea>
                </div>

                <div className="what-happens-next">
                    <h4>What happens Next?</h4>
                    <div className="next-steps-box">
                        <ul>
                            <li>Your order will be cancelled immediately</li>
                            <li>You will receive a confirmation email</li>
                            <li>Any payment will be refunded within 3-5 business days</li>
                            <li>Digital items or subscriptions will be deactivated</li>
                        </ul>
                    </div>
                </div>

                <div className="privacy-policy">
                    <h4>Privacy policy</h4>
                    <label className="checkbox-container">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                        <span className="checkbox-label">I understand this action can not be undone</span>
                    </label>
                </div>

                <div className="action-buttons">
                    <button className="btn-confirm">Confirm cancellation</button>
                    <button className="btn-keep" onClick={() => setActiveTab && setActiveTab('orders')}>Keep Order</button>
                </div>
            </div>
        </div>
    );
};

export default CancelOrder;