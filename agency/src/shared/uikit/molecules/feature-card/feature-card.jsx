import styles from './feature-card.module.css';

export const FeatureCard = ({ title, description, iconUrl }) => {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        <img src={iconUrl} alt={title} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
};