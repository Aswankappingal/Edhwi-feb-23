import React, { useState } from 'react';
import './MyAccount.scss';
import { FiChevronRight } from 'react-icons/fi';
import Overview from './Overview';
import Orders from './Orders';
import Returns from './Returns';
import MySettings from './MySettings';
import SavedCards from './SavedCards';
import Coupons from './Coupons';
import Notifications from './Notifications';

const MyAccount = ({ setCurrentPage }) => {
    const [activeTab, setActiveTab] = useState('overview');

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <Overview />;
            case 'orders':
                return <Orders />;
            case 'returns':
                return <Returns />;
            case 'settings':
                return <MySettings />;
            case 'cards':
                return <SavedCards />;
            case 'coupons':
                return <Coupons />;
            case 'notifications':
                return <Notifications />;
            default:
                return <Overview />;
        }
    };

    return (
        <div className="my-account-page">
            <div className="my-account-container">
                <nav className="breadcrumbs">
                    <span onClick={() => { if (setCurrentPage) setCurrentPage('home'); }} style={{ cursor: 'pointer' }}>Home</span>
                    <FiChevronRight className="breadcrumb-icon" />
                    <span className="current">My account</span>
                </nav>

                <h1 className="page-title"><span>Manage</span> your account</h1>

                <div className="account-layout">
                    {/* Sidebar */}
                    <aside className="account-sidebar">
                        <div className="sidebar-section">
                            <h3
                                className={`section-title ${activeTab === 'overview' ? 'active' : ''}`}
                                onClick={() => setActiveTab('overview')}
                            >
                                Overview
                            </h3>
                        </div>

                        <div className="sidebar-section">
                            <h3 className="section-title">My Orders</h3>
                            <ul className="section-links">
                                <li>
                                    <a
                                        href="#orders"
                                        className={activeTab === 'orders' ? 'active-link' : ''}
                                        onClick={(e) => { e.preventDefault(); setActiveTab('orders'); }}
                                    >
                                        Orders
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#returns"
                                        className={activeTab === 'returns' ? 'active-link' : ''}
                                        onClick={(e) => { e.preventDefault(); setActiveTab('returns'); }}
                                    >
                                        Returns
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="sidebar-section">
                            <h3 className="section-title">My Account</h3>
                            <ul className="section-links">
                                <li>
                                    <a
                                        href="#settings"
                                        className={activeTab === 'settings' ? 'active-link' : ''}
                                        onClick={(e) => { e.preventDefault(); setActiveTab('settings'); }}
                                    >
                                        My settings
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#cards"
                                        className={activeTab === 'cards' ? 'active-link' : ''}
                                        onClick={(e) => { e.preventDefault(); setActiveTab('cards'); }}
                                    >
                                        Saved Cards
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#coupons"
                                        className={activeTab === 'coupons' ? 'active-link' : ''}
                                        onClick={(e) => { e.preventDefault(); setActiveTab('coupons'); }}
                                    >
                                        Coupons
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#notifications"
                                        className={activeTab === 'notifications' ? 'active-link' : ''}
                                        onClick={(e) => { e.preventDefault(); setActiveTab('notifications'); }}
                                    >
                                        Notifications
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="account-content">
                        {renderContent()}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default MyAccount;
