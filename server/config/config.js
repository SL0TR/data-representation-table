require('dotenv').config()

var config = {
  dev: 'development',
  test: 'testing',
  prod: 'production',
  db: {
    url: process.env.DB
  },
  port: process.env.PORT || 4000,
};


process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

module.exports = config;