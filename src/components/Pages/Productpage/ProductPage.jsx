// src/pages/ProductPage/ProductPage.js
import React from 'react'
import './ProductPage.scss'
import Navbar from '../../Navbar/Navbar'
import { BsBoxSeam, BsHeadset, BsPlus } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../../../redux/slices/cartSlice'
import OurPromise from '../../OurPromise/OurPromise'

const ProductPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [selectedSize, setSelectedSize] = React.useState("12");

    // Fetch product from redux store by ID
    const products = useSelector((state) => state.data.products);

    // Find matching product
    const product = products.find(p => p.id === id);

    // Provide a fallback if loading or not found
    if (!product) {
        return (
            <div className="Product-page-wrapper">
                <Navbar />
                <div className="container-fluid" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <p>Loading product details... Or product not found.</p>
                </div>
                {/* <Footer /> */}
            </div>
        )
    }

    // Adapt backend data to the existing UI shape
    const productData = {
        id: product.id,
        name: product.name || "Unknown Product",
        price: product.priceNumber || product.price || 0,
        offers: product.offerPercentage ? `${product.offerPercentage}% OFF` : "",
        imageUrl: product.primaryImage || product.image || product.images?.[0]?.url || "/Edhwi-Packetss.svg",
        features: product.features || "Premium Quality | 100% Pure | Cold Pressed",
        description: product.description || "Experience the natural freshness...",
        storageInstruction: product.storageInstruction || "Store in a cool, dry place.",
        shelfLife: product.shelfLife || "12 months from the date of packaging.",
        certification: product.certification || "FSSAI Approved",
        images: product.images?.length > 0 ? product.images : [{ url: product.primaryImage || "/Edhwi-Packetss.svg" }],
        sizes: product.variants?.map(v => v.size || v.color) || ["Standard"]
    };

    const handleAddToCartClick = () => {
        dispatch(addToCart(product));
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

                        {/* Buttons (UI Only) */}
                        <div className='buy-now'>
                            <button className='Link w-100' onClick={handleAddToCartClick}>Add to cart</button>
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
                        {/* <p className='Virgin'>100% Pure Coconut Oil</p> */}

                        {/* <div className="row">
                            ...
                        </div> */}

                        <h3 className='Other-pro'>Other products</h3>

                        <div className="row">
                            {products.filter(p => p.id !== product.id).slice(0, 3).map((item) => (
                                <div key={item.id} className="col-lg-4 col-md-6 col-sm-12">
                                    <div className="other-product-card">
                                        <div className="other-product-image">
                                            <img src={item.primaryImage || item.images?.[0]?.url || '/Bottle-Coconut.svg'} alt={item.name} />
                                            <div className="add-to-cart-btn" onClick={() => dispatch(addToCart(item))}>
                                                <BsPlus />
                                            </div>
                                        </div>
                                        <div className="other-product-details">
                                            <h5>{item.name}</h5>
                                            <p className="other-product-features">Available in <span>{item.variants?.[0]?.size || "Standard"}</span></p>
                                            <p className="other-product-price">₹{item.priceNumber || item.price || 0}</p>
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