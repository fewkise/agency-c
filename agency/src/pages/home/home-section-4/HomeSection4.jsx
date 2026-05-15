import { useState, useEffect } from 'react';
import styles from './HomeSection4.module.css';

const API_URL = 'http://localhost:5000/';

export const HomeSection4 = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}api/projects`)
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.headerBox}>
          <h2>OUR WORKS</h2>
          <div className={styles.allWorks}>
            <div className={styles.arrowSmall}>↗</div>
            <span>ALL WORKS</span>
          </div>
        </div>

        <div className={styles.projectsList}>
          {projects.map((project) => (
            <div key={project.id} className={styles.projectCard}>
              <div className={styles.infoCol}>
                <div className={styles.cardTitleRow}>
                  <div className={styles.iconBox}>★</div>
                  <h3>{project.title}</h3>
                  <div className={styles.detailsBtn}>
                    <div className={styles.arrowDetails}>↗</div>
                    <span>DETAILS</span>
                  </div>
                </div>
                <div className={styles.tagsRow}>
                  <span className={styles.tag}>Category • {project.category}</span>
                  <span className={styles.tag}>Time Taken • {project.time_taken}</span>
                </div>
                <p className={styles.description}>{project.description}</p>
              </div>

              <div className={styles.imageCol}>
                <img src={`${API_URL}${project.main_image}`} alt={project.title} />
              </div>

              <div className={styles.sideCol}>
                <div className={styles.subCard}>
                  <h4>TECHNOLOGIES USED</h4>
                  <div className={styles.techGrid}>
                    {project.technologies.map((tech, i) => (
                      <span key={i} className={styles.techTag}>{tech}</span>
                    ))}
                  </div>
                </div>
                
                <div className={styles.subCard}>
                  <div className={styles.teamHeader}>
                    <h4>TEAM MEMBERS</h4>
                    <div className={styles.avatars}>
                      {project.team_members.map((img, i) => (
                        <img key={i} src={`${API_URL}${img}`} alt="team member" />
                      ))}
                    </div>
                  </div>
                  <button className={styles.bookBtn}>BOOK A CALL</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};