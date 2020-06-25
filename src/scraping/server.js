const {GatryScraping} = require('./modules/scraping/scraping');
const express = require('express');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

router.get('/api/results', async (req, res) => {
  console.log('------- WEB SERVICE');
  const scrap = new GatryScraping();
  const response = await scrap.getResults();
  res.send(response);
});

router.get('/api/check-updates/:timestamp', async (req, res) => {
  const timestamp = req.params.timestamp;
  const scrap = new GatryScraping();
  const response = await scrap.getUpdates();
  res.send(response);
});


const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Local server listening on port ${port}!`));
  app.use('', router);
}
else {
  app.use('/.netlify/functions/server', router);
}

module.exports = app;
module.exports.handler = serverless(app);

