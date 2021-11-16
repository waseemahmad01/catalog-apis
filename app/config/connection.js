import mongoose from 'mongoose';
import { DB_URL } from '.';

mongoose.connect(DB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
const dataBase = mongoose.connection;
dataBase.on('error', console.error.bind(console, 'connectionError'));
dataBase.once('open', ()=>{
    console.log('DataBase connection.....');
});
