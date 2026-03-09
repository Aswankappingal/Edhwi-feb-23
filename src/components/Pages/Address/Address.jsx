import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddresses, addAddress, updateAddress } from '../../../redux/slices/addressSlice';
import { fetchCart, calculateTotals } from '../../../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import './Address.scss';
import PaymentSummary from '../../Common/PaymentSummary/PaymentSummary';
import { MdOutlineLocalOffer } from "react-icons/md";
import CartNavbar from '../../Common/cartNavbar/CartNavbar';

const Address = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { addresses, loading: addressLoading } = useSelector((state) => state.address);
    const { items: cartItems, summary, loading: cartLoading } = useSelector((state) => state.cart);

    const [isAddingNew, setIsAddingNew] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [editAddressId, setEditAddressId] = useState(null); // Track if editing an existing address

    // Form state
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        state: '',
        zipCode: '',
        addressType: 'Home' // Default to Home
    });

    useEffect(() => {
        dispatch(fetchAddresses());
        dispatch(fetchCart());
    }, [dispatch]);

    useEffect(() => {
        dispatch(calculateTotals());
    }, [cartItems, dispatch]);

    useEffect(() => {
        if (addresses.length > 0 && !selectedAddressId && !isAddingNew) {
            setSelectedAddressId(addresses[0].id || addresses[0]._id); // fallback depending on backend ID key
        } else if (addresses.length === 0) {
            setIsAddingNew(true);
        }
    }, [addresses, selectedAddressId, isAddingNew]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveAddress = async () => {
        // Basic validation
        if (!formData.fullName || !formData.addressLine1 || !formData.phone || !formData.state || !formData.zipCode) {
            alert('Please fill out all required fields.');
            return;
        }

        // Map frontend fields to backend expected fields
        const addressPayload = {
            fullName: formData.fullName,
            phone: formData.phone,
            addressLine1: formData.addressLine1,
            addressLine2: formData.addressLine2,
            state: formData.state,
            zipCode: formData.zipCode,
            city: formData.state, // Map city to state for now if city is missing in design
            country: 'India',
            addressType: formData.addressType === 'Home' ? 'home' : 'work'
        };

        if (editAddressId) {
            addressPayload.id = editAddressId;
            const resultAction = await dispatch(updateAddress(addressPayload));
            if (updateAddress.fulfilled.match(resultAction)) {
                resetFormState();
            } else {
                alert(resultAction.payload || 'Failed to update address');
            }
        } else {
            const resultAction = await dispatch(addAddress(addressPayload));
            if (addAddress.fulfilled.match(resultAction)) {
                resetFormState();
            } else {
                alert(resultAction.payload || 'Failed to add address');
            }
        }
    };

    const resetFormState = () => {
        setIsAddingNew(false);
        setEditAddressId(null);
        setFormData({
            fullName: '',
            phone: '',
            addressLine1: '',
            addressLine2: '',
            state: '',
            zipCode: '',
            addressType: 'Home'
        });
    };

    const handleEditClick = (address) => {
        setFormData({
            fullName: address.fullName || '',
            phone: address.phone || '',
            addressLine1: address.addressLine1 || '',
            addressLine2: address.addressLine2 || '',
            state: address.state || address.city || '',
            zipCode: address.zipCode || '',
            addressType: address.addressType === 'work' ? 'Office' : 'Home'
        });
        setEditAddressId(address.id || address._id);
        setIsAddingNew(true);
    };

    return (
        <div className="address-page-container">
            <CartNavbar currentStep="address" />

            <div className="address-content-wrapper">
                <h1 className="address-page-title">Address</h1>

                <div className="address-main-grid">
                    {/* Left Column - Addresses */}
                    <div className="address-items-section">
                        {!isAddingNew ? (
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
                                <button className="add-new-btn" onClick={() => setIsAddingNew(true)}>
                                    Add new Address
                                </button>
                            </>
                        ) : (
                            <div className="address-form-container">
                                <div className="address-form-row">
                                    <div className="address-form-group">
                                        <label className="address-label">Email your full name*</label>
                                        <input
                                            type="text"
                                            className="address-input"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            placeholder="James Jacobe |"
                                        />
                                    </div>
                                    <div className="address-form-group">
                                        <label className="address-label">Phone</label>
                                        <div className="phone-input-group">
                                            <div className="phone-prefix">
                                                <img src="https://flagcdn.com/w20/in.png" alt="IN" style={{ width: '20px' }} />
                                                <span>▼</span>
                                            </div>
                                            <input
                                                type="text"
                                                className="address-input"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="9234 567 567"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="address-form-row">
                                    <div className="address-form-group">
                                        <label className="address-label">Address line 1</label>
                                        <input
                                            type="text"
                                            className="address-input"
                                            name="addressLine1"
                                            value={formData.addressLine1}
                                            onChange={handleInputChange}
                                            placeholder="Enter address here"
                                        />
                                    </div>
                                    <div className="address-form-group">
                                        <label className="address-label">Address line 2</label>
                                        <input
                                            type="text"
                                            className="address-input"
                                            name="addressLine2"
                                            value={formData.addressLine2}
                                            onChange={handleInputChange}
                                            placeholder="Enter address here"
                                        />
                                    </div>
                                </div>

                                <div className="address-form-row">
                                    <div className="address-form-group">
                                        <label className="address-label">State</label>
                                        <input
                                            type="text"
                                            className="address-input"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="address-form-group">
                                        <label className="address-label">Pin code</label>
                                        <input
                                            type="text"
                                            className="address-input"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleInputChange}
                                            placeholder=""
                                        />
                                    </div>
                                </div>

                                <div className="address-form-group">
                                    <label className="address-label">Save address as</label>
                                    <div className="address-type-selector">
                                        <button
                                            className={`type-btn ${formData.addressType === 'Home' ? 'active' : ''}`}
                                            onClick={() => setFormData({ ...formData, addressType: 'Home' })}
                                        >
                                            Home
                                        </button>
                                        <button
                                            className={`type-btn ${formData.addressType === 'Office' ? 'active' : ''}`}
                                            onClick={() => setFormData({ ...formData, addressType: 'Office' })}
                                        >
                                            Office
                                        </button>
                                    </div>
                                </div>

                                <div className="form-actions">
                                    {(addresses.length > 0 || editAddressId) && (
                                        <button className="cancel-btn" onClick={() => resetFormState()}>
                                            Cancel
                                        </button>
                                    )}
                                    <button className="save-address-btn" onClick={handleSaveAddress} disabled={addressLoading} style={{ width: (addresses.length === 0 && !editAddressId) ? '100%' : 'auto' }}>
                                        {addressLoading ? 'Saving...' : (editAddressId ? 'Update address' : 'Save address')}
                                    </button>
                                </div>
                            </div>
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
                            buttonText={isAddingNew ? undefined : "Continue"}
                            onButtonClick={() => {
                                if (selectedAddressId) {
                                    alert('Proceed to payment! Address Selected.');
                                } else {
                                    alert('Please select an address.');
                                }
                            }}
                            showButton={!isAddingNew} className="desktop-payment-summary"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Address;
