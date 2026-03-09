import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa6';
import { GoPlus } from "react-icons/go";
import './Wishlist.scss';

const Wishlist = () => {
    // Mock wishlist items based on design
    const [wishlistItems, setWishlistItems] = useState([
        {
            id: 1,
            name: 'Coconut oil pet bottle',
            availability: 'Available in 1L',
            price: 159,
            image: '/Bottle-Coconut.svg'
        },
        {
            id: 2,
            name: 'Coconut Oil - pouch',
            availability: 'Available in 1L',
            price: 159,
            image: '/Kuppi.svg' // Mocking pouch image based on design
        },
        {
            id: 3,
            name: 'Vermicelli',
            availability: 'Available in 1L',
            price: 159,
            image: '/vermicil.svg'
        }
    ]);

    const handleRemoveFromWishlist = (id) => {
        setWishlistItems(wishlistItems.filter(item => item.id !== id));
    };

    return (
        <div className="wishlist-container">
            <h2 className="wishlist-heading">Whishlist</h2>
            <div className="wishlist-grid">
                {wishlistItems.map((product) => (
                    <div className="wishlist-card" key={product.id}>
                        <div className="card-image-wrapper">
                            <button 
                                className="remove-btn" 
                                onClick={() => handleRemoveFromWishlist(product.id)}
                                title="Remove from wishlist"
                            >
                                <FaHeart className="heart-icon filled" />
                            </button>
                            <img src={product.image} alt={product.name} />
                            <button className="add-to-cart-btn" title="Add to cart">
                                <GoPlus className="add-icon" />
                            </button>
                        </div>
                        <div className="card-details">
                            <h3>{product.name}</h3>
                            <p>{product.availability}</p>
                            <div className="price">₹{product.price}</div>
                        </div>
                    </div>
                ))}
                {wishlistItems.length === 0 && (
                    <div className="empty-wishlist">Your wishlist is empty.</div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
