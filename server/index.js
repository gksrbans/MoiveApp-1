import express from 'express';
import mongoose from 'mongoose';
import config from './config/index.js';
import path from 'path';
import cors from 'cors';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

// 바디파서랑 쿠키파서 이거 써야되는거임 ?
// app.use(express.json()); 이거 하면 대지않나 ?

// express(json())
// const express = require('express');
// const path = require('path');
// const cors = require('cors');

// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');

//const mongoose = require("mongoose");

// Routes
import user from './routes/users.js';
import favorite from './routes/favorite.js';
import like from './routes/like.js';

const app = express();

const { MONGO_URI } = config;
const prod = process.env.NODE_ENV === 'production';

const connect = mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB connecting Success!!'))
  .catch((err) => console.log(err));

// app.use(cors())
app.use(cors({ origin: true, credentials: true }));

//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', user);
app.use('/api/favorite', favorite);
app.use('/api/like', like);

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  // All the javascript and css files will be read and served from this folder
  app.use(express.static('client/build'));

  // index.html for all page routes    html or routing and naviagtion
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
