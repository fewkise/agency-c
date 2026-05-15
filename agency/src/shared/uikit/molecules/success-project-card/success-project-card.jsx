import styles from './success-project-card.module.css';

export const SuccessProjectCard = ({ project }) => (
  <div className={styles.card}>
    <div className={styles.header}>
      <div className={styles.titleGroup}>
        <div className={styles.iconBox}>
          <img src={project.iconUrl} alt="" />
        </div>
        <h3>{project.project_name}</h3>
      </div>
      <a href={project.website_link} className={styles.visitBtn}>
        <span>↗ VISIT WEBSITE</span>
      </a>
    </div>
    <div className={styles.tags}>
      <span className={styles.tag}>Industry • {project.industry}</span>
      <span className={styles.tag}>Service Utilized • {project.service_utilized}</span>
    </div>
  </div>
);