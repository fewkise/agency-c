import styles from './project-card.module.css';

export const ProjectCard = ({ title, projects }) => {
  return (
    <div className={styles.projectsBox}>
      <div className={styles.projectsHeader}>
        <h4>{title} PROJECTS</h4>
        <button className={styles.viewAll}>
          <div className={styles.arrowCircle}>↗</div>
          <span>VIEW ALL</span>
        </button>
      </div>

      <div className={styles.imageGrid}>
        {projects.slice(0, 2).map((proj) => (
          <div 
            key={proj.id} 
            className={styles.projectImg}
            style={{ backgroundImage: `url(${proj.imageUrl})` }}
          >
            <div className={styles.imgOverlay}>
              <div className={styles.openBtn}>
                <div className={styles.miniArrow}>↗</div>
                OPEN PROJECT
              </div>
            </div>
            <div className={styles.imageTag}>{title}.</div>
          </div>
        ))}
      </div>
    </div>
  );
};