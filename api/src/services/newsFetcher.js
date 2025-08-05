const axios = require('axios');
const Article = require('../models/Article');

const NEWS_API_KEY = process.env.NEWS_API_KEY; // Put in .env
const NEWS_API_URL = `https://api.thenewsapi.com/v1/news/top`;

const fetchNewsFromNewsAPI = async () => {
  try {
    const res = await axios.get(NEWS_API_URL, {
      params: {
        language: 'en',
        page: 1,
        limit: 1,
        api_token: NEWS_API_KEY,
        categories: 'general,technology,sports,health',
        sort: 'published_at',
      },
    });

    const articles = res.data.data;
    for (const item of articles) {
      // Avoid duplicate titles (basic de-duplication)
      const exists = await Article.findOne({ where: { title: item.title } });
      if (exists) continue;

      await Article.create({
        title: item.title,
        summary: item.description,
        content: item.description,
        source: item.source,
        author: 'Unknown',
        publishedAt: item.published_at,
        category: 'General', // or map categories later
      });
    }

    console.log(`[NewsAPI] Fetched and stored ${articles.length} articles`);
  } catch (err) {
    console.error('[NewsAPI] Error:', err.message);
  }
};

module.exports = { fetchNewsFromNewsAPI };
