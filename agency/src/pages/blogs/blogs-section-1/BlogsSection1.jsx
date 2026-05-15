import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './BlogsSection1.module.css';

export const BlogsSection1 = () => {
  const [activeTab, setActiveTab] = useState('Design');
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/blogs?category=${activeTab}`)
      .then(res => res.json())
      .then(setBlogs);
  }, [activeTab]);

  const featuredBlog = blogs.find(b => b.is_featured);
  const regularBlogs = blogs.filter(b => !b.is_featured);

  return (
    <section className={styles.wrapper}>
      <div className={styles.headerCard}>
        <h2 className={styles.title}>OUR BLOGS</h2>
        <div className={styles.tabs}>
          {['Business', 'Design', 'Development'].map(tab => (
            <button 
              key={tab}
              className={`${styles.tabBtn} ${activeTab === tab ? styles.active : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {featuredBlog && (
        <Link to={`/blog/${featuredBlog.id}`} className={styles.featuredLink}>
          <div className={styles.featuredBox}>
            <div className={styles.mainImgWrapper}>
              <img src={`http://localhost:5000/${featuredBlog.image_path}`} alt="Main" />
            </div>
            <div className={styles.mainContent}>
              <h3 className={styles.mainTitle}>{featuredBlog.title}</h3>
              <div className={styles.metaRow}>
                <span className={styles.metaItem}>Category • <b>{featuredBlog.category}</b></span>
                <span className={styles.metaItem}>Read Time • <b>{featuredBlog.read_time}</b></span>
                <span className={styles.metaItem}>Author • <b>{featuredBlog.author}</b></span>
              </div>
              <p className={styles.mainDesc}>{featuredBlog.description}</p>
              <div className={styles.mainFooter}>
                <div className={styles.readBtn}>
                  <div className={styles.arrowBox}>↗</div>
                  <span>READ FULL BLOG</span>
                </div>
                <span className={styles.pubDate}>Published Date <b>{featuredBlog.published_date}</b></span>
              </div>
            </div>
          </div>
        </Link>
      )}

      <div className={styles.blogsGrid}>
        {regularBlogs.map(blog => (
          <Link to={`/blog/${blog.id}`} key={blog.id} className={styles.cardLink}>
            <div className={styles.smallCard}>
              <img src={`http://localhost:5000/${blog.image_path}`} className={styles.cardImg} alt="" />
              <h4 className={styles.cardTitle}>{blog.title}</h4>
              <p className={styles.cardDesc}>{blog.description}</p>
              <div className={styles.readBtn}>
                <div className={styles.arrowBox}>↗</div>
                <span>READ FULL BLOG</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};