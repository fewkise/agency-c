import { Link, NavLink } from 'react-router-dom';
import styles from './header.module.css';

export const Header = () => {
  return (
    <div className={styles.headerPositioner}>
      <header className={styles.headerBlock}>
        <Link to="/" className={styles.logo}>
          NexGen
        </Link>
        
        <div className={styles.navAndApi}>
          <nav className={styles.nav}>
            <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>
              HOME
            </NavLink>
            <NavLink to="/services">SERVICES</NavLink>
            <NavLink to="/projects">PROJECTS</NavLink>
            <NavLink to="/about">ABOUT</NavLink>
            <NavLink to="/careers">CAREERS</NavLink>
            <NavLink to="/blogs">BLOGS</NavLink>
          </nav>
          
          <Link to="/contact" className={styles.contactBtn}>
            CONTACT US
          </Link>
        </div>
      </header>
    </div>
  );
};