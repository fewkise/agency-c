import { useState, useEffect } from 'react';
import styles from './HomeSection6.module.css';
import commonArrow from '../../../shared/icons/common_arrow.png'
const API_URL = 'http://localhost:5000/';

export const HomeSection6 = () => {
  const [faqs, setFaqs] = useState([]);
  const [openIds, setOpenIds] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}api/faqs`)
      .then(res => res.json())
      .then(data => {
        setFaqs(data);
        if (data.length > 0) setOpenIds([data[0].id]); // Открываем первый по умолчанию
      })
      .catch(err => console.error(err));
  }, []);

  const toggleFaq = (id) => {
    setOpenIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.headerBox}>
          <h2>FREQUENTLY ASKED QUESTIONS</h2>
          <div className={styles.viewAll}>
            <div className={styles.arrowSmall}><img src={commonArrow} alt="" /></div>
            <span>VIEW ALL</span>
          </div>
        </div>

        <div className={styles.contentGrid}>
          {
}
          <div className={styles.faqList}>
            {faqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div key={faq.id} className={`${styles.faqItem} ${isOpen ? styles.active : ''}`}>
                  <div className={styles.faqHeader} onClick={() => toggleFaq(faq.id)}>
                    <span>{faq.question}</span>
                    <div className={styles.plusBtn}>
                      {isOpen ? '−' : '+'}
                    </div>
                  </div>
                  <div className={styles.faqBody}>
                    <div className={styles.faqAnswer}>
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {
}
          <div className={styles.askBox}>
            <h3>ASK YOUR QUESTION</h3>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.inputGroup}>
                <label>NAME</label>
                <input type="text" placeholder="Enter your name" />
              </div>
              <div className={styles.inputGroup}>
                <label>EMAIL</label>
                <input type="email" placeholder="Enter your email" />
              </div>
              <div className={styles.inputGroup}>
                <label>YOUR QUESTION</label>
                <textarea placeholder="Enter Your Question Here ....." rows="5"></textarea>
              </div>
              <button type="submit" className={styles.sendBtn}>SEND YOUR MESSAGE</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};