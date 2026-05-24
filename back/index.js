const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const multer = require('multer');
const path = require('path');
require('dotenv').config();
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });
app.get('/api/stats', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM site_stats ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
app.get('/api/reasons', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reasons ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
app.get('/api/services', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM services ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
app.get('/api/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
app.get('/api/testimonials', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM testimonials ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
app.get('/api/faqs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM faqs ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
app.get('/api/featured-project', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM hero_projects LIMIT 1');
    const project = result.rows[0];
    
    res.json({
      title: project.title,
      category: project.category,
      imageUrl: `http://localhost:5000/${project.image_path}`
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});
app.get('/api/services-hero/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM services_hero WHERE id = $1', [id]);
    
    if (result.rows.length > 0) {
      const data = result.rows[0];
      res.json({
        ...data,
        imageUrl: `http://localhost:5000/${data.image_path}`
      });
    } else {
      res.status(404).send('Hero section not found');
    }
  } catch (err) {
    res.status(500).send('Server Error');
  }
});
app.get('/api/services-with-projects', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        s.id, s.title, s.description, s.price, s.icon_url,
        COALESCE(json_agg(p.*) FILTER (WHERE p.id IS NOT NULL), '[]') as projects
      FROM services s
      LEFT JOIN service_projects p ON s.id = p.service_id
      GROUP BY s.id
      ORDER BY s.id ASC
    `);
    
    const formattedData = result.rows.map(service => ({
      ...service,
      iconUrl: `http://localhost:5000/${service.icon_url}`,
      projects: service.projects.map(p => ({
        id: p.id,
        imageUrl: `http://localhost:5000/${p.image_path}`
      }))
    }));

    res.json(formattedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get('/api/success-stories', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM success_stories ORDER BY order_index ASC');
    const data = result.rows.map(item => ({
      ...item,
      iconUrl: `http://localhost:5000/${item.icon_path}`
    }));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/api/project-features', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM project_features ORDER BY order_index ASC');
    const formattedData = result.rows.map(item => ({
      ...item,
      iconUrl: `http://localhost:5000/${item.icon_path}`
    }));
    res.json(formattedData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/api/about-stats-top', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM site_stats ORDER BY id ASC LIMIT 4');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
app.get('/api/team', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM team_members ORDER BY order_index ASC');
    const members = result.rows.map(m => ({
      ...m,
      imageUrl: `http://localhost:5000/${m.image_path}`,
      fbIcon: m.fb_icon_path ? `http://localhost:5000/${m.fb_icon_path}` : null,
      twIcon: m.tw_icon_path ? `http://localhost:5000/${m.tw_icon_path}` : null,
      inIcon: m.in_icon_path ? `http://localhost:5000/${m.in_icon_path}` : null
    }));
    res.json(members);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});
app.get('/api/achievements', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM achievements ORDER BY order_index ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});
app.get('/api/awards', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM awards ORDER BY order_index ASC');
    const data = result.rows.map(item => ({
      ...item,
      iconUrl: `http://localhost:5000/${item.icon_path}`
    }));
    res.json(data);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});
app.get('/api/jobs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM jobs ORDER BY order_index ASC');
    const data = result.rows.map(item => ({
      ...item,
      iconUrl: `http://localhost:5000/${item.icon_path}`
    }));
    res.json(data);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});
app.get('/api/career-steps', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM career_steps ORDER BY order_index ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});
app.get('/api/blogs', async (req, res) => {
  const { category } = req.query;
  try {
    let result;
    if (category) {
      result = await pool.query(
        'SELECT * FROM blogs WHERE category = $1 ORDER BY is_featured DESC, id DESC', 
        [category]
      );
    } else {
      result = await pool.query('SELECT * FROM blogs ORDER BY id DESC');
    }
    res.json(result.rows);
  } catch (err) {
    console.error("Ошибка при получении блогов:", err);
    res.status(500).send('Server Error');
  }
});
app.get('/api/blogs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM blogs WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).send('Blog not found');
    
    const blog = result.rows[0];
    res.json({
      ...blog,
      image_url: `http://localhost:5000/${blog.image_path}`
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});
app.get('/api/contact-methods', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contact_methods');
    res.json(result.rows || result); 
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('/api/countries', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM countries');
    res.json(result.rows || result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});
app.post('/api/user-questions', async (req, res) => {
  const { name, email, question } = req.body;

  if (!name || !email || !question) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const query = `
      INSERT INTO user_questions (name, email, question) 
      VALUES ($1, $2, $3) 
      RETURNING *;
    `;
    const values = [name, email, question];
    
    const result = await pool.query(query, values); 
    
    res.status(201).json({ 
      success: true, 
      message: 'Question saved successfully', 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error('Database insertion error:', error);
    res.status(500).json({ error: 'Internal server error failed to save question' });
  }
});
app.get('/api/footer-settings', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM footer_settings LIMIT 1');
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.get('/api/footer-settings', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM footer_settings LIMIT 1');
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.get('/api/footer-socials', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM footer_socials ORDER BY id ASC');
    const socials = result.rows.map(item => ({
      ...item,
      iconUrl: `http://localhost:5000/${item.icon_path}`
    }));
    res.json(socials);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
app.post('/api/contact', async (req, res) => {
  try {
    const { firstName, lastName, email, countryCode, phone, message } = req.body;

    if (!firstName || !lastName || !email || !phone || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const queryText = `
      INSERT INTO messages (first_name, last_name, email, country_code, phone, message)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [firstName, lastName, email, countryCode, phone, message];
    const result = await pool.query(queryText, values);

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.put('/api/stats/:id', upload.none(), async (req, res) => {
  const { id } = req.params;
  const { label, value } = req.body;
  try {
    await pool.query('UPDATE site_stats SET label = $1, value = $2 WHERE id = $3', [label, value, id]);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

app.put('/api/reasons/:id', upload.none(), async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    await pool.query('UPDATE reasons SET title = $1, description = $2 WHERE id = $3', [title, description, id]);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

app.put('/api/services/:id', upload.none(), async (req, res) => {
  const { id } = req.params;
  const { title, description, price } = req.body;
  try {
    await pool.query('UPDATE services SET title = $1, description = $2, price = $3 WHERE id = $4', [title, description, price, id]);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

app.put('/api/projects/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { title, category } = req.body;
  try {
    if (req.file) {
      const path = `uploads/${req.file.filename}`;
      await pool.query('UPDATE projects SET title = $1, category = $2, image_path = $3 WHERE id = $4', [title, category, path, id]);
    } else {
      await pool.query('UPDATE projects SET title = $1, category = $2 WHERE id = $3', [title, category, id]);
    }
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

app.put('/api/testimonials/:id', upload.none(), async (req, res) => {
  const { id } = req.params;
  const { name, role, comment } = req.body;
  try {
    await pool.query('UPDATE testimonials SET name = $1, role = $2, comment = $3 WHERE id = $4', [name, role, comment, id]);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

app.put('/api/faqs/:id', upload.none(), async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  try {
    await pool.query('UPDATE faqs SET question = $1, answer = $2 WHERE id = $3', [question, answer, id]);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

app.put('/api/team/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { name, role, fb_link, tw_link, in_link } = req.body;
  try {
    if (req.file) {
      const path = `uploads/${req.file.filename}`;
      await pool.query('UPDATE team_members SET name = $1, role = $2, fb_link = $3, tw_link = $4, in_link = $5, image_path = $6 WHERE id = $7', [name, role, fb_link, tw_link, in_link, path, id]);
    } else {
      await pool.query('UPDATE team_members SET name = $1, role = $2, fb_link = $3, tw_link = $4, in_link = $5 WHERE id = $6', [name, role, fb_link, tw_link, in_link, id]);
    }
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

app.put('/api/achievements/:id', upload.none(), async (req, res) => {
  const { id } = req.params;
  const { title, value } = req.body;
  try {
    await pool.query('UPDATE achievements SET title = $1, value = $2 WHERE id = $3', [title, value, id]);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

app.put('/api/jobs/:id', upload.none(), async (req, res) => {
  const { id } = req.params;
  const { title, department, location } = req.body;
  try {
    await pool.query('UPDATE jobs SET title = $1, department = $2, location = $3 WHERE id = $4', [title, department, location, id]);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

app.put('/api/footer-settings', upload.none(), async (req, res) => {
  const { title_main, description, copyright } = req.body;
  try {
    await pool.query('UPDATE footer_settings SET title_main = $1, description = $2, copyright = $3', [title_main, description, copyright]);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});
app.get('/api/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.get('/api/team', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM team_members ORDER BY order_index ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
app.put('/api/blogs/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { title, author, published_date, category, read_time, full_content, is_featured } = req.body;
  
  try {
    const checkBlog = await pool.query('SELECT * FROM blogs WHERE id = $1', [id]);
    if (checkBlog.rows.length === 0) {
      return res.status(404).send('Блог с таким ID не найден в базе данных');
    }

    if (req.file) {
      const path = `uploads/${req.file.filename}`;
      await pool.query(
        'UPDATE blogs SET title = $1, author = $2, published_date = $3, category = $4, read_time = $5, full_content = $6, is_featured = $7, image_path = $8 WHERE id = $9',
        [title, author, published_date, category, read_time, full_content, is_featured || false, path, id]
      );
    } else {
      await pool.query(
        'UPDATE blogs SET title = $1, author = $2, published_date = $3, category = $4, read_time = $5, full_content = $6, is_featured = $7 WHERE id = $8',
        [title, author, published_date, category, read_time, full_content, is_featured || false, id]
      );
    }

    res.sendStatus(200);
  } catch (err) {
    console.error("Ошибка при обновлении блога:", err);
    res.status(500).send(err.message);
  }
});
app.post('/api/blogs', upload.single('image'), async (req, res) => {
  const { title, author, published_date, category, read_time, full_content, description } = req.body;
  
  const isFeatured = req.body.is_featured === 'true' || req.body.is_featured === true;
  
  const imagePath = req.file ? `uploads/${req.file.filename}` : 'uploads/default_blog.jpg';

  try {
    const queryText = `
      INSERT INTO blogs (title, author, published_date, category, read_time, full_content, description, is_featured, image_path) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
      RETURNING *;
    `;
    
    const values = [
      title || '', 
      author || 'Admin', 
      published_date || new Date().toISOString().split('T')[0], 
      category || 'Design', 
      read_time || '5 min', 
      full_content || '', 
      description || full_content || '', 
      isFeatured, 
      imagePath
    ];

    const result = await pool.query(queryText, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("КРИТИЧЕСКАЯ ОШИБКА БД ПРИ СОЗДАНИИ БЛОГА:", err.message);
    res.status(500).send(`Database Error: ${err.message}`);
  }
});
app.get('/', (req, res) => res.send('API is running...'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));