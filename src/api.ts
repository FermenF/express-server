import express from 'express';
import cors from 'cors';
import youtube from '@yimura/scraper'

export const app = express();

app.use(cors({ origin: true }));

app.use(express.json());
app.use(express.raw({ type: 'application/vnd.custom-type' }));
app.use(express.text({ type: 'text/html' }));

// Healthcheck endpoint
app.get('/', (req, res) => {
  res.status(200).send({ status: 'ok' });
});

const api = express.Router();

api.get('/getsongslist', (req, res) => {
  try {
    const { song, artist } = req.query;
    // @ts-ignore
    const yt = new youtube.default();
    yt.search(`${song} ${artist}`).then(results => {
      res.send(results.videos);
    });
  } catch (error) {
    res.send(error);
  }
});
// Version the api
app.use('/api/v1', api);
