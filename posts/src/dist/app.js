"use strict";
exports.__esModule = true;
exports.app = void 0;
var express_1 = require("express");
require("express-async-errors");
var body_parser_1 = require("body-parser");
var cookie_session_1 = require("cookie-session");
var app = express_1["default"]();
exports.app = app;
// Import Routes
var showPost_1 = require("./routes/showPost");
var newPost_1 = require("./routes/newPost");
var editPost_1 = require("./routes/editPost");
var deletePost_1 = require("./routes/deletePost");
// Allow Ingress Proxying
app.set('trust proxy', true);
// Returns middleware that only parses json and only looks at requests 
// where the Content-Type header matches the type option.
app.use(body_parser_1.json());
// Configure cookie-session
app.use(cookie_session_1["default"]({
    signed: false,
    // Allow non-https requests when running tests
    secure: process.env.NODE_ENV !== 'test'
}));
// Use routers
app.use(showPost_1.showPostRouter);
app.use(newPost_1.newPostRouter);
app.use(editPost_1.editPostRouter);
app.use(deletePost_1.deletePostRouter);
