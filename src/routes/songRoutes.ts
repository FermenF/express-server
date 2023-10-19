import express from 'express';
import songController from '../controllers/songController';

const router = express.Router();

router.get('/get-songs-list', songController.getSongsList);
router.get('/download-or-get-song', songController.downloadOrGetSong);

export default router;
