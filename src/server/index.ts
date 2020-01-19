import express = require('express');
import os = require('os');
import {userRouter} from './routes';

const app = express();

app.use(express.json());

app.use('/users', userRouter);

app.get('/api/getUsername', (req: any, res: {send: (arg0: {username: string}) => any}) =>
  res.send({username: os.userInfo().username})
);

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
