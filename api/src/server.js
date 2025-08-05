const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
// After other imports
const sequelize = require('./config/database');



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

// Sync DB
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



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
