import { useState, useEffect } from 'react';
import styles from './CareersSection2.module.css';
import commonArrow from '../../../shared/icons/common_arrow.png'
export const CareersSection2 = ({ heroId }) => {
  const [header, setHeader] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/services-hero/${heroId}`)
      .then(res => res.json())
      .then(setHeader);

    fetch('http://localhost:5000/api/jobs')
      .then(res => res.json())
      .then(setJobs);
  }, [heroId]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.headerCard}>
        <h2 className={styles.title}>{header?.title_main}</h2>
      </div>

      <div className={styles.jobsGrid}>
        {jobs.map((job) => (
          <div key={job.id} className={styles.jobCard}>
            <div className={styles.cardTop}>
              <div className={styles.titleRow}>
                <div className={styles.iconBox}>
                  <img src={job.iconUrl} alt={job.title} />
                </div>
                <h3 className={styles.jobTitle}>{job.title}</h3>
              </div>
              <button className={styles.viewBtn}>
                <span>VIEW DETAILS</span>
                <div className={styles.arrowCircle}><img src={commonArrow} alt="" /></div>
              </button>
            </div>

            <div className={styles.badgesRow}>
              <div className={styles.badge}>Salary • {job.salary}</div>
              <div className={styles.badge}>Experience • {job.experience}</div>
              <div className={styles.badge}>Deadline • {job.deadline}</div>
            </div>

            <div className={styles.skillsSection}>
              <h4 className={styles.skillsLabel}>SKILLS</h4>
              <p className={styles.skillsText}>{job.skills_text}</p>
            </div>

            <button className={styles.applyBtn}>APPLY NOW</button>
          </div>
        ))}
      </div>
    </section>
  );
};