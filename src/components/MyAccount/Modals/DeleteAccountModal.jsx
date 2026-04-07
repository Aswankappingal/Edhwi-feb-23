import React, { useState } from 'react';
import './DeleteAccountModal.scss';
import { useDispatch, useSelector } from 'react-redux';
import { FiX, FiAlertTriangle } from 'react-icons/fi';
import { softDeleteAccount } from '../../../redux/slices/authSlice';

const DeleteAccountModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleDelete = async () => {
        try {
            await dispatch(softDeleteAccount()).unwrap();
            onClose();
        } catch (err) {
            setError(err || 'Failed to delete account');
        }
    };

    return (
        <div className="delete-account-modal-overlay" onClick={onClose}>
            <div className="delete-account-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>
                    <FiX />
                </button>
                
                <div className="icon-wrapper">
                    <div className="icon-bg">
                        <FiAlertTriangle />
                    </div>
                </div>

                <h3>Delete Account?</h3>
                <p>
                    Are you sure you want to delete your account? This action will deactivate your profile and you will lose access to your order history and wishlist.
                </p>

                {error && <div style={{color: 'red', marginBottom: '15px'}}>{error}</div>}

                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose} disabled={loading}>
                        Cancel
                    </button>
                    <button className="confirm-btn" onClick={handleDelete} disabled={loading}>
                        {loading ? 'Deleting...' : 'Yes, Delete Account'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccountModal;
