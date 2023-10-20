import mongoose from 'mongoose';
import config from './config';

const uri = config.DB.URI+config.DB.USER+config.DB.PASSWORD+config.DB.EXT;

mongoose.connect(uri);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("Connection with mongodb stablished");
});

connection.on('error', (err) => {
    console.log(err);
    process.exit(0);
});

export default mongoose;