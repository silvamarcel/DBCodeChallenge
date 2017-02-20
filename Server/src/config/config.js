'use strict';

var config = {};

config.environment = process.env.NODE_ENV || 'development';

// Upload files in memory
config.uploadFilesInMemory = false;

// Populate the DB with sample data
config.seedDB = true;

// Token settings
config.token = {
    secret: process.env.TOKEN_SECRET || 'db-code-challenge',
    expiration: process.env.TOKEN_EXPIRATION || 60*60*24 //24 hours
};

// Server settings
config.server = {
    host: '0.0.0.0',
    port: process.env.NODE_PORT || 3000
};

// MongoDB settings
config.mongodb = {
    dbURI: "mongodb://127.0.0.1:27017/dbserver",
    dbOptions: {"user": "", "pass": ""}
};

// Redis settings
config.redis = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
    options: {

    }
};

// Export configuration object
module.exports = config;
