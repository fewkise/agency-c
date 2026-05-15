import { useState, useEffect } from 'react';
import styles from './AboutSection3.module.css';

export const AboutSection3 = ({ heroId }) => {
  const [header, setHeader] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/services-hero/${heroId}`)
      .then(res => res.json())
      .then(setHeader)
      .catch(err => console.error(err));

    fetch('http://localhost:5000/api/achievements')
      .then(res => res.json())
      .then(setItems)
      .catch(err => console.error(err));
  }, [heroId]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.headerCard}>
        <h2 className={styles.title}>{header?.title_main}</h2>
      </div>

      <div className={styles.timelineGrid}>
        {items.map((item) => (
          <div key={item.id} className={styles.achievementCard}>
            <div className={styles.dateHeader}>
              {item.date_text}
            </div>
            <div className={styles.titleBody}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
            </div>
            <div className={styles.descriptionFooter}>
              <p className={styles.cardDesc}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};