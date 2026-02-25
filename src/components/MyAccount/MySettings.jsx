import React from 'react';
import './MySettings.scss';
import { FiLock, FiTrash2, FiLogOut } from 'react-icons/fi';

const MySettings = () => {
    return (
        <section className="my-settings-section">
            <div className="settings-group">
                <h3 className="group-title">PERSONAL INFORMATION</h3>
                <div className="info-card">
                    <div className="card-header">
                        <span className="user-name">Critina James</span>
                        <button className="edit-btn">Edit</button>
                    </div>
                    <div className="card-body">
                        <p>cristinajames@gmail.com</p>
                        <p>+91 7878 568 709</p>
                        <p className="spacer">Gender : Female</p>
                        <p className="spacer">Date of Birth : 30 Dec 1996</p>
                    </div>
                </div>
            </div>

            <div className="settings-group privacy-group">
                <h3 className="group-title">PRIVACY</h3>
                <div className="action-cards">
                    <div className="action-card">
                        <FiLock className="action-icon" />
                        <span className="action-text">Change Password</span>
                    </div>
                    <div className="action-card">
                        <FiTrash2 className="action-icon" />
                        <span className="action-text">Delete account</span>
                    </div>
                    <div className="action-card">
                        <FiLogOut className="action-icon" />
                        <span className="action-text">Logout</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MySettings;
