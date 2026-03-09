import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddresses, addAddress, updateAddress } from '../../../redux/slices/addressSlice';
import { fetchCart, calculateTotals } from '../../../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import './Address.scss';
import PaymentSummary from '../../Common/PaymentSummary/PaymentSummary';
import { MdOutlineLocalOffer } from "react-icons/md";
import CartNavbar from '../../Common/cartNavbar/CartNavbar';
import EditAddressModal from './EditAddressModal';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Address = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { addresses, loading: addressLoading } = useSelector((state) => state.address);
    const { items: cartItems, summary, loading: cartLoading } = useSelector((state) => state.cart);

    const [isAddingNew, setIsAddingNew] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState(null);

    // Modal states
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingAddressData, setEditingAddressData] = useState(null);
    const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'

    useEffect(() => {
        dispatch(fetchAddresses());
        dispatch(fetchCart());
    }, [dispatch]);

    useEffect(() => {
        dispatch(calculateTotals());
    }, [cartItems, dispatch]);

    useEffect(() => {
        if (!addressLoading) {
            if (addresses.length > 0 && !selectedAddressId) {
                setSelectedAddressId(addresses[0].id || addresses[0]._id); // fallback depending on backend ID key
            }
        }
    }, [addresses, addressLoading, selectedAddressId]);

    const handleAddNewClick = () => {
        setModalMode('add');
        setEditingAddressData(null);
        setIsEditModalOpen(true);
    };

    const handleEditClick = (address) => {
        setModalMode('edit');
        setEditingAddressData(address);
        setIsEditModalOpen(true);
    };

    return (
        <div className="address-page-container">
            <CartNavbar currentStep="address" />

            <div className="address-content-wrapper">
                <h1 className="address-page-title">Address</h1>

                <div className="address-main-grid">
                    {/* Left Column - Addresses */}
                    <div className="address-items-section">
                        {addresses.length === 0 ? (
                            <div className="inline-address-form-container">
                                <EditAddressModal isInline={true} mode="add" />
                            </div>
                        ) : (
                            <>
                                <h3 style={{ fontSize: '16px', marginBottom: '15px', fontWeight: '500' }}>Please Select your address.</h3>
                                {addresses.map((address, index) => {
                                    const addrId = address.id || address._id || index;
                                    return (
                                        <div
                                            key={addrId}
                                            className={`address-card ${selectedAddressId === addrId ? 'selected' : ''}`}
                                            onClick={() => setSelectedAddressId(addrId)}
                                        >
                                            <div className="address-card-header">
                                                <label className="address-radio-label">
                                                    <input
                                                        type="radio"
                                                        name="selectedAddress"
                                                        checked={selectedAddressId === addrId}
                                                        onChange={() => setSelectedAddressId(addrId)}
                                                    />
                                                    <span className="address-name">{address.fullName}</span>
                                                </label>
                                                <span className="address-type-badge">{address.addressType === 'work' ? 'Office' : 'Home'}</span>
                                            </div>
                                            <div className="address-details">
                                                {address.addressLine1}, {address.addressLine2 ? address.addressLine2 + ', ' : ''}
                                                {address.city ? address.city + ', ' : ''}{address.state}<br />
                                                {address.country || 'India'}
                                            </div>
                                            <button className="edit-address-btn" onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditClick(address);
                                            }}>
                                                Edit address
                                            </button>
                                        </div>
                                    )
                                })}
                                <button className="add-new-btn" onClick={handleAddNewClick}>
                                    Add new Address
                                </button>
                            </>
                        )}
                    </div>

                    {/* Right Column - Payment Summary & Coupons */}
                    <div className="address-summary-section">
                        {/* Apply Coupons Box */}
                        <div className="apply-coupons-card" style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div className="coupon-left" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <MdOutlineLocalOffer className="coupon-icon yellow" style={{ color: '#F4B41A', fontSize: '20px' }} />
                                <span className="coupon-label" style={{ fontWeight: '500', fontSize: '14px' }}>Apply coupons</span>
                            </div>
                            <button className="apply-btn" style={{ background: 'none', border: 'none', color: '#1a1a1a', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>Apply</button>
                        </div>

                        {/* Payment Summary */}
                        <PaymentSummary
                            totalMrp={summary.totalMrp}
                            discountOnMrp={summary.discount}
                            couponSavings={summary.couponSavings}
                            applicableGst={summary.gst}
                            delivery={summary.delivery}
                            total={summary.total}
                            buttonText="Continue"
                            onButtonClick={() => {
                                if (selectedAddressId) {
                                    navigate('/payment', { state: { addressId: selectedAddressId } });
                                } else {
                                    alert('Please select an address.');
                                }
                            }}
                            showButton={true} className="desktop-payment-summary"
                        />
                    </div>
                </div>
            </div>

            {/* Mount Edit Address Modal */}
            <EditAddressModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                addressData={editingAddressData}
                mode={modalMode}
            />
        </div>
    );
};

export default Address;
