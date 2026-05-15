import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './BlogDetailSection1.module.css';

const BlogDetailSection1 = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/blogs/${id}`)
      .then(res => res.json())
      .then(setBlog)
      .catch(err => console.error(err));
  }, [id]);

  if (!blog) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.pageWrapper}>
      {
}
      <header className={styles.heroSection}>
        <div className={styles.titleCard}>
          <h1>{blog.title}</h1>
          <div className={styles.startProject}>
             <div className={styles.arrowCircle}>→</div>
             <span>START A PROJECT</span>
          </div>
        </div>
        <div className={styles.metaColumn}>
          <div className={styles.metaItem}><span>AUTHOR</span><p>{blog.author}</p></div>
          <div className={styles.metaItem}><span>Published Date</span><p>{blog.published_date}</p></div>
          <div className={styles.metaItem}><span>Category</span><p>{blog.category}</p></div>
          <div className={styles.metaItem}><span>Read Time</span><p>{blog.read_time}</p></div>
        </div>
      </header>

      <div className={styles.mainImageContainer}>
        <img src={`http://localhost:5000/${blog.image_path}`} alt="" />
      </div>

      <main className={styles.contentGrid}>
        <aside className={styles.leftSidebar}>
          <a href={blog.twitter_url} target="_blank" rel="noreferrer" className={styles.socialIcon}>𝕏</a>
          <a href={blog.facebook_url} target="_blank" rel="noreferrer" className={styles.socialIcon}>f</a>
          <a href={blog.linkedin_url} target="_blank" rel="noreferrer" className={styles.socialIcon}>in</a>
        </aside>

        <article className={styles.articleContent}>
          <h2 className={styles.contentTitle}>THE ESSENCE OF {blog.category.toUpperCase()}</h2>
          {
}
          <p className={styles.fullText}>{blog.full_content}</p>
        </article>

        <aside className={styles.rightSidebar}>
          <div className={styles.authorBox}>
            <div className={styles.authorInfo}>
              <img src="/uploads/author_avatar.png" alt="Wade Warren" />
              <div>
                <h4>Wade Warren</h4>
                <span>Art Director</span>
              </div>
            </div>
            <p>Crafting visual narratives that captivate and inspire, weaving creativity into every chapter.</p>
            <button className={styles.twitterBtn}>@wadewarren ↗</button>
          </div>
          <div className={styles.statsBox}>
             <div className={styles.statLine}>❤️ LIKED BY <span>2.6K USERS</span></div>
             <div className={styles.statLine}>🔗 SHARED BY <span>120 USERS</span></div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default BlogDetailSection1;