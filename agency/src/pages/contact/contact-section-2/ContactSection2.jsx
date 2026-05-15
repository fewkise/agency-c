import { useState, useEffect } from 'react';
import styles from './ContactSection2.module.css';

export const ContactSection2 = () => {
  const [methods, setMethods] = useState([]);
  const [countries, setCountries] = useState([]);
  const [activeTab, setActiveTab] = useState('EMAILS');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/contact-methods')
      .then(res => res.json())
      .then(data => setMethods(data))
      .catch(err => console.error("Ошибка методов:", err));

    fetch('http://localhost:5000/api/countries')
      .then(res => res.json())
      .then(data => {
        setCountries(data);
        if (data.length > 0) setSelectedCountry(data[0]); // Ставим первую по дефолту
      })
      .catch(err => console.error("Ошибка стран:", err));
  }, []);

  const tabs = ['PHONE NUMBER', 'EMAILS', 'OFFICE LOCATIONS'];

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        
        <div className={styles.infoCard}>
          <div className={styles.tabsContainer}>
            {tabs.map(tab => (
              <button 
                key={tab}
                className={`${styles.tabBtn} ${activeTab === tab ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className={styles.methodList}>
            {methods
              .filter(m => m.type.toUpperCase() === activeTab.replace(' ', '_'))
              .map((method) => (
                <div key={method.id} className={styles.methodGroup}>
                  <label className={styles.methodLabel}>{method.category}</label>
                  <div className={styles.methodInputLike}>
                    <span className={styles.methodValue}>{method.value}</span>
                    <div className={styles.arrowIcon}>↗</div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className={styles.formCard}>
          <form className={styles.form}>
            <div className={styles.formGrid}>
              <div className={styles.inputWrap}>
                <label>FIRST NAME</label>
                <input type="text" placeholder="Enter First Name" />
              </div>
              <div className={styles.inputWrap}>
                <label>LAST NAME</label>
                <input type="text" placeholder="Enter Last Name" />
              </div>
              <div className={styles.inputWrap}>
                <label>EMAIL</label>
                <input type="email" placeholder="Enter your Email" />
              </div>
              <div className={styles.inputWrap}>
                <label>PHONE NUMBER</label>
                <div className={styles.phoneInput}>
                  <div className={styles.flagSelector}>
                    {selectedCountry && (
                      <>
                        <img src={selectedCountry.flag_url} alt="flag" />
                        <span className={styles.chevron}>↓</span>
                      </>
                    )}
                  </div>
                  <input type="text" placeholder="Enter Phone Number" />
                </div>
              </div>
            </div>

            <div className={`${styles.inputWrap} ${styles.fullWidth}`}>
              <label>MESSAGE</label>
              <textarea placeholder="Enter your Message"></textarea>
            </div>

            <div className={styles.formFooter}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" />
                <span className={styles.customCheck}></span>
                I agree with Terms of Use and Privacy Policy
              </label>
              <button type="submit" className={styles.submitBtn}>
                SEND YOUR MESSAGE <span>↗</span>
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
};