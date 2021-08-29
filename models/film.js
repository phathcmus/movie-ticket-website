const mongoose = require('mongoose');

require('dotenv').config();

/**
 * -------------- DATABASE ----------------
 */

/**
 * Connect to MongoDB Server using the connection string in the `.env` file.  To implement this, place the following
 * string into the `.env` file
 * 
 * DB_STRING=mongodb://<user>:<password>@localhost:27017/database_name
 */ 

const conn = process.env.DB_STRING;

const connection = mongoose.createConnection(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var filmSchema = new mongoose.Schema({
  title: String,
  director: String,
  starring: [String],
  genres: [String],
  language: String,
  publicDate: Date
});

// Compile model from schema
const Film = connection.model('Film', filmSchema );

// Expose the connection
module.exports = connection;
