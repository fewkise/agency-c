import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './ServicesSection1.module.css';
import arrowIcon from '../../../shared/icons/arrow_icon.png'
export const ServicesSection1 = ({ heroId }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/services-hero/${heroId}`)
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error(err));
  }, [heroId]);

  const marqueeItems = [
    "MARKETING", "WEBSITE DESIGN", "BRANDING", 
    "WEBSITE DEVELOPMENT", "MOBILE APP DEVELOPMENT", "DIGITAL"
  ];

  return (
    <section className={styles.wrapper}>
      <div className={styles.heroGrid}>
        <div className={styles.leftCard}>
          <div className={styles.content}>
            <div className={styles.titleRow}>
              <h1>{data?.title_main}</h1>
              <Link to="/contact" className={styles.startBtn}>
                <div className={styles.arrowIcon}><img src={arrowIcon} alt="" /></div>
                <span>START A PROJECT</span>
              </Link>
            </div>
            <h1 className={styles.subTitle}>{data?.title_sub}</h1>
            <p className={styles.description}>
              {data?.description}
            </p>
          </div>
          
          <div className={styles.marquee}>
            <div className={styles.marqueeInner}>
              {[...marqueeItems, ...marqueeItems].map((item, i) => (
                <span key={i} className={styles.marqueeItem}>
                  {item} <span className={styles.dot}>•</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div 
          className={styles.rightCard}
          style={{ backgroundImage: data?.imageUrl ? `url(${data.imageUrl})` : 'none' }}
        >
          <div className={styles.bottomRow}>
            <Link to={data?.blog_link || '#'} className={styles.viewBlog}>
              <div className={styles.smallArrow}>↗</div>
              <span>VIEW BLOG</span>
            </Link>
            <div className={styles.tag}>WEB DEVELOPMENT.</div>
          </div>
        </div>
      </div>
    </section>
  );
};