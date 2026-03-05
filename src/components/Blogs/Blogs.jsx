import React from 'react';
import './Blogs.scss';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Navbar from '../Navbar/Navbar';

const blogsData = [
    {
        id: 1,
        image: '/First.svg',
        category: 'Health',
        title: 'Traditional Kerala Pickles: A Taste of Home',
        description: 'In a world full of sugary drinks and synthetic flavors, going back to nature...',
        author: 'Willard Harris',
        date: '1 May 2024',
        readTime: '15 Mins read',
        link: '#'
    },
    {
        id: 2,
        image: '/Second.svg',
        category: 'Health',
        title: 'Why Unrefined Coconut Oil is Better for Your Health',
        description: 'In a world full of sugary drinks and synthetic flavors, going back to nature...',
        author: 'Willard Harris',
        date: '1 May 2024',
        readTime: '15 Mins read',
        link: '#'
    },
    {
        id: 3,
        image: '/third.svg',
        category: 'Health',
        title: 'From Farm to Bottle: The Edhwi Journey',
        description: 'In a world full of sugary drinks and synthetic flavors, going back to nature...',
        author: 'Willard Harris',
        date: '1 May 2024',
        readTime: '15 Mins read',
        link: '#'
    },
    {
        id: 4,
        image: '/First.svg',
        category: 'Health',
        title: 'Traditional Kerala Pickles: A Taste of Home',
        description: 'In a world full of sugary drinks and synthetic flavors, going back to nature...',
        author: 'Willard Harris',
        date: '1 May 2024',
        readTime: '15 Mins read',
        link: '#'
    },
    {
        id: 5,
        image: '/Second.svg',
        category: 'Health',
        title: 'Why Unrefined Coconut Oil is Better for Your Health',
        description: 'In a world full of sugary drinks and synthetic flavors, going back to nature...',
        author: 'Willard Harris',
        date: '1 May 2024',
        readTime: '15 Mins read',
        link: '#'
    },
    {
        id: 6,
        image: '/third.svg',
        category: 'Health',
        title: 'From Farm to Bottle: The Edhwi Journey',
        description: 'In a world full of sugary drinks and synthetic flavors, going back to nature...',
        author: 'Willard Harris',
        date: '1 May 2024',
        readTime: '15 Mins read',
        link: '#'
    }
];

const Blogs = () => {
    return (
        <>
            <Navbar />
            <section className="blogs">
                <div className="blogs__container">
                    <div className="blogs__header">
                        <h2><span className="blogs__highlight">Our</span> Blogs</h2>
                    </div>

                    <div className="blogs__grid">
                        {blogsData.map((blog) => (
                            <div className="blogs__card" key={blog.id}>
                                <div className="blogs__image-container">
                                    <img src={blog.image} alt={blog.title} className="blogs__image" />
                                </div>

                                <div className="blogs__content">
                                    <div className="blogs__category">
                                        {blog.category}
                                    </div>

                                    <a href={blog.link} className="blogs__title-link">
                                        <h3 className="blogs__title">{blog.title}</h3>
                                    </a>

                                    <p className="blogs__description">{blog.description}</p>

                                    <div className="blogs__footer">
                                        <span className="blogs__author">{blog.author}</span>
                                        <div className="blogs__meta">
                                            <span>{blog.date}</span>
                                            <span className="blogs__dot">•</span>
                                            <span>{blog.readTime}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="blogs__pagination">
                        <button className="blogs__pagination-btn prev" aria-label="Previous page">
                            <FiChevronLeft />
                        </button>
                        <button className="blogs__pagination-btn active" aria-label="Page 1">
                            1
                        </button>
                        <button className="blogs__pagination-btn next" aria-label="Next page">
                            <FiChevronRight />
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Blogs;
