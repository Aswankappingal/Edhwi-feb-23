import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addToCart, setBuyNowItem, resetCheckoutMode } from '../../../redux/slices/cartSlice'
import { resetOrderState } from '../../../redux/slices/orderSlice'
import { fetchProducts } from '../../../redux/slices/dataSlice'
import { setLoginModalOpen } from '../../../redux/slices/authSlice'
import { toast } from 'react-toastify';
import './ProductPage.scss'
import Navbar from '../../Navbar/Navbar'
import { BsBoxSeam, BsHeadset, BsPlus } from 'react-icons/bs'
import OurPromise from '../../OurPromise/OurPromise'
/* =====================================================
   🔥 STATIC PRODUCT DATA OBJECT
===================================================== */

// Default fallback properties for missing DB data
const defaultProductProps = {
    offers: "",
    features: "Premium Quality | 100% Pure | Cold Pressed | Hygienically packed.",
    description: "Experience the natural freshness of our products, sourced and packed with utmost care.",
    storageInstruction: "Store in a cool, dry place. Keep away from direct sunlight.",
    shelfLife: "12 months from the date of packaging.",
    certification: "FSSAI Approved",
    sizes: ["12", "24", "48", "200 ml", "1 L"],
    bulkSupportText: "Bulk orders available for all products, customized to your requirements.",
    customerSupportText: "Full customer support and all necessary product documents provided for your convenience."
};

/* =====================================================
   PROCESS DATA
===================================================== */

const processData = {
    title: "100% Pure Coconut Oil",
    steps: [
        {
            image: "/Images/Edhwi-bottle.svg",
            stepNumber: "01",
            title: "Fine & Matured Coconuts",
            description: "Harvested at the perfect age for best quality."
        },
        {
            image: "/Images/Edhwi-bottle.svg",
            stepNumber: "02",
            title: "Premium Quality Copra",
            description: "Extracted gently preserving nutrients and aroma."
        },
        {
            image: "/Images/Edhwi-bottle.svg",
            stepNumber: "03",
            title: "Hygienically Packed",
            description: "Packed without additives or preservatives."
        }
    ]
}

const ProductPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items: cartItems, loading } = useSelector((state) => state.cart);
    const { products, status: productStatus } = useSelector((state) => state.data);
    const { token, user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (productStatus === 'idle') {
            dispatch(fetchProducts());
        }
    }, [productStatus, dispatch]);

    const product = products?.find(p => p.id === id || p.id === parseInt(id));

    // Robust size/variant extraction logic
    const extractVariantValue = (v) => {
        if (!v) return '';
        // 1. Try common explicit field names
        const val = v.weight || v.volume || v.amount || v.size || v.Size || v.packingSize || v.PackingSize || v.variantName;
        if (val) return String(val).trim();
        
        // 2. Try parsing from the name (e.g. "Select packing size: 100 ml")
        if (v.name && v.name.includes(':')) {
            return v.name.split(':')[1].trim();
        }

        // 3. Last resort: v.name itself
        return v.name ? String(v.name).trim() : '';
    };

    // Get sizes from variant definitions or combinations - Normalize for consistent matching
    const availableSizes = (product?.variants && product.variants.length > 0 && product.variants[0].values) 
        ? product.variants[0].values.map(s => String(s).trim())
        : (product?.variantCombinations?.map(extractVariantValue).filter(Boolean) || defaultProductProps.sizes.map(s => String(s).trim()));

    const [selectedSize, setSelectedSize] = React.useState(availableSizes[0] || "");

    // Find selected variant combo - use robust comparison with normalization
    const selectedVariant = product?.variantCombinations?.find(v => 
        extractVariantValue(v).replace(/\s/g, '').toLowerCase() === selectedSize.replace(/\s/g, '').toLowerCase()
    ) || product?.variantCombinations?.[0];

    useEffect(() => {
        console.log("selectedVariant", selectedVariant);
    }, [selectedVariant]);

    // Combine DB data with UI defaults - Prioritize variant info but fall back to base product
    const productData = product ? {
        id: product.id,
        name: product.name,
        price: selectedVariant?.sellingPrice || selectedVariant?.price || product.sellingPrice || product.price || 0,
        mrp: selectedVariant?.price || selectedVariant?.mrp || product.mrp || product.price || 0,
        imageUrl: selectedVariant?.primaryImage || selectedVariant?.images?.[0]?.url || product.primaryImage || (product.images && product.images[0]?.url) || '/Kuppi.svg',
        images: (selectedVariant?.images && selectedVariant.images.length > 0) ? selectedVariant.images : (product.images || []),
        offers: product.offers || defaultProductProps.offers,
        features: product.features || defaultProductProps.features,
        description: product.description || defaultProductProps.description,
        storageInstruction: product.storageInstruction || defaultProductProps.storageInstruction,
        shelfLife: product.shelfLife || defaultProductProps.shelfLife,
        certification: product.certification || defaultProductProps.certification,
        sizes: availableSizes,
        bulkSupportText: product.bulkSupportText || defaultProductProps.bulkSupportText,
        customerSupportText: product.customerSupportText || defaultProductProps.customerSupportText
    } : null;

    // Reset selected size when product changes
    useEffect(() => {
        if (availableSizes.length > 0 && (!selectedSize || !availableSizes.includes(selectedSize))) {
            setSelectedSize(availableSizes[0]);
        }
    }, [product, availableSizes]);

    useEffect(() => {
        console.log("productData", productData);
    }, [productData]);

    if (productStatus === 'loading') {
        return <div style={{ padding: '100px', textAlign: 'center' }}>Loading product details...</div>;
    }

    if (!productData) {
        return <div style={{ padding: '100px', textAlign: 'center' }}>Product not found.</div>;
    }

    // Check if the current product is already in the cart
    // Check if the currently selected variant is already in the cart
    const isProductInCart = cartItems.some(item => {
        const productIdMatch = item.productId === productData.id.toString() || item.productId === productData.id;
        if (!productIdMatch) return false;
        
        // If product has variants, also match the variantId
        if (productData.hasVariants && selectedVariant) {
            return item.variantCombination?.variantId === selectedVariant.variantId;
        }
        
        // If no variants, productId match is sufficient
        return true;
    });

    const handleCartAction = async () => {
        if (!token && !user) {
            dispatch(setLoginModalOpen(true));
            return;
        }

        if (isProductInCart) {
            navigate('/cart');
        } else {
            try {
                // Pass selected variant details to cart
                await dispatch(addToCart({
                    productId: productData.id.toString(),
                    quantity: 1,
                    variantCombination: selectedVariant ? {
                        variantId: selectedVariant.variantId,
                        name: selectedVariant.name || extractVariantValue(selectedVariant)
                    } : null
                })).unwrap();
                toast.success(`${productData.name} added to cart!`);
            } catch (error) {
                toast.error(error || "Failed to add product to cart");
            }
        }
    };

    const handleBuyNow = () => {
        if (!token && !user) {
            dispatch(setLoginModalOpen(true));
            return;
        }

        const checkoutItem = {
            productId: productData.id.toString(),
            quantity: 1,
            variantCombination: selectedVariant ? {
                variantId: selectedVariant.variantId,
                name: selectedVariant.name || extractVariantValue(selectedVariant)
            } : null,
            productDetails: {
                name: productData.name,
                price: productData.price,
                mrp: productData.mrp,
                variant: selectedSize,
                image: productData.imageUrl
            }
        };

        dispatch(resetOrderState());
        dispatch(setBuyNowItem(checkoutItem));
        navigate('/address');
    };

    return (
        <div className="Product-page-wrapper">
            <Navbar />
            {/* <ScrollToTopOnMount /> */}

            <div className="container-fluid">
                <div className="product-page-sub row">

                    {/* Product Image */}
                    <div className="col-lg-6 col-md-6 col-sm-12 product-page-card">
                        <img src={productData.imageUrl} alt={productData.name} />
                    </div>

                    {/* Product Details */}
                    <div className="col-lg-6 col-md-6 col-sm-12 product-page-contents">
                        <h2>{productData.name}</h2>
                        <p>{productData.features}</p>

                        <p id='price'>Price</p>
                        <h3 className="price-range">
                            ₹{productData.price}
                            {productData.mrp > productData.price && (
                                <span className="mrp-struck" style={{ textDecoration: 'line-through', color: '#888', fontSize: '0.8em', marginLeft: '10px' }}>
                                    ₹{productData.mrp}
                                </span>
                            )}
                            {productData.mrp > productData.price && (
                                <span className="offer-badge" style={{ color: '#2d68f8', fontSize: '0.6em', marginLeft: '10px', background: '#eef3ff', padding: '2px 8px', borderRadius: '4px' }}>
                                    {Math.round(((productData.mrp - productData.price) / productData.mrp) * 100)}% OFF
                                </span>
                            )}
                        </h3>

                        {/* Packing Size Selector */}
                        <div className="packing-selector-container">
                            <h4 className="packageing-select">Select packing size</h4>
                            <div className="size-options mt-3">
                                {productData.sizes.map((size) => (
                                    <React.Fragment key={size}>
                                        <button
                                            className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </button>
                                        {size === "48" && <div className="size-divider"></div>}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="Bulk-sections mt-4">
                            <div className="bulk-sections-content">
                                <div className="icons-bulk">
                                    <BsBoxSeam size={20} color="#000000ff" />
                                </div>
                                <div className="contents">
                                    {productData.bulkSupportText}
                                </div>
                            </div>
                            <div className="bulk-sections-content">
                                <div className="icons-bulk">
                                    <BsHeadset size={20} color="#1c1c1c" />
                                </div>
                                <div className="contents">
                                    {productData.customerSupportText}
                                </div>
                            </div>
                        </div>

                        {/* Buttons (UI) */}
                        <div className='buy-now-container'>
                            <button className='add-to-cart-btn btn' onClick={handleCartAction} disabled={loading && !isProductInCart}>
                                {isProductInCart ? 'Go to Cart' : (loading ? 'Adding...' : 'Add to cart')}
                            </button>
                            <button className='buy-now-btn btn' onClick={handleBuyNow}>
                                Buy Now
                            </button>
                        </div>

                    </div>
                </div>

                {/* Description Section */}
                <div className="text-only-product row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-12 text-sections-whole">
                        <p>{productData.description}</p>
                        <h6>Storage Instructions : <span>{productData.storageInstruction}</span></h6>
                        <h6>Shelf Life : <span>{productData.shelfLife}</span></h6>
                        <h6>Certifications : <span>{productData.certification}</span></h6>
                    </div>
                </div>

                {/* Additional Images */}
                {/* Gallary Image Section */}
                <div className="row image-whole-section">
                    {productData.images && productData.images.length > 0 ? (
                        productData.images.map((image, index) => (
                            <div key={index} className="col-lg-6 col-md-6 col-sm-6 col-6 mb-4">
                                <div className='card-image-section'>
                                    <img src={image.url || image.publicUrl} alt={`${productData.name} view ${index + 1}`} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center py-4">
                            <p className="text-muted">No additional images available for this selection.</p>
                        </div>
                    )}
                </div>

                <div>
                    <OurPromise />
                </div>



                {/* Process Section */}
                <div className="container">
                    <div className="our-process-main-section">
                        {/* <h3 className='process'>Our process</h3> */}
                        {/* <p className='Virgin'>{processData.title}</p> */}

                        {/* <div className="row">
                            {processData.steps.map((step, index) => (
                                <div key={index} className="col-lg-4 col-md-6 col-sm-12">
                                    <div className="cards-n-images-section">
                                        <img src={step.image} alt={step.title} />
                                        <p className='steps-only'>Step {step.stepNumber}</p>
                                        <h6 className='Handpicked'>{step.title}</h6>
                                        <p className='para-process'>{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div> */}

                        <h3 className='Other-pro'>Other products</h3>

                        <div className="row">
                            {products
                                ?.filter(item => item.id !== productData.id)
                                .slice(0, 3)
                                .map((item) => (
                                <div key={item.id} className="col-lg-4 col-md-6 col-sm-12">
                                    <div 
                                        className="other-product-card" 
                                        onClick={() => {
                                            navigate(`/Product-page/${item.id}`);
                                            window.scrollTo(0, 0);
                                        }} 
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="other-product-image">
                                            <img src={item.imageUrl || (item.images && item.images[0]?.url) || '/Kuppi.svg'} alt={item.name} />
                                            <div className="add-to-cart-btn" onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/Product-page/${item.id}`);
                                                window.scrollTo(0, 0);
                                            }}>
                                                <BsPlus />
                                            </div>
                                        </div>
                                        <div className="other-product-details">
                                            <h5>{item.name || 'Product'}</h5>
                                            <p className="other-product-features">Available in <span>{
                                                (item.variantCombinations && item.variantCombinations.length > 0) 
                                                    ? (v => v.weight || v.volume || v.amount || v.size || v.Size || v.packingSize || v.PackingSize || (v.name ? v.name.split(':')[1]?.trim() || v.name : ''))(item.variantCombinations[0])
                                                    : (item.sizes ? item.sizes[0] : 'Various Sizes')
                                            }</span></p>
                                            <div className="other-product-price-section">
                                                {(() => {
                                                    const sellingPrice = item.sellingPrice || item.price || (item.variantCombinations && item.variantCombinations[0]?.sellingPrice) || (item.variantCombinations && item.variantCombinations[0]?.price) || 0;
                                                    const mrp = item.mrp || item.price || (item.variantCombinations && item.variantCombinations[0]?.price) || sellingPrice;
                                                    const hasDiscount = mrp > sellingPrice;
                                                    
                                                    return (
                                                        <>
                                                            <span className="selling-price" style={{ fontWeight: '600', color: '#000' }}>₹{sellingPrice}</span>
                                                            {hasDiscount && (
                                                                <span className="mrp-price" style={{ textDecoration: 'line-through', color: '#888', fontSize: '0.85em', marginLeft: '8px' }}>₹{mrp}</span>
                                                            )}
                                                        </>
                                                    );
                                                })()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default ProductPage