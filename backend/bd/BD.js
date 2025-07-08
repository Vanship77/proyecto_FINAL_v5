const mongoose = require('mongoose');

const URI = 'mongodb://localhost:27017/proyecto_F_CA'; // conexión directa

let database;

const initDB = (callback) => {
    if (database) {
        console.log('🟢 Database already initialized');
        return callback(null, database);
    }

    console.time('⏱️ Database connection time');

    mongoose.connect(URI)
        .then(() => {
            database = mongoose.connection;
            console.timeEnd('⏱️ Database connection time');
            console.log('✅ DATABASE CONNECTED SUCCESSFULLY:', mongoose.connection.name);
            callback(null, database);
        })
        .catch((err) => {
            console.timeEnd('⏱️ Database connection time');
            console.error('❌ DATABASE CONNECTION FAILED');
            callback(err);
        });
};

module.exports = {
    initDB,
};
