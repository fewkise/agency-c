import { useState, useEffect } from 'react';
import { ServiceCard } from '../../../shared/uikit/molecules/service-card/service-card';
import { ProjectCard } from '../../../shared/uikit/molecules/project-card/project-card';
import styles from './ServicesSection2.module.css';

export const ServicesSection2 = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/services-with-projects')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className={styles.wrapper}>
      <div className={styles.sectionHeader}>
        <h2>OUR SERVICES</h2>
      </div>
      <div className={styles.servicesGrid}>
        {services.map(item => (
          <div key={item.id} className={styles.serviceRow}>
            <ServiceCard service={item} />
            <ProjectCard title={item.title} projects={item.projects} />
          </div>
        ))}
      </div>
    </section>
  );
};