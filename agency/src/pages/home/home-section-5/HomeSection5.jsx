import { useState, useEffect } from 'react';
import styles from './HomeSection5.module.css';

const API_URL = 'http://localhost:5000/';

export const HomeSection5 = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}api/testimonials`)
      .then(res => res.json())
      .then(data => setTestimonials(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.headerBox}>
          <h2>TESTIMONIALS</h2>
          <div className={styles.allBtn}>
            <div className={styles.arrowSmall}>↗</div>
            <span>ALL TESTIMONIALS</span>
          </div>
        </div>

        <div className={styles.grid}>
          {testimonials.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.content}>
                <h3>{item.title}</h3>
                <p>{item.content}</p>
              </div>
              
              <div className={styles.userBar}>
                <div className={styles.userInfo}>
                  <img src={`${API_URL}${item.user_image}`} alt={item.user_name} />
                  <div className={styles.userText}>
                    <span className={styles.name}>{item.user_name}</span>
                    <span className={styles.role}>{item.user_role}</span>
                  </div>
                </div>
                <div className={styles.circleBtn}>
                   <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};