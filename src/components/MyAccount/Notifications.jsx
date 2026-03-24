import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications, markAsRead } from '../../redux/slices/notificationsSlice';
import './Notifications.scss';

const Notifications = () => {
    const dispatch = useDispatch();
    const { items: notificationsData, loading, error } = useSelector((state) => state.notifications);

    useEffect(() => {
        dispatch(fetchNotifications());
    }, [dispatch]);

    const handleMarkAsRead = (id) => {
        dispatch(markAsRead(id));
    };

    if (loading && notificationsData.length === 0) {
        return (
            <section className="dashboard-section notifications-page">
                <h2 className="section-heading">NOTIFICATIONS</h2>
                <div className="notifications-container">
                    <p style={{ padding: '20px', textAlign: 'center' }}>Loading notifications...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="dashboard-section notifications-page">
                <h2 className="section-heading">NOTIFICATIONS</h2>
                <div className="notifications-container">
                    <p style={{ padding: '20px', textAlign: 'center', color: 'red' }}>Error: {error}</p>
                </div>
            </section>
        );
    }

    return (
        <section className="dashboard-section notifications-page">
            <h2 className="section-heading">NOTIFICATIONS</h2>
            <div className="notifications-container">
                {notificationsData.length === 0 ? (
                    <p style={{ padding: '20px', textAlign: 'center' }}>No notifications found.</p>
                ) : (
                    notificationsData.map((item, index) => (
                        <div className={`notification-item ${!item.read ? 'unread' : ''}`} key={item.id} onClick={() => !item.read && handleMarkAsRead(item.id)}>
                            <div className="notification-left">
                                <div className={`status-dot ${!item.read ? 'active' : ''}`}></div>
                                <div className="product-image-box">
                                    <img src={item.imageUrl || '/Images/Edhwi-Packetss.svg'} alt="Notification" onError={(e) => { e.target.onerror = null; e.target.src = '/Images/Edhwi-Packetss.svg'; }} />
                                    {/* Fallback just in case image is missing */}
                                    {!item.imageUrl && <div className="fallback-img"></div>}
                                </div>
                            </div>
                            <div className="notification-content">
                                <p className="message">{item.message || item.title}</p>
                                <span className="date">{item.date}</span>
                            </div>
                            <div className="notification-right">
                                <a href="#view" className="view-link" onClick={(e) => { e.preventDefault(); handleMarkAsRead(item.id); }}>View</a>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default Notifications;
