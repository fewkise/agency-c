import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './AboutSection1.module.css';
import arrow_icon from '../../../shared/icons/arrow_icon.png'

export const AboutSection1 = ({ heroId, targetId = "next-section" }) => {
  const [heroData, setHeroData] = useState(null);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/services-hero/${heroId}`)
      .then(res => res.json())
      .then(setData => setHeroData(setData))
      .catch(err => console.error(err));

    fetch('http://localhost:5000/api/about-stats-top')
      .then(res => res.json())
      .then(setStats)
      .catch(err => console.error(err));
  }, [heroId]);

  const handleScroll = () => {
    const element = document.getElementById('1');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.leftCard}>
          <div className={styles.titleWrapper}>
            <h1>
              {heroData?.title_main} <br />
              <span className={styles.subTitle}>{heroData?.title_sub}</span>
            </h1>
            <Link to="/contact" className={styles.startBtn}>
              <div className={styles.arrowCircle}><img src={arrow_icon} alt="" /></div>
              <span>START A PROJECT</span>
            </Link>
          </div>
        </div>

        <div className={styles.rightCard}>
          <div className={styles.statsGrid}>
            {stats.map((s) => (
              <div key={s.id} className={styles.statBox}>
                <span className={styles.statLabel}>{s.label}</span>
                <span className={styles.statValue}>{s.value}</span>
              </div>
            ))}
          </div>
          <div className={styles.knowMoreWrapper}>
            <button className={styles.knowMoreBtn} onClick={handleScroll}>
              <div className={styles.downArrow}>↓</div>
              <span>KNOW MORE</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};