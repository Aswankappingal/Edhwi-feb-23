import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaHeart } from 'react-icons/fa6';
import { GoPlus } from "react-icons/go";
import { FaCheck } from 'react-icons/fa';
import { removeFromWishlist } from '../../redux/slices/wishlistSlice';
import { addToCart } from '../../redux/slices/cartSlice';
import ToastModal from '../common/ToastModal/ToastModal';
import './Wishlist.scss';

const Wishlist = () => {
    const dispatch = useDispatch();
    const { items: wishlistItems, loading } = useSelector((state) => state.wishlist);
    const { items: cartItems } = useSelector((state) => state.cart);
    const { products: allProducts } = useSelector((state) => state.data);

    // Toast state
    const [toastConfig, setToastConfig] = React.useState({
        isOpen: false,
        message: '',
        type: 'success'
    });

    const handleRemoveFromWishlist = useCallback((productId) => {
        dispatch(removeFromWishlist({ productId })).then(() => {
            setToastConfig({
                isOpen: true,
                message: 'Product removed from wishlist!',
                type: 'error'
            });
        });
    }, [dispatch]);

    const handleAddToCart = useCallback((e, productId) => {
        e.preventDefault();
        e.stopPropagation();

        const product = allProducts?.find(p => p.id === productId);
        let variantCombination = null;

        if (product && product.variantCombinations && product.variantCombinations.length > 0) {
            const firstVariant = product.variantCombinations[0];
            variantCombination = {
                variantId: firstVariant.variantId,
                name: firstVariant.name || (v => v.weight || v.volume || v.amount || v.size || v.Size || v.packingSize || v.PackingSize || (v.name ? v.name.split(':')[1]?.trim() || v.name : ''))(firstVariant)
            };
        }

        dispatch(addToCart({ 
            productId, 
            quantity: 1,
            variantCombination
        }));
    }, [dispatch, allProducts]);

    const getAddButtonContent = useCallback((productId) => {
        const isProductInCart = cartItems.some(item => item.productId === productId);
        if (isProductInCart) {
            return <FaCheck className='check-icon' style={{ color: '#4CAF50' }} />;
        }
        return <GoPlus className='add-icon' />;
    }, [cartItems]);

    return (
        <div className="wishlist-container">
            <h2 className="wishlist-heading">Whishlist</h2>
            <div className="wishlist-grid">
                {loading && wishlistItems.length === 0 ? (
                    <div className="empty-wishlist">Loading your wishlist...</div>
                ) : (
                    wishlistItems.map((wishlistItem) => {
                        // Cross-reference with allProducts to get missing details if API only returns productId
                        const productRef = allProducts?.find(p => p.id === wishlistItem.productId) || {};
                        const displayImage = wishlistItem.productImage || productRef.imageUrl || (productRef.images && productRef.images[0]?.url) || '/Kuppi.svg';
                        const displayName = wishlistItem.productName || wishlistItem.name || productRef.name || 'Product';
                        
                        // Robust price extraction
                        const displayPrice = wishlistItem.sellingPrice || wishlistItem.price || productRef.sellingPrice || productRef.price || (productRef.variantCombinations && productRef.variantCombinations[0]?.sellingPrice) || (productRef.variantCombinations && productRef.variantCombinations[0]?.price) || 0;
                        const displayMRP = wishlistItem.mrp || productRef.mrp || productRef.price || (productRef.variantCombinations && productRef.variantCombinations[0]?.price) || displayPrice;

                        // Robust volume extraction
                        const displayVolume = (wishlistItem.volumes && wishlistItem.volumes[0]) || (productRef.variantCombinations && (v => v.weight || v.volume || v.amount || v.size || v.Size || v.packingSize || v.PackingSize || (v.name ? v.name.split(':')[1]?.trim() || v.name : ''))(productRef.variantCombinations[0])) || '1L';

                        return (
                            <div className="wishlist-card" key={wishlistItem.productId}>
                                <div className="card-image-wrapper">
                                    <button 
                                        className="remove-btn" 
                                        onClick={() => handleRemoveFromWishlist(wishlistItem.productId)}
                                        title="Remove from wishlist"
                                    >
                                        <FaHeart className="heart-icon filled" />
                                    </button>
                                    <img src={displayImage} alt={displayName} />
                                    <button 
                                        className="add-to-cart-btn" 
                                        title={cartItems.some(item => item.productId === wishlistItem.productId) ? "Added to cart" : "Add to cart"}
                                        onClick={(e) => handleAddToCart(e, wishlistItem.productId)}
                                    >
                                        {getAddButtonContent(wishlistItem.productId)}
                                    </button>
                                </div>
                                <div className="card-details">
                                    <h3>{displayName}</h3>
                                    <p>Available in {displayVolume}</p>
                                    <div className="price-details-wishlist">
                                        <span className="selling-price" style={{ fontWeight: '600', color: '#1c1c1c' }}>₹{displayPrice}</span>
                                        {displayMRP > displayPrice && (
                                            <span className="mrp-struck" style={{ textDecoration: 'line-through', color: '#888', marginLeft: '8px', fontSize: '0.9rem' }}>
                                                ₹{displayMRP}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
                {!loading && wishlistItems.length === 0 && (
                    <div className="empty-wishlist">Your wishlist is empty.</div>
                )}
            </div>

            <ToastModal 
                isOpen={toastConfig.isOpen} 
                message={toastConfig.message} 
                type={toastConfig.type} 
                onClose={() => setToastConfig(prev => ({ ...prev, isOpen: false }))} 
            />
        </div>
    );
};

export default Wishlist;
