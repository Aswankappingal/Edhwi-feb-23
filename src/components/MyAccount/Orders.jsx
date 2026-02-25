import React from 'react';
import './Orders.scss';

const Orders = () => {
    return (
        <section className="dashboard-section figma-orders-section">
            <h2 className="section-heading figma-heading">ORDERS</h2>

            <div className="figma-orders-list">
                {/* Card 1: Processing */}
                <div className="figma-order-card">
                    <div className="card-header">
                        <div className="order-id">
                            Order ID <strong>#ORD-30103</strong>
                        </div>
                        <div className="order-status processing">Processing</div>
                    </div>
                    <div className="card-meta">
                        <span>Ordered on : <strong>May 12, 2025</strong></span>
                        <span style={{ marginLeft: '10px' }}>Total: <strong>2343</strong></span>
                    </div>

                    <div className="card-progress">
                        <div className="progress-track"></div>
                        <div className="progress-bar" style={{ width: '50%' }}></div>
                        <div className="progress-steps">
                            <div className="step active">
                                <div className="step-dot"></div>
                                <div className="step-label">ORDER PLACED</div>
                            </div>
                            <div className="step active">
                                <div className="step-dot"></div>
                                <div className="step-label">Packed</div>
                            </div>
                            <div className="step">
                                <div className="step-dot"></div>
                                <div className="step-label">DELIVERED</div>
                            </div>
                        </div>
                    </div>

                    <hr className="card-divider" />

                    <div className="card-item">
                        <div className="item-image-box">
                            <div className="bottle-mock-sm"></div>
                        </div>
                        <div className="item-details-box">
                            <div className="item-title">Items:</div>
                            <div className="item-name">Coconut oil pet bottle</div>
                        </div>
                        <div className="item-actions-box">
                            <button className="btn-outline">Cancel</button>
                            <button className="btn-primary">Track</button>
                        </div>
                    </div>
                </div>

                {/* Card 2: Delivered */}
                <div className="figma-order-card">
                    <div className="card-header">
                        <div className="order-id">
                            Order ID <strong>#ORD-54523</strong>
                        </div>
                        <div className="order-status delivered">Delivered</div>
                    </div>
                    <div className="card-meta">
                        <span>Ordered on : <strong>May 12, 2025</strong></span>
                        <span style={{ marginLeft: '10px' }}>Total: <strong>2343</strong></span>
                    </div>

                    <div className="card-progress">
                        <div className="progress-track"></div>
                        <div className="progress-bar" style={{ width: '100%' }}></div>
                        <div className="progress-steps">
                            <div className="step active">
                                <div className="step-dot"></div>
                                <div className="step-label">ORDER PLACED</div>
                            </div>
                            <div className="step active">
                                <div className="step-dot"></div>
                                <div className="step-label">DELIVERED</div>
                            </div>
                        </div>
                    </div>

                    <hr className="card-divider" />

                    <div className="card-item">
                        <div className="item-image-box">
                            <div className="bottle-mock-sm"></div>
                        </div>
                        <div className="item-details-box" style={{ flexGrow: 1 }}>
                            <div className="item-title">Items:</div>
                            <div className="item-name">Coconut oil pet bottle</div>
                        </div>
                    </div>

                    <hr className="card-divider" />

                    <div className="card-summary">
                        <h4 className="box-title">Summary</h4>
                        <div className="grey-box">
                            <div className="summary-row"><span>Subtotal: $762</span></div>
                            <div className="summary-row"><span>Shipping: $54</span></div>
                            <div className="summary-row-flex">
                                <span>Tax: $32</span>
                                <span className="total-text"><strong>Total:</strong> 2343</span>
                            </div>
                        </div>
                    </div>

                    <div className="card-deliver-info" style={{ marginTop: '1.5rem' }}>
                        <h4 className="box-title">Deliver Info</h4>
                        <div className="grey-box">
                            <div className="summary-row"><span>Delivered on: <strong>May 24 2025</strong></span></div>
                            <div className="summary-row"><span>Signed By: <strong>James Jacobe</strong></span></div>
                        </div>
                    </div>

                    <div className="card-bottom-actions">
                        <button className="btn-outline">Support</button>
                        <button className="btn-primary">Buy again</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Orders;
