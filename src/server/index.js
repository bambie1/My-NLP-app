const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');

app.use(cors());// Cors for cross origin allowance

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Initialize the main project folder
app.use(express.static('dist'));
console.log(__dirname)

var aylien = require('aylien_textapi');
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

let analysedNews = []

app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
})
// "https://us.cnn.com/2020/03/17/us/kentucky-refused-quarantine-coronavirus-trnd/index.html"
app.post("/classify", (req, res) => {
    textapi.classify(req.body, (error, response) => {
        if (error === null) {
            // console.log(response);
            let aylienNews = {
                Lang: response.language,
                Label: response.categories[0].label,
                Conf: response.categories[0].confidence,
                Text: response.text,
            }
            analysedNews.push(aylienNews)
            res.send(analysedNews)
        } else {
            console.log('there was an error:', error)
        }
    });
});

app.post("/extract", (req, res) => {
    textapi.extract(req.body, (error, response) => {
        if (error === null) {
            // console.log(response);
            let aylienNews = {
                Title: response.title,
                Article: response.article,
                Author: response.author,
                Feeds: response.feeds,
                PublishDate: response.publishDate
            }
            analysedNews.push(aylienNews)
            res.send(analysedNews)
        } else {
            console.log('there was an error:', error)
        }
    });
});

app.get('/form', getNLP)

function getNLP (req, res) {
    res.send(analysedNews)
    console.log(res)
}

const port = 3070;
const server = app.listen(port, listening)

// Callback to debug
function listening() {
    console.log(`running on localhost: ${port}`)
}