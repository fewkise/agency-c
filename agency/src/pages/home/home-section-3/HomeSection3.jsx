import { useState, useEffect } from 'react';
import styles from './HomeSection3.module.css';

export const HomeSection3 = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/services')
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
          {services.map((service) => (
            <div key={service.id} className={styles.card}>
                <div className={styles.cardHeader}>
                    <div className={styles.iconWrapper}>
                    <div className={styles.placeholderIcon}></div>
                    </div>
                    <h3>{service.title}</h3>
                    <div className={styles.bookCall}>
                    <span>BOOK A CALL</span>
                    <div className={styles.arrowSmall}>↗</div>
                    </div>
                </div>
                
                <p className={styles.description}>{service.description}</p>
                
                {
}
                <div className={styles.cardFooter}>
                    <div className={styles.priceTag}>
                    {service.price}
                    </div>
                </div>
                </div>
          ))}
        </div>
      </div>
    </section>
  );
};