import React from 'react';
import './Notifications.scss';

const Notifications = () => {
    const notificationsData = [
        {
            id: 1,
            isNew: true,
            imageUrl: '/assets/images/coconut-oil.png', // Placeholder, assuming an image or we can just use a div
            message: 'Your package containing Coconut oil pet bottle... has been delivered. Thanks for shopping!',
            date: '12/12/25'
        },
        {
            id: 2,
            isNew: true,
            imageUrl: '/assets/images/coconut-oil.png',
            message: 'Your package containing Coconut oil pet bottle... has been delivered. Thanks for shopping!',
            date: '12/12/25'
        },
        {
            id: 3,
            isNew: false,
            imageUrl: '/assets/images/coconut-oil.png',
            message: 'Your package containing Coconut oil pet bottle... has been delivered. Thanks for shopping!',
            date: '12/12/25'
        }
    ];

    return (
        <section className="dashboard-section notifications-page">
            <h2 className="section-heading">NOTIFICATIONS</h2>
            <div className="notifications-container">
                {notificationsData.map((item, index) => (
                    <div className="notification-item" key={item.id}>
                        <div className="notification-left">
                            <div className={`status-dot ${item.isNew ? 'active' : ''}`}></div>
                            <div className="product-image-box">
                                <img src={item.imageUrl} alt="Product" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
                                {/* Fallback just in case image is missing */}
                                <div className="fallback-img"></div>
                            </div>
                        </div>
                        <div className="notification-content">
                            <p className="message">{item.message}</p>
                            <span className="date">{item.date}</span>
                        </div>
                        <div className="notification-right">
                            <a href="#view" className="view-link" onClick={(e) => e.preventDefault()}>View</a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Notifications;
