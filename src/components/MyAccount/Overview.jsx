import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiHeart, FiPlus, FiMinus, FiUser } from 'react-icons/fi';
import './Overview.scss';

const Overview = () => {
    // dummy data for orders
    const [orders, setOrders] = useState([
        {
            id: 1,
            name: 'Coconut oil pet bottle',
            description: '(Pet bottle)...',
            size: '1 LTR',
            originalPrice: 1200,
            discountedPrice: 1000,
            discountPercentage: '10% OFF',
            quantity: 2,
            image: '../../../public/product-placeholder.png'
        },
        {
            id: 2,
            name: 'Coconut Oil - pouch',
            description: '',
            size: '1 LTR',
            originalPrice: 1200,
            discountedPrice: 560,
            discountPercentage: '10% OFF',
            quantity: 2,
            image: '../../../public/product-placeholder.png'
        },
        {
            id: 3,
            name: 'Coconut oil pet bottle',
            description: '(Pet bottle)...',
            size: '1 LTR',
            originalPrice: 1200,
            discountedPrice: 1000,
            discountPercentage: '10% OFF',
            quantity: 2,
            image: '../../../public/product-placeholder.png'
        }
    ]);

    const updateQuantity = (id, delta) => {
        setOrders(orders.map(order => {
            if (order.id === id) {
                const newQuantity = order.quantity + delta;
                return { ...order, quantity: newQuantity > 0 ? newQuantity : 1 };
            }
            return order;
        }));
    };

    const removeOrder = (id) => {
        setOrders(orders.filter(order => order.id !== id));
    };

    return (
        <div className="overview-container">
            {/* Profile Overview */}
            <section className="dashboard-section">
                <h2 className="section-heading">OVERVIEW</h2>
                <div className="profile-card">
                    <div className="profile-info">
                        <div className="profile-avatar">
                            <FiUser />
                        </div>
                        <div className="profile-details">
                            <h3>Critina James</h3>
                            <p>1234 Green town, TRG Metro</p>
                            <p>Germany</p>
                        </div>
                    </div>
                    <button className="edit-btn">Edit</button>
                </div>
            </section>

            {/* Recent Orders */}
            <section className="dashboard-section">
                <h2 className="section-heading">RECENT ORDERS</h2>
                <div className="orders-list">
                    {orders.map((order) => (
                        <div className="order-card" key={order.id}>
                            <div className="order-product-info">
                                <div className="product-image-placeholder">
                                    {/* Fallback image style if image doesn't exist */}
                                    <div className="bottle-mock"></div>
                                </div>
                                <div className="product-details">
                                    <h4>
                                        {order.name}{' '}
                                        {order.description && <span className="product-desc">{order.description}</span>}{' '}
                                        <span className="product-size">{order.size}</span>
                                    </h4>
                                    <div className="product-actions">
                                        <button onClick={() => removeOrder(order.id)} className="action-btn text-muted">
                                            <FiTrash2 /> Remove
                                        </button>
                                        <span className="divider">|</span>
                                        <button className="action-btn text-muted">
                                            <FiHeart /> Add to wishlist
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="order-controls">
                                <div className="quantity-selector">
                                    <button onClick={() => updateQuantity(order.id, -1)}><FiMinus /></button>
                                    <span>{order.quantity}</span>
                                    <button onClick={() => updateQuantity(order.id, 1)}><FiPlus /></button>
                                </div>

                                <div className="pricing-details">
                                    <div className="current-price">₹{order.discountedPrice}</div>
                                    <div className="price-meta">
                                        <span className="original-price">₹{order.originalPrice}</span>
                                        <span className="discount-badge">{order.discountPercentage}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <a href="#all-orders" className="view-all-link">View all orders</a>
            </section>
        </div>
    );
};

export default Overview;
