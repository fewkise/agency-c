import { useState, useEffect } from 'react';
import styles from './HomeSection3.module.css';
import commonArrow from '../../../shared/icons/common_arrow.png'
import { ServiceCard } from '../../../shared/uikit/molecules/service-card/service-card';
export const HomeSection3 = () => {
    const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/services-with-projects')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.headerBox}>
          <h2>OUR SERVICES</h2>
        </div>

        <div className={styles.grid}>
          {services.map((item) => (
            <ServiceCard service={item} />
          ))}
        </div>
      </div>
    </section>
  );
};