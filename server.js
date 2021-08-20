// note that backend uses commonJS rather than ES6 modules
const express = require('express');
// path comes standard w/ Node, so we don't have to install it w/ npm
const path = require('path')
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');

// getting config from our config folder using dotenv package
dotenv.config({path: './config/config.env'});

// calling the DB connection function
connectDB();

// bringing in the router from our routes folder. we'll use this as middleware w/ app.use
const scores = require('./routes/scores');

const app = express();

// body parser middleware...allows us to parse form fields
app.use(express.json());

// setting up morgan to console log more useful info
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// we can test this get request with Postman by hitting whatever port we have set up on app.listen()
app.use('/api/v1/scores', scores);

// checking for whether we're in production
if(process.env.NODE_ENV === 'production') {
  // setting the static folder for the deployment
  app.use(express.static('client/build'));
  // a route for anything aside for our API routes that will load index.html from the build folder
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

// getting the global PORT, or using 5000 if for some reason we can't access it
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  // once we hit the port, this message should display in bold yellow (thx to the colors package)
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});


