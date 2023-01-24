import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import userRouter from './routes/users';

import { globalErrorHandler, unknownEndpoint } from './errors';
import {  sessionIdExtractor } from './utils/middleware';

import { createServer } from 'http';

export const app = express();
export const httpServer = createServer(app);

app.use(express.json({ limit: '50mb' }));

app.use(cors());

dotenv.config();

app.use(sessionIdExtractor);

app.use('/api/users', userRouter);

// Error handler for errors
app.use(globalErrorHandler);

app.use(unknownEndpoint);
