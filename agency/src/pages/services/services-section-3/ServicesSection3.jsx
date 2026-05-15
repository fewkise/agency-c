import { useState, useEffect } from 'react';
import { SuccessProjectCard } from '../../../shared/uikit/molecules/success-project-card/success-project-card';
import { SuccessInfoBlock } from '../../../shared/uikit/molecules/success-info-block/success-info-block';
import styles from './ServicesSection3.module.css';

export const ServicesSection3 = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/success-stories')
      .then(res => res.json())
      .then(data => setStories(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className={styles.wrapper}>
      <div className={styles.mainHeader}>
        <h2>SUCCESS STORIES</h2>
        <button className={styles.viewAll}>↗ VIEW ALL</button>
      </div>
      <div className={styles.storiesList}>
        {stories.map(item => (
          <div key={item.id} className={styles.storyRow}>
            <SuccessProjectCard project={item} />
            <SuccessInfoBlock project={item} />
          </div>
        ))}
      </div>
    </section>
  );
};