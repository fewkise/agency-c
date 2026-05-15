import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './ContactSection1.module.css';

export const ContactSection1 = ({ heroId }) => {
  const [heroData, setHeroData] = useState(null);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/services-hero/${heroId}`)
      .then(res => res.json())
      .then(data => setHeroData(data))
      .catch(err => console.error(err));

    fetch('http://localhost:5000/api/stats')
      .then(res => res.json())
      .then(setStats)
      .catch(err => console.error(err));
  }, [heroId]);

  const marqueeItems = [
    "MARKETING", "WEBSITE DESIGN", "BRANDING", 
    "WEBSITE DEVELOPMENT", "MOBILE APP DEVELOPMENT", "DIGITAL"
  ];

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        
        <div className={styles.leftCard}>
          <div className={styles.mainContent}>
            <div className={styles.titleRow}>
              <h1 className={styles.mainTitle}>
                {heroData?.title_main} <br />
                <span className={styles.subTitle}>{heroData?.title_sub}</span>
              </h1>
              <Link to="/contact" className={styles.startBtn}>
                <div className={styles.arrowCircle}>→</div>
                <span>START A PROJECT</span>
              </Link>
            </div>
            <p className={styles.description}>{heroData?.description}</p>
          </div>

          {
}
          <div className={styles.marqueeContainer}>
            <div className={styles.marqueeInner}>
              {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
                <span key={i} className={styles.marqueeItem}>
                  {item} <span className={styles.dot}>•</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.rightCard}>
          <div className={styles.statsGrid}>
            {stats.slice(0, 5).map((s) => (
              <div key={s.id} className={styles.statBox}>
                <span className={styles.statLabel}>{s.label}</span>
                <span className={styles.statValue}>{s.value}</span>
              </div>
            ))}
            <div className={styles.reachUsBox}>
              <div className={styles.downArrow}>↓</div>
              <span>REACH US</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};