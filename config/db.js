// mongoose config
const mongoose = require('mongoose');

// function to connect to the DB...it's async because we're connecting to a remote resource
const connectDB = async () => {
  // using a try / catch to make it easier to handle errors
  try {
    // awaiting the mongoose connection. pulling the endpoint out of our config.env file
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // these prevent errors from Mongo
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error ${error.message}`);
    // shut down the application and exit with failure
    process.exit(1);
  }
}

module.exports = connectDB;