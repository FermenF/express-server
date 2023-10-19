import express from 'express';
import cors from 'cors';
import songRoutes from './routes/songRoutes';
import './database/db';

export const app = express();

app.use(cors({ origin: true }));

app.use(express.json());
app.use(express.raw({ type: 'application/vnd.custom-type' }));
app.use(express.text({ type: 'text/html' }));

app.get('/', (req, res) => {
  res.status(200).send({ status: 'FULL MUSIC API ' });
});

// Version the api
app.use('/api/v1', songRoutes);
