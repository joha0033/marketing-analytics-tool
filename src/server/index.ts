import express = require('express');
import os = require('os');
import mongoose from 'mongoose';
import {clickDataRouter} from './routes';
import Observer from './services/Observer';

const app = express();
app.use(express.json());

const db = require('./config/keys').mongoProdURI;
mongoose
  .connect(db, {useNewUrlParser: true})
  .then(() => console.log(`Mongodb Connected`))
  .catch(error => console.log(error));

const observer = new Observer();
observer.watchFile('./data');

app.use('/api/clicks', clickDataRouter);

app.get('/api/getUsername', (req: any, res: {send: (arg0: {username: string}) => any}) =>
  res.send({username: os.userInfo().username})
);

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
