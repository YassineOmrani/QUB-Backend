require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet')
const mongodb = require('mongodb');

var tagDefiner = require('./middlewares/tag-definer');
var responseGenerator = require('./middlewares/response-generator');
var weatherTags = require('./middlewares/weather-tags');
var weatherFinder = require('./middlewares/weather-finder');

var app = express();
app.use(helmet());
app.use(bodyParser.json());
// app.use(tagDefiner);
// app.use(responseGenerator);
app.use(weatherTags);
app.use(weatherFinder);


app.post('/', (req, res) => {
    res.send({ans : req.ans});
    console.log(" ");
    console.log("--------------------------------------------------------------");
    console.log(" ");
});

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
});