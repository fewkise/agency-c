import { useState, useEffect } from 'react';
import styles from './AboutSection4.module.css';

export const AboutSection4 = ({ heroId }) => {
  const [header, setHeader] = useState(null);
  const [awards, setAwards] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/services-hero/${heroId}`)
      .then(res => res.json())
      .then(setHeader)
      .catch(err => console.error(err));

    fetch('http://localhost:5000/api/awards')
      .then(res => res.json())
      .then(setAwards)
      .catch(err => console.error(err));
  }, [heroId]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.headerCard}>
        <h2 className={styles.title}>{header?.title_main}</h2>
      </div>

      <div className={styles.awardsGrid}>
        {awards.map((award) => (
          <div key={award.id} className={styles.awardCard}>
            <div className={styles.cardHeader}>
              <div className={styles.dateBox}>
                <span className={styles.dateLabel}>Date</span>
                <span className={styles.dot}>•</span>
                <span className={styles.dateValue}>{award.award_date}</span>
              </div>
              <div className={styles.iconCircle}>
                <img src={award.iconUrl} alt="Award Icon" />
              </div>
            </div>
            
            <div className={styles.cardContent}>
              <h3 className={styles.awardTitle}>{award.title}</h3>
              <p className={styles.awardDesc}>{award.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};