import * as express from 'express';
import { Application } from 'express';
import * as morgan from 'morgan';
import authRouter from './routes/auth.router';
import postRouter from './routes/post.router';
const app: Application = express();

app.use(express.json());
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/auth', authRouter);
app.use('/posts', postRouter);

export {app};
