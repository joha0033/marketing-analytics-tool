import express = require('express');
import os = require('os');
import mongoose from 'mongoose';
import bodyParse from 'body-parser';
import {sourceRouter} from './routes';

const app = express();
app.use(express.json());

const db = require('./config/keys').mongoProdURI;
mongoose
  .connect(db, {useNewUrlParser: true})
  .then(() => console.log(`Mongodb Connected`))
  .catch(error => console.log(error));

app.use('/api/sources', sourceRouter);

app.get('/api/getUsername', (req: any, res: {send: (arg0: {username: string}) => any}) =>
  res.send({username: os.userInfo().username})
);

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
