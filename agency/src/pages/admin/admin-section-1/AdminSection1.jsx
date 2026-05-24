import { useState, useEffect } from 'react';
import styles from './AdminSection1.module.css';

const SECTIONS = {
  stats: { title: 'Site Stats', url: '/api/stats', fields: ['label', 'value'] },
  reasons: { title: 'Reasons', url: '/api/reasons', fields: ['title', 'description'] },
  services: { title: 'Services', url: '/api/services', fields: ['title', 'description', 'price'] },
  projects: { title: 'Projects', url: '/api/projects', fields: ['title', 'category'] },
  blogs: { title: 'Blogs', url: '/api/blogs', fields: ['title', 'author', 'published_date', 'category', 'read_time', 'is_featured', 'full_content'], canCreate: true },
  testimonials: { title: 'Testimonials', url: '/api/testimonials', fields: ['name', 'role', 'comment'] },
  faqs: { title: 'FAQs', url: '/api/faqs', fields: ['question', 'answer'] },
  team: { title: 'Team Members', url: '/api/team', fields: ['name', 'role', 'fb_link', 'tw_link', 'in_link'] },
  achievements: { title: 'Achievements', url: '/api/achievements', fields: ['title', 'value'] },
  jobs: { title: 'Jobs / Careers', url: '/api/jobs', fields: ['title', 'department', 'location'] },
  footer: { title: 'Footer Settings', url: '/api/footer-settings', fields: ['title_main', 'description', 'copyright'], isSingle: true }
};

export const AdminSection1 = () => {
  const [activeTab, setActiveTab] = useState('blogs');
  const [data, setData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchData();
    setEditingItem(null);
    setSelectedFile(null);
  }, [activeTab]);

  const fetchData = () => {
    const config = SECTIONS[activeTab];
    fetch(`http://localhost:5000${config.url}`)
      .then(res => res.json())
      .then(json => {
        setData(config.isSingle ? [json] : json);
      })
      .catch(err => showStatus(err.message, 'error'));
  };

  const showStatus = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 4000);
  };

  const handleInputChange = (e, field) => {
    setEditingItem({
      ...editingItem,
      [field]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleCreateNew = () => {
    const emptyItem = {};
    SECTIONS[activeTab].fields.forEach(f => {
      emptyItem[f] = f === 'is_featured' ? 'false' : '';
    });
    setEditingItem(emptyItem);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const config = SECTIONS[activeTab];
    const formData = new FormData();
    
    config.fields.forEach(field => {
      formData.append(field, editingItem[field] || '');
    });

    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    try {
      const isNew = !editingItem.id;
      let targetUrl = `http://localhost:5000${config.url}`;
      
      if (!isNew && !config.isSingle) {
        targetUrl += `/${editingItem.id}`;
      }

      const response = await fetch(targetUrl, {
        method: isNew ? 'POST' : 'PUT',
        body: formData
      });

      if (response.ok) {
        showStatus('Success', 'success');
        setEditingItem(null);
        setSelectedFile(null);
        fetchData();
      } else {
        showStatus('Server Error', 'error');
      }
    } catch (err) {
      showStatus(err.message, 'error');
    }
  };

  return (
    <section className={styles.adminWrapper}>
      <div className={styles.sidebar}>
        <div className={styles.logoBox}>
          <h2>AGENCY<span>.CORE</span></h2>
          <p>Control Panel</p>
        </div>
        <nav className={styles.menu}>
          {Object.keys(SECTIONS).map((key) => (
            <button
              key={key}
              className={`${styles.menuBtn} ${activeTab === key ? styles.activeMenu : ''}`}
              onClick={() => setActiveTab(key)}
            >
              {SECTIONS[key].title}
            </button>
          ))}
        </nav>
      </div>

      <div className={styles.mainContent}>
        <header className={styles.contentHeader}>
          <h1>{SECTIONS[activeTab].title}</h1>
          <div className={styles.headerActions}>
            {SECTIONS[activeTab].canCreate && !editingItem && (
              <button className={styles.createBtn} onClick={handleCreateNew}>
                + Add New Blog
              </button>
            )}
            {message.text && (
              <div className={`${styles.badge} ${styles[message.type]}`}>
                {message.text}
              </div>
            )}
          </div>
        </header>

        {!editingItem ? (
          <div className={styles.gridList}>
            {data.map((item, index) => (
              <div key={item.id || index} className={styles.dataCard}>
                <div className={styles.cardInfo}>
                  <h3>{item.title || item.name || item.question || item.label || `Item #${index + 1}`}</h3>
                  <p>{item.full_content || item.description || item.role || item.value || item.answer || item.category || ''}</p>
                </div>
                <button className={styles.editBtn} onClick={() => setEditingItem(item)}>
                  Edit ↗
                </button>
              </div>
            ))}
          </div>
        ) : (
          <form onSubmit={handleSave} className={styles.editorForm}>
            <div className={styles.formHeader}>
              <h2>{editingItem.id ? 'Edit Entry' : 'Create New Entry'}</h2>
              <button type="button" className={styles.cancelBtn} onClick={() => setEditingItem(null)}>
                ← Back
              </button>
            </div>

            <div className={styles.inputsGrid}>
              {SECTIONS[activeTab].fields.map((field) => {
                const isBigText = field === 'description' || field === 'comment' || field === 'answer' || field === 'full_content';
                return (
                  <div key={field} className={styles.inputGroup} style={{ gridColumn: isBigText ? '1 / -1' : 'auto' }}>
                    <label>{field.replace('_', ' ').toUpperCase()}</label>
                    {isBigText ? (
                      <textarea
                        value={editingItem[field] || ''}
                        onChange={(e) => handleInputChange(e, field)}
                        required
                      />
                    ) : (
                      <input
                        type="text"
                        value={editingItem[field] || ''}
                        onChange={(e) => handleInputChange(e, field)}
                        required
                      />
                    )}
                  </div>
                );
              })}

              <div className={styles.inputGroup} style={{ gridColumn: '1 / -1' }}>
                <label>Media Asset</label>
                <div className={styles.fileUploadArea}>
                  <input type="file" accept="image/*" onChange={handleFileChange} id="fileInput" />
                  <label htmlFor="fileInput" className={styles.fileLabel}>
                    {selectedFile ? selectedFile.name : 'Choose file'}
                  </label>
                </div>
              </div>
            </div>

            <button type="submit" className={styles.saveBtn}>
              {editingItem.id ? 'Save Changes' : 'Create Entry'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};