import { useState } from 'react';
import styles from './success-info-block.module.css';

export const SuccessInfoBlock = ({ project }) => {
  const [activeTab, setActiveTab] = useState('solution');

  const tabs = [
    { id: 'challenge', label: 'CHALLENGE', text: project.challenge_text },
    { id: 'solution', label: 'SOLUTION', text: project.solution_text },
    { id: 'results', label: 'RESULTS', text: project.results_text }
  ];

  return (
    <div className={styles.infoWrapper}>
      <div className={styles.tabsHeader}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`${styles.tabBtn} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.contentArea}>
        <h2 className={styles.tabTitle}>{activeTab.toUpperCase()}</h2>
        <p className={styles.tabDescription}>
          {tabs.find(t => t.id === activeTab)?.text}
        </p>
      </div>
    </div>
  );
};