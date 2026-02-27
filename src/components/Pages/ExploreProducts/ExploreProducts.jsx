import React, { useState, useEffect, useCallback, useMemo } from 'react'
import './ExploreProducts.scss'
import { VscSettings } from 'react-icons/vsc'
import ProductSidebarMobile from '../../Theams/MobileProductSidebar/ProductSidebarMobile'
import { GoPlus } from "react-icons/go";
import { Link } from 'react-router-dom'
// import Breadcrumb from '../../common/BreadCrumb/BreadCrumb'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'
import { FaCheck } from 'react-icons/fa'
import { BsArrowUpRightCircleFill } from 'react-icons/bs'
import Productsidebar from '../../Theams/ProductSidebar/Productsidebar'

const ExploreProducts = () => {
    const breadcrumbItems = [
        { label: 'Homepage', path: '/' },
        { label: 'Products', path: '/ExploreProducts' }
    ];

    const [sideBarIsOpen, setSidebarIsOpen] = useState(true);
    const [mobileSideBarIsOpen, setMobileSideBarIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Cart state
    const [cartItems, setCartItems] = useState(new Set());

    // Wishlist state
    const [wishlistItems, setWishlistItems] = useState(new Set());

    const [currentFilters, setCurrentFilters] = useState({
        categories: [],
        price: [],
        colors: []
    });

    const [sortBy, setSortBy] = useState('name');

    // Static fallback products
    const allProductsData = useMemo(() => [
        {
            id: 1,
            name: "Karikku Pure Coconut Oil - Pet Bottle",
            image: "/vermicil.svg",
            availability: "Available in 1L",
            volumes: ["1L"],
            price: "₹89",
            categoryName: "Food",
            categoryId: "food",
            variantCombinations: [{ color: "Clear" }],
            sellingPrice: 89,
            priceNumber: 89,
            variants: [{ color: "Clear" }]
        },

        {
            id: 1,
            name: "Karikku Pure Coconut Oil - Pet Bottle",
            image: "/Kuppi.svg",
            availability: "Available in 1L",
            volumes: ["1L"],
            price: "₹89",
            categoryName: "Food",
            categoryId: "food",
            variantCombinations: [{ color: "Clear" }],
            sellingPrice: 89,
            priceNumber: 89,
            variants: [{ color: "Clear" }]
        },

        {
            id: 1,
            name: "Karikku Pure Coconut Oil - Pet Bottle",
            image: "/Coconut-Edhwi-bottle.svg",
            availability: "Available in 1L",
            volumes: ["1L"],
            price: "₹89",
            categoryName: "Food",
            categoryId: "food",
            variantCombinations: [{ color: "Clear" }],
            sellingPrice: 89,
            priceNumber: 89,
            variants: [{ color: "Clear" }]
        },

        {
            id: 1,
            name: "Karikku Pure Coconut Oil - Pet Bottle",
            image: "/vermicil.svg",
            availability: "Available in 1L",
            volumes: ["1L"],
            price: "₹89",
            categoryName: "Food",
            categoryId: "food",
            variantCombinations: [{ color: "Clear" }],
            sellingPrice: 89,
            priceNumber: 89,
            variants: [{ color: "Clear" }]
        },

        {
            id: 1,
            name: "Karikku Pure Coconut Oil - Pet Bottle",
            image: "/Kuppi.svg",
            availability: "Available in 1L",
            volumes: ["1L"],
            price: "₹89",
            categoryName: "Food",
            categoryId: "food",
            variantCombinations: [{ color: "Clear" }],
            sellingPrice: 89,
            priceNumber: 89,
            variants: [{ color: "Clear" }]
        },

        {
            id: 1,
            name: "Karikku Pure Coconut Oil - Pet Bottle",
            image: "/Bottle-Coconut.svg",
            availability: "Available in 1L",
            volumes: ["1L"],
            price: "₹89",
            categoryName: "Food",
            categoryId: "food",
            variantCombinations: [{ color: "Clear" }],
            sellingPrice: 89,
            priceNumber: 89,
            variants: [{ color: "Clear" }]
        },
    ], []);

    // Wishlist toggle (local only)
    const handleWishlistToggle = useCallback((e, productId) => {
        e.preventDefault();
        e.stopPropagation();

        setWishlistItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(productId)) {
                newSet.delete(productId);
            } else {
                newSet.add(productId);
            }
            return newSet;
        });
    }, []);

    // Get wishlist icon based on state
    const getWishlistIcon = useCallback((productId) => {
        const isInWishlist = wishlistItems.has(productId);
        return (
            <div className="wishlist-icon-container">
                {isInWishlist ?
                    <FaHeart className='heart-icon filled' /> :
                    <FaRegHeart className='heart-icon unfilled' />
                }
            </div>
        );
    }, [wishlistItems]);

    // Cart toggle (local only)
    const handleAddToCart = useCallback((e, productId) => {
        e.preventDefault();
        e.stopPropagation();

        setCartItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(productId)) {
                newSet.delete(productId);
            } else {
                newSet.add(productId);
            }
            return newSet;
        });
    }, []);

    // Get cart button content
    const getAddButtonContent = useCallback((productId) => {
        const isProductInCart = cartItems.has(productId);
        if (isProductInCart) {
            return <FaCheck className='check-icon' style={{ color: '#4CAF50' }} />;
        }
        return <GoPlus className='add-icon' />;
    }, [cartItems]);

    // Apply filters and sorting
    const products = useMemo(() => {
        let filtered = [...allProductsData];

        // Filter by categories
        if (currentFilters.categories.length > 0 && !currentFilters.categories.includes('all')) {
            filtered = filtered.filter(product =>
                currentFilters.categories.includes(product.categoryId) ||
                currentFilters.categories.includes(product.categoryName)
            );
        }

        // Filter by price ranges
        if (currentFilters.price.length > 0) {
            filtered = filtered.filter(product => {
                const productPrice = product.priceNumber || 0;
                return currentFilters.price.some(priceRange => {
                    switch (priceRange) {
                        case '₹0 - ₹100': return productPrice >= 0 && productPrice <= 100;
                        case '₹100 - ₹300': return productPrice > 100 && productPrice <= 300;
                        case '₹300 - ₹500': return productPrice > 300 && productPrice <= 500;
                        case '₹500 - ₹1000': return productPrice > 500 && productPrice <= 1000;
                        case '₹1000+': return productPrice > 1000;
                        default: return true;
                    }
                });
            });
        }

        // Filter by colors
        if (currentFilters.colors.length > 0) {
            filtered = filtered.filter(product => {
                if (!product.variantCombinations || product.variantCombinations.length === 0) return false;
                return product.variantCombinations.some(variant =>
                    currentFilters.colors.some(selectedColor =>
                        variant.color && variant.color.toLowerCase() === selectedColor.toLowerCase()
                    )
                );
            });
        }

        // Sort
        switch (sortBy) {
            case 'price-low-to-high':
                filtered.sort((a, b) => a.priceNumber - b.priceNumber);
                break;
            case 'price-high-to-low':
                filtered.sort((a, b) => b.priceNumber - a.priceNumber);
                break;
            case 'name':
            default:
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }

        return filtered;
    }, [allProductsData, currentFilters, sortBy]);

    // Check if screen is mobile size
    useEffect(() => {
        const checkScreenSize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            if (mobile) {
                setSidebarIsOpen(false);
            } else {
                setMobileSideBarIsOpen(false);
            }
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const handleSideBar = useCallback(() => {
        if (isMobile) {
            setMobileSideBarIsOpen(prev => !prev);
        } else {
            setSidebarIsOpen(prev => !prev);
        }
    }, [isMobile]);

    const handleMobileSideBar = useCallback(() => {
        setMobileSideBarIsOpen(prev => !prev);
    }, []);

    const handleSortChange = useCallback((event) => {
        const value = event.target.value;
        switch (value) {
            case 'lowToHigh': setSortBy('price-low-to-high'); break;
            case 'highToLow': setSortBy('price-high-to-low'); break;
            case 'newest': setSortBy('newest'); break;
            default: setSortBy('name');
        }
    }, []);

    const handleFiltersChange = useCallback((sidebarFilters) => {
        setCurrentFilters(sidebarFilters);
    }, []);

    const clearFilters = useCallback(() => {
        setCurrentFilters({ categories: [], price: [], colors: [] });
        setSortBy('name');
    }, []);

    // Memoize column class
    const columnClass = useMemo(() => {
        if (isMobile) return "col-6";
        return sideBarIsOpen ? "col-lg-4 col-md-6 col-sm-12" : "col-lg-3 col-md-6 col-sm-12";
    }, [isMobile, sideBarIsOpen]);

    // Memoize product chunking
    const productRows = useMemo(() => {
        const productsPerRow = isMobile ? 2 : (sideBarIsOpen ? 3 : 4);
        const chunks = [];
        for (let i = 0; i < products.length; i += productsPerRow) {
            chunks.push(products.slice(i, i + productsPerRow));
        }
        return chunks;
    }, [products, isMobile, sideBarIsOpen]);

    return (
        <div className='Explore-Main-wrapper'>
            {/* <ScrollToTopOnMount /> */}
            {/* <Navbar /> */}

            <div className="explore-contents">
                {/* <div className="breadcrumb-section-Explore">
                    <Breadcrumb items={breadcrumbItems} />
                </div> */}

                <div className="Head-and-filter-main-flex">
                    <div className="heading-section-explore">
                        <h3>Explore our Products</h3>
                        <div className="choose-section">
                            <p>Choose products {products.length > 0 && `(${products.length} items)`}</p>
                        </div>
                    </div>

                    <div className="fiiter-section-explore-child-flex">
                        <div className="filters-section-e" onClick={handleSideBar}>
                            <p>
                                {isMobile
                                    ? (mobileSideBarIsOpen ? "Hide Filters" : "Show Filters")
                                    : (sideBarIsOpen ? "Hide Filters" : "Show Filters")
                                }
                                <VscSettings />
                            </p>
                        </div>

                        <div className="filters-section-e">
                            <select
                                id="sortDropdown"
                                className="sort-dropdown"
                                value={
                                    sortBy === 'price-low-to-high' ? 'lowToHigh' :
                                        sortBy === 'price-high-to-low' ? 'highToLow' :
                                            sortBy === 'newest' ? 'newest' : 'name'
                                }
                                onChange={handleSortChange}
                            >
                                <option value="name">Sort By</option>
                                <option value="lowToHigh">Price Low to High</option>
                                <option value="highToLow">Price High to Low</option>
                                <option value="newest">Newest First</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="cards-and-filter">
                    {!isMobile && sideBarIsOpen && (
                        <div className="left-side">
                            <Productsidebar onFiltersChange={handleFiltersChange} />
                        </div>
                    )}

                    {isMobile && (
                        <ProductSidebarMobile
                            isOpen={mobileSideBarIsOpen}
                            onToggle={handleMobileSideBar}
                            showTriggerButton={false}
                            onFiltersChange={handleFiltersChange}
                        />
                    )}

                    <div className="cards-whole-three right-side">
                        {productRows?.map((row, rowIndex) => (
                            <div key={rowIndex} className="row three-cards">
                                {row?.map((product) => (
                                    <div key={product.id} className={columnClass}>
                                        <Link to={`/Product-page/${product.id}`} className='Right-side-link'>
                                            <div className="product-card-main">
                                                <div className="product-card">
                                                    <div className="prod-image-section">
                                                        <div
                                                            className="heart-icon-section"
                                                            onClick={(e) => handleWishlistToggle(e, product.id)}
                                                        >
                                                            {getWishlistIcon(product.id)}
                                                        </div>
                                                        <img src={product.image} alt={product.name} />
                                                        <div
                                                            className={`add-icon-wrapper ${cartItems.has(product.id) ? 'in-cart' : ''}`}
                                                            onClick={(e) => handleAddToCart(e, product.id)}
                                                            title={cartItems.has(product.id) ? 'Remove from cart' : 'Add to cart'}
                                                        >
                                                            {getAddButtonContent(product.id)}
                                                        </div>
                                                    </div>
                                                    <div className="product-details">
                                                        <h3>{product.name}</h3>
                                                        <h4>Available in <span>{product?.variants?.length || 1} colors</span></h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ))}

                        {products.length === 0 && (
                            <div className='loading' style={{ textAlign: 'center', padding: '50px' }}>
                                <p>No products found matching your criteria.</p>
                                <button onClick={clearFilters}>
                                    Clear Filters <BsArrowUpRightCircleFill className='btn-icon' />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* <Footer /> */}
        </div>
    );
}

export default ExploreProducts