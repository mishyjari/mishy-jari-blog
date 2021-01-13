import express from "express";
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

const app = express();

// Import Routes
import { showPostRouter } from "./routes/showPost";
import { newPostRouter } from "./routes/newPost";
import { editPostRouter } from "./routes/editPost";
import { deletePostRouter } from "./routes/deletePost";

// Allow Ingress Proxying
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

// Use routers
app.use(showPostRouter);
app.use(newPostRouter);
app.use(editPostRouter);
app.use(deletePostRouter);

export { app };