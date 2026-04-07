import React, { useState } from 'react';
import './ChangePasswordModal.scss';
import { useDispatch, useSelector } from 'react-redux';
import { FiX } from 'react-icons/fi';
import { sendEmailOtp, sendMobileOtp, verifyPasswordChangeOtp } from '../../../redux/slices/authSlice';

const ChangePasswordModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.auth);

    const [method, setMethod] = useState('email');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    if (!isOpen || !user) return null;

    const handleSendOtp = async () => {
        setError('');
        setSuccess('');
        
        const value = method === 'email' ? user.email : user.mobileNumber || user.phone;
        
        if (!value) {
            setError(`No registered ${method} found for this account.`);
            return;
        }

        try {
            if (method === 'email') {
                await dispatch(sendEmailOtp(value)).unwrap();
            } else {
                await dispatch(sendMobileOtp(value)).unwrap();
            }
            setOtpSent(true);
            setSuccess(`OTP sent to your ${method}`);
        } catch (err) {
            setError(err || 'Failed to send OTP');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (newPassword !== confirmPassword) {
            return setError('Passwords do not match');
        }

        if (newPassword.length < 6) {
            return setError('Password must be at least 6 characters');
        }

        const value = method === 'email' ? user.email : user.mobileNumber || user.phone;

        try {
            await dispatch(verifyPasswordChangeOtp({
                type: method,
                value,
                otp,
                newPassword
            })).unwrap();
            
            setSuccess('Password changed successfully!');
            setTimeout(() => {
                handleClose();
            }, 2000);
        } catch (err) {
            setError(err || 'Failed to change password');
        }
    };

    const handleClose = () => {
        setMethod('email');
        setOtpSent(false);
        setOtp('');
        setNewPassword('');
        setConfirmPassword('');
        setError('');
        setSuccess('');
        onClose();
    };

    return (
        <div className="change-password-modal-overlay" onClick={handleClose}>
            <div className="change-password-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={handleClose}>
                    <FiX />
                </button>
                <h3>Change Password</h3>

                {error && <div className="error-msg">{error}</div>}
                {success && <div className="success-msg">{success}</div>}

                <form onSubmit={handleSubmit}>
                    {!otpSent ? (
                        <>
                            <div className="form-group">
                                <label>Send OTP Via</label>
                                <select 
                                    value={method} 
                                    onChange={(e) => setMethod(e.target.value)}
                                    disabled={loading}
                                >
                                    <option value="email">Email</option>
                                    <option value="mobile">Phone Number</option>
                                </select>
                            </div>
                            <button 
                                type="button" 
                                className="submit-btn" 
                                onClick={handleSendOtp}
                                disabled={loading}
                            >
                                {loading ? 'Sending...' : 'Send OTP'}
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="form-group">
                                <label>Enter OTP</label>
                                <input 
                                    type="text" 
                                    value={otp} 
                                    onChange={(e) => setOtp(e.target.value)} 
                                    placeholder="4 digit OTP"
                                    maxLength={4}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>New Password</label>
                                <input 
                                    type="password" 
                                    value={newPassword} 
                                    onChange={(e) => setNewPassword(e.target.value)} 
                                    placeholder="New Password"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input 
                                    type="password" 
                                    value={confirmPassword} 
                                    onChange={(e) => setConfirmPassword(e.target.value)} 
                                    placeholder="Confirm Password"
                                    required
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="submit-btn"
                                disabled={loading || !otp || !newPassword || !confirmPassword}
                            >
                                {loading ? 'Updating...' : 'Change Password'}
                            </button>
                            <div style={{textAlign: 'center', marginTop: '10px'}}>
                                <button type="button" onClick={() => setOtpSent(false)} style={{background: 'none', border:'none', color: '#666', cursor: 'pointer', textDecoration: 'underline'}}>
                                    Back
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordModal;
