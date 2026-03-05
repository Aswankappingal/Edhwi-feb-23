import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import './BlogSub.scss';

const blogSubData = [
    {
        id: 1,
        image: '/First.svg',
        type: 'Article',
        date: 'March 4, 2024',
        title: 'Traditional Kerala Pickles: A Taste of Home',
        description: "Explore the flavors of Kerala through Edhwi's homemade pickles. We dive into traditional recipes, natural preservation techniques, and how these condiments bring back nostalgic memories.",
        link: '/blogs'
    },
    {
        id: 2,
        image: '/Second.svg',
        type: 'Article',
        date: 'March 4, 2024',
        title: 'Why Unrefined Coconut Oil is Better for Your Health',
        description: "Discover the benefits of using pure, unrefined coconut oil over processed alternatives. This blog covers the nutritional advantages, natural processing methods, and how it supports your immune system and digestion.",
        link: '/blogs'
    },
    {
        id: 3,
        image: '/third.svg',
        type: 'Article',
        date: 'March 4, 2024',
        title: 'From Farm to Bottle: The Edhwi Journey',
        description: "Get a behind-the-scenes look at how Edhwi sources matured coconuts directly from coastal farmers and transforms them into high-quality products. Learn about our sun-drying process and commitment to purity.",
        link: '/blogs'
    }
];

const BlogSub = () => {
    return (
        <section className="blog-sub">
            <div className="blog-sub__container">
                <h2 className="blog-sub__header">
                    <span className="blog-sub__highlight">Blogs</span> and updates
                </h2>
                <div className="blog-sub__list">
                    {blogSubData.map((blog) => (
                        <a href={blog.link} key={blog.id} className="blog-sub__item">
                            <div className="blog-sub__image-wrapper">
                                <img src={blog.image} alt={blog.title} className="blog-sub__image" />
                            </div>
                            <div className="blog-sub__content">
                                <div className="blog-sub__meta-row">
                                    <span className="blog-sub__meta">
                                        {blog.type} <span className="blog-sub__dot">•</span> {blog.date}
                                    </span>
                                    <div className="blog-sub__icon">
                                        <FiArrowUpRight />
                                    </div>
                                </div>
                                <h3 className="blog-sub__title">{blog.title}</h3>
                                <p className="blog-sub__description">{blog.description}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSub;
