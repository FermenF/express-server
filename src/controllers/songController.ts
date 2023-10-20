import { Request, Response } from 'express';
import youtube from '@yimura/scraper'
import ytdl from 'ytdl-core';

import path from 'path';
import fs from 'fs';

import Song from '../models/Song';

const songController = {
    
    async getSongsList(req: Request, res: Response) {
        try {
            const { song, artist } = req.query;
            // @ts-ignore
            const yt = new youtube.default();
            await yt.search(`${song} ${artist}`).then(results => {
                res.send(results.videos);
            });
        } catch (error) {
            throw res.send(error);
        }
    },

    async downloadOrGetSong(req: Request, res: Response) {
        try {
            const { id } = req.query;
            const song = await findSong(id);

            if(song){
                await getSong(id, res);
            }else{
                await downloadSong(id);
                await getSong(id, res);
            }

        } catch (error) {
            throw res.send(error);
        };
    }
};

async function getSong(id, res: Response){
    try {
        const audioFilePath = path.join(__dirname, '../../public', `${id}.mp4`);

        return res.status(200).sendFile(audioFilePath, (err) => {
            if (err) {
                res.status(500).send('Error sending audio file. ' + err);
            }
        });
        
    } catch (error) {
        throw res.send(error);
    }
}

async function findSong(songId){
    try {
        const song = await Song.findOne({
            song_id: songId
        });
        
        return song;

    } catch (error) {
        throw error;
    };
};

async function downloadSong(songId) {
    try {
         const downloadPromise = new Promise((resolve, reject) => {
             const downloadStream = ytdl(`https://www.youtube.com/watch?v=${songId}`, {
                 quality: 'highestaudio'
             });
             
             const audioFilePath = path.join(__dirname, '../../public', `${songId}.mp4`);
             const fileStream = fs.createWriteStream(audioFilePath);
             
             downloadStream.pipe(fileStream);
             
             downloadStream.on('end', () => {
                // @ts-ignore
                resolve();
             });
             
             downloadStream.on('error', (error) => {
                reject(error);
             });
         });
         
         await downloadPromise;
         
         return storeSong(songId);
    } catch (error) {
         throw error;
    };
};


async function storeSong(songId) {
    try{
        Song.create({
            song_id: songId
        });

        return true;

    }catch (error) {
        throw error;
    }
}

export default songController;