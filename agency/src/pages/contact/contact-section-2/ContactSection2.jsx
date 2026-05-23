import { useState, useEffect, useRef } from 'react';
import styles from './ContactSection2.module.css';

export const ContactSection2 = () => {
  const [methods, setMethods] = useState([]);
  const [countries, setCountries] = useState([]);
  const [activeTab, setActiveTab] = useState('EMAILS');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    agree: false
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/contact-methods')
      .then(res => res.json())
      .then(data => setMethods(data))
      .catch(err => console.error(err));

    fetch('http://localhost:5000/api/countries')
      .then(res => res.json())
      .then(data => {
        setCountries(data);
        if (data.length > 0) {
          setSelectedCountry(data[0]);
        }
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agree) {
      alert("Please agree to the Terms of Use.");
      return;
    }

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      countryCode: selectedCountry ? (selectedCountry.phone_code || selectedCountry.phoneCode || '') : '',
      phone: formData.phone,
      message: formData.message
    };

    fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(async (res) => {
        const isJson = res.headers.get('content-type')?.includes('application/json');
        const data = isJson ? await res.json() : null;

        if (res.ok && data?.success) {
          alert("Success!");
          setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '', agree: false });
        } else {
          const errMsg = data?.details || data?.error || 'Внутренняя ошибка сервера (500)';
          alert(`Ошибка отправки: ${errMsg}`);
        }
      })
      .catch(err => {
        console.error(err);
        alert("Не удалось связаться с сервером");
      });
  };

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
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              <div className={styles.inputWrap}>
                <label>FIRST NAME</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Enter First Name" required />
              </div>
              <div className={styles.inputWrap}>
                <label>LAST NAME</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Enter Last Name" required />
              </div>
              <div className={styles.inputWrap}>
                <label>EMAIL</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your Email" required />
              </div>
              <div className={styles.inputWrap}>
                <label>PHONE NUMBER</label>
                <div className={styles.phoneInputContainer} ref={dropdownRef}>
                  <div className={styles.phoneInput}>
                    <div className={styles.flagSelector} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                      {selectedCountry && (
                        <>
                          <img src={selectedCountry.flag_url || selectedCountry.flagUrl} alt="flag" />
                          <span className={`${styles.chevron} ${isDropdownOpen ? styles.chevronOpen : ''}`}>↓</span>
                        </>
                      )}
                    </div>
                    <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Enter Phone Number" required />
                  </div>

                  {isDropdownOpen && (
                    <div className={styles.flagDropdown}>
                      {countries.map((country) => (
                        <div key={country.id} className={styles.flagOption} onClick={() => handleCountrySelect(country)}>
                          <img src={country.flag_url || country.flagUrl} alt="" />
                          <span className={styles.countryName}>{country.name}</span>
                          <span className={styles.phoneCode}>({country.phone_code || country.phoneCode})</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={`${styles.inputWrap} ${styles.fullWidth}`}>
              <label>MESSAGE</label>
              <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Enter your Message" required></textarea>
            </div>

            <div className={styles.formFooter}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" name="agree" checked={formData.agree} onChange={handleInputChange} />
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