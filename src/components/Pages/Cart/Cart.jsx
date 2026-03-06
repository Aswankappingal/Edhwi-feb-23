import React from 'react';
import './Cart.scss';
import PaymentSummary from '../../Common/PaymentSummary/PaymentSummary';
import { FiTrash2 } from 'react-icons/fi';
import { BiHeart } from 'react-icons/bi';
import { MdOutlineLocalOffer } from "react-icons/md";
import CartNavbar from '../../Common/cartNavbar/CartNavbar';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../../redux/slices/cartSlice';

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);

    const handleUpdateQuantity = (id, change) => {
        const item = cartItems.find(i => i.id === id);
        if (item) {
            const newQuantity = item.quantity + change;
            if (newQuantity > 0) {
                dispatch(updateQuantity({ id, quantity: newQuantity }));
            }
        }
    };

    const handleRemoveItem = (id) => {
        dispatch(removeFromCart(id));
    };

    // Calculate dynamic totals
    const totalMrp = cartItems.reduce((acc, item) => acc + ((item.mrp || item.priceNumber || item.price || 0) * item.quantity), 0);
    const sellingPrice = cartItems.reduce((acc, item) => acc + ((item.priceNumber || item.price || 0) * item.quantity), 0);
    const discountOnMrp = totalMrp - sellingPrice;

    // Using some hypothetical static values for taxes/delivery for now, as they weren't strictly provided by backend API context, 
    // or they can be adjusted if payload provides them.
    const couponSavings = 0;
    const applicableGst = 0;
    const delivery = 0;
    const total = sellingPrice + applicableGst + delivery - couponSavings;

    return (
        <div className="cart-page-container">
            <CartNavbar currentStep="cart" />

            <div className="cart-content-wrapper">
                {/* Breadcrumb */}
                <div className="breadcrumb">
                    <span className="bc-link">Home</span>
                    <span className="bc-separator">›</span>
                    <span className="bc-current">Cart</span>
                </div>

                <h1 className="cart-page-title">My Cart ({cartItems.length})</h1>

                <div className="cart-main-grid">
                    {/* Left Column - Cart Items */}
                    <div className="cart-items-section">
                        {cartItems.map((item) => (
                            <div key={item.id} className="cart-item-card">
                                <div className="item-image-container">
                                    <div className="image-placeholder">
                                        <img src={item.primaryImage || item.image || item.images?.[0]?.url || "/Kuppi.svg"} alt={item.name} />
                                    </div>
                                </div>

                                <div className="item-details-container">
                                    <div className="item-title-row">
                                        <h3 className="item-title">{item.name}</h3>
                                        <span className="item-volume-badge">{item.variants?.[0]?.size || "Standard"}</span>
                                    </div>

                                    <div className="item-actions-and-price">
                                        <div className="item-actions">
                                            <button className="action-btn text-grey" onClick={() => handleRemoveItem(item.id)}>
                                                <FiTrash2 /> Remove
                                            </button>
                                            <span className="action-divider">|</span>
                                            <button className="action-btn text-grey">
                                                <BiHeart /> Add to wishlist
                                            </button>
                                        </div>

                                        <div className="item-controls-price">
                                            <div className="quantity-selector">
                                                <button onClick={() => handleUpdateQuantity(item.id, -1)}>−</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => handleUpdateQuantity(item.id, 1)}>+</button>
                                            </div>

                                            <div className="price-details">
                                                <div className="current-price">₹{item.priceNumber || item.price || 0}</div>
                                                <div className="original-price-row">
                                                    {(item.mrp && item.mrp > (item.priceNumber || item.price)) && (
                                                        <>
                                                            <span className="strike-price">-₹{item.mrp}</span>
                                                            <span className="discount-badge">{item.offerPercentage ? `${item.offerPercentage}% OFF` : ''}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Column - Payment Summary & Coupons */}
                    <div className="cart-summary-section">
                        {/* Apply Coupons Box */}
                        <div className="apply-coupons-card">
                            <div className="coupon-left">
                                <MdOutlineLocalOffer className="coupon-icon yellow" />
                                <span className="coupon-label">Apply coupons</span>
                            </div>
                            <button className="apply-btn">Apply</button>
                        </div>

                        {/* Payment Summary */}
                        <PaymentSummary
                            totalMrp={totalMrp}
                            discountOnMrp={discountOnMrp}
                            couponSavings={couponSavings}
                            applicableGst={applicableGst}
                            delivery={delivery}
                            total={total}
                            buttonText="Continue"
                            onButtonClick={() => alert('Proceeding...')}
                            showButton={true} className="desktop-payment-summary"
                        />

                        {/* Mobile specific button, shown only on mobile */}
                        <button className="mobile-proceed-btn" onClick={() => alert('Proceeding to checkout...')}>
                            Proceed to checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
