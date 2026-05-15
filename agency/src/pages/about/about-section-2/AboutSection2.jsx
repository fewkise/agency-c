import { useState, useEffect } from 'react';
import styles from './AboutSection2.module.css';

export const AboutSection2 = ({ heroId }) => {
  const [header, setHeader] = useState(null);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/services-hero/${heroId}`)
      .then(res => res.json())
      .then(setHeader)
      .catch(err => console.error(err));

    fetch('http://localhost:5000/api/team')
      .then(res => res.json())
      .then(setTeam)
      .catch(err => console.error(err));
  }, [heroId]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.headerCard}>
        <h2 className={styles.title}>
          {header?.title_main} <span className={styles.highlight}>{header?.title_sub}</span>
        </h2>
        <button className={styles.allMembersBtn}>
          <div className={styles.btnArrow}>↗</div>
          <span>ALL MEMBERS</span>
        </button>
      </div>

      <div className={styles.teamGrid}>
        {team.map((member) => (
          <div key={member.id} className={styles.memberCard}>
            <div className={styles.topInfo}>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
            
            <div className={styles.photoBox}>
              <img src={member.imageUrl} alt={member.name} className={styles.mainPhoto} />
            </div>

            <div className={styles.socials}>
              {member.fbIcon && (
                <a href={member.fb_link} className={styles.socialLink}>
                  <img src={member.fbIcon} alt="FB" />
                </a>
              )}
              {member.twIcon && (
                <a href={member.tw_link} className={styles.socialLink}>
                  <img src={member.twIcon} alt="TW" />
                </a>
              )}
              {member.inIcon && (
                <a href={member.in_link} className={styles.socialLink}>
                  <img src={member.inIcon} alt="IN" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};