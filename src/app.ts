import express, { Application } from 'express';
import cors from 'cors';
import helmet from "helmet";
import routes from './api/routes'

import morgan from 'morgan';
import { limiter } from '../lib/rate-limit';
import { corsOptions } from '../lib/cors-options';

const app: Application = express();

app.use(helmet());

app.use(cors(corsOptions));
app.use(express.json());

app.use(morgan('combined'))

app.use('/api/v1', limiter, routes)


export { app }