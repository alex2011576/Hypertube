import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import userRouter from './routes/users';
import loginRouter from './routes/login';
import streamRouter from './routes/streaming';
import movieRouter from './routes/movies';

import { globalErrorHandler, unknownEndpoint } from './errors';

import { createServer } from 'http';
import { sessionIdExtractor } from './utils/middleware';

export const app = express();
export const httpServer = createServer(app);

app.use(express.json({ limit: '50mb' }));

app.use(cors());

dotenv.config();

app.use(sessionIdExtractor);

app.use('/api/login', loginRouter);
app.use('/api/users', userRouter);
app.use('/api/stream', streamRouter);
app.use('/api/movies', movieRouter);
// Error handler for errors
app.use(globalErrorHandler);

app.use(unknownEndpoint);
streamRouter;
