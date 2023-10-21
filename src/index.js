import express from 'express';
import fetch from 'cross-fetch';
import cheerio from 'cheerio';
import puppeteer from 'puppeteer';

globalThis.fetch = fetch
const app = express();
const port = 3000
app.use(express.static('public'));
app.use(express.json());


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


app.post('/translate', async (req, res) => {
  try {
    const text = req.body.text;

    const browser = await puppeteer.launch({ headless: 'new' });

    const page = await browser.newPage();

    let attempts = 0;
    const maxAttempts = 3;
    let success = false;

    while (attempts < maxAttempts && !success) {
      attempts++;
      try {
        await page.goto(`https://www.ingles.com/traductor/${text}`, { waitUntil: 'networkidle0', timeout: 15000 });
        success = true; 
      } catch (error) {
        console.error(`Navigation error on attempt ${attempts}:`, error);
        if (attempts < maxAttempts) {
          console.log(`Retrying... (${attempts}/${maxAttempts})`);
        }
      }
    }

    const content = await page.content();
    const $ = cheerio.load(content);

    let result = $('#quickdef1-es').text();

    if (!result) {
      result = $('.wI9gejVx').text();
    }

    // Crear un objeto JSON con los datos
    const responseData = {
      result,
    };

    await browser.close();

    return res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:3000`);
})