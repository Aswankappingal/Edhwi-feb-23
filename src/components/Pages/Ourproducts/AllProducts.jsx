import React from 'react'
import Navbar from '../../Navbar/Navbar';
import './AllProducts.scss'
import { Link } from 'react-router-dom'
import { ImArrowUpRight2 } from "react-icons/im";
// import Footer from '../../common/Footer/Footer';
// import ScrollToTopOnMount from '../../common/ScrollToTopOnMount';
import { PiPlusBold } from 'react-icons/pi';
// import Breadcrumb from '../../common/BreadCrumb/BreadCrumb';

const staticProducts = [
    {
        id: 1,
        productName: 'Karikku Pure Coconut Oil - Pet Bottle',
        imageUrl: '/vermicil.svg',
        availability: 'In Stock',
        variants: [{ name: 'Size', values: ['1L'] }],
        price: 200,
        sellingPrice: 180,
    },
    {
        id: 2,
        productName: 'Karikku Pure Coconut Oil - Pouch',
        imageUrl: './vermicil.svg',
        availability: 'In Stock',
        variants: [{ name: 'Size', values: ['500ml', '1L'] }],
        price: 150,
        sellingPrice: 130,
    },
    {
        id: 3,
        productName: 'Tender Coconut Water',
        imageUrl: './vermicil.svg',
        availability: 'In Stock',
        variants: [{ name: 'Pack', values: ['6', '12', '24', '48'] }],
        price: 300,
        sellingPrice: 280,
    },
];

const AllProducts = () => {
    const breadcrumbItems = [
        { label: 'Homepage', path: '/' },
        { label: 'Products', path: '/products' }
    ];

    const formatVariants = (variants) => {
        if (!variants || !Array.isArray(variants) || variants.length === 0) return null;
        const allValues = variants.flatMap(variant =>
            variant.values && Array.isArray(variant.values) ? variant.values : []
        );
        return allValues.length > 0 ? allValues.join(', ') : null;
    };

    const handleAddProduct = (product) => {
        console.log('Adding product:', product);
    };

    return (
        <div className='exclusivewrapper'>
            <Navbar />
            {/* <ScrollToTopOnMount /> */}

            <div className="exclusive-content">
                <div className="breadcrumb-section">
                    <div className="breadcrumb">
                        {/* <Breadcrumb items={breadcrumbItems} /> */}
                    </div>
                </div>

                <div className="heading-section">
                    <h3>Pick from our exclusive collection</h3>
                    <div className="choose-section">
                        <p>Choose products ({staticProducts.length} available)</p>
                    </div>
                </div>

                <div className="row three-cards">
                    {staticProducts.map((product, index) => {
                        const formattedVariants = formatVariants(product.variants);

                        return (
                            <div key={product.id || index} className="col-lg-4 col-md-6 col-sm-12">
                                <Link className='exclu-prod' to={`/product-page/${product.id}`}>
                                    <div className="product-card">
                                        <div className="product-image">
                                            <div className="product-card-img-btn">
                                                <img
                                                    src={product.imageUrl || ''}
                                                    alt={product.productName || 'Product'}
                                                />
                                                <div className="button-main">
                                                    <div className='btn-main'>
                                                        <button
                                                            className="add-btn"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handleAddProduct(product);
                                                            }}
                                                            disabled={product.availability === 'Out of stock'}
                                                        >
                                                            <PiPlusBold style={{ margin: "0px" }} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="product-details">
                                            <h6>{product.productName || 'Product Name'}</h6>

                                            <div className="availability">
                                                {formattedVariants ? (
                                                    <p>Available in <span className="volume">{formattedVariants}</span></p>
                                                ) : (
                                                    <p className={`availability-status ${product.availability === 'Out of stock' ? 'out-of-stock' : 'in-stock'}`}>
                                                        {product.availability || 'Available'}
                                                    </p>
                                                )}
                                            </div>

                                            {(product.price || product.sellingPrice) && (
                                                <div className="price-section">
                                                    {product.sellingPrice && product.price && product.sellingPrice < product.price ? (
                                                        <div>
                                                            <span className="current-price">₹{product.sellingPrice}</span>
                                                            <span className="original-price" style={{
                                                                textDecoration: 'line-through',
                                                                marginLeft: '8px',
                                                                color: '#999'
                                                            }}>₹{product.price}</span>
                                                        </div>
                                                    ) : (
                                                        <span className="price">₹{product.sellingPrice || product.price}</span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}

                    <Link to={'/ExploreProducts'}>
                        <div className="merchanise-banner">
                            <div className="merchanise-banner-sub">
                                <div className="text-section">
                                    <p>Explore our</p>
                                    <h2>Merchandise <br /> Products</h2>
                                    <button className="explore-btn"><ImArrowUpRight2 className='ICons-arrow' /></button>
                                </div>

                                <div className="background-shapes">
                                    <img src="/Images/Yellow-light.svg" alt="Yellow Light" className="light-img" />
                                    <br />
                                    <img src="/Images/Yelllow-line.svg" alt="Yellow Arc" className="dark-img" />
                                    <img src="/Images/child-image.svg" alt="child Arc" className="child-img" />
                                    <img src="/Images/Shirt.svg" alt="Shirt-Arc" className="shirt-img" />
                                    <img src="/Images/Cap.svg" alt="Cap-Arc" className="Cap-img" />
                                    <img src="/Images/White.svg" alt="White-shirt" className="White-shirt-img" />
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            {/* <Footer /> */}
        </div>
    );
};

export default AllProducts;