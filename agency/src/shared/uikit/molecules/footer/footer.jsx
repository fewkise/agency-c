import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './footer.module.css';
import commonArrow from '../../../icons/common_arrow.png';

const API_URL = 'http://localhost:5000/';

export const Footer = () => {
  const [settings, setSettings] = useState(null);
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}api/footer-settings`)
      .then(res => res.json())
      .then(setSettings)
      .catch(err => console.error(err));

    fetch(`${API_URL}api/footer-socials`)
      .then(res => res.json())
      .then(setSocials)
      .catch(err => console.error(err));
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.ctaCard}>
        <div className={styles.ctaText}>
          <h2>{settings?.cta_title || 'READY TO TRANSFORM YOUR DIGITAL PRESENCE?'}</h2>
          <p>{settings?.cta_description || ''}</p>
        </div>
        <Link to="/contact" className={styles.ctaBtn}>
          GET IN TOUCH <img src={commonArrow} alt="" />
        </Link>
      </div>

      <div className={styles.ticker}>
         <span>{settings?.ticker_text || ''}</span>
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.socialGrid}>
          {socials.map((item) => (
            <a 
              key={item.id} 
              href={item.url} 
              target="_blank" 
              rel="noreferrer" 
              className={styles.socialCard}
            >
              <div className={styles.cardHeader}>
                <div className={styles.iconBox}>
                  <img src={item.iconUrl} alt={item.name} />
                </div>
                <div className={styles.arrowCircle}>
                  <img src={commonArrow} alt="" />
                </div>
              </div>
              <div className={styles.cardBody}>
                <h4>{item.name}</h4>
                <p>{item.description}</p>
              </div>
            </a>
          ))}
        </div>

        <div className={styles.navigationAndNewsletter}>
          <div className={styles.linksContainer}>
            <div className={styles.linkColumn}>
              <h5>Home</h5>
              <Link to="/">Why Us</Link>
              <Link to="/">About Us</Link>
              <Link to="/">Testimonials</Link>
              <Link to="/">FAQ's</Link>
            </div>
            <div className={styles.linkColumn}>
              <h5>Services</h5>
              <Link to="/services">Web Development</Link>
              <Link to="/services">App Development</Link>
              <Link to="/services">Web Design</Link>
              <Link to="/services">Digital Marketing</Link>
            </div>
            <div className={styles.linkColumn}>
              <h5>Projects</h5>
              <Link to="/projects">Klothink</Link>
              <Link to="/projects">Zenith</Link>
              <Link to="/projects">Novus</Link>
              <Link to="/projects">Apex</Link>
            </div>
            <div className={styles.linkColumn}>
              <h5>Blogs</h5>
              <Link to="/blogs">Business</Link>
              <Link to="/blogs">Design <span className={styles.badge}>Soon</span></Link>
              <Link to="/blogs">Development <span className={styles.badge}>Soon</span></Link>
            </div>
          </div>

          <div className={styles.newsletterCard}>
            <span className={styles.label}>NEWSLETTER</span>
            <div className={styles.newsFlex}>
              <h3>SUBSCRIBE TO OUR NEWSLETTER</h3>
              <div className={styles.inputGroup}>
                <input type="email" placeholder="Enter your email" />
                <button className={styles.sendBtn}>
                  <img src={commonArrow} alt="" />
                </button>
              </div>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p>{settings?.copyright_text || ''}</p>
            <div className={styles.legalLinks}>
              <Link to="/terms">Terms & Conditions</Link>
              <Link to="/privacy">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};