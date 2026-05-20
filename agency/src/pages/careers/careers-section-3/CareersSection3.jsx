import { useState, useEffect } from 'react';
import styles from './CareersSection3.module.css';
import downArrow from '../../../shared/icons/down_arrow.png'
export const CareersSection3 = ({ heroId }) => {
  const [header, setHeader] = useState(null);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/services-hero/${heroId}`)
      .then(res => res.json())
      .then(setHeader)
      .catch(err => console.error(err));

    fetch('http://localhost:5000/api/career-steps')
      .then(res => res.json())
      .then(setSteps)
      .catch(err => console.error(err));
  }, [heroId]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.headerCard}>
        <h2 className={styles.sectionTitle}>{header?.title_main}</h2>
      </div>

      <div className={styles.stepsGrid}>
        {steps.map((step) => (
          <div key={step.id} className={styles.stepCard}>
            <div className={styles.stepHeader}>
              <span className={styles.number}>{step.step_number}</span>
            </div>
            
            <div className={styles.stepTitleBody}>
              <h3 className={styles.cardTitle}>{step.title}</h3>
            </div>
            
            <div className={styles.stepFooter}>
              <p className={styles.description}>{step.description}</p>
              <button className={styles.knowMoreBtn}>
                <div className={styles.arrowIcon}><img src={downArrow} alt="" /></div>
                <span>KNOW MORE</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};