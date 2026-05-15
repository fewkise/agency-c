import { useState, useEffect } from 'react';
import styles from './HomeSection2.module.css';

export const HomeSection2 = () => {
  const [reasons, setReasons] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/reasons')
      .then(res => res.json())
      .then(data => setReasons(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.headerBox}>
          <h2>REASONS TO CHOOSE NEXGEN FOR YOUR DIGITAL JOURNEY</h2>
        </div>

        <div className={styles.grid}>
          {reasons.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.cardContent}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div className={styles.learnMore}>
                <div className={styles.arrowCircle}>↗</div>
                <span>Learn More</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};