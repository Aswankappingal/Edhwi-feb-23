import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './MySettings.scss';
import { FiLock, FiTrash2, FiLogOut } from 'react-icons/fi';
import ChangePasswordModal from './Modals/ChangePasswordModal';
import DeleteAccountModal from './Modals/DeleteAccountModal';
import LogoutModal from '../Theams/LogoutModal/LogoutModal';

const MySettings = () => {
    const { user } = useSelector((state) => state.auth);
    
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    return (
        <section className="my-settings-section">
            <div className="settings-group">
                <h3 className="group-title">PERSONAL INFORMATION</h3>
                <div className="info-card">
                    <div className="card-header">
                        <span className="user-name">{user?.name || user?.fullName || 'User'}</span>
                        <button className="edit-btn">Edit</button>
                    </div>
                    <div className="card-body">
                        <p>{user?.email || 'No email provided'}</p>
                        <p>{user?.phone || user?.mobileNumber || 'No phone provided'}</p>
                        <p className="spacer">Gender : {user?.gender || 'Not specified'}</p>
                        <p className="spacer">Date of Birth : {user?.dob || 'Not specified'}</p>
                    </div>
                </div>
            </div>

            <div className="settings-group privacy-group">
                <h3 className="group-title">PRIVACY</h3>
                <div className="action-cards">
                    <div className="action-card" onClick={() => setIsPasswordModalOpen(true)}>
                        <FiLock className="action-icon" />
                        <span className="action-text">Change Password</span>
                    </div>
                    <div className="action-card" onClick={() => setIsDeleteModalOpen(true)}>
                        <FiTrash2 className="action-icon" />
                        <span className="action-text">Delete account</span>
                    </div>
                    <div className="action-card" onClick={() => setIsLogoutModalOpen(true)}>
                        <FiLogOut className="action-icon" />
                        <span className="action-text">Logout</span>
                    </div>
                </div>
            </div>

            <ChangePasswordModal 
                isOpen={isPasswordModalOpen} 
                onClose={() => setIsPasswordModalOpen(false)} 
            />
            
            <DeleteAccountModal 
                isOpen={isDeleteModalOpen} 
                onClose={() => setIsDeleteModalOpen(false)} 
            />
            
            <LogoutModal 
                isOpen={isLogoutModalOpen} 
                onClose={() => setIsLogoutModalOpen(false)} 
            />
        </section>
    );
};

export default MySettings;
