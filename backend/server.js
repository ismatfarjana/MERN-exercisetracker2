const express = require ('express');
const cors = require('cors');


require ('dotenv').config(); // to have environment variable in .env

//hosting server
const app = express();
const port = process.env.PORT || 5000; //

//middle wares
app.use(cors()); // CORS allows you to configure the web API's security.
// It has to do with allowing other domains to make requests against your web API.
// For example, if you had your web API on one server and your web app on another you could configure
// CORS in your Web API to allow your web app to make calls to your web API
app.use(express.json()); // helps to parse json file in database

app.listen(port, () => {
    console.log('Hello from Syeda\'s exercise tracker practice mood 2');
});