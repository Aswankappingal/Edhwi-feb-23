import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addToCart } from '../../../redux/slices/cartSlice'
import { fetchProducts } from '../../../redux/slices/dataSlice'
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
    sizes: ["12", "24", "48", "200 ml", "1 L"]
};

/* =====================================================
   PROCESS DATA
===================================================== */

const processData = {
    title: "100% Pure Coconut Oil",
    steps: [
        {
            image: "Edhwi-bottle.svg",
            stepNumber: "01",
            title: "Fine & Matured Coconuts",
            description: "Harvested at the perfect age for best quality."
        },
        {
            image: "Edhwi-bottle.svg",
            stepNumber: "02",
            title: "Premium Quality Copra",
            description: "Extracted gently preserving nutrients and aroma."
        },
        {
            image: "Edhwi-bottle.svg",
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

    useEffect(() => {
        if (productStatus === 'idle') {
            dispatch(fetchProducts());
        }
    }, [productStatus, dispatch]);

    const product = products?.find(p => p.id === id || p.id === parseInt(id));

    // Combine DB data with UI defaults
    const productData = product ? {
        id: product.id,
        name: product.name,
        price: product.price || product.sellingPrice || product.priceNumber || 0,
        imageUrl: product.imageUrl || (product.images && product.images[0]?.url) || '/Kuppi.svg',
        images: product.images || [],
        offers: product.offers || defaultProductProps.offers,
        features: product.features || defaultProductProps.features,
        description: product.description || defaultProductProps.description,
        storageInstruction: product.storageInstruction || defaultProductProps.storageInstruction,
        shelfLife: product.shelfLife || defaultProductProps.shelfLife,
        certification: product.certification || defaultProductProps.certification,
        sizes: product.variantCombinations?.map(v => v.amount || v.weight || v.volume) || defaultProductProps.sizes
    } : null;

    const [selectedSize, setSelectedSize] = React.useState("12");

    if (productStatus === 'loading') {
        return <div style={{ padding: '100px', textAlign: 'center' }}>Loading product details...</div>;
    }

    if (!productData) {
        return <div style={{ padding: '100px', textAlign: 'center' }}>Product not found.</div>;
    }

    // Check if the current product is already in the cart
    const isProductInCart = cartItems.some(item => item.productId === productData.id.toString() || item.productId === productData.id);

    const handleCartAction = () => {
        if (isProductInCart) {
            navigate('/cart');
        } else {
            // For now, we assume a static product ID and a quantity of 1 for the 'Buy now' action wrapper.
            // If the backend requires a string, converting it.
            dispatch(addToCart({
                productId: productData.id.toString(),
                quantity: 1
            }));
        }
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
                            <span id='offers'> {productData.offers}</span>
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
                                    Bulk orders available for all products, customized to your requirements.
                                </div>
                            </div>
                            <div className="bulk-sections-content">
                                <div className="icons-bulk">
                                    <BsHeadset size={20} color="#1c1c1c" />
                                </div>
                                <div className="contents">
                                    Full customer support and all necessary product documents provided for your convenience.
                                </div>
                            </div>
                        </div>

                        {/* Buttons (UI) */}
                        <div className='buy-now'>
                            <button className='Link w-100' onClick={handleCartAction} disabled={loading && !isProductInCart}>
                                {isProductInCart ? 'Go to Cart' : (loading ? 'Adding...' : 'Add to cart')}
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
                <div className="row image-whole-section">
                    {productData.images.map((image, index) => (
                        <div key={index} className="col-lg-6 col-md-6 col-sm-6 col-6">
                            <div className='card-image-section'>
                                <img src={image.url} alt={`Product ${index + 1}`} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="row image-whole-section">
                    {productData.images.map((image, index) => (
                        <div key={index} className="col-lg-6 col-md-6 col-sm-6 col-6">
                            <div className='card-image-section'>
                                <img src={image.url} alt={`Product ${index + 1}`} />
                            </div>
                        </div>
                    ))}
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
                            {[
                                { id: 1, name: 'Whole Nutmeg', available: '40g', price: '125', img: 'Bottle-Coconut.svg' },
                                { id: 2, name: 'Coconut Oil - pouch', available: '1L', price: '145', img: 'packet edhwi.svg' }
                            ].map((item) => (
                                <div key={item.id} className="col-lg-4 col-md-6 col-sm-12">
                                    <div className="other-product-card">
                                        <div className="other-product-image">
                                            <img src={item.img} alt={item.name} />
                                            <div className="add-to-cart-btn">
                                                <BsPlus />
                                            </div>
                                        </div>
                                        <div className="other-product-details">
                                            <h5>{item.name}</h5>
                                            <p className="other-product-features">Available in <span>{item.available}</span></p>
                                            <p className="other-product-price">₹{item.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

            </div>

            {/* <Footer /> */}
        </div>
    )
}

export default ProductPage