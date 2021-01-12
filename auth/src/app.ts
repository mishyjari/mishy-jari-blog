import express from "express";
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

const app = express();

// Import routes
import { signupRouter } from './routes/signup';
import { currentUserRouter } from "./routes/currentUser";
import { signinRouter } from './routes/signin'
import { signoutRouter } from "./routes/signout";
import { updateUserRouter } from "./routes/updateUser";
import { deleteUserRouter } from "./routes/deleteUser";
import { showUserRouter } from './routes/showUser';

// Allow ingress proxying
app.set('trust proxy', true);

// Returns middleware that only parses json and only looks at requests 
// where the Content-Type header matches the type option.
app.use(json());

// Configure cookie-session
app.use(
  cookieSession({
    signed: false,
    // Allow non-https requests when running tests
    secure: process.env.NODE_ENV !== 'test'
  })
);

// Set use for routers
app.use(signupRouter);
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(updateUserRouter);
app.use(deleteUserRouter);
app.use(showUserRouter);

export { app };
