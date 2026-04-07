import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import './BlogSub.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBlogPosts } from '../../redux/slices/blogSlice';
import { useEffect } from 'react';

const BlogSub = () => {
    const dispatch = useDispatch();
    const { blogs } = useSelector((state) => state.blog);
    const blogSubData = blogs.slice(0, 3);

    useEffect(() => {
        if (blogs.length === 0) {
            dispatch(fetchBlogPosts());
        }
    }, [dispatch, blogs.length]);

    return (
        <section className="blog-sub">
            <div className="blog-sub__container">
                <h2 className="blog-sub__header">
                    <span className="blog-sub__highlight">Blogs</span> and updates
                </h2>
                <div className="blog-sub__list">
                    {blogSubData.map((blog) => (
                        <Link to={`/blogs-inner/${blog.id}`} key={blog.id} className="blog-sub__item">
                            <div className="blog-sub__image-wrapper">
                                <img src={blog.image || blog.imageUrl || '/Images/First.svg'} alt={blog.title} className="blog-sub__image" />
                            </div>
                            <div className="blog-sub__content">
                                <div className="blog-sub__meta-row">
                                    <span className="blog-sub__meta">
                                        {'Article'} <span className="blog-sub__dot">•</span> {blog.date || (blog.createdAt?._seconds ? new Date(blog.createdAt._seconds * 1000).toLocaleDateString() : 'No date')}
                                    </span>
                                    <div className="blog-sub__icon">
                                        <FiArrowUpRight />
                                    </div>
                                </div>
                                <h3 className="blog-sub__title">{blog.title}</h3>
                                <p className="blog-sub__description">
                                    {blog.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSub;
