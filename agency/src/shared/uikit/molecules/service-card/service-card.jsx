import styles from './service-card.module.css';

export const ServiceCard = ({ service }) => {
  return (
    <div className={styles.infoBox}>
      <div className={styles.infoTop}>
        <div className={styles.titleWithIcon}>
          <div className={styles.iconWrapper}>
            <img src={service.iconUrl} alt="" />
          </div>
          <h3>{service.title}</h3>
        </div>
        <button className={styles.bookBtn}>
          <span>↗ BOOK A CALL</span>
        </button>
      </div>
      <p className={styles.serviceDesc}>{service.description}</p>
      <div className={styles.priceTag}>
        STARTS FROM {service.price}
      </div>
    </div>
  );
};