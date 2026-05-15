import { useState, useEffect } from 'react';
import { FeatureCard } from '../../../shared/uikit/molecules/feature-card/feature-card';
import styles from './ProjectsSection1.module.css';

export const ProjectsSection1 = () => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/project-features')
      .then(res => res.json())
      .then(data => setFeatures(data))
      .catch(err => console.error('Error fetching features:', err));
  }, []);

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>KEY FEATURES OF OUR PROJECTS</h1>
        </div>
        <div className={styles.grid}>
          {features.map((feature) => (
            <FeatureCard 
              key={feature.id}
              title={feature.title}
              description={feature.description}
              iconUrl={feature.iconUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};