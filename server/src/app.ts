import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';

import userRouter from './routes/users';
import loginRouter from './routes/login';

import { globalErrorHandler, unknownEndpoint } from './errors';
// import {  sessionIdExtractor } from './utils/middleware';

import { createServer } from 'http';
import { myLocalStrategy } from './passport/strategies';

export const app = express();
export const httpServer = createServer(app);

app.use(express.json({ limit: '50mb' }));

app.use(cors());

dotenv.config();

passport.use(myLocalStrategy);

// app.use(sessionIdExtractor);

app.use('/api/login', loginRouter);
app.use('/api/users', userRouter);

// Error handler for errors
app.use(globalErrorHandler);

app.use(unknownEndpoint);
