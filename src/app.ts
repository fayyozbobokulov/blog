import * as express from 'express';
import { Application, Request, Response, NextFunction } from 'express';
import * as morgan from 'morgan';
import authRouter from './routes/auth.router'
const app: Application = express();

app.use(express.json());
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


// app.use((req: Request, res: Response, next: NextFunction) => {
//   req.requstTime = new Date().toISOString();
//   next();
// })

app.use('/auth', authRouter);
// app.use('/posts', postsRouter);

export {app};
