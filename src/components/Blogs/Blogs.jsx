import React from 'react';
import './Blogs.scss';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogPosts } from '../../redux/slices/blogSlice';

const Blogs = () => {
    const dispatch = useDispatch();
    const { blogs, loading, error } = useSelector((state) => state.blog);

    React.useEffect(() => {
        dispatch(fetchBlogPosts());
    }, [dispatch]);

    if (loading) return <div className="blogs__loading">Loading blogs...</div>;
    if (error) return <div className="blogs__error">Error: {error}</div>;

    return (
        <>
            <Navbar />
            <section className="blogs">
                <div className="blogs__container">
                    <div className="blogs__header">
                        <h2><span className="blogs__highlight">Our</span> Blogs</h2>
                    </div>

                        <div className="blogs__grid">
                            {blogs.map((blog) => (
                                <Link to={`/blogs-inner/${blog.id}`} key={blog.id} className="blogs__card-link">
                                    <div className="blogs__card">
                                        <div className="blogs__image-container">
                                            <img src={blog.imageUrl || blog.image || '/Images/First.svg'} alt={blog.title} className="blogs__image" />
                                        </div>

                                        <div className="blogs__content">
                                            <div className="blogs__category">
                                                {blog.category || 'General'}
                                            </div>

                                            <h3 className="blogs__title">{blog.title}</h3>

                                            <p className="blogs__description">{blog.description}</p>

                                            <div className="blogs__footer">
                                                <span className="blogs__author">{blog.author || 'Edhwi'}</span>
                                                <div className="blogs__meta">
                                                    <span>{blog.date || (blog.createdAt?._seconds ? new Date(blog.createdAt._seconds * 1000).toLocaleDateString() : 'No date')}</span>
                                                    <span className="blogs__dot">•</span>
                                                    <span>{blog.readTime || '5 Mins read'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                            {blogs.length === 0 && <div className="blogs__no-data">No blogs found.</div>}
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
