import { model, Schema, Document } from 'mongoose';

export interface ISong extends Document{
    song_id:string;
};

const SongSchema = new Schema({
    song_id: {
        type: String,
        unique: true,
        required: true
    }
});

export default model<ISong>('Song', SongSchema);