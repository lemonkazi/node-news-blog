const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
// After other imports
const sequelize = require('./config/database');
const { fetchNewsFromNewsAPI } = require('./services/newsFetcher');



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

// Sync DB
const Article = require('./models/Article'); // import this too
sequelize.sync({ alter: true }) // optional: auto-sync

sequelize.sync()
  .then(() => console.log('DB connected and synced'))
  .catch(err => console.error('DB error:', err));



// Sample route
app.get('/', (req, res) => {
  res.send('News Aggregator API is running');
});

const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

const userRoutes = require('./routes/user.routes');
app.use('/api/user', userRoutes);


const articleRoutes = require('./routes/article.routes');
app.use('/api/articles', articleRoutes);

const preferencesRoutes = require('./routes/preferences.routes');
app.use('/api/preferences', preferencesRoutes);


app.get('/fetch-test', async (req, res) => {
  try {
    await fetchNewsFromNewsAPI();
    res.send('saved');
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to fetch news' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
require('./cron/jobs');
