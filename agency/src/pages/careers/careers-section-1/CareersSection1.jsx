import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './CareersSection1.module.css';
import arrow_icon from '../../../shared/icons/arrow_icon.png'
import downArrow from '../../../shared/icons/down_arrow.png'
export const CareersSection1 = ({ heroId }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/services-hero/${heroId}`)
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error(err));
  }, [heroId]);

  if (!data) return null;

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        {
}
        <div className={styles.leftCard}>
          <div className={styles.titleWrapper}>
            <h1>
              {data.title_main} <br />
              <span className={styles.subTitle}>{data.title_sub}</span>
            </h1>
            <Link to="/contact" className={styles.startBtn}>
              <div className={styles.arrowCircle}><img src={arrow_icon} alt="" /></div>
              <span>START A PROJECT</span>
            </Link>
          </div>
        </div>

        {
}
        <div className={styles.rightCard}>
          <div className={styles.content}>
            <h2 className={styles.brandTitle}>AT NEXGEN</h2>
            <p className={styles.description}>
              {data.description}
            </p>
          </div>
          <div className={styles.scrollWrapper}>
            <button className={styles.scrollBtn} onClick={() => window.scrollTo({top: 800, behavior: 'smooth'})}>
              <div className={styles.downArrow}><img src={downArrow} alt="" /></div>
              <span>KNOW MORE</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};