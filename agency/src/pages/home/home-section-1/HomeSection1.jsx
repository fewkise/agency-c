import { useState, useEffect } from 'react';
import styles from './HomeSection1.module.css';
import arrowIcon from '../../../shared/icons/arrow_icon.png'
import bigArrowBtn from '../../../shared/icons/big_arrow_btn.png'
import commonArrow from '../../../shared/icons/common_arrow.png'

export const HomeSection1 = () => {
  const [stats, setStats] = useState([]);
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));

    fetch('http://localhost:5000/api/featured-project')
      .then(res => res.json())
      .then(data => setProject(data))
      .catch(err => console.error(err));
  }, []);

  const marqueeItems = [
    "MARKETING", "WEBSITE DESIGN", "BRANDING", 
    "WEBSITE DEVELOPMENT", "MOBILE APP DEVELOPMENT", "DIGITAL"
  ];

  return (
    <section className={styles.wrapper}>
      <div className={styles.heroGrid}>
        <div className={styles.leftCard}>
          <div className={styles.content}>
            <div className={styles.titleContainer}>
              <h1>DIGITAL SOLUTIONS</h1>
              <h1 className={styles.subTitle}>THAT DRIVE SUCCESS</h1>
              <div className={styles.startBtn}>
                <div className={styles.arrowIcon}><img src={arrowIcon} alt="" /></div>
                <span>START A PROJECT</span>
              </div>
            </div>
            <p className={styles.description}>
              At NexGen, we believe in the transformative power of digital solutions. 
              Our team of experts is dedicated to helping businesses like yours thrive 
              in the fast-paced digital landscape.
            </p>
          </div>
          
          <div className={styles.marquee}>
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
          <div 
            className={styles.projectImage} 
            style={{ 
                backgroundImage: project?.imageUrl ? `url(${project.imageUrl})` : 'none',
                backgroundColor: '#1a1a1a' 
            }}
          >
            <div className={styles.projectArrow}><img src={bigArrowBtn} alt="" /></div>
          </div>
          <div className={styles.projectInfo}>
            <h3>{project?.title || '...'}</h3>
            <p>{project?.category || '...'}</p>
          </div>
        </div>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((s) => (
          <div key={s.id} className={styles.statBox}>
            <span className={styles.statLabel}>{s.label}</span>
            <span className={styles.statValue}>{s.value}</span>
          </div>
        ))}
        <div className={styles.knowMoreBox}>
          <div className={styles.smallArrowCircle}><img src={commonArrow} alt="" /></div>
          <span>KNOW MORE</span>
        </div>
      </div>
    </section>
  );
};