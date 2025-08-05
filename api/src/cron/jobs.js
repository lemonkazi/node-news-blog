const cron = require('node-cron');
const { fetchNewsFromNewsAPI } = require('../services/newsFetcher');

// Run every 30 minutes
cron.schedule('*/30 * * * *', async () => {
  console.log('🔁 Running News API fetch job');
  await fetchNewsFromNewsAPI();
});
