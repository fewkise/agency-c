import React from 'react';
import { Link } from 'react-router-dom';
import styles from './footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.ctaCard}>
        <div className={styles.ctaText}>
          <h2>READY TO TRANSFORM YOUR DIGITAL PRESENCE?</h2>
          <p>
            Take the first step towards digital success with NexGen by your side. 
            Our team of experts is eager to craft tailored solutions that drive growth for your business.
          </p>
        </div>
        <Link to="/contact" className={styles.ctaBtn}>GET IN TOUCH ↗</Link>
      </div>

      <div className={styles.ticker}>
         <span>FOLLOW US ON SOCIAL MEDIA • FOLLOW US ON SOCIAL MEDIA • FOLLOW US ON SOCIAL MEDIA</span>
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.socialGrid}>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className={styles.socialCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>IG</div>
              <div className={styles.arrowCircle}>↗</div>
            </div>
            <div className={styles.cardBody}>
              <h4>INSTAGRAM</h4>
              <p>Share visually appealing snippets of our latest web projects.</p>
            </div>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className={styles.socialCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>TW</div>
              <div className={styles.arrowCircle}>↗</div>
            </div>
            <div className={styles.cardBody}>
              <h4>TWITTER</h4>
              <p>Tweet about interesting coding challenges you've overcome.</p>
            </div>
          </a>
          <a href="https://dribbble.com" target="_blank" rel="noreferrer" className={styles.socialCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>DR</div>
              <div className={styles.arrowCircle}>↗</div>
            </div>
            <div className={styles.cardBody}>
              <h4>DRIBBBLE</h4>
              <p>Showcase design elements of our web projects.</p>
            </div>
          </a>
          <a href="https://behance.net" target="_blank" rel="noreferrer" className={styles.socialCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>BE</div>
              <div className={styles.arrowCircle}>↗</div>
            </div>
            <div className={styles.cardBody}>
              <h4>BEHANCE</h4>
              <p>Create detailed presentations for our projects.</p>
            </div>
          </a>
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
                <button className={styles.sendBtn}>↗</button>
              </div>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p>© 2024 NexGen. All rights reserved.</p>
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