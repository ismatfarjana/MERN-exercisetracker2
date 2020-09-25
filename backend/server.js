const express = require ('express');
const cors = require('cors');
const mongoose = require('mongoose'); // helps to connect to mongodb db


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


//connecting to mongodb atlas
const uri = process.env.ATLAS_URI // get it from mongodb atlas dashboard
//connecting to db with mongoose , add the flags
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

//connecting to bd using the uri
const connection = mongoose.connection;
connection.once('open',() => {
    console.log('hurray! connected to mongodb!')
});

//tell the server to require the files and use the routes files
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log('Hello from Syeda\'s exercise tracker practice mood 2');
});