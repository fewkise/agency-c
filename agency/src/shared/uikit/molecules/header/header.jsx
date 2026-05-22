import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './header.module.css';
import logo from '../../../icons/logo.png'
export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.headerPositioner}>
      <header className={styles.headerBlock}>
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <img src={logo} alt="" />
        </Link>
        
        <div className={`${styles.navAndApi} ${isOpen ? styles.menuOpen : ''}`}>
          <nav className={styles.nav}>
  <NavLink 
    end 
    to="/" 
    className={({ isActive }) => isActive ? styles.active : ''} 
    onClick={closeMenu}
  >
    HOME
  </NavLink>
  
  <NavLink 
    to="/services" 
    className={({ isActive }) => isActive ? styles.active : ''} 
    onClick={closeMenu}
  >
    SERVICES
  </NavLink>
  
  <NavLink 
    to="/projects" 
    className={({ isActive }) => isActive ? styles.active : ''} 
    onClick={closeMenu}
  >
    PROJECTS
  </NavLink>
  
  <NavLink 
    to="/about" 
    className={({ isActive }) => isActive ? styles.active : ''} 
    onClick={closeMenu}
  >
    ABOUT
  </NavLink>
  
  <NavLink 
    to="/careers" 
    className={({ isActive }) => isActive ? styles.active : ''} 
    onClick={closeMenu}
  >
    CAREERS
  </NavLink>
  
  <NavLink 
    to="/blogs" 
    className={({ isActive }) => isActive ? styles.active : ''} 
    onClick={closeMenu}
  >
    BLOGS
  </NavLink>
</nav>
          
          <Link to="/contact" className={styles.contactBtn} onClick={closeMenu}>
            CONTACT US
          </Link>
        </div>

        <button 
          className={`${styles.burgerBtn} ${isOpen ? styles.burgerActive : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>
    </div>
  );
};