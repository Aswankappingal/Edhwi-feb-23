import { RiTwitterXLine } from 'react-icons/ri';
import Navbar from '../../Navbar/Navbar';
import './BlogDetailsPage.scss';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RxDotFilled } from 'react-icons/rx';
import { GoLink } from 'react-icons/go';

/* =====================================================
   DEMO BLOG DATA (NEW SECTION ADDED)
   -----------------------------------------------------
   Replace image paths later with your images.
===================================================== */

const demoBlogs = [
    {
        id: "1",
        title: "Traditional Kerala Pickles: A Taste of Home",
        description:
            "In a world full of sugary drinks and synthetic flavors, going back to nature is not just refreshing — it’s necessary. That’s where Karikku Tender Coconut Water comes in.",
        content:
            "Supply chain management is evolving rapidly. AI, automation, and data analytics are helping companies optimize operations and improve efficiency.",
        category: "Technology",
        addedByName: "William Harris",
        imageUrl: "/Images/Blogs-inner.svg",
        createdAt: "2026-03-10",
    },
    {
        id: "2",
        title: "Logistics Optimization Strategies",
        description:
            "Companies are investing heavily in logistics optimization to reduce costs.",
        content:
            "Efficient logistics management plays a key role in business success. Using smart routing and predictive analytics improves delivery performance.",
        category: "Logistics",
        addedByName: "Jane Smith",
        imageUrl: "/Images/Blogs-inner.svg",
        createdAt: "2026-03-12",
    },
    {
        id: "3",
        title: "AI in Modern Warehousing",
        description:
            "Artificial intelligence is transforming warehouse automation.",
        content:
            "Modern warehouses are using robotics and AI to increase speed and accuracy in inventory management.",
        category: "Automation",
        addedByName: "Michael Lee",
        imageUrl: "/Images/Blogs-inner.svg",
        createdAt: "2026-03-14",
    },
    {
        id: "4",
        title: "Global Supply Chain Trends",
        description:
            "Supply chains are becoming more global and interconnected.",
        content:
            "Companies must adapt to global changes, including geopolitical risks and sustainability demands.",
        category: "Global Trade",
        addedByName: "Emily Clark",
        imageUrl: "/Images/Blogs-inner.svg",
        createdAt: "2026-03-15",
    },
];

/* =====================================================
   COMPONENT
===================================================== */

const BlogDetailsPage = () => {
    /* ------------------------------
       Pagination state
    ------------------------------ */
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    /* ------------------------------
       Current Blog (First one)
       NOTE: Previously this used
       useParams + API data
    ------------------------------ */
    const blog = demoBlogs[0];

    /* ------------------------------
       Pagination calculation
    ------------------------------ */
    const totalPages = Math.ceil(demoBlogs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentBlogs = demoBlogs.slice(startIndex, endIndex);

    /* ------------------------------
       Pagination handlers
    ------------------------------ */
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="BlogDetailsPageMainWrapper">
            {/* <ScrollToTopOnMount /> */}
            <Navbar />

            {/* =========================
         BLOG DETAIL
      ========================= */}
            <div className="blog-details-content">
                <h1 className="blog-detail-heading">{blog.title}</h1>

                <div className="blog-details-decription">
                    {blog.description}
                </div>

                {/* Author */}
                <div className="auther-wrapper">
                    <div className="auther-left">
                        <div className="auther-image">
                            <img src="/Images/Men.svg" alt="" />
                        </div>
                        <div className="auther-name">
                            <h6>{blog.addedByName}</h6>
                            <p>Supply Chain Management Expert</p>
                        </div>
                    </div>

                    {/* Social Icons */}
                    <div className="auther-right">
                        <div className="social-links"><RiTwitterXLine className="social-icon" /></div>
                        <div className="social-links"><FaFacebookF className="social-icon" /></div>
                        <div className="social-links"><FaLinkedinIn className="social-icon" /></div>
                        <div className="social-links"><GoLink className="social-icon" /></div>
                    </div>
                </div>

                {/* Banner */}
                <div className="banner">
                    <img src={blog.imageUrl} alt={blog.title} />
                </div>

                {/* Blog Content */}
                <div className="blogs">
                    {/* <div className="blog-content">
                        {blog.content}      
                    </div> */}
                    <div className="blog-content">

                        <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </h3>

                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla est odio, sodales ac aliquam sit amet, consectetur vel lectus. Cras pellentesque vel sem ut placerat. Sed ante sem, fermentum non dolor ac, volutpat hendrerit erat.                        </p>

                        <h3>Lorem ipsum dolor sit amet</h3>

                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla est odio, sodales ac aliquam sit amet, consectetur vel lectus. Cras pellentesque vel sem ut placerat. Sed ante sem, fermentum non dolor ac, volutpat hendrerit erat. .
                        </p>

                        <div className="sub-banner">
                            <img src="/Images/Blogs-inner.svg" alt="" />
                        </div>

                        <h3>Versatile & Easy to Serve</h3>

                        <p>
                            Karikku is incredibly versatile. Serve it chilled on its own, blend it into smoothies, use it as a base for mocktails, or incorporate it into healthy desserts. Its natural sweetness and refreshing flavor complement a wide range of dishes and beverages.
                        </p>

                        <h3>Sustainable & Ethical Sourcing</h3>

                        <p>
                            We source our coconuts responsibly, supporting local farmers and ensuring sustainable harvesting practices. When you choose Karikku, you’re not just offering a premium product — you’re supporting ethical sourcing and environmental responsibility.
                        </p>

                        <div className="sub-banner">
                            <img src="/Images/Coconut-s.svg" alt="" />
                        </div>




                        <p>
                            Join the growing number of businesses that are embracing natural hydration. Karikku Tender Coconut Water is more than just a beverage — it’s a statement of quality, health, and natural goodness.
                        </p>

                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla est odio, sodales ac aliquam sit amet, consectetur vel lectus. Cras pellentesque vel sem ut placerat. Sed ante sem, fermentum non dolor ac, volutpat hendrerit erat.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla est odio, sodales ac aliquam sit amet, consectetur vel lectus. Cras pellentesque vel sem ut placerat. Sed ante sem, fermentum non dolor ac, volutpat hendrerit erat.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla est odio, sodales ac aliquam sit amet, consectetur vel lectus. Cras pellentesque vel sem ut placerat. Sed ante sem, fermentum non dolor ac, volutpat hendrerit erat.
                        </p>


                        <h3>Lorem ipsum dolor</h3>

                        <p>
                            We source our coconuts responsibly, supporting local farmers and ensuring sustainable harvesting practices. When you choose Karikku, you’re not just offering a premium product — you’re supporting ethical sourcing and environmental responsibility.
                        </p>
                    </div>
                </div>
            </div>

            {/* =========================
         RELATED TOPICS
      ========================= */}
            <div className="related-topic">
                <div className="related-topic-header">
                    <h3>Related Topic</h3>

                    <div className="arrows-wrapper">
                        <div
                            className="left-arrow"
                            onClick={handlePrevPage}
                            style={{
                                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                                opacity: currentPage === 1 ? 0.5 : 1
                            }}
                        >
                            <BsArrowLeftShort className="arrow" />
                        </div>

                        <div
                            className="right-arrow"
                            onClick={handleNextPage}
                            style={{
                                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                                opacity: currentPage === totalPages ? 0.5 : 1
                            }}
                        >
                            <BsArrowRightShort className="arrow" />
                        </div>
                    </div>
                </div>

                {/* =========================
           BLOG CARDS (MAP USED)
        ========================= */}
                <div className="blog-cards-wrapper">
                    <div className="container-fluid">
                        <div className="row">

                            {currentBlogs.map((relatedBlog) => (
                                <div key={relatedBlog.id} className="col-lg-4 col-md-6 col-sm-6 col-12">

                                    <Link to="/blogs-inner" className="blog-link">

                                        <div className="blog-card">

                                            <div className="blog-image">
                                                <img
                                                    src={relatedBlog.imageUrl}
                                                    alt={relatedBlog.title}
                                                />
                                            </div>

                                            <div className="blog-content">

                                                <div className="category">
                                                    {relatedBlog.category}
                                                </div>

                                                <h2 className="blog-title">
                                                    {relatedBlog.title.slice(0, 20)}
                                                </h2>

                                                <h4 className="blog-description">
                                                    {relatedBlog.description.slice(0, 50)}...
                                                </h4>

                                                <h5 className="blogged-user">
                                                    {relatedBlog.addedByName}
                                                </h5>

                                                <div className="date-wrapper">
                                                    <div className="date">
                                                        {new Date(relatedBlog.createdAt).toLocaleDateString(
                                                            "en-US",
                                                            {
                                                                day: "numeric",
                                                                month: "short",
                                                                year: "numeric",
                                                            }
                                                        )}
                                                    </div>

                                                    <div>
                                                        <RxDotFilled className="dot-icon" />
                                                    </div>

                                                    <div className="time">
                                                        10 Mins read
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </Link>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>

            </div>


        </div>
    );
};

export default BlogDetailsPage;