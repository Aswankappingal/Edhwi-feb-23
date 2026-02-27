import React from 'react';
import './Blogs.scss';
import { FiArrowUpRight } from 'react-icons/fi';

const blogsData = [
    {
        id: 1,
        image: '/First.svg',
        category: 'Article',
        date: 'March 4, 2024',
        title: 'Traditional Kerala Pickles: A Taste of Home',
        description: 'Explore the flavors of Kerala through Edhwi\'s homemade pickles. We dive into traditional recipes, natural preservation techniques, and how these condiments bring back nostalgic memories.',
        link: '#'
    },
    {
        id: 2,
        image: '/Second.svg',
        category: 'Article',
        date: 'March 4, 2024',
        title: 'Why Unrefined Coconut Oil is Better for Your Health',
        description: 'Discover the benefits of using pure, unrefined coconut oil over processed alternatives. This blog covers the nutritional advantages, natural processing methods, and how it supports your immune system and digestion',
        link: '#'
    },
    {
        id: 3,
        image: '/third.svg',
        category: 'Article',
        date: 'March 4, 2024',
        title: 'From Farm to Bottle: The Edhwi Journey',
        description: 'Get a behind-the-scenes look at how Edhwi sources matured coconuts directly from coastal farmers and transforms them into high-quality products. Learn about our sun-drying process and commitment to purity.',
        link: '#'
    }
];

const Blogs = () => {
    return (
        <section className="blogs">
            <div className="blogs__container">
                <div className="blogs__header">
                    <h2><span className="blogs__highlight">Blogs</span> and updates</h2>
                </div>

                <div className="blogs__list">
                    {blogsData.map((blog) => (
                        <div className="blogs__item" key={blog.id}>
                            <div className="blogs__image-wrapper">
                                <img src={blog.image} alt={blog.title} className="blogs__image" />
                            </div>

                            <div className="blogs__content">
                                <div className="blogs__meta">
                                    <span>{blog.category}</span>
                                    <span className="blogs__meta-dot">•</span>
                                    <span>{blog.date}</span>
                                </div>

                                <a href={blog.link} className="blogs__title-link">
                                    <h3 className="blogs__title">{blog.title}</h3>
                                </a>

                                <p className="blogs__description">{blog.description}</p>
                            </div>

                            <a href={blog.link} className="blogs__arrow" aria-label={`Read more about ${blog.title}`}>
                                <FiArrowUpRight />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blogs;
