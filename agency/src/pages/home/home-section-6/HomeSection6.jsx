import { useState, useEffect } from 'react';
import styles from './HomeSection6.module.css';
import commonArrow from '../../../shared/icons/common_arrow.png';

const API_URL = 'http://localhost:5000/';

export const HomeSection6 = () => {
  const [faqs, setFaqs] = useState([]);
  const [openIds, setOpenIds] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    question: ''
  });
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    fetch(`${API_URL}api/faqs`)
      .then(res => res.json())
      .then(data => {
        setFaqs(data);
        if (data.length > 0) setOpenIds([data[0].id]);
      })
      .catch(err => console.error(err));
  }, []);

  const toggleFaq = (id) => {
    setOpenIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.question) {
      setStatusMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}api/user-questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatusMessage('Your question has been sent successfully!');
        setFormData({ name: '', email: '', question: '' }); // Очистка формы
      } else {
        setStatusMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error sending question:', error);
      setStatusMessage('Server error. Please try again later.');
    }
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

          <div className={styles.askBox}>
            <h3>ASK YOUR QUESTION</h3>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label>NAME</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name" 
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label>EMAIL</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email" 
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label>YOUR QUESTION</label>
                <textarea 
                  name="question"
                  value={formData.question}
                  onChange={handleInputChange}
                  placeholder="Enter Your Question Here ....." 
                  rows="5"
                  required
                ></textarea>
              </div>
              <button type="submit" className={styles.sendBtn}>SEND YOUR MESSAGE</button>
              {statusMessage && <p className={styles.statusMessage}>{statusMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};