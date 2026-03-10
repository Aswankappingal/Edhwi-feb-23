import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import CartNavbar from '../../Common/cartNavbar/CartNavbar';
import PaymentSummary from '../../Common/PaymentSummary/PaymentSummary';
import { calculateTotals, clearCart } from '../../../redux/slices/cartSlice';
import { placeOrder, resetOrderState } from '../../../redux/slices/orderSlice';
import BaseUrl from '../../../../BaseUrl';
import { toast } from 'react-toastify';
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
            toast.success('Order placed successfully!');
            dispatch(clearCart());
            dispatch(resetOrderState());
            // Redirect to success page
            navigate('/payment-success', {
                state: {
                    orderId: success.orderId || (success.order && success.order.orderId),
                    totalAmount: summary.total,
                    paymentMethod: paymentMethod
                }
            });
        }

        if (error) {
            toast.error(`Error placing order: ${error}`);
            dispatch(resetOrderState());
        }
    }, [success, error, navigate, dispatch, summary.total, paymentMethod]);

    const handleMakePayment = async () => {
        if (!selectedAddress) return;

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
                phone: selectedAddress.phone.replace(/\D/g, ''),
                email: selectedAddress.email || 'customer@example.com',
                addressLine1: selectedAddress.addressLine1,
                addressLine2: selectedAddress.addressLine2 || '',
                city: selectedAddress.city || selectedAddress.state,
                state: selectedAddress.state,
                pincode: selectedAddress.zipCode,
                addressType: selectedAddress.addressType || 'Home'
            },
            paymentMethod: paymentMethod,
            deliveryCharge: summary.delivery,
            discountAmount: summary.discount,
            couponCode: null
        };

        if (paymentMethod === 'online') {
            try {
                // 1. Fetch Razorpay Key
                const keyRes = await fetch(`${BaseUrl}/razorpay-key`);
                const keyData = await keyRes.json();

                // 2. Create Order in Backend
                const orderRes = await fetch(`${BaseUrl}/create-order`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    // body: JSON.stringify({ amount: summary.total })
                    body: JSON.stringify({ amount: 1 })
                });
                const orderRespData = await orderRes.json();

                // 3. Open Razorpay Checkout
                const options = {
                    key: keyData.keyId,
                    amount: orderRespData.amount,
                    currency: "INR",
                    name: "Edhwi Store",
                    description: "Order Payment",
                    order_id: orderRespData.orderId,
                    handler: async function (response) {
                        try {
                            const verifyRes = await fetch(`${BaseUrl}/verify-payment`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_payment_id: response.razorpay_payment_id,
                                    razorpay_signature: response.razorpay_signature
                                })
                            });

                            const verifyData = await verifyRes.json();
                            if (verifyData.status === 'success') {
                                orderData.paymentDetails = {
                                    transactionId: response.razorpay_payment_id,
                                    paymentId: response.razorpay_payment_id
                                };
                                console.log("Placing online order with payload:", orderData);
                                dispatch(placeOrder(orderData));
                            } else {
                                toast.error("Payment verification failed. Please contact support.");
                            }
                        } catch (err) {
                            toast.error("Payment verification error.");
                        }
                    },
                    prefill: {
                        name: selectedAddress.fullName,
                        email: selectedAddress.email || 'customer@example.com',
                        contact: selectedAddress.phone.replace(/\D/g, '')
                    },
                    theme: { color: "#3399cc" }
                };

                const rzp = new window.Razorpay(options);
                rzp.on('payment.failed', function (response) {
                    toast.error(`Payment Failed: ${response.error.description}`);
                });
                rzp.open();
            } catch (error) {
                console.error("Error initiating Razorpay checkout:", error);
                toast.error("Could not initiate payment. Please try again.");
            }
            return;
        }

        // COD Flow
        console.log("Placing COD order with payload:", orderData);
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
