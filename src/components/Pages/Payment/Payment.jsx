import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import CartNavbar from '../../Common/cartNavbar/CartNavbar';
import PaymentSummary from '../../Common/PaymentSummary/PaymentSummary';
import { calculateTotals } from '../../../redux/slices/cartSlice';
import { placeOrder, resetOrderState } from '../../../redux/slices/orderSlice';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './Payment.scss';

const Payment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // Get the address ID selected in the previous step
    const { addressId } = location.state || {};

    const { items: cartItems, summary, loading: cartLoading } = useSelector((state) => state.cart);
    const { addresses } = useSelector((state) => state.address);
    const { loading: orderLoading, success, error } = useSelector((state) => state.order);

    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [selectedAddress, setSelectedAddress] = useState(null);

    useEffect(() => {
        // If no address selected or cart empty, go back
        if (!addressId || addresses.length === 0 || cartItems.length === 0) {
            navigate('/cart');
            return;
        }

        const address = addresses.find(a => (a.id || a._id) === addressId);
        if (address) {
            setSelectedAddress(address);
        } else {
            navigate('/address');
        }

        dispatch(calculateTotals());
    }, [addressId, addresses, cartItems.length, navigate, dispatch]);

    useEffect(() => {
        if (success) {
            alert('Order placed successfully!');
            dispatch(resetOrderState());
            // Redirect to success page or home
            navigate('/my-account'); // temp redirect
        }

        if (error) {
            alert(`Error placing order: ${error}`);
            dispatch(resetOrderState());
        }
    }, [success, error, navigate, dispatch]);

    const handleMakePayment = () => {
        if (!selectedAddress) return;

        if (paymentMethod === 'online') {
            alert('UPI/Card payment flow implementation pending. Proceeding with COD for testing or cancel.');
            // Add Razorpay flow here later
            return;
        }

        const orderData = {
            items: cartItems.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.productDetails?.price || 0,
                name: item.productDetails?.name || 'Product',
                variantDetails: item.variantDetails || null
            })),
            deliveryAddress: {
                fullName: selectedAddress.fullName,
                phone: selectedAddress.phone.replace(/\D/g, ''), // Send all digits
                email: selectedAddress.email || 'customer@example.com',
                addressLine1: selectedAddress.addressLine1,
                addressLine2: selectedAddress.addressLine2 || '',
                city: selectedAddress.city || selectedAddress.state,
                state: selectedAddress.state,
                pincode: selectedAddress.zipCode,
                addressType: selectedAddress.addressType || 'Home'
            },
            paymentMethod: paymentMethod, // 'cod'
            deliveryCharge: summary.delivery,
            discountAmount: summary.discount,
            couponCode: null // If applicable
        };

        console.log("Placing order with payload:", orderData);
        dispatch(placeOrder(orderData));
    };

    if (cartLoading || !selectedAddress) {
        return <div className="payment-loading">Loading...</div>;
    }

    return (
        <div className="payment-page-container">
            <CartNavbar currentStep="payment" />

            <div className="payment-content-wrapper">
                <h1 className="payment-page-title">Payment</h1>

                <div className="payment-main-grid">
                    <div className="payment-methods-section">
                        <h3 className="payment-section-heading">CHOOSE PAYMENT METHOD</h3>

                        <div className="payment-options-box">
                            <label className={`payment-option-label ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="payment_method"
                                    value="cod"
                                    checked={paymentMethod === 'cod'}
                                    onChange={() => setPaymentMethod('cod')}
                                />
                                <span className="method-name">Cash on Delivery</span>
                            </label>

                            <div className="payment-divider" />

                            <label className={`payment-option-label ${paymentMethod === 'online' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="payment_method"
                                    value="online"
                                    checked={paymentMethod === 'online'}
                                    onChange={() => setPaymentMethod('online')}
                                />
                                <span className="method-name">UPI /Cards , Other</span>
                            </label>
                        </div>

                        <div className="payment-phone-section">
                            <h3 className="payment-section-heading">CONFIRM PHONE NUMBER FOR ORDER UPDATES</h3>
                            <PhoneInput
                                country={'in'}
                                value={selectedAddress.phone}
                                onChange={phone => setSelectedAddress({ ...selectedAddress, phone })}
                                inputStyle={{ width: '100%', height: '45px', fontSize: '16px', borderRadius: '4px' }}
                                containerStyle={{ marginTop: '10px' }}
                                enableSearch={true}
                                disableSearchIcon={true}
                            />
                        </div>
                    </div>

                    <div className="payment-summary-section">
                        <PaymentSummary
                            totalMrp={summary.totalMrp}
                            discountOnMrp={summary.discount}
                            couponSavings={summary.couponSavings}
                            applicableGst={summary.gst}
                            delivery={summary.delivery}
                            total={summary.total}
                            buttonText={orderLoading ? "Processing..." : "Make payment"}
                            onButtonClick={handleMakePayment}
                            showButton={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
