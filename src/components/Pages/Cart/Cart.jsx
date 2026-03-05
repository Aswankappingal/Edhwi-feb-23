import React, { useState } from 'react';
import './Cart.scss';
import PaymentSummary from '../../Common/PaymentSummary/PaymentSummary';
import { FiTrash2 } from 'react-icons/fi';
import { BiHeart } from 'react-icons/bi';
import { MdOutlineLocalOffer } from "react-icons/md";
import CartNavbar from '../../Common/cartNavbar/CartNavbar';

const Cart = () => {
    // Mock cart items data
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            image: '/path/to/bottle1.png', // Replace with actual path in your project or generic placeholder
            title: 'Coconut oil pet bottle (Pet bottle)...',
            volume: '1 LTR',
            price: 1000,
            originalPrice: 12000, // as screenshot has 12000
            discountPercent: '10% OFF',
            quantity: 2
        },
        {
            id: 2,
            image: '/path/to/pouch.png',
            title: 'Coconut Oil - pouch',
            volume: '1 LTR',
            price: 560,
            originalPrice: 12000,
            discountPercent: '10% OFF',
            quantity: 2
        },
        {
            id: 3,
            image: '/path/to/bottle2.png',
            title: 'Coconut oil pet bottle (Pet bottle)...',
            volume: '1 LTR',
            price: 1000,
            originalPrice: 12000,
            discountPercent: '10% OFF',
            quantity: 2
        }
    ]);

    const updateQuantity = (id, change) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                const newQuantity = item.quantity + change;
                return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
            }
            return item;
        }));
    };

    const removeItem = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

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
                                    {/* Using a placeholder div for the image to match structure */}
                                    <div className="image-placeholder">
                                        {/* <img src={item.image} alt={item.title} /> */}
                                    </div>
                                </div>

                                <div className="item-details-container">
                                    <div className="item-title-row">
                                        <h3 className="item-title">{item.title}</h3>
                                        <span className="item-volume-badge">{item.volume}</span>
                                    </div>

                                    <div className="item-actions-and-price">
                                        <div className="item-actions">
                                            <button className="action-btn text-grey" onClick={() => removeItem(item.id)}>
                                                <FiTrash2 /> Remove
                                            </button>
                                            <span className="action-divider">|</span>
                                            <button className="action-btn text-grey">
                                                <BiHeart /> Add to wishlist
                                            </button>
                                        </div>

                                        <div className="item-controls-price">
                                            <div className="quantity-selector">
                                                <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                            </div>

                                            <div className="price-details">
                                                <div className="current-price">₹{item.price}</div>
                                                <div className="original-price-row">
                                                    <span className="strike-price">-₹{item.originalPrice}</span>
                                                    <span className="discount-badge">{item.discountPercent}</span>
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
                            totalMrp={223.00}
                            discountOnMrp={120.00}
                            couponSavings={310.00}
                            applicableGst={8.00}
                            delivery={0}
                            total={1058.00}
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
