// libreria que permite leer variable de entorno
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

let database;

const initDB = (callback) => {
    if (database) {
        console.log('Database already initialized');
        return callback(null, database);
    }

    console.time(' Database connection time');

    mongoose.connect(process.env.DB_URI)
        .then((client) => {
            database = mongoose.connection;
            console.timeEnd(' Database connection time');
            console.log(' DATABASE CONNECTED SUCCESSFULLY: ',mongoose.connection.name);
             
            callback(null, database);
        })
        .catch((err) => {
            console.timeEnd(' Database connection time');
            console.error('❌ DATABASE CONNECTION FAILED');
            callback(err);
        });
};

module.exports = {
    initDB,
};

//just for changes
