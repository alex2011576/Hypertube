import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import userRouter from './routes/users';
import loginRouter from './routes/login';
import streamRouter from './routes/streaming';
import movieRouter from './routes/movies';
import subtitleRouter from './routes/subtitles';
import { globalErrorHandler, unknownEndpoint } from './errors';

import { createServer } from 'http';
import { sessionIdExtractor } from './utils/middleware';

import cron from 'node-cron';
import { deleteIdleMovies } from './services/movies';

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
app.use('/api/subtitles', subtitleRouter);

// Error handler for errors
app.use(globalErrorHandler);

app.use(unknownEndpoint);

// cron.schedule('*/1 * * * * *',  () => {  // every second for testing
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
cron.schedule('0 9 * * *',  () => {  
	console.log('running a task every day at 9:00 UTC');
	deleteIdleMovies()
	.then(() => console.log('successful deletion of idle movies'))
	.catch(()=> console.log('failed to delete idle movies'));
  });
