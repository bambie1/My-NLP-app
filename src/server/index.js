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
app.use(express.static('./src/client'));

var aylien = require('aylien_textapi');
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

app.get('/', function (req, res) {
    res.sendFile('index.html', { root: './src/client' });
})
// "https://us.cnn.com/2020/03/17/us/kentucky-refused-quarantine-coronavirus-trnd/index.html"
app.post("/classify", (req, res) => {
    textapi.sentiment({ 'url':  req.body}, (error, response) => {
        if (error == null) {
            console.log(response);
            var print = response.text //returns the text content of the JSON
            res.send(print)
        } else {
            console.log('there was an error:', error)
        }
    });
});

// app.get('/form', getNLP)

getNLP = () => {
    console.log("API called")
}

const port = 3080;
const server = app.listen(port, listening)

// Callback to debug
function listening() {
    console.log(`running on localhost: ${port}`)
}