const express = require('express');
const path = require('path');
const app = express();
const port = 8020;
const cors = require('cors');
const fetch = require('node-fetch');

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: false, limit: '20mb' }));
app.use(express.static("public"));
// app.use('/', router);
app.use(cors());