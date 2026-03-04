// src/pages/ProductPage/ProductPage.js
import React from 'react'
import './ProductPage.scss'
import Navbar from '../../Navbar/Navbar'
import { BsBoxSeam, BsHeadset, BsPlus } from 'react-icons/bs'
import OurPromise from '../../OurPromise/OurPromise'
/* =====================================================
   🔥 STATIC PRODUCT DATA OBJECT
===================================================== */

const productData = {
    id: 1,
    name: "Coconut Oil pet Bottle",
    price: 145,
    offers: "10% OFF",
    imageUrl: "/Edhwi-Packetss.svg",
    features: "Premium Quality | 100% Pure | Cold Pressed | Hygienically packed in tamper-proof bottle.",
    description: "Experience the natural freshness of Karikku Tender Coconut Water, tapped from handpicked young coconuts grown in Kerala. Packed in a hygienic, food-grade bottle, it’s the perfect way to hydrate — pure, refreshing, and just as nature intended..",
    storageInstruction: "Store in a cool, dry place. Keep away from direct sunlight.",
    shelfLife: "12 months from the date of packaging.",
    certification: "FSSAI Approved | 100% Vegetarian | Lab-tested purity",
    images: [
        { url: "/Edhwi-Packetss.svg" },
        { url: "/Edhwi-bottle.svg" }
    ],
    sizes: ["12", "24", "48", "200 ml", "1 L"]
}

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

    const [selectedSize, setSelectedSize] = React.useState("12");

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
                            <button className='Link w-100'>Buy now</button>
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