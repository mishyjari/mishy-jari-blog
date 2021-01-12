"use strict";
exports.__esModule = true;
exports.app = void 0;
var express_1 = require("express");
require("express-async-errors");
var body_parser_1 = require("body-parser");
var cookie_session_1 = require("cookie-session");
var app = express_1["default"]();
exports.app = app;
// Import routes
var signup_1 = require("./routes/signup");
var currentUser_1 = require("./routes/currentUser");
var signin_1 = require("./routes/signin");
var signout_1 = require("./routes/signout");
var updateUser_1 = require("./routes/updateUser");
var deleteUser_1 = require("./routes/deleteUser");
var showUser_1 = require("./routes/showUser");
// Allow ingress proxying
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
// Set use for routers
app.use(signup_1.signupRouter);
app.use(currentUser_1.currentUserRouter);
app.use(signin_1.signinRouter);
app.use(signout_1.signoutRouter);
app.use(updateUser_1.updateUserRouter);
app.use(deleteUser_1.deleteUserRouter);
app.use(showUser_1.showUserRouter);
