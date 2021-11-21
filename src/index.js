import express from 'express';
import fetch from 'cross-fetch';
import request from 'request-promise';
import cheerio  from 'cheerio';
globalThis.fetch = fetch
const app = express();
const port = 3000

app.get('/', async (req, res) => {
  res.send('Hello World!')
  const $ = await request('https://www.ingles.com/traductor/como estas?',{
    transform: body =>  cheerio.load(body)
  })
  console.log($('title').html())
  console.log($('#quickdef1-es').html())
  console.log($('h1').html())
  console.log($('._3olXdKlz').html())
  return true;
  const r = await fetch('https://www.abc.es/frontalajax/traductor/traducir/',
  {
    cors: 'no-cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'Origin': 'https://www.abc.es',
      'Referer': 'https://www.abc.es/traductor/',
      'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      'X-Requested-With': 'XMLHttpRequest',
  },
  body: 'texto_traducir=good morning?&source_lang=en&target_lang=es&npage=1&json=1&nrows=20'
  })
  console.log(r)
  const n = await r.json()
  console.log(n)
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:3000`);
})