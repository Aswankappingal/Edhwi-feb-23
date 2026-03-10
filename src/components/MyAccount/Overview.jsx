import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiEdit2, FiTrash2, FiHeart, FiPlus, FiMinus, FiUser } from 'react-icons/fi';
import { fetchMyOrders } from '../../redux/slices/orderSlice';
import './Overview.scss';

const Overview = () => {
    const dispatch = useDispatch();
    const { orders, loading } = useSelector((state) => state.order);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchMyOrders());
    }, [dispatch]);

    // Flattens the order lines to list them individually in "Recent Orders"
    // Sorted by most recent
    const recentItems = orders
        ?.flatMap(order => 
            (order.items || []).map(item => ({
                ...item,
                orderId: order.orderId,
                orderNumber: order.orderNumber,
                orderDate: order.createdAt,
            }))
        )
        .slice(0, 3) || []; // Show only top 3 recent items
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
                            <h3>{user?.name || 'Customer'}</h3>
                            <p>{user?.email || 'No email provided'}</p>
                            <p>{user?.phone || 'No phone provided'}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recent Orders */}
            <section className="dashboard-section">
                <h2 className="section-heading">RECENT ORDERS</h2>
                {loading ? (
                    <p>Loading recent orders...</p>
                ) : recentItems.length === 0 ? (
                    <p>No recent orders found.</p>
                ) : (
                    <div className="orders-list">
                        {recentItems.map((item, index) => (
                            <div className="order-card" key={`${item.productId}-${index}`}>
                                <div className="order-product-info">
                                    <div className="product-image-placeholder">
                                        {item.image ? (
                                            <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                        ) : (
                                            <div className="bottle-mock"></div>
                                        )}
                                    </div>
                                    <div className="product-details">
                                        <h4>
                                            {item.name}{' '}
                                            <span className="product-size">{item.weight || item.variant || ''}</span>
                                        </h4>
                                        <p style={{ fontSize: '12px', color: '#6B7280', margin: '4px 0 0 0' }}>
                                            Order #{item.orderNumber}
                                        </p>
                                    </div>
                                </div>

                                <div className="order-controls">
                                    <div className="quantity-selector" style={{ border: 'none', padding: '0', background: 'transparent' }}>
                                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#4B5563' }}>Qty: {item.quantity}</span>
                                    </div>

                                    <div className="pricing-details">
                                        <div className="current-price">₹{item.price}</div>
                                        {item.mrp && item.mrp > item.price && (
                                            <div className="price-meta">
                                                <span className="original-price">₹{item.mrp}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Overview;
